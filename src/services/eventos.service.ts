/**
 * Servicio de dominio: eventos.
 *
 * Los eventos son la categoría `events` del catálogo unificado. Sus fechas
 * llegan como `startDate`/`endDate` o, para fiestas recurrentes, como texto
 * en `hours` (ver shared/content/eventos.ts). El filtro de calendario y el
 * orden por fecha se resuelven aquí; el catálogo de eventos es pequeño, así
 * que se pide completo (una sola petición) y se pagina en la web.
 */
import { getPaginaContenidosApi } from './contenido-api';
import {
  LUGARES_POR_PAGINA,
  type ContenidoConRelaciones,
  type PaginaListado,
} from '@/shared/content/places';
import { eventoCoincideConMes, rangoEvento, type RangoEvento } from '@/shared/content/eventos';

/** Tope de eventos pedidos al backend (el catálogo actual es de decenas). */
const LIMITE_EVENTOS = 200;

interface FiltroEventos {
  /** Mes del calendario activo en formato YYYY-MM; undefined = sin filtro. */
  mes?: string;
}

interface EventoConRango {
  item: ContenidoConRelaciones;
  rango?: RangoEvento;
}

export const eventosService = {
  /**
   * Una página del listado de eventos. Sin `mes` devuelve la agenda completa
   * ordenada por fecha de inicio (los eventos sin fecha reconocible, al final).
   */
  listarPagina: async (filtro: FiltroEventos = {}, page = 1): Promise<PaginaListado> => {
    const pagina = await getPaginaContenidosApi({ categoria: 'events', limit: LIMITE_EVENTOS });
    let conRango: EventoConRango[] = (pagina?.items ?? []).map((item) => ({
      item,
      rango: rangoEvento(item),
    }));

    if (filtro.mes) {
      const [anio, mes] = filtro.mes.split('-').map(Number);
      if (!Number.isNaN(anio) && !Number.isNaN(mes)) {
        conRango = conRango.filter(
          (c) => c.rango && eventoCoincideConMes(c.rango, anio, mes - 1),
        );
      }
    }

    conRango.sort((a, b) => {
      if (a.rango && b.rango) return a.rango.desde.getTime() - b.rango.desde.getTime();
      if (a.rango) return -1;
      if (b.rango) return 1;
      return 0;
    });

    const total = conRango.length;
    const paginaActual = page > 0 ? page : 1;
    const inicio = (paginaActual - 1) * LUGARES_POR_PAGINA;
    return {
      items: conRango.slice(inicio, inicio + LUGARES_POR_PAGINA).map((c) => c.item),
      total,
      page: paginaActual,
      totalPaginas: Math.max(1, Math.ceil(total / LUGARES_POR_PAGINA)),
    };
  },
};
