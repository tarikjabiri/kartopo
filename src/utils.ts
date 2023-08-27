import { ILayer } from "@types";

export function createLayer(name: string, color?: string): ILayer {
  color ||= "#ffffff";
  return { name, color, shapes: [], visible: true, edit: false };
}
