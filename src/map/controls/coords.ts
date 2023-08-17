import * as L from "leaflet";
import { MapManager } from "..";

export class CoordsControl extends L.Control {
  constructor() {
    super({
      position: "bottomright",
    });
  }

  onAdd(map: L.Map): HTMLElement {
    const div = L.DomUtil.create("div");
    div.classList.add("leaflet-control-zoom", "leaflet-control", "leaflet-bar");
    div.classList.add("leaflet-control-coords");

    div.setAttribute("hidden", "");

    map.on("mousemove", (event) => {
      const p = event.latlng;
      const [x, y] = MapManager.converter().forward([p.lng, p.lat]);
      div.innerText = `X=${x.toFixed(2)} | Y=${y.toFixed(2)}`;

      if (div.hasAttribute("hidden")) div.removeAttribute("hidden");
    });

    return div;
  }
}
