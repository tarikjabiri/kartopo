import CurrentLayerNameContext from "@contexts/CurrentLayerNameContext";
import { useContext } from "react";

export default function useCurrentLayerNameContext() {
  const context = useContext(CurrentLayerNameContext);
  if (context == null) throw new Error("No current layer context provided!");
  return context;
}
