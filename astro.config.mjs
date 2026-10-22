import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { rehypeCodeBlockWrapper } from './src/integrations/rehype-code-block.ts';

// https://astro.build/config
export default defineConfig({
  // Production domain served by Cloudflare Workers (static assets)
  site: 'https://gibranlopez.com',
  output: 'static',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
    rehypePlugins: [rehypeCodeBlockWrapper],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    optimizeDeps: {
      include: ['gsap', 'lenis'],
    },
  },
});
