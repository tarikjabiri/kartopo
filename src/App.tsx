import { MantineProvider } from "@mantine/core";
import KMap from "./components/KMap";

export default function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <KMap />
    </MantineProvider>
  );
}
