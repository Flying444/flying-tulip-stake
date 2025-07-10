/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PROJECT_ID: string;
    readonly VITE_API_KEY: string;
    readonly VITE_API_COUNTER: string;
    readonly VITE_API_POOLS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
} 