import { Control, DomUtil } from "leaflet";
import { IModalControl } from "@types";

export class FilesControl extends Control implements IModalControl {
  open: (() => void) | null = null;
  private static _instance: FilesControl;

  static instance() {
    if (FilesControl._instance == null)
      FilesControl._instance = new FilesControl();
    return FilesControl._instance;
  }
  onAdd(): HTMLElement {
    let div = document.getElementById("k__files");
    if (div == null) {
      div = DomUtil.create("div");
      div.id = "k__files";
      div.classList.add("leaflet-control", "leaflet-bar");
    }
    const a = DomUtil.create("a");
    a.setAttribute("role", "button");
    a.title = "Import/Export";
    a.href = "#";

    a.addEventListener("click", this._click.bind(this));

    const i = DomUtil.create("i");
    i.classList.add("fa-solid", "fa-file");

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
