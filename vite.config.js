import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
  },
  plugins: [react(), mkcert()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        sw: "./src/sw.js",
      },
      output: {
        entryFileNames: (assetInfo) => {
          if (assetInfo.name === "sw") {
            return "sw.js";
          } else {
            return "assets/[name]-[hash].js";
          }
        },
      },
    },
  },
});
