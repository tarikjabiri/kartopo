import { LayersControl } from "@map";
import KCLayers from "./layers";
import { IconStack2 } from "@tabler/icons-react";
import KCModal from "./KCModal";

export default function KCLayersModal() {
  return (
    <KCModal
      control={LayersControl.instance()}
      title="Layers"
      icon={<IconStack2 color="gray" />}
    >
      <KCLayers />
    </KCModal>
  );
}
