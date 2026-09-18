/**
 * Menú de navegación móvil del header.
 *
 * En escritorio el panel de enlaces se muestra en línea y el botón está
 * oculto; en móvil el botón despliega el panel marcando `data-nav-open`
 * en la cabecera, que es lo que consulta el CSS.
 */
const cabecera = document.querySelector<HTMLElement>('[data-nav-shell]');
const boton = cabecera?.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const panel = cabecera?.querySelector<HTMLElement>('.nav-shell__nav');

if (cabecera && boton && panel) {
  const alternar = (abierto: boolean) => {
    cabecera.dataset.navOpen = abierto ? 'true' : 'false';
    boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  };

  boton.addEventListener('click', () => {
    alternar(cabecera.dataset.navOpen !== 'true');
  });

  // Al pasar a escritorio el panel deja de ser un desplegable.
  const escritorio = window.matchMedia('(min-width: 48rem)');
  escritorio.addEventListener('change', (evento) => {
    if (evento.matches) {
      alternar(false);
    }
  });
}
