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

/** Indica si el backend de contenido está configurado. */
export function apiHabilitada(): boolean {
  return Boolean(API_BASE);
}

/**
 * Contenidos desde la API (places + events), con su zona resuelta desde
 * /zones. Devuelve undefined si el backend no está configurado o falla la
 * petición (la capa de datos lo traduce a lista vacía).
 */
export async function getContenidoApi(): Promise<EntradaContenido[] | undefined> {
  if (!apiHabilitada()) return undefined;
  try {
    const [places, events, zonas] = await Promise.all([
      api.get<{ items: ContratoEntry[] }>('/places'),
      api.get<{ items: ContratoEntry[] }>('/events'),
      getZonasApi(),
    ]);
    const data = [...places.items, ...events.items]
      .map((e) => normalizarEntrada(e, zonas ?? []))
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

/** Categorías desde la API (/categories). undefined = API no disponible. */
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

/** Zonas desde la API (/zones). undefined = API no disponible. */
export async function getZonasApi(): Promise<ZonaLigera[] | undefined> {
  if (!apiHabilitada()) return undefined;
  try {
    const zonas = await api.get<ZonaLigera[]>('/zones');
    return Array.isArray(zonas) ? zonas.filter((z) => z && typeof z.id === 'string') : [];
  } catch (error) {
    console.error(
      `[contenido-api] No se pudo consultar la API (${API_BASE}/zones):`,
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}
