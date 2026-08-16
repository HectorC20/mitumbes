/**
 * Modelo de los filtros del buscador de lugares.
 * Sigue el patrón de capa de models: clase con valores por defecto y
 * conversión desde/hacia su representación transportable (query string).
 */
export class PlaceSearchFilterModel {
  q: string;
  categoria: string;
  zona: string;

  constructor(q = '', categoria = '', zona = '') {
    this.q = q;
    this.categoria = categoria;
    this.zona = zona;
  }

  static fromQueryParams(params: URLSearchParams): PlaceSearchFilterModel {
    return new PlaceSearchFilterModel(
      params.get('q') ?? '',
      params.get('categoria') ?? '',
      params.get('zona') ?? '',
    );
  }

  toQueryParams(): URLSearchParams {
    const params = new URLSearchParams();
    if (this.q.trim()) params.set('q', this.q.trim());
    if (this.categoria) params.set('categoria', this.categoria);
    if (this.zona) params.set('zona', this.zona);
    return params;
  }

  get vacio(): boolean {
    return !this.q.trim() && !this.categoria && !this.zona;
  }
}
