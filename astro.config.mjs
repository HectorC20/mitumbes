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
  security: {
    // Los endpoints /api/* (revalidate, images) son autenticados por clave
    // (Authorization: Bearer) y los llama mitumbes-server vía POST sin header
    // Origin; con checkOrigin activo (default de Astro) responde 403.
    checkOrigin: false,
  },
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
          'content-copy',
        ],
        // Redes sociales para la columna global de compartir.
        'simple-icons': ['whatsapp', 'facebook', 'x', 'linkedin'],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
