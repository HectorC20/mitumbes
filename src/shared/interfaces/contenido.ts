import type { Locale } from '../constants/locales';
import type { ContentCollectionName } from '../constants/collections';

export type Localizado<T = string> = Record<Locale, T>;

export interface EnlaceContenido {
  type: string;
  url: string;
  label?: string;
}

export interface EntradaContenido {
  id: string;
  collection: ContentCollectionName;
  zone?: ZonaLigera;
  data: {
    title: Localizado<string>;
    description: Localizado<string>;
    excerpt?: Localizado<string>;
    zone?: ZonaLigera;
    image?: string;
    gallery?: string[];
    coordinates?: { lat: number; lng: number };
    address?: Localizado<string>;
    hours?: Localizado<string>;
    price?: Localizado<string>;
    phone?: string;
    email?: string;
    website?: string;
    social?: { instagram?: string; facebook?: string };
    links?: EnlaceContenido[];
    services?: Localizado<string[]>;
    howToGet?: Localizado<string>;
    activities?: Localizado<string[]>;
    nearby?: string[];
    source?: Localizado<string>;
    verified: boolean;
    featured: boolean;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date;
    body?: Localizado<string>;
    subcategory?: string;
    parent?: string;
    parentId?: string | null;
    path?: string;
    depth?: number;
    icon?: string;
    startDate?: string;
    endDate?: string;
  };
}

export interface ZonaLigera {
  id: string;
  collection: 'zones';
  data: {
    title: Localizado<string>;
    type?: string;
    description?: Localizado<string>;
    image?: string;
    body?: Localizado<string>;
  };
}

export interface ContratoEntry {
  id: string;
  collection: string;
  data: Record<string, unknown>;
}
