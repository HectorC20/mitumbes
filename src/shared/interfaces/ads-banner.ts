import { type Locale } from '@/shared/constants/locales';

export interface Props {
  lang?: Locale;
  variant?: 'minimal' | 'card' | 'billboard';
  image?: string;
  imageAlt?: string;
  badgeText?: string;
  sponsorName?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  icon?: string;
  id?: string;
  dismissible?: boolean;
  mode?: 'specific' | 'random' | 'auto';
  groupId?: string;
}