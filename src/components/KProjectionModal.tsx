import { Button, Modal, Select } from "@mantine/core";

export interface KProjectionModalProps {
  opened: boolean;
  close: () => void;
}

export default function KProjectionModal({
  opened,
  close,
}: KProjectionModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Choisissez votre projection:"
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Select
        data-autofocus
        withinPortal={true}
        defaultValue={"1"}
        data={[
          { value: "1", label: "Zone 1" },
          { value: "2", label: "Zone 2" },
          { value: "3", label: "Zone 3" },
          { value: "4", label: "Zone 4" },
        ]}
      />
      <Button mt={"md"} onClick={() => {}}>
        Confirmer
      </Button>
    </Modal>
  );
}
