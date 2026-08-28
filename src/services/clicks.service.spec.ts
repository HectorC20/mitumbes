/**
 * Tests de la reordenación de categorías del home:
 * 4 con más clics + 2 aleatorias de las restantes.
 */
import { describe, expect, it } from 'vitest';
import { clicksService } from './clicks.service';

const CATEGORIAS = [
  { collection: 'places' },
  { collection: 'restaurants' },
  { collection: 'hotels' },
  { collection: 'activities' },
  { collection: 'events' },
  { collection: 'services' },
];

describe('clicksService.reordenarPorClics', () => {
  it('sin datos de clics devuelve el orden original', () => {
    expect(clicksService.reordenarPorClics(CATEGORIAS)).toEqual(CATEGORIAS);
    expect(clicksService.reordenarPorClics(CATEGORIAS, new Map())).toEqual(CATEGORIAS);
  });

  it('pone primero las 4 categorías con más clics, ordenadas desc', () => {
    const clicks = new Map([
      ['events', 9],
      ['places', 5],
      ['hotels', 3],
      ['restaurants', 2],
      ['activities', 1],
      ['services', 0],
    ]);
    const resultado = clicksService.reordenarPorClics(CATEGORIAS, clicks);
    expect(resultado.slice(0, 4).map((c) => c.collection)).toEqual([
      'events',
      'places',
      'hotels',
      'restaurants',
    ]);
  });

  it('los 2 últimos son las categorías restantes, sin repetir', () => {
    const clicks = new Map([
      ['events', 9],
      ['places', 5],
      ['hotels', 3],
      ['restaurants', 2],
      ['activities', 1],
      ['services', 0],
    ]);
    const resultado = clicksService.reordenarPorClics(CATEGORIAS, clicks);
    const colecciones = resultado.map((c) => c.collection);
    expect(new Set(colecciones).size).toBe(6);
    expect(colecciones.slice(4).sort()).toEqual(['activities', 'services']);
  });
});
