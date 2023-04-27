import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

import { Map, TileLayer, tileLayer } from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import { CoordinatesControl, ZonesControl } from "./controls";
import { ZONE_1 } from "./projections";

export class MapWidget<E extends HTMLElement = HTMLElement> {
  readonly map: Map;
  readonly osm: TileLayer;

  private _projection: string;

  private coordinatesControl: CoordinatesControl;

  set projection(value: string) {
    this._projection = value;
    this.coordinatesControl.projection = this.projection;
  }

  get projection() {
    return this._projection;
  }

  constructor(element: E) {
    this._projection = ZONE_1;
    this.map = new Map(element, {
      attributionControl: false,
    });
    this.map.setView([32.05323268511977, -7.407126221805812], 5);
    this.osm = tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
    this.osm.addTo(this.map);
    this.initGeoman();
    this.coordinatesControl = new CoordinatesControl(this.projection);
    const z = new ZonesControl(this);
    this.map.addControl(this.coordinatesControl);
    this.map.addControl(z);
  }

  private initGeoman() {
    this.map.pm.addControls({
      position: "topleft",
      drawCircle: false,
      drawRectangle: false,
      drawCircleMarker: false,
      drawText: false,
      pinningOption: false,
      optionsControls: false,
      snappingOption: false,
      splitMode: false,
      scaleMode: false,
      cutPolygon: false,
      rotateMode: false,
    });
  }
}
