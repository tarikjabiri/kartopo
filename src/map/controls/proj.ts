import * as L from "leaflet";
import { useDisclosure } from "@mantine/hooks";

export class ProjControl extends L.Control {
  readonly modal: ReturnType<typeof useDisclosure>;

  constructor(modal: ReturnType<typeof useDisclosure>) {
    super();
    this.modal = modal;
  }

  onAdd(_map: L.Map): HTMLElement {
    const div = L.DomUtil.create("div");
    div.classList.add("leaflet-control-zoom", "leaflet-control", "leaflet-bar");

    const a = L.DomUtil.create("a");
    a.setAttribute("role", "button");
    a.setAttribute("title", "Projection");
    a.classList.add("leaflet-control-export");

    a.addEventListener("click", this._click.bind(this));

    const span = L.DomUtil.create("span");
    span.classList.add("fa-solid", "fa-globe");

    a.appendChild(span);

    div.appendChild(a);

    return div;
  }

  private _click(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.modal[1].open();
  }
}
