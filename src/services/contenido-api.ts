import { api } from './api';
import {
  normalizarEntrada,
  porActualizacionDesc,
  type ContratoEntry,
  type EntradaContenido,
  type ZonaLigera,
} from './contrato-web';

/**
 * Adaptador de contenido: consume el contrato del backend cuando
 * PUBLIC_API_URL está configurada. La web ya no tiene contenido local;
 * si la API no responde, las operaciones devuelven undefined (la capa de
 * datos las traduce a listas vacías).
 *
 * Sin caché módulo-level: en Vercel (serverless) la memoria es por instancia,
 * así que una caché en memoria no se comparte entre requests y la invalidación
 * desde /api/revalidate no llega a todas las instancias. Cada render SSR
 * consulta el backend, garantizando datos frescos al siguiente request.
 */

const API_BASE = import.meta.env.PUBLIC_API_URL ?? '';

/**
 * Caché en memoria SOLO para `astro dev`.
 * En producción (serverless de Vercel) la memoria es por instancia y no se
 * comparte, así que ahí cada render consulta el backend (datos frescos). En
 * `astro dev` es un único proceso y esta caché evita repetir fetchs a la API
 * en cada navegación — la demora principal del dev server.
 */
const DEV_CACHE_TTL_MS = 15_000;
const devCache = new Map<string, { expiresAt: number; value: unknown }>();

async function cachedGet<T>(path: string): Promise<T> {
  if (!import.meta.env.DEV) return api.get<T>(path);
  const now = Date.now();
  const hit = devCache.get(path);
  if (hit && hit.expiresAt > now) return hit.value as T;
  const value = await api.get<T>(path);
  devCache.set(path, { expiresAt: now + DEV_CACHE_TTL_MS, value });
  return value;
}

/** Indica si el backend de contenido está configurado. */
export function apiHabilitada(): boolean {
  return Boolean(API_BASE);
}

/**
 * Contenidos desde la API (`/items`, catálogo unificado), con su zona resuelta
 * desde /zones. `/places` y `/events` quedaron como legado: solo devolvían una
 * parte del catálogo. Devuelve undefined si el backend no está configurado o
 * falla la petición (la capa de datos lo traduce a lista vacía).
 */
export async function getContenidoApi(): Promise<EntradaContenido[] | undefined> {
  if (!apiHabilitada()) return undefined;
  try {
    const [items, zonas] = await Promise.all([
      cachedGet<{ items: ContratoEntry[] }>('/items'),
      getZonasApi(),
    ]);
    return items.items.map((e) => normalizarEntrada(e, zonas ?? [])).sort(porActualizacionDesc);
  } catch (error) {
    console.error(
      `[contenido-api] No se pudo consultar la API (${API_BASE}/items):`,
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}

/** Categorías desde la API (/categories). undefined = API no disponible. */
export async function getCategoriasApi(): Promise<EntradaContenido[] | undefined> {
  if (!apiHabilitada()) return undefined;
  try {
    const categorias = await cachedGet<ContratoEntry[]>('/categories');
    return categorias.map((c) => normalizarEntrada(c));
  } catch (error) {
    console.error(
      `[contenido-api] No se pudo consultar la API (${API_BASE}/categories):`,
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}

/** Zonas desde la API (/zones). undefined = API no disponible. */
export async function getZonasApi(): Promise<ZonaLigera[] | undefined> {
  if (!apiHabilitada()) return undefined;
  try {
    const zonas = await cachedGet<ZonaLigera[]>('/zones');
    return Array.isArray(zonas) ? zonas.filter((z) => z && typeof z.id === 'string') : [];
  } catch (error) {
    console.error(
      `[contenido-api] No se pudo consultar la API (${API_BASE}/zones):`,
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}
