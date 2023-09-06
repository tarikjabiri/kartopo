import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "@geoman-io/leaflet-geoman-free";
import "./proj4";
import { TGoogleMaps, ILayer } from "@types";
import { Map, MapOptions, PM, Path, map, tileLayer } from "leaflet";
import { FilesControl, LayersControl } from "./controls";
import { LayersManager } from "./layers";
import { CoordinatesControl } from "./controls/coordinates";

const mapOptions: MapOptions = {
  attributionControl: false,
  maxZoom: 22,
};

const pmToolbarOptions: PM.ToolbarOptions = {
  drawCircleMarker: false,
  drawCircle: false,
  drawText: false,
  drawRectangle: false,
  rotateMode: false,
  cutPolygon: false,
};

function google(type?: TGoogleMaps) {
  let lyrs = "m";
  if (type === "SATELLITE") lyrs = "s";
  else if (type === "SATELLITE_HYBRID") lyrs = "y";
  else if (type === "TERRAIN") lyrs = "t";
  else if (type === "TERRAIN_HYBRID") lyrs = "p";
  else if (type === "ROADS") lyrs = "h";

  return tileLayer(`https://{s}.google.com/vt/lyrs=${lyrs}&x={x}&y={y}&z={z}`, {
    maxZoom: 22,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  });
}

export class KMap {
  static map: Map;
  static layer: ILayer;
  static manager: LayersManager;

  static init(element: HTMLElement) {
    if (KMap.map) return;
    KMap.map = map(element, mapOptions);
    KMap.map.setView([32.0532, -7.4071], parseInt(import.meta.env.VITE_MAP_ZOOM));
    google("SATELLITE_HYBRID").addTo(KMap.map);

    KMap.map.addControl(LayersControl.instance());
    KMap.map.addControl(FilesControl.instance());
    KMap.map.addControl(new CoordinatesControl());
    KMap.map.pm.addControls(pmToolbarOptions);
    KMap.map.pm.setGlobalOptions({
      limitMarkersToCount: 30,
      limitMarkersToZoom: 30,
      limitMarkersToViewport: true,
    });

    KMap.map.on("pm:create", (e) => {
      KMap.layer.shapes.push(e.layer);
      if (e.layer instanceof Path) KMap.manager.style(KMap.layer.name);
    });

    KMap.map.on("pm:remove", (e) => {
      KMap.layer.shapes = KMap.layer.shapes.filter((l) => l !== e.layer);
    });
  }

  static layerChange(layerName: string, manager: LayersManager) {
    KMap.manager = manager;
    const layer = manager.layers.find((l) => l.name === layerName);
    if (layer == null) return;
    KMap.layer = layer;
    KMap.map.pm.setGlobalOptions({
      templineStyle: { color: layer.color },
      hintlineStyle: { color: layer.color, dashArray: [5, 5] },
    });
  }
}
