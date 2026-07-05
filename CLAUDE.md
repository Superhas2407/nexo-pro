# PULSE — Claude Context

## Stack
- React 19 + Vite 8, **JSX only** (sin TypeScript, sin Tailwind)
- Framer Motion v12 para animaciones (`useScroll`, `useTransform`, `motion.div`, `AnimatePresence`)
- React Router DOM v7 (`BrowserRouter` en App.jsx, `<a href>` en componentes — NO `<Link>`)
- IBM Plex Mono como fuente principal (local `@font-face`)

## Repositorio y Deploy
- GitHub: `https://github.com/Superhas2407/nexo-pro`
- Deploy: Vercel (conectado al repo)
- `vercel.json` en raíz con rewrites para SPA routing

## Estructura
```
nexo-app/
  public/           # Fotos de productos (JPG/PNG)
    iphone-reveal.jpg              # Scroll reveal iPhone desktop
    iphone-reveal-mobile.jpg       # Scroll reveal iPhone mobile
    dji-reveal.jpg                 # Scroll reveal DJI desktop
    dji-reveal-mobile.jpg          # Scroll reveal DJI mobile
    iphone-silver-shop.webp        # Catálogo (fondo transparente → WebP)
    iphone-orange-shop.webp
    iphone-deepblue-shop.webp
    dji-osmo7-shop.webp
    dji-osmo7p-shop.webp
    dji-osmo8-shop.webp
    dji-mic2-shop.webp             # DJI Mic Mini
    shokz-openrun2-shop.webp       # Shokz OpenRun Pro 2
    boya-wm3-shop.webp             # BOYA Mini 2
    dji-osmo7-hand.webp            # Lifestyle hover
    dji-osmo7p-hand.webp
    dji-osmo8-hand.webp
    iphone-silver-hand.webp
    iphone-orange-hand.webp
    iphone-deepblue-hand.webp
    dji-mic2-hand.webp
    shokz-openrun2-hand.webp
    boya-wm3-hand.webp
  src/
    data/
      products.js              # Catálogo de productos — fuente de verdad
    hooks/
      useBreakpoint.js         # useBreakpoint(768) → isMobile bool
    components/
      Navbar.jsx               # Sticky top:0, height 68px. Tiene SearchOverlay + SidePanel (carrito/favoritos)
      AnnouncementBar.jsx      # Barra superior, oculta en mobile
      HeroSlider.jsx           # Hero 100svh
      IphoneReveal.jsx         # Sticky scroll reveal iPhone 17 Pro
      DjiReveal.jsx            # Sticky scroll reveal DJI Osmo Mobile
      ProductLines.jsx         # Carrusel iPhones en landing (lightBg=true)
      DjiLines.jsx             # Carrusel DJI en landing (lightBg=true, darkTheme=true)
      ProductSlideshow.jsx     # Slideshow reutilizable
      FeaturedProducts.jsx     # "Lo más vendido" con tabs, usa products.js real
      CategoryBanners.jsx      # 4 banners de categoría
      ProductCard.jsx          # Card 3:4 con hover swap
      ProductModal.jsx         # Modal full-screen (spread + detalle + specs)
      LandingProductModal.jsx  # No usado actualmente
      WhatsAppFab.jsx
      Footer.jsx
      Brands.jsx
      WhyUs.jsx
      BrandBanners.jsx
    pages/
      Store.jsx     # /tienda — grid + filtros + deep link ?producto=id&color=Color
      Landing.jsx   # /
```

## Orden de secciones en Landing.jsx
```
AnnouncementBar → Navbar → HeroSlider → IphoneReveal → ProductLines →
DjiReveal → DjiLines → CategoryShowcase → FeaturedProducts →
BrandBanners → WhyUs → Brands → Footer → WhatsAppFab
```

## Modelo de datos (products.js)

```js
{
  id: 'iphone-17-pro',
  brand: 'Apple', category: 'iphone',
  name: 'iPhone 17 Pro',
  tag: 'Nuevo',         // badge: 'Nuevo' | 'Pro' | 'Popular' | 'Exclusivo' | null
  bgText: '17 PRO',     // texto gigante en spread del modal (null = sin spread)
  colorVariants: [
    {
      color: 'Silver', hex: '#E3E3E3',
      image: '/iphone-silver-shop.png',    // PNG sin fondo
      hoverImage: '/iphone-silver-hand.jpg',
      images: [...],    // opcional: galería en modal (solo si > 1 foto real)
      storage: [{ label: '256 GB', price: 1270 }],
    },
  ],
  specs: [{ label: 'Pantalla', value: '6.3"...' }],  // opcional
}
```

