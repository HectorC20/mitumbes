/**
 * Script de reloj en tiempo real y actualización de clima para Tumbes, Perú
 */

declare global {
  interface Window {
    __mitumbes_weather_clock_initialized?: boolean;
  }
}

function updateLiveClock(): void {
  if (typeof document === 'undefined' || document.hidden) return;

  const now = new Date();
  try {
    const timeFormatter = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const formattedTime = timeFormatter.format(now);
    const clockElements = document.querySelectorAll<HTMLElement>('[data-live-clock-time]');
    clockElements.forEach((el) => {
      if (el.textContent !== formattedTime) {
        el.textContent = formattedTime;
      }
    });
  } catch {
    const fallback = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    document.querySelectorAll<HTMLElement>('[data-live-clock-time]').forEach((el) => {
      if (el.textContent !== fallback) {
        el.textContent = fallback;
      }
    });
  }
}

async function refreshLiveWeather(): Promise<void> {
  if (typeof document === 'undefined' || document.hidden) return;

  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-3.5669&longitude=-80.4515&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=America%2FLima'
    );
    if (!res.ok) return;

    const data = await res.json();
    const current = data.current;
    if (!current) return;

    const temp = Math.round(Number(current.temperature_2m ?? 28) * 10) / 10;
    const humidity = Math.round(Number(current.relative_humidity_2m ?? 68));
    const wind = Math.round(Number(current.wind_speed_10m ?? 16) * 10) / 10;

    // Actualizar temperatura solo si cambió
    document.querySelectorAll<HTMLElement>('[data-live-temp]').forEach((el) => {
      const text = `${temp} °C`;
      if (el.textContent !== text) el.textContent = text;
    });

    // Actualizar humedad solo si cambió
    document.querySelectorAll<HTMLElement>('[data-live-humidity]').forEach((el) => {
      const text = `${humidity}%`;
      if (el.textContent !== text) el.textContent = text;
    });

    // Actualizar viento solo si cambió
    document.querySelectorAll<HTMLElement>('[data-live-wind]').forEach((el) => {
      const text = `${wind} km/h`;
      if (el.textContent !== text) el.textContent = text;
    });

    // Disparar evento global
    window.dispatchEvent(
      new CustomEvent('tumbes-weather-updated', {
        detail: { temp, humidity, wind, current },
      })
    );
  } catch {
    // Si falla silenciosamente conserva los valores del SSR
  }
}

export function initWeatherClock(): void {
  if (typeof window === 'undefined') return;

  if (window.__mitumbes_weather_clock_initialized) {
    updateLiveClock();
    return;
  }
  window.__mitumbes_weather_clock_initialized = true;

  updateLiveClock();
  // Revisar cada 10s; solo mutará el DOM si el minuto cambió (1 vez por minuto)
  setInterval(updateLiveClock, 10000);

  // Actualizar inmediatamente al volver a la pestaña
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      updateLiveClock();
    }
  });

  // Refrescar clima en cliente cada 10 min
  refreshLiveWeather();
  setInterval(refreshLiveWeather, 10 * 60 * 1000);
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWeatherClock);
  } else {
    initWeatherClock();
  }
}
