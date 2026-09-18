import type { Locale } from '../constants/locales';

/**
 * Partners del sitio. A diferencia del resto del contenido (que vive en
 * mitumbes-server), esta lista es estática y se mantiene en el front.
 */
export interface Partner {
  /** Identificador estable, usado como data-id en el HTML. */
  id: string;
  /** Nombre del partner mostrado en la tarjeta. */
  name: string;
  /** Sitio web del partner. */
  url: string;
  /** Descripción corta localizada (opcional). */
  description?: Record<Locale, string>;
  /**
   * Logo del partner (ruta en /public o URL absoluta). Si no se indica se
   * muestra un monograma con las iniciales del nombre.
   */
  logo?: string;
}

export const PARTNERS: Partner[] = [
  {
    id: 'remtk',
    name: 'REMTK',
    url: 'https://remtk.com',
    description: {
      es: 'Agentes de IA que trabajan en equipo',
      en: 'AI agents that work as a team',
      pt: 'Agentes de IA que trabalham em equipe',
    },
  },
];

/** Iniciales del nombre para el monograma cuando el partner no tiene logo. */
export function partnerInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0).toUpperCase())
    .join('');
}
