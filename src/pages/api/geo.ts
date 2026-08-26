/**
 * Endpoint server-side que lee las cabeceras geográficas inyectadas por Vercel.
 *
 * Vercel inyecta automáticamente estas cabeceras en cada request:
 *   x-vercel-ip-country      — código ISO del país (PE, ES, US…)
 *   x-vercel-ip-country-region — código de región/subdivisión
 *   x-vercel-ip-country-region-name — nombre de la región
 *   x-vercel-ip-city          — nombre de la ciudad
 *   x-vercel-ip-latitude      — latitud aproximada
 *   x-vercel-ip-longitude     — longitud aproximada
 *   x-vercel-ip-timezone      — zona horaria IANA (America/Lima)
 *
 * En desarrollo local estas cabeceras no existen, por lo que el endpoint
 * responde con un objeto vacío y el cliente lo maneja como "desconocido".
 *
 * Docs: https://vercel.com/docs/edge-network/headers
 */
import type { APIRoute } from 'astro';

export interface VisitorGeo {
  country?: string;
  region?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
  timezone?: string;
}

export const prerender = false;

export const GET: APIRoute = ({ request }) => {
  const headers = request.headers;

  const geo: VisitorGeo = {
    country: headers.get('x-vercel-ip-country') ?? undefined,
    region: headers.get('x-vercel-ip-country-region-name') ?? undefined,
    city: headers.get('x-vercel-ip-city') ?? undefined,
    latitude: headers.get('x-vercel-ip-latitude') ?? undefined,
    longitude: headers.get('x-vercel-ip-longitude') ?? undefined,
    timezone: headers.get('x-vercel-ip-timezone') ?? undefined,
  };

  // Si no hay país, el visitante no se pudo geolocalizar (p. ej. en dev).
  const hasData = Boolean(geo.country);

  return new Response(JSON.stringify({ geo, hasData }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};
