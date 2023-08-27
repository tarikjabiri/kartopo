import { Flex, ColorInput, TextInput, Paper } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { ILayer } from "@types";
import KCLayerEditActions from "./KCLayerEditActions";

export interface KCLayerEditProps {
  oldLayer: ILayer;
  cancelAdd?: () => void;
}

export default function KCLayerEdit({ oldLayer, cancelAdd }: KCLayerEditProps) {
  const [layer, setLayer] = useState(oldLayer);
  function nameChange(event: ChangeEvent<HTMLInputElement>) {
    setLayer({ ...layer, name: event.currentTarget.value });
  }
  function colorChange(color: string) {
    setLayer({ ...layer, color });
  }
  const disable = oldLayer.name === "0";
  return (
    <Paper withBorder p={3} mb={4}>
      <Flex align={"center"} justify={"space-between"} gap={"xs"}>
        <TextInput
          size="xs"
          value={layer.name}
          onChange={nameChange}
          disabled={disable}
          placeholder="Layer name"
        />
        <ColorInput
          dropdownZIndex={10000}
          size="xs"
          value={layer.color}
          onChange={colorChange}
        />
        <KCLayerEditActions
          oldLayer={oldLayer}
          newLayer={layer}
          cancelAdd={cancelAdd}
        />
      </Flex>
    </Paper>
  );
}
