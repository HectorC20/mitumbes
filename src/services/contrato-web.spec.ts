import { describe, it, expect } from 'vitest';
import { normalizarEntrada, porActualizacionDesc, type ZonaLigera } from './contrato-web';
import type { ContratoEntry } from './contrato-web';

const zonas: ZonaLigera[] = [
  {
    id: 'punta-sal',
    collection: 'zones',
    data: {
      title: { es: 'Punta Sal', en: 'Punta Sal Beach', pt: 'Punta Sal' },
      type: 'playa',
      description: { es: 'Playa del norte', en: 'Northern beach', pt: 'Praia do norte' },
      image: '',
    },
  },
];

const entradaPlace: ContratoEntry = {
  id: 'playa-zorritos',
  collection: 'places',
  data: {
    title: { es: 'Playa Zorritos', en: 'Zorritos Beach', pt: 'Praia Zorritos' },
    description: { es: 'Aguas cálidas', en: 'Warm waters', pt: 'Águas quentes' },
    excerpt: { es: 'La playa del balneario', en: 'The resort beach', pt: 'A praia do balneário' },
    zone: 'punta-sal',
    image: 'https://img.example/zorritos.jpg',
    gallery: ['https://img.example/a.jpg'],
    coordinates: { lat: -3.68, lng: -80.65 },
    hours: { es: 'Acceso libre', en: 'Free access', pt: 'Acesso livre' },
    price: { es: 'S/ 5', en: 'S/ 5', pt: 'R$ 6' },
    services: { es: ['Baños'], en: ['Restrooms'], pt: ['Banheiros'] },
    howToGet: { es: 'Por la panamericana', en: 'Via the highway', pt: 'Pela rodovia' },
    activities: { es: ['Nadar'], en: ['Swimming'], pt: ['Nadar'] },
    source: { es: 'Guía local', en: 'Local guide', pt: 'Guia local' },
    verified: true,
    featured: false,
    rating: 4.5,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z',
    body: { es: '## Texto', en: '## Text', pt: '## Texto' },
  },
};

describe('normalizarEntrada', () => {
  it('mapea el contrato al shape de CollectionEntry', () => {
    const entrada = normalizarEntrada(entradaPlace, zonas);

    expect(entrada.id).toBe('playa-zorritos');
    expect(entrada.collection).toBe('places');
    expect(entrada.data.title).toEqual({
      es: 'Playa Zorritos',
      en: 'Zorritos Beach',
      pt: 'Praia Zorritos',
    });
    expect(entrada.data.description.es).toBe('Aguas cálidas');
    expect(entrada.data.verified).toBe(true);
    expect(entrada.data.featured).toBe(false);
    expect(entrada.data.rating).toBe(4.5);
    expect(entrada.data.coordinates).toEqual({ lat: -3.68, lng: -80.65 });
  });

  it('convierte las fechas ISO a Date', () => {
    const entrada = normalizarEntrada(entradaPlace, zonas);
    expect(entrada.data.createdAt).toBeInstanceOf(Date);
    expect(entrada.data.updatedAt?.toISOString()).toBe('2026-02-01T00:00:00.000Z');
  });

  it('resuelve la zona string contra las zonas locales', () => {
    const entrada = normalizarEntrada(entradaPlace, zonas);
    expect(entrada.data.zone?.id).toBe('punta-sal');
    expect(entrada.data.zone?.data.title.en).toBe('Punta Sal Beach');
  });

  it('crea una zona de respaldo si el id no coincide', () => {
    const entrada = normalizarEntrada({ ...entradaPlace, data: { ...entradaPlace.data, zone: 'desconocida' } }, zonas);
    expect(entrada.data.zone?.id).toBe('desconocida');
    expect(entrada.data.zone?.data.title.es).toBe('desconocida');
  });

  it('aplica defaults cuando faltan campos', () => {
    const entrada = normalizarEntrada({ id: 'x', collection: 'services', data: { title: { es: 'Oficina', en: 'Office', pt: 'Escritório' } } });
    expect(entrada.data.description).toEqual({ es: '', en: '', pt: '' });
    expect(entrada.data.verified).toBe(false);
    expect(entrada.data.zone).toBeUndefined();
    expect(entrada.data.body).toBeUndefined();
  });

  it('preserva arrays localizados de servicios y actividades', () => {
    const entrada = normalizarEntrada(entradaPlace, zonas);
    expect(entrada.data.services?.en).toEqual(['Restrooms']);
    expect(entrada.data.activities?.es).toEqual(['Nadar']);
  });

  it('usa metadata.slug como id para conservar las rutas', () => {
    const entrada = normalizarEntrada(
      {
        ...entradaPlace,
        id: '9f4e1d8b-0000-4000-8000-000000000001',
        data: { ...entradaPlace.data, metadata: { slug: 'playa-zorritos' } },
      },
      zonas,
    );
    expect(entrada.id).toBe('playa-zorritos');
  });

  it('mantiene el id del contrato cuando no hay slug', () => {
    const entrada = normalizarEntrada(entradaPlace, zonas);
    expect(entrada.id).toBe('playa-zorritos');
  });

  it('mapea la subcategoría hoja del lugar', () => {
    const entrada = normalizarEntrada(
      { ...entradaPlace, data: { ...entradaPlace.data, subcategory: 'playas' } },
      zonas,
    );
    expect(entrada.data.subcategory).toBe('playas');
  });

  it('mapea la jerarquía de las categorías (parent, path, depth)', () => {
    const entrada = normalizarEntrada({
      id: 'playas',
      collection: 'categories',
      data: {
        title: { es: 'Playas', en: 'Beaches', pt: 'Praias' },
        description: { es: '', en: '', pt: '' },
        parent: 'places',
        parentId: 'uuid-padre',
        path: '/places/playas',
        depth: 1,
      },
    });
    expect(entrada.data.parent).toBe('places');
    expect(entrada.data.parentId).toBe('uuid-padre');
    expect(entrada.data.path).toBe('/places/playas');
    expect(entrada.data.depth).toBe(1);
  });

  it('categoría raíz: sin parent, parentId null', () => {
    const entrada = normalizarEntrada({
      id: 'places',
      collection: 'categories',
      data: { title: { es: 'Lugares', en: 'Places', pt: 'Lugares' } },
    });
    expect(entrada.data.parent).toBeUndefined();
    expect(entrada.data.parentId).toBeNull();
    expect(entrada.data.depth).toBeUndefined();
  });
});

describe('porActualizacionDesc', () => {
  it('ordena de más reciente a más antiguo', () => {
    const viejo = normalizarEntrada({ ...entradaPlace, id: 'a', data: { ...entradaPlace.data, updatedAt: '2026-01-01T00:00:00.000Z' } });
    const nuevo = normalizarEntrada({ ...entradaPlace, id: 'b', data: { ...entradaPlace.data, updatedAt: '2026-06-01T00:00:00.000Z' } });
    expect([viejo, nuevo].sort(porActualizacionDesc).map((e) => e.id)).toEqual(['b', 'a']);
  });
});
