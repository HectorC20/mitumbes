import type { Locale } from '../constants/locales';

export interface Partner {
  id: string;
  name: string;
  url: string;
  description?: Record<Locale, string>;
  logo?: string;
}
