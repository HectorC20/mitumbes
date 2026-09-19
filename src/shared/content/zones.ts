import type { Locale } from '../constants/locales';
import { localizePath } from '../constants/locales';
import { loc, imagenSrc, rutaZona, type Zona } from './places';
import noImage from '@/assets/images/no-image.svg';
import type { ZoneMeta } from '../interfaces/zone';

export type { ZoneMeta };

interface EditorialZoneEntry {
  id: string;
  titles: Record<Locale, string>;
  badges: Record<Locale, string>;
  taglines: Record<Locale, string>;
  image: string;
}

export const ZONE_EDITORIAL_META: Record<string, EditorialZoneEntry> = {
  'punta-sal': {
    id: 'punta-sal',
    titles: {
      es: 'Punta Sal',
      en: 'Punta Sal',
      pt: 'Punta Sal',
    },
    badges: {
      es: 'Playa & Relax',
      en: 'Beach & Relax',
      pt: 'Praia & Relax',
    },
    taglines: {
      es: 'Aguas cálidas, arena blanca y sol garantizado todo el año.',
      en: 'Warm waters, white sand, and sunny days all year.',
      pt: 'Águas mornas, areia branca e sol garantido o ano todo.',
    },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  zorritos: {
    id: 'zorritos',
    titles: {
      es: 'Zorritos',
      en: 'Zorritos',
      pt: 'Zorritos',
    },
    badges: {
      es: 'Atardeceres & Sabor',
      en: 'Sunsets & Flavors',
      pt: 'Pôr do Sol & Sabor',
    },
    taglines: {
      es: 'Atardeceres infinitos, gastronomía marina fresca y ambiente playero.',
      en: 'Vibrant sunsets, fresh marine cuisine, and warm waves.',
      pt: 'Pores do sol vibrantes, gastronomia marinha fresca e clima praiano.',
    },
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
  },
  'puerto-pizarro': {
    id: 'puerto-pizarro',
    titles: {
      es: 'Puerto Pizarro',
      en: 'Puerto Pizarro',
      pt: 'Puerto Pizarro',
    },
    badges: {
      es: 'Ecoturismo & Manglares',
      en: 'Ecotourism & Mangroves',
      pt: 'Ecoturismo & Manguezais',
    },
    taglines: {
      es: 'Santuario de manglares, avistamiento de aves y paseos en bote.',
      en: 'Unique mangrove ecosystem, birdwatching, and boat tours.',
      pt: 'Santuário de manguezais, observação de aves e passeios de barco.',
    },
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
  },
  tumbes: {
    id: 'tumbes',
    titles: {
      es: 'Tumbes Centro',
      en: 'Tumbes City Center',
      pt: 'Tumbes Centro',
    },
    badges: {
      es: 'Cultura & Tradición',
      en: 'Culture & Heritage',
      pt: 'Cultura & Tradição',
    },
    taglines: {
      es: 'Plaza mayor histórica, patrimonio cultural y conexión fronteriza.',
      en: 'Historic plaza, colonial heritage, and northern frontier connection.',
      pt: 'Praça histórica, patrimônio cultural e conexão fronteiriça.',
    },
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
  },
  cancas: {
    id: 'cancas',
    titles: {
      es: 'Cancas & Acapulco',
      en: 'Cancas & Acapulco',
      pt: 'Cancas & Acapulco',
    },
    badges: {
      es: 'Surf & Pescadores',
      en: 'Surf & Fishermen',
      pt: 'Surfe & Pescadores',
    },
    taglines: {
      es: 'Pueblo de pescadores, olas templadas para surf y playas tranquilas.',
      en: 'Authentic fishing village, surf breaks, and serene shores.',
      pt: 'Vila de pescadores, ondas perfeitas para surfe e praias calmas.',
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
};

/**
 * Obtiene metadatos de presentación visual y editoriales para una zona geográfica.
 */
export function getZoneMeta(
  zona: Zona | { id: string; data?: { title?: Record<string, string>; description?: Record<string, string>; image?: string } },
  lang: Locale
): ZoneMeta {
  const editorial = ZONE_EDITORIAL_META[zona.id];

  const defaultBadge =
    lang === 'en' ? 'Zone' : lang === 'pt' ? 'Zona' : 'Zona';

  const defaultTagline =
    lang === 'en'
      ? 'Explore the places and experiences of this destination.'
      : lang === 'pt'
        ? 'Explore os lugares e experiências deste destino.'
        : 'Explora los lugares y experiencias de este destino.';

  const title =
    loc(zona.data?.title, lang) ??
    editorial?.titles[lang] ??
    zona.id;

  const badge = editorial?.badges[lang] ?? defaultBadge;

  const tagline =
    loc(zona.data?.description, lang) ||
    editorial?.taglines[lang] ||
    defaultTagline;

  const image =
    imagenSrc(zona.data?.image) ||
    editorial?.image ||
    noImage.src;

  const href = localizePath(rutaZona(zona.id), lang);

  return {
    id: zona.id,
    title,
    badge,
    tagline,
    image,
    href,
  };
}