`basePrice(p)` = mínimo de todos los `colorVariants[].storage[].price`

## Convenciones importantes

- **Precios**: formato `REF X,XXX` — sin $, sin MXN, sin Bs
- **Tipografía**: texto < 13px → `fontWeight: 600` para legibilidad con monospace
- **Imágenes**: todas en `.webp`. Catálogo (sin fondo) llevan `-shop.` en el nombre → `objectFit: 'contain'`. Lifestyle llevan `-hand.` → `objectFit: 'cover'`. Detección por nombre, NO por extensión: `image.includes('-shop.')`
- **overflow-x**: usar `clip` en `#root`, NO `hidden` (rompe `position: sticky`)
- **Navbar**: `top: 0`, height = 68px
- **Filter bar (tienda)**: `top: 68px`
- **Altura**: usar `100svh` (no `100vh`)
- **WhatsApp**: número `584223194044`
- **Touch targets**: mínimo 44×44px. Color dots usan hit area de 44px con margen negativo para solapamiento — dot visual 16px centrado
- **Nuevas imágenes**: subir como `.webp`. Nombrar `producto-shop.webp` (catálogo) o `producto-hand.webp` (lifestyle)

## Navbar.jsx

Contiene cuatro overlays internos:
- `SearchOverlay` — busca en tiempo real sobre `products.js`, chips de populares
- `SidePanel` carrito — panel flotante debajo del pill, CTA a WhatsApp
- `SidePanel` favoritos — panel flotante debajo del pill, CTA a /tienda
- Menú mobile — panel flotante con categorías + thumbnails (Nomad style)

### SidePanel — comportamiento clave
- **Posicionamiento**: `pillRef.getBoundingClientRect().bottom + 8` capturado UNA vez al abrir (no se recalcula en scroll)
- **Mobile** (`window.innerWidth < 768`): `left: 16, right: 16` (centrado, como el menú hamburguesa)
- **Desktop**: `right: 24, width: 340`
- `maxHeight: calc(100svh - panelTop - 16px)` — altura natural, no forzada a pantalla completa
- `borderRadius: 20`, animación fade+slide down (no slide lateral)
- Body scroll se bloquea al abrir: `document.body.style.overflow = 'hidden'`

### Cart empty state — CartRecs
- Carrusel horizontal edge-to-edge con `paddingLeft: 20, paddingRight: 20`
- Cards `flex: '0 0 120px'`, `aspectRatio: '3/4'`, fondo blanco con `padding: 8`, `border: 1.5px solid #e8e8e8`
- Drag-to-scroll con mouse (mousedown/mousemove/mouseup)
- Dots de paginación que siguen el scroll
- Backdrop gris `#f5f5f3` en cart con items, cards blancas con `borderRadius: 14, boxShadow`

### Cart con items — diseño Nomad
- Fondo del área de items: `#f5f5f3`
- Cada item: tarjeta blanca `borderRadius: 14, padding: 12, boxShadow`
- Imagen: 64×64px, `borderRadius: 10`
- Nombre: `fontWeight: 700, fontSize: 14`
- Subtítulo: `fontWeight: 500, fontSize: 12, color: #888`
- Qty: pill con borde `border: 1px solid #e5e5e5, borderRadius: 99`
- Eliminar: ícono trash SVG arriba derecha
- Footer: `background: #fff`, "Subtotal" `fontWeight: 700`, botón negro `borderRadius: 99`

### Menú hamburguesa mobile
- Panel flotante: `position: fixed`, `top: getPillBottom()`, `left: 16, right: 16`
- `borderRadius: 20`, `background: #f2f2f2`, `maxHeight: calc(100svh - 96px)`
- Categorías con thumbnail 56×56px + label bold + subtítulo
- Animación fade+slide down con AnimatePresence
- Body scroll bloqueado al abrir

### pillRef vs headerRef
- `headerRef` → en el `<header>` element (incluye padding 14px arriba y abajo)
- `pillRef` → en el div del pill (altura exacta del pill)
- Siempre usar `pillRef` para posicionar dropdowns — evita que el announcement bar desplace el panel

