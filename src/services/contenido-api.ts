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
 * Tope de ítems que se piden al backend cuando se necesita el catálogo completo
 * (inicio, relacionados, conteos, sitemap). El listado público de /places/ NO
 * usa esto: allí el backend pagina y solo devuelve la página pedida.
 */
const LIMITE_CATALOGO = 500;

/** Página del catálogo pedida al backend (filtrado, orden y paginado en el servidor). */
export interface ConsultaContenidos {
  /** Texto libre (`search` en la API: nombre o descripción). */
  q?: string;
  /** Slug de categoría (`categorySlug`). */
  categoria?: string;
  /** Slug de zona (`zoneSlug`). */
  zona?: string;
  /** Página pedida, base 1. */
  page?: number;
  /** Tamaño de página. */
  limit?: number;
}

/** Resultado paginado del backend. */
export interface PaginaContenidos {
  items: EntradaContenido[];
  /** Total de coincidencias en el servidor (no solo las de esta página). */
  total: number;
  limit: number;
  offset: number;
}

/** Respuesta cruda de GET /items. */
interface RespuestaItems {
  items?: ContratoEntry[];
  total?: number;
  limit?: number;
  offset?: number;
}

/** Traduce los filtros de la web a los parámetros de GET /items. */
function queryItems(consulta: ConsultaContenidos): URLSearchParams {
  const limit = consulta.limit ?? LIMITE_CATALOGO;
  const page = consulta.page && consulta.page > 0 ? consulta.page : 1;
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  params.set('offset', String((page - 1) * limit));
  if (consulta.q) params.set('search', consulta.q);
  if (consulta.categoria) params.set('categorySlug', consulta.categoria);
  if (consulta.zona) params.set('zoneSlug', consulta.zona);
  return params;
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
      cachedGet<RespuestaItems>(`/items?${queryItems({})}`),
      getZonasApi(),
    ]);
    return (items.items ?? [])
      .map((e) => normalizarEntrada(e, zonas ?? []))
      .sort(porActualizacionDesc);
  } catch (error) {
    console.error(
      `[contenido-api] No se pudo consultar la API (${API_BASE}/items):`,
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}

/**
 * Una página del catálogo, filtrada y paginada **en el backend**: la petición
 * solo trae `limit` ítems (más el total de coincidencias), no el catálogo
 * completo. Devuelve undefined si el backend no está configurado o falla.
 */
export async function getPaginaContenidosApi(
  consulta: ConsultaContenidos = {},
): Promise<PaginaContenidos | undefined> {
  if (!apiHabilitada()) return undefined;
  const params = queryItems(consulta);
  try {
    const [pagina, zonas] = await Promise.all([
      cachedGet<RespuestaItems>(`/items?${params}`),
      getZonasApi(),
    ]);
    return {
      items: (pagina.items ?? []).map((e) => normalizarEntrada(e, zonas ?? [])),
      total: pagina.total ?? 0,
      limit: pagina.limit ?? Number(params.get('limit')),
      offset: pagina.offset ?? Number(params.get('offset')),
    };
  } catch (error) {
    console.error(
      `[contenido-api] No se pudo consultar la API (${API_BASE}/items?${params}):`,
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
