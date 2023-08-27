import KCMap from "@components/KCMap";
import CurrentLayerNameContext from "@contexts/CurrentLayerNameContext";
import ProjectionContext from "@contexts/ProjectionContext";
import { useCurrentLayerName } from "@hooks/useCurrentLayerName";
import { useProjection } from "@hooks/useProjection";

export default function KPHome() {
  const currentLayerNameHook = useCurrentLayerName();
  const projection = useProjection();
  return (
    <CurrentLayerNameContext.Provider value={currentLayerNameHook}>
      <ProjectionContext.Provider value={projection}>
        <KCMap />
      </ProjectionContext.Provider>
    </CurrentLayerNameContext.Provider>
  );
}
