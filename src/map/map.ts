import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet.gridlayer.googlemutant/dist/Leaflet.GoogleMutant.js";
import {
  CoordsControl,
  ExportControl,
  LayersControl,
  ProjControl,
} from "./controls";
import { useDisclosure } from "@mantine/hooks";
import "./defs";
import { Layer } from "./layer";
import { DxfWriter } from "@tarikjabiri/dxf";
import FileSaver from "file-saver";
import proj4 from "proj4";
import { FeatureCollection } from "geojson";
import { now } from "./date";

export interface MapManagerOptions {
  projModal: ReturnType<typeof useDisclosure>;
  exportModal: ReturnType<typeof useDisclosure>;
  importModal: ReturnType<typeof useDisclosure>;
}

export class MapManager {
  static map?: L.Map;
  static projection: string = "EPSG:26191";
  static currentLayer: Layer = new Layer("0", "#ffffff");

  static temp: L.Layer;

  static options(): L.MapOptions {
    return {
      attributionControl: false,
    };
  }

  static converter() {
    return proj4(MapManager.projection);
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

    MapManager.map.addControl(new ProjControl(options.projModal));
    MapManager.map.addControl(new LayersControl());
    MapManager.map.addControl(new ExportControl(options));
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

    MapManager.map.on("pm:drawstart", (e) => {
      MapManager.temp = e.workingLayer;
      console.log(e.workingLayer);
      MapManager.currentLayer.add(e);
    });

    MapManager.map.on("pm:remove", (e) => {
      console.log(e.layer === MapManager.temp);
      MapManager.currentLayer.remove(e);
    });
  }

  static dxfy() {
    if (!MapManager.map) return;
    const dxf = new DxfWriter();
    MapManager.currentLayer.dxfy(dxf);

    const fileName = prompt(
      "Veuillez entrer un nom de fichier",
      `DXF_${now()}`
    );

    if (fileName) {
      FileSaver(
        new Blob([dxf.stringify()], { type: "application/dxf" }),
        `${fileName}.dxf`,
        { autoBom: false }
      );
    }
  }

  static geojson() {
    if (!MapManager.map) return;
    const collection: FeatureCollection = {
      type: "FeatureCollection",
      features: [],
    };

    L.PM.Utils.findLayers(MapManager.map).forEach((layer) => {
      if (
        layer instanceof L.Polygon ||
        layer instanceof L.Marker ||
        layer instanceof L.Polyline
      ) {
        collection.features.push(layer.toGeoJSON());
      }
    });

    const fileName = prompt(
      "Veuillez entrer un nom de fichier",
      `GeoJSON_${now()}`
    );

    if (fileName) {
      FileSaver(
        new Blob([JSON.stringify(collection)], {
          type: "application/geo+json",
        }),
        `${fileName}.geojson`,
        { autoBom: false }
      );
    }
  }
}
