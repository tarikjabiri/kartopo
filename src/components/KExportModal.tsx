import { Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFileDownload } from "@tabler/icons-react";
import { MapManager } from "../map";

export interface KExportModalProps {
  disclosure: ReturnType<typeof useDisclosure>;
}

export default function KExportModal({ disclosure }: KExportModalProps) {
  const [opened, { close }] = disclosure;

  const btnProps = {
    variant: "light",
    color: "orange",
    uppercase: true,
    leftIcon: <IconFileDownload size="1rem" />,
  };

  return (
    <Modal.Root opened={opened} onClose={close} zIndex={10000} size="sm">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Flex justify="flex-start" align="center" gap={"xs"}>
              <IconFileDownload size="1rem" />
              <Text>Export:</Text>
            </Flex>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Flex direction={"column"} gap={"xs"} pt={"xs"}>
            <Button data-autofocus {...btnProps} onClick={MapManager.dxfy}>
              DXF
            </Button>
            <Button {...btnProps}>SHAPEFILE</Button>
            <Button {...btnProps} onClick={MapManager.geojson}>
              GEOJSON
            </Button>
            <Button {...btnProps}>KML</Button>
            <Button {...btnProps}>POINTS</Button>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
