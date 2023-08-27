import { IProjectionHook, TProjection } from "@types";
import { useState } from "react";

export function useProjection(): IProjectionHook {
  const [projection, setProjection] = useState<TProjection>("EPSG:26191");

  return { projection, setProjection };
}
