import { describe, it, expect } from 'vitest';
import { getCategoryMeta } from './categories';
import type { Categoria } from './places';

describe('categories metadata helper', () => {
  it('devuelve metadatos editoriales para categorías principales en español', () => {
    const meta = getCategoryMeta({ collection: 'places' as never }, 'es');
    expect(meta.badge).toBe('Naturaleza & Playas');
    expect(meta.icon).toBe('waves');
    expect(meta.accentText).toBe('text-sky-600');
    expect(meta.href).toBe('/es/categories/places/');
    expect(meta.tagline).toContain('Aguas cálidas');
  });

  it('devuelve metadatos en inglés y portugués correctamente', () => {
    const metaEn = getCategoryMeta({ collection: 'restaurants' as never }, 'en');
    expect(metaEn.badge).toBe('Northern Cuisine');
    expect(metaEn.tagline).toContain('Black scallop ceviche');
    expect(metaEn.href).toBe('/en/categories/restaurants/');

    const metaPt = getCategoryMeta({ collection: 'hotels' as never }, 'pt');
    expect(metaPt.badge).toBe('Frente ao Mar');
    expect(metaPt.tagline).toContain('Bângalôs à beira-mar');
    expect(metaPt.href).toBe('/pt/categories/hotels/');
  });

  it('soporta subcategorías conocidas heredando o usando sus propios valores', () => {
    const metaPlayas = getCategoryMeta({ collection: 'playas' as never }, 'es');
    expect(metaPlayas.badge).toBe('Playas');
    expect(metaPlayas.icon).toBe('waves');
  });

  it('soporta categorías desconocidas con fallbacks seguros', () => {
    const metaDesconocida = getCategoryMeta(
      {
        collection: 'artesanias' as never,
        data: {
          title: { es: 'Artesanías' },
          description: { es: 'Trabajos hechos a mano por artesanos locales' },
          parent: 'places',
        },
      } as unknown as Categoria,
      'es'
    );

    expect(metaDesconocida.tagline).toBe('Trabajos hechos a mano por artesanos locales');
    // Hereda acento de su padre 'places' (sky-500)
    expect(metaDesconocida.accentText).toBe('text-sky-600');
    expect(metaDesconocida.href).toBe('/es/categories/artesanias/');
  });
});
