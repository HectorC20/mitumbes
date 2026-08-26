import type { Locale } from './locales';
import { ui } from './ui';

/**
 * Apartados del sitio con su identificador estable.
 * Cada identificador (inicio, lugares, categorias, zonas) se usa en la
 * navegación, en las URLs y en el índice de búsqueda para mejorar la
 * accesibilidad del contenido administrado.
 */
export interface Section {
  /** Identificador estable (también usado como data-section en la búsqueda). */
  id: string;
  /** Ruta interna sin idioma. */
  path: string;
}

export const SECTIONS: Section[] = [
  { id: 'inicio', path: '/' },
  { id: 'lugares', path: '/places/' },
  { id: 'categorias', path: '/categories/' },
  { id: 'zonas', path: '/zones/' },
];

export function getSection(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id);
}

/** Etiqueta localizada de un apartado. */
export function sectionLabel(id: string, lang: Locale): string {
  switch (id) {
    case 'inicio':
      return ui[lang]['nav.home'];
    case 'lugares':
      return ui[lang]['nav.places'];
    case 'categorias':
      return ui[lang]['nav.categories'];
    case 'zonas':
      return ui[lang]['nav.zones'];
    default:
      return id;
  }
}
