import useLayersContext from "@hooks/useLayersContext";
import { ActionIconProps, Flex, ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconCircleX } from "@tabler/icons-react";
import { ILayer } from "@types";
import { KCLayerEditProps } from "./KCLayerEdit";

export interface KCLayerEditActionsProps extends KCLayerEditProps {
  newLayer: ILayer;
}

export default function KCLayerEditActions({
  oldLayer,
  newLayer,
  cancelAdd,
}: KCLayerEditActionsProps) {
  const { add, update, toggle } = useLayersContext();
  const props: ActionIconProps = {
    color: "blue",
    size: "md",
    variant: "light",
  };
  function handleSave() {
    if (oldLayer.name === "" && cancelAdd) add(newLayer), cancelAdd();
    else update(oldLayer.name, newLayer);
  }
  function handleCancel() {
    if (oldLayer.name === "" && cancelAdd) cancelAdd();
    else toggle(oldLayer.name, "edit");
  }
  return (
    <Flex align={"center"} gap={"xs"}>
      <ActionIcon {...props} onClick={handleSave}>
        <IconDeviceFloppy />
      </ActionIcon>
      <ActionIcon {...props} color="red" onClick={handleCancel}>
        <IconCircleX />
      </ActionIcon>
    </Flex>
  );
}
