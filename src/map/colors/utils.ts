import { RGBColor } from "@types";
import aci from "./aci";

const { pow, sqrt } = Math;

export function hex2rgb(hex: string): RGBColor {
  const n = parseInt(hex.replace("#", ""), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
}

export function rgbDistance(rgb1: RGBColor, rgb2: RGBColor) {
  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;
  return sqrt(pow(r1 - r2, 2) + pow(g1 - g2, 2) + pow(b1 - b2, 2));
}

export function hexDistance(hex1: string, hex2: string) {
  return rgbDistance(hex2rgb(hex1), hex2rgb(hex2));
}

export function closestColor(hex: string) {
  let distance = NaN;
  let color = null;

  for (let index = 0; index < aci.length; index++) {
    const _aci = aci[index];
    const _distance = rgbDistance(hex2rgb(hex), _aci[2]);
    if (_distance === 0) return _aci;

    if (isNaN(distance)) (distance = _distance), (color = _aci);
    else if (_distance < distance) (distance = _distance), (color = _aci);
  }

  return color;
}

export function rgb2hex(rgb: RGBColor) {
  function c2hex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  return `#${c2hex(rgb[0])}${c2hex(rgb[1])}${c2hex(rgb[2])}`;
}

export function aci2rgb(color: number): RGBColor {
  const found = aci.find((_aci) => _aci[1] === color);
  if (found) return found[2];
  else return [255, 255, 255];
}
