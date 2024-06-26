import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

//tsconfigPaths to make relative import path work
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
