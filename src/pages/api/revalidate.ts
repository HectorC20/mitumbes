/**
 * Endpoint de revalidación: lo llama mitumbes-server cuando crea, actualiza o
 * elimina contenido (places, events, categories, routes).
 *
 * Ya no hay caché de contenido en memoria que invalidar (en serverless la
 * memoria es por instancia y no se comparte entre requests): cada render SSR
 * consulta el backend directamente, así que los cambios se reflejan en el
 * siguiente request. Este endpoint se mantiene como confirmación (ACK) para
 * que mitumbes-server registre que la web está operativa.
 *
 * Autenticación: header `Authorization: Bearer <CONTENT_REVALIDATE_KEY>`.
 * Si la variable no está configurada, se rechaza la petición.
 */
import type { APIRoute } from 'astro';

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

  return new Response(JSON.stringify({ ok: true, invalidatedAt: new Date().toISOString() }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};
