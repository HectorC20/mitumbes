import type { Locale } from '../constants/locales';
import { localizePath } from '../constants/locales';
import { COLLECTION_ICONS, type ContentCollectionName } from '../constants/collections';
import { loc, rutaCategoria, type Categoria } from './places';
import type { CategoryMeta } from '../interfaces/category';

export type { CategoryMeta };

interface EditorialCategoryEntry {
  vibe: string;
  taglines: Record<Locale, string>;
  badges: Record<Locale, string>;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  accentGlow: string;
  icon: string;
}

export const CATEGORY_EDITORIAL_META: Record<string, EditorialCategoryEntry> = {
  places: {
    vibe: 'playas',
    taglines: {
      es: 'Aguas cálidas, manglares únicos de Puerto Pizarro y reservas naturales.',
      en: 'Warm ocean waters, unique mangrove sanctuaries, and natural reserves.',
      pt: 'Águas quentes, manguezais únicos de Puerto Pizarro e reservas naturais.',
    },
    badges: {
      es: 'Naturaleza & Playas',
      en: 'Nature & Beaches',
      pt: 'Natureza & Praias',
    },
    accentBg: 'bg-sky-500/10 hover:bg-sky-500/15',
    accentBorder: 'border-sky-500/25 hover:border-sky-500/50',
    accentText: 'text-sky-600',
    accentGlow: 'hover:shadow-sky-500/10',
    icon: 'waves',
  },
  restaurants: {
    vibe: 'gastronomia',
    taglines: {
      es: 'Ceviches de conchas negras, majarisco y pescados frescos del Pacífico.',
      en: 'Black scallop ceviche, fresh seafood dishes, and northern flavors.',
      pt: 'Ceviches de conchas negras, majarisco e peixes frescos do Pacífico.',
    },
    badges: {
      es: 'Sabor Norteño',
      en: 'Northern Cuisine',
      pt: 'Sabor Nortista',
    },
    accentBg: 'bg-amber-500/10 hover:bg-amber-500/15',
    accentBorder: 'border-amber-500/25 hover:border-amber-500/50',
    accentText: 'text-amber-600',
    accentGlow: 'hover:shadow-amber-500/10',
    icon: 'utensils',
  },
  hotels: {
    vibe: 'hospedaje',
    taglines: {
      es: 'Bungalows en primera línea de playa, eco-resorts y descanso absoluto.',
      en: 'Beachfront bungalows, eco-lodges, and tranquil coastal stays.',
      pt: 'Bângalôs à beira-mar, eco-resorts e descanso absoluto.',
    },
    badges: {
      es: 'Frente al Mar',
      en: 'Beachfront Stays',
      pt: 'Frente ao Mar',
    },
    accentBg: 'bg-emerald-500/10 hover:bg-emerald-500/15',
    accentBorder: 'border-emerald-500/25 hover:border-emerald-500/50',
    accentText: 'text-emerald-600',
    accentGlow: 'hover:shadow-emerald-500/10',
    icon: 'bed',
  },
  activities: {
    vibe: 'aventura',
    taglines: {
      es: 'Avistamiento de ballenas jorobadas, paseos en bote, surf y ecoturismo.',
      en: 'Humpback whale watching, mangrove boat tours, surf and adventures.',
      pt: 'Observação de baleias-jubarte, passeios de barco, surfe e ecoturismo.',
    },
    badges: {
      es: 'Aventura & Tours',
      en: 'Tours & Adventure',
      pt: 'Aventura & Passeios',
    },
    accentBg: 'bg-indigo-500/10 hover:bg-indigo-500/15',
    accentBorder: 'border-indigo-500/25 hover:border-indigo-500/50',
    accentText: 'text-indigo-600',
    accentGlow: 'hover:shadow-indigo-500/10',
    icon: 'boat',
  },
  events: {
    vibe: 'eventos',
    taglines: {
      es: 'Festivales de verano, fiestas patronales y música en vivo junto al mar.',
      en: 'Summer festivals, cultural traditions, and beachfront live events.',
      pt: 'Festivais de verão, festas tradicionais e música ao vivo à beira-mar.',
    },
    badges: {
      es: 'Vida Costera',
      en: 'Coastal Life',
      pt: 'Vida Costeira',
    },
    accentBg: 'bg-rose-500/10 hover:bg-rose-500/15',
    accentBorder: 'border-rose-500/25 hover:border-rose-500/50',
    accentText: 'text-rose-600',
    accentGlow: 'hover:shadow-rose-500/10',
    icon: 'party',
  },
  services: {
    vibe: 'servicios',
    taglines: {
      es: 'Servicios profesionales, comercios y atención local en la región.',
      en: 'Professional services, commerce, and local assistance in the region.',
      pt: 'Serviços profissionais, comércios e atendimento local na região.',
    },
    badges: {
      es: 'Servicios',
      en: 'Services',
      pt: 'Serviços',
    },
    accentBg: 'bg-teal-500/10 hover:bg-teal-500/15',
    accentBorder: 'border-teal-500/25 hover:border-teal-500/50',
    accentText: 'text-teal-600',
    accentGlow: 'hover:shadow-teal-500/10',
    icon: 'info',
  },
  abogados: {
    vibe: 'legal',
    taglines: {
      es: 'Estudios jurídicos, asesoría legal y profesionales colegiados.',
      en: 'Law firms, legal advice, and certified professionals.',
      pt: 'Escritórios de advocacia, assessoria jurídica e profissionais credenciados.',
    },
    badges: {
      es: 'Legal',
      en: 'Legal',
      pt: 'Jurídico',
    },
    accentBg: 'bg-slate-500/10 hover:bg-slate-500/15',
    accentBorder: 'border-slate-500/25 hover:border-slate-500/50',
    accentText: 'text-slate-600',
    accentGlow: 'hover:shadow-slate-500/10',
    icon: 'scale',
  },
  playas: {
    vibe: 'playas',
    taglines: {
      es: 'Playas de arena fina, mar tibio durante todo el año y atardeceres mágicos.',
      en: 'Fine sand beaches, year-round warm sea, and magical sunsets.',
      pt: 'Praias de areia fina, mar morno o ano todo e pores do sol mágicos.',
    },
    badges: {
      es: 'Playas',
      en: 'Beaches',
      pt: 'Praias',
    },
    accentBg: 'bg-sky-500/10 hover:bg-sky-500/15',
    accentBorder: 'border-sky-500/25 hover:border-sky-500/50',
    accentText: 'text-sky-600',
    accentGlow: 'hover:shadow-sky-500/10',
    icon: 'waves',
  },
  manglares: {
    vibe: 'naturaleza',
    taglines: {
      es: 'Ecosistema de canales navegables y santuario de fauna marina.',
      en: 'Navigable water channels ecosystem and marine wildlife sanctuary.',
      pt: 'Ecossistema de canais navegáveis e santuário de vida marinha.',
    },
    badges: {
      es: 'Ecosistema',
      en: 'Ecosystem',
      pt: 'Ecossistema',
    },
    accentBg: 'bg-emerald-500/10 hover:bg-emerald-500/15',
    accentBorder: 'border-emerald-500/25 hover:border-emerald-500/50',
    accentText: 'text-emerald-600',
    accentGlow: 'hover:shadow-emerald-500/10',
    icon: 'tree',
  },
  reservas: {
    vibe: 'naturaleza',
    taglines: {
      es: 'Áreas naturales protegidas y biodiversidad del bosque seco ecuatorial.',
      en: 'Protected natural areas and equatorial dry forest biodiversity.',
      pt: 'Áreas naturais protegidas e biodiversidade da floresta seca equatorial.',
    },
    badges: {
      es: 'Área Protegida',
      en: 'Protected Area',
      pt: 'Área Protegida',
    },
    accentBg: 'bg-teal-500/10 hover:bg-teal-500/15',
    accentBorder: 'border-teal-500/25 hover:border-teal-500/50',
    accentText: 'text-teal-600',
    accentGlow: 'hover:shadow-teal-500/10',
    icon: 'tree',
  },
  cevicherias: {
    vibe: 'gastronomia',
    taglines: {
      es: 'Especialistas en ceviche de conchas negras y pesca del día fresca.',
      en: 'Specialists in black scallop ceviche and fresh catch of the day.',
      pt: 'Especialistas em ceviche de conchas negras e pesca do dia fresca.',
    },
    badges: {
      es: 'Cevichería',
      en: 'Ceviche Bar',
      pt: 'Cevicheria',
    },
    accentBg: 'bg-amber-500/10 hover:bg-amber-500/15',
    accentBorder: 'border-amber-500/25 hover:border-amber-500/50',
    accentText: 'text-amber-600',
    accentGlow: 'hover:shadow-amber-500/10',
    icon: 'utensils',
  },
};

