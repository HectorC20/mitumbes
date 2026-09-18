import type { EnlaceContenido } from '../../services/contrato-web';

/**
 * Utilidades de mapa para el detalle de un lugar.
 *
 * La ubicación puede llegar de dos formas:
 *  - `coordinates` (lat/lng) ya resueltas por el backend, o
 *  - un enlace de Google Maps dentro de `links`, normalmente acortado
 *    (ej. https://maps.app.goo.gl/xxxx), que no contiene coordenadas.
 *
 * Cuando solo hay enlace, se sigue su redirect para extraer lat/lng y así
 * poder pintar el mapa embebido y la ruta. El resultado se cachea en memoria
 * porque las coordenadas de un lugar no cambian.
 */

export interface Coordenadas {
  lat: number;
  lng: number;
}

const URL_MAPA =
  /(?:maps\.app\.goo\.gl|goo\.gl\/maps|(?:www\.)?google\.[a-z.]+\/maps|maps\.google\.)/i;

/** Marcador exacto (`!3d…!4d…`) o centro de la vista (`@lat,lng`). */
const COORDS_MARCADOR = /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/;
const COORDS_VISTA = /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/;

/** Enlace de mapa del contenido (tipo `map`, o una URL de Google Maps). */
export function linkDeMapa(links: EnlaceContenido[] | undefined): string | undefined {
  return links?.find((l) => l.type === 'map' || URL_MAPA.test(l.url))?.url;
}

/** Extrae lat/lng de una URL completa de Google Maps (sin salir a la red). */
export function coordenadasDeUrl(url: string): Coordenadas | undefined {
  const match = COORDS_MARCADOR.exec(url) ?? COORDS_VISTA.exec(url);
  if (!match) return undefined;
  const lat = Number(match[1]);
  const lng = Number(match[2]);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : undefined;
}

const cache = new Map<string, Coordenadas>();

/** Resuelve lat/lng de un enlace de mapa, siguiendo su redirect si está acortado. */
export async function resolverCoordenadas(url: string): Promise<Coordenadas | undefined> {
  const directas = coordenadasDeUrl(url);
  if (directas) return directas;

  const enCache = cache.get(url);
  if (enCache) return enCache;

  try {
    const res = await fetch(url, {
      redirect: 'manual',
      signal: AbortSignal.timeout(4000),
    });
    const resueltas = coordenadasDeUrl(res.headers.get('location') ?? '');
    if (resueltas) cache.set(url, resueltas);
    return resueltas;
  } catch {
    // Sin red o Google rechazó la petición: se sigue mostrando el enlace.
    return undefined;
  }
}

/** URL del mapa centrado en las coordenadas. */
export function urlMapa(coordenadas: Coordenadas): string {
  return `https://www.google.com/maps?q=${coordenadas.lat},${coordenadas.lng}`;
}

/** URL de indicaciones ("Cómo llegar") hasta las coordenadas. */
export function urlComoLlegar(coordenadas: Coordenadas): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${coordenadas.lat},${coordenadas.lng}`;
}

/** URL del mapa embebible (sin API key) para el iframe del aside. */
export function urlMapaEmbed(coordenadas: Coordenadas): string {
  return `https://www.google.com/maps?q=${coordenadas.lat},${coordenadas.lng}&z=16&output=embed`;
}
