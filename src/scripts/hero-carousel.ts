/**
 * Controlador de interactividad para el Hero Carousel de MiTumbes
 * Gestiona transiciones de diapositivas, barra de navegación vertical y temporizador automático.
 */

export class HeroCarousel {
  private container: HTMLElement;
  private slides: NodeListOf<HTMLElement>;
  private navItems: NodeListOf<HTMLElement>;
  private verticalIndicator: HTMLElement | null;
  private verticalNumber: HTMLElement | null;
  private previewCard: HTMLElement | null;
  private previewImg: HTMLImageElement | null;
  private previewTitle: HTMLElement | null;
  private currentIndex: number = 0;
  private totalSlides: number = 0;
  private intervalId: number | null = null;
  private duration: number = 6000;
  private isHovered: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.slides = container.querySelectorAll<HTMLElement>('[data-hero-slide]');
    this.navItems = container.querySelectorAll<HTMLElement>('[data-hero-nav-item]');
    this.verticalIndicator = container.querySelector<HTMLElement>('[data-hero-progress]');
    this.verticalNumber = container.querySelector<HTMLElement>('[data-hero-counter]');
    this.previewCard = container.querySelector<HTMLElement>('[data-hero-preview]');
    this.previewImg = container.querySelector<HTMLImageElement>('[data-hero-preview-img]');
    this.previewTitle = container.querySelector<HTMLElement>('[data-hero-preview-title]');
    this.totalSlides = this.slides.length;

    if (this.totalSlides === 0) return;

    this.init();
  }

  private init(): void {
    this.bindEvents();
    this.goToSlide(0);
    this.startAutoPlay();
  }

  private bindEvents(): void {
    // Clic en items de la barra inferior
    this.navItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    // Clic en la tarjeta de previsualización (avanza al siguiente)
    if (this.previewCard) {
      this.previewCard.addEventListener('click', (e) => {
        // Solo si no fue un clic en un enlace interno
        const target = e.target as HTMLElement;
        if (!target.closest('a')) {
          this.next();
          this.resetAutoPlay();
        }
      });
    }

    // Pausar autoplay en hover
    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
    });

    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
    });

    // Soporte para teclado (flechas izquierda / derecha)
    this.container.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        this.next();
        this.resetAutoPlay();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        this.prev();
        this.resetAutoPlay();
      }
    });
  }

  public goToSlide(index: number): void {
    if (index < 0) index = this.totalSlides - 1;
    if (index >= this.totalSlides) index = 0;

    this.currentIndex = index;

    // Actualizar diapositivas
    this.slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle('hero-slide--active', isActive);
      slide.setAttribute('aria-hidden', (!isActive).toString());
    });

    // Actualizar tabs de la barra inferior
    this.navItems.forEach((item, i) => {
      const isActive = i === index;
      item.classList.toggle('hero-nav__item--active', isActive);
      item.setAttribute('aria-selected', isActive.toString());
    });

    // Actualizar barra vertical e indicador numérico
    if (this.verticalIndicator) {
      const stepPercent = this.totalSlides > 1 ? (index / (this.totalSlides - 1)) * 100 : 0;
      this.verticalIndicator.style.setProperty('--progress-pos', `${stepPercent}%`);
    }

    if (this.verticalNumber) {
      this.verticalNumber.textContent = String(index + 1).padStart(2, '0');
    }

    // Actualizar miniatura del siguiente slide en la tarjeta preview
    const nextIndex = (index + 1) % this.totalSlides;
    const nextSlide = this.slides[nextIndex];
    if (nextSlide) {
      const nextImgSrc = nextSlide.getAttribute('data-img-src') ?? '';
      const nextTitle = nextSlide.getAttribute('data-title') ?? '';
      if (this.previewImg && nextImgSrc) {
        this.previewImg.src = nextImgSrc;
      }
      if (this.previewTitle && nextTitle) {
        this.previewTitle.textContent = nextTitle;
      }
    }
  }

  public next(): void {
    this.goToSlide(this.currentIndex + 1);
  }

  public prev(): void {
    this.goToSlide(this.currentIndex - 1);
  }

  private startAutoPlay(): void {
    this.intervalId = window.setInterval(() => {
      if (!this.isHovered) {
        this.next();
      }
    }, this.duration);
  }

  private resetAutoPlay(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
    this.startAutoPlay();
  }

  public destroy(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }
}

// Inicialización automática cuando el DOM está listo
export function initHeroCarousels(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-hero-carousel]');
  elements.forEach((el) => new HeroCarousel(el));
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initHeroCarousels());
  } else {
    initHeroCarousels();
  }
}
