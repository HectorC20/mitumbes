import type { Locale } from '@/shared/constants/locales';

export interface LegalSectionItem {
  id: string;
  title: Record<Locale, string>;
  paragraphs: Record<Locale, string[]>;
  bullets?: Record<Locale, string[]>;
}

export interface LegalDocumentContent {
  documentId: 'legal' | 'privacy' | 'ethics';
  sections: LegalSectionItem[];
  callout?: {
    title: Record<Locale, string>;
    text: Record<Locale, string>;
    contactEmail?: string;
  };
}

/**
 * Contenido estructurado de Aviso Legal (Términos de Uso y Titularidad)
 */
export const legalNoticeData: LegalDocumentContent = {
  documentId: 'legal',
  sections: [
    {
      id: 'titularidad',
      title: {
        es: '1. Identificación y Titularidad de la Plataforma',
        en: '1. Platform Identification and Ownership',
        pt: '1. Identificação e Titularidade da Plataforma',
      },
      paragraphs: {
        es: [
          'MiTumbes (mitumbes.com) es una iniciativa y plataforma digital de difusión, información y promoción turística orientada a poner en valor los atractivos naturales, culturales, gastronómicos y de hospedaje de la región Tumbes, en la costa norte de la República del Perú.',
          'El acceso y navegación en esta plataforma atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas las disposiciones incluidas en el presente Aviso Legal.',
        ],
        en: [
          'MiTumbes (mitumbes.com) is a digital platform dedicated to promoting and disseminating tourist information, highlighting the natural, cultural, gastronomic, and lodging attractions of the Tumbes region on Peru’s northern coast.',
          'Accessing and using this platform grants the status of user and implies full and unreserved acceptance of all provisions included in this Legal Notice.',
        ],
        pt: [
          'MiTumbes (mitumbes.com) é uma plataforma digital voltada para a promoção e divulgação turística, destacando as atrações naturais, culturais, gastronômicas e hoteleiras da região de Tumbes, no litoral norte do Peru.',
          'O acesso e a navegação nesta plataforma atribuem a condição de usuário e implicam a aceitação plena de todas as disposições deste Aviso Legal.',
        ],
      },
    },
    {
      id: 'condiciones-uso',
      title: {
        es: '2. Condiciones Generales de Uso y Acceso',
        en: '2. General Terms of Use and Access',
        pt: '2. Condições Gerais de Uso e Acesso',
      },
      paragraphs: {
        es: [
          'El acceso a la información publicada en MiTumbes es libre y gratuito para todos los usuarios. El usuario se compromete a hacer un uso adecuado, diligente y lícito de los contenidos, servicios y herramientas disponibles.',
          'Queda estrictamente prohibido cualquier intento de vulnerar la seguridad de la infraestructura, extraer datos masivos (web scraping no autorizado) que perjudique la disponibilidad del servicio, o hacer uso del portal para actividades ilícitas o fraudulentas.',
        ],
        en: [
          'Access to the information published on MiTumbes is free of charge for all users. Users agree to make proper, diligent, and lawful use of all available content, services, and tools.',
          'Any attempt to breach system security, perform unauthorized large-scale data extraction (web scraping) that degrades service availability, or use the portal for unlawful activities is strictly prohibited.',
        ],
        pt: [
          'O acesso às informações publicadas no MiTumbes é gratuito para todos os usuários. O usuário compromete-se a fazer uso adequado, diligente e lícito de todos os conteúdos e ferramentas disponíveis.',
          'É estritamente proibida qualquer tentativa de violar a segurança da infraestrutura, realizar extração massiva de dados não autorizada (web scraping) ou utilizar o portal para atividades ilícitas.',
        ],
      },
    },
    {
      id: 'propiedad-intelectual',
      title: {
        es: '3. Propiedad Intelectual e Industrial',
        en: '3. Intellectual and Industrial Property',
        pt: '3. Propriedade Intelectual e Industrial',
      },
      paragraphs: {
        es: [
          'Los derechos de propiedad intelectual sobre los textos, diseño de interfaz, código fuente, logotipos, marcas distintivas, diagramación y compilación de bases de datos son titularidad de MiTumbes o se encuentran licenciados conforme a la legislación peruana e internacional.',
          'Las fotografías de atractivos y establecimientos se emplean con fines informativos y promocionales turísticos, respetando los derechos de autor y créditos correspondientes. Queda prohibida la reproducción total o parcial con fines comerciales sin autorización previa por escrito.',
        ],
        en: [
          'All intellectual property rights regarding text, interface design, source code, logos, brand assets, layout, and database compilations belong to MiTumbes or are licensed under Peruvian and international law.',
          'Photographs of attractions and establishments are used strictly for tourist informational and promotional purposes, respecting respective copyright credits. Commercial reproduction without prior written consent is prohibited.',
        ],
        pt: [
          'Todos os direitos de propriedade intelectual sobre textos, design de interface, código-fonte, logotipos, marcas e compilações de dados pertencem ao MiTumbes ou estão devidamente licenciados.',
          'As fotografias de atrações e estabelecimentos são utilizadas exclusivamente para fins informativos e promocionais, respeitando os direitos autorais. É proibida a reprodução para fins comerciais sem autorização prévia.',
        ],
      },
    },
    {
      id: 'responsabilidad',
      title: {
        es: '4. Régimen de Responsabilidad y Servicios de Terceros',
        en: '4. Limitation of Liability and Third-Party Services',
        pt: '4. Limitação de Responsabilidade e Serviços de Terceiros',
      },
      paragraphs: {
        es: [
          'MiTumbes es un directorio y guía de referencia turística. Aunque realizamos esfuerzos constantes de verificación en campo y actualización mediante herramientas tecnológicas y contacto local, no nos responsabilizamos por variaciones imprevistas en horarios, tarifas, disponibilidad o calidad en la prestación de servicios contratados directamente con hoteles, restaurantes, transportistas u operadores turísticos.',
          'Cada establecimiento y operador turístico registrado es el único y exclusivo responsable legal de la prestación de sus servicios, autorizaciones sectoriales (MINCETUR / DIRCETUR Tumbes) y cumplimiento de las normativas vigentes del consumidor.',
        ],
        en: [
          'MiTumbes serves as a tourist directory and travel guide. Although we make continuous efforts for field verification and live data updates, we are not liable for unforeseen changes in schedules, pricing, availability, or quality of services contracted directly with third-party hotels, restaurants, or tour operators.',
          'Each registered tourism provider is solely and legally responsible for service delivery, sectoral authorizations (MINCETUR / DIRCETUR Tumbes), and compliance with consumer protection laws.',
        ],
        pt: [
          'O MiTumbes atua como guia e diretório turístico de referência. Embora realizemos verificações locais constantes, não nos responsabilizamos por alterações imprevistas em tarifas, horários ou qualidade dos serviços contratados diretamente com operadores, hotéis ou restaurantes.',
          'Cada estabelecimento é o único responsável legal pela prestação de seus serviços, autorizações setoriais e cumprimento das normas de defesa do consumidor.',
        ],
      },
    },
    {
      id: 'enlaces',
      title: {
        es: '5. Enlaces Externos y Canales de Contacto Directo',
        en: '5. External Links and Direct Contact Channels',
        pt: '5. Links Externos e Canais de Contato Direto',
      },
      paragraphs: {
        es: [
          'El portal facilita enlaces a plataformas externas como Google Maps, números de WhatsApp de operadores locales y redes sociales de establecimientos para comodidad del viajero. MiTumbes no ejerce control sobre las políticas de privacidad ni los contenidos de dichos sitios externos.',
        ],
        en: [
          'The portal provides links to external services such as Google Maps, operators’ WhatsApp numbers, and social media pages for traveler convenience. MiTumbes does not control the privacy policies or contents of third-party platforms.',
        ],
        pt: [
          'O portal fornece links para serviços externos como Google Maps, WhatsApp de operadores locais e redes sociais para conveniência do viajante. O MiTumbes não exerce controle sobre as políticas de privacidade de sites de terceiros.',
        ],
      },
    },
    {
      id: 'jurisdiccion',
      title: {
        es: '6. Legislación Aplicable y Jurisdicción',
        en: '6. Applicable Law and Jurisdiction',
        pt: '6. Legislação Aplicável e Jurisdição',
      },
      paragraphs: {
        es: [
          'Las presentes condiciones se rigen por las leyes de la República del Perú. Para cualquier controversia que pudiera derivarse del uso del portal, las partes se someten a la competencia territorial de los juzgados y tribunales competentes de la ciudad y departamento de Tumbes, Perú.',
        ],
        en: [
          'These terms are governed by the laws of the Republic of Peru. For any dispute arising from the use of this website, the parties submit to the jurisdiction of the competent courts of the city and department of Tumbes, Peru.',
        ],
        pt: [
          'Estes termos são regidos pelas leis da República do Peru. Para qualquer controvérsia decorrente do uso deste portal, as partes submetem-se à jurisdição dos tribunais competentes do departamento de Tumbes, Peru.',
        ],
      },
    },
  ],
  callout: {
    title: {
      es: 'Atención al Usuario y Consultas Legales',
      en: 'User Support and Legal Inquiries',
      pt: 'Atendimento ao Usuário e Dúvidas Legais',
    },
    text: {
      es: 'Para cualquier consulta relacionada con los términos de uso, reporte de información o acreditación de titularidad de contenidos, puedes comunicarte a través de nuestro correo oficial.',
      en: 'For any inquiry regarding terms of use, data reporting, or content attribution, please reach out via our official email.',
      pt: 'Para qualquer dúvida sobre termos de uso, correção de dados ou titularidade de conteúdo, entre em contato através do nosso e-mail oficial.',
    },
    contactEmail: 'contacto@mitumbes.com',
  },
};

