import { MapWidget } from ".";

export const ZONE_1 =
  "+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=-5.4 +k_0=0.999625769 +x_0=500000 +y_0=300000 +ellps=clrk80ign +towgs84=31,146,47,0,0,0,0 +units=m +no_defs +type=crs";

export const ZONE_2 =
  "+proj=lcc +lat_1=29.7 +lat_0=29.7 +lon_0=-5.4 +k_0=0.999615596 +x_0=500000 +y_0=300000 +ellps=clrk80ign +towgs84=31,146,47,0,0,0,0 +units=m +no_defs +type=crs";

export const ZONE_3 =
  "+proj=lcc +lat_1=26.1 +lat_0=26.1 +lon_0=-5.4 +k_0=0.999616304 +x_0=1200000 +y_0=400000 +ellps=clrk80ign +towgs84=31,146,47,0,0,0,0 +units=m +no_defs +type=crs";

export const ZONE_4 =
  "+proj=lcc +lat_1=22.5 +lat_0=22.5 +lon_0=-5.4 +k_0=0.999616437 +x_0=1500000 +y_0=400000 +ellps=clrk80ign +towgs84=31,146,47,0,0,0,0 +units=m +no_defs +type=crs";

export function setProjection(map: MapWidget, value: string) {
  if (value === "zone1") map.projection = ZONE_1;
  else if (value === "zone2") map.projection = ZONE_2;
  else if (value === "zone3") map.projection = ZONE_3;
  else if (value === "zone4") map.projection = ZONE_4;
}
