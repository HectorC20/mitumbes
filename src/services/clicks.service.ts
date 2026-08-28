/**
 * Servicio de ranking de categorías por clics (SSR).
 *
 * Todo corre en el servidor de Astro (SSR), no en el navegador:
 *  - `obtenerClicks()`  → GET  /api/analytics/category-clicks (ranking desc).
 *  - `registrarVistaCategoria(slug)` → POST /api/analytics/category-click:
 *    se llama al renderizar la página de una categoría (el clic del visitante
 *    en el home desemboca ahí) y suma 1 al ranking en Vercel KV.
 *  - `reordenarPorClics()` → 4 categorías con más clics + 2 al azar.
 *
 * Si no hay backend configurado (sin PUBLIC_API_URL), las llamadas se omiten
 * y el home conserva el orden original, sin bloquear nada.
 */
import { api } from './api';
import { apiHabilitada } from './contenido-api';

/** Ranking de clics por categoría (slug → conteo). undefined si no hay backend. */
async function obtenerClicks(): Promise<Map<string, number> | undefined> {
  if (!apiHabilitada()) return undefined;
  try {
    const items = await api.get<{ slug: string; count: number }[]>(
      '/analytics/category-clicks',
    );
    return new Map(items.map((i) => [i.slug, i.count]));
  } catch {
    return undefined;
  }
}

/**
 * Suma una vista a la categoría (la llama el SSR de la página de la categoría).
 * Nunca lanza: si falla, la página se renderiza igual.
 */
async function registrarVistaCategoria(slug: string): Promise<void> {
  if (!apiHabilitada()) return;
  try {
    await api.post(
      '/analytics/category-click',
      { slug },
      { timeoutMs: 3000 },
    );
  } catch {
    // Silencioso: el ranking no debe romper el render de la página.
  }
}

/**
 * Reordena las categorías del home: las 4 con más clics primero y 2 al azar
 * de las restantes. Sin datos de clics devuelve el orden original.
 */
function reordenarPorClics<T extends { collection: string }>(
  categorias: T[],
  clicks?: Map<string, number>,
): T[] {
  if (!clicks || clicks.size === 0) return categorias;
  const ordenadas = [...categorias].sort(
    (a, b) => (clicks.get(b.collection) ?? 0) - (clicks.get(a.collection) ?? 0),
  );
  const top = ordenadas.slice(0, 4);
  const resto = ordenadas.slice(4);
  // Fisher–Yates parcial: mezcla el resto y toma 2 aleatorias.
  for (let i = resto.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [resto[i], resto[j]] = [resto[j], resto[i]];
  }
  return [...top, ...resto.slice(0, 2)];
}

export const clicksService = {
  obtenerClicks,
  registrarVistaCategoria,
  reordenarPorClics,
};
