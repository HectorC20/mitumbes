import type { ContentCollectionName } from '@/shared/constants/collections';
import type { Localizado, EnlaceContenido, ReferenciaContenido, EntradaContenido, ZonaLigera, ContratoEntry } from '@/shared/interfaces/contenido';

export type { Localizado, EnlaceContenido, ReferenciaContenido, EntradaContenido, ZonaLigera, ContratoEntry };

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

function normalizarReferencias(d: Record<string, unknown>): ReferenciaContenido[] | undefined {
  const raw = d.references ?? d.referencias;
  if (!Array.isArray(raw)) return undefined;
  const list: ReferenciaContenido[] = [];
  for (const item of raw) {
    if (typeof item === 'object' && item !== null) {
      const rec = item as Record<string, unknown>;
      const nombre = (rec.nombre ?? rec.name ?? rec.title ?? rec.label ?? '') as string;
      const url = (rec.url ?? rec.link ?? rec.href ?? '') as string;
      if (url) {
        list.push({
          nombre: typeof nombre === 'string' && nombre.trim() ? nombre.trim() : String(url).trim(),
          url: String(url).trim(),
        });
      }
    } else if (typeof item === 'string' && item.trim()) {
      list.push({
        nombre: item.trim(),
        url: item.trim(),
      });
    }
  }
  return list.length > 0 ? list : undefined;
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
      links: simple<EnlaceContenido[]>('links'),
      references: normalizarReferencias(d),
      referencias: normalizarReferencias(d),
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
      startDate: simple<string>('startDate'),
      endDate: simple<string>('endDate'),
    },
  };
}

/** Orden por última actualización (mismo criterio que el markdown). */
export function porActualizacionDesc(a: EntradaContenido, b: EntradaContenido): number {
  return (b.data.updatedAt?.getTime() ?? 0) - (a.data.updatedAt?.getTime() ?? 0);
}