## IphoneReveal.jsx / DjiReveal.jsx

Mismo patrón sticky scroll reveal:
- Container: `240vh` desktop / `260vh` mobile, `position: relative`
- Inner sticky: `100svh`, `overflow: hidden`, `background: #000`
- `useScroll` con `offset: ['start start', 'end end']`
- **Mobile**: sin zoom (imgScale fijo en 1), todo el contenido visible desde el inicio (opacidades en 1)
- **Desktop**: animaciones progresivas con scroll

## ProductLines.jsx / DjiLines.jsx

- `buildItems()` genera items desde `products.js` — un card por colorVariant
- Deduplica imágenes (Set de paths usados)
- Link a `/tienda?producto=<id>&color=<color>` para deep link
- `ProductSlideshow` props: `lightBg={true}` (no zoom, no scroll block) + `darkTheme` para colores

## ProductSlideshow.jsx

Props:
- `lightBg` — comportamiento landing: no zoom, no scroll capture, peek mobile
- `darkTheme` — colores blancos (para secciones oscuras como DjiLines)
- `imageFit` — `'cover'` (default) o `'contain'` (para PNG de gimbals)
- Mobile + lightBg → `MobilePeekCarousel` (scroll snap + IntersectionObserver)

## ProductModal.jsx

Props:
- `initialColorIdx` (default 0)
- `skipSpread` (bool) — omite el spread, va directo a detalle del color

Spread (selección de color):
- Layout split-screen: cada color ocupa una mitad con fondo teñido `color-mix(in srgb, hex 10%, white)`
- `whileHover={{ flex: 1.18 }}` expande la mitad al hacer hover
- bgText posicionado en `top: 16%` de cada mitad, `overflow: hidden` clipea el texto al panel
- Tap hint animado (`y: [0,-4,0]`) solo en mobile
- Cerrar con Escape, botón ×, o browser back (History API `pushState` + `popstate`)

Galería en modal: solo muestra thumbnails si `colorVariant.images?.length > 1`

## Store.jsx — Deep link y selección

`?producto=iphone-17-pro&color=Silver` → abre ProductModal directo al color con `skipSpread=true`

Desde cards en tienda: siempre abre con `skipSpread=true` y `colorIdx` del color seleccionado en la card.

## FeaturedProducts.jsx

- Usa `products.js` real (no datos hardcoded)
- Tabs: "Más populares" y "Nuevos" — cada tab define un array de product IDs
- Cards linkean a `/tienda?producto=<id>`
- Hover swap: catálogo → lifestyle

## ProductCard.jsx (tienda)

Layout Nomad-style:
- Nombre bold + subtítulo `Brand · Color`
- Precio actualizado al storage seleccionado
- **Color dots interactivos** al fondo: hit area 44px mobile / 26px desktop con solapamiento por `marginRight: -overlap` — dot visual 16px / 13px. Seleccionado muestra `outline: 2px solid #111`
- **Storage pills** (solo si hay múltiples): pills con `minHeight: 44px` en mobile, se ponen negras al seleccionar
- Al hacer click en la card: abre modal con el color/storage seleccionado, `skipSpread=true`

## Dev server
```bash
cd nexo-app && npm run dev
```
Puerto: http://localhost:5173

## Paleta de colores (PULSE brand)
- Pulse Blue: `#0057FF` (acento principal — reemplaza el antiguo cyan)
- Pulse Blue hover: `#337BFF`
- Ink: `#0A0A0A` (texto oscuro en logo)
- Paper: `#FFFFFF`
- Texto principal: `#111`
- Fondo oscuro: `#040e0f`
- Fondo tienda: `#f5f5f3`
- Fondo iPhone section: `#f5f5f7`
- Fondo DJI section: `#0d0d0f`

## Logos PULSE (en public/)
- `logo-horizontal-primary.svg` — PULSE wordmark oscuro + punto azul (fondos claros)
- `logo-horizontal-dark.svg` — PULSE wordmark blanco + punto azul (fondos oscuros)
- `favicon-32.svg` — favicon
- `icon-mark-blue-on-transparent.svg` — solo el marcador azul
- Logo.jsx usa SVG inline con prop `variant`: `'color'` (oscuro) o `'white'` (blanco)
