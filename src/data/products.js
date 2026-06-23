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
        image: '/iphone-silver-shop.png',
        hoverImage: '/iphone-silver-hand.jpg',
        storage: [{ label: '256 GB', price: 1270 }],
      },
      {
        color: 'Orange', hex: '#FF6B35',
        image: '/iphone-orange-shop.png',
        hoverImage: '/iphone-orange-hand.jpg',
        storage: [
          { label: '512 GB', price: 1590 },
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
        image: '/iphone-deepblue-shop.png',
        hoverImage: '/iphone-deepblue-hand.jpg',
        storage: [{ label: '256 GB', price: 1290 }],
      },
      {
        color: 'Silver', hex: '#E3E3E3',
        image: '/iphone-silver-shop.png',
        hoverImage: '/iphone-silver-hand.jpg',
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
        image: '/airpods-shop-1.png', hoverImage: '/airpods-hand.jpg',
        images: ['/airpods-shop-1.png', '/airpods-shop-2.png', '/airpods-hand.jpg'],
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
      image: '/dji-osmo7-shop.png',
      hoverImage: '/dji-osmo7-hand.jpg',
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
      image: '/dji-osmo7p-shop.png',
      hoverImage: '/dji-osmo7p-hand.jpg',
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
      image: '/dji-osmo8-shop.png',
      hoverImage: '/dji-osmo8-hand.jpg',
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
      color: null, hex: null,
      image: '/banner-dji-mic.jpg', hoverImage: null,
      storage: [{ label: null, price: 59 }],
    }],
  },

  // ── Oakley Meta HSTN ──────────────────────────────────────
  {
    id: 'oakley-meta-hstn',
    brand: 'Oakley', category: 'oakley',
    name: 'Oakley Meta HSTN',
    tag: null, bgText: null,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/banner-oakley.jpg', hoverImage: null,
      storage: [{ label: null, price: 299 }],
    }],
  },

  // ── Oakley Meta Vanguard ──────────────────────────────────
  {
    id: 'oakley-meta-vanguard',
    brand: 'Oakley', category: 'oakley',
    name: 'Oakley Meta Vanguard',
    tag: 'Exclusivo', bgText: null,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/banner-oakley.jpg', hoverImage: null,
      storage: [{ label: null, price: 449 }],
    }],
  },

  // ── Shokz OpenRun Pro 2 ───────────────────────────────────
  {
    id: 'shokz-openrun-pro2',
    brand: 'Shokz', category: 'audio',
    name: 'Shokz OpenRun Pro 2',
    tag: 'Popular', bgText: null,
    colorVariants: [{
      color: 'Orange', hex: '#e8500a',
      image: null, hoverImage: null,
      storage: [{ label: null, price: 159 }],
    }],
  },

  // ── Boya Mic Mini ─────────────────────────────────────────
  {
    id: 'boya-mic-mini',
    brand: 'Boya', category: 'audio',
    name: 'Boya Mic Mini',
    tag: null, bgText: null,
    colorVariants: [{
      color: null, hex: null,
      image: null, hoverImage: null,
      storage: [{ label: null, price: 39 }],
    }],
  },
]

export const categories = [
  { id: 'all',        label: 'Todo' },
  { id: 'iphone',    label: 'iPhone' },
  { id: 'dji-estab', label: 'DJI Estabilizadores' },
  { id: 'dji-audio', label: 'DJI Audio' },
  { id: 'oakley',    label: 'Oakley Meta' },
  { id: 'audio',     label: 'Audio' },
]

export const brands = ['Apple', 'DJI', 'Oakley', 'Shokz', 'Boya']

// Precio mínimo entre todos los colorVariants y storage
export const basePrice = (p) =>
  Math.min(...p.colorVariants.flatMap(cv => cv.storage.map(s => s.price)))
