import { Paper } from "@mantine/core";
import { useEffect, useRef } from "react";
import { MapManager } from "../map";
import { useDisclosure } from "@mantine/hooks";
import KProjectionModal from "./KProjectionModal";

export default function KMap() {
  const ref = useRef<HTMLDivElement>(null);
  const proj = useDisclosure(false);

  useEffect(() => {
    if (ref.current)
      MapManager.init(ref.current, {
        export: proj,
      });
  }, []);

  return (
    <>
      <KProjectionModal opened={proj[0]} close={proj[1].close} />
      <Paper id="k_map" p={"md"} ref={ref} />
    </>
  );
}
