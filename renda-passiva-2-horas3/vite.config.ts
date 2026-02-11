import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/renda-passiva-2-horas3/",
  build: {
    target: "es2022",
    manifest: true,
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
    },
  },
});
