import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // AQUI ESTÁ O SEGREDO: Caminho absoluto para a pasta dentro do tema
  base: "/wp-content/themes/jricardodev/app-renda-passiva/",

  build: {
    manifest: true,
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
    },
  },
});
