import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRelacionados, type ContenidoConRelaciones } from './places';
import * as contenidoApi from '../../services/contenido-api';

function crearLugar(
  id: string,
  collection: string,
  subcat?: string,
  zoneId?: string,
  featured = false,
): ContenidoConRelaciones {
  return {
    id,
    collection: collection as never,
    data: {
      title: { es: `Lugar ${id}` },
      description: { es: `Desc ${id}` },
      subcategory: subcat,
      featured,
      verified: true,
      rating: 4.5,
    },
    zone: zoneId
      ? {
          id: zoneId,
          collection: 'zones',
          data: {
            title: { es: `Zona ${zoneId}` },
            type: 'playa',
            description: { es: `Desc ${zoneId}` },
            image: '',
          },
        }
      : undefined,
  } as unknown as ContenidoConRelaciones;
}

describe('getRelacionados', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('excluye el ítem consultado y devuelve hasta el límite solicitado', async () => {
    const todos = [
      crearLugar('item-1', 'hotels', 'hoteles', 'zorritos'),
      crearLugar('item-2', 'hotels', 'hoteles', 'zorritos'),
      crearLugar('item-3', 'restaurants', 'marisquerias', 'zorritos'),
      crearLugar('item-4', 'places', 'playas', 'zorritos'),
      crearLugar('item-5', 'activities', 'surf', 'punta-sal'),
      crearLugar('item-6', 'places', 'manglares', 'puerto-pizarro'),
      crearLugar('item-7', 'hotels', 'resorts', 'punta-sal'),
    ];

    vi.spyOn(contenidoApi, 'getContenidoApi').mockResolvedValue(todos as never);

    const target = todos[0];
    const relacionados = await getRelacionados(target, 4);

    expect(relacionados.length).toBe(4);
    expect(relacionados.some((r) => r.id === target.id)).toBe(false);
  });

  it('es flexible y completa el límite incluso si la categoría tiene muy pocos ítems', async () => {
    // Caso donde solo existe 1 ítem adicional de la misma colección
    const todos = [
      crearLugar('abogado-1', 'services', 'abogados', undefined),
      crearLugar('abogado-2', 'services', 'abogados', undefined),
      crearLugar('hotel-1', 'hotels', 'hoteles', 'zorritos', true),
      crearLugar('restaurante-1', 'restaurants', 'marisquerias', 'zorritos', true),
      crearLugar('playa-1', 'places', 'playas', 'punta-sal', true),
    ];

    vi.spyOn(contenidoApi, 'getContenidoApi').mockResolvedValue(todos as never);

    const target = todos[0];
    const relacionados = await getRelacionados(target, 4);

    // En lugar de devolver solo 1, ahora rellena flexiblemente con otras opciones del catálogo
    expect(relacionados.length).toBe(4);
    expect(relacionados.map((r) => r.id)).toContain('abogado-2');
  });

  it('devuelve lista vacía si no hay otros ítems en el catálogo', async () => {
    const todos = [crearLugar('unico', 'places')];
    vi.spyOn(contenidoApi, 'getContenidoApi').mockResolvedValue(todos as never);

    const relacionados = await getRelacionados(todos[0], 6);
    expect(relacionados).toEqual([]);
  });
});
