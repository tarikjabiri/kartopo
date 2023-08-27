import { ICurrentLayerNameHook } from "@types";
import { useState } from "react";

export function useCurrentLayerName(): ICurrentLayerNameHook {
  const [layerName, setLayerName] = useState("0");

  return { layerName, setLayerName };
}
