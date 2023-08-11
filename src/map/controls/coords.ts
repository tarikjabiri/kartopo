import * as L from "leaflet";
import proj4 from "proj4";
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

    map.on("mousemove", (event) => {
      const p = event.latlng;
      const [x, y] = proj4(MapManager.projection).forward([p.lng, p.lat]);
      div.innerText = `X=${x.toFixed(2)} | Y=${y.toFixed(2)}`;
    });
    map.on("click", (event) => {
      console.log(event.latlng);
    });

    return div;
  }
}
