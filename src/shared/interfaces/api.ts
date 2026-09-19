import type { EntradaContenido } from './contenido';

export interface ConsultaContenidos {
  q?: string;
  categoria?: string;
  subcategoria?: string;
  zona?: string;
  page?: number;
  limit?: number;
}

export interface PaginaContenidos {
  items: EntradaContenido[];
  total: number;
  limit: number;
  offset: number;
}

export interface FiltroContenidos {
  q?: string;
  categoria?: string;
  subcategoria?: string;
  zona?: string;
}

export interface PaginaListado {
  items: EntradaContenido[];
  total: number;
  page: number;
  totalPaginas: number;
}
