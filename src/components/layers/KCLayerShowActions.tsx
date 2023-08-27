import useLayerContext from "@hooks/useLayerContext";
import useLayersContext from "@hooks/useLayersContext";
import {
  ActionIcon,
  ActionIconProps,
  Code,
  DefaultMantineColor,
  Flex,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconEye,
  IconEyeClosed,
  IconTrash,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { Fragment } from "react";

function KCLayerEditAction() {
  const { toggle } = useLayersContext();
  const layer = useLayerContext();
  const props: ActionIconProps = {
    color: "indigo",
    size: "md",
    variant: "light",
  };
  return (
    <ActionIcon {...props} onClick={() => toggle(layer.name, "edit")}>
      <IconEdit />
    </ActionIcon>
  );
}

function KCLayerToggleAction() {
  const { toggle } = useLayersContext();
  const layer = useLayerContext();
  const color: DefaultMantineColor = layer.visible ? "orange" : "gray";
  const props: ActionIconProps = { color, size: "md", variant: "light" };
  const Icon = layer.visible ? <IconEye /> : <IconEyeClosed />;
  return (
    <ActionIcon {...props} onClick={() => toggle(layer.name, "visible")}>
      {Icon}
    </ActionIcon>
  );
}

function KCLayerDeleteAction() {
  const { remove } = useLayersContext();
  const layer = useLayerContext();
  const [opened, { open, close }] = useDisclosure(false);
  if (layer.name === "0") return null;
  const props: ActionIconProps = { color: "red", size: "md", variant: "light" };
  return (
    <Fragment>
      <ActionIcon {...props} onClick={() => open()}>
        <IconTrash />
      </ActionIcon>
      <Modal
        zIndex={10000}
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <Text>
          Delete the layer <Code color="red">{layer.name}</Code>?
        </Text>
        <Flex gap={"xs"} align={"center"} justify={"flex-end"}>
          <ActionIcon {...props} onClick={() => remove(layer.name)}>
            <IconCheck />
          </ActionIcon>
          <ActionIcon {...props} color="gray" onClick={() => close()}>
            <IconX />
          </ActionIcon>
        </Flex>
      </Modal>
    </Fragment>
  );
}

// function KCLayerZoomAction() {
//   const layer = useLayerContext();
//   const props: ActionIconProps = {
//     color: "indigo",
//     size: "md",
//     variant: "light",
//   };
//   function handle() {
//     const latlngs: LatLng[] = [];
//     layer.shapes(shape => {
//       if(shape instanceof Polyline) latlngs.push(shape.getLatLngs())
//     })
//   }
//   return (
//     <ActionIcon {...props} onClick={}>
//       <IconZoomInArea />
//     </ActionIcon>
//   );
// }

export default function KCLayerShowActions() {
  return (
    <Flex align={"center"} gap={"xs"}>
      <KCLayerEditAction />
      <KCLayerToggleAction />
      <KCLayerDeleteAction />
    </Flex>
  );
}
 