/**
 * Obtiene metadatos de presentación visual y editoriales para una categoría dada.
 */
export function getCategoryMeta(
  categoria: Categoria | { collection: string; id?: string; data?: { parent?: string; icon?: string; description?: Record<string, string> } },
  lang: Locale
): CategoryMeta {
  const collectionKey = categoria.collection || categoria.id || '';
  const meta = CATEGORY_EDITORIAL_META[collectionKey];

  // Si tiene parent, heredar colores del parent si no tiene definición propia
  const parentKey = categoria.data?.parent;
  const parentMeta = parentKey ? CATEGORY_EDITORIAL_META[parentKey] : undefined;

  const defaultTagline =
    lang === 'en'
      ? 'Explore places and experiences in this category.'
      : lang === 'pt'
        ? 'Explore lugares e experiências nesta categoria.'
        : 'Explora lugares y experiencias en esta categoría.';

  const defaultBadge = parentKey
    ? lang === 'en'
      ? 'Subcategory'
      : lang === 'pt'
        ? 'Subcategoria'
        : 'Subcategoría'
    : lang === 'en'
      ? 'Category'
      : lang === 'pt'
        ? 'Categoria'
        : 'Categoría';

  const tagline =
    meta?.taglines[lang] ??
    loc(categoria.data?.description, lang) ??
    defaultTagline;

  const badge =
    meta?.badges[lang] ??
    parentMeta?.badges[lang] ??
    defaultBadge;

  const accentBg = meta?.accentBg ?? parentMeta?.accentBg ?? 'bg-primary/10 hover:bg-primary/15';
  const accentBorder = meta?.accentBorder ?? parentMeta?.accentBorder ?? 'border-primary/25 hover:border-primary/50';
  const accentText = meta?.accentText ?? parentMeta?.accentText ?? 'text-primary';
  const accentGlow = meta?.accentGlow ?? parentMeta?.accentGlow ?? 'hover:shadow-primary/10';

  const icon =
    categoria.data?.icon ??
    meta?.icon ??
    COLLECTION_ICONS[collectionKey as ContentCollectionName] ??
    parentMeta?.icon ??
    'pin';

  const href = localizePath(rutaCategoria(collectionKey), lang);

  return {
    vibe: meta?.vibe ?? parentMeta?.vibe ?? 'general',
    tagline,
    badge,
    accentBg,
    accentBorder,
    accentText,
    accentGlow,
    icon,
    href,
  };
}
