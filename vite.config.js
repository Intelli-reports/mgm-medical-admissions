import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    // Split CSS per chunk (admin CSS won't load on home page)
    cssCodeSplit: true,

    // Warn if any single chunk exceeds 400KB
    chunkSizeWarningLimit: 400,

    rollupOptions: {
      output: {
        // Split vendor libraries into separate cached chunks
        manualChunks(id) {
          // React core — very stable, cache long-term
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "vendor-react";
          }
          // Router — rarely changes
          if (id.includes("node_modules/react-router")) {
            return "vendor-router";
          }
          // Framer Motion — large, cache separately
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-motion";
          }
          // Lucide icons — cache separately
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          // Everything else in node_modules
          if (id.includes("node_modules")) {
            return "vendor-misc";
          }
        }
      }
    }
  }
});
