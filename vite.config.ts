import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from GitHub Pages at /pg-tournament/
export default defineConfig({
  base: "/pg-tournament/",
  plugins: [react()],
});
