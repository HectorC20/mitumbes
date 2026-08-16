import { SITE } from '@/shared/constants/site';
import { COLLECTION_ICONS } from '@/shared/constants/collections';
import type { Locale } from '@/shared/constants/locales';
import { t } from '@/shared/constants/ui';
import {
  loc,
  type ContenidoConRelaciones,
} from '@/shared/content/places';

export function webSiteJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: `${SITE.url}/${lang}/`,
    description: t(lang, 'seo.homeDescription'),
    inLanguage: lang,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/${lang}/lugares/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

const CATEGORY_SCHEMA: Record<string, string> = {
  places: 'TouristAttraction',
  restaurants: 'Restaurant',
  hotels: 'Hotel',
  activities: 'SportsActivityLocation',
  events: 'Event',
  services: 'LocalBusiness',
};

export function lugarJsonLd(lugar: ContenidoConRelaciones, lang: Locale) {
  const type = CATEGORY_SCHEMA[lugar.collection] ?? 'Place';
  const title = loc(lugar.data.title, lang) ?? '';
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    url: `${SITE.url}/${lang}/lugares/${lugar.id}/`,
    image: lugar.data.image,
    description: loc(lugar.data.description, lang),
    ...(lugar.data.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: lugar.data.coordinates.lat,
        longitude: lugar.data.coordinates.lng,
      },
    }),
    ...(loc(lugar.data.address, lang) && {
      address: loc(lugar.data.address, lang),
    }),
    ...(loc(lugar.data.hours, lang) && {
      openingHours: loc(lugar.data.hours, lang),
    }),
    ...(loc(lugar.data.price, lang) && { priceRange: loc(lugar.data.price, lang) }),
    ...(lugar.data.phone && { telephone: lugar.data.phone }),
    ...(lugar.data.website && { url: lugar.data.website }),
    ...(lugar.data.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: lugar.data.rating,
        bestRating: 5,
      },
    }),
  };
}

export function breadcrumbJsonLd(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url && { item: `${SITE.url}${item.url}` }),
    })),
  };
}

export { COLLECTION_ICONS };
