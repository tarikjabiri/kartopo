import { Paper } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { MapManager } from "../map";
import { useDisclosure } from "@mantine/hooks";
import KProjectionModal from "./KProjectionModal";
import KExportModal from "./KExportModal";

export default function KMap() {
  const ref = useRef<HTMLDivElement>(null);
  const proj = useDisclosure(false);
  const exp = useDisclosure(false);
  const projection = useState("EPSG:26191");

  useEffect(() => {
    if (ref.current)
      MapManager.init(ref.current, {
        projModal: proj,
        exportModal: exp,
        importModal: exp,
      });

    const mapElement = document.getElementById("k_map");
    if (mapElement) mapElement.style.height = `${window.innerHeight}px`;
  }, []);

  useEffect(() => {
    MapManager.projection = projection[0];
  }, [projection]);

  return (
    <>
      <KExportModal disclosure={exp} />
      <KProjectionModal projection={projection} disclosure={proj} />
      <Paper id="k_map" p={"md"} ref={ref} />
    </>
  );
}
