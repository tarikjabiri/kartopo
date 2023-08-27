import { createLayer } from "@utils";
import { LayersManager } from "../layers";
import { LWPolylineEntity, Parser, PolylineEntity } from "@dxfjs/parser";
import { aci2rgb, rgb2hex } from "../colors";
import { LatLngTuple, latLngBounds, polygon, polyline } from "leaflet";
import { converter } from "../utils";
import { KMap } from "../map";

export class DXFImport {
  readonly latlngs: LatLngTuple[];

  constructor() {
    this.latlngs = [];
  }

  import(manager: LayersManager) {
    return new Promise((resolve) => {
      this._input().then((content: string) => {
        if (content.length === 0) return;
        const parser = new Parser();
        parser.parse(content).then((obj) => {
          obj.tables.layer.records.forEach((record) => {
            const layer = manager.layers.find((l) => l.name === record.name);
            if (layer == null && record.name != null) {
              manager.add(
                createLayer(record.name, rgb2hex(aci2rgb(record.color ?? 7)))
              );
            }
          });
          this._polylines(manager, obj.entities.lwPolylines);
          this._polylines(manager, obj.entities.polylines);
          manager.layers.forEach(({ name }) => manager.style(name));
          KMap.map.fitBounds(latLngBounds(this.latlngs));
          resolve(true);
        });
      });
    });
  }

  private _input(): Promise<string> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".dxf";
      input.onchange = () => {
        if (!input.files) return;
        const file = input.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          if (!(event.target && typeof event.target.result === "string"))
            return;
          resolve(event.target.result);
        });
        reader.readAsText(file);
      };
      input.click();
    });
  }

  private _polylines(
    manager: LayersManager,
    lwpolylines: (LWPolylineEntity | PolylineEntity)[]
  ) {
    lwpolylines.forEach((lwpolyline) => {
      const latlngs: LatLngTuple[] = [];
      lwpolyline.vertices.forEach((vertex) => {
        const latlng: LatLngTuple = converter("EPSG:26191").inverse([
          vertex.x,
          vertex.y,
        ]).reverse() as LatLngTuple;
        latlngs.push(latlng);
        this.latlngs.push(latlng);
      });
      const layer = manager.find(lwpolyline.layerName || "0");
      const closed = (lwpolyline.flag & 1) == 1;
      const path = closed ? polygon(latlngs) : polyline(latlngs);
      if (layer.visible) path.addTo(KMap.map);
      layer.shapes.push(path);
    });
  }
}
