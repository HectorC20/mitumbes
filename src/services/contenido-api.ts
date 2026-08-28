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
 * Sin caché módulo-level: en Vercel (serverless) la memoria es por instancia,
 * así que una caché en memoria no se comparte entre requests y la invalidación
 * desde /api/revalidate no llega a todas las instancias. Cada render SSR
 * consulta el backend, garantizando datos frescos al siguiente request.
 */

const API_BASE = import.meta.env.PUBLIC_API_URL ?? '';

/** Indica si el backend de contenido está configurado. */
export function apiHabilitada(): boolean {
  return Boolean(API_BASE);
}

/**
 * Contenidos desde la API (places + events). Devuelve undefined si el
 * backend no está configurado o falla la petición (fallback a markdown).
 */
export async function getContenidoApi(
  zonas: ZonaLigera[] = [],
): Promise<EntradaContenido[] | undefined> {
  if (!apiHabilitada()) return undefined;
  try {
    const [places, events] = await Promise.all([
      api.get<{ items: ContratoEntry[] }>('/places'),
      api.get<{ items: ContratoEntry[] }>('/events'),
    ]);
    const data = [...places.items, ...events.items]
      .map((e) => normalizarEntrada(e, zonas))
      .sort(porActualizacionDesc);
    return data;
  } catch (error) {
    console.error(
      `[contenido-api] No se pudo consultar la API (${API_BASE}/places, /events):`,
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}

/** Categorías desde la API (/categories). undefined = fallback a markdown. */
export async function getCategoriasApi(): Promise<EntradaContenido[] | undefined> {
  if (!apiHabilitada()) return undefined;
  try {
    const categorias = await api.get<ContratoEntry[]>('/categories');
    return categorias.map((c) => normalizarEntrada(c));
  } catch (error) {
    console.error(
      `[contenido-api] No se pudo consultar la API (${API_BASE}/categories):`,
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}
