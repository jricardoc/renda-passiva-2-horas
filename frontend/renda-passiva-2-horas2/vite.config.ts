import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// @ts-expect-error JS file without declaration
import performanceAnalyzer from "./vite-plugins/performance-analyzer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  const isAnalyze = mode === "analyze";

  return {
    base: "/renda-passiva-2-horas2/",
    plugins: [
      react(),

      // Image optimization (AVIF, WebP, responsive)
      isProduction &&
        ViteImageOptimizer({
          test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
          includePublic: true,
          logStats: true,
          ansiColors: true,
          svg: {
            multipass: true,
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    cleanupNumericValues: false,
                    removeViewBox: false,
                  },
                },
              },
              "sortAttrs",
            ],
          },
          png: { quality: 85 },
          jpeg: { quality: 85, progressive: true },
          jpg: { quality: 85, progressive: true },
          webp: { quality: 85 },
          avif: { quality: 85, effort: 4 },
        }),

      // Gzip compression
      isProduction &&
        viteCompression({
          algorithm: "gzip",
          ext: ".gz",
          threshold: 10240,
          deleteOriginFile: false,
        }),

      // Brotli compression
      isProduction &&
        viteCompression({
          algorithm: "brotliCompress",
          ext: ".br",
          threshold: 10240,
          deleteOriginFile: false,
        }),

      // Bundle analyzer
      (isAnalyze || isProduction) &&
        visualizer({
          filename: "./dist/stats.html",
          open: isAnalyze,
          gzipSize: true,
          brotliSize: true,
        }),

      // Performance budget checker
      isProduction &&
        performanceAnalyzer({
          budgetFile: "./performance-budget.json",
          failOnExceeded: process.env.CI === "true",
        }),
    ].filter(Boolean),

    build: {
      outDir: "dist",
      assetsDir: "assets",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            ui: ["gsap", "swiper"],
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return "assets/[name]-[hash][extname]";
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (
              /\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/.test(
                assetInfo.name,
              )
            ) {
              return `assets/images/[name]-[hash].${ext}`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `assets/fonts/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          },
        },
      },
      chunkSizeWarningLimit: 500,
      reportCompressedSize: true,
      cssCodeSplit: true,
    },

    server: {
      port: 3000,
      open: false,
      cors: true,
    },

    preview: {
      port: 4173,
      open: false,
    },
  };
});
