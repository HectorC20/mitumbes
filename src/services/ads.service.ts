import { api } from './api';
import type { Props as AdBannerProps } from '@/shared/interfaces/ads-banner';
import type { Locale } from '@/shared/constants/locales';

export interface AdBannerCampaign extends Partial<AdBannerProps> {
  id: string;
  sectionId?: string;
  groupId?: string;
  active?: boolean;
  weight?: number;
}

export interface ObtenerBannerOptions {
  mode?: 'specific' | 'random' | 'auto';
  groupId?: string;
}

/**
 * Servicio de dominio para gestionar Banners Publicitarios dinámicos vía MCP (/api/ads).
 * Soporta dos modalidades principales:
 * 1. Anuncio Específico: Asignar un anuncio concreto a un apartado específico (ej: "zone-zorritos-ad").
 * 2. Anuncio Aleatorio (Pool/Rotación al azar): Seleccionar dinámicamente al azar un anuncio de un grupo o pool de publicidad.
 */
export const adsService = {
  async obtenerBanner(
    sectionId: string,
    lang: Locale,
    options: ObtenerBannerOptions = {},
  ): Promise<Partial<AdBannerProps> | undefined> {
    const { mode = 'auto', groupId } = options;

    if (Boolean(import.meta.env.PUBLIC_API_URL)) {
      try {
        const query = new URLSearchParams({ section: sectionId, lang });
        if (groupId) query.set('group', groupId);
        if (mode) query.set('mode', mode);

        const data = await api.get<AdBannerCampaign[]>(`/ads?${query.toString()}`, { timeoutMs: 3000 });
        if (Array.isArray(data) && data.length > 0) {
          const activeAds = data.filter((ad) => ad.active !== false);
          if (activeAds.length === 0) return undefined;

          // 1. Si el modo es 'random' o si hay múltiples anuncios activos para el pool/apartado, seleccionamos al azar
          if (mode === 'random' || (mode === 'auto' && activeAds.length > 1 && !activeAds.some((ad) => ad.sectionId === sectionId))) {
            const randomIndex = Math.floor(Math.random() * activeAds.length);
            return activeAds[randomIndex];
          }

          // 2. Modo Específico: Buscar coincidencia exacta por sectionId
          const specificAd = activeAds.find((ad) => ad.sectionId === sectionId);
          if (specificAd) return specificAd;

          // 3. Fallback: retornar el primer anuncio activo del pool
          return activeAds[0];
        }
      } catch {
        // Fallback si la API no devuelve anuncios
      }
    }

    return undefined;
  },
};
