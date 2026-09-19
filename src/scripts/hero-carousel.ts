/**
 * Controlador de interactividad para el Hero de Campañas Dinámicas y Telemetría de MiTumbes
 * Soporta actualización reactiva de ítems, lugares, categorías, zonas, eventos y campañas custom.
 */

export class HeroCampaignManager {
  private campButtons: NodeListOf<HTMLButtonElement>;

  constructor(container: HTMLElement) {
    this.campButtons = container.querySelectorAll<HTMLButtonElement>('[data-camp-btn]');
    this.init();
  }

  private init(): void {
    this.bindCampaignSwitcher();
  }

  private bindCampaignSwitcher(): void {
    this.campButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.campButtons.forEach((b) => b.classList.remove('hero-camp-pill--active'));
        btn.classList.add('hero-camp-pill--active');

        const title = btn.getAttribute('data-title') ?? '';
        const desc = btn.getAttribute('data-desc') ?? '';
        const eyebrow = btn.getAttribute('data-eyebrow') ?? '';
        const status = btn.getAttribute('data-status') ?? '';
        const href = btn.getAttribute('data-href') ?? '';
        const image = btn.getAttribute('data-image') ?? '';
        const cta = btn.getAttribute('data-cta') ?? '';
        const temp = btn.getAttribute('data-temp') ?? '';
        const stat = btn.getAttribute('data-stat') ?? '';
        const ops = btn.getAttribute('data-ops') ?? '';
        const type = btn.getAttribute('data-type') ?? '';

        const titleEl = document.getElementById('hero-camp-title');
        const descEl = document.getElementById('hero-camp-desc');
        const eyebrowEl = document.querySelector('#hero-camp-eyebrow span');
        const statusEl = document.getElementById('hero-camp-status-text');
        const ctaEl = document.getElementById('hero-camp-cta') as HTMLAnchorElement | null;
        const ctaTextEl = document.getElementById('hero-camp-cta-text');
        const bgImgEl = document.getElementById('hero-camp-bg-img') as HTMLImageElement | null;
        const tempEl = document.getElementById('hero-camp-telemetry-temp');
        const statEl = document.getElementById('hero-camp-telemetry-status');
        const opsEl = document.getElementById('hero-camp-telemetry-ops');
        const typeBadgeEl = document.getElementById('hero-camp-type-badge');

        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = desc;
        if (eyebrowEl) eyebrowEl.textContent = eyebrow;
        if (statusEl) statusEl.textContent = status;
        if (ctaEl && href) ctaEl.href = href;
        if (ctaTextEl && cta) ctaTextEl.textContent = cta;
        if (bgImgEl && image) bgImgEl.src = image;
        if (tempEl) tempEl.textContent = temp;
        if (statEl) statEl.textContent = stat;
        if (opsEl) opsEl.textContent = ops;
        if (typeBadgeEl) typeBadgeEl.textContent = type ? type.toUpperCase() : '';
      });
    });
  }
}

export function initHero(): void {
  const container = document.querySelector<HTMLElement>('[data-hero-container]');
  if (container) {
    new HeroCampaignManager(container);
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero);
  } else {
    initHero();
  }
}
