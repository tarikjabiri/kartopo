import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "url";

function replacement(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
          "mantine-core": ["@mantine/core"],
          leaflet: ["leaflet"],
          dxf: ["@tarikjabiri/dxf"],
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: "@components", replacement: replacement("./src/components") },
      { find: "@contexts", replacement: replacement("./src/contexts") },
      { find: "@hooks", replacement: replacement("./src/hooks") },
      { find: "@map", replacement: replacement("./src/map") },
      { find: "@pages", replacement: replacement("./src/pages") },
      { find: "@router", replacement: replacement("./src/router") },
      { find: "@types", replacement: replacement("./src/types") },
      { find: "@utils", replacement: replacement("./src/utils") },
    ],
  },
});
