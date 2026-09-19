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

function safeDecode(val: string | null): string | undefined {
  if (!val) return undefined;
  try {
    return decodeURIComponent(val);
  } catch {
    return val;
  }
}

export const GET: APIRoute = ({ request, url }) => {
  const headers = request.headers;

  const geo: VisitorGeo = {
    country: headers.get('x-vercel-ip-country') ?? undefined,
    region: safeDecode(headers.get('x-vercel-ip-country-region-name')),
    city: safeDecode(headers.get('x-vercel-ip-city')),
    latitude: headers.get('x-vercel-ip-latitude') ?? undefined,
    longitude: headers.get('x-vercel-ip-longitude') ?? undefined,
    timezone: headers.get('x-vercel-ip-timezone') ?? undefined,
  };

  // Fallback para desarrollo local (permite probar con ?country=AR&city=Buenos+Aires)
  if (!geo.country && import.meta.env.DEV) {
    geo.country = url.searchParams.get('country') || 'PE';
    geo.region = url.searchParams.get('region') || 'Tumbes';
    geo.city = url.searchParams.get('city') || 'Tumbes';
    geo.timezone = url.searchParams.get('timezone') || 'America/Lima';
  }

  // Si no hay país, el visitante no se pudo geolocalizar
  const hasData = Boolean(geo.country);

  return new Response(JSON.stringify({ geo, hasData }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};
