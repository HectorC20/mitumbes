import { contarLugares } from '@/shared/dictionary/search.dictionary';
import { PlaceSearchFilterModel } from '@/shared/models/place-search/place-search-filter.model';
import { PlaceSearchItemModel } from '@/shared/models/place-search/place-search-item.model';

/**
 * Buscador client-side de la lista de lugares.
 * La página es prerenderizada: el HTML se genera sin query string,
 * por lo que los filtros se inicializan desde la URL actual.
 */
export function initPlaceSearch(): void {
  const grid = document.querySelector<HTMLElement>('#place-grid');
  if (!grid) return;

  const q = document.querySelector<HTMLInputElement>('#search-q');
  const categoria = document.querySelector<HTMLSelectElement>('#filter-categoria');
  const zona = document.querySelector<HTMLSelectElement>('#filter-zona');
  const form = document.querySelector<HTMLFormElement>('.search-form');
  const counter = document.querySelector<HTMLElement>('#search-count');
  const empty = document.querySelector<HTMLElement>('#search-empty');
  const lang = document.documentElement.lang;
  const items = Array.from(grid.querySelectorAll<HTMLElement>('[data-lugar]')).map(
    (el) => ({ el, model: PlaceSearchItemModel.fromElement(el) }),
  );

  const normalizar = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filtrosIniciales = PlaceSearchFilterModel.fromQueryParams(
    new URLSearchParams(window.location.search),
  );
  if (q) q.value = filtrosIniciales.q;
  if (categoria) categoria.value = filtrosIniciales.categoria;
  if (zona) zona.value = filtrosIniciales.zona;

  const aplicar = () => {
    const termino = normalizar(q?.value ?? '').trim();
    const filtros = new PlaceSearchFilterModel(
      q?.value.trim() ?? '',
      categoria?.value ?? '',
      zona?.value ?? '',
    );
    let visibles = 0;

    for (const { el, model } of items) {
      const ok = model.coincide(termino, filtros.categoria, filtros.zona);
      el.hidden = !ok;
      if (ok) visibles++;
    }

    if (counter) {
      counter.textContent = `${visibles} ${contarLugares(lang, visibles)}`;
    }
    if (empty) empty.hidden = visibles > 0;

    const qs = filtros.toQueryParams().toString();
    const base = window.location.pathname;
    history.replaceState(null, '', qs ? `${base}?${qs}` : base);
  };

  form?.addEventListener('submit', (e) => e.preventDefault());
  q?.addEventListener('input', aplicar);
  categoria?.addEventListener('change', aplicar);
  zona?.addEventListener('change', aplicar);
  aplicar();
}
