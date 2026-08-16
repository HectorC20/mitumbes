/**
 * Configuración central de idiomas.
 * Todos los apartados del sitio trabajan sobre estos 3 locales.
 */

export const LOCALES = ['es', 'en', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

/** Nombre completo de cada idioma (para el selector de idioma). */
export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
};

/** Código corto mostrado en el botón del nav-shell. */
export const LOCALE_SHORT: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  pt: 'PT',
};

/** Código BCP 47 para <html lang> y hreflang. */
export const LOCALE_BCP47: Record<Locale, string> = {
  es: 'es',
  en: 'en',
  pt: 'pt',
};

/** Código de idioma para Open Graph. */
export const LOCALE_OG: Record<Locale, string> = {
  es: 'es_PE',
  en: 'en_US',
  pt: 'pt_BR',
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Detecta el idioma a partir de un pathname (/es/..., /en/..., /pt/...). */
export function getLocaleFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/(es|en|pt)(?=\/|$)/);
  return match && isLocale(match[1]) ? match[1] : DEFAULT_LOCALE;
}

/** Convierte una ruta interna (sin idioma) en su versión localizada. */
export function localizePath(path: string, lang: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (clean === '/') return `/${lang}/`;
  return `/${lang}${clean}`;
}

/** Quita el prefijo de idioma de una ruta actual. */
export function stripLocale(pathname: string): string {
  const clean = pathname.replace(/^\/(es|en|pt)(?=\/|$)/, '');
  return clean === '' ? '/' : clean;
}

/** Devuelve las rutas alternas (hreflang) para una ruta interna. */
export function alternatePaths(path: string): Record<Locale, string> {
  return {
    es: localizePath(path, 'es'),
    en: localizePath(path, 'en'),
    pt: localizePath(path, 'pt'),
  };
}
