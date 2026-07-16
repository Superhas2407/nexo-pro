export const products = [
  // ── iPhone 17 Pro — un solo producto, 2 colores ──────────
  {
    id: 'iphone-17-pro',
    brand: 'Apple', category: 'iphone',
    name: 'iPhone 17 Pro',
    tag: 'Nuevo',
    bgText: '17 PRO',
    colorVariants: [
      {
        color: 'Silver', hex: '#E3E3E3',
        image: '/iphone-silver-shop.webp',
        hoverImage: '/iphone-silver-hand.webp',
        storage: [{ label: '256 GB', price: 1270 }],
      },
      {
        color: 'Orange', hex: '#FF6B35',
        image: '/iphone-orange-shop.webp',
        hoverImage: '/iphone-orange-hand.webp',
        storage: [
          { label: '512 GB', price: 1620 },
          { label: '1 TB',   price: 1790 },
        ],
      },
    ],
    specs: [
      { label: 'Pantalla',          value: '6.3" Super Retina XDR · ProMotion 120Hz' },
      { label: 'Chip',              value: 'A19 Pro · 6-core GPU · Neural Engine' },
      { label: 'Cámara principal',  value: '48MP Pro Fusion · 5× Zoom óptico' },
      { label: 'Ultra Wide',        value: '48MP Fusion Ultra Wide' },
      { label: 'Teleobjetivo',      value: '48MP Fusion Telephoto' },
      { label: 'Video',             value: '4K 120fps · ProRes · Dual Capture' },
      { label: 'Batería',           value: 'Hasta 33 hrs reproducción de video' },
      { label: 'Carga',             value: 'MagSafe 30W · USB-C 45W' },
      { label: 'Conectividad',      value: 'eSIM · Wi-Fi 7 · Bluetooth 5.3 · USB-C' },
      { label: 'Resistencia',       value: 'IP68 · 6 metros · 30 minutos' },
      { label: 'Seguridad',         value: 'Face ID' },
      { label: 'Apple Intelligence',value: 'Incluido' },
    ],
  },

  // ── iPhone 17 Pro Max — un solo producto, 2 colores ──────
  {
    id: 'iphone-17-pro-max',
    brand: 'Apple', category: 'iphone',
    name: 'iPhone 17 Pro Max',
    tag: 'Pro',
    bgText: '17 PRO MAX',
    colorVariants: [
      {
        color: 'Silver Blue', hex: '#A8C4D4',
        image: '/iphone-deepblue-shop.webp',
        hoverImage: '/iphone-deepblue-hand.webp',
        storage: [{ label: '256 GB', price: 1290 }],
      },
      {
        color: 'Silver', hex: '#E3E3E3',
        image: '/iphone-silver-shop.webp',
        hoverImage: '/iphone-silver-hand.webp',
        storage: [
          { label: '512 GB', price: 1590 },
          { label: '1 TB',   price: 1790 },
        ],
      },
    ],
    specs: [
      { label: 'Pantalla',          value: '6.9" Super Retina XDR · ProMotion 120Hz' },
      { label: 'Chip',              value: 'A19 Pro · 6-core GPU · Neural Engine' },
      { label: 'Cámara principal',  value: '48MP Pro Fusion · 5× Zoom óptico' },
      { label: 'Ultra Wide',        value: '48MP Fusion Ultra Wide' },
      { label: 'Teleobjetivo',      value: '48MP Fusion Telephoto' },
      { label: 'Video',             value: '4K 120fps · ProRes · Dual Capture' },
      { label: 'Batería',           value: 'Hasta 39 hrs reproducción de video' },
      { label: 'Carga',             value: 'MagSafe 30W · USB-C 45W' },
      { label: 'Conectividad',      value: 'eSIM · Wi-Fi 7 · Bluetooth 5.3 · USB-C' },
      { label: 'Resistencia',       value: 'IP68 · 6 metros · 30 minutos' },
      { label: 'Seguridad',         value: 'Face ID' },
      { label: 'Apple Intelligence',value: 'Incluido' },
    ],
  },

  // ── AirPods Pro 3 ─────────────────────────────────────────
  {
    id: 'airpods-pro-3',
    brand: 'Apple', category: 'audio',
    name: 'AirPods Pro 3',
    tag: 'Nuevo',
    bgText: null,
    colorVariants: [
      {
        color: null, hex: '#f5f5f0',
        image: '/airpods-shop-1.webp', hoverImage: '/airpods-hand.webp',
        images: ['/airpods-shop-1.webp', '/airpods-shop-2.webp', '/airpods-hand.webp'],
        storage: [{ label: null, price: 270 }],
        specs: [
          { label: 'Chip',              value: 'H2 · cancelación activa de ruido' },
          { label: 'Transparencia',     value: 'Modo Transparencia Adaptativo' },
          { label: 'Audio espacial',    value: 'Dinámico con seguimiento de cabeza' },
          { label: 'Batería',           value: 'Hasta 6 hrs (ANC activado)' },
          { label: 'Con estuche',       value: 'Hasta 30 hrs en total' },
          { label: 'Carga',             value: 'USB-C · MagSafe · Qi2 · Apple Watch' },
          { label: 'Resistencia',       value: 'IP54 audífonos y estuche' },
          { label: 'Conectividad',      value: 'Bluetooth 5.3 · iCloud pairing' },
          { label: 'Controles',         value: 'Stem presionable · deslizar volumen' },
          { label: 'Detección',         value: 'Sensor de piel · detección en oreja' },
        ],
      },
    ],
  },

  // ── DJI Osmo Mobile 7 ─────────────────────────────────────
  {
    id: 'dji-om7',
    brand: 'DJI', category: 'dji-estab',
    name: 'DJI Osmo Mobile 7',
    tag: null, bgText: null,
    colorVariants: [{
      color: null, hex: '#2a2a2a',
      image: '/dji-osmo7-shop.webp',
      hoverImage: '/dji-osmo7-hand.webp',
      storage: [{ label: null, price: 120 }],
    }],
    specs: [
      { label: 'Estabilización',  value: '3 ejes · ±0.01° precisión' },
      { label: 'Carga máx.',      value: '300 g' },
      { label: 'Batería',         value: '950 mAh · hasta 10 hrs' },
      { label: 'Seguimiento',     value: 'ActiveTrack 7.0 · sin Bluetooth' },
      { label: 'Modos',           value: 'Panorama · Timelapse · Hyperlapse' },
      { label: 'App',             value: 'DJI Mimo · iOS y Android' },
      { label: 'Plegado',         value: 'Compacto · cabe en bolsillo' },
      { label: 'Conectividad',    value: 'Bluetooth 5.1' },
    ],
  },

  // ── DJI Osmo Mobile 7P ────────────────────────────────────
  {
    id: 'dji-om7p',
    brand: 'DJI', category: 'dji-estab',
    name: 'DJI Osmo Mobile 7P',
    tag: 'Popular', bgText: null,
    colorVariants: [{
      color: null, hex: '#2a2a2a',
      image: '/dji-osmo7p-shop.webp',
      hoverImage: '/dji-osmo7p-hand.webp',
      storage: [{ label: null, price: 180 }],
    }],
    specs: [
      { label: 'Estabilización',  value: '3 ejes · ±0.01° precisión' },
      { label: 'Carga máx.',      value: '300 g' },
      { label: 'Extensión',       value: 'Brazo extensible hasta 215 mm' },
      { label: 'Batería',         value: '1.200 mAh · hasta 10 hrs' },
      { label: 'Seguimiento',     value: 'ActiveTrack 7.0 · sin Bluetooth' },
      { label: 'Modos',           value: 'Panorama · Timelapse · Hyperlapse' },
      { label: 'App',             value: 'DJI Mimo · iOS y Android' },
      { label: 'Conectividad',    value: 'Bluetooth 5.1' },
    ],
  },

  // ── DJI Osmo Mobile 8 ─────────────────────────────────────
  {
    id: 'dji-om8',
    brand: 'DJI', category: 'dji-estab',
    name: 'DJI Osmo Mobile 8',
    tag: 'Nuevo', bgText: null,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/dji-osmo8-shop.webp',
      hoverImage: '/dji-osmo8-hand.webp',
      storage: [{ label: null, price: 210 }],
    }],
    specs: [
      { label: 'Estabilización',  value: '3 ejes · motor mejorado gen 2' },
      { label: 'Carga máx.',      value: '300 g' },
      { label: 'Batería',         value: '1.500 mAh · hasta 12 hrs' },
      { label: 'Seguimiento',     value: 'ActiveTrack 8.0 · sin Bluetooth' },
      { label: 'Pantalla',        value: 'Mini LCD de estado integrada' },
      { label: 'Modos',           value: 'Panorama · Timelapse · Hyperlapse · SpinShot' },
      { label: 'App',             value: 'DJI Mimo · iOS y Android' },
      { label: 'Conectividad',    value: 'Bluetooth 5.2' },
    ],
  },

  // ── DJI Mic Mini ──────────────────────────────────────────
  {
    id: 'dji-mic-mini',
    brand: 'DJI', category: 'dji-audio',
    name: 'DJI Mic Mini',
    tag: null, bgText: null,
    colorVariants: [{
      color: null, hex: '#2a2a2a',
      image: '/dji-mic2-shop.webp',
      hoverImage: '/dji-mic2-hand.webp',
      storage: [{ label: null, price: 59 }],
    }],
    specs: [
      { label: 'Transmisores',  value: '2 transmisores clip-on · rango 250 m' },
      { label: 'Micrófono',     value: 'Omnidireccional · grabación interna integrada' },
      { label: 'Cancelación',   value: 'AI Environmental Noise Canceling' },
      { label: 'Batería',       value: '6 hrs transmisor · 18 hrs con estuche' },
      { label: 'Formato',       value: '32-bit float · WAV sin pérdidas' },
      { label: 'Pantalla',      value: 'OLED en receptor' },
      { label: 'Conectividad',  value: '2.4 GHz · salida de 3.5 mm y USB-C' },
      { label: 'Memoria',       value: '8 GB interna por transmisor' },
    ],
  },

  // ── Oakley Meta HSTN ──────────────────────────────────────
  {
    id: 'oakley-meta-hstn',
    brand: 'Oakley', category: 'oakley',
    name: 'Oakley Meta HSTN',
    tag: 'Nuevo', bgText: null,
    colorVariants: [
      {
        color: 'Black', hex: '#1a1a1a',
        image: '/oakley-hstn-black-shop.webp',
        hoverImage: '/oakley-hstn-black-hand.webp',
        storage: [{ label: null, price: 450 }],
      },
      {
        color: 'Prizm Red', hex: '#8B2020',
        image: '/oakley-hstn-red-shop.webp',
        hoverImage: '/oakley-hstn-red-hand.webp',
        storage: [{ label: null, price: 450 }],
      },
    ],
    specs: [
      { label: 'Cámara',        value: '12MP · video 3K · foto y video manos libres' },
      { label: 'Audio',         value: 'Altavoces direccionales · micrófono dual' },
      { label: 'Asistente',     value: 'Meta AI integrado · comandos de voz' },
      { label: 'Batería',       value: 'Hasta 4 hrs · estuche con carga' },
      { label: 'Conectividad',  value: 'Bluetooth 5.3 · Wi-Fi · app Meta View' },
      { label: 'Lentes',        value: 'Oakley Prizm · intercambiables' },
      { label: 'Resistencia',   value: 'IPX4 · resistente a salpicaduras' },
      { label: 'Peso',          value: '49 g' },
    ],
  },

  // ── Oakley Meta Vanguard ──────────────────────────────────
  {
    id: 'oakley-meta-vanguard',
    brand: 'Oakley', category: 'oakley',
    name: 'Oakley Meta Vanguard',
    tag: 'Exclusivo', bgText: null,
    colorVariants: [
      {
        color: 'Prizm 24K', hex: '#C8952A',
        image: '/oakley-vanguard-gold-shop.webp',
        hoverImage: '/oakley-vanguard-gold-hand.webp',
        storage: [{ label: null, price: 650 }],
      },
      {
        color: 'Prizm Ruby', hex: '#7B1F2E',
        image: '/oakley-vanguard-ruby-shop.webp',
        hoverImage: '/oakley-vanguard-ruby-hand.webp',
        storage: [{ label: null, price: 650 }],
      },
    ],
    specs: [
      { label: 'Cámara',        value: '12MP · video 3K · foto y video manos libres' },
      { label: 'Audio',         value: 'Altavoces direccionales · micrófono dual' },
      { label: 'Asistente',     value: 'Meta AI integrado · comandos de voz' },
      { label: 'Batería',       value: 'Hasta 4 hrs · estuche con carga' },
      { label: 'Conectividad',  value: 'Bluetooth 5.3 · Wi-Fi · app Meta View' },
      { label: 'Lentes',        value: 'Oakley Prizm shield · deporte' },
      { label: 'Resistencia',   value: 'IPX4 · resistente a salpicaduras' },
      { label: 'Peso',          value: '52 g' },
    ],
  },

  // ── Shokz OpenRun Pro 2 ───────────────────────────────────
  {
    id: 'shokz-openrun-pro2',
    brand: 'Shokz', category: 'audio',
    name: 'Shokz OpenRun Pro 2',
    tag: 'Popular', bgText: null,
    colorVariants: [{
      color: 'Orange', hex: '#e8500a',
      image: '/shokz-openrun2-shop.webp',
      hoverImage: '/shokz-openrun2-hand.webp',
      storage: [{ label: null, price: 159 }],
    }],
    specs: [
      { label: 'Tecnología',    value: 'Conducción ósea · oídos abiertos' },
      { label: 'Batería',       value: 'Hasta 12 hrs · carga rápida 5 min = 1.5 hrs' },
      { label: 'Resistencia',   value: 'IP55 · resistente a sudor y lluvia' },
      { label: 'Peso',          value: '29 g' },
      { label: 'Micrófono',     value: 'Dual con cancelación de ruido AI' },
      { label: 'Conectividad',  value: 'Bluetooth 5.3 · multipoint 2 dispositivos' },
      { label: 'Carga',         value: 'Magnética propietaria' },
    ],
  },

  // ── BOYA Mini 2 ───────────────────────────────────────────
  {
    id: 'boya-mini2',
    brand: 'Boya', category: 'audio',
    name: 'BOYA Mini 2',
    tag: null, bgText: null,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/boya-wm3-shop.webp',
      hoverImage: '/boya-wm3-hand.webp',
      storage: [{ label: null, price: 89 }],
    }],
    specs: [
      { label: 'Transmisores',  value: '2 transmisores clip-on inalámbricos' },
      { label: 'Receptor',      value: 'USB-C integrado · plug & play' },
      { label: 'Rango',         value: 'Hasta 100 m' },
      { label: 'Batería',       value: '5 hrs transmisor · 10 hrs con estuche' },
      { label: 'Compatibilidad',value: 'iPhone USB-C · Android · iPad · cámara' },
      { label: 'Estuche',       value: 'Carga portátil incluida' },
    ],
  },

  // ── BAJO PEDIDO — catálogo por encargo ─────────────────────
  // Productos sin stock fijo: se piden por WhatsApp bajo encargo.
  // Marca `byOrder: true` para que el modal muestre CTA de WhatsApp
  // en vez de "Agregar al carrito", y la card muestre el badge
  // "Bajo pedido". Reemplazar las imágenes -shop/-hand.svg de abajo
  // por fotos reales -shop.webp / -hand.webp cuando estén disponibles.

  {
    id: 'funda-protectora-universal',
    brand: 'PULSE', category: 'fundas',
    name: 'Funda Protectora Universal',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 35 }],
    }],
    specs: [
      { label: 'Protección',    value: 'Bordes reforzados anti-impacto' },
      { label: 'Compatibilidad',value: 'Especificar modelo de equipo al pedir' },
      { label: 'Entrega',       value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'mando-gaming-inalambrico',
    brand: 'PULSE', category: 'gaming',
    name: 'Mando Gaming Inalámbrico',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 65 }],
    }],
    specs: [
      { label: 'Conectividad',  value: 'Bluetooth · compatible multiplataforma' },
      { label: 'Batería',       value: 'Recargable USB-C' },
      { label: 'Entrega',       value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

]

export const categories = [
  { id: 'all',        label: 'Todo' },
  { id: 'iphone',    label: 'iPhone' },
  { id: 'dji-estab', label: 'DJI Estabilizadores' },
  { id: 'dji-audio', label: 'DJI Audio' },
  { id: 'oakley',    label: 'Oakley Meta' },
  { id: 'audio',     label: 'Audio' },
  { id: 'fundas',    label: 'Fundas y Protección' },
  { id: 'telefonos', label: 'Teléfonos' },
  { id: 'gaming',    label: 'Gaming' },
  { id: 'cargadores',label: 'Cargadores' },
]

export const brands = ['Apple', 'DJI', 'Oakley', 'Shokz', 'BOYA', 'PULSE']

// Precio mínimo entre todos los colorVariants y storage
export const basePrice = (p) =>
  Math.min(...p.colorVariants.flatMap(cv => cv.storage.map(s => s.price)))
