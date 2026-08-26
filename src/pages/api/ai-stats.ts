/**
 * Endpoint protegido por API key que devuelve el ranking de modelos de IA
 * que han visitado el sitio, ordenado por número de consultas (desc).
 *
 * Autenticación: header `Authorization: Bearer <API_KEY>` donde API_KEY
 * se configura con la variable de entorno AI_STATS_API_KEY.
 *
 * Si la variable no está definida o la key no coincide, responde 401.
 *
 * Uso:
 *   curl -H "Authorization: Bearer <key>" https://mitumbes.com/api/ai-stats
 */
import type { APIRoute } from 'astro';
import { getAiStats } from '@/services/ai-tracking.service';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const expectedKey = import.meta.env.AI_STATS_API_KEY;

  // Sin API key configurada → denegar siempre.
  if (!expectedKey) {
    return new Response(
      JSON.stringify({ error: 'AI_STATS_API_KEY no configurada' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const authHeader = request.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : '';

  if (token !== expectedKey) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stats = await getAiStats();
  const total = stats.reduce((sum, s) => sum + s.count, 0);

  return new Response(
    JSON.stringify({
      total,
      models: stats,
      updatedAt: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    },
  );
};
