import { describe, it, expect } from 'vitest';
import { loadChunk } from './chunk-loader';

describe('chunk-loader logic', () => {
  it('desempaqueta el template y actualiza el estado a loaded', () => {
    const appendedNodes: any[] = [];
    let placeholderRemoved = false;
    let templateRemoved = false;

    const mockTemplate = {
      content: {
        cloneNode: () => ({ isFragment: true }),
      },
      remove: () => {
        templateRemoved = true;
      },
    };

    const mockPlaceholder = {
      remove: () => {
        placeholderRemoved = true;
      },
    };

    const eventsFired: string[] = [];

    const mockSection: any = {
      id: 'destinos',
      dataset: {
        chunkId: 'destinos',
        chunkStatus: 'pending',
      },
      querySelector: (selector: string) => {
        if (selector.includes('template')) return mockTemplate;
        if (selector.includes('chunk-placeholder')) return mockPlaceholder;
        return null;
      },
      appendChild: (node: any) => {
        appendedNodes.push(node);
      },
      dispatchEvent: (event: any) => {
        eventsFired.push(event.type);
        return true;
      },
    };

    const loaded = loadChunk(mockSection);

    expect(loaded).toBe(true);
    expect(mockSection.dataset.chunkStatus).toBe('loaded');
    expect(placeholderRemoved).toBe(true);
    expect(templateRemoved).toBe(true);
    expect(appendedNodes.length).toBe(1);
    expect(eventsFired).toContain('chunk:ready');
  });

  it('ignora chunks ya cargados', () => {
    const mockSection: any = {
      id: 'destinos',
      dataset: {
        chunkId: 'destinos',
        chunkStatus: 'loaded',
      },
    };

    const loaded = loadChunk(mockSection);
    expect(loaded).toBe(false);
  });
});
