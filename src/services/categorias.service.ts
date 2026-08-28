/**
 * Servicio de dominio: categorías.
 *
 * Fuente de datos actual: repositorio local de contenido
 * (index.md de cada colección). Cuando exista un backend, estas
 * operaciones delegarán en el cliente HTTP `api` (ver api.ts).
 */
import {
  getCategorias,
  getCategoriaPorId,
  getCategoriasRaiz,
  getSubcategorias,
  type Categoria,
} from '@/shared/content/places';
import type { Locale } from '@/shared/constants/locales';

export type { Categoria, Locale };

export const categoriasService = {
  /** Todas las categorías del backend (raíces + subcategorías). */
  listar: getCategorias,

  /** Categoría por id (slug del backend: places, playas, …). */
  buscarPorId: getCategoriaPorId,

  /** Categorías raíz (nivel 1): places, restaurants, hotels, … */
  listarRaices: getCategoriasRaiz,

  /** Subcategorías (nivel 2) que cuelgan de una categoría raíz. */
  listarSubcategorias: getSubcategorias,
};
