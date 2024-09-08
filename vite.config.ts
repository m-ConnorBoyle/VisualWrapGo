/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import viteCompression from "vite-plugin-compression";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue(), viteCompression()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/__tests__/*.test.ts",
    exclude: [...configDefaults.exclude, "tests/e2e/*"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
