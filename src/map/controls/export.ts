import * as L from "leaflet";
import { useDisclosure } from "@mantine/hooks";

export interface ExportControlOptions extends L.ControlOptions {
  exportModal: ReturnType<typeof useDisclosure>
  importModal: ReturnType<typeof useDisclosure>
}

export class ExportControl extends L.Control {
  readonly exportModal: ReturnType<typeof useDisclosure>
  readonly importModal: ReturnType<typeof useDisclosure>

  constructor(options: ExportControlOptions) {
    super(options);
    this.exportModal = options.exportModal;
    this.importModal = options.importModal;
  }

  onAdd(_map: L.Map): HTMLElement {
    const div = L.DomUtil.create("div");
    div.classList.add("leaflet-control-zoom", "leaflet-control", "leaflet-bar");

    const aExport = L.DomUtil.create("a");
    aExport.setAttribute("role", "button");
    aExport.classList.add("leaflet-control-cursor");

    const aImport = L.DomUtil.create("a");
    aImport.setAttribute("role", "button");
    aImport.classList.add("leaflet-control-cursor");

    aExport.addEventListener("click", this._handleClickExport.bind(this));
    aImport.addEventListener("click", this._handleClickImport.bind(this));

    const spanExport = L.DomUtil.create("span");
    spanExport.classList.add("fa-solid", "fa-download");

    const spanImport = L.DomUtil.create("span");
    spanImport.classList.add("fa-solid", "fa-upload");

    aExport.appendChild(spanExport);
    aImport.appendChild(spanImport);

    div.appendChild(aExport);
    div.appendChild(aImport);
    return div;
  }

  private _handleClickExport(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.exportModal[1].open();
  }

  private _handleClickImport(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.importModal[1].open();
  }
}
