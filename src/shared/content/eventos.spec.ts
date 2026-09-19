import { describe, expect, it } from 'vitest';
import {
  eventoCoincideConMes,
  formatearRangoEvento,
  parsearTextoFecha,
  rangoEvento,
  type RangoEvento,
} from './eventos';
import type { Contenido } from './places';

function eventoConHours(hours: string): Contenido {
  return {
    id: 'evt',
    collection: 'events',
    data: {
      title: { es: 'Evento', en: 'Event', pt: 'Evento' },
      description: { es: '', en: '', pt: '' },
      hours: { es: hours, en: hours, pt: hours },
      verified: false,
      featured: false,
    },
  };
}

describe('parsearTextoFecha', () => {
  it('parsea un día suelto', () => {
    const rango = parsearTextoFecha('13 de noviembre');
    expect(rango?.desde.getMonth()).toBe(10);
    expect(rango?.desde.getDate()).toBe(13);
    expect(rango?.hasta.getDate()).toBe(13);
  });

  it('parsea "X al Y de mes"', () => {
    const rango = parsearTextoFecha('1 al 15 de septiembre (día central 8)');
    expect(rango?.desde.getMonth()).toBe(8);
    expect(rango?.desde.getDate()).toBe(1);
    expect(rango?.hasta.getDate()).toBe(15);
  });

  it('parsea "Del X al Y de mes"', () => {
    const rango = parsearTextoFecha('Del 1 al 15 de diciembre (día central: 8)');
    expect(rango?.desde.getMonth()).toBe(11);
    expect(rango?.desde.getDate()).toBe(1);
    expect(rango?.hasta.getDate()).toBe(15);
  });

  it('parsea "X y Y de mes"', () => {
    const rango = parsearTextoFecha('22 y 23 de julio');
    expect(rango?.desde.getMonth()).toBe(6);
    expect(rango?.desde.getDate()).toBe(22);
    expect(rango?.hasta.getDate()).toBe(23);
  });

  it('parsea rangos de mes a mes', () => {
    const rango = parsearTextoFecha('Movible (marzo - abril)');
    expect(rango?.desde.getMonth()).toBe(2);
    expect(rango?.desde.getDate()).toBe(1);
    expect(rango?.hasta.getMonth()).toBe(3);
    expect(rango?.hasta.getDate()).toBe(30);
  });

  it('parsea "junio a octubre"', () => {
    const rango = parsearTextoFecha('Junio a octubre');
    expect(rango?.desde.getMonth()).toBe(5);
    expect(rango?.hasta.getMonth()).toBe(9);
    expect(rango?.hasta.getDate()).toBe(31);
  });

  it('parsea "última semana de mes"', () => {
    const rango = parsearTextoFecha('Última semana de agosto');
    expect(rango?.desde.getMonth()).toBe(7);
    expect(rango?.desde.getDate()).toBe(25);
    expect(rango?.hasta.getDate()).toBe(31);
  });

  it('parsea "segundo domingo de mes"', () => {
    const rango = parsearTextoFecha('Segundo domingo de diciembre');
    expect(rango?.desde.getMonth()).toBe(11);
    expect(rango?.desde.getDate()).toBe(10);
  });

  it('devuelve undefined para texto irreconocible', () => {
    expect(parsearTextoFecha('Fecha por confirmar')).toBeUndefined();
  });
});

describe('rangoEvento', () => {
  it('usa startDate/endDate del contrato cuando existen', () => {
    const item: Contenido = {
      ...eventoConHours('1 al 15 de septiembre'),
      data: {
        ...eventoConHours('').data,
        startDate: '2026-09-01',
        endDate: '2026-09-15',
      },
    };
    const rango = rangoEvento(item);
    expect(rango?.recurrente).toBe(false);
    expect(rango?.desde.getFullYear()).toBe(2026);
    expect(rango?.hasta.getDate()).toBe(15);
  });

  it('deduce el rango de hours como recurrente', () => {
    const rango = rangoEvento(eventoConHours('24 de septiembre'));
    expect(rango?.recurrente).toBe(true);
    expect(rango?.desde.getDate()).toBe(24);
  });

  it('devuelve undefined sin fechas ni hours', () => {
    expect(rangoEvento(eventoConHours(''))).toBeUndefined();
  });
});

describe('eventoCoincideConMes', () => {
  const recurrente = (m1: number, d1: number, m2: number, d2: number): RangoEvento => ({
    desde: new Date(2000, m1, d1),
    hasta: new Date(2000, m2, d2),
    recurrente: true,
  });

  it('coincide por mes en eventos recurrentes (cualquier año)', () => {
    const rango = recurrente(8, 1, 8, 15); // 1-15 septiembre
    expect(eventoCoincideConMes(rango, 2026, 8)).toBe(true);
    expect(eventoCoincideConMes(rango, 1990, 8)).toBe(true);
    expect(eventoCoincideConMes(rango, 2026, 7)).toBe(false);
  });

  it('coincide rangos recurrentes que cruzan el año', () => {
    const rango = recurrente(11, 20, 0, 6); // 20 dic - 6 ene
    expect(eventoCoincideConMes(rango, 2026, 11)).toBe(true);
    expect(eventoCoincideConMes(rango, 2026, 0)).toBe(true);
    expect(eventoCoincideConMes(rango, 2026, 5)).toBe(false);
  });

  it('compara por fecha exacta cuando el evento tiene año', () => {
    const rango: RangoEvento = {
      desde: new Date(2026, 6, 20),
      hasta: new Date(2026, 7, 5),
      recurrente: false,
    };
    expect(eventoCoincideConMes(rango, 2026, 6)).toBe(true);
    expect(eventoCoincideConMes(rango, 2026, 7)).toBe(true);
    expect(eventoCoincideConMes(rango, 2026, 8)).toBe(false);
    expect(eventoCoincideConMes(rango, 2027, 6)).toBe(false);
  });
});

describe('formatearRangoEvento', () => {
  it('formatea un día suelto', () => {
    const rango: RangoEvento = {
      desde: new Date(2000, 8, 24),
      hasta: new Date(2000, 8, 24),
      recurrente: true,
    };
    expect(formatearRangoEvento(rango, 'es')).toBe('24 Septiembre');
    expect(formatearRangoEvento(rango, 'en')).toBe('24 September');
  });

  it('formatea un rango dentro del mismo mes', () => {
    const rango: RangoEvento = {
      desde: new Date(2000, 8, 1),
      hasta: new Date(2000, 8, 15),
      recurrente: true,
    };
    expect(formatearRangoEvento(rango, 'es')).toBe('1 - 15 Septiembre');
  });

  it('formatea un rango entre meses', () => {
    const rango: RangoEvento = {
      desde: new Date(2000, 5, 28),
      hasta: new Date(2000, 6, 3),
      recurrente: true,
    };
    expect(formatearRangoEvento(rango, 'es')).toBe('28 Junio - 3 Julio');
  });
});
