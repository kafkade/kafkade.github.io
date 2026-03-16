import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Environment indicator — exposes the deploy branch as a build-time global.
// Cloudflare Pages sets CF_PAGES_BRANCH automatically per deployment.
// "main" is mapped to "production"; any other branch keeps its name (e.g. "beta").
// The __ENVIRONMENT__ global is used in BaseLayout (HTML comment) and Footer (visual badge).
// See: https://developers.cloudflare.com/pages/configuration/build-configuration/
const branch = process.env.CF_PAGES_BRANCH || 'production';
const environment = branch === 'main' ? 'production' : branch;

export default defineConfig({
  site: 'https://kafkade.com',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      __ENVIRONMENT__: JSON.stringify(environment),
    },
  },
});