/**
 * Contenido estructurado de Política de Privacidad (Cumplimiento Ley N° 29733)
 */
export const privacyPolicyData: LegalDocumentContent = {
  documentId: 'privacy',
  sections: [
    {
      id: 'marco-legal',
      title: {
        es: '1. Compromiso de Privacidad y Marco Legal (Ley N° 29733)',
        en: '1. Privacy Commitment and Legal Framework (Law No. 29733)',
        pt: '1. Compromisso de Privacidade e Marco Legal (Lei nº 29733)',
      },
      paragraphs: {
        es: [
          'En MiTumbes nos tomamos muy en serio la privacidad y seguridad de quienes visitan nuestra plataforma. Tratamos los datos personales con estricto apego a la Ley N° 29733 (Ley de Protección de Datos Personales de la República del Perú) y su Reglamento aprobado mediante Decreto Supremo N° 003-2013-JUS.',
          'Esta política describe qué información recopilamos, con qué finalidad la tratamos y cómo puedes ejercer plenamente tus derechos de control sobre la misma.',
        ],
        en: [
          'At MiTumbes, we take the privacy and security of visitors very seriously. Personal data is handled in strict compliance with Peruvian Law No. 29733 (Personal Data Protection Law) and its Supreme Decree No. 003-2013-JUS.',
          'This policy outlines what information we collect, the purposes of processing, and how you can exercise full control over your personal data.',
        ],
        pt: [
          'No MiTumbes, tratamos a privacidade e a segurança de nossos visitantes com máxima seriedade, em estrita conformidade com a Lei nº 29733 (Lei de Proteção de Dados Pessoais do Peru) e seus regulamentos aplicáveis.',
          'Esta política descreve quais informações coletamos, as finalidades do tratamento e como você pode exercer seus direitos.',
        ],
      },
    },
    {
      id: 'datos-recopilados',
      title: {
        es: '2. Información que Recopilamos',
        en: '2. Information We Collect',
        pt: '2. Informações que Coletamos',
      },
      paragraphs: {
        es: [
          'Nuestra plataforma está concebida bajo el principio de minimización de datos: no requerimos registro obligatorio para consultar el catálogo turístico, leer las guías de viaje o ver el clima en vivo.',
          'Los datos que podemos procesar se dividen en las siguientes categorías:',
        ],
        en: [
          'Our platform is designed under the data minimization principle: no mandatory user registration is required to explore our tourism catalog, read travel guides, or check live weather.',
          'The data we may process falls under the following categories:',
        ],
        pt: [
          'Nossa plataforma é baseada no princípio da minimização de dados: não exigimos cadastro obrigatório para navegar pelo catálogo turístico, ler guias ou consultar o clima em tempo real.',
          'Os dados que podemos processar dividem-se nas seguintes categorias:',
        ],
      },
      bullets: {
        es: [
          'Telemetría y analítica web agregada (páginas consultadas, dispositivo y navegador) para entender qué destinos tienen mayor demanda y optimizar la velocidad del portal.',
          'Geolocalización aproximada voluntaria (a nivel de ciudad/país mediante IP) para ofrecer la hora local y temperatura en tiempo real en la barra de navegación.',
          'Información de contacto voluntaria suministrada por partners, operadores o usuarios a través de formularios o correos electrónicos para consultas o incorporación al catálogo.',
        ],
        en: [
          'Aggregated web analytics and telemetry (pages viewed, device, and browser) to understand destination demand and optimize site performance.',
          'Voluntary coarse geolocation (city/country level via IP) to display accurate local time and weather conditions in the navigation bar.',
          'Voluntary contact information submitted by partners, operators, or users via forms or email for inquiries or catalog registration.',
        ],
        pt: [
          'Telemetria e análise web agregada (páginas acessadas, dispositivo e navegador) para mensurar a demanda turística e otimizar o desempenho.',
          'Geolocalização aproximada voluntária (cidade/país via IP) para exibir hora e temperatura local em tempo real.',
          'Dados de contato fornecidos voluntariamente por parceiros, operadoras ou usuários por meio de formulários ou e-mail.',
        ],
      },
    },
    {
      id: 'finalidad-datos',
      title: {
        es: '3. Finalidad del Tratamiento y No Comercialización',
        en: '3. Purpose of Processing and No Commercial Sale',
        pt: '3. Finalidade do Tratamento e Não Comercialização',
      },
      paragraphs: {
        es: [
          'Los datos se emplean únicamente para garantizar el funcionamiento técnico del sitio, mostrar información meteorológica precisa, coordinar con operadores turísticos verificados y responder consultas ciudadanas.',
          'Bajo ninguna circunstancia vendemos, alquilamos ni cedemos bases de datos personales a agencias de publicidad o entidades comerciales ajenas a los fines de MiTumbes.',
        ],
        en: [
          'Data is processed exclusively to maintain platform technical operations, present accurate weather telemetry, coordinate with verified local operators, and respond to traveler inquiries.',
          'Under no circumstances do we sell, rent, or transfer personal databases to advertising agencies or unrelated commercial third parties.',
        ],
        pt: [
          'Os dados são utilizados unicamente para assegurar o funcionamento técnico do site, exibir telemetria meteorológica precisa e responder a solicitações.',
          'Sob nenhuma circunstância vendemos, alugamos ou transferimos bancos de dados pessoais a terceiros para fins comerciais ou publicitários.',
        ],
      },
    },
    {
      id: 'derechos-arco',
      title: {
        es: '4. Ejercicio de Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)',
        en: '4. Exercise of ARCO Rights (Access, Rectification, Cancellation, and Opposition)',
        pt: '4. Exercício dos Direitos ARCO (Acesso, Retificação, Cancelamento e Oposição)',
      },
      paragraphs: {
        es: [
          'Conforme a la Ley N° 29733, todo titular de datos personales tiene derecho a acceder a la información que MiTumbes conserve sobre su persona, rectificarla si es inexacta, solicitar su supresión (cancelación) u oponerse a su tratamiento.',
          'Para ejercer cualquiera de estos derechos, basta con remitir una comunicación dirigida a nuestro responsable de privacidad con el asunto "Derechos ARCO", adjuntando la identificación respectiva.',
        ],
        en: [
          'Under Law No. 29733, every data subject has the right to access personal data held by MiTumbes, rectify inaccuracies, request deletion (cancellation), or oppose processing.',
          'To exercise any of these rights, please send an email to our privacy team with the subject "ARCO Rights", including proof of identity.',
        ],
        pt: [
          'De acordo com a Lei nº 29733, todo titular tem o direito de acessar seus dados pessoais mantidos pelo MiTumbes, solicitar retificação, cancelamento ou oposição ao tratamento.',
          'Para exercer seus direitos, basta enviar uma mensagem com o assunto "Direitos ARCO" ao nosso e-mail oficial.',
        ],
      },
    },
    {
      id: 'cookies',
      title: {
        es: '5. Almacenamiento Local y Cookies Técnicas',
        en: '5. Local Storage and Essential Cookies',
        pt: '5. Armazenamento Local e Cookies Essenciais',
      },
      paragraphs: {
        es: [
          'MiTumbes utiliza almacenamiento local y cookies técnicas estrictamente necesarias para recordar tu preferencia de idioma (español, inglés o portugués) y optimizar la carga del contenido a través de la red perimetral (Cloudflare). No empleamos cookies invasivas de seguimiento publicitario cruzado.',
        ],
        en: [
          'MiTumbes uses local storage and strictly essential technical cookies to remember language preferences (Spanish, English, or Portuguese) and optimize asset delivery via Cloudflare CDN. We do not use invasive cross-site advertising cookies.',
        ],
        pt: [
          'O MiTumbes utiliza armazenamento local e cookies técnicos estritamente necessários para registrar preferências de idioma (espanhol, inglês ou português) e otimizar a velocidade de carregamento via CDN. Não utilizamos cookies invasivos de rastreamento publicitário.',
        ],
      },
    },
  ],
  callout: {
    title: {
      es: 'Canal Oficial de Protección de Datos',
      en: 'Official Data Protection Channel',
      pt: 'Canal Oficial de Proteção de Dados',
    },
    text: {
      es: 'Puedes comunicarte directamente con nuestro delegado de datos para cualquier solicitud o rectificación de información en nuestro portal.',
      en: 'You can contact our data officer directly for any personal data inquiry or record rectification.',
      pt: 'Você pode entrar em contato diretamente com nossa equipe para qualquer solicitação ou retificação de dados.',
    },
    contactEmail: 'privacidad@mitumbes.com',
  },
};

