import { MantineProvider } from "@mantine/core";
import Home from "./Home";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        globalStyles: () => ({
          "#map": {
            height: "560px",
          },
          '.coordinates-control': {
            margin: "0",
            padding: "0 2px",
            backgroundColor: 'white',
            fontSize: "16px"
          },
          '.zones-control': {
            fontSize: "16px",
            padding: "2px"
          }
        }),
      }}
    >
      <Home />
    </MantineProvider>
  );
}

export default App;
