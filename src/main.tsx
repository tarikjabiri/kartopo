import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import KCApp from "@components/KCApp.tsx";

const rootElement = document.getElementById("root");

if (rootElement == null) throw new Error("No root element found!");

createRoot(rootElement).render(
  <StrictMode>
    <KCApp />
  </StrictMode>
);
