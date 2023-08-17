import * as L from "leaflet";

export class LayersControl extends L.Control {
  onAdd(_map: L.Map): HTMLElement {
    const div = L.DomUtil.create("div");
    div.classList.add("leaflet-control-zoom", "leaflet-control", "leaflet-bar");

    const a = L.DomUtil.create("a");
    a.classList.add("leaflet-control-cursor");
    a.setAttribute("role", "button");

    a.addEventListener("click", this._click.bind(this));

    const span = L.DomUtil.create("span");
    span.classList.add("fa-solid", "fa-layer-group");

    a.appendChild(span);

    div.appendChild(a);
    return div;
  }

  private _click(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
