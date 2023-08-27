import proj4 from "proj4";

export function converter(proj: string) {
  return proj4(proj);
}
