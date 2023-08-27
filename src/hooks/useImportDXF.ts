import { DXFImport } from "@map";
import useLayersContext from "./useLayersContext";

export function useImportDXF() {
  const { manager, setManager } = useLayersContext();
  return () => {
    const dxf = new DXFImport();
    dxf.import(manager).then(() => setManager(manager.clone()));
  };
}
