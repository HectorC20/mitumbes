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
  getContenidosPorSubcategoria,
  getContenidosPorZona,
  getDestacados,
  getPaginaContenidos,
  getRelacionados,
  renderBody,
  textoDeBusqueda,
  normalizarTexto,
  type Contenido,
  type ContenidoConRelaciones,
  type FiltroContenidos,
  type PaginaListado,
} from '@/shared/content/places';
import type { ContentCollectionName } from '@/shared/constants/collections';
import type { Locale } from '@/shared/constants/locales';

export type {
  Contenido,
  ContenidoConRelaciones,
  FiltroContenidos,
  PaginaListado,
  ContentCollectionName,
  Locale,
};
export { normalizarTexto, textoDeBusqueda };

export const lugaresService = {
  /** Todos los lugares de las 6 categorías, ordenados por última actualización. */
  listarTodos: getAllContenidos,

  /**
   * Una página del listado público (20 por página): el filtro, el orden y el
   * troceado los resuelve el backend, no la web.
   */
  listarPagina: getPaginaContenidos,

  /** Busca un lugar por id recorriendo todas las categorías. */
  buscarPorId: async (id: string): Promise<ContenidoConRelaciones | undefined> => {
    const todos = await getAllContenidos();
    return todos.find((item) => item.id === id);
  },

  /** Lugares de una categoría concreta (places, restaurants, …). */
  listarPorCategoria: getContenidosPorCategoria,

  /** Lugares de una subcategoría hoja (playas, surf, cevicherias, …). */
  listarPorSubcategoria: getContenidosPorSubcategoria,

  /** Lugares de una zona concreta. */
  listarPorZona: getContenidosPorZona,

  /** Lugares destacados (featured), con límite. */
  listarDestacados: getDestacados,

  /** Lugares relacionados a uno dado, con límite. */
  listarRelacionados: getRelacionados,

  /** Renderiza el body markdown localizado a HTML. */
  renderBody,
};
