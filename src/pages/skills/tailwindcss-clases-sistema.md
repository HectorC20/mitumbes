# Tailwind CSS y el sistema de clases de JRCM Abogados

> Cómo funciona Tailwind en este proyecto: **no** se inyectan estilos directos en el HTML. Todo el diseño vive en clases semánticas jerárquicas definidas en CSS, y Tailwind se usa internamente (con `@apply`) para construir esas clases.

## 1. Idea central

En este sitio el HTML **describe qué es cada cosa**, nunca **cómo se ve**. Por eso está prohibido:

- El atributo `style=""` en elementos HTML.
- Bloques `<style>` dentro de páginas o componentes.
- Utilidades de Tailwind (colores, tamaños, bordes, tipografías…) escritas directamente en el atributo `class`.

En su lugar, el diseño se expresa con **clases semánticas** definidas en CSS (`section`, `cta-banner`, `btn btn--primary`…). Dentro de esas clases, Tailwind se usa con la directiva `@apply` para componer las utilidades que forman el estilo. El resultado es un sistema jerárquico:

```
Tokens (@theme)  →  utilidades Tailwind  →  @apply  →  clase semántica  →  HTML
```

Las utilidades nunca llegan al HTML: se "absorben" dentro de las clases CSS. Esto hace que el marcado sea legible, consistente y fácil de mantener.

## 2. Cómo está montado Tailwind

- **Versión 4** (vía el plugin `@tailwindcss/vite` en [astro.config.mjs](../../astro.config.mjs)). Tailwind escanea los fuentes y genera solo las utilidades que se usan en `@apply`.
- El punto de entrada es [global.css](../../src/styles/global.css), que arranca con:

```css
@import "tailwindcss";
@import "@fontsource-variable/inter";
@import "@fontsource-variable/playfair-display";
```

- **Tokens de diseño** en `@theme` (paleta institucional y tipografías). Son la **única** fuente de colores y familias del sitio:

```css
@theme {
  --color-primary: #b58c5a;   /* Acentos, sellos, CTAs */
  --color-secondary: #003366; /* Fondos institucionales, títulos */
  --color-white: #ffffff;
  --color-black: #000000;

  --font-sans: "Inter Variable", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-display: "Playfair Display Variable", Georgia, "Times New Roman", serif;
}
```

Estos tokens generan utilidades con nombre propio (`bg-primary`, `text-secondary`, `font-display`, etc.). No se permiten valores arbitrarios de color/fuente/tamaño fuera de `global.css` (reglas completas en [css-restrictions.md](architecture/css-restrictions.md)).

## 3. Las capas del CSS

### 3.1 `@layer base` — estilos de base

Reset y estilos globales de elementos. Viven en `global.css`:

```css
@layer base {
  body {
    @apply bg-white font-sans text-black antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-display text-secondary;
  }
}
```

### 3.2 `@layer components` — CSS maestro (clases compartidas)

Todas las clases reutilizables del sitio: layout, tipografía, botones, tarjetas, navegación, footer, formularios, WhatsApp float, share bar… Se definen **una sola vez** en [global.css](../../src/styles/global.css) y se componen con `@apply`:

```css
@layer components {
  .btn {
    @apply inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3
           font-sans text-sm font-semibold uppercase tracking-wider
           transition-colors duration-200 focus-visible:outline-2
           focus-visible:outline-offset-2 focus-visible:outline-secondary;
  }

  .btn--primary {
    @apply bg-primary text-white hover:bg-secondary;
  }

  .section {
    @apply py-16 md:py-20 lg:py-24;
  }

  .container-page {
    @apply mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8;
  }
}
```

### 3.3 `@reference` — CSS de página (clases exclusivas)

Cada página puede tener su propio archivo en `src/styles/pages/<página>.css`. El primer elemento es **obligatorio**:

```css
/* src/styles/pages/home.css */
@reference "../global.css";
```

`@reference` le dice a Tailwind que **herede** los tokens y utilidades del maestro **sin duplicarlos en el CSS final**. A partir de ahí se definen las clases exclusivas de esa página, con el prefijo de la página (`hero-`, `feature-`, `blog-search__`…):

