/**
 * Servicio de dominio: conteos / estadísticas.
 *
 * Total de lugares por categoría y por zona. Fuente de datos actual:
 * repositorio local de contenido (ver shared/content/places.ts).
 */
import { getConteos } from '@/shared/content/places';

export const conteosService = {
  /** Conteo de contenidos por categoría y por zona. */
  obtener: getConteos,
};
