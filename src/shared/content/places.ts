import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { marked } from 'marked';
import {
  CONTENT_COLLECTIONS,
  type ContentCollectionName,
} from '../constants/collections';
import type { Locale } from '../constants/locales';

/**
 * Helpers de contenido para las colecciones multilingües.
 * Cada carpeta (places, restaurants, hotels, activities, events, services)
 * es una categoría; su index.md contiene la metadata de la categoría y el
 * resto de archivos son los contenidos. zones es una colección aparte.
 */

export type Contenido = CollectionEntry<ContentCollectionName>;
export type Categoria = Contenido;
export type Zona = CollectionEntry<'zones'>;

export interface ContenidoConRelaciones extends Contenido {
  zone?: Zona;
}

/** Acceso seguro a un campo localizado con respaldo en español. */
export function loc<T>(campo: Record<Locale, T> | undefined, lang: Locale): T | undefined {
  return campo?.[lang] ?? campo?.es;
}

/** Recupera todos los contenidos de las 6 categorías (sin index.md). */
export async function getAllContenidos(): Promise<ContenidoConRelaciones[]> {
  const listas = await Promise.all(
    CONTENT_COLLECTIONS.map((name) => getCollection(name)),
  );
  const zonas = new Map((await getCollection('zones')).map((z) => [z.id, z]));
  const contenidos: ContenidoConRelaciones[] = [];
  for (const lista of listas) {
    for (const item of lista) {
      if (item.id === 'index') continue;
      const ref = item.data.zone as { collection: 'zones'; id: string } | undefined;
      contenidos.push({ ...item, zone: ref ? zonas.get(ref.id) : undefined });
    }
  }
  return contenidos.sort(
    (a, b) =>
      (b.data.updatedAt?.getTime() ?? 0) - (a.data.updatedAt?.getTime() ?? 0),
  );
}

/** Categorías = index.md de cada colección. */
export async function getCategorias(): Promise<Categoria[]> {
  const resultados = await Promise.all(
    CONTENT_COLLECTIONS.map((name) => getEntry(name, 'index')),
  );
  return resultados.filter((c): c is Categoria => !!c);
}

export async function getCategoriaPorId(
  id: ContentCollectionName,
): Promise<Categoria | undefined> {
  return getEntry(id, 'index');
}

export async function getContenidoPorId(
  collection: ContentCollectionName,
  id: string,
): Promise<Contenido | undefined> {
  return getEntry(collection, id);
}

export async function getContenidosPorCategoria(
  collection: ContentCollectionName,
): Promise<ContenidoConRelaciones[]> {
  const todos = await getAllContenidos();
  return todos.filter((c) => c.collection === collection);
}

export async function getContenidosPorZona(
  zonaId: string,
): Promise<ContenidoConRelaciones[]> {
  const todos = await getAllContenidos();
  return todos.filter((c) => c.zone?.id === zonaId);
}

export async function getDestacados(
  limit = 6,
): Promise<ContenidoConRelaciones[]> {
  const todos = await getAllContenidos();
  return todos.filter((c) => c.data.featured).slice(0, limit);
}

export async function getRelacionados(
  item: ContenidoConRelaciones,
  limit = 3,
): Promise<ContenidoConRelaciones[]> {
  const todos = await getAllContenidos();
  return todos
    .filter(
      (c) =>
        c.id !== item.id &&
        (c.collection === item.collection ||
          (item.zone ? c.zone?.id === item.zone.id : false)),
    )
    .sort(
      (a, b) =>
        Number(b.collection === item.collection) -
          Number(a.collection === item.collection) ||
        (b.data.updatedAt?.getTime() ?? 0) -
          (a.data.updatedAt?.getTime() ?? 0),
    )
    .slice(0, limit);
}

export async function getZonas(): Promise<Zona[]> {
  return (await getCollection('zones'))
    .filter((z) => z.id !== 'index')
    .sort((a, b) => a.data.title.es.localeCompare(b.data.title.es));
}

export async function getZonaPorId(id: string): Promise<Zona | undefined> {
  return getEntry('zones', id);
}

/** Conteo de contenidos por categoría y por zona. */
export async function getConteos(): Promise<{
  porCategoria: Map<string, number>;
  porZona: Map<string, number>;
}> {
  const todos = await getAllContenidos();
  const porCategoria = new Map<string, number>();
  const porZona = new Map<string, number>();
  for (const item of todos) {
    porCategoria.set(
      item.collection,
      (porCategoria.get(item.collection) ?? 0) + 1,
    );
    if (item.zone) {
      porZona.set(item.zone.id, (porZona.get(item.zone.id) ?? 0) + 1);
    }
  }
  return { porCategoria, porZona };
}

/** Renderiza el body localizado (markdown) a HTML. */
export async function renderBody(
  item: Contenido,
  lang: Locale,
): Promise<string> {
  const md = loc(item.data.body, lang) ?? '';
  return md ? await marked.parse(md) : '';
}

export function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export interface FiltroContenidos {
  q?: string;
  categoria?: string;
  zona?: string;
}

/** Filtro server-side con la misma lógica que el buscador client-side. */
export function filtrarContenidos(
  contenidos: ContenidoConRelaciones[],
  filtro: FiltroContenidos,
  lang: Locale,
): ContenidoConRelaciones[] {
  const termino = filtro.q ? normalizarTexto(filtro.q) : '';
  return contenidos.filter((item) => {
    if (filtro.categoria && item.collection !== filtro.categoria) {
      return false;
    }
    if (filtro.zona && item.zone?.id !== filtro.zona) {
      return false;
    }
    if (termino && !textoDeBusqueda(item, lang).includes(termino)) {
      return false;
    }
    return true;
  });
}

/**
 * Texto normalizado para el índice de búsqueda client-side.
 * Incluye el identificador del apartado (lugares), la colección/categoría
 * y la zona para que la búsqueda sea accesible por identificador.
 */
export function textoDeBusqueda(
  item: ContenidoConRelaciones,
  lang: Locale,
): string {
  const d = item.data;
  return normalizarTexto(
    [
      'lugares', // identificador del apartado
      item.collection, // identificador de categoría (places, restaurants, …)
      item.id,
      loc(d.title, lang) ?? '',
      loc(d.description, lang) ?? '',
      loc(d.excerpt, lang) ?? '',
      item.zone ? loc(item.zone.data.title, lang) ?? '' : '',
      (loc(d.services, lang) ?? []).join(' '),
      (loc(d.activities, lang) ?? []).join(' '),
    ].join(' '),
  );
}
