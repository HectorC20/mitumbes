# Plan: Búsqueda de artículos/noticias en el blog + conexión SEO + MCP de analytics

**Proyecto:** jrcm-web (Astro 7, estático, desplegado en Vercel)
**Fecha:** 2026-08-14
**Estado:** Implementado y verificado

## 1. Objetivo

1. **Búsqueda de artículos/noticias** dentro del blog (`/blog/`, `/en/blog/`, `/pt/blog/`): búsqueda por texto, filtro por tipo de contenido (artículo / noticia / tema) y por categoría, con resultados en vivo, sin JS no se rompe (progressive enhancement) y con estado persistido en la URL.
2. **Artículos y noticias diferenciados**: el campo `contentType` (`article | news | topic`) existe en el schema y en el MCP, pero la UI no lo usa. Ahora se distingue visualmente y se filtra.
3. **Conectado con el SEO**: diccionario de keywords (`src/shared/constants/seo-keywords.ts`) alimenta las sugerencias de búsqueda; schema `SearchAction` en el `WebSite` global; `NewsArticle` para noticias; breadcrumbs y "artículos relacionados" (modelo de topic clusters).
4. **MCP para saber cuántos usuarios ingresan**: tools de analytics GA4 (Data API) dentro del servidor MCP local existente, autenticados con la misma `MCP_API_KEY`; credenciales de Google en `.env`.

## 2. Referencias web consultadas

- HubSpot — Blog SEO (topic clusters, long-tail keywords, actualizar contenido): https://blog.hubspot.com/marketing/blog-search-engine-optimization
- Yoast — Schema piece SearchAction (estructura `potentialAction`/`query-input`): https://developer.yoast.com/features/schema/pieces/searchaction/
- Google — GA4 Data API v1 (`runReport`, `runRealtimeReport`, service account): https://developers.google.com/analytics/devguides/reporting/data/v1/basics
- mcp-ga4 / GA4 MCP servers (patrón: service account + `GA4_PROPERTY_ID`): https://github.com/devli13/mcp-ga4
- Nota: Google retiró el rich result "sitelinks search box" (nov 2024), pero `SearchAction` sigue siendo una señal válida de capacidad de búsqueda interna y se recomienda (Yoast lo mantiene).

## 3. Decisiones de diseño

### Búsqueda (100% estática, client-side)
- Se **embebe un índice JSON** de los posts publicados en el HTML (`<script type="application/json">`). Sin fetch, sin servidor, funciona en el deploy estático.
- El grid de tarjetas se renderiza en SSR (SEO sin JS). El script de búsqueda **filtra el DOM** por atributos `data-*`; con JS desactivado la página sigue mostrando todos los posts.
- Estado en la URL: `?q=`, `?tipo=`, `?categoria=` vía `history.replaceState`; el `<form>` es GET real hacia `/blog/?q=...`.
- Los chips de "búsquedas populares" salen del diccionario real de keywords (priority `core`), conectando búsqueda y SEO.
- Tipos de contenido: se muestran pestañas solo para los tipos que existen en el índice (article/news/topic).

### SEO
- `webSiteJsonLd` gana `potentialAction: SearchAction` → `target: <site>/blog/?q={search_term_string}` (se emite en todas las páginas).
- `BlogPost` usa `NewsArticle` cuando `contentType === 'news'` (mejor semántica para noticias).
- Breadcrumbs en el post (helper existente `breadcrumbJsonLd`).
- "Artículos relacionados" (misma categoría, máx. 3) → refuerza topic clusters y el interlinking.

### Analytics (MCP local, no desplegado)
- SDK oficial `@google-analytics/data` (devDependency; solo se ejecuta con `pnpm mcp` en local).
- Credenciales por service account en `.env`: `GA4_PROPERTY_ID`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`. Sin credenciales, los tools responden un mensaje claro "no configurado".
- Tools nuevos: `get_analytics_summary` (usuarios activos, sesiones, pageviews, nuevos usuarios en un rango), `get_realtime_users` (usuarios activos ahora, Realtime API), `get_top_pages` (páginas más vistas).
- El sitio puede medir instalando la etiqueta gtag con `PUBLIC_GA4_ID` en `.env` (opcional; si no existe, no se inyecta nada).

## 4. Fases y archivos

### Fase A — Búsqueda y tipos de contenido (frontend)
| Archivo | Cambio |
|---|---|
| `src/content.config.ts` | Schema `blogMeta`: campo `search` (textos localizados) y `post.relatedTitle` |
| `src/content/blog-meta/index.md` | Textos de búsqueda es/en/pt + `relatedTitle` |
| `src/components/blog/BlogSearch.astro` (nuevo) | Índice JSON embebido, form de búsqueda, tabs de tipo, select de categoría, chips de keywords, contador y estado vacío; script client-side |
| `src/components/blog/BlogIndex.astro` | Usa `BlogSearch` (reemplaza el grid manual), pasa keywords core |
| `src/styles/pages/blog.css` | Estilos de búsqueda, tabs, badges de tipo, contador, estado vacío |

### Fase B — SEO
| Archivo | Cambio |
|---|---|
| `src/lib/seo/jsonld.ts` | `webSiteJsonLd` con `potentialAction` (SearchAction) |
| `src/components/layout/Layout.astro` | Pasa `searchTarget` a `webSiteJsonLd`; inyecta gtag si `PUBLIC_GA4_ID` |
| `src/components/blog/BlogPost.astro` | `NewsArticle` para noticias; breadcrumbs; "artículos relacionados" |
| `src/pages/blog/[slug].astro` (+ en/pt) | Pasa `related` al componente |
| `src/shared/content/posts.ts` | Helper `getRelatedPosts(post, limit)` |

### Fase C — MCP de analytics
| Archivo | Cambio |
|---|---|
| `package.json` | `pnpm add -D @google-analytics/data` |
| `mcp-server/lib/analytics.ts` (nuevo) | Cliente GA4 Data API: summary, realtime, top pages |
| `mcp-server/index.ts` | Tools `get_analytics_summary`, `get_realtime_users`, `get_top_pages` |
| `.env` / `.env.example` | `GA4_PROPERTY_ID`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `PUBLIC_GA4_ID` |

### Fase D — Verificación
- `pnpm build` sin errores (mcp-server queda fuera del build).
- `tools/list` del MCP con los 3 tools nuevos; `get_analytics_summary` sin credenciales → mensaje de "no configurado".
- Inspección del HTML generado: índice JSON embebido, form `role="search"`, `SearchAction`, gtag (si `PUBLIC_GA4_ID`).

## 5. Alcance y seguridad
- El MCP sigue siendo **local** (`pnpm mcp`), no desplegado ni mapeable; credenciales de Google solo en `.env` (ignorado por git).
- El deploy de Vercel no ejecuta `mcp-server` ni usa las credenciales; el sitio queda 100% estático.
- Sin JS el blog sigue siendo navegable (el grid es SSR).

## 6. Pendiente del usuario (configuración real de datos)
1. Crear service account en Google Cloud con rol Viewer sobre la propiedad GA4 y habilitar la Analytics Data API; pegar `GA4_PROPERTY_ID`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY` en `.env`.
2. Si aún no hay datos, crear la propiedad GA4 y poner `PUBLIC_GA4_ID` (`G-XXXXXXX`) en `.env` para que el sitio comience a medir.
