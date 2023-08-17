import { DxfWriter, LWPolylineFlags, point3d } from "@tarikjabiri/dxf";
import * as L from "leaflet";
import { MapManager } from ".";

export interface WorkingShape {
  shape: string;
  workingLayer: L.Layer;
}

export interface Shape {
  shape: string;
  layer: L.Layer;
}

function isPolygon(shape: string) {
  return shape === "Polygon";
}

export class Layer {
  name: string;
  color: string;
  shapes: WorkingShape[];

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
    this.shapes = [];
  }

  add(shape: WorkingShape) {
    this.shapes.push(shape);
  }

  remove(shape: Shape) {
    this.shapes = this.shapes.filter((s) => s.workingLayer !== shape.layer);
  }

  dxfy(writer: DxfWriter) {
    this.shapes.forEach((shape) => {
      if (isPolygon(shape.shape))
        this.dxfyPolygon(writer, shape.workingLayer as L.Polygon);
    });
  }

  private dxfyPolygon(writer: DxfWriter, shape: L.Polygon) {
    const polyline = writer.addLWPolyline([], {
      flags: LWPolylineFlags.Closed,
    });
    shape.getLatLngs().forEach((p) => {
      if (p instanceof L.LatLng) {
        polyline.vertices.push({
          point: point3d(...MapManager.converter().forward([p.lng, p.lat])),
        });
      }
    });
  }
}
