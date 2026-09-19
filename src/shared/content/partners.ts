import type { Partner } from '../interfaces/partner';

export type { Partner };

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
