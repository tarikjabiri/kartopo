import {
  Colors,
  DxfWriter,
  LWPolylineFlags,
  TrueColor,
  point3d,
} from "@tarikjabiri/dxf";
import { ILayer } from "@types";
import FileSaver from "file-saver";
import { LatLng, Marker, Polygon, Polyline } from "leaflet";
import { closestColor } from "../colors";
import { converter } from "../utils";

export class DXFExport {
  export(layers: ILayer[]) {
    const dxf = new DxfWriter();

    layers.forEach((layer) => {
      const _closestColor = closestColor(layer.color);
      const aciColor = _closestColor ? _closestColor[1] : Colors.White;
      const trueColor = TrueColor.fromHex(layer.color);

      if (layer.name !== "0") {
        const _layer = dxf.addLayer(layer.name, aciColor);
        _layer.trueColor = trueColor;
        dxf.setCurrentLayerName(_layer.name);
      } else {
        const _zero = dxf.layer("0");
        if (_zero) {
          _zero.colorNumber = aciColor;
          _zero.trueColor = trueColor;
        }
      }

      layer.shapes.forEach((shape) => {
        if (shape instanceof Polygon) this._polygon(dxf, shape);
        else if (shape instanceof Polyline) this._polyline(dxf, shape);
        else if (shape instanceof Marker) this._marker(dxf, shape);
      });
    });

    FileSaver(
      new Blob([dxf.stringify()], { type: "application/dxf" }),
      `dxf-export.dxf`,
      { autoBom: false }
    );
  }

  private _polygon(dxf: DxfWriter, polygon: Polygon) {
    const _polygon = dxf.addLWPolyline([], {
      flags: LWPolylineFlags.Closed,
    });

    polygon.getLatLngs().forEach((p) => {
      if (p instanceof LatLng) {
        _polygon.vertices.push({
          point: point3d(...converter("EPSG:26191").forward([p.lng, p.lat])),
        });
      } else if (Array.isArray(p)) {
        p.forEach((p2) => {
          if (p2 instanceof LatLng) {
            _polygon.vertices.push({
              point: point3d(
                ...converter("EPSG:26191").forward([p2.lng, p2.lat])
              ),
            });
          }
        });
      }
    });
  }

  private _polyline(dxf: DxfWriter, polyline: Polyline) {
    const _polyline = dxf.addLWPolyline([]);
    polyline.getLatLngs().forEach((p) => {
      if (p instanceof LatLng) {
        _polyline.vertices.push({
          point: point3d(...converter("EPSG:26191").forward([p.lng, p.lat])),
        });
      }
    });
  }

  private _marker(dxf: DxfWriter, marker: Marker) {
    const p = marker.getLatLng();
    const _p = point3d(...converter("EPSG:26191").forward([p.lng, p.lat]));
    dxf.addPoint(_p.x, _p.y, _p.z);
  }
}
