import { ILayersHook } from "@types";
import { createContext } from "react";

const LayersContext = createContext<ILayersHook | null>(null);

export default LayersContext;
