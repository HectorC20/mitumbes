/** Datos que PlaceCard publica como data-attributes en el DOM. */
export interface PlaceSearchItemData {
  slug: string;
  /** Identificador de apartado (lugares/categorias/zonas). */
  seccion: string;
  categoria: string;
  zona: string;
  search: string;
}

/**
 * Modelo de un ítem de lugar en la lista de búsqueda.
 * Encapsula la lectura de los data-attributes y la evaluación de coincidencia.
 */
export class PlaceSearchItemModel {
  constructor(private readonly data: PlaceSearchItemData) {}

  static fromElement(el: HTMLElement): PlaceSearchItemModel {
    return new PlaceSearchItemModel({
      slug: el.dataset.slug ?? '',
      seccion: el.dataset.section ?? '',
      categoria: el.dataset.categoria ?? '',
      zona: el.dataset.zona ?? '',
      search: el.dataset.search ?? '',
    });
  }

  /** True si el ítem coincide con el término y los filtros activos. */
  coincide(termino: string, categoria: string, zona: string): boolean {
    return (
      (!termino || this.data.search.includes(termino)) &&
      (!categoria || this.data.categoria === categoria) &&
      (!zona || this.data.zona === zona)
    );
  }
}
