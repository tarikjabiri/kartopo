import { Control, Layer } from "leaflet";
import { Dispatch, SetStateAction } from "react";
import { LayersManager } from "@map";

export interface ILayer {
  name: string;
  color: string;
  shapes: Layer[];
  visible: boolean;
  edit: boolean;
}

export interface ILayersHook {
  manager: LayersManager;
  setManager: (value: LayersManager) => void;
  layers: ILayer[];
  add: (layer: ILayer) => void;
  toggle: (name: string, key: keyof OnlyBooleanKeys<ILayer>) => void;
  remove: (name: string) => void;
  update: (name: string, layer: ILayer) => void;
}

export type TGoogleMaps =
  | "MAPS"
  | "SATELLITE"
  | "SATELLITE_HYBRID"
  | "TERRAIN"
  | "TERRAIN_HYBRID"
  | "ROADS";

export interface IModalControl extends Control {
  open: (() => void) | null;
}

export type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

export type OnlyBooleanKeys<T> = Omit<T, Exclude<keyof T, BooleanKeys<T>>>;

export interface ICurrentLayerNameHook {
  layerName: string;
  setLayerName: Dispatch<SetStateAction<string>>;
}

export type RGBColor = [r: number, g: number, b: number];

export type TProjection =
  | "EPSG:26191"
  | "EPSG:26192"
  | "EPSG:26194"
  | "EPSG:26195";

export interface IProjectionHook {
  projection: TProjection;
  setProjection: Dispatch<SetStateAction<TProjection>>;
}
