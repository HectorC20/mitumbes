import { contentService } from './content.service';
import { loc } from '@/shared/content/places';
import { localizePath, type Locale } from '@/shared/constants/locales';
import type { NavCategoryLink } from '@/shared/interfaces/nav';

export type { NavCategoryLink };

/**
 * Servicio para obtener hasta un máximo de 3 categorías dinámicas
 * configuradas o destacadas para incluir en nav-shell__nav.
 */
export const navService = {
  async obtenerNavCategorias(lang: Locale, maxCount = 3): Promise<NavCategoryLink[]> {
    try {
      const categorias = await contentService.categorias.listarRaices();
      // Tomamos hasta un máximo de `maxCount` (default 3) categorías principales
      return categorias.slice(0, maxCount).map((cat) => ({
        id: cat.collection,
        label: loc(cat.data.title, lang) ?? cat.collection,
        href: localizePath(`/categories/${cat.collection}/`, lang),
      }));
    } catch {
      return [];
    }
  },
};
