import { ActionIcon, Group, Paper } from "@mantine/core";
import { IconFileExport, IconFileImport } from "@tabler/icons-react";
import * as L from "leaflet";
import { useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const mapMounted = useRef(false);

  useEffect(() => {
    if (!mapMounted.current) {
      const map = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      mapMounted.current = true;
    }
  }, []);

  return (
    <>
      <Group mb={'xs'}  spacing="xs">
        <ActionIcon variant="outline" size={"lg"}>
          <IconFileExport />
        </ActionIcon>
        <ActionIcon variant="outline" size={"lg"}>
          <IconFileImport />
        </ActionIcon>
      </Group>
      <Paper shadow="sm" id="map"></Paper>
    </>
  );
}
