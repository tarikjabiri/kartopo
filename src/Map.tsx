import { Paper } from "@mantine/core";
import { useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapWidget } from "./map-widget";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapWidgetRef = useRef<MapWidget | null>(null);

  useEffect(() => {
    if (mapWidgetRef.current === null) {
      if (mapContainerRef.current) {
        mapWidgetRef.current = new MapWidget(mapContainerRef.current);
      }
    }
  }, []);

  return <Paper ref={mapContainerRef} shadow="sm" id="map" />;
}
