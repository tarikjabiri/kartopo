import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet.gridlayer.googlemutant/dist/Leaflet.GoogleMutant.js";
import { CoordsControl, ExportControl, ProjControl } from "./controls";
import { useDisclosure } from "@mantine/hooks";
import "./defs";

export interface MapManagerOptions {
  export: ReturnType<typeof useDisclosure>;
}

export class MapManager {
  static map?: L.Map;
  static projection: string = "EPSG:26191";

  static options(): L.MapOptions {
    return {
      attributionControl: false,
    };
  }

  static init(element: HTMLElement, options: MapManagerOptions) {
    if (MapManager.map) return;
    MapManager.map = L.map(element, MapManager.options());
    MapManager.map.setView([32.0532, -7.4071], 5);
    // L.tileLayer(
    //   "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
    // ).addTo(MapManager.map);

    L.gridLayer
      .googleMutant({
        type: "hybrid", // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
      })
      .addTo(MapManager.map);

    MapManager.map.addControl(new ProjControl(options.export));
    MapManager.map.addControl(new ExportControl(options.export));
    MapManager.map.addControl(new CoordsControl());
    MapManager.map.pm.addControls({
      position: "topleft",
      drawCircleMarker: false,
      drawCircle: false,
      drawText: false,
      drawRectangle: false,
      rotateMode: false,
      cutPolygon: false,
    });
  }
}
