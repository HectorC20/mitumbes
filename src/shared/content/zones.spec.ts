import { describe, it, expect } from 'vitest';
import { getZoneMeta } from './zones';
import type { Zona } from './places';

describe('zones metadata helper', () => {
  it('devuelve metadatos para destinos conocidos en español', () => {
    const meta = getZoneMeta({ id: 'punta-sal' } as Zona, 'es');
    expect(meta.title).toBe('Punta Sal');
    expect(meta.badge).toBe('Playa & Relax');
    expect(meta.href).toBe('/es/zones/punta-sal/');
    expect(meta.image).toContain('unsplash');
    expect(meta.tagline).toContain('Aguas cálidas');
  });

  it('devuelve metadatos en inglés y portugués correctamente', () => {
    const metaEn = getZoneMeta({ id: 'zorritos' } as Zona, 'en');
    expect(metaEn.badge).toBe('Sunsets & Flavors');
    expect(metaEn.tagline).toContain('Vibrant sunsets');
    expect(metaEn.href).toBe('/en/zones/zorritos/');

    const metaPt = getZoneMeta({ id: 'puerto-pizarro' } as Zona, 'pt');
    expect(metaPt.badge).toBe('Ecoturismo & Manguezais');
    expect(metaPt.tagline).toContain('Santuário de manguezais');
    expect(metaPt.href).toBe('/pt/zones/puerto-pizarro/');
  });

  it('soporta zonas con datos personalizados de la base de datos', () => {
    const customZone = {
      id: 'bocapán',
      data: {
        title: { es: 'Bocapán', en: 'Bocapan' },
        description: { es: 'Playa tranquila al sur de Zorritos', en: 'Quiet beach south of Zorritos' },
        image: 'https://images.unsplash.com/custom.jpg',
      },
    } as unknown as Zona;

    const meta = getZoneMeta(customZone, 'es');
    expect(meta.title).toBe('Bocapán');
    expect(meta.tagline).toBe('Playa tranquila al sur de Zorritos');
    expect(meta.badge).toBe('Zona');
    expect(meta.image).toBe('https://images.unsplash.com/custom.jpg');
    expect(meta.href).toBe('/es/zones/bocapán/');
  });
});
