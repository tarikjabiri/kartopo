import { Modal, Flex, Text, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren, useEffect } from "react";
import { IModalControl } from "@types";

export interface KCModalProps extends PropsWithChildren {
  control?: IModalControl;
  title: string;
  icon: JSX.Element;
}

export default function KCModal({
  control,
  title,
  icon,
  children,
}: KCModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (control) control.open = open;
  }, [control, open]);

  return (
    <Modal.Root
      opened={opened}
      onClose={close}
      zIndex={10000}
      trapFocus={false}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Modal.Overlay opacity={0.4} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Flex align="center" gap={"md"}>
              {icon}
              <Text size={"lg"} color="dimmed">{title}</Text>
            </Flex>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body p={"xs"}>{children}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
