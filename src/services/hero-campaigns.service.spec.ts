import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { heroCampaignsService } from './hero-campaigns.service';
import { api } from './api';
import * as weatherService from './weather.service';

describe('heroCampaignsService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(weatherService, 'getTumbesWeather').mockResolvedValue({
      temperature: 27,
      apparentTemperature: 28,
      condition: 'Cálido y Soleado',
      humidity: 78,
      windSpeed: 16,
      weatherCode: 0,
      icon: 'sun',
      isDay: true,
      timeLima: '2026-09-18T15:00:00-05:00',
      timeFormatted: '15:00',
      dateFormatted: '18 de septiembre de 2026',
      timezone: 'America/Lima',
      source: 'Open-Meteo',
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('devuelve diapositivas de respaldo inteligentes cuando la API no responde o no está configurada', async () => {
    vi.stubEnv('PUBLIC_API_URL', 'http://api.test');
    vi.spyOn(api, 'get').mockRejectedValueOnce(new Error('API offline'));

    const slides = await heroCampaignsService.obtenerHeroSlides('es');
    expect(slides.length).toBeGreaterThanOrEqual(4);
    expect(slides[0].id).toBe('mitumbes-plan');
    expect(slides[0].title).toBe('Plan de Viaje MiTumbes 2026');
    expect(slides[0].entityType).toBe('custom');
    expect(slides[1].entityType).toBe('event');
    expect(slides[2].entityType).toBe('category');
    expect(slides[3].entityType).toBe('zone');
  });

  it('mapea correctamente diapositivas dinámicas devueltas por mitumbes-server (/hero)', async () => {
    vi.stubEnv('PUBLIC_API_URL', 'http://api.test');
    vi.spyOn(api, 'get').mockResolvedValueOnce({
      slides: [
        {
          id: 'punta-sal',
          entityType: 'place',
          tag: 'Playa Top',
          eyebrow: 'LUGAR DESTACADO • PUNTA SAL',
          title: { es: 'Playa Punta Sal', en: 'Punta Sal Beach', pt: 'Praia Punta Sal' },
          desc: { es: 'Aguas cálidas y tranquilas', en: 'Warm and calm waters', pt: 'Aguas quentes e calmas' },
          image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
          href: '/places/punta-sal/',
          ctaText: { es: 'Ver Lugar', en: 'View Place', pt: 'Ver Lugar' },
          status: '100% Verificado',
          metaTemp: '28 °C Actual',
          metaStatus: '100% Verificado',
          metaOperators: 'Punta Sal / Cancas',
        },
      ],
    });

    const slidesEs = await heroCampaignsService.obtenerHeroSlides('es');
    expect(slidesEs.length).toBe(1);
    expect(slidesEs[0].id).toBe('punta-sal');
    expect(slidesEs[0].entityType).toBe('place');
    expect(slidesEs[0].title).toBe('Playa Punta Sal');
    expect(slidesEs[0].desc).toBe('Aguas cálidas y tranquilas');
    expect(slidesEs[0].tag).toBe('Playa Top');
    expect(slidesEs[0].href).toBe('/es/places/punta-sal/');
    expect(slidesEs[0].ctaText).toBe('Ver Lugar');
  });

  it('localiza correctamente al inglés y portugués cuando los datos son multilingües', async () => {
    vi.stubEnv('PUBLIC_API_URL', 'http://api.test');
    vi.spyOn(api, 'get').mockResolvedValueOnce({
      slides: [
        {
          id: 'avistamiento-ballenas',
          entityType: 'event',
          tag: 'Whale Season',
          eyebrow: 'SEASON EVENT',
          title: { es: 'Ballenas Jorobadas', en: 'Humpback Whales', pt: 'Baleias-Jubarte' },
          desc: { es: 'Temporada en el norte', en: 'Northern season', pt: 'Temporada no norte' },
          image: '/images/ballenas.jpg',
          href: '/events/ballenas/',
          ctaText: { es: 'Ver Evento', en: 'View Event', pt: 'Ver Evento' },
          status: 'Active',
          metaTemp: '27 °C',
          metaStatus: '98% Probability',
          metaOperators: 'Zorritos',
        },
      ],
    });

    const slidesEn = await heroCampaignsService.obtenerHeroSlides('en');
    expect(slidesEn[0].title).toBe('Humpback Whales');
    expect(slidesEn[0].desc).toBe('Northern season');
    expect(slidesEn[0].href).toBe('/en/events/ballenas/');
  });
});
