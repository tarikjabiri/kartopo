import { Flex, Modal, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconWorld } from "@tabler/icons-react";

export interface KProjectionModalProps {
  disclosure: ReturnType<typeof useDisclosure>;
  projection: [string, (value: string) => void];
}

export default function KProjectionModal({
  disclosure,
  projection,
}: KProjectionModalProps) {
  const [opened, { close }] = disclosure;
  const [proj, setProj] = projection;

  return (
    <Modal.Root opened={opened} onClose={close} zIndex={10000}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Flex justify="flex-start" align="center" gap={"xs"}>
              <IconWorld size="1rem" />
              <Text>Choisissez votre projection:</Text>
            </Flex>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Select
            data-autofocus
            withinPortal={true}
            defaultValue={"EPSG:26191"}
            value={proj}
            onChange={setProj}
            icon={<IconWorld size="1rem" />}
            zIndex={10000}
            data={[
              { value: "EPSG:26191", label: "Merchich / Nord Maroc, Zone 1" },
              { value: "EPSG:26192", label: "Merchich / Sud Maroc, Zone 2" },
              { value: "EPSG:26194", label: "Merchich / Sahara Nord, Zone 3" },
              { value: "EPSG:26195", label: "Merchich / Sahara Sud, Zone 4" },
            ]}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
