import * as L from "leaflet";
import { useDisclosure } from "@mantine/hooks";

export class ExportControl extends L.Control {
  readonly export: ReturnType<typeof useDisclosure>;

  constructor(open: ReturnType<typeof useDisclosure>) {
    super();
    this.export = open;
  }

  onAdd(_map: L.Map): HTMLElement {
    const div = L.DomUtil.create("div");
    div.classList.add("leaflet-control-zoom", "leaflet-control", "leaflet-bar");

    const ae = L.DomUtil.create("a");
    ae.setAttribute("role", "button");
    ae.classList.add("leaflet-control-export");

    const ai = L.DomUtil.create("a");
    ai.setAttribute("role", "button");
    ai.classList.add("leaflet-control-import");

    ae.addEventListener("click", this._clicke.bind(this));
    ai.addEventListener("click", this._clicki.bind(this));

    const spane = L.DomUtil.create("span");
    spane.classList.add("fa-solid", "fa-download");

    const spani = L.DomUtil.create("span");
    spani.classList.add("fa-solid", "fa-upload");

    ae.appendChild(spane);
    ai.appendChild(spani);

    div.appendChild(ae);
    div.appendChild(ai);
    return div;
  }

  private _clicke(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.export[1].open();
    console.log(event);
  }

  private _clicki(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.export[1].open();
    console.log(event);
  }
}
