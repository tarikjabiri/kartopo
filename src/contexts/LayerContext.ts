import { ILayer } from "@types";
import { createContext } from "react";

const LayerContext = createContext<ILayer | null>(null);

export default LayerContext;