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
  type Categoria,
} from '@/shared/content/places';
import type { ContentCollectionName } from '@/shared/constants/collections';
import type { Locale } from '@/shared/constants/locales';

export type { Categoria, ContentCollectionName, Locale };

export const categoriasService = {
  /** Todas las categorías (index.md de cada colección). */
  listar: getCategorias,

  /** Categoría por id de colección (places, restaurants, …). */
  buscarPorId: getCategoriaPorId,
};
