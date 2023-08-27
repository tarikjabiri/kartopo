import { ILayer, OnlyBooleanKeys } from "@types";
import { createLayer } from "@utils";
import { KMap } from "./map";
import { Path } from "leaflet";

export class LayersManager {
  layers: ILayer[];

  constructor() {
    this.layers = [createLayer("0")];
  }

  add(layer: ILayer) {
    if (layer.name === "") return;
    if (this.layers.find((l) => l.name === layer.name)) return;
    this.layers.push(layer);
  }

  find(name: string) {
    const layer = this.layers.find((l) => l.name === name);
    if (layer == null) return this.layers[0];
    return layer;
  }

  toggle(name: string, key: keyof OnlyBooleanKeys<ILayer>) {
    const layer = this.layers.find((l) => l.name === name);
    if (layer == null) return;
    layer[key] = !layer[key];
    if (key === "visible") this._toggleShapes(layer);
  }

  remove(name: string) {
    const layer = this.layers.find((l) => l.name === name);
    if (layer == null) return;
    layer.shapes.forEach((shape) => shape.remove());
    this.layers = this.layers.filter((l) => l.name !== name);
  }

  update(name: string, layer: ILayer) {
    if (name === "0") layer.name = "0";
    this.layers = this.layers.map((l) => {
      if (l.name === name) return layer;
      return l;
    });
    this.style(name);
  }

  style(name: string) {
    const layer = this.layers.find((l) => l.name === name);
    if (layer == null) return;
    layer.shapes.forEach((shape) => {
      if (shape instanceof Path) shape.setStyle({ color: layer.color });
    });
  }

  clone() {
    const layersManager = new LayersManager();
    layersManager.layers = this.layers.map((l) => l);
    return layersManager;
  }

  private _toggleShapes(layer: ILayer) {
    layer.shapes.forEach((shape) => {
      if (layer.visible) shape.addTo(KMap.map);
      else shape.remove();
    });
  }
}
