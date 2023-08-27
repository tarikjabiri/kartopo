import { Paper } from "@mantine/core";
import { CSSProperties, Fragment, useEffect, useRef } from "react";
import { KMap } from "@map";
import KCLayersModal from "./KCLayersModal";
import useCurrentLayerNameContext from "@hooks/useCurrentLayerNameContext";
import useLayersContext from "@hooks/useLayersContext";
import KCFilesModal from "./KCFilesModal";

const style: CSSProperties = {
  height: "100vh",
};

export default function KCMap() {
  const ref = useRef<HTMLDivElement>(null);
  const { layerName } = useCurrentLayerNameContext();
  const { manager } = useLayersContext();

  useEffect(() => {
    if (ref.current == null) return;
    KMap.init(ref.current);
    KMap.layerChange(layerName, manager);
    ref.current.style.height = `${window.innerHeight}px`;
  }, [layerName, manager]);

  return (
    <Fragment>
      <Paper ref={ref} style={style} radius={0} />
      <KCLayersModal />
      <KCFilesModal />
    </Fragment>
  );
}
