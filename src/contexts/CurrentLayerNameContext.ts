import { ICurrentLayerNameHook } from "@types";
import { createContext } from "react";

const CurrentLayerNameContext = createContext<ICurrentLayerNameHook | null>(null);

export default CurrentLayerNameContext;