```css
.hero-title {
  @apply mt-3 max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl;
}

.blog-search__tab[aria-pressed="true"] {
  @apply border-primary bg-primary text-white;
}
```

## 4. Jerarquía de clases: convención de nombres

Las clases siguen un esquema jerárquico y predecible:

| Nivel | Ejemplo | Dónde vive |
|---|---|---|
| Contenedor/layout | `.section`, `.container-page` | maestro |
| Componente | `.btn`, `.card`, `.cta-banner` | maestro |
| Elemento (BEM) | `.cta-banner__title`, `.nav-shell__inner` | maestro o página |
| Variante (BEM) | `.btn--primary`, `.context-nav__link--active` | maestro |
| Estado | `hover:`, `focus-visible:`, `[open]`, `[aria-pressed="true"]` | dentro de la clase CSS |

Ejemplo real de uso en el HTML (componente [CtaBanner.astro](../../src/components/sections/CtaBanner.astro)): el marcado solo nombra clases semánticas, sin una sola utilidad:

```html
<section class="section">
  <div class="container-page">
    <div class="cta-banner">
      <div class="cta-banner__content">
        <p class="eyebrow">…</p>
        <h2 class="cta-banner__title">…</h2>
        <p class="cta-banner__text">…</p>
      </div>
      <a class="btn btn--secondary cta-banner__button">…</a>
    </div>
  </div>
</section>
```

Todo el aspecto visual de esos elementos está definido en [global.css](../../src/styles/global.css), no aquí.

## 5. Estados, responsividad y lógica

- **Estados** (`hover`, `focus-visible`, `active`) y **breakpoints** (`sm`, `md`, `lg`) se escriben **dentro** de las clases CSS, con los prefijos de Tailwind: `hover:bg-secondary`, `md:py-20`, `focus-visible:outline-secondary`.
- **Variantes de estado por atributo**: selectores como `[open]`, `[aria-pressed="true"]` o `.is-open` se combinan con `@apply` dentro del CSS (ver `.wa-float.is-open .wa-float__popup` y `.blog-search__tab[aria-pressed="true"]`).
- **Lógica condicional en el HTML**: se permite `class:list` para alternar entre **clases del sistema** (p. ej. `btn--primary` vs `btn--outline`, o `nav-link--active`), nunca para insertar utilidades.
- **Modificador `!`**: cuando una clase de página debe ganarle a una del maestro, se usa el sufijo de importancia de Tailwind dentro del `@apply` (`.faq-home__summary { @apply text-white!; }`), manteniendo el cambio en el CSS en lugar de en el HTML.

## 6. Flujo para agregar diseño nuevo

1. Revisar si ya existe una clase del maestro que cubra la necesidad.
2. Si no existe, crear la clase en `global.css` (si es compartida) o en el CSS de página (si es exclusiva), componiéndola con `@apply`.
3. Referenciar la clase desde el HTML. **Nunca** pegar la combinación completa de utilidades en el HTML.
4. Si una página repite la misma combinación de utilidades, **esa combinación se convierte en una clase del maestro** (DRY).

## 7. Beneficios del enfoque

- **Consistencia**: la paleta y la tipografía salen de un solo lugar (`@theme`); cambiar `--color-primary` actualiza todo el sitio.
- **HTML limpio**: el marcado describe semántica; los estilos son responsabilidad exclusiva del CSS.
- **DRY**: las combinaciones repetidas se extraen a clases reutilizables en vez de repetirse.
- **Mantenible**: estados y responsividad viven junto a la clase que los necesita.
- **CSS final pequeño**: Tailwind solo emite las utilidades realmente usadas por `@apply`.

## 8. Referencias

- Restricciones normativas completas: [css-restrictions.md](architecture/css-restrictions.md)
- CSS maestro (tokens + clases compartidas): [global.css](../../src/styles/global.css)
- CSS de página (ejemplos): [home.css](../../src/styles/pages/home.css), [blog.css](../../src/styles/pages/blog.css)
- Integración con Vite/Astro: [astro.config.mjs](../../astro.config.mjs)
