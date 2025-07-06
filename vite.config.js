import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(path.dirname, "./src"),
      // "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(path.dirname, "./src/components"),
      "@assets": path.resolve(path.dirname, "./src/assets"),
      "@utils": path.resolve(path.dirname, "./src/utils"),
    },
  },
  plugins: [react(), tailwindcss()],
});
