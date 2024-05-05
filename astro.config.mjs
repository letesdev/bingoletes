import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://letesdev.github.io',
  base: '/bingoletes',
  integrations: [tailwind()]
});