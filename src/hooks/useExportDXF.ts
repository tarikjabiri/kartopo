import { DXFExport } from "../map/export";
import useLayersContext from "./useLayersContext";

export function useExportDXF() {
  const { layers } = useLayersContext();
  return () => {
    const dxf = new DXFExport();
    dxf.export(layers);
  };
}
