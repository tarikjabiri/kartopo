import LayerContext from "@contexts/LayerContext";
import { useContext } from "react";

export default function useLayerContext() {
  const context = useContext(LayerContext);
  if (context == null) throw new Error("No layer context provided!");
  return context;
}
