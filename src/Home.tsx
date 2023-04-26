import { Container, SegmentedControl, Divider } from "@mantine/core";
import "leaflet/dist/leaflet.css";
import Map from "./Map";
import { useState } from "react";
import Tools from "./Tools";

export default function Home() {
  const [value, setValue] = useState("map");
  return (
    <Container>
      <SegmentedControl
        mt={"xs"}
        onChange={setValue}
        data={[
          { label: "Map", value: "map" },
          { label: "Outils", value: "tools" },
        ]}
      />
      <Divider my="sm" />
      {value === "map" ? <Map /> : <Tools />}
    </Container>
  );
}
