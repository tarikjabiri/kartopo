import useLayersContext from "@hooks/useLayersContext";
import KCLayer from "./KCLayer";
import LayerContext from "@contexts/LayerContext";
import { Radio } from "@mantine/core";
import { Fragment } from "react";
import KCLayerAdd from "./KCLayerAdd";
import useCurrentLayerNameContext from "@hooks/useCurrentLayerNameContext";

export default function KCLayers() {
  const { layers } = useLayersContext();
  const { layerName, setLayerName } = useCurrentLayerNameContext();

  return (
    <Fragment>
      <Radio.Group pt={"xs"} value={layerName} onChange={setLayerName}>
        {layers.map((layer) => (
          <LayerContext.Provider key={layer.name} value={layer}>
            <KCLayer />
          </LayerContext.Provider>
        ))}
      </Radio.Group>
      <KCLayerAdd />
    </Fragment>
  );
}
