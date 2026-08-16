/**
 * Servicio de dominio: zonas.
 *
 * Fuente de datos actual: repositorio local de contenido
 * (colección zones). Cuando exista un backend, estas operaciones
 * delegarán en el cliente HTTP `api` (ver api.ts).
 */
import {
  getZonas,
  getZonaPorId,
  getContenidosPorZona,
  type Zona,
} from '@/shared/content/places';
import type { Locale } from '@/shared/constants/locales';

export type { Zona, Locale };

export const zonasService = {
  /** Todas las zonas, ordenadas por título. */
  listar: getZonas,

  /** Zona por id. */
  buscarPorId: getZonaPorId,

  /** Lugares pertenecientes a una zona. */
  listarLugares: getContenidosPorZona,
};
