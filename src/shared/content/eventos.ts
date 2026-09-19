import type { Locale } from '../constants/locales';
import type { Contenido } from './places';
import type { RangoEvento } from '../interfaces/event';

export type { RangoEvento };

/** Índice de mes por nombre en español (normalizado sin tildes). */
const MES_INDEX: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

/** Año de referencia para rangos sin año (recurrentes): solo interesan mes y día. */
const ANIO_RECURRENTE = 2000;

const DIAS_SEMANA_INDEX: Record<string, number> = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
  domingo: 0,
};

const ORDINAL_INDEX: Record<string, number> = {
  primer: 1,
  primero: 1,
  segundo: 2,
  tercer: 3,
  tercero: 3,
  cuarto: 4,
  quinto: 5,
  ultimo: -1,
};

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function ultimoDiaMes(anio: number, mes: number): Date {
  return new Date(anio, mes + 1, 0);
}

/** "mes" como palabra normalizada (ej. "septiembre") → índice 0-11. */
function mesDePalabra(palabra: string): number | undefined {
  return MES_INDEX[palabra];
}

/**
 * N-ésimo día de la semana de un mes ("segundo domingo de diciembre",
 * "última semana" no entra aquí). Devuelve el día del mes o undefined.
 */
function diaOrdinalDeMes(
  anio: number,
  mes: number,
  ordinal: number,
  diaSemana: number,
): number | undefined {
  const total = ultimoDiaMes(anio, mes).getDate();
  const coincidencias: number[] = [];
  for (let dia = 1; dia <= total; dia += 1) {
    if (new Date(anio, mes, dia).getDay() === diaSemana) coincidencias.push(dia);
  }
  if (ordinal > 0) return coincidencias[ordinal - 1];
  return coincidencias[coincidencias.length - 1]; // "último"
}

/**
 * Convierte un texto de fecha de evento (campo `hours` del backend) a un
 * rango de fechas. Devuelve undefined si el texto no es reconocible.
 */
export function parsearTextoFecha(texto: string): { desde: Date; hasta: Date } | undefined {
  const t = normalizar(texto);

  // "marzo - abril", "junio a octubre" (mes a mes; también dentro de paréntesis).
  const mesAMes = /([a-z]+)\s*(?:a|-|–)\s*([a-z]+)/.exec(t);
  if (mesAMes) {
    const m1 = mesDePalabra(mesAMes[1]);
    const m2 = mesDePalabra(mesAMes[2]);
    if (m1 !== undefined && m2 !== undefined) {
      return {
        desde: new Date(ANIO_RECURRENTE, m1, 1),
        hasta: ultimoDiaMes(ANIO_RECURRENTE, m2),
      };
    }
  }

  // "del 1 al 15 de diciembre", "28 y 29 de junio", "13 de noviembre".
  const dias = /(?:del\s+)?(\d{1,2})(?:\s+(?:al|y)\s+(\d{1,2}))?\s+de\s+([a-z]+)/.exec(t);
  if (dias) {
    const mes = mesDePalabra(dias[3]);
    if (mes !== undefined) {
      const diaInicio = Number.parseInt(dias[1], 10);
      const diaFin = dias[2] ? Number.parseInt(dias[2], 10) : diaInicio;
      if (diaInicio >= 1 && diaFin <= 31 && diaInicio <= diaFin) {
        return {
          desde: new Date(ANIO_RECURRENTE, mes, diaInicio),
          hasta: new Date(ANIO_RECURRENTE, mes, diaFin),
        };
      }
    }
  }

  // "última semana de agosto" → últimos 7 días del mes.
  const ultimaSemana = /ultima semana de ([a-z]+)/.exec(t);
  if (ultimaSemana) {
    const mes = mesDePalabra(ultimaSemana[1]);
    if (mes !== undefined) {
      const hasta = ultimoDiaMes(ANIO_RECURRENTE, mes);
      const desde = new Date(hasta);
      desde.setDate(hasta.getDate() - 6);
      return { desde, hasta };
    }
  }

  // "segundo domingo de diciembre" → ordinal + día de semana + mes.
  const ordinal = /(primer|primero|segundo|tercer|tercero|cuarto|quinto|ultimo)\s+(lunes|martes|miercoles|jueves|viernes|sabado|domingo)\s+de\s+([a-z]+)/.exec(t);
  if (ordinal) {
    const mes = mesDePalabra(ordinal[3]);
    const n = ORDINAL_INDEX[ordinal[1]];
    const diaSemana = DIAS_SEMANA_INDEX[ordinal[2]];
    if (mes !== undefined && n !== undefined && diaSemana !== undefined) {
      const dia = diaOrdinalDeMes(ANIO_RECURRENTE, mes, n, diaSemana);
      if (dia !== undefined) {
        return {
          desde: new Date(ANIO_RECURRENTE, mes, dia),
          hasta: new Date(ANIO_RECURRENTE, mes, dia),
        };
      }
    }
  }

  return undefined;
}

