type Contador = (cantidad: number) => string;

const CONTAR_LUGARES: Record<string, Contador> = {
  es: (n) => (n === 1 ? 'lugar' : 'lugares'),
  en: (n) => (n === 1 ? 'place' : 'places'),
  pt: (n) => (n === 1 ? 'lugar' : 'lugares'),
};

/** Palabra "lugar" en singular/plural según el idioma del documento. */
export function contarLugares(lang: string, cantidad: number): string {
  return (CONTAR_LUGARES[lang] ?? CONTAR_LUGARES.es)(cantidad);
}
