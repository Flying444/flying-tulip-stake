import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    allowedHosts: [
      "5174-manyrios-flyingtulipsta-6zg5ugvzc28.ws-us120.gitpod.io",
      "5173-manyrios-flyingtulipsta-6zg5ugvzc28.ws-us120.gitpod.io",
    ],
    host: true,
  },
  
})