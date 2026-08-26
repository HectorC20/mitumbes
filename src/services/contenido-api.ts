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
 * PUBLIC_API_URL está configurada y, si la API no responde, la capa de datos
 * (shared/content/places.ts) cae al repositorio local de markdown.
 *
 * La caché módulo-level evita golpear la API en cada request SSR.
 */

const API_BASE = import.meta.env.PUBLIC_API_URL ?? '';

/** Indica si el backend de contenido está configurado. */
export function apiHabilitada(): boolean {
  return Boolean(API_BASE);
}

const TTL_MS = 60_000;
let cacheContenidos: { data: EntradaContenido[]; expiresAt: number } | undefined;
let cacheCategorias: { data: EntradaContenido[]; expiresAt: number } | undefined;

/**
 * Invalida la caché de contenido. Lo invoca el backend (mitumbes-server) vía
 * `POST /api/revalidate` cuando crea, actualiza o elimina contenido, para que
 * la web refleje el cambio de inmediato sin esperar el TTL.
 */
export function invalidarCacheContenido(): void {
  cacheContenidos = undefined;
  cacheCategorias = undefined;
}

/**
 * Contenidos desde la API (places + events). Devuelve undefined si el
 * backend no está configurado o falla la petición (fallback a markdown).
 */
export async function getContenidoApi(
  zonas: ZonaLigera[] = [],
): Promise<EntradaContenido[] | undefined> {
  if (!apiHabilitada()) return undefined;
  if (cacheContenidos && cacheContenidos.expiresAt > Date.now()) {
    return cacheContenidos.data;
  }
  try {
    const [places, events] = await Promise.all([
      api.get<{ items: ContratoEntry[] }>('/places'),
      api.get<{ items: ContratoEntry[] }>('/events'),
    ]);
    const data = [...places.items, ...events.items]
      .map((e) => normalizarEntrada(e, zonas))
      .sort(porActualizacionDesc);
    cacheContenidos = { data, expiresAt: Date.now() + TTL_MS };
    return data;
  } catch {
    return undefined;
  }
}

/** Categorías desde la API (/categories). undefined = fallback a markdown. */
export async function getCategoriasApi(): Promise<EntradaContenido[] | undefined> {
  if (!apiHabilitada()) return undefined;
  if (cacheCategorias && cacheCategorias.expiresAt > Date.now()) {
    return cacheCategorias.data;
  }
  try {
    const categorias = await api.get<ContratoEntry[]>('/categories');
    const data = categorias.map((c) => normalizarEntrada(c));
    cacheCategorias = { data, expiresAt: Date.now() + TTL_MS };
    return data;
  } catch {
    return undefined;
  }
}
