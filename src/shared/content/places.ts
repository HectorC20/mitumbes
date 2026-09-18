import type { ImageMetadata } from 'astro';
import { marked } from 'marked';
import type { ContentCollectionName } from '../constants/collections';
import type { Locale } from '../constants/locales';
import {
  getContenidoApi,
  getCategoriasApi,
  getPaginaContenidosApi,
  getZonasApi,
} from '../../services/contenido-api';
import type { EntradaContenido, ZonaLigera } from '../../services/contrato-web';

/**
 * Helpers de contenido. La web ya no tiene contenido local: todas las
 * operaciones consultan mitumbes-server (items, categories, zones).
 * Si la API no está configurada o falla, devuelven listas vacías.
 */

export type Contenido = EntradaContenido;
export type Categoria = EntradaContenido;
export type Zona = ZonaLigera;

/** Contenido con su zona resuelta (ya incluida en EntradaContenido). */
export type ContenidoConRelaciones = Contenido;

/** Acceso seguro a un campo localizado con respaldo en español. */
export function loc<T>(campo: Record<Locale, T> | undefined, lang: Locale): T | undefined {
  return campo?.[lang] ?? campo?.es;
}

/**
 * URL renderizable de una imagen de contenido.
 * Acepta tanto una imagen local procesada por astro:assets (ImageMetadata,
 * devuelve su `src` emitido) como una URL remota o de /public (string).
 *
 * Las rutas relativas se normalizan a raíz del proyecto (prefijo `/`) para que
 * el asset no se resuelva contra la ruta actual y herede el prefijo de idioma
 * (i18n); los assets no dependen del locale.
 */
export function imagenSrc(imagen: ImageMetadata | string | undefined): string | undefined {
  if (typeof imagen !== 'string') return imagen?.src;
  const src = imagen.trim();
  if (!src) return undefined;
  // URLs absolutas (remotas, data:, o emitidas por astro:assets) se usan tal cual.
  if (/^(?:https?:|data:|blob:|\/)/i.test(src)) return src;
  return `/${src}`;
}

/**
 * Ruta interna (sin idioma) del detalle de un contenido, según su subcategoría
 * hoja (si tiene) o, en su defecto, su colección (familia/nivel 1).
 * Ej.: una cevichería (restaurants → cevicherias) → /cevicherias/slug/;
 * un lugar sin subcategoría → /places/slug/.
 */
export function rutaContenido(c: { collection: string; id: string; data?: { subcategory?: string } }): string {
  const segmento = c.data?.subcategory ?? c.collection;
  return `/${segmento}/${c.id}/`;
}

/** Ruta interna (sin idioma) de una categoría (colección). */
export function rutaCategoria(collection: string): string {
  return `/categories/${collection}/`;
}

/** Ruta interna (sin idioma) de una zona. */
export function rutaZona(id: string): string {
  return `/zones/${id}/`;
}

/** Recupera todos los contenidos del catálogo unificado, desde la API. */
export async function getAllContenidos(): Promise<ContenidoConRelaciones[]> {
  return (await getContenidoApi()) ?? [];
}

/** Tamaño de página del listado público de lugares. */
export const LUGARES_POR_PAGINA = 20;

/** Una página del listado público, ya filtrada, ordenada y contada por el backend. */
export interface PaginaListado {
  items: ContenidoConRelaciones[];
  /** Total de coincidencias en el servidor (no solo las de esta página). */
  total: number;
  page: number;
  totalPaginas: number;
}

/**
 * Página del listado de lugares. El filtro (texto, categoría, zona), el orden y
 * el troceado los hace el backend: esta petición solo trae `LUGARES_POR_PAGINA`
 * ítems y el total de coincidencias.
 */
export async function getPaginaContenidos(
  filtro: FiltroContenidos,
  page = 1,
): Promise<PaginaListado> {
  const paginaActual = page > 0 ? page : 1;
  const pagina = await getPaginaContenidosApi({
    q: filtro.q,
    categoria: filtro.categoria,
    zona: filtro.zona,
    page: paginaActual,
    limit: LUGARES_POR_PAGINA,
  });
  const total = pagina?.total ?? 0;
  return {
    items: pagina?.items ?? [],
    total,
    page: paginaActual,
    totalPaginas: Math.max(1, Math.ceil(total / LUGARES_POR_PAGINA)),
  };
}

/** Categorías desde la API (/categories). */
export async function getCategorias(): Promise<Categoria[]> {
  return (await getCategoriasApi()) ?? [];
}

export async function getCategoriaPorId(
  id: string,
): Promise<Categoria | undefined> {
  const categorias = await getCategoriasApi();
  return categorias?.find((c) => c.collection === id);
}

/**
 * ¿Es categoría raíz (nivel 1, sin padre en la jerarquía del backend)?
 * `/categories` incluye la pseudo-categoría `zones` (las zonas se listan desde
 * `/zones`, no son una familia de contenidos), así que se excluye aquí.
 */
export function esCategoriaRaiz(c: Categoria): boolean {
  return !c.data.parent && (c.collection as string) !== 'zones';
}

/** Categorías raíz (nivel 1 del backend): places, restaurants, hotels, … */
export async function getCategoriasRaiz(): Promise<Categoria[]> {
  return (await getCategorias()).filter(esCategoriaRaiz);
}

/** Subcategorías (nivel 2) que cuelgan de una categoría raíz. */
export async function getSubcategorias(
  collection: string,
): Promise<Categoria[]> {
  const categorias = await getCategorias();
  return categorias.filter((c) => c.data.parent === collection);
}

/** Lugares cuya subcategoría hoja (backend) coincide con el slug dado. */
export async function getContenidosPorSubcategoria(
  subcategoria: string,
): Promise<ContenidoConRelaciones[]> {
  const todos = await getAllContenidos();
  return todos.filter((c) => c.data.subcategory === subcategoria);
}

export async function getContenidoPorId(
  collection: ContentCollectionName,
  id: string,
): Promise<Contenido | undefined> {
  const api = await getContenidoApi();
  return api?.find((c) => c.collection === collection && c.id === id);
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

/** Zonas desde la API (/zones), ordenadas por título en español. */
export async function getZonas(): Promise<Zona[]> {
  return ((await getZonasApi()) ?? [])
    .filter((z) => z.id !== 'index')
    .sort((a, b) => a.data.title.es.localeCompare(b.data.title.es));
}

export async function getZonaPorId(id: string): Promise<Zona | undefined> {
  return (await getZonasApi())?.find((z) => z.id === id);
}

/** Conteo de contenidos por categoría, por subcategoría y por zona. */
export async function getConteos(): Promise<{
  porCategoria: Map<string, number>;
  porSubcategoria: Map<string, number>;
  porZona: Map<string, number>;
}> {
  const todos = await getAllContenidos();
  const porCategoria = new Map<string, number>();
  const porSubcategoria = new Map<string, number>();
  const porZona = new Map<string, number>();
  for (const item of todos) {
    porCategoria.set(
      item.collection,
      (porCategoria.get(item.collection) ?? 0) + 1,
    );
    if (item.data.subcategory) {
      porSubcategoria.set(
        item.data.subcategory,
        (porSubcategoria.get(item.data.subcategory) ?? 0) + 1,
      );
    }
    if (item.zone) {
      porZona.set(item.zone.id, (porZona.get(item.zone.id) ?? 0) + 1);
    }
  }
  return { porCategoria, porSubcategoria, porZona };
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

/** Filtros del listado público (viajan como query string al backend). */
export interface FiltroContenidos {
  q?: string;
  categoria?: string;
  zona?: string;
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
      'places', // identificador del apartado
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
