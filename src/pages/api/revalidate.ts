/**
 * Endpoint de revalidación: lo llama mitumbes-server cuando crea, actualiza o
 * elimina contenido (places, events, categories, routes).
 *
 * El HTML público se cachea en el borde durante 10 minutos (ver src/middleware.ts),
 * así que aquí se purga esa caché en Cloudflare para que el cambio se vea al
 * instante en lugar de esperar a que expire el TTL.
 *
 * Cuerpo opcional (JSON) para purgar solo unas rutas concretas:
 *   { "paths": ["/es/places/mi-lugar"] }
 * Los elementos pueden ser rutas relativas o URLs completas. Sin cuerpo (o sin
 * `paths`) se purga todo el caché del sitio. Un cuerpo ilegible se ignora y
 * también purga todo.
 *
 * Autenticación: header `Authorization: Bearer <CONTENT_REVALIDATE_KEY>`.
 * Si la variable no está configurada, se rechaza la petición.
 *
 * La purga necesita `CLOUDFLARE_ZONE_ID` y `CLOUDFLARE_API_TOKEN` (token con el
 * permiso Zone → Cache Purge). Si faltan, el endpoint sigue respondiendo el ACK
 * y lo indica en `purge.motivo`.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

/** URLs máximas por llamada de purga (límite de Cloudflare fuera de Enterprise). */
const MAX_URLS = 30;

/** Resultado de la purga, incluido en la respuesta para poder diagnosticarla. */
interface ResultadoPurga {
  purgado: boolean;
  motivo?: string;
  urls?: string[] | string;
}

/** Convierte las rutas del cuerpo en URLs absolutas del sitio. */
function aUrls(paths: unknown): string[] | null {
  if (!Array.isArray(paths)) return null;

  const origen = String(import.meta.env.SITE ?? '').replace(/\/+$/, '');
  return paths
    .map((valor) => String(valor).trim())
    .filter((valor) => valor.length > 0)
    .map((valor) => (/^https?:\/\//i.test(valor) ? valor : `${origen}${valor.startsWith('/') ? '' : '/'}${valor}`))
    .slice(0, MAX_URLS);
}

/**
 * Lee las rutas a purgar del cuerpo JSON. Devuelve null cuando no hay cuerpo o
 * no trae `paths`: en ese caso se purga todo el sitio.
 */
async function leerRutas(request: Request): Promise<string[] | null> {
  const cuerpo = await request.text();
  if (!cuerpo.trim()) return null;

  try {
    const urls = aUrls(JSON.parse(cuerpo)?.paths);
    return urls && urls.length > 0 ? urls : null;
  } catch {
    return null;
  }
}

/** Purga en Cloudflare las URLs indicadas, o todo el caché del sitio si no hay. */
async function purgarCache(zoneId: string, apiToken: string, urls: string[] | null): Promise<ResultadoPurga> {
  const cuerpo = urls ? { files: urls } : { purge_everything: true };

  try {
    const respuesta = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(5000),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.text();
      return { purgado: false, motivo: `Cloudflare respondió ${respuesta.status}: ${detalle.slice(0, 200)}` };
    }

    return { purgado: true, urls: urls ?? 'todo el sitio' };
  } catch (error) {
    return { purgado: false, motivo: error instanceof Error ? error.message : 'Error al llamar a Cloudflare' };
  }
}

export const POST: APIRoute = async ({ request }) => {
  const expectedKey = import.meta.env.CONTENT_REVALIDATE_KEY;

  if (!expectedKey) {
    return new Response(JSON.stringify({ error: 'CONTENT_REVALIDATE_KEY no configurada' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const authHeader = request.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

  if (token !== expectedKey) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const zoneId = import.meta.env.CLOUDFLARE_ZONE_ID;
  const apiToken = import.meta.env.CLOUDFLARE_API_TOKEN;

  const purge: ResultadoPurga =
    zoneId && apiToken
      ? await purgarCache(zoneId, apiToken, await leerRutas(request))
      : { purgado: false, motivo: 'CLOUDFLARE_ZONE_ID o CLOUDFLARE_API_TOKEN no configuradas' };

  return new Response(JSON.stringify({ ok: true, invalidatedAt: new Date().toISOString(), purge }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};
