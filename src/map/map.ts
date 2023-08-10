import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { ExportControl } from "./controls";
import { useDisclosure } from "@mantine/hooks";

export interface MapManagerOptions {
  export: ReturnType<typeof useDisclosure>;
}

export class MapManager {
  static map?: L.Map;

  static options(): L.MapOptions {
    return {
      attributionControl: false,
    };
  }

  static init(element: HTMLElement, options: MapManagerOptions) {
    if (MapManager.map) return;
    MapManager.map = L.map(element, MapManager.options());
    MapManager.map.setView([51.505, -0.09], 13);
    L.tileLayer("http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}").addTo(
      MapManager.map
    );
    MapManager.map.addControl(new ExportControl(options.export));
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
