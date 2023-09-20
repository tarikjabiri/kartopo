import {
  Colors,
  Writer,
  LWPolylineFlags,
  TrueColor,
  point,
  Block,
} from "@tarikjabiri/dxf";
import { ILayer } from "@types";
import FileSaver from "file-saver";
import { LatLng, Marker, Polygon, Polyline } from "leaflet";
import { closestColor } from "../colors";
import { converter } from "../utils";

export class DXFExport {
  export(layers: ILayer[]) {
    const writer = new Writer();
    const modelSpace = writer.document.modelSpace;
    const layerTable = writer.document.tables.layer;

    layers.forEach(({ name, color, shapes }) => {
      const _closestColor = closestColor(color);
      const colorNumber = _closestColor ? _closestColor[1] : Colors.White;
      const trueColor = TrueColor.fromHex(color);

      if (name !== "0") {
        const _layer = layerTable.add({ name, colorNumber, trueColor });
        modelSpace.currentLayerName = _layer.name;
      } else {
        const _zero = layerTable.get("0");
        if (_zero) {
          _zero.colorNumber = colorNumber;
          _zero.trueColor = trueColor;
        }
      }

      shapes.forEach((shape) => {
        if (shape instanceof Polygon) this._polygon(modelSpace, shape);
        else if (shape instanceof Polyline) this._polyline(modelSpace, shape);
        else if (shape instanceof Marker) this._marker(modelSpace, shape);
      });
    });

    FileSaver(
      new Blob([writer.stringify()], { type: "application/dxf" }),
      `dxf-export.dxf`,
      { autoBom: false }
    );
  }

  private _polygon(block: Block, polygon: Polygon) {
    const _polygon = block.addLWPolyline({ flags: LWPolylineFlags.Closed });

    polygon.getLatLngs().forEach((p) => {
      if (p instanceof LatLng) {
        _polygon.vertices.push(
          point(...converter("EPSG:26191").forward([p.lng, p.lat]))
        );
      } else if (Array.isArray(p)) {
        p.forEach((p2) => {
          if (p2 instanceof LatLng) {
            _polygon.vertices.push(
              point(...converter("EPSG:26191").forward([p2.lng, p2.lat]))
            );
          }
        });
      }
    });
  }

  private _polyline(block: Block, polyline: Polyline) {
    const _polyline = block.addLWPolyline({});
    polyline.getLatLngs().forEach((p) => {
      if (p instanceof LatLng) {
        _polyline.vertices.push(
          point(...converter("EPSG:26191").forward([p.lng, p.lat]))
        );
      }
    });
  }

  private _marker(block: Block, marker: Marker) {
    const p = marker.getLatLng();
    block.addPoint(point(...converter("EPSG:26191").forward([p.lng, p.lat])));
  }
}
