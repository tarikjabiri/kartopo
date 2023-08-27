import { TProjection } from "@types";
import proj4 from "proj4";

export function converter(proj: TProjection) {
  return proj4(proj);
}
