import LayersContext from "@contexts/LayersContext";
import { useContext } from "react";

export default function useLayersContext() {
  const context = useContext(LayersContext);
  if (context == null) throw new Error("No layers context provided!");
  return context;
}
