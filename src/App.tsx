import {
  MantineProvider,
} from "@mantine/core";
import Home from "./Home";

function App() {
  return (
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          globalStyles: () => ({
            "#map": {
              height: "520px",
            },
          }),
        }}
      >
        <Home />
      </MantineProvider>
  );
}

export default App;
