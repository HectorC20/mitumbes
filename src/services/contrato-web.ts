import type { Locale } from '@/shared/constants/locales';
import type { ContentCollectionName } from '@/shared/constants/collections';

/**
 * Mapeo puro del contrato web (backend → shape CollectionEntry).
 *
 * El backend normaliza cada campo localizado como `{ es, en, pt }` y los
 * monolingües como valor simple (ver server/src/common/serializers/web-contract.ts).
 * Este módulo convierte esa respuesta al shape que la web ya consume
 * (equivalente al CollectionEntry de Astro) sin depender de `astro:content`,
 * por lo que es 100 % testeable en vitest.
 */

export type Localizado<T = string> = Record<Locale, T>;

/** Entrada normalizada (compatible estructuralmente con CollectionEntry). */
export interface EntradaContenido {
  id: string;
  collection: ContentCollectionName;
  /** Zona resuelta (misma referencia que data.zone) para acceso tipo
   *  `item.zone.data.title`, igual que el CollectionEntry con relaciones. */
  zone?: ZonaLigera;
  data: {
    title: Localizado<string>;
    description: Localizado<string>;
    excerpt?: Localizado<string>;
    zone?: ZonaLigera;
    image?: string;
    gallery?: string[];
    coordinates?: { lat: number; lng: number };
    address?: Localizado<string>;
    hours?: Localizado<string>;
    price?: Localizado<string>;
    phone?: string;
    email?: string;
    website?: string;
    social?: { instagram?: string; facebook?: string };
    services?: Localizado<string[]>;
    howToGet?: Localizado<string>;
    activities?: Localizado<string[]>;
    nearby?: string[];
    source?: Localizado<string>;
    verified: boolean;
    featured: boolean;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date;
    body?: Localizado<string>;
    /** Subcategoría hoja del lugar (slug; backend places). */
    subcategory?: string;
    /** Solo categorías: slug de la categoría padre (ausente = raíz). */
    parent?: string;
    /** Solo categorías: UUID del padre (referencia cruda del backend). */
    parentId?: string | null;
    /** Solo categorías: ruta materializada del árbol (ej. /places/playas). */
    path?: string;
    /** Solo categorías: profundidad (0 = raíz, 1+ = subcategoría). */
    depth?: number;
    /** Solo categorías (index.md del markdown). */
    icon?: string;
  };
}

/** Zona ligera (shape de GET /zones del backend; id = slug). */
export interface ZonaLigera {
  id: string;
  collection: 'zones';
  data: {
    title: Localizado<string>;
    type?: string;
    description?: Localizado<string>;
    image?: string;
    body?: Localizado<string>;
  };
}

/** Respuesta cruda del backend (WebContractEntry). */
export interface ContratoEntry {
  id: string;
  collection: string;
  data: Record<string, unknown>;
}

/** Zona de respaldo si el string `zone` no coincide con una zona local. */
function zonaRespaldo(id: string): ZonaLigera {
  return {
    id,
    collection: 'zones',
    data: {
      title: { es: id, en: id, pt: id },
      type: 'zona',
      description: { es: '', en: '', pt: '' },
      image: '',
    },
  };
}

function resolverZona(id: string, zonas: ZonaLigera[]): ZonaLigera {
  return zonas.find((z) => z.id === id) ?? zonaRespaldo(id);
}

/** Convierte un valor fecha (ISO string o Date) a Date. */
function aDate(value: unknown): Date | undefined {
  if (value instanceof Date) return value;
  return typeof value === 'string' && value ? new Date(value) : undefined;
}

function campoLocalizado(d: Record<string, unknown>, key: string): Localizado<string> | undefined {
  const v = d[key];
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Localizado<string>) : undefined;
}

function campoLocalizadoArr(
  d: Record<string, unknown>,
  key: string,
): Localizado<string[]> | undefined {
  const v = d[key];
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Localizado<string[]>) : undefined;
}

/**
 * Normaliza una entrada del contrato al shape de contenido de la web.
 * `zonas` son las zonas de la API (GET /zones); si `data.zone` es un string,
 * se resuelve contra ellas (con respaldo por id si no hay match).
 */
export function normalizarEntrada(
  entry: ContratoEntry,
  zonas: ZonaLigera[] = [],
): EntradaContenido {
  const d = entry.data;
  const simple = <T>(key: string): T | undefined => d[key] as T | undefined;
  const zoneId = simple<string>('zone');
  const zone = zoneId ? resolverZona(zoneId, zonas) : undefined;
  // El backend expone el slug del contenido en metadata.slug; se usa como id
  // para conservar las rutas amigables (en markdown el id ya es el slug).
  const metadata = simple<Record<string, unknown>>('metadata');
  const slug = metadata?.slug;
  const id = typeof slug === 'string' && slug ? slug : entry.id;

  return {
    id,
    collection: entry.collection as ContentCollectionName,
    zone,
    data: {
      title: campoLocalizado(d, 'title') ?? { es: id, en: id, pt: id },
      description: campoLocalizado(d, 'description') ?? { es: '', en: '', pt: '' },
      excerpt: campoLocalizado(d, 'excerpt'),
      zone,
      image: simple<string>('image'),
      gallery: simple<string[]>('gallery'),
      coordinates: simple<{ lat: number; lng: number }>('coordinates'),
      address: campoLocalizado(d, 'address'),
      hours: campoLocalizado(d, 'hours'),
      price: campoLocalizado(d, 'price'),
      phone: simple<string>('phone'),
      email: simple<string>('email'),
      website: simple<string>('website'),
      social: simple<{ instagram?: string; facebook?: string }>('social'),
      services: campoLocalizadoArr(d, 'services'),
      howToGet: campoLocalizado(d, 'howToGet'),
      activities: campoLocalizadoArr(d, 'activities'),
      nearby: simple<string[]>('nearby'),
      source: campoLocalizado(d, 'source'),
      verified: simple<boolean>('verified') ?? false,
      featured: simple<boolean>('featured') ?? false,
      rating: simple<number>('rating'),
      createdAt: aDate(d.createdAt),
      updatedAt: aDate(d.updatedAt),
      body: campoLocalizado(d, 'body'),
      subcategory: simple<string>('subcategory'),
      parent: simple<string>('parent'),
      parentId: simple<string>('parentId') ?? null,
      path: simple<string>('path'),
      depth: simple<number>('depth'),
      icon: simple<string>('icon'),
    },
  };
}

/** Orden por última actualización (mismo criterio que el markdown). */
export function porActualizacionDesc(a: EntradaContenido, b: EntradaContenido): number {
  return (b.data.updatedAt?.getTime() ?? 0) - (a.data.updatedAt?.getTime() ?? 0);
}