/**
 * Contenido estructurado de Código de Ética y Turismo Responsable
 */
export const codeOfEthicsData: LegalDocumentContent = {
  documentId: 'ethics',
  sections: [
    {
      id: 'proposito',
      title: {
        es: '1. Propósito y Compromiso Ético con la Región Tumbes',
        en: '1. Purpose and Ethical Commitment to the Tumbes Region',
        pt: '1. Propósito e Compromisso Ético com a Região de Tumbes',
      },
      paragraphs: {
        es: [
          'El presente Código de Ética rige los principios de MiTumbes como guía y plataforma regional. Creemos firmemente que el turismo debe ser un motor de desarrollo económico justo, bienestar comunitario y preservación del patrimonio natural de la costa norte del Perú.',
          'Promovemos una actividad turística transparente, respetuosa de la identidad cultural tumbesina y rigurosa en el cuidado de nuestros ecosistemas marinos y terrestres.',
        ],
        en: [
          'This Code of Ethics governs MiTumbes’ core principles. We firmly believe that tourism must be an engine for fair economic development, community well-being, and heritage conservation on Peru’s northern coast.',
          'We advocate for transparent tourism that respects Tumbesian cultural identity and demonstrates rigorous stewardship of our coastal and marine ecosystems.',
        ],
        pt: [
          'Este Código de Ética estabelece os princípios fundamentais do MiTumbes. Acreditamos que o turismo deve ser um motor de desenvolvimento justo, bem-estar comunitário e preservação ambiental no norte do Peru.',
          'Promovemos um turismo transparente, que valorize a identidade cultural tumbesina e preserve com rigor nossos ecossistemas costeiros e marinhos.',
        ],
      },
    },
    {
      id: 'conservacion',
      title: {
        es: '2. Conservación de Ecosistemas y Vida Silvestre',
        en: '2. Ecosystem and Wildlife Conservation',
        pt: '2. Conservação de Ecossistemas e Vida Selvagem',
      },
      paragraphs: {
        es: [
          'Tumbes alberga ecosistemas únicos y frágiles en el Perú: el Santuario Nacional Los Manglares de Tumbes en Puerto Pizarro, los Cerros de Amotape y el corredor marino del Pacífico cálido donde transitan especies emblemáticas.',
          'Nuestro código establece compromisos irrenunciables en materia ambiental:',
        ],
        en: [
          'Tumbes is home to unique and fragile Peruvian ecosystems: Los Manglares de Tumbes National Sanctuary in Puerto Pizarro, Cerros de Amotape, and the warm Pacific marine corridor frequented by migratory species.',
          'Our code establishes non-negotiable environmental commitments:',
        ],
        pt: [
          'Tumbes abriga ecossistemas únicos e sensíveis no Peru: o Santuário Nacional dos Manguezais em Puerto Pizarro, os Cerros de Amotape e o corredor marinho do Pacífico.',
          'Nosso código estabelece compromissos ambientais irrenunciáveis:',
        ],
      },
      bullets: {
        es: [
          'Avistamiento Responsable de Ballenas Jorobadas y Fauna Marina: Promoción exclusiva de embarcaciones autorizadas que respetan distancias seguras (mínimo 50 metros para ballenas adultas y 100 metros para madres con crías), velocidades moderadas y no persecución.',
          'Protección del Ecosistema del Mangle: Exigencia del respeto irrestricto a los periodos de veda y tallas mínimas en la extracción de la concha negra (Anadara tuberculosa) y el cangrejo del manglar (Ucides occidentalis).',
          'Playas Libres de Plásticos: Impulso de campañas de cero residuos plásticos en balnearios como Punta Sal, Zorritos, Cancas y Bocapán.',
        ],
        en: [
          'Responsible Humpback Whale and Marine Life Watching: Promoting only authorized vessels adhering to safe distances (minimum 50m for adults, 100m for mothers with calves), low speeds, and non-pursuit rules.',
          'Mangrove Ecosystem Protection: Strict adherence to biological ban periods and minimum harvest sizes for black clams (Anadara tuberculosa) and mangrove crabs (Ucides occidentalis).',
          'Plastic-Free Beaches: Advocating zero single-use plastic waste across beaches including Punta Sal, Zorritos, Cancas, and Bocapán.',
        ],
        pt: [
          'Observação Responsável de Baleias e Vida Marinha: Divulgação de embarcações autorizadas que respeitem distâncias seguras (50m para adultos, 100m para filhotes) e velocidade controlada.',
          'Preservação dos Manguezais: Respeito absoluto aos períodos de defeso e tamanhos mínimos na extração de conchas negras e caranguejos.',
          'Praias Livres de Plásticos: Incentivo à redução de resíduos descartáveis em praias como Punta Sal, Zorritos, Cancas e Bocapán.',
        ],
      },
    },
    {
      id: 'transparencia',
      title: {
        es: '3. Veracidad, Transparencia y Cero Reseñas Falsas',
        en: '3. Truthfulness, Transparency, and Zero Fake Reviews',
        pt: '3. Veracidade, Transparência e Tolerância Zero a Avaliações Falsas',
      },
      paragraphs: {
        es: [
          'En MiTumbes no admitimos publicidad engañosa, precios ocultos ni opiniones artificialmente infladas. Cada ficha de lugar, restaurante, hotel o actividad es verificada localmente con datos reales de contacto, ubicación y servicios.',
          'Priorizamos la calidad y la autenticidad de la experiencia por encima de cualquier interés comercial.',
        ],
        en: [
          'At MiTumbes, we do not tolerate misleading advertising, hidden fees, or artificially inflated reviews. Every entry for places, dining, lodging, or activities is locally verified with accurate contact, location, and amenity details.',
          'We prioritize authenticity and quality of traveler experience over commercial bias.',
        ],
        pt: [
          'No MiTumbes não toleramos publicidade enganosa ou avaliações manipuladas. Cada ficha de atração, restaurante, hotel ou atividade é verificada localmente com dados autênticos de contato e localização.',
          'Priorizamos a autenticidade e a qualidade da experiência do viajante.',
        ],
      },
    },
    {
      id: 'comercio-justo',
      title: {
        es: '4. Comercio Justo y Respaldo a Emprendedores Locales',
        en: '4. Fair Trade and Support for Local Entrepreneurs',
        pt: '4. Comércio Justo e Apoio a Empreendedores Locais',
      },
      paragraphs: {
        es: [
          'Brindamos visibilidad digital equitativa a pescadores artesanales, cocineras tradicionales, recolectores ancestrales del manglar, artesanos y guías locales certificados que representan la auténtica hospitalidad de Tumbes.',
          'Fomentamos que el gasto turístico beneficie directamente a las familias de las caletas y distritos de la región, combatiendo la intermediación abusiva.',
        ],
        en: [
          'We provide equitable digital visibility to artisanal fishers, traditional cooks, ancestral mangrove harvesters, craftspeople, and certified local guides who represent genuine Tumbesian hospitality.',
          'We encourage tourism spending that directly benefits local families in coastal coves and districts, combating predatory intermediation.',
        ],
        pt: [
          'Oferecemos visibilidade digital justa para pescadores artesanais, cozinheiras tradicionais, extratores ancestrais do manguezal, artesãos e guias locais certificados.',
          'Incentivamos que o gasto turístico beneficie diretamente as famílias locais, combatendo a intermediação predatória.',
        ],
      },
    },
    {
      id: 'esnna',
      title: {
        es: '5. Cero Tolerancia a la Explotación (Código ESNNA)',
        en: '5. Zero Tolerance for Exploitation (ESNNA Code)',
        pt: '5. Tolerância Zero à Exploração (Código ESNNA)',
      },
      paragraphs: {
        es: [
          'MiTumbes manifiesta su rechazo absoluto y tolerancia cero ante cualquier forma de Explotación Sexual de Niñas, Niños y Adolescentes en el ámbito del turismo (ESNNA), en estricto cumplimiento de la Ley N° 29408 (Ley General de Turismo del Perú) y el Código Penal peruano.',
          'Exigimos a todos los operadores turísticos, alojamientos y transportistas registrados la adhesión formal a este principio y denunciamos inmediatamente ante las autoridades competentes cualquier indicio de vulneración a menores.',
        ],
        en: [
          'MiTumbes asserts zero tolerance and absolute rejection of any form of Commercial Sexual Exploitation of Children and Adolescents in tourism (ESNNA), in strict compliance with Peruvian General Tourism Law No. 29408 and national legislation.',
          'We require all registered tourism providers, lodgings, and transport operators to uphold this commitment and immediately report any suspicion of child exploitation to competent authorities.',
        ],
        pt: [
          'O MiTumbes manifesta tolerância zero e repúdio absoluto a qualquer forma de Exploração Sexual de Crianças e Adolescentes no turismo (ESNNA), em estrito cumprimento da legislação peruana e internacional.',
          'Exigimos de todos os prestadores turísticos cadastrados a adesão a este compromisso inegociável.',
        ],
      },
    },
    {
      id: 'decalogo-viajero',
      title: {
        es: '6. Decálogo del Viajero Responsable en Tumbes',
        en: '6. Responsible Traveler Guidelines for Tumbes',
        pt: '6. Diretrizes do Viajante Responsável em Tumbes',
      },
      paragraphs: {
        es: [
          'Invitamos a todos los visitantes a ser embajadores del turismo sostenible durante su estadía en Tumbes:',
        ],
        en: [
          'We invite every visitor to act as an ambassador for sustainable tourism during their stay in Tumbes:',
        ],
        pt: [
          'Convidamos todos os visitantes a serem embaixadores do turismo sustentável durante sua estadia em Tumbes:',
        ],
      },
      bullets: {
        es: [
          'Lleva siempre contigo tus residuos y no dejes plásticos en playas ni manglares.',
          'Respeta los hábitats de anidación de tortugas marinas y no toques a los animales silvestres.',
          'Consume gastronomía marina responsable: no compres especies en veda ni por debajo de las tallas mínimas.',
          'Elige operadores, guías y transportistas formales acreditados por la DIRCETUR Tumbes.',
          'Valora y respeta las costumbres y tradiciones de las comunidades pescadoras y campesinas locales.',
        ],
        en: [
          'Always pack out your trash and avoid single-use plastics on beaches and mangroves.',
          'Respect sea turtle nesting grounds and avoid touching or disturbing wild fauna.',
          'Practice responsible seafood consumption: do not order banned species or undersized catches.',
          'Choose licensed, certified tour guides and operators authorized by DIRCETUR Tumbes.',
          'Honor and respect the cultural traditions of local coastal and rural communities.',
        ],
        pt: [
          'Recolha sempre seu lixo e evite plásticos descartáveis nas praias e manguezais.',
          'Respeite os locais de desova de tartarugas marinhas e não interfira na fauna silvestre.',
          'Consuma frutos do mar de forma consciente: respeite os períodos de defeso.',
          'Contrate operadores e guias formais certificados pela DIRCETUR Tumbes.',
          'Valorize e respeite as tradições culturais das comunidades locais.',
        ],
      },
    },
  ],
  callout: {
    title: {
      es: 'Canal de Denuncias Éticas y Ambientales',
      en: 'Ethics and Environmental Reporting Channel',
      pt: 'Canal de Denúncias Éticas e Ambientais',
    },
    text: {
      es: 'Si detectas malas prácticas ambientales, incumplimiento de normas de conservación o irregularidades por parte de operadores listados, repórtalo para tomar acciones inmediatas.',
      en: 'If you observe environmental violations, breach of wildlife guidelines, or service misconduct by listed providers, report it for immediate review.',
      pt: 'Caso identifique irregularidades ambientais ou condutas inadequadas por operadores listados, reporte para providências imediatas.',
    },
    contactEmail: 'etica@mitumbes.com',
  },
};
