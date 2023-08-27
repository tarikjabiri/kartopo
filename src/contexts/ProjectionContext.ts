import { IProjectionHook } from "@types";
import { createContext } from "react";

const ProjectionContext = createContext<IProjectionHook | null>(null);

export default ProjectionContext;
