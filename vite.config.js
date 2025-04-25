import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  // 在 http://chenhai.net/tools/subrip_subtitle_sort/ 上部署上需要调整 base
  // base: '/tools/subrip_subtitle_sort/'
});
