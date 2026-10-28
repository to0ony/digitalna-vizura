import { copyFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Nepostojeće adrese Vercel poslužuje iz 404.html sa statusom 404. To je kopija
// aplikacije, pa posjetitelj i dalje završi na naslovnoj, a tražilica dobije 404.
const notFoundPage = {
  name: "not-found-page",
  apply: "build",
  closeBundle() {
    copyFileSync("dist/index.html", "dist/404.html");
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), notFoundPage],
});
