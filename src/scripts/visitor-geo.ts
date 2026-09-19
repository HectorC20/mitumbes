/**
 * Detección de geolocalización del visitante usando las cabeceras de Vercel.
 *
 * El endpoint /api/geo (server-side, no prerenderizado) lee las cabeceras
 * x-vercel-ip-* que Vercel inyecta en cada request y devuelve un JSON con
 * país, región, ciudad, lat/lng y zona horaria.
 *
 * Este script client-side consulta ese endpoint y renderiza un badge discreto
 * en el header indicando desde dónde visita el usuario. Si no hay datos
 * (p. ej. en desarrollo local), el contenedor se oculta.
 */

interface VisitorGeoResponse {
  geo: {
    country?: string;
    region?: string;
    city?: string;
    latitude?: string;
    longitude?: string;
    timezone?: string;
  };
  hasData: boolean;
}

/** Convierte un código ISO de país a su bandera emoji. */
function countryFlag(iso?: string): string {
  if (!iso || iso.length !== 2) return '';
  const codePoints = iso
    .toUpperCase()
    .split('')
    .map((c) => 0x1f1e6 + (c.charCodeAt(0) - 65));
  return String.fromCodePoint(...codePoints);
}

export async function initVisitorGeo(): Promise<void> {
  const badge = document.querySelector<HTMLElement>('[data-visitor-geo]');
  if (!badge) return;

  try {
    const res = await fetch('/api/geo', { headers: { Accept: 'application/json' } });
    if (!res.ok) return;

    const { geo, hasData } = (await res.json()) as VisitorGeoResponse;
    if (!hasData || !geo.country) return;

    const countryCode = geo.country.toUpperCase();
    const flag = countryFlag(countryCode);

    // Solo se muestran las siglas del país en el badge (ej: 🇦🇷 AR o 🇵🇪 PE)
    badge.textContent = flag ? `${flag} ${countryCode}` : countryCode;

    // Ubicación completa decodificada para el tooltip (title) y accesibilidad (aria-label)
    let decodedCity = geo.city ?? '';
    let decodedRegion = geo.region ?? '';
    try { decodedCity = decodeURIComponent(decodedCity); } catch {}
    try { decodedRegion = decodeURIComponent(decodedRegion); } catch {}

    const parts = [decodedCity, decodedRegion, countryCode].filter(Boolean);
    const fullLocation = parts.join(', ');
    const ariaBase = badge.getAttribute('data-visitor-geo-aria');

    badge.setAttribute('title', fullLocation);
    badge.setAttribute('aria-label', ariaBase ? `${ariaBase}: ${fullLocation}` : fullLocation);
    badge.removeAttribute('hidden');
  } catch {
    // Silencioso: si la geolocalización falla, simplemente no se muestra.
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initVisitorGeo());
  } else {
    initVisitorGeo();
  }
}
