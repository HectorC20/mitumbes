import { afterEach, describe, expect, it, vi } from 'vitest';

type ContenidoApiModule = typeof import('./contenido-api');

/** Recarga el módulo (y sus dependencias) con el env actual. */
async function cargarModulo(): Promise<ContenidoApiModule> {
  vi.resetModules();
  return import('./contenido-api');
}

function respuestaJson(data: unknown) {
  return { ok: true, status: 200, json: async () => data } as Response;
}

const place = {
  id: 'playa-zorritos',
  collection: 'places',
  data: {
    title: { es: 'Playa Zorritos', en: 'Zorritos Beach', pt: 'Praia Zorritos' },
    description: { es: 'Aguas cálidas', en: 'Warm waters', pt: 'Águas quentes' },
    verified: true,
    updatedAt: '2026-02-01T00:00:00.000Z',
  },
};

describe('contenido-api (adaptador a la API)', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('deshabilitada sin PUBLIC_API_URL: no llama a la red', async () => {
    vi.stubEnv('PUBLIC_API_URL', '');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const mod = await cargarModulo();
    expect(mod.apiHabilitada()).toBe(false);
    expect(await mod.getContenidoApi()).toBeUndefined();
    expect(await mod.getCategoriasApi()).toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('consume /places, /events y /zones y normaliza al shape web', async () => {
    vi.stubEnv('PUBLIC_API_URL', 'http://api.test');
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/places')) return respuestaJson({ items: [place] });
      if (url.endsWith('/events')) return respuestaJson({ items: [] });
      if (url.endsWith('/zones')) return respuestaJson([]);
      return respuestaJson({});
    });
    vi.stubGlobal('fetch', fetchMock);

    const mod = await cargarModulo();
    const contenidos = await mod.getContenidoApi();

    expect(contenidos).toHaveLength(1);
    expect(contenidos?.[0]).toMatchObject({
      id: 'playa-zorritos',
      collection: 'places',
    });
    expect(contenidos?.[0].data.updatedAt).toBeInstanceOf(Date);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/places'),
      expect.anything(),
    );
  });

  it('devuelve undefined si la API falla', async () => {
    vi.stubEnv('PUBLIC_API_URL', 'http://api.test');
    vi.stubGlobal('fetch', vi.fn(async () => {
      throw new Error('network down');
    }));

    const mod = await cargarModulo();
    expect(await mod.getContenidoApi()).toBeUndefined();
    expect(await mod.getCategoriasApi()).toBeUndefined();
    expect(await mod.getZonasApi()).toBeUndefined();
  });

  it('devuelve undefined si la API responde con error HTTP', async () => {
    vi.stubEnv('PUBLIC_API_URL', 'http://api.test');
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 503 }) as Response));

    const mod = await cargarModulo();
    expect(await mod.getContenidoApi()).toBeUndefined();
  });

  it('normaliza las categorías de /categories', async () => {
    vi.stubEnv('PUBLIC_API_URL', 'http://api.test');
    const categoria = {
      id: 'restaurants',
      collection: 'restaurants',
      data: {
        title: { es: 'Restaurantes', en: 'Restaurants', pt: 'Restaurantes' },
        description: { es: 'Comida local', en: 'Local food', pt: 'Comida local' },
        icon: 'utensils',
      },
    };
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.endsWith('/categories')) return respuestaJson([categoria]);
        return respuestaJson([]);
      }),
    );

    const mod = await cargarModulo();
    const categorias = await mod.getCategoriasApi();
    expect(categorias).toHaveLength(1);
    expect(categorias?.[0].data.icon).toBe('utensils');
  });

  it('normaliza las zonas de /zones (id = slug)', async () => {
    vi.stubEnv('PUBLIC_API_URL', 'http://api.test');
    const zona = {
      id: 'punta-sal',
      collection: 'zones',
      data: {
        title: { es: 'Punta Sal', en: 'Punta Sal Beach', pt: 'Punta Sal' },
        type: 'playa',
        description: { es: 'Playa del norte', en: 'Northern beach', pt: 'Praia do norte' },
      },
    };
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.endsWith('/zones')) return respuestaJson([zona]);
        return respuestaJson({});
      }),
    );

    const mod = await cargarModulo();
    const zonas = await mod.getZonasApi();
    expect(zonas).toHaveLength(1);
    expect(zonas?.[0].id).toBe('punta-sal');
    expect(zonas?.[0].data.title.en).toBe('Punta Sal Beach');
  });
});
