// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://mitumbes.com',
  integrations: [
    // Íconos vía astro-icon + iconify. Solo se empaquetan los íconos mdi usados.
    // simple-icons queda disponible para redes sociales (se agrega al include cuando se use).
    icon({
      include: {
        mdi: [
          'magnify',
          'map-marker',
          'clock-outline',
          'tag-outline',
          'star',
          'arrow-right',
          'phone',
          'earth',
          'waves',
          'silverware-fork-knife',
          'bed',
          'pulse',
          'calendar',
          'information',
          'compass',
          'menu',
          'car',
          'check',
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
