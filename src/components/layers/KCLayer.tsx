import useLayerContext from "@hooks/useLayerContext";
import KCLayerShow from "./KCLayerShow";
import KCLayerEdit from "./KCLayerEdit";
import { Fragment } from "react";

export default function KCLayer() {
  const layer = useLayerContext();
  const Component = layer.edit ? <KCLayerEdit oldLayer={layer} /> : <KCLayerShow />;
  return <Fragment>{Component}</Fragment>;
}
