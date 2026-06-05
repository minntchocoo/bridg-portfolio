// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Deployed via GitHub Pages as a project site:
  //   https://minntchocoo.github.io/bridg-portfolio/
  // `site` + `base` make Astro emit correct absolute URLs and base path.
  site: 'https://minntchocoo.github.io',
  base: '/bridg-portfolio',
});
