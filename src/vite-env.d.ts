/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_ZOOM: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
