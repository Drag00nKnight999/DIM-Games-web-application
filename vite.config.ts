import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "client",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  server: {
    host: "0.0.0.0", // Ensure it is set to 0.0.0.0
    port: 5000,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://0.0.0.0:3000", // Ensure the target is correct
        changeOrigin: true,
      },
    },
    allowedHosts: [
      "a929391b-5c51-48a0-b516-ada3cf756ec9-00-veseth5toeg9.kirk.replit.dev" // Add your specific host here
    ],
  },
});
