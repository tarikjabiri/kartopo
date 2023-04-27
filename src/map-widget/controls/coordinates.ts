import { Control, DomUtil, Map } from "leaflet";
import proj4 from "proj4";

export class CoordinatesControl extends Control {
  projection: string;

  constructor(projection: string) {
    super({
      position: "bottomright",
    });
    this.projection = projection;
  }

  onAdd(map: Map): HTMLElement {
    const container = DomUtil.create("div", "leaflet-bar");

    const p = DomUtil.create("p", "coordinates-control", container);
    DomUtil.addClass(p, "leaflet-bar-part");

    map.on("mousemove", (event) => {
      const { lat, lng } = event.latlng;
      const [x, y] = proj4(this.projection).forward([lng, lat]);
      p.textContent = `X = ${x.toFixed(2)} | Y = ${y.toFixed(2)}`;
    });

    return container;
  }
}
