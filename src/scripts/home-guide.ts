/**
 * Controlador de cambio dinámico en guide-intro para la Guía Regional de Tumbes
 */

export class HomeGuideIntroManager {
  private container: HTMLElement;
  private tabs: NodeListOf<HTMLAnchorElement>;
  private panels: NodeListOf<HTMLElement>;

  constructor(container: HTMLElement) {
    this.container = container;
    this.tabs = container.querySelectorAll<HTMLAnchorElement>('[data-guide-tab]');
    this.panels = container.querySelectorAll<HTMLElement>('[data-guide-intro-panel]');

    this.init();
  }

  private init(): void {
    if (this.tabs.length === 0 || this.panels.length === 0) return;

    // Escuchar clics en los tabs de navegación
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = tab.getAttribute('data-guide-tab') ?? '';
        this.selectSection(targetId, true);
      });
    });

    // Comprobar hash inicial de la URL
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const exists = Array.from(this.panels).some(
        (p) => p.getAttribute('data-guide-intro-panel') === hash
      );
      if (exists) {
        this.selectSection(hash, false);
      } else {
        this.selectSection('resumen', false);
      }
    } else {
      this.selectSection('resumen', false);
    }

    // Escuchar cambios de hash
    window.addEventListener('hashchange', () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash) {
        const exists = Array.from(this.panels).some(
          (p) => p.getAttribute('data-guide-intro-panel') === currentHash
        );
        if (exists) {
          this.selectSection(currentHash, false);
        }
      }
    });
  }

  public selectSection(sectionId: string, scroll: boolean): void {
    // Actualizar tabs
    this.tabs.forEach((tab) => {
      const tabTarget = tab.getAttribute('data-guide-tab');
      const isActive = tabTarget === sectionId;
      tab.classList.toggle('guide-nav__link--active', isActive);
      tab.setAttribute('aria-selected', isActive.toString());
    });

    // Actualizar paneles dentro de guide-intro
    this.panels.forEach((panel) => {
      const panelId = panel.getAttribute('data-guide-intro-panel');
      const isActive = panelId === sectionId;
      panel.classList.toggle('guide-intro-panel--active', isActive);
      panel.hidden = !isActive;
    });

    // Actualizar hash en URL solo cuando es una interacción intencional del usuario (clic)
    if (scroll && history.replaceState) {
      history.replaceState(null, '', `#${sectionId}`);
    }

    // Scroll suave a guide-header si fue clic de usuario
    if (scroll) {
      const guideHeader = this.container.querySelector('.guide-header');
      if (guideHeader) {
        const top = guideHeader.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }
}

export function initHomeGuide(): void {
  const guideSection = document.querySelector<HTMLElement>('[data-section="guia"]');
  if (guideSection) {
    if (guideSection.dataset.guideInit === 'true') return;
    guideSection.dataset.guideInit = 'true';
    new HomeGuideIntroManager(guideSection);
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeGuide);
  } else {
    initHomeGuide();
  }
  document.addEventListener('chunk:ready', (e: Event) => {
    const customEvent = e as CustomEvent<{ id?: string }>;
    if (!customEvent.detail?.id || customEvent.detail.id === 'guia') {
      initHomeGuide();
    }
  });
}