/**
 * Fecha ISO a Date local: `YYYY-MM-DD` se interpreta como día calendario
 * (evita el desfase de `new Date('2026-09-15')`, que es UTC y resta un día
 * en zonas horarias negativas).
 */
function parsearFechaISO(valor: string): Date | undefined {
  const soloFecha = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor.trim());
  if (soloFecha) {
    const fecha = new Date(
      Number(soloFecha[1]),
      Number(soloFecha[2]) - 1,
      Number(soloFecha[3]),
    );
    return Number.isNaN(fecha.getTime()) ? undefined : fecha;
  }
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? undefined : fecha;
}

/**
 * Rango de fechas de un evento: `startDate`/`endDate` del contrato si existen;
 * si no, se parsea el texto de `hours` (canónico en español, recurrente).
 */
export function rangoEvento(item: Contenido): RangoEvento | undefined {
  const d = item.data;
  if (d.startDate) {
    const desde = parsearFechaISO(d.startDate);
    if (desde) {
      const hasta = d.endDate ? parsearFechaISO(d.endDate) ?? desde : desde;
      return { desde, hasta, recurrente: false };
    }
  }
  const texto = d.hours?.es ?? d.hours?.en ?? d.hours?.pt;
  if (!texto) return undefined;
  const rango = parsearTextoFecha(texto);
  return rango ? { ...rango, recurrente: true } : undefined;
}

/**
 * ¿El evento ocurre dentro del mes indicado (solapamiento con la ventana del
 * mes)? Los recurrentes (sin año) coinciden por mes; los fechados, por fecha.
 */
export function eventoCoincideConMes(rango: RangoEvento, anio: number, mes: number): boolean {
  if (rango.recurrente) {
    const desdeMes = rango.desde.getMonth();
    const hastaMes = rango.hasta.getMonth();
    if (desdeMes <= hastaMes) return desdeMes <= mes && mes <= hastaMes;
    // Rango que cruza el año (ej. diciembre - enero).
    return mes >= desdeMes || mes <= hastaMes;
  }
  const inicioMes = new Date(anio, mes, 1);
  const finMes = new Date(anio, mes + 1, 0, 23, 59, 59, 999);
  return rango.desde <= finMes && rango.hasta >= inicioMes;
}

const NOMBRES_MES = {
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
} as const;

function nombreMes(mes: number, lang: Locale): string {
  const lista = NOMBRES_MES[lang] ?? NOMBRES_MES.es;
  return lista[mes] ?? String(mes + 1);
}

/** "1 - 15 Septiembre", "24 Septiembre", "1 Septiembre - 2 Octubre". */
export function formatearRangoEvento(rango: RangoEvento, lang: Locale): string {
  const { desde, hasta } = rango;
  const mismoDia = desde.getTime() === hasta.getTime();
  const mismoMes = desde.getMonth() === hasta.getMonth() && desde.getFullYear() === hasta.getFullYear();
  if (mismoDia) {
    return `${desde.getDate()} ${nombreMes(desde.getMonth(), lang)}`;
  }
  if (mismoMes) {
    return `${desde.getDate()} - ${hasta.getDate()} ${nombreMes(desde.getMonth(), lang)}`;
  }
  return `${desde.getDate()} ${nombreMes(desde.getMonth(), lang)} - ${hasta.getDate()} ${nombreMes(hasta.getMonth(), lang)}`;
}

/** Rango formateado de un evento, listo para mostrar en tarjetas y listados. */
export function fechaEvento(item: Contenido, lang: Locale): string | undefined {
  const rango = rangoEvento(item);
  return rango ? formatearRangoEvento(rango, lang) : undefined;
}
