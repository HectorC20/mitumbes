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
  getCategorias,
  getCategoriaPorId,
  getCategoriasRaiz,
  getSubcategorias,
  getZonas,
  getZonaPorId,
  getConteos,
} from '@/shared/content/places';
import type { ContentCollectionName } from '@/shared/constants/collections';
import type { Locale } from '@/shared/constants/locales';
import type { EntradaContenido, ZonaLigera } from '@/shared/interfaces/contenido';
import type { FiltroContenidos, PaginaListado } from '@/shared/interfaces/api';

export type {
  EntradaContenido,
  ZonaLigera,
  FiltroContenidos,
  PaginaListado,
  ContentCollectionName,
  Locale,
};
export { normalizarTexto, textoDeBusqueda };

export const contentService = {
  lugares: {
    listarTodos: getAllContenidos,
    listarPagina: getPaginaContenidos,
    buscarPorId: async (id: string): Promise<EntradaContenido | undefined> => {
      const todos = await getAllContenidos();
      return todos.find((item) => item.id === id);
    },
    listarPorCategoria: getContenidosPorCategoria,
    listarPorSubcategoria: getContenidosPorSubcategoria,
    listarPorZona: getContenidosPorZona,
    listarDestacados: getDestacados,
    listarRelacionados: getRelacionados,
    renderBody,
  },

  categorias: {
    listar: getCategorias,
    buscarPorId: getCategoriaPorId,
    listarRaices: getCategoriasRaiz,
    listarSubcategorias: getSubcategorias,
  },

  zonas: {
    listar: getZonas,
    buscarPorId: getZonaPorId,
    listarLugares: getContenidosPorZona,
  },

  conteos: {
    obtener: getConteos,
  },
};
