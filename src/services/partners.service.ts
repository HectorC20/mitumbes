import { api } from './api';
import { PARTNERS, type Partner } from '@/shared/content/partners';
import type { Locale } from '@/shared/constants/locales';

/**
 * Servicio de dominio para administrar y consultar los Aliados / Partners.
 * Permite que las herramientas MCP administren dinámicamente la lista vía API (/partners).
 */
export const partnersService = {
  /** Obtiene todos los aliados activos */
  async obtenerPartners(lang: Locale): Promise<Partner[]> {
    if (Boolean(import.meta.env.PUBLIC_API_URL)) {
      try {
        const data = await api.get<Partner[]>(`/partners?lang=${lang}`, { timeoutMs: 4000 });
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (error) {
        console.warn(
          '[partnersService] No se pudo obtener /partners desde la API, usando fallback local:',
          error instanceof Error ? error.message : error,
        );
      }
    }
    return PARTNERS;
  },
};
