/**
 * Servicio de dominio: lugares.
 *
 * Es la única vía por la que páginas y componentes acceden a los lugares.
 * La fuente de datos actual es el repositorio local de contenido
 * (Astro Content Collections); cuando exista un backend, estas operaciones
 * delegarán en el cliente HTTP `api` (ver api.ts) configurado con PUBLIC_API_URL.
 */
import {
  getAllContenidos,
  getContenidosPorCategoria,
  getContenidosPorZona,
  getDestacados,
  getRelacionados,
  filtrarContenidos,
  renderBody,
  textoDeBusqueda,
  normalizarTexto,
  type Contenido,
  type ContenidoConRelaciones,
  type FiltroContenidos,
} from '@/shared/content/places';
import type { ContentCollectionName } from '@/shared/constants/collections';
import type { Locale } from '@/shared/constants/locales';

export type {
  Contenido,
  ContenidoConRelaciones,
  FiltroContenidos,
  ContentCollectionName,
  Locale,
};
export { normalizarTexto, textoDeBusqueda };

export const lugaresService = {
  /** Todos los lugares de las 6 categorías, ordenados por última actualización. */
  listarTodos: getAllContenidos,

  /** Busca un lugar por id recorriendo todas las categorías. */
  buscarPorId: async (id: string): Promise<ContenidoConRelaciones | undefined> => {
    const todos = await getAllContenidos();
    return todos.find((item) => item.id === id);
  },

  /** Lugares de una categoría concreta (places, restaurants, …). */
  listarPorCategoria: getContenidosPorCategoria,

  /** Lugares de una zona concreta. */
  listarPorZona: getContenidosPorZona,

  /** Lugares destacados (featured), con límite. */
  listarDestacados: getDestacados,

  /** Lugares relacionados a uno dado, con límite. */
  listarRelacionados: getRelacionados,

  /** Filtro combinado (q / categoria / zona), idéntico al buscador client-side. */
  filtrar: filtrarContenidos,

  /** Renderiza el body markdown localizado a HTML. */
  renderBody,
};
