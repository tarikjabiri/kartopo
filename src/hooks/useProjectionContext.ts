import ProjectionContext from "@contexts/ProjectionContext";
import { useContext } from "react";

export default function useLayersContext() {
  const context = useContext(ProjectionContext);
  if (context == null) throw new Error("No projection context provided!");
  return context;
}
