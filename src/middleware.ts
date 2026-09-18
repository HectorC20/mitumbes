/**
 * Middleware de Astro — tracking de bots de IA y charset de las respuestas.
 *
 * Se ejecuta en cada request en el servidor (SSR/edge). Inspecciona el
 * User-Agent y Referer; si detecta un crawler de IA conocido, incrementa
 * su contador en Vercel KV de forma asíncrona (fire-and-forget) para que
 * no afecte el tiempo de respuesta.
 *
 * Es importante: aunque las páginas estén prerenderizadas (estáticas),
 * el middleware SÍ se ejecuta en el edge de Vercel en cada request,
 * por lo que captura los user-agents de los bots que acceden al sitio.
 *
 * Además garantiza que las respuestas textuales (HTML, XML, JSON) declaren
 * `charset=utf-8` en la cabecera HTTP `Content-Type`. Sin esto el HTML se
 * sirve como `text/html` a secas y los validadores SEO lo reportan como
 * "no se especifica nada sobre codificación de caracteres en la cabecera".
 *
 * Por último habilita la caché de borde del HTML público. Sin esto cada
 * visita (y cada crawler) llega hasta el servidor: Vercel responde
 * `public, max-age=0, must-revalidate` en todo el SSR y Cloudflare marca las
 * páginas HTML como `DYNAMIC`, así que ninguna se cachea.
 */
import { defineMiddleware } from 'astro:middleware';
import { detectAiBot, trackAiBotVisit } from '@/services/ai-tracking.service';

/** Tipos MIME textuales que deben declarar su codificación. */
const TEXTUAL_CONTENT_TYPE = /^(text\/|application\/(xml|json|javascript))/i;

/**
 * Caché de borde del HTML público: fresco 10 minutos en el CDN y hasta 24 h
 * sirviendo la copia anterior mientras se refresca en segundo plano. Los
 * navegadores no guardan nada (`max-age=0`), así que cada navegación consulta
 * al borde y ve el contenido actualizado como máximo 10 minutos después.
 */
const CACHE_HTML = 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400';

/** Rutas que nunca deben cachearse: datos por visitante y mutaciones. */
const SIN_CACHE = /^\/api\//;

/**
 * Añade `charset=utf-8` al Content-Type si el tipo es textual y aún no lo
 * declara. Devuelve true cuando modifica las cabeceras.
 */
function conCharset(headers: Headers): boolean {
  const contentType = headers.get('content-type');
  if (!contentType || /charset=/i.test(contentType) || !TEXTUAL_CONTENT_TYPE.test(contentType)) {
    return false;
  }

  headers.set('content-type', `${contentType}; charset=utf-8`);
  return true;
}

/**
 * Marca el HTML público como cacheable en el CDN. Devuelve true cuando
 * modifica las cabeceras.
 */
function conCacheHtml(headers: Headers, request: Request, status: number): boolean {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false;
  if (status !== 200) return false;
  if (SIN_CACHE.test(new URL(request.url).pathname)) return false;

  const contentType = headers.get('content-type');
  if (!contentType || !contentType.startsWith('text/html')) return false;

  headers.set('cache-control', CACHE_HTML);
  return true;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Fire-and-forget: no esperamos a que termine para no bloquear la respuesta.
  // Solo en el servidor (Vercel), no en build/prerender.
  if (import.meta.env.PROD) {
    const userAgent = context.request.headers.get('user-agent') ?? '';
    const referer = context.request.headers.get('referer') ?? '';

    const detected = detectAiBot(userAgent, referer);
    if (detected) {
      // No se await: el tracking ocurre en segundo plano.
      void trackAiBotVisit(detected.model.id).catch(() => {});
    }
  }

  const headers = new Headers(response.headers);
  const cacheada = conCacheHtml(headers, context.request, response.status);
  const conCodificacion = conCharset(headers);

  if (!cacheada && !conCodificacion) {
    return response;
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
