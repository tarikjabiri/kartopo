import { FilesControl } from "@map";
import { IconFile, IconFileExport, IconFileImport } from "@tabler/icons-react";
import KCModal from "./KCModal";
import { Button, ButtonProps, Flex, Paper, Space } from "@mantine/core";
import { useExportDXF } from "@hooks/useExportDXF";
import { useImportDXF } from "@hooks/useImportDXF";

interface KCButtonProps extends ButtonProps {
  content: string;
  handle?: () => void;
}
function KCExportButton({ content, handle, ...props }: KCButtonProps) {
  return (
    <Button
      {...props}
      leftIcon={<IconFileExport />}
      variant="outline"
      color="indigo"
      onClick={handle}
    >
      EXPORT {content}
    </Button>
  );
}

function KCImportButton({ content, handle, ...props }: KCButtonProps) {
  return (
    <Button
      {...props}
      leftIcon={<IconFileImport />}
      variant="outline"
      color="teal"
      onClick={handle}
    >
      IMPORT {content}
    </Button>
  );
}

export default function KCFilesModal() {
  const exportDXF = useExportDXF();
  const importDXF = useImportDXF();
  return (
    <KCModal
      control={FilesControl.instance()}
      title="Import/Export"
      icon={<IconFile color="gray" />}
    >
      <Paper withBorder>
        <Flex direction={"column"} gap={"xs"} p={"xs"}>
          <KCImportButton handle={importDXF} content="DXF" />
          <KCImportButton content="SHAPEFILE" disabled />
          <KCImportButton content="GEOJSON" disabled />
        </Flex>
      </Paper>
      <Space h="xs" />
      <Paper withBorder color="red">
        <Flex direction={"column"} gap={"xs"} p={"xs"}>
          <KCExportButton handle={exportDXF} content="DXF" />
          <KCExportButton content="SHAPEFILE" disabled />
          <KCExportButton content="GEOJSON" disabled />
        </Flex>
      </Paper>
    </KCModal>
  );
}
