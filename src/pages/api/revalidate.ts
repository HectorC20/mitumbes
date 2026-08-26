/**
 * Endpoint de revalidación: lo llama mitumbes-server cuando crea, actualiza o
 * elimina contenido (places, events, categories, routes), para que la web
 * invalide su caché y refleje el cambio de inmediato en SSR.
 *
 * Autenticación: header `Authorization: Bearer <CONTENT_REVALIDATE_KEY>`.
 * Si la variable no está configurada, se rechaza la petición.
 */
import type { APIRoute } from 'astro';
import { invalidarCacheContenido } from '@/services/contenido-api';

export const prerender = false;

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

  invalidarCacheContenido();

  return new Response(JSON.stringify({ ok: true, invalidatedAt: new Date().toISOString() }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};
