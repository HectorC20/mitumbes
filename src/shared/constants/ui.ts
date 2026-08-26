import type { Locale } from './locales';

/**
 * Diccionario de interfaz (UI) por idioma.
 * Un solo archivo central para que todos los apartados trabajen unificados.
 */
export const ui = {
  es: {
    // Navegación
    'nav.home': 'Inicio',
    'nav.places': 'Lugares',
    'nav.categories': 'Categorías',
    'nav.zones': 'Zonas',
    'nav.explore': 'Explorar',
    'nav.search': 'Buscar',
    'nav.searchLabel': 'Buscar en MiTumbes',
    'nav.searchPlaceholder': 'Buscar…',
    'nav.language': 'Idioma',
    'nav.menu': 'Abrir menú',

    // Home
    'home.heroEyebrow': 'Costa norte del Perú',
    'home.heroTitle': 'Descubre Tumbes: playas, manglares y sabor',
    'home.heroLead':
      'Encuentra lugares turísticos, restaurantes, hoteles, actividades y eventos. Información clara y verificada para planificar tu visita a la región.',
    'home.searchPlaceholder':
      '¿Qué quieres hacer? Ej.: playa, cebiche, manglares…',
    'home.searchSubmit': 'Buscar',
    'home.categoriesEyebrow': 'Explora por categoría',
    'home.categoriesTitle': '¿Qué buscas hoy?',
    'home.featuredEyebrow': 'Recomendados',
    'home.featuredTitle': 'Lugares destacados de la región',
    'home.zonesEyebrow': 'Explora por zona',
    'home.zonesTitle': 'Elige tu base en la costa norte',
    'home.viewAll': 'Ver todas',
    'home.viewZones': 'Ver zonas',

    // SEO por apartado
    'seo.homeTitle': 'MiTumbes — Guía turística de Tumbes',
    'seo.homeDescription':
      'Guía turística de Tumbes: lugares turísticos, restaurantes, hoteles, actividades, eventos y zonas en la costa norte del Perú.',
    'seo.placesTitle': 'Lugares en Tumbes',
    'seo.placesDescription':
      'Directorio de lugares turísticos, restaurantes, hoteles, actividades y eventos en Tumbes: playas, manglares, balnearios y más.',
    'seo.categoriesTitle': 'Categorías de lugares en Tumbes',
    'seo.categoriesDescription':
      'Explora los lugares de Tumbes por categoría: lugares turísticos, restaurantes, hoteles, actividades, eventos y servicios.',
    'seo.zonesTitle': 'Zonas de Tumbes',
    'seo.zonesDescription':
      'Explora las zonas de Tumbes: la ciudad, Zorritos, Punta Sal, Cancas, Bocapán y los manglares de Puerto Pizarro.',
    'seo.notFoundTitle': 'Página no encontrada',
    'seo.notFoundDescription': 'La página que buscas no existe.',

    // Contadores
    'count.places': 'lugares',
    'count.place': 'lugar',
    'count.in': 'en',

    // Buscador
    'search.label': 'Buscar lugares',
    'search.placeholder':
      '¿Qué quieres hacer en Tumbes? Ej.: cebiche, playa, manglares…',
    'search.filterCategory': 'Filtrar por categoría',
    'search.allCategories': 'Todas las categorías',
    'search.filterZone': 'Filtrar por zona',
    'search.allZones': 'Todas las zonas',
    'search.submit': 'Buscar',
    'search.popular': 'Búsquedas populares:',
    'search.bySection': 'Buscar por apartado:',
    'search.emptyTitle': 'No encontramos resultados',
    'search.emptyBody':
      'Prueba con otras palabras, otra categoría o explora todas las zonas.',
    'search.viewAllPlaces': 'Ver todos los lugares',

    // Detalle de contenido
    'place.about': 'Sobre este lugar',
    'place.howToGet': 'Cómo llegar',
    'place.activities': 'Actividades',
    'place.services': 'Servicios',
    'place.usefulInfo': 'Información útil',
    'place.address': 'Dirección',
    'place.phone': 'Teléfono',
    'place.website': 'Sitio web',
    'place.location': 'Ubicación',
    'place.viewMap': 'Ver en el mapa',
    'place.source': 'Fuente',
    'place.updated': 'Última actualización',
    'place.getDirections': 'Cómo llegar',
    'place.shareWhatsApp': 'Compartir por WhatsApp',
    'place.verified': 'Información verificada',
    'place.verifiedBadge': 'Verificado',
    'place.seePlace': 'Ver lugar',
    'place.relatedEyebrow': 'Sigue explorando',
    'place.relatedTitle': 'Otros lugares en {zone} y {category}',
    'place.viewZone': 'Ver zona',

    // Compartir
    'share.label': 'Compartir',
    'share.whatsapp': 'Compartir en WhatsApp',
    'share.facebook': 'Compartir en Facebook',
    'share.x': 'Compartir en X',
    'share.linkedin': 'Compartir en LinkedIn',
    'share.copy': 'Copiar enlace',
    'share.copied': 'Enlace copiado',

    // Categorías
    'categories.eyebrow': 'Explorar',
    'categories.lead':
      'Navega el directorio de Tumbes por tipo de lugar para encontrar exactamente lo que buscas.',
    'categories.inTumbes': 'en Tumbes',
    'categories.emptyTitle': 'Aún no hay lugares en esta categoría',
    'categories.emptyBody': 'Muy pronto agregaremos más información.',

    // Zonas
    'zones.eyebrow': 'Explorar',
    'zones.lead':
      'Elige tu base: desde la ciudad capital hasta los balnearios y playas de la costa norte.',
    'zones.emptyTitle': 'Aún no hay lugares registrados en esta zona',
    'zones.emptyBody': 'Muy pronto agregaremos más información.',
    'zones.imageAlt': 'Paisaje de {zone}, Tumbes',

    // 404
    'notFound.title': 'Página no encontrada',
    'notFound.lead':
      'El enlace que seguiste no existe o el contenido fue movido. Vuelve al inicio o explora el directorio de lugares de Tumbes.',
    'notFound.goHome': 'Ir al inicio',
    'notFound.explorePlaces': 'Explorar lugares',

    // Footer
    'footer.placesHeading': 'Lugares',
    'footer.viewAllPlaces': 'Ver todos',
    'footer.placesType1': 'Lugares turísticos',
    'footer.placesType2': 'Restaurantes',
    'footer.placesType3': 'Hoteles',
    'footer.exploreHeading': 'Explorar',
    'footer.categories': 'Categorías',
    'footer.zones': 'Zonas',
    'footer.note':
      'Información turística de la región Tumbes.',
    'footer.verification': '',
    'footer.report': 'reportar datos',

    // Geolocalización del visitante
    'geo.location': 'Visitando desde',
    'geo.detecting': 'Detectando ubicación…',
  },
  en: {
    'nav.home': 'Home',
    'nav.places': 'Places',
    'nav.categories': 'Categories',
    'nav.zones': 'Zones',
    'nav.explore': 'Explore',
    'nav.search': 'Search',
    'nav.searchLabel': 'Search MiTumbes',
    'nav.searchPlaceholder': 'Search…',
    'nav.language': 'Language',
    'nav.menu': 'Open menu',

    'home.heroEyebrow': 'Northern coast of Peru',
    'home.heroTitle': 'Discover Tumbes: beaches, mangroves and flavor',
    'home.heroLead':
      'Find tourist attractions, restaurants, hotels, activities and events. Clear, verified information to plan your visit to the region.',
    'home.searchPlaceholder': 'What do you want to do? E.g.: beach, ceviche, mangroves…',
    'home.searchSubmit': 'Search',
    'home.categoriesEyebrow': 'Explore by category',
    'home.categoriesTitle': 'What are you looking for today?',
    'home.featuredEyebrow': 'Recommended',
    'home.featuredTitle': 'Featured places of the region',
    'home.zonesEyebrow': 'Explore by zone',
    'home.zonesTitle': 'Choose your base on the northern coast',
    'home.viewAll': 'View all',
    'home.viewZones': 'View zones',

    'seo.homeTitle': 'MiTumbes — Tumbes travel guide',
    'seo.homeDescription':
      'Tumbes travel guide: tourist attractions, restaurants, hotels, activities, events and zones on the northern coast of Peru.',
    'seo.placesTitle': 'Places in Tumbes',
    'seo.placesDescription':
      'Directory of tourist attractions, restaurants, hotels, activities and events in Tumbes: beaches, mangroves, beach resorts and more.',
    'seo.categoriesTitle': 'Place categories in Tumbes',
    'seo.categoriesDescription':
      'Explore Tumbes places by category: tourist attractions, restaurants, hotels, activities, events and services.',
    'seo.zonesTitle': 'Zones of Tumbes',
    'seo.zonesDescription':
      'Explore the zones of Tumbes: the city, Zorritos, Punta Sal, Cancas, Bocapán and the Puerto Pizarro mangroves.',
    'seo.notFoundTitle': 'Page not found',
    'seo.notFoundDescription': 'The page you are looking for does not exist.',

    'count.places': 'places',
    'count.place': 'place',
    'count.in': 'in',

    'search.label': 'Search places',
    'search.placeholder': 'What do you want to do in Tumbes? E.g.: ceviche, beach, mangroves…',
    'search.filterCategory': 'Filter by category',
    'search.allCategories': 'All categories',
    'search.filterZone': 'Filter by zone',
    'search.allZones': 'All zones',
    'search.submit': 'Search',
    'search.popular': 'Popular searches:',
    'search.bySection': 'Search by section:',
    'search.emptyTitle': "We couldn't find results",
    'search.emptyBody':
      'Try other words, another category, or explore all zones.',
    'search.viewAllPlaces': 'View all places',

    'place.about': 'About this place',
    'place.howToGet': 'How to get there',
    'place.activities': 'Activities',
    'place.services': 'Services',
    'place.usefulInfo': 'Useful information',
    'place.address': 'Address',
    'place.phone': 'Phone',
    'place.website': 'Website',
    'place.location': 'Location',
    'place.viewMap': 'View on map',
    'place.source': 'Source',
    'place.updated': 'Last updated',
    'place.getDirections': 'Get directions',
    'place.shareWhatsApp': 'Share via WhatsApp',
    'place.verified': 'Verified information',
    'place.verifiedBadge': 'Verified',
    'place.seePlace': 'View place',
    'place.relatedEyebrow': 'Keep exploring',
    'place.relatedTitle': 'Other places in {zone} and {category}',
    'place.viewZone': 'View zone',

    // Share
    'share.label': 'Share',
    'share.whatsapp': 'Share on WhatsApp',
    'share.facebook': 'Share on Facebook',
    'share.x': 'Share on X',
    'share.linkedin': 'Share on LinkedIn',
    'share.copy': 'Copy link',
    'share.copied': 'Link copied',

    // Categories
    'categories.eyebrow': 'Explore',
    'categories.lead':
      'Browse the Tumbes directory by place type to find exactly what you are looking for.',
    'categories.inTumbes': 'in Tumbes',
    'categories.emptyTitle': 'No places in this category yet',
    'categories.emptyBody': 'We will add more information soon.',

    'zones.eyebrow': 'Explore',
    'zones.lead':
      'Choose your base: from the capital city to the beach resorts of the northern coast.',
    'zones.emptyTitle': 'No places registered in this zone yet',
    'zones.emptyBody': 'We will add more information soon.',
    'zones.imageAlt': 'Landscape of {zone}, Tumbes',

    'notFound.title': 'Page not found',
    'notFound.lead':
      'The link you followed does not exist or the content was moved. Go back home or explore the Tumbes place directory.',
    'notFound.goHome': 'Go home',
    'notFound.explorePlaces': 'Explore places',

    'footer.placesHeading': 'Places',
    'footer.viewAllPlaces': 'View all',
    'footer.placesType1': 'Tourist attractions',
    'footer.placesType2': 'Restaurants',
    'footer.placesType3': 'Hotels',
    'footer.exploreHeading': 'Explore',
    'footer.categories': 'Categories',
    'footer.zones': 'Zones',
    'footer.note': 'Tourist information for the Tumbes region.',
    'footer.verification': 'Content under verification — report data.',
    'footer.report': 'report data',

    // Visitor geolocation
    'geo.location': 'Visiting from',
    'geo.detecting': 'Detecting location…',
  },
  pt: {
    'nav.home': 'Início',
    'nav.places': 'Lugares',
    'nav.categories': 'Categorias',
    'nav.zones': 'Zonas',
    'nav.explore': 'Explorar',
    'nav.search': 'Buscar',
    'nav.searchLabel': 'Buscar no MiTumbes',
    'nav.searchPlaceholder': 'Buscar…',
    'nav.language': 'Idioma',
    'nav.menu': 'Abrir menu',

    'home.heroEyebrow': 'Costa norte do Peru',
    'home.heroTitle': 'Descubra Tumbes: praias, manguezais e sabor',
    'home.heroLead':
      'Encontre atrações turísticas, restaurantes, hotéis, atividades e eventos. Informações claras e verificadas para planejar sua visita à região.',
    'home.searchPlaceholder': 'O que você quer fazer? Ex.: praia, cebiche, manguezais…',
    'home.searchSubmit': 'Buscar',
    'home.categoriesEyebrow': 'Explore por categoria',
    'home.categoriesTitle': 'O que você procura hoje?',
    'home.featuredEyebrow': 'Recomendados',
    'home.featuredTitle': 'Lugares em destaque da região',
    'home.zonesEyebrow': 'Explore por zona',
    'home.zonesTitle': 'Escolha sua base no litoral norte',
    'home.viewAll': 'Ver todas',
    'home.viewZones': 'Ver zonas',

    'seo.homeTitle': 'MiTumbes — Guia turístico de Tumbes',
    'seo.homeDescription':
      'Guia turístico de Tumbes: atrações turísticas, restaurantes, hotéis, atividades, eventos e zonas no litoral norte do Peru.',
    'seo.placesTitle': 'Lugares em Tumbes',
    'seo.placesDescription':
      'Diretório de atrações turísticas, restaurantes, hotéis, atividades e eventos em Tumbes: praias, manguezais, balneários e mais.',
    'seo.categoriesTitle': 'Categorias de lugares em Tumbes',
    'seo.categoriesDescription':
      'Explore os lugares de Tumbes por categoria: atrações turísticas, restaurantes, hotéis, atividades, eventos e serviços.',
    'seo.zonesTitle': 'Zonas de Tumbes',
    'seo.zonesDescription':
      'Explore as zonas de Tumbes: a cidade, Zorritos, Punta Sal, Cancas, Bocapán e os manguezais de Puerto Pizarro.',
    'seo.notFoundTitle': 'Página não encontrada',
    'seo.notFoundDescription': 'A página que você procura não existe.',

    'count.places': 'lugares',
    'count.place': 'lugar',
    'count.in': 'em',

    'search.label': 'Buscar lugares',
    'search.placeholder': 'O que você quer fazer em Tumbes? Ex.: cebiche, praia, manguezais…',
    'search.filterCategory': 'Filtrar por categoria',
    'search.allCategories': 'Todas as categorias',
    'search.filterZone': 'Filtrar por zona',
    'search.allZones': 'Todas as zonas',
    'search.submit': 'Buscar',
    'search.popular': 'Buscas populares:',
    'search.bySection': 'Buscar por apartado:',
    'search.emptyTitle': 'Não encontramos resultados',
    'search.emptyBody':
      'Tente outras palavras, outra categoria ou explore todas as zonas.',
    'search.viewAllPlaces': 'Ver todos os lugares',

    'place.about': 'Sobre este lugar',
    'place.howToGet': 'Como chegar',
    'place.activities': 'Atividades',
    'place.services': 'Serviços',
    'place.usefulInfo': 'Informações úteis',
    'place.address': 'Endereço',
    'place.phone': 'Telefone',
    'place.website': 'Site',
    'place.location': 'Localização',
    'place.viewMap': 'Ver no mapa',
    'place.source': 'Fonte',
    'place.updated': 'Última atualização',
    'place.getDirections': 'Como chegar',
    'place.shareWhatsApp': 'Compartilhar no WhatsApp',
    'place.verified': 'Informações verificadas',
    'place.verifiedBadge': 'Verificado',
    'place.seePlace': 'Ver lugar',
    'place.relatedEyebrow': 'Continue explorando',
    'place.relatedTitle': 'Outros lugares em {zone} e {category}',
    'place.viewZone': 'Ver zona',

    // Compartilhar
    'share.label': 'Compartilhar',
    'share.whatsapp': 'Compartilhar no WhatsApp',
    'share.facebook': 'Compartilhar no Facebook',
    'share.x': 'Compartilhar no X',
    'share.linkedin': 'Compartilhar no LinkedIn',
    'share.copy': 'Copiar link',
    'share.copied': 'Link copiado',

    // Categorias
    'categories.eyebrow': 'Explorar',
    'categories.lead':
      'Navegue pelo diretório de Tumbes por tipo de lugar para encontrar exatamente o que procura.',
    'categories.inTumbes': 'em Tumbes',
    'categories.emptyTitle': 'Ainda não há lugares nesta categoria',
    'categories.emptyBody': 'Em breve adicionaremos mais informações.',

    'zones.eyebrow': 'Explorar',
    'zones.lead':
      'Escolha sua base: desde a cidade capital até os balneários e praias do litoral norte.',
    'zones.emptyTitle': 'Ainda não há lugares cadastrados nesta zona',
    'zones.emptyBody': 'Em breve adicionaremos mais informações.',
    'zones.imageAlt': 'Paisagem de {zone}, Tumbes',

    'notFound.title': 'Página não encontrada',
    'notFound.lead':
      'O link que você seguiu não existe ou o conteúdo foi movido. Volte ao início ou explore o diretório de lugares de Tumbes.',
    'notFound.goHome': 'Ir ao início',
    'notFound.explorePlaces': 'Explorar lugares',

    'footer.placesHeading': 'Lugares',
    'footer.viewAllPlaces': 'Ver todos',
    'footer.placesType1': 'Atrações turísticas',
    'footer.placesType2': 'Restaurantes',
    'footer.placesType3': 'Hotéis',
    'footer.exploreHeading': 'Explorar',
    'footer.categories': 'Categorias',
    'footer.zones': 'Zonas',
    'footer.note': 'Informações turísticas da região de Tumbes.',
    'footer.verification': 'Conteúdo em verificação — reportar dados.',
    'footer.report': 'reportar dados',

    // Geolocalização do visitante
    'geo.location': 'Visitando de',
    'geo.detecting': 'Detectando localização…',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];

/** Traducción simple: `t(lang, 'nav.home')`. */
export function t(lang: Locale, key: UIKey): string {
  return ui[lang][key];
}

/** Frase con plural: `plural(lang, 3, 'count.place', 'count.places')`. */
export function plural(
  lang: Locale,
  n: number,
  oneKey: UIKey,
  manyKey: UIKey,
): string {
  return `${n} ${t(lang, n === 1 ? oneKey : manyKey)}`;
}

/** Reemplaza marcadores {clave} en una traducción. */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? `{${k}}`);
}
