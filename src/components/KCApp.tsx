import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import router from "@router";
import LayersContext from "@contexts/LayersContext";
import useLayers from "@hooks/useLayers";

export default function KCApp() {
  const layers = useLayers();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <LayersContext.Provider value={layers}>
        <RouterProvider router={router} />
      </LayersContext.Provider>
    </MantineProvider>
  );
}
