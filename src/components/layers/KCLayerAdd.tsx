import { ActionIcon, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import KCLayerEdit from "./KCLayerEdit";
import { createLayer } from "@utils";
import { useState } from "react";

interface KCLayerAddActionProps {
  add: () => void;
}

function KCLayerAddAction({ add }: KCLayerAddActionProps) {
  return (
    <Flex align={"center"} justify={"flex-end"}>
      <ActionIcon onClick={add} color="green" variant="light">
        <IconPlus />
      </ActionIcon>
    </Flex>
  );
}

export default function KCLayerAdd() {
  const [add, setAdd] = useState(false);

  if (!add) return <KCLayerAddAction add={() => setAdd(true)} />;

  return (
    <KCLayerEdit oldLayer={createLayer("")} cancelAdd={() => setAdd(false)} />
  );
}
