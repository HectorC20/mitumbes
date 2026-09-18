import type { Locale } from '../constants/locales';

/**
 * Contenido textual de la guía de Tumbes que se muestra al final del home,
 * antes de la sección de Partners.
 *
 * Es texto estable (no depende del backend) y existe en los tres idiomas:
 * sirve para dar contexto real a la página de inicio, mejorar el
 * posicionamiento por búsquedas informativas ("qué hacer en Tumbes",
 * "cuándo viajar a Tumbes") y ofrecer material citables a buscadores y LLMs.
 */
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
  /** Apartados temáticos de la guía. */
  sections: GuiaApartado[];
}

export const HOME_GUIDE: Record<Locale, GuiaHome> = {
  es: {
    eyebrow: 'Guía de viaje',
    title: 'Guía de Tumbes: qué ver, cuándo viajar y cómo moverte',
    intro: [
      'Tumbes es el departamento más septentrional del Perú: una franja de costa cálida que limita con Ecuador y reúne playas de arena clara, manglares, bosques secos y uno de los ecosistemas marinos más ricos del país. A diferencia de buena parte del litoral peruano, aquí el mar se mantiene templado durante gran parte del año y el sol acompaña casi todas las estaciones, lo que convierte a la región en un destino cómodo para visitar en cualquier mes.',
      'Esta guía resume lo esencial para organizar un viaje a Tumbes: cuándo ir, cómo llegar, qué playas y áreas naturales merecen la pena, qué se come y qué conviene tener en cuenta antes de salir. Cada apartado se complementa con fichas verificadas de lugares, restaurantes, hoteles, actividades y eventos publicadas en el sitio.',
    ],
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
    eyebrow: 'Travel guide',
    title: 'Tumbes travel guide: what to see, when to go and how to get around',
    intro: [
      'Tumbes is the northernmost department of Peru: a strip of warm coastline that borders Ecuador and brings together white-sand beaches, mangroves, dry forests and one of the richest marine ecosystems in the country. Unlike much of the Peruvian coast, the sea stays warm for most of the year and the sun is out in almost every season, which makes the region an easy destination to visit at any time.',
      'This guide covers what you need to plan a trip to Tumbes: when to go, how to get there, which beaches and natural areas are worth your time, what to eat and what to keep in mind before you set off. Each section is complemented by verified listings for places, restaurants, hotels, activities and events published on the site.',
    ],
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
    eyebrow: 'Guia de viagem',
    title: 'Guia de Tumbes: o que ver, quando viajar e como se locomover',
    intro: [
      'Tumbes é o departamento mais ao norte do Peru: uma faixa de litoral quente que faz fronteira com o Equador e reúne praias de areia clara, manguezais, florestas secas e um dos ecossistemas marinhos mais ricos do país. Ao contrário de boa parte do litoral peruano, aqui o mar se mantém morno durante grande parte do ano e o sol aparece em quase todas as estações, o que faz da região um destino fácil de visitar em qualquer mês.',
      'Este guia reúne o essencial para planejar uma viagem a Tumbes: quando ir, como chegar, quais praias e áreas naturais valem a pena, o que comer e o que considerar antes de partir. Cada seção se complementa com fichas verificadas de lugares, restaurantes, hotéis, atividades e eventos publicados no site.',
    ],
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
