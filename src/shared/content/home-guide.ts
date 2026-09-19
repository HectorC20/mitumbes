import type { Locale } from '../constants/locales';

/**
 * Contenido textual y estructurado de la guía de Tumbes que se muestra en el home.
 *
 * Es texto estable (no depende del backend) y existe en los tres idiomas:
 * sirve para dar contexto real a la página de inicio, mejorar el
 * posicionamiento por búsquedas informativas ("qué hacer en Tumbes",
 * "cuándo viajar a Tumbes") y ofrecer material citable a buscadores y LLMs.
 */
export interface GuiaNavItem {
  id: string;
  label: string;
  icon: string;
}

export interface GuiaPasoRuta {
  step: number;
  badge: string;
  dayLabel: string;
  title: string;
  description: string;
  duration: string;
  tag: string;
  image: string;
}

export interface GuiaItinerario {
  eyebrow: string;
  title: string;
  description: string;
  steps: GuiaPasoRuta[];
}

export interface GuiaTemporada {
  title: string;
  desc: string;
  icon: string;
}

export interface GuiaClima {
  title: string;
  intro: string;
  highlight: string;
  seasons: GuiaTemporada[];
}

export interface GuiaTransporte {
  title: string;
  intro: string;
  alert: string;
}

export interface GuiaPlayaFicha {
  name: string;
  desc: string;
}

export interface GuiaPlayas {
  title: string;
  paragraphs: string[];
  cards: GuiaPlayaFicha[];
}

export interface GuiaManglares {
  title: string;
  paragraphs: string[];
  badges: string[];
}

export interface GuiaGastronomia {
  title: string;
  paragraph: string;
  recommendation: string;
}

export interface GuiaFiestas {
  title: string;
  paragraphs: string[];
}

export interface GuiaConsejosItem {
  icon: string;
  text: string;
}

export interface GuiaConsejos {
  title: string;
  intro: string;
  items: GuiaConsejosItem[];
  ctaText: string;
}

export interface GuiaVerificados {
  title: string;
  items: string[];
}

export interface GuiaApartado {
  /** Título del apartado. */
  title: string;
  /** Párrafos del apartado. */
  paragraphs: string[];
}

export interface GuiaHome {
  /** Antetítulo de la sección. */
  eyebrow: string;
  /** Título de la sección. */
  title: string;
  /** Párrafos de introducción. */
  intro: string[];
  /** Barra de navegación rápida */
  navItems: GuiaNavItem[];
  /** Itinerario cronológico paso a paso */
  itinerary: GuiaItinerario;
  /** Sección Clima */
  clima: GuiaClima;
  /** Sección Transporte */
  transporte: GuiaTransporte;
  /** Sección Playas */
  playas: GuiaPlayas;
  /** Sección Manglares & Fauna */
  manglares: GuiaManglares;
  /** Sección Qué comer */
  gastronomia: GuiaGastronomia;
  /** Sección Fiestas y eventos */
  fiestas: GuiaFiestas;
  /** Barra lateral de Consejos prácticos */
  consejos: GuiaConsejos;
  /** Barra lateral de Fichas verificadas */
  verificados: GuiaVerificados;
  /** Apartados temáticos clásicos (retrocompatibilidad) */
  sections: GuiaApartado[];
}

