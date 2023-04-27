import { Control, DomUtil } from "leaflet";
import { MapWidget } from "../map";
import { setProjection } from "../projections";

export class ZonesControl extends Control {
  map: MapWidget;

  constructor(map: MapWidget) {
    super({
      position: "topright",
    });
    this.map = map;
  }

  private addOption(select: HTMLSelectElement, name: string, value: string) {
    const option = DomUtil.create("option", undefined, select);
    option.text = name;
    option.value = value;
  }

  onAdd(): HTMLElement {
    const container = DomUtil.create("div", "leaflet-bar");

    const select = DomUtil.create("select", "zones-control", container);
    DomUtil.addClass(select, "leaflet-bar-part");

    function guardSelect(el: unknown): el is HTMLSelectElement {
      return el instanceof HTMLSelectElement;
    }

    select.addEventListener("change", (event) => {
      if (guardSelect(event.target)) {
        setProjection(this.map, event.target.value);
      }
    });

    this.addOption(select, "Maroc / Zone 1", "zone1");
    this.addOption(select, "Maroc / Zone 2", "zone2");
    this.addOption(select, "Maroc / Zone 3", "zone3");
    this.addOption(select, "Maroc / Zone 4", "zone4");

    return container;
  }
}
