/**
 * Endpoint de diagnóstico: responde qué fuente de datos usa la web en este
 * momento y qué ve de un contenido puntual.
 *
 * Útil cuando "la web no se actualiza": si `fuenteUsada` es "markdown", la web
 * NO está consumiendo mitumbes-server (PUBLIC_API_URL mal configurada o la API
 * no responde / no devuelve el shape esperado), así que solo un redeploy
 * actualiza el contenido.
 *
 * Uso: `curl https://www.mitumbes.com/api/diagnostico`
 */
import type { APIRoute } from 'astro';
import { apiHabilitada, getCategoriasApi, getContenidoApi } from '@/services/contenido-api';

export const prerender = false;

export const GET: APIRoute = async () => {
  const publicApiUrl = import.meta.env.PUBLIC_API_URL ?? '(no configurada → markdown)';

  const contenidos = apiHabilitada() ? await getContenidoApi() : undefined;
  const categorias = apiHabilitada() ? await getCategoriasApi() : undefined;

  const evento = contenidos?.find((c) => c.collection === 'events' && c.id === 'fiesta-patronal-papayal');

  const body = {
    generadoEn: new Date().toISOString(),
    publicApiUrl,
    apiHabilitada: apiHabilitada(),
    apiResponde: contenidos !== undefined,
    categoriasApiResponde: categorias !== undefined,
    fuenteUsada: contenidos ? 'api' : 'markdown',
    totalContenidos: contenidos?.length ?? null,
    totalCategorias: categorias?.length ?? null,
    eventoPapayal: evento
      ? {
          id: evento.id,
          title: evento.data.title.es,
          image: evento.data.image ?? '(sin imagen)',
          updatedAt: evento.data.updatedAt?.toISOString() ?? '(sin fecha)',
        }
      : null,
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
};
