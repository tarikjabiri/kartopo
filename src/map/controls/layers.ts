import { Control, DomUtil } from "leaflet";
import { IModalControl } from "@types";

export class LayersControl extends Control implements IModalControl {
  open: (() => void) | null = null;
  private static _instance: LayersControl;

  static instance() {
    if (LayersControl._instance == null)
      LayersControl._instance = new LayersControl();
    return LayersControl._instance;
  }

  onAdd(): HTMLElement {
    let div = document.getElementById("k__files");
    if (div == null) {
      div = DomUtil.create("div");
      div.id = "k__files";
      div.classList.add("leaflet-control", "leaflet-bar");
    }
    const a = DomUtil.create("a");
    a.style.color = "#4d4d4d";
    a.setAttribute("role", "button");
    a.title = "Layers";
    a.href = "#";

    a.addEventListener("click", this._click.bind(this));

    const i = DomUtil.create("i");
    i.classList.add("fa-solid", "fa-layer-group");

    a.appendChild(i);

    div.appendChild(a);
    return div;
  }

  _click(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.open) this.open();
  }
}
