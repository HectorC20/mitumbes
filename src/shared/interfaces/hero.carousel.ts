import type { Locale } from '@/shared/constants/locales';

export type HeroEntityType =
  | 'item'
  | 'place'
  | 'category'
  | 'zone'
  | 'event'
  | 'route'
  | 'custom';

export interface HeroCampaignSlide {
  id: string;
  entityType: HeroEntityType;
  tag: string;
  eyebrow: string;
  title: string;
  desc: string;
  status: string;
  image: string;
  href: string;
  ctaText?: string;
  metaTemp?: string;
  metaStatus?: string;
  metaOperators?: string;
}

/** Compatibilidad retrospectiva con código anterior */
export type HeroSlideItem = HeroCampaignSlide;

export interface Props {
  slides?: HeroCampaignSlide[];
  lang: Locale;
}
