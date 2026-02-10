import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Base path relative to root
  base: "/",

  build: {
    manifest: true,
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
    },
  },
});
