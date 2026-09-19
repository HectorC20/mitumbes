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
    'seo.partnersTitle': 'Partners de MiTumbes',
    'seo.partnersDescription':
      'Empresas y proyectos que colaboran con MiTumbes para promover el turismo en la región.',
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

    // Paginación del listado
    'pagination.label': 'Paginación de resultados',
    'pagination.previous': 'Anterior',
    'pagination.next': 'Siguiente',
    'pagination.goToPage': 'Ir a la página {page}',

    // Calendario de eventos
    'calendar.title': 'Filtrar por calendario',
    'calendar.month': 'Mes',
    'calendar.year': 'Año',
    'calendar.allMonths': 'Todos los meses',
    'calendar.apply': 'Filtrar',
    'calendar.clear': 'Quitar filtro',
    'events.emptyMonthTitle': 'No hay eventos en este mes',
    'events.emptyMonthBody': 'Prueba con otro mes del calendario o quita el filtro para ver todos los eventos.',
    'count.events': 'eventos',
    'count.event': 'evento',

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
    'place.relatedTitleZone': 'Recomendados en {zone} y alrededores',
    'place.relatedTitleGeneral': 'Más lugares y experiencias en Tumbes',
    'place.viewZone': 'Ver zona',
    'place.viewMoreRelated': 'Ver más lugares',

    // Tarjetas de contenido
    'card.verifiedPlace': 'lugar verificado',
    'card.verifiedPlaces': 'lugares verificados',
    'card.explore': 'Explorar',
    'card.place': 'lugar',
    'card.places': 'lugares',
    'card.exploreDestination': 'Explorar destino',
    'card.exploreEvent': 'Explorar evento',

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

    // Partners
    'partners.eyebrow': 'Colaboramos con',
    'partners.lead':
      'Empresas y proyectos que acompañan a MiTumbes y aportan herramientas y servicios para la guía turística de la región.',
    'partners.visit': 'Visitar sitio',
    'partners.viewAll': 'Ver todos',
    'partners.imageAlt': 'Logo de {partner}',

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
    'footer.partners': 'Partners',
    'footer.note':
      'Información turística de la región Tumbes.',
    'footer.verification': '',
    'footer.report': 'reportar datos',
    'footer.legal': 'Aviso Legal',
    'footer.privacy': 'Política de Privacidad',
    'footer.ethics': 'Código de Ética',
    'footer.legalHeading': 'Información legal y ética',

    // Apartados Legales e Institucionales
    'legal.eyebrow': 'Marco Institucional',
    'legal.title': 'Aviso Legal',
    'legal.lead':
      'Términos y condiciones generales de uso, titularidad de la plataforma y régimen de responsabilidad de MiTumbes.',
    'legal.updated': 'Última actualización: Septiembre 2026',

    'privacy.eyebrow': 'Protección de Datos',
    'privacy.title': 'Política de Privacidad',
    'privacy.lead':
      'Tratamiento y resguardo de datos personales de acuerdo con la Ley N° 29733 de la República del Perú.',
    'privacy.updated': 'Última actualización: Septiembre 2026',

    'ethics.eyebrow': 'Sostenibilidad y Transparencia',
    'ethics.title': 'Código de Ética',
    'ethics.lead':
      'Nuestros principios de conservación ambiental, turismo responsable, comercio justo y cero tolerancia a la explotación.',
    'ethics.updated': 'Última actualización: Septiembre 2026',

    'seo.legalTitle': 'Aviso Legal — MiTumbes',
    'seo.legalDescription':
      'Condiciones de uso, titularidad del sitio y marco legal de la plataforma turística MiTumbes.',
    'seo.privacyTitle': 'Política de Privacidad — MiTumbes',
    'seo.privacyDescription':
      'Política de protección de datos personales y privacidad de MiTumbes conforme a la Ley N° 29733.',
    'seo.ethicsTitle': 'Código de Ética y Sostenibilidad — MiTumbes',
    'seo.ethicsDescription':
      'Código de ética, compromiso de conservación y turismo sostenible en la región Tumbes.',

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
    'seo.partnersTitle': 'MiTumbes partners',
    'seo.partnersDescription':
      'Companies and projects collaborating with MiTumbes to promote tourism in the region.',
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

    'pagination.label': 'Results pagination',
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    'pagination.goToPage': 'Go to page {page}',

    // Events calendar
    'calendar.title': 'Filter by calendar',
    'calendar.month': 'Month',
    'calendar.year': 'Year',
    'calendar.allMonths': 'All months',
    'calendar.apply': 'Filter',
    'calendar.clear': 'Clear filter',
    'events.emptyMonthTitle': 'No events this month',
    'events.emptyMonthBody': 'Try another month or clear the filter to see all events.',
    'count.events': 'events',
    'count.event': 'event',

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
    'place.relatedTitleZone': 'Recommended in {zone} and nearby',
    'place.relatedTitleGeneral': 'More places and experiences in Tumbes',
    'place.viewZone': 'View zone',
    'place.viewMoreRelated': 'View more places',

    // Content cards
    'card.verifiedPlace': 'verified place',
    'card.verifiedPlaces': 'verified places',
    'card.explore': 'Explore',
    'card.place': 'place',
    'card.places': 'places',
    'card.exploreDestination': 'Explore destination',
    'card.exploreEvent': 'Explore event',

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

    // Partners
    'partners.eyebrow': 'We collaborate with',
    'partners.lead':
      'Companies and projects supporting MiTumbes with tools and services for the travel guide of the region.',
    'partners.visit': 'Visit website',
    'partners.viewAll': 'View all',
    'partners.imageAlt': '{partner} logo',

    // 404
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
    'footer.partners': 'Partners',
    'footer.note': 'Tourist information for the Tumbes region.',
    'footer.verification': 'Content under verification — report data.',
    'footer.report': 'report data',
    'footer.legal': 'Legal Notice',
    'footer.privacy': 'Privacy',
    'footer.ethics': 'Code of Ethics',
    'footer.legalHeading': 'Legal & Ethics Information',

    // Legal & Institutional
    'legal.eyebrow': 'Institutional Framework',
    'legal.title': 'Legal Notice',
    'legal.lead':
      'General terms and conditions of use, platform ownership, and disclaimer of liability for MiTumbes.',
    'legal.updated': 'Last updated: September 2026',

    'privacy.eyebrow': 'Data Protection',
    'privacy.title': 'Privacy Policy',
    'privacy.lead':
      'Processing and safeguarding of personal data in compliance with Law No. 29733 of Peru.',
    'privacy.updated': 'Last updated: September 2026',

    'ethics.eyebrow': 'Sustainability & Transparency',
    'ethics.title': 'Code of Ethics',
    'ethics.lead':
      'Our principles of environmental conservation, responsible tourism, fair trade, and zero tolerance for exploitation.',
    'ethics.updated': 'Last updated: September 2026',

    'seo.legalTitle': 'Legal Notice — MiTumbes',
    'seo.legalDescription':
      'Terms of use, platform ownership, and legal framework of MiTumbes travel guide.',
    'seo.privacyTitle': 'Privacy Policy — MiTumbes',
    'seo.privacyDescription':
      'Personal data protection policy of MiTumbes in compliance with Law No. 29733.',
    'seo.ethicsTitle': 'Code of Ethics & Sustainability — MiTumbes',
    'seo.ethicsDescription':
      'Code of ethics, conservation commitments, and sustainable tourism in Tumbes region.',

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
    'seo.partnersTitle': 'Parceiros do MiTumbes',
    'seo.partnersDescription':
      'Empresas e projetos que colaboram com o MiTumbes para promover o turismo na região.',
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

    'pagination.label': 'Paginação de resultados',
    'pagination.previous': 'Anterior',
    'pagination.next': 'Próxima',
    'pagination.goToPage': 'Ir para a página {page}',

    // Calendário de eventos
    'calendar.title': 'Filtrar por calendário',
    'calendar.month': 'Mês',
    'calendar.year': 'Ano',
    'calendar.allMonths': 'Todos os meses',
    'calendar.apply': 'Filtrar',
    'calendar.clear': 'Limpar filtro',
    'events.emptyMonthTitle': 'Não há eventos neste mês',
    'events.emptyMonthBody': 'Tente outro mês ou limpe o filtro para ver todos os eventos.',
    'count.events': 'eventos',
    'count.event': 'evento',

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
    'place.relatedTitleZone': 'Recomendados em {zone} e arredores',
    'place.relatedTitleGeneral': 'Mais lugares e experiências em Tumbes',
    'place.viewZone': 'Ver zona',
    'place.viewMoreRelated': 'Ver mais lugares',

    // Cartões de conteúdo
    'card.verifiedPlace': 'lugar verificado',
    'card.verifiedPlaces': 'lugares verificados',
    'card.explore': 'Explorar',
    'card.place': 'lugar',
    'card.places': 'lugares',
    'card.exploreDestination': 'Explorar destino',
    'card.exploreEvent': 'Explorar evento',

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

    // Partners
    'partners.eyebrow': 'Colaboramos com',
    'partners.lead':
      'Empresas e projetos que acompanham o MiTumbes e contribuem com ferramentas e serviços para o guia turístico da região.',
    'partners.visit': 'Visitar site',
    'partners.viewAll': 'Ver todos',
    'partners.imageAlt': 'Logo de {partner}',

    // 404
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
    'footer.partners': 'Parceiros',
    'footer.note': 'Informações turísticas da região de Tumbes.',
    'footer.verification': 'Conteúdo em verificação — reportar dados.',
    'footer.report': 'reportar dados',
    'footer.legal': 'Aviso Legal',
    'footer.privacy': 'Privacidade',
    'footer.ethics': 'Código de Ética',
    'footer.legalHeading': 'Informações legais e éticas',

    // Apartados Legais e Institucionais
    'legal.eyebrow': 'Estrutura Institucional',
    'legal.title': 'Aviso Legal',
    'legal.lead':
      'Termos e condições gerais de uso, titularidade da plataforma e regime de responsabilidade do MiTumbes.',
    'legal.updated': 'Última atualização: Setembro de 2026',

    'privacy.eyebrow': 'Proteção de Dados',
    'privacy.title': 'Política de Privacidade',
    'privacy.lead':
      'Tratamento e proteção de dados pessoais em conformidade com a Lei nº 29733 da República do Peru.',
    'privacy.updated': 'Última atualização: Setembro de 2026',

    'ethics.eyebrow': 'Sustentabilidade e Transparência',
    'ethics.title': 'Código de Ética',
    'ethics.lead':
      'Nossos princípios de conservação ambiental, turismo responsável, comércio justo e tolerância zero à exploração.',
    'ethics.updated': 'Última atualização: Setembro de 2026',

    'seo.legalTitle': 'Aviso Legal — MiTumbes',
    'seo.legalDescription':
      'Termos de uso, titularidade e marco legal do guia turístico MiTumbes.',
    'seo.privacyTitle': 'Política de Privacidade — MiTumbes',
    'seo.privacyDescription':
      'Política de proteção de dados pessoais do MiTumbes em conformidade com a Lei nº 29733.',
    'seo.ethicsTitle': 'Código de Ética e Sustentabilidade — MiTumbes',
    'seo.ethicsDescription':
      'Código de ética, compromisso de conservação e turismo sustentável na região de Tumbes.',

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
