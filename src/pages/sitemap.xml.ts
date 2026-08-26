import type { APIRoute } from 'astro';
import { lugaresService } from '../services/lugares.service';
import { categoriasService } from '../services/categorias.service';
import { zonasService } from '../services/zonas.service';
import { SITE } from '../shared/constants/site';
import { LOCALES } from '../shared/constants/locales';
import { rutaCategoria, rutaContenido, rutaZona } from '../shared/content/places';

export const prerender = true;

interface UrlEntry {
  url: string;
  priority: number;
  lastmod?: string;
}

export const GET: APIRoute = async () => {
  const [contenidos, categorias, zonas] = await Promise.all([
    lugaresService.listarTodos(),
    categoriasService.listar(),
    zonasService.listar(),
  ]);

  const urls: UrlEntry[] = [];

  for (const lang of LOCALES) {
    // El idioma por defecto (es) vive en la raíz; los demás bajo /[lang]/.
    const homePath = lang === 'es' ? '/' : `/${lang}/`;
    const l = (path: string) =>
      path === '/' ? `${SITE.url}${homePath}` : `${SITE.url}/${lang}${path}`;

    urls.push({ url: l('/'), priority: 1.0 });
    urls.push({ url: l('/places/'), priority: 0.9 });
    urls.push({ url: l('/categories/'), priority: 0.6 });
    urls.push({ url: l('/zones/'), priority: 0.6 });

    for (const item of contenidos) {
      urls.push({
        url: l(rutaContenido(item)),
        priority: 0.8,
        lastmod: item.data.updatedAt?.toISOString().slice(0, 10),
      });
    }
    for (const categoria of categorias) {
      urls.push({
        url: l(rutaCategoria(categoria.collection)),
        priority: 0.6,
      });
    }
    for (const zona of zonas) {
      urls.push({ url: l(rutaZona(zona.id)), priority: 0.6 });
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.url}</loc>
    ${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
