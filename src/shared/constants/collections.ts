/**
 * Colecciones de contenido por categoría.
 * Cada carpeta en src/content es una categoría y su index.md es la
 * metadata de esa categoría (título/descripción/icono en 3 idiomas).
 */
export const CONTENT_COLLECTIONS = [
  'places',
  'restaurants',
  'hotels',
  'activities',
  'events',
  'services',
] as const;

export type ContentCollectionName = (typeof CONTENT_COLLECTIONS)[number];

/** Icono semántico asociado a cada colección (ver components/Icon.astro). */
export const COLLECTION_ICONS: Record<ContentCollectionName, string> = {
  places: 'waves',
  restaurants: 'utensils',
  hotels: 'bed',
  activities: 'activity',
  events: 'calendar',
  services: 'info',
};
