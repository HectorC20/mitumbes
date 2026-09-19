/**
 * Cargador inteligente de chunks para secciones diferidas en scroll.
 * Desempaqueta y activa las secciones pesadas solo cuando el usuario
 * hace scroll cerca de ellas, o si navega directamente a un ancla (#id).
 */

export function loadChunk(section: HTMLElement): boolean {
  if (section.dataset.chunkStatus === 'loaded' || section.dataset.chunkStatus === 'loading') {
    return false;
  }

  section.dataset.chunkStatus = 'loading';

  const template = section.querySelector<HTMLTemplateElement>(
    `template[data-chunk-template="${section.dataset.chunkId || section.id}"]`
  );

  if (template) {
    const fragment = template.content.cloneNode(true);

    // Retira el placeholder para que no ocupe espacio adicional
    const placeholder = section.querySelector('.chunk-placeholder');
    if (placeholder) {
      placeholder.remove();
    }

    // Inserta el contenido real en el árbol del DOM
    section.appendChild(fragment);
    template.remove();
  }

  section.dataset.chunkStatus = 'loaded';

  // Notifica a los componentes dependientes (carruseles, pestañas, etc.)
  const eventDetail = { id: section.id, chunkId: section.dataset.chunkId || section.id, element: section };
  if (typeof CustomEvent !== 'undefined') {
    section.dispatchEvent?.(new CustomEvent('chunk:ready', { bubbles: false, detail: eventDetail }));
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('chunk:ready', { detail: eventDetail }));
    }
  }

  return true;
}

export function loadAllChunks(): void {
  const pendingSections = document.querySelectorAll<HTMLElement>(
    '.section-chunk[data-chunk-status="pending"]'
  );
  pendingSections.forEach((section) => loadChunk(section));
}

export function initChunkLoader(): IntersectionObserver | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const pendingSections = document.querySelectorAll<HTMLElement>(
    '.section-chunk[data-chunk-status="pending"]'
  );

  if (pendingSections.length === 0) {
    return null;
  }

  // Fallback si el navegador no soporta IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    loadAllChunks();
    return null;
  }

  // Observer con margen anticipado de 350px para carga imperceptible
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target as HTMLElement;
          obs.unobserve(section);
          loadChunk(section);
        }
      });
    },
    {
      rootMargin: '350px 0px 350px 0px',
      threshold: 0,
    }
  );

  pendingSections.forEach((section) => observer.observe(section));

  // Carga inmediata si la URL contiene un ancla directa (ej. /#destinos o /#categorias)
  if (window.location.hash) {
    const hashId = window.location.hash.replace('#', '');
    const directTarget = document.querySelector<HTMLElement>(
      `#${hashId}.section-chunk[data-chunk-status="pending"]`
    );
    if (directTarget) {
      observer.unobserve(directTarget);
      loadChunk(directTarget);
    }
  }

  // Carga inmediata si el usuario hace clic en un enlace a un ancla interna
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest<HTMLAnchorElement>('a[href*="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;

    const hashId = href.slice(hashIndex + 1);
    if (!hashId) return;

    const targetSection = document.getElementById(hashId);
    if (targetSection && targetSection.classList.contains('section-chunk') && targetSection.dataset.chunkStatus === 'pending') {
      observer.unobserve(targetSection);
      loadChunk(targetSection);
    }
  });

  return observer;
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initChunkLoader());
  } else {
    initChunkLoader();
  }
}
