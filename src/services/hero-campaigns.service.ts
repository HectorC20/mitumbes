import { api } from './api';
import { imagenSrc } from '@/shared/content/places';
import { localizePath, type Locale } from '@/shared/constants/locales';
import { getTumbesWeather } from './weather.service';
import type { HeroCampaignSlide, HeroEntityType } from '@/shared/interfaces/hero.carousel';

interface RawHeroResponse {
  slides?: Array<Record<string, unknown>>;
}

/** Extrae el valor localizado con fallback a español o string plano */
function extractLoc(val: unknown, lang: Locale, fallback = ''): string {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    const rec = val as Record<string, unknown>;
    return String(rec[lang] ?? rec.es ?? fallback);
  }
  return fallback;
}

/**
 * Servicio para obtener las campañas y diapositivas activas del Hero,
 * configurables y modificables por el MCP de mitumbes-server.
 */
export const heroCampaignsService = {
  /**
   * Consulta las campañas dinámicas del Hero desde la API (/hero).
   * Si la API está offline o vacía, resuelve diapositivas dinámicas de respaldo
   * con datos de clima en vivo y campañas curadas.
   */
  async obtenerHeroSlides(lang: Locale): Promise<HeroCampaignSlide[]> {
    const weather = await getTumbesWeather();

    if (Boolean(import.meta.env.PUBLIC_API_URL)) {
      try {
        const data = await api.get<RawHeroResponse>('/hero', { timeoutMs: 4000 });
        if (data && Array.isArray(data.slides) && data.slides.length > 0) {
          return data.slides.map((s, idx) => {
            const rawHref = String(s.href || '/places/');
            const localizedHref = rawHref.startsWith('http') ? rawHref : localizePath(rawHref, lang);
            const imageRaw = typeof s.image === 'string' ? s.image : undefined;

            return {
              id: String(s.id || `slide-${idx}`),
              entityType: (s.entityType as HeroEntityType) || 'custom',
              tag: String(s.tag || 'Experiencia').replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/gu, '').trim(),
              eyebrow: String(s.eyebrow || 'COSTA NORTE • PERÚ'),
              title: extractLoc(s.title, lang, 'MiTumbes'),
              desc: extractLoc(s.desc, lang, ''),
              status: String(s.status || 'En Vivo').replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/gu, '').trim(),
              image: imagenSrc(imageRaw) || '/images/hero-mitumbes-travel-plan.webp',
              href: localizedHref,
              ctaText: extractLoc(s.ctaText, lang, 'Ver Ficha y Servicios'),
              metaTemp: String(s.metaTemp || `${weather.temperature} °C Actual`),
              metaStatus: String(s.metaStatus || '100% Verificado'),
              metaOperators: String(s.metaOperators || 'Tumbes / Playas'),
            };
          });
        }
      } catch (error) {
        console.warn(
          '[heroCampaignsService] No se pudo obtener /hero desde mitumbes-server, usando fallback inteligente:',
          error instanceof Error ? error.message : error,
        );
      }
    }

    // Fallback inteligente y curado
    return this.obtenerFallbackSlides(lang, weather.temperature);
  },

  /**
   * Diapositivas por defecto con datos de clima en vivo y rutas oficiales.
   */
  obtenerFallbackSlides(lang: Locale, temp: number): HeroCampaignSlide[] {
    const placesHref = localizePath('/places/', lang);

    return [
      {
        id: 'mitumbes-plan',
        entityType: 'custom',
        eyebrow: 'GUÍA OFICIAL • COSTA NORTE DEL PERÚ',
        title: 'Plan de Viaje MiTumbes 2026',
        desc: 'Tumbes concentra el litoral más cálido del Perú, con aguas que promedian los 28 °C a 32 °C y acceso directo a manglares y bosque seco tropical. Esta guía reúne la logística real para viajar por la región: traslados desde el aeropuerto y terminales, evaluación de playas (desde Punta Sal y Zorritos hasta Puerto Pizarro), costos de referencia y fichas de servicios verificadas localmente.',
        tag: 'Plan MiTumbes',
        status: 'Clima & Hora en Vivo • Tumbes',
        image: '/images/hero-mitumbes-travel-plan.webp',
        href: placesHref,
        ctaText: 'Ver Plan y Lugares',
        metaTemp: `${temp} °C Actual`,
        metaStatus: '100% Verificado',
        metaOperators: 'Tumbes / Playas',
      },
      {
        id: 'ballenas',
        entityType: 'event',
        eyebrow: 'TEMPORADA OFICIAL • JULIO - OCTUBRE',
        title: 'Avistamiento de Ballenas Jorobadas 2026',
        desc: 'Cientos de ballenas jorobadas migran por las costas cálidas de Punta Sal y Zorritos. Embarcaciones autorizadas con biólogos marinos y 98% de probabilidad de avistamiento.',
        tag: 'Ballenas Jorobadas',
        status: 'Temporada Activa',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
        href: localizePath('/places/?q=ballenas', lang),
        ctaText: 'Ver Operadores y Tours',
        metaTemp: `${temp} °C Actual`,
        metaStatus: '98% Probabilidad',
        metaOperators: '14 Operadores',
      },
      {
        id: 'gastronomia',
        entityType: 'category',
        eyebrow: 'PATRIMONIO CULINARIO DEL PACÍFICO SUR',
        title: 'Ruta del Mangle y Ceviche de Conchas Negras',
        desc: 'Visita los canales de Puerto Pizarro y prueba el manjar bandera de Tumbes extraído de manera sostenible del santuario de manglares.',
        tag: 'Ruta del Ceviche',
        status: 'Gastronomía Local',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1600&q=80',
        href: localizePath('/categories/restaurants/', lang),
        ctaText: 'Ver Restaurantes',
        metaTemp: `${temp} °C Actual`,
        metaStatus: '35 Cevicherías',
        metaOperators: 'Puerto Pizarro',
      },
      {
        id: 'playas',
        entityType: 'zone',
        eyebrow: 'VERANO PERPETUO EN EL NORTE',
        title: 'Zorritos & Punta Sal: Aguas Cálidas y Relax',
        desc: 'El balneario con la mejor temperatura de mar del Perú durante todo el año, hoteles de playa y desconexión total a 30 minutos del aeropuerto.',
        tag: 'Playas & Relax',
        status: 'Alta Demanda',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80',
        href: localizePath('/zones/zorritos/', lang),
        ctaText: 'Descubrir Balnearios',
        metaTemp: `${temp} °C Actual`,
        metaStatus: '18 Hoteles',
        metaOperators: 'Zorritos / Punta Sal',
      },
    ];
  },
};
