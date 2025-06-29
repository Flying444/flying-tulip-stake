/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly PROJECT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
} 