import type { TumbesWeather } from '@/shared/interfaces/weather';

export type { TumbesWeather };

const WMO_CODES: Record<number, { condition: string; icon: string }> = {
  0: { condition: 'Despejado y Soleado', icon: 'sun' },
  1: { condition: 'Principalmente Despejado', icon: 'sun' },
  2: { condition: 'Parcialmente Nublado', icon: 'sun' },
  3: { condition: 'Nublado', icon: 'compass' },
  45: { condition: 'Neblina costera', icon: 'compass' },
  48: { condition: 'Neblina con escarcha', icon: 'compass' },
  51: { condition: 'Llovizna ligera', icon: 'waves' },
  53: { condition: 'Llovizna moderada', icon: 'waves' },
  55: { condition: 'Llovizna densa', icon: 'waves' },
  61: { condition: 'Lluvia ligera', icon: 'waves' },
  63: { condition: 'Lluvia moderada', icon: 'waves' },
  65: { condition: 'Lluvia intensa', icon: 'waves' },
  80: { condition: 'Chubascos ligeros', icon: 'waves' },
  81: { condition: 'Chubascos moderados', icon: 'waves' },
  82: { condition: 'Chubascos intensos', icon: 'waves' },
  95: { condition: 'Tormenta eléctrica', icon: 'activity' },
};

export function formatTumbesTime(date = new Date()): { time: string; date: string } {
  try {
    const timeFormatter = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const dateFormatter = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      time: timeFormatter.format(date),
      date: dateFormatter.format(date),
    };
  } catch {
    return {
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString(),
    };
  }
}

export async function getTumbesWeather(): Promise<TumbesWeather> {
  const { time, date } = formatTumbesTime();
  
  const defaultData: TumbesWeather = {
    temperature: 28.5,
    apparentTemperature: 31.0,
    humidity: 68,
    windSpeed: 16.0,
    weatherCode: 0,
    condition: 'Soleado y Cálido',
    icon: 'sun',
    isDay: true,
    timeLima: 'GMT-5',
    timeFormatted: time,
    dateFormatted: date,
    timezone: 'America/Lima',
    source: 'Open-Meteo Tumbes',
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-3.5669&longitude=-80.4515&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=America%2FLima',
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (!res.ok) {
      return defaultData;
    }

    const json = await res.json();
    const current = json.current;

    if (!current) {
      return defaultData;
    }

    const code = Number(current.weather_code ?? 0);
    const meta = WMO_CODES[code] || { condition: 'Cálido Tropical', icon: 'sun' };

    return {
      temperature: Math.round(Number(current.temperature_2m ?? 28) * 10) / 10,
      apparentTemperature: Math.round(Number(current.apparent_temperature ?? 30) * 10) / 10,
      humidity: Math.round(Number(current.relative_humidity_2m ?? 68)),
      windSpeed: Math.round(Number(current.wind_speed_10m ?? 15) * 10) / 10,
      weatherCode: code,
      condition: meta.condition,
      icon: meta.icon,
      isDay: current.is_day === 1,
      timeLima: 'GMT-5',
      timeFormatted: time,
      dateFormatted: date,
      timezone: 'America/Lima',
      source: 'Open-Meteo (En vivo)',
    };
  } catch (error) {
    console.warn('[WeatherService] Error al consultar Open-Meteo, usando datos de respaldo:', error);
    return defaultData;
  }
}
