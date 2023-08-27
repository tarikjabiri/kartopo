import { Control, DomUtil, Map } from "leaflet";
import { converter } from "../utils";

export class CoordinatesControl extends Control {
  constructor() {
    super({
      position: "bottomright",
    });
  }

  onAdd(map: Map): HTMLElement {
    const div = DomUtil.create("div");
    div.classList.add("leaflet-control", "leaflet-bar");
    div.style.overflow = "hidden";
    div.hidden = true;

    const span = DomUtil.create("span");
    span.style.backgroundColor = "#ffffff";
    span.style.padding = "5px";
    span.style.fontFamily = "monospace";
    span.style.fontWeight = "bolder";
    span.style.fontSize = "large";
    span.style.color = "#4d4d4d";

    map.on("mousemove", (event) => {
      const { lat, lng } = event.latlng;
      const r = converter("EPSG:26191").forward([lng, lat]);
      span.innerText = `X=${r[0].toFixed(2)} | Y=${r[1].toFixed(2)}`;
      div.hidden = false;
    });

    div.append(span);
    return div;
  }
}
