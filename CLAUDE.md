# Nexo Pro — Claude Context

## Stack
- React 19 + Vite 8, **JSX only** (sin TypeScript, sin Tailwind)
- Framer Motion v12 para animaciones (`useScroll`, `useTransform`, `motion.div`, `AnimatePresence`)
- React Router DOM v7 (`BrowserRouter` en App.jsx, `<a href>` en componentes — NO `<Link>`)
- IBM Plex Mono como fuente principal (local `@font-face`)

## Estructura
```
nexo-app/
  public/           # Fotos de productos (JPG/PNG)
    iphone-reveal.jpg          # Hero scroll reveal desktop
    iphone-reveal-mobile.jpg   # Hero scroll reveal mobile (portrait)
    dji-mic-hero.jpg           # Hero desktop
    dji-mic-hero-mobile.jpg    # Hero mobile (portrait)
  src/
    data/
      products.js              # Catálogo de productos — fuente de verdad
    hooks/
      useBreakpoint.js         # Hook responsive: useBreakpoint(768) → isMobile
    components/
      Navbar.jsx               # Flat full-width, sticky top:0, height 68px
      AnnouncementBar.jsx      # Barra superior, oculta en mobile
      HeroSlider.jsx           # Hero 100svh, imagen diferente mobile/desktop
      IphoneReveal.jsx         # Sticky scroll reveal iPhone 17 Pro (240vh container)
      ProductLines.jsx         # Carrusel de iPhones en landing (solo Apple/iphone)
      ProductSlideshow.jsx     # Slideshow reutilizable con zoom y modo peek mobile
      CategoryBanners.jsx      # 4 banners: flex desktop, 2×2 grid mobile
      ProductCard.jsx          # Card 3:4 con hover swap de imagen
      ProductModal.jsx         # Modal full-screen (spread + detalle + specs)
      LandingProductModal.jsx  # Modal cinematic para landing (no usado actualmente)
      WhatsAppFab.jsx
      Footer.jsx
      Brands.jsx
      WhyUs.jsx
      BrandBanners.jsx
      FeaturedProducts.jsx
    pages/
      Store.jsx     # /tienda — grid + filtros + deep link ?producto=id&color=Color
      Landing.jsx   # / — orden: Hero → IphoneReveal → ProductLines → CategoryBanners → ...
```

## Orden de secciones en Landing.jsx
```
AnnouncementBar → Navbar → HeroSlider → IphoneReveal → ProductLines →
CategoryBanners → FeaturedProducts → BrandBanners → WhyUs → Brands → Footer → WhatsAppFab
```

## Modelo de datos (products.js)

Cada producto tiene `colorVariants[]`, no entradas separadas por color:

```js
{
  id: 'iphone-17-pro',
  brand: 'Apple', category: 'iphone',
  name: 'iPhone 17 Pro',
  tag: 'Nuevo',         // badge en la card
  bgText: '17 PRO',     // texto gigante en spread del modal
  colorVariants: [
    {
      color: 'Silver', hex: '#E3E3E3',
      image: '/iphone-silver-shop.png',    // foto principal (PNG sin fondo)
      hoverImage: '/iphone-silver-hand.jpg',
      images: [...],    // opcional: array de múltiples fotos para el modal
      storage: [{ label: '256 GB', price: 1270 }],
    },
  ],
  specs: [              // opcional: aparece como sección scrollable en modal
    { label: 'Pantalla', value: '6.3" Super Retina XDR · ProMotion 120Hz' },
  ],
}
```

`basePrice(p)` = mínimo de todos los `colorVariants[].storage[].price`

## Convenciones importantes

- **Precios**: formato `REF X,XXX` sin signo de peso ni MXN
- **Tipografía**: texto pequeño (< 13px) → `fontWeight: 600` para legibilidad con monospace
- **Imágenes de tienda**: PNG sin fondo (Photoroom) → flotan sobre cualquier fondo
- **Imágenes lifestyle**: JPEG con contexto (mano, persona, cielo, etc.)
- **overflow-x**: usar `clip` en `#root`, NO `hidden` (rompe `position: sticky`)
- **Navbar sticky**: `top: 0`, height = 68px
- **Filter bar sticky (tienda)**: `top: 68px`
- **Altura segura**: usar `100svh` (no `100vh`) para soporte mobile

## Responsive

`useBreakpoint(768)` devuelve `isMobile` — úsalo para lógica JS.
CSS media queries en `index.css` para clases (`store-grid`, nav visibility, etc.).

## IphoneReveal.jsx

Sticky scroll reveal para iPhone 17 Pro:
- Container: `240vh` (mobile `260vh`), `position: relative`
- Inner sticky: `100svh`, `overflow: hidden`, `background: #000`
- `useScroll` con `offset: ['start start', 'end end']`
- Imagen: `/iphone-reveal.jpg` (desktop), `/iphone-reveal-mobile.jpg` (mobile)
- Texto: "iPhone 17" label teal + "Pro" título grande (`fontWeight: 200`)
- Animaciones: imgScale, imgY, overlayOp, eyeOp, titleOp, infoOp, ctaOp, hintOp

## ProductLines.jsx (Landing)

- Solo muestra iPhones (brand Apple, category iphone)
- Items generados dinámicamente desde `products.js` vía `buildItems()` — un card por colorVariant
- Deduplica imágenes iguales (Silver de Pro y Pro Max no se repiten)
- Link a `/tienda?producto=<id>&color=<color>` para deep link directo al producto+color
- `ProductSlideshow` recibe `lightBg={true}` → sin zoom al hacer click, info aparece abajo

## ProductSlideshow.jsx

Props relevantes:
- `lightBg` (bool): desactiva zoom, adapta colores del info panel a fondo claro, activa modo peek en mobile
- Modo mobile+lightBg: `MobilePeekCarousel` — scroll snap horizontal con IntersectionObserver para auto-seleccionar card centrado

## ProductModal.jsx

Props:
- `product` — objeto completo de products.js
- `onClose`
- `initialColorIdx` (default 0) — abre en ese colorVariant
- `skipSpread` (bool) — salta el spread y va directo al detalle

Dos modos:
1. **Spread** — "ELIGE UN COLOR", iPhones en fila con `bgText`. Solo si `colorVariants.length > 1 && bgText && !skipSpread`
2. **Detalle** — 3 columnas: info izquierda, imagen centro, ghost derecho. Specs scrollables abajo.

## Store.jsx — Deep link

Al entrar con `?producto=iphone-17-pro&color=Silver`:
- Lee params con `URLSearchParams`
- Encuentra el producto y el colorVariant index
- Abre `ProductModal` con `initialColorIdx` y `skipSpread=true` → va directo al detalle del color

## Dev server
```bash
cd nexo-app
npm run dev
```
Puerto: http://localhost:5173

## Paleta de colores
- Fondo oscuro: `#040e0f`
- Cian primario: `#0ea7b7`
- Cian oscuro: `#07626a`
- Texto principal: `#111`
- Fondo tienda: `#f5f5f3`
- Fondo iPhone section: `#f5f5f7`
