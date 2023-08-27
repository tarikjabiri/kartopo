import { ILayer, ILayersHook, OnlyBooleanKeys } from "@types";
import { useState } from "react";
import { LayersManager } from "@map";

export default function useLayers(): ILayersHook {
  const [manager, setManager] = useState<LayersManager>(new LayersManager());
  const layers = manager.layers;

  function add(layer: ILayer) {
    manager.add(layer);
    setManager(manager.clone());
  }

  function toggle(name: string, key: keyof OnlyBooleanKeys<ILayer>) {
    manager.toggle(name, key);
    setManager(manager.clone());
  }

  function remove(name: string) {
    manager.remove(name);
    setManager(manager.clone());
  }

  function update(name: string, layer: ILayer) {
    manager.update(name, layer);
    layer.edit = false;
    setManager(manager.clone());
  }

  return { manager, setManager, layers, add, toggle, remove, update };
}
