/**
 * Middleware de Astro — tracking de bots de IA.
 *
 * Se ejecuta en cada request en el servidor (SSR/edge). Inspecciona el
 * User-Agent y Referer; si detecta un crawler de IA conocido, incrementa
 * su contador en Vercel KV de forma asíncrona (fire-and-forget) para que
 * no afecte el tiempo de respuesta.
 *
 * Es importante: aunque las páginas estén prerenderizadas (estáticas),
 * el middleware SÍ se ejecuta en el edge de Vercel en cada request,
 * por lo que captura los user-agents de los bots que acceden al sitio.
 */
import { defineMiddleware } from 'astro:middleware';
import { detectAiBot, trackAiBotVisit } from '@/services/ai-tracking.service';

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

  return response;
});
