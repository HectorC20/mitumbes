import type { Locale } from '@/shared/constants/locales';

export interface HeroSlideItem {
  id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  href: string;
}

export interface Props {
  slides: HeroSlideItem[];
  lang: Locale;
}