export const HOME_GUIDE: Record<Locale, GuiaHome> = {
  es: {
    eyebrow: 'Guía de viaje oficial',
    title: 'Guía de Tumbes: qué ver, cuándo viajar y cómo moverte',
    intro: [
      'Tumbes concentra el litoral más cálido del Perú, con aguas que promedian los 24 °C a 26 °C y acceso directo a manglares y bosque seco tropical. Esta guía reúne la logística real para viajar por la región: traslados desde el aeropuerto y terminales, evaluación de playas (desde Punta Sal y Zorritos hasta Puerto Pizarro), costos de referencia y fichas de servicios verificadas localmente.',
    ],
    navItems: [
      { id: 'tumbes-clima', label: 'Cuándo viajar', icon: 'calendar' },
      { id: 'tumbes-transporte', label: 'Cómo moverse', icon: 'airplane' },
      { id: 'tumbes-paso-a-paso', label: 'Ruta Paso a Paso', icon: 'footprints' },
      { id: 'tumbes-playas', label: 'Playas', icon: 'umbrella' },
      { id: 'tumbes-manglares', label: 'Manglares & Fauna', icon: 'tree' },
      { id: 'tumbes-gastronomia', label: 'Qué comer', icon: 'utensils' },
      { id: 'tumbes-fiestas', label: 'Fiestas', icon: 'party' },
      { id: 'tumbes-consejos', label: 'Consejos', icon: 'check' },
    ],
    itinerary: {
      eyebrow: 'Ruta recomendada con imágenes paso a paso',
      title: 'Tu Ruta Ideal por Tumbes: 4 Pasos Clave',
      description: 'Sigue este recorrido cronológico estructurado paso a paso para no perderte nada del norte tumbesino.',
      steps: [
        {
          step: 1,
          badge: 'PASO 1',
          dayLabel: 'Día 1: Bienvenida al trópico',
          title: 'Llegada & Zorritos',
          description: 'Arribo al aeropuerto Pedro Canga Rodríguez en Tumbes. Toma un taxi o colectivo directo al sur por la Panamericana hacia Zorritos (30 min). Almuerza pescado del día frente al mar, descansa en la amplia orilla y presencia tu primer atardecer dorado con coco helado.',
          duration: 'Medio día / Tarde',
          tag: 'Aeropuerto + Playa',
          image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        },
        {
          step: 2,
          badge: 'PASO 2',
          dayLabel: 'Día 2: Laberintos de Mangle',
          title: 'Manglares y Puerto Pizarro',
          description: 'Dirígete temprano al muelle de Puerto Pizarro. Embarca en una lancha por los canales del Santuario Nacional: visita la Isla de los Pájaros, el zoocriadero de cocodrilo de Tumbes y concluye probando un ceviche auténtico de conchas negras recién extraídas.',
          duration: 'Mañana (4-5 horas)',
          tag: 'Santuario Natural',
          image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
        },
        {
          step: 3,
          badge: 'PASO 3',
          dayLabel: 'Día 3: Aguas mansas y olas',
          title: 'Punta Sal & Cancas',
          description: 'Trasládate al sur hacia Punta Sal para nadar en su mar calmo y tibio de arena clara. Continúa hacia Cancas y Bocapán para observar a los surfistas o degustar langostinos al ajillo en restaurantes playeros rústicos.',
          duration: 'Día completo',
          tag: 'Mar & Deportes',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        },
        {
          step: 4,
          badge: 'PASO 4',
          dayLabel: 'Día 4: Bosque seco o Frontera',
          title: 'Amotape, Fauna & Frontera',
          description: 'Concluye con un tour hacia el Parque Nacional Cerros de Amotape para observar aves del bosque seco ecuatorial. Si viajas entre julio y octubre, reserva la mañana para el avistamiento de ballenas jorobadas mar adentro.',
          duration: 'Día de despedida',
          tag: 'Ecoturismo',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    clima: {
      title: 'Cuándo viajar a Tumbes',
      intro: 'El clima de Tumbes es cálido y tropical, con temperaturas que rara vez bajan de los 20 °C. De diciembre a abril el cielo está más despejado, el agua alcanza su temperatura más agradable y se concentra la temporada alta, especialmente entre enero y marzo, cuando también aparecen las lluvias más intensas de la costa.',
      highlight: 'De mayo a noviembre el panorama cambia: hay más nubosidad y viento, el mar se refresca y el ambiente resulta ideal para caminar, practicar deportes acuáticos o avistar ballenas jorobadas, que se acercan a la costa entre julio y octubre. En esos meses los precios de alojamiento suelen ser más bajos.',
      seasons: [
        {
          title: 'Temporada Alta (Dic - Abr)',
          desc: 'Agua cálida (26°-28°C), sol radiante, ambiente festivo. Lluvias tropicales pasajeras en verano.',
          icon: 'sun',
        },
        {
          title: 'Temporada de Ballenas (Jul - Oct)',
          desc: 'Vientos frescos, tarifas económicas, avistamiento activo de ballenas jorobadas y aves.',
          icon: 'waves',
        },
      ],
    },
    transporte: {
      title: 'Cómo llegar y cómo moverte',
      intro: 'El aeropuerto Capitán FAP Pedro Canga Rodríguez recibe vuelos desde Lima en poco más de una hora y media. Por tierra, la Panamericana Norte conecta Tumbes con Piura y con el resto del país; para llegar desde Ecuador el paso habitual es el Puente Internacional de Aguas Verdes, frente a Huaquillas.',
      alert: 'Dentro de la región, los taxis y los colectivos cubren los trayectos cortos: la ciudad de Tumbes, Puerto Pizarro, Zorritos, Punta Sal y Cancas están bien conectados por la carretera costera. Conviene acordar la tarifa antes de subir y reservar transporte para los trayectos nocturnos.',
    },
    playas: {
      title: 'Playas: de Zorritos a Cancas',
      paragraphs: [
        'Zorritos es la playa más cercana a la ciudad y funciona bien para escapadas cortas: arena amplia, restaurantes y una oferta variada de alojamiento. Más al sur, Punta Sal combina una caleta tranquila con hoteles y resorts, y es una de las zonas preferidas para nadar, bucear y descansar.',
        'Cancas y Bocapán, ya hacia el límite con Piura, ofrecen un ambiente más tranquilo y oleaje apreciado por quienes practican surf. En casi todas las playas conviene revisar el estado del mar y las banderas de seguridad antes de meterse al agua, sobre todo fuera de temporada.',
      ],
      cards: [
        { name: 'Zorritos', desc: 'Cercana, extensa, restaurantes y ambiente local acogedor.' },
        { name: 'Punta Sal', desc: 'Caleta calma, resorts de primer nivel y aguas mansas todo el año.' },
        { name: 'Cancas y Bocapán', desc: 'Oleaje apreciado para surf y serenidad frente al horizonte.' },
      ],
    },
    manglares: {
      title: 'Manglares, reservas y fauna',
      paragraphs: [
        'El Santuario Nacional Los Manglares de Tumbes es el único santuario de manglares del Perú y el principal atractivo natural de la región. Puerto Pizarro es la puerta de entrada: desde su muelle salen paseos en lancha por los canales, con paradas en la isla de los pájaros y en los criaderos de cocodrilo de Tumbes.',
        'Tierra adentro, el Parque Nacional Cerros de Amotape y la Reserva Nacional de Tumbes protegen bosque seco ecuatorial y son buenos puntos para la observación de aves. En el mar, entre julio y octubre es posible avistar ballenas jorobadas y tortugas marinas.',
      ],
      badges: ['Santuario Manglares', 'Puerto Pizarro', 'Cerros de Amotape', 'Ballenas jorobadas'],
    },
    gastronomia: {
      title: 'Qué comer: ceviche, conchas negras y langostinos',
      paragraph: 'La cocina tumbesina gira alrededor del pescado y los mariscos. El ceviche de conchas negras es el plato más característico, junto con el cangrejo rojo del manglar, los langostinos de Puerto Pizarro y el arroz con mariscos. Los sudados y los pescados fritos también aparecen en casi todas las cartas.',
      recommendation: 'Los mejores lugares para probarlos están en Puerto Pizarro, Zorritos y la propia ciudad de Tumbes; en temporada alta conviene llegar temprano o reservar, porque los locales se llenan al mediodía. Acompañar la comida con una chicha morada o un refresco de coco es parte del plan.',
    },
    fiestas: {
      title: 'Fiestas y eventos',
      paragraphs: [
        'El calendario tumbesino mezcla celebraciones religiosas y fechas cívicas. La Semana Santa y las fiestas patronales, como la Virgen del Perpetuo Socorro o el Señor de Chocán, movilizan a buena parte de la población, y en julio se conmemora el aniversario de la Batalla de Zarumilla.',
        'A lo largo del año también se organizan la Semana Turística de Tumbes, el Festival del Cebiche y ferias gastronómicas en los distintos distritos. Consultar la agenda antes de viajar ayuda a ajustar el itinerario y a reservar alojamiento con antelación.',
      ],
    },
    consejos: {
      title: 'Consejos prácticos',
      intro: 'Llevar efectivo es útil en balnearios y mercados pequeños, donde no siempre hay terminal para tarjeta. Protector solar, repelente, gorra y ropa ligera son básicos, y si se cruza a Ecuador hay que revisar la documentación exigida y los horarios del paso fronterizo.',
      items: [
        { icon: 'wallet', text: 'Llevar efectivo físico (en soles) para caletas, lanchas y puestos de artesanía.' },
        { icon: 'sun', text: 'Protector solar resistente al agua, gorra, lentes y repelente biodegradable.' },
        { icon: 'footprints', text: 'Calzado que pueda mojarse para desembarque en manglares o playas rocosas.' },
        { icon: 'shield-check', text: 'DNI o Pasaporte vigente al cruzar el paso Aguas Verdes hacia Ecuador.' },
        { icon: 'calendar', text: 'En temporada alta conviene reservar alojamiento y transporte con semanas de anticipación.' },
      ],
      ctaText: 'Ver lugares y atractivos',
    },
    verificados: {
      title: 'Fichas Verificadas',
      items: [
        'Alojamientos inspeccionados en Punta Sal y Zorritos.',
        'Guías autorizados por SERNANP en el Santuario de Manglares.',
      ],
    },
    sections: [
      {
        title: 'Cuándo viajar a Tumbes',
        paragraphs: [
          'El clima de Tumbes es cálido y tropical, con temperaturas que rara vez bajan de los 20 °C. De diciembre a abril el cielo está más despejado, el agua alcanza su temperatura más agradable y se concentra la temporada alta, especialmente entre enero y marzo, cuando también aparecen las lluvias más intensas de la costa.',
          'De mayo a noviembre el panorama cambia: hay más nubosidad y viento, el mar se refresca y el ambiente resulta ideal para caminar, practicar deportes acuáticos o avistar ballenas jorobadas, que se acercan a la costa entre julio y octubre. En esos meses los precios de alojamiento suelen ser más bajos.',
        ],
      },
      {
        title: 'Cómo llegar y cómo moverte',
        paragraphs: [
          'El aeropuerto Capitán FAP Pedro Canga Rodríguez recibe vuelos desde Lima en poco más de una hora y media. Por tierra, la Panamericana Norte conecta Tumbes con Piura y con el resto del país; para llegar desde Ecuador el paso habitual es el Puente Internacional de Aguas Verdes, frente a Huaquillas.',
          'Dentro de la región, los taxis y los colectivos cubren los trayectos cortos: la ciudad de Tumbes, Puerto Pizarro, Zorritos, Punta Sal y Cancas están bien conectados por la carretera costera. Conviene acordar la tarifa antes de subir y reservar transporte para los trayectos nocturnos.',
        ],
      },
      {
        title: 'Playas: de Zorritos a Cancas',
        paragraphs: [
          'Zorritos es la playa más cercana a la ciudad y funciona bien para escapadas cortas: arena amplia, restaurantes y una oferta variada de alojamiento. Más al sur, Punta Sal combina una caleta tranquila con hoteles y resorts, y es una de las zonas preferidas para nadar, bucear y descansar.',
          'Cancas y Bocapán, ya hacia el límite con Piura, ofrecen un ambiente más tranquilo y oleaje apreciado por quienes practican surf. En casi todas las playas conviene revisar el estado del mar y las banderas de seguridad antes de meterse al agua, sobre todo fuera de temporada.',
        ],
      },
      {
        title: 'Manglares, reservas y fauna',
        paragraphs: [
          'El Santuario Nacional Los Manglares de Tumbes es el único santuario de manglares del Perú y el principal atractivo natural de la región. Puerto Pizarro es la puerta de entrada: desde su muelle salen paseos en lancha por los canales, con paradas en la isla de los pájaros y en los criaderos de cocodrilo de Tumbes.',
          'Tierra adentro, el Parque Nacional Cerros de Amotape y la Reserva Nacional de Tumbes protegen bosque seco ecuatorial y son buenos puntos para la observación de aves. En el mar, entre julio y octubre es posible avistar ballenas jorobadas y tortugas marinas.',
        ],
      },
      {
        title: 'Qué comer: ceviche, conchas negras y langostinos',
        paragraphs: [
          'La cocina tumbesina gira alrededor del pescado y los mariscos. El ceviche de conchas negras es el plato más característico, junto con el cangrejo rojo del manglar, los langostinos de Puerto Pizarro y el arroz con mariscos. Los sudados y los pescados fritos también aparecen en casi todas las cartas.',
          'Los mejores lugares para probarlos están en Puerto Pizarro, Zorritos y la propia ciudad de Tumbes; en temporada alta conviene llegar temprano o reservar, porque los locales se llenan al mediodía. Acompañar la comida con una chicha morada o un refresco de coco es parte del plan.',
        ],
      },
      {
        title: 'Fiestas y eventos',
        paragraphs: [
          'El calendario tumbesino mezcla celebraciones religiosas y fechas cívicas. La Semana Santa y las fiestas patronales, como la Virgen del Perpetuo Socorro o el Señor de Chocán, movilizan a buena parte de la población, y en julio se conmemora el aniversario de la Batalla de Zarumilla.',
          'A lo largo del año también se organizan la Semana Turística de Tumbes, el Festival del Cebiche y ferias gastronómicas en los distintos distritos. Consultar la agenda antes de viajar ayuda a ajustar el itinerario y a reservar alojamiento con antelación.',
        ],
      },
      {
        title: 'Consejos prácticos',
        paragraphs: [
          'Llevar efectivo es útil en balnearios y mercados pequeños, donde no siempre hay terminal para tarjeta. Protector solar, repelente, gorra y ropa ligera son básicos, y si se cruza a Ecuador hay que revisar la documentación exigida y los horarios del paso fronterizo.',
          'En temporada alta conviene reservar alojamiento y transporte con semanas de anticipación. Si el plan incluye los manglares o paseos en lancha, es mejor consultar las condiciones del día en el muelle y llevar calzado que pueda mojarse.',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Official travel guide',
    title: 'Tumbes travel guide: what to see, when to go and how to get around',
    intro: [
      'Tumbes is the northernmost department of Peru: a strip of warm coastline that borders Ecuador and brings together white-sand beaches, mangroves, dry forests and one of the richest marine ecosystems in the country. Unlike much of the Peruvian coast, the sea stays warm for most of the year and the sun is out in almost every season, which makes the region an easy destination to visit at any time.',
      'This guide covers what you need to plan a trip to Tumbes: when to go, how to get there, which beaches and natural areas are worth your time, what to eat and what to keep in mind before you set off. Each section is complemented by verified listings for places, restaurants, hotels, activities and events published on the site.',
    ],
    navItems: [
      { id: 'tumbes-clima', label: 'When to travel', icon: 'calendar' },
      { id: 'tumbes-transporte', label: 'How to get around', icon: 'airplane' },
      { id: 'tumbes-paso-a-paso', label: 'Step-by-step Route', icon: 'footprints' },
      { id: 'tumbes-playas', label: 'Beaches', icon: 'umbrella' },
      { id: 'tumbes-manglares', label: 'Mangroves & Wildlife', icon: 'tree' },
      { id: 'tumbes-gastronomia', label: 'What to eat', icon: 'utensils' },
      { id: 'tumbes-fiestas', label: 'Festivals', icon: 'party' },
      { id: 'tumbes-consejos', label: 'Tips', icon: 'check' },
    ],
    itinerary: {
      eyebrow: 'Recommended step-by-step route with photography',
      title: 'Your Ideal Route Through Tumbes: 4 Key Steps',
      description: 'Follow this structured chronological route step by step so you do not miss anything in the northern Peruvian coast.',
      steps: [
        {
          step: 1,
          badge: 'STEP 1',
          dayLabel: 'Day 1: Welcome to the tropics',
          title: 'Arrival & Zorritos',
          description: 'Arrival at Pedro Canga Rodríguez airport in Tumbes. Take a taxi or shuttle south on the Pan-American Highway to Zorritos (30 min). Enjoy fresh catch of the day by the sea, relax on the wide shore and watch your first golden sunset with chilled coconut water.',
          duration: 'Half day / Afternoon',
          tag: 'Airport + Beach',
          image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        },
        {
          step: 2,
          badge: 'STEP 2',
          dayLabel: 'Day 2: Mangrove Labyrinths',
          title: 'Mangroves & Puerto Pizarro',
          description: 'Head early to the Puerto Pizarro dock. Board a boat through the National Sanctuary channels: visit Bird Island, the Tumbes crocodile breeding center, and finish by tasting authentic ceviche made with freshly harvested black clams.',
          duration: 'Morning (4-5 hours)',
          tag: 'Natural Sanctuary',
          image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
        },
        {
          step: 3,
          badge: 'STEP 3',
          dayLabel: 'Day 3: Calm waters and surf',
          title: 'Punta Sal & Cancas',
          description: 'Travel south to Punta Sal to swim in its calm, warm turquoise water and light sand. Continue towards Cancas and Bocapán to watch local surfers or taste garlic prawns in rustic beachfront restaurants.',
          duration: 'Full day',
          tag: 'Ocean & Sports',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        },
        {
          step: 4,
          badge: 'STEP 4',
          dayLabel: 'Day 4: Dry forest or Border',
          title: 'Amotape, Wildlife & Border',
          description: 'Finish with an excursion to Cerros de Amotape National Park to spot equatorial dry forest birds. If traveling between July and October, reserve your morning for offshore humpback whale watching.',
          duration: 'Farewell day',
          tag: 'Ecotourism',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    clima: {
      title: 'When to travel to Tumbes',
      intro: 'The climate in Tumbes is hot and tropical, with temperatures that rarely drop below 20 °C. From December to April the sky is clearer, the water reaches its most pleasant temperature and high season sets in, especially between January and March, when the heaviest coastal rain also falls.',
      highlight: 'From May to November the picture changes: there is more cloud and wind, the sea cools down and conditions are ideal for walking, water sports or watching humpback whales, which come close to the coast between July and October. Accommodation prices tend to be lower during those months.',
      seasons: [
        {
          title: 'High Season (Dec - Apr)',
          desc: 'Warm water (26°-28°C), radiant sun, vibrant coastal atmosphere. Brief tropical rains in summer.',
          icon: 'sun',
        },
        {
          title: 'Whale Season (Jul - Oct)',
          desc: 'Cooler breeze, budget-friendly rates, active humpback whale watching tours and birdwatching.',
          icon: 'waves',
        },
      ],
    },
    transporte: {
      title: 'How to get there and how to get around',
      intro: 'Capitán FAP Pedro Canga Rodríguez airport receives flights from Lima in a little over an hour and a half. By land, the Panamericana Norte links Tumbes with Piura and the rest of the country; from Ecuador the usual crossing is the Aguas Verdes international bridge, opposite Huaquillas.',
      alert: 'Within the region, taxis and shared shuttles cover the short trips: Tumbes city, Puerto Pizarro, Zorritos, Punta Sal and Cancas are well connected by the coastal road. Agree on the fare before getting in and book transport for night trips.',
    },
    playas: {
      title: 'Beaches: from Zorritos to Cancas',
      paragraphs: [
        'Zorritos is the beach closest to the city and works well for short getaways: wide sand, restaurants and a broad range of accommodation. Further south, Punta Sal combines a quiet cove with hotels and resorts, and is one of the favourite areas for swimming, diving and relaxing.',
        'Cancas and Bocapán, closer to the border with Piura, offer a quieter atmosphere and waves appreciated by surfers. At nearly every beach it is worth checking the sea conditions and the safety flags before going in, especially outside high season.',
      ],
      cards: [
        { name: 'Zorritos', desc: 'Close to city, expansive sands, seafood restaurants and friendly local atmosphere.' },
        { name: 'Punta Sal', desc: 'Calm cove, top-tier beach resorts and gentle warm waters year-round.' },
        { name: 'Cancas & Bocapán', desc: 'Great waves for surfing and peace gazing at the open horizon.' },
      ],
    },
    manglares: {
      title: 'Mangroves, reserves and wildlife',
      paragraphs: [
        'The Los Manglares de Tumbes National Sanctuary is the only mangrove sanctuary in Peru and the main natural attraction in the region. Puerto Pizarro is the gateway: boat trips leave from its pier through the channels, with stops at the bird island and the Tumbes crocodile breeding centre.',
        'Inland, Cerros de Amotape National Park and Tumbes National Reserve protect equatorial dry forest and are good spots for birdwatching. At sea, humpback whales and sea turtles can be spotted between July and October.',
      ],
      badges: ['Mangrove Sanctuary', 'Puerto Pizarro', 'Cerros de Amotape', 'Humpback Whales'],
    },
    gastronomia: {
      title: 'What to eat: ceviche, black clams and prawns',
      paragraph: 'Tumbes cuisine revolves around fish and seafood. Ceviche made with black clams is the signature dish, alongside mangrove red crab, Puerto Pizarro prawns and rice with seafood. Stews and fried fish also appear on almost every menu.',
      recommendation: 'The best places to try them are Puerto Pizarro, Zorritos and Tumbes city itself; in high season it is worth arriving early or booking, because restaurants fill up at midday. Pairing the meal with chicha morada or a coconut drink is part of the plan.',
    },
    fiestas: {
      title: 'Festivals and events',
      paragraphs: [
        'The Tumbes calendar mixes religious celebrations and civic dates. Holy Week and patron saint festivals, such as the Virgen del Perpetuo Socorro or the Señor de Chocán, bring out much of the population, and in July the anniversary of the Battle of Zarumilla is commemorated.',
        'Throughout the year there are also Tumbes Tourist Week, the Ceviche Festival and food fairs in the different districts. Checking the agenda before travelling helps you adjust your itinerary and book accommodation in advance.',
      ],
    },
    consejos: {
      title: 'Practical tips',
      intro: 'Carrying cash is useful in small beach towns and markets, where card terminals are not always available. Sunscreen, insect repellent, a hat and light clothing are essentials, and if you cross into Ecuador you should check the required documents and the opening hours of the border crossing.',
      items: [
        { icon: 'wallet', text: 'Carry cash (in Peruvian soles) for small coves, boats and artisan stalls.' },
        { icon: 'sun', text: 'Water-resistant sunscreen, sunhat, sunglasses and biodegradable bug repellent.' },
        { icon: 'footprints', text: 'Water-friendly footwear for landing in mangroves or rocky shores.' },
        { icon: 'shield-check', text: 'Valid National ID or Passport when crossing Aguas Verdes border into Ecuador.' },
        { icon: 'calendar', text: 'During high season, book accommodation and transportation weeks in advance.' },
      ],
      ctaText: 'Explore Places & Attractions',
    },
    verificados: {
      title: 'Verified Listings',
      items: [
        'Inspected accommodations in Punta Sal and Zorritos.',
        'Official SERNANP certified guides in the Mangrove Sanctuary.',
      ],
    },
    sections: [
      {
        title: 'When to travel to Tumbes',
        paragraphs: [
          'The climate in Tumbes is hot and tropical, with temperatures that rarely drop below 20 °C. From December to April the sky is clearer, the water reaches its most pleasant temperature and high season sets in, especially between January and March, when the heaviest coastal rain also falls.',
          'From May to November the picture changes: there is more cloud and wind, the sea cools down and conditions are ideal for walking, water sports or watching humpback whales, which come close to the coast between July and October. Accommodation prices tend to be lower during those months.',
        ],
      },
      {
        title: 'How to get there and how to get around',
        paragraphs: [
          'Capitán FAP Pedro Canga Rodríguez airport receives flights from Lima in a little over an hour and a half. By land, the Panamericana Norte links Tumbes with Piura and the rest of the country; from Ecuador the usual crossing is the Aguas Verdes international bridge, opposite Huaquillas.',
          'Within the region, taxis and shared shuttles cover the short trips: Tumbes city, Puerto Pizarro, Zorritos, Punta Sal and Cancas are well connected by the coastal road. Agree on the fare before getting in and book transport for night trips.',
        ],
      },
      {
        title: 'Beaches: from Zorritos to Cancas',
        paragraphs: [
          'Zorritos is the beach closest to the city and works well for short getaways: wide sand, restaurants and a broad range of accommodation. Further south, Punta Sal combines a quiet cove with hotels and resorts, and is one of the favourite areas for swimming, diving and relaxing.',
          'Cancas and Bocapán, closer to the border with Piura, offer a quieter atmosphere and waves appreciated by surfers. At nearly every beach it is worth checking the sea conditions and the safety flags before going in, especially outside high season.',
        ],
      },
      {
        title: 'Mangroves, reserves and wildlife',
        paragraphs: [
          'The Los Manglares de Tumbes National Sanctuary is the only mangrove sanctuary in Peru and the main natural attraction in the region. Puerto Pizarro is the gateway: boat trips leave from its pier through the channels, with stops at the bird island and the Tumbes crocodile breeding centre.',
          'Inland, Cerros de Amotape National Park and Tumbes National Reserve protect equatorial dry forest and are good spots for birdwatching. At sea, humpback whales and sea turtles can be spotted between July and October.',
        ],
      },
      {
        title: 'What to eat: ceviche, black clams and prawns',
        paragraphs: [
          'Tumbes cuisine revolves around fish and seafood. Ceviche made with black clams is the signature dish, alongside mangrove red crab, Puerto Pizarro prawns and rice with seafood. Stews and fried fish also appear on almost every menu.',
          'The best places to try them are Puerto Pizarro, Zorritos and Tumbes city itself; in high season it is worth arriving early or booking, because restaurants fill up at midday. Pairing the meal with chicha morada or a coconut drink is part of the plan.',
        ],
      },
      {
        title: 'Festivals and events',
        paragraphs: [
          'The Tumbes calendar mixes religious celebrations and civic dates. Holy Week and patron saint festivals, such as the Virgen del Perpetuo Socorro or the Señor de Chocán, bring out much of the population, and in July the anniversary of the Battle of Zarumilla is commemorated.',
          'Throughout the year there are also Tumbes Tourist Week, the Ceviche Festival and food fairs in the different districts. Checking the agenda before travelling helps you adjust your itinerary and book accommodation in advance.',
        ],
      },
      {
        title: 'Practical tips',
        paragraphs: [
          'Carrying cash is useful in small beach towns and markets, where card terminals are not always available. Sunscreen, insect repellent, a hat and light clothing are essentials, and if you cross into Ecuador you should check the required documents and the opening hours of the border crossing.',
          'In high season, book accommodation and transport weeks ahead. If your plan includes the mangroves or boat trips, check the day conditions at the pier and wear footwear that can get wet.',
        ],
      },
    ],
  },
  pt: {
    eyebrow: 'Guia de viagem oficial',
    title: 'Guia de Tumbes: o que ver, quando viajar e como se locomover',
    intro: [
      'Tumbes é o departamento mais ao norte do Peru: uma faixa de litoral quente que faz fronteira com o Equador e reúne praias de areia clara, manguezais, florestas secas e um dos ecossistemas marinhos mais ricos do país. Ao contrário de boa parte do litoral peruano, aqui o mar se mantém morno durante grande parte do ano e o sol aparece em quase todas as estações, o que faz da região um destino fácil de visitar em qualquer mês.',
      'Este guia reúne o essencial para planejar uma viagem a Tumbes: quando ir, como chegar, quais praias e áreas naturais valem a pena, o que comer e o que considerar antes de partir. Cada seção se complementa com fichas verificadas de lugares, restaurantes, hotéis, atividades e eventos publicados no site.',
    ],
    navItems: [
      { id: 'tumbes-clima', label: 'Quando viajar', icon: 'calendar' },
      { id: 'tumbes-transporte', label: 'Como se locomover', icon: 'airplane' },
      { id: 'tumbes-paso-a-paso', label: 'Roteiro Passo a Passo', icon: 'footprints' },
      { id: 'tumbes-playas', label: 'Praias', icon: 'umbrella' },
      { id: 'tumbes-manglares', label: 'Manguezais & Fauna', icon: 'tree' },
      { id: 'tumbes-gastronomia', label: 'O que comer', icon: 'utensils' },
      { id: 'tumbes-fiestas', label: 'Festas', icon: 'party' },
      { id: 'tumbes-consejos', label: 'Dicas', icon: 'check' },
    ],
    itinerary: {
      eyebrow: 'Roteiro recomendado passo a passo com fotografia',
      title: 'Seu Roteiro Ideal por Tumbes: 4 Passos Principais',
      description: 'Siga este itinerário cronológico estruturado passo a passo para não perder nada do litoral norte de Tumbes.',
      steps: [
        {
          step: 1,
          badge: 'PASSO 1',
          dayLabel: 'Dia 1: Boas-vindas ao trópico',
          title: 'Chegada & Zorritos',
          description: 'Chegada ao aeroporto Pedro Canga Rodríguez em Tumbes. Pegue um táxi ou van rumo ao sul pela rodovia Panamericana até Zorritos (30 min). Almoce peixe fresco do dia à beira-mar, relaxe na extensa faixa de areia e aprecie o primeiro pôr do sol com água de coco gelada.',
          duration: 'Meio dia / Tarde',
          tag: 'Aeroporto + Praia',
          image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        },
        {
          step: 2,
          badge: 'PASSO 2',
          dayLabel: 'Dia 2: Labirintos de Manguezal',
          title: 'Manguezais & Puerto Pizarro',
          description: 'Vá cedo ao cais de Puerto Pizarro. Embarque de lancha pelos canais do Santuário Nacional: visite a Ilha dos Pássaros, o criadouro de crocodilos de Tumbes e termine provando o legítimo ceviche de conchas negras recém-coletadas.',
          duration: 'Manhã (4-5 horas)',
          tag: 'Santuário Natural',
          image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
        },
        {
          step: 3,
          badge: 'PASSO 3',
          dayLabel: 'Dia 3: Águas calmas e ondas',
          title: 'Punta Sal & Cancas',
          description: 'Siga para o sul em direção a Punta Sal para nadar em seu mar calmo, morno e de areia clara. Continue até Cancas e Bocapán para observar os surfistas ou saborear camarões ao alho e óleo em quiosques pé na areia.',
          duration: 'Dia inteiro',
          tag: 'Mar & Esportes',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        },
        {
          step: 4,
          badge: 'PASSO 4',
          dayLabel: 'Dia 4: Floresta seca ou Fronteira',
          title: 'Amotape, Fauna & Fronteira',
          description: 'Finalize com um passeio ao Parque Nacional Cerros de Amotape para observar aves da floresta seca equatorial. Se viajar entre julho e outubro, reserve a manhã para o avistamento de baleias-jubarte em alto-mar.',
          duration: 'Dia de despedida',
          tag: 'Ecoturismo',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    clima: {
      title: 'Quando viajar a Tumbes',
      intro: 'O clima de Tumbes é quente e tropical, com temperaturas que raramente ficam abaixo dos 20 °C. De dezembro a abril o céu fica mais limpo, a água alcança a temperatura mais agradável e começa a alta temporada, sobretudo entre janeiro e março, quando também caem as chuvas mais intensas do litoral.',
      highlight: 'De maio a novembro o cenário muda: há mais nuvens e vento, o mar esfria e o clima fica ideal para caminhar, praticar esportes aquáticos ou observar baleias-jubarte, que se aproximam da costa entre julho e outubro. Nesses meses os preços de hospedagem costumam ser mais baixos.',
      seasons: [
        {
          title: 'Alta Temporada (Dez - Abr)',
          desc: 'Água morna (26°-28°C), sol constante, clima vibrante. Chuvas tropicais rápidas no verão.',
          icon: 'sun',
        },
        {
          title: 'Época das Baleias (Jul - Out)',
          desc: 'Ventos frescos, diárias econômicas, avistamento garantido de baleias-jubarte e aves costeiras.',
          icon: 'waves',
        },
      ],
    },
    transporte: {
      title: 'Como chegar e como se locomover',
      intro: 'O aeroporto Capitán FAP Pedro Canga Rodríguez recebe voos de Lima em pouco mais de uma hora e meia. Por terra, a Panamericana Norte liga Tumbes a Piura e ao resto do país; para quem vem do Equador, a passagem habitual é a Ponte Internacional de Aguas Verdes, em frente a Huaquillas.',
      alert: 'Dentro da região, táxis e coletivos cobrem os trajetos curtos: a cidade de Tumbes, Puerto Pizarro, Zorritos, Punta Sal e Cancas estão bem conectadas pela estrada litorânea. Combine o valor antes de entrar e reserve transporte para os trajetos noturnos.',
    },
    playas: {
      title: 'Praias: de Zorritos a Cancas',
      paragraphs: [
        'Zorritos é a praia mais próxima da cidade e funciona bem para escapadas curtas: areia larga, restaurantes e uma oferta variada de hospedagem. Mais ao sul, Punta Sal combina uma enseada tranquila com hotéis e resorts, e é uma das áreas preferidas para nadar, mergulhar e descansar.',
        'Cancas e Bocapán, já perto do limite com Piura, oferecem um ambiente mais calmo e ondas apreciadas por quem pratica surfe. Em quase todas as praias vale conferir as condições do mar e as bandeiras de segurança antes de entrar na água, sobretudo fora da alta temporada.',
      ],
      cards: [
        { name: 'Zorritos', desc: 'Próxima, orla espaçosa, bons restaurantes e ambiente acolhedor.' },
        { name: 'Punta Sal', desc: 'Enseada mansa, resorts de alto padrão e mar quentinho o ano todo.' },
        { name: 'Cancas e Bocapán', desc: 'Boas ondas para surfe e tranquilidade diante do horizonte.' },
      ],
    },
    manglares: {
      title: 'Manguezais, reservas e fauna',
      paragraphs: [
        'O Santuário Nacional Los Manglares de Tumbes é o único santuário de manguezais do Peru e a principal atração natural da região. Puerto Pizarro é a porta de entrada: do seu cais saem passeios de barco pelos canais, com paradas na ilha dos pássaros e nos criadouros do crocodilo de Tumbes.',
        'Terra adentro, o Parque Nacional Cerros de Amotape e a Reserva Nacional de Tumbes protegem floresta seca equatorial e são bons pontos para observação de aves. No mar, entre julho e outubro é possível avistar baleias-jubarte e tartarugas marinhas.',
      ],
      badges: ['Santuário Manguezais', 'Puerto Pizarro', 'Cerros de Amotape', 'Baleias-jubarte'],
    },
    gastronomia: {
      title: 'O que comer: ceviche, conchas negras e camarões',
      paragraph: 'A cozinha de Tumbes gira em torno de peixes e frutos do mar. O ceviche de conchas negras é o prato mais característico, ao lado do caranguejo vermelho do manguezal, dos camarões de Puerto Pizarro e do arroz com frutos do mar. Ensopados e peixes fritos também aparecem em quase todos os cardápios.',
      recommendation: 'Os melhores lugares para provar estão em Puerto Pizarro, Zorritos e na própria cidade de Tumbes; na alta temporada vale chegar cedo ou reservar, porque os restaurantes ficam cheios ao meio-dia. Acompanhar a refeição com chicha morada ou um refresco de coco faz parte do programa.',
    },
    fiestas: {
      title: 'Festas e eventos',
      paragraphs: [
        'O calendário de Tumbes mistura celebrações religiosas e datas cívicas. A Semana Santa e as festas de padroeiros, como a Virgen del Perpetuo Socorro ou o Señor de Chocán, movimentam boa parte da população, e em julho se comemora o aniversário da Batalha de Zarumilla.',
        'Ao longo do ano também acontecem a Semana Turística de Tumbes, o Festival do Ceviche e feiras gastronômicas nos diferentes distritos. Consultar a agenda antes de viajar ajuda a ajustar o roteiro e a reservar hospedagem com antecedência.',
      ],
    },
    consejos: {
      title: 'Dicas práticas',
      intro: 'Levar dinheiro em espécie é útil em balneários e mercados pequenos, onde nem sempre há terminal para cartão. Protetor solar, repelente, boné e roupas leves são básicos, e quem cruza para o Equador deve conferir a documentação exigida e os horários da passagem de fronteira.',
      items: [
        { icon: 'wallet', text: 'Tenha dinheiro vivo em soles peruanos para pequenas vilas, barcos e artesanato.' },
        { icon: 'sun', text: 'Protetor solar resistente à água, chapéu, óculos e repelente biodegradável.' },
        { icon: 'footprints', text: 'Calçado próprio para molhar em desembarques de manguezais ou praias rochosas.' },
        { icon: 'shield-check', text: 'RG ou Passaporte válido ao cruzar a fronteira de Aguas Verdes com o Equador.' },
        { icon: 'calendar', text: 'Na alta temporada, reserve hospedagem e transporte com semanas de antecedência.' },
      ],
      ctaText: 'Ver lugares e atrações',
    },
    verificados: {
      title: 'Fichas Verificadas',
      items: [
        'Hospedagens inspecionadas em Punta Sal e Zorritos.',
        'Guias credenciados pelo SERNANP no Santuário de Manguezais.',
      ],
    },
    sections: [
      {
        title: 'Quando viajar a Tumbes',
        paragraphs: [
          'O clima de Tumbes é quente e tropical, com temperaturas que raramente ficam abaixo dos 20 °C. De dezembro a abril o céu fica mais limpo, a água alcança a temperatura mais agradável e começa a alta temporada, sobretudo entre janeiro e março, quando também caem as chuvas mais intensas do litoral.',
          'De maio a novembro o cenário muda: há mais nuvens e vento, o mar esfria e o clima fica ideal para caminhar, praticar esportes aquáticos ou observar baleias-jubarte, que se aproximam da costa entre julho e outubro. Nesses meses os preços de hospedagem costumam ser mais baixos.',
        ],
      },
      {
        title: 'Como chegar e como se locomover',
        paragraphs: [
          'O aeroporto Capitán FAP Pedro Canga Rodríguez recebe voos de Lima em pouco mais de uma hora e meia. Por terra, a Panamericana Norte liga Tumbes a Piura e ao resto do país; para quem vem do Equador, a passagem habitual é a Ponte Internacional de Aguas Verdes, em frente a Huaquillas.',
          'Dentro da região, táxis e coletivos cobrem os trajetos curtos: a cidade de Tumbes, Puerto Pizarro, Zorritos, Punta Sal e Cancas estão bem conectadas pela estrada litorânea. Combine o valor antes de entrar e reserve transporte para os trajetos noturnos.',
        ],
      },
      {
        title: 'Praias: de Zorritos a Cancas',
        paragraphs: [
          'Zorritos é a praia mais próxima da cidade e funciona bem para escapadas curtas: areia larga, restaurantes e uma oferta variada de hospedagem. Mais ao sul, Punta Sal combina uma enseada tranquila com hotéis e resorts, e é uma das áreas preferidas para nadar, mergulhar e descansar.',
          'Cancas e Bocapán, já perto do limite com Piura, oferecem um ambiente mais calmo e ondas apreciadas por quem pratica surfe. Em quase todas as praias vale conferir as condições do mar e as bandeiras de segurança antes de entrar na água, sobretudo fora da alta temporada.',
        ],
      },
      {
        title: 'Manguezais, reservas e fauna',
        paragraphs: [
          'O Santuário Nacional Los Manglares de Tumbes é o único santuário de manguezais do Peru e a principal atração natural da região. Puerto Pizarro é a porta de entrada: do seu cais saem passeios de barco pelos canais, com paradas na ilha dos pássaros e nos criadouros do crocodilo de Tumbes.',
          'Terra adentro, o Parque Nacional Cerros de Amotape e a Reserva Nacional de Tumbes protegem floresta seca equatorial e são bons pontos para observação de aves. No mar, entre julho e outubro é possível avistar baleias-jubarte e tartarugas marinhas.',
        ],
      },
      {
        title: 'O que comer: ceviche, conchas negras e camarões',
        paragraphs: [
          'A cozinha de Tumbes gira em torno de peixes e frutos do mar. O ceviche de conchas negras é o prato mais característico, ao lado do caranguejo vermelho do manguezal, dos camarões de Puerto Pizarro e do arroz com frutos do mar. Ensopados e peixes fritos também aparecem em quase todos os cardápios.',
          'Os melhores lugares para provar estão em Puerto Pizarro, Zorritos e na própria cidade de Tumbes; na alta temporada vale chegar cedo ou reservar, porque os restaurantes ficam cheios ao meio-dia. Acompanhar a refeição com chicha morada ou um refresco de coco faz parte do programa.',
        ],
      },
      {
        title: 'Festas e eventos',
        paragraphs: [
          'O calendário de Tumbes mistura celebrações religiosas e datas cívicas. A Semana Santa e as festas de padroeiros, como a Virgen del Perpetuo Socorro ou o Señor de Chocán, movimentam boa parte da população, e em julho se comemora o aniversário da Batalha de Zarumilla.',
          'Ao longo do ano também acontecem a Semana Turística de Tumbes, o Festival do Ceviche e feiras gastronômicas nos diferentes distritos. Consultar a agenda antes de viajar ajuda a ajustar o roteiro e a reservar hospedagem com antecedência.',
        ],
      },
      {
        title: 'Dicas práticas',
        paragraphs: [
          'Levar dinheiro em espécie é útil em balneários e mercados pequenos, onde nem sempre há terminal para cartão. Protetor solar, repelente, boné e roupas leves são básicos, e quem cruza para o Equador deve conferir a documentação exigida e os horários da passagem de fronteira.',
          'Na alta temporada, reserve hospedagem e transporte com semanas de antecedência. Se o plano inclui manguezais ou passeios de barco, confira as condições do dia no cais e use calçado que possa molhar.',
        ],
      },
    ],
  },
};
