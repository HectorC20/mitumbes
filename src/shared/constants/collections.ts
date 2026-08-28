/**
 * Colecciones de contenido por categoría.
 * La web consume estas categorías desde la API de mitumbes-server
 * (categorías del backend, antes index.md en src/content).
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
