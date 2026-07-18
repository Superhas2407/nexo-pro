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
      { label: 'Contenido',         value: 'iPhone · cable USB-C a USB-C (sin adaptador de corriente)' },
      { label: 'Garantía',          value: '1 año de garantía limitada Apple' },
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
        storage: [{ label: '256 GB', price: 1330 }],
      },
      {
        color: 'Silver', hex: '#E3E3E3',
        image: '/iphone-silver-shop.webp',
        hoverImage: '/iphone-silver-hand.webp',
        storage: [
          { label: '512 GB', price: 1590 },
          { label: '1 TB',   price: 1820 },
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
      { label: 'Contenido',         value: 'iPhone · cable USB-C a USB-C (sin adaptador de corriente)' },
      { label: 'Garantía',          value: '1 año de garantía limitada Apple' },
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
      },
    ],
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
      { label: 'Contenido',         value: 'Audífonos · estuche de carga · 3 pares de puntas de silicona · cable USB-C' },
      { label: 'Garantía',          value: '1 año de garantía limitada Apple' },
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
      storage: [{ label: null, price: 105 }],
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
      { label: 'Contenido',       value: 'Estabilizador · funda protectora · cable USB-C' },
      { label: 'Garantía',        value: 'Garantía oficial del fabricante DJI' },
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
      storage: [{ label: null, price: 150 }],
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
      { label: 'Contenido',       value: 'Estabilizador · funda protectora · cable USB-C' },
      { label: 'Garantía',        value: 'Garantía oficial del fabricante DJI' },
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
      { label: 'Contenido',       value: 'Estabilizador · funda protectora · cable USB-C' },
      { label: 'Garantía',        value: 'Garantía oficial del fabricante DJI' },
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
      { label: 'Contenido',     value: '2 transmisores · 1 receptor · estuche de carga · cables USB-C' },
      { label: 'Garantía',      value: 'Garantía oficial del fabricante DJI' },
    ],
  },

  // ── Oakley Meta HSTN ──────────────────────────────────────
  {
    id: 'oakley-meta-hstn',
    brand: 'Oakley', category: 'oakley',
    name: 'Oakley Meta HSTN',
    tag: 'Nuevo', bgText: 'HSTN',
    colorVariants: [
      {
        color: 'Black', hex: '#1a1a1a',
        image: '/oakley-hstn-black-shop.webp',
        hoverImage: '/oakley-hstn-black-hand.webp',
        storage: [{ label: null, price: 500 }],
      },
      {
        color: 'Prizm Red', hex: '#8B2020',
        image: '/oakley-hstn-red-shop.webp',
        hoverImage: '/oakley-hstn-red-hand.webp',
        storage: [{ label: null, price: 500 }],
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
      { label: 'Contenido',     value: 'Lentes · estuche de carga · paño de limpieza · cable USB-C' },
      { label: 'Garantía',      value: 'Garantía oficial del fabricante' },
    ],
  },

  // ── Oakley Meta Vanguard ──────────────────────────────────
  {
    id: 'oakley-meta-vanguard',
    brand: 'Oakley', category: 'oakley',
    name: 'Oakley Meta Vanguard',
    tag: 'Exclusivo', bgText: 'VANGUARD',
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
      { label: 'Contenido',     value: 'Lentes · estuche de carga · paño de limpieza · cable USB-C' },
      { label: 'Garantía',      value: 'Garantía oficial del fabricante' },
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
      { label: 'Contenido',     value: 'Audífonos · cable de carga magnético · estuche de viaje' },
      { label: 'Garantía',      value: 'Garantía oficial del fabricante Shokz' },
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
      storage: [{ label: null, price: 60 }],
    }],
    specs: [
      { label: 'Transmisores',  value: '2 transmisores clip-on inalámbricos' },
      { label: 'Receptor',      value: 'USB-C integrado · plug & play' },
      { label: 'Rango',         value: 'Hasta 100 m' },
      { label: 'Batería',       value: '5 hrs transmisor · 10 hrs con estuche' },
      { label: 'Compatibilidad',value: 'iPhone USB-C · Android · iPad · cámara' },
      { label: 'Estuche',       value: 'Carga portátil incluida' },
      { label: 'Contenido',     value: '2 transmisores · 1 receptor · estuche de carga · cable USB-C' },
      { label: 'Garantía',      value: 'Garantía oficial del fabricante BOYA' },
    ],
  },

  // ── BAJO PEDIDO — catálogo por encargo ─────────────────────
  // Productos sin stock fijo: se piden por WhatsApp bajo encargo.
  // Marca `byOrder: true` para que el modal muestre CTA de WhatsApp
  // en vez de "Agregar al carrito", y la card muestre el badge
  // "Bajo pedido". Reemplazar las imágenes -shop/-hand.svg de abajo
  // por fotos reales -shop.webp / -hand.webp cuando estén disponibles.

  // ── Bajo pedido — fundas (estudio de mercado) ──────────────

  {
    id: 'spigen-liquid-air-mag',
    brand: 'Spigen', category: 'fundas',
    name: 'Spigen Liquid Air Mag',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 20 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'MagSafe/Qi2 integrado, el estándar 2026 en casi todo el catálogo relevante' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'spigen-tough-armor',
    brand: 'Spigen', category: 'fundas',
    name: 'Spigen Tough Armor',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 28 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Doble capa, caída certificada — el modelo de valor más citado en rankings' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'spigen-ultra-hybrid',
    brand: 'Spigen', category: 'fundas',
    name: 'Spigen Ultra Hybrid',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 22 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Transparente + refuerzo en esquinas, alto volumen de venta' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'spigen-thin-fit',
    brand: 'Spigen', category: 'fundas',
    name: 'Spigen Thin Fit',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 18 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Perfil delgado para quien no quiere bulto extra' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ringke-onyx',
    brand: 'Ringke', category: 'fundas',
    name: 'Ringke Onyx',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 14 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Ajuste sin holgura, calidad-precio citada como \'sensacional\' en reviews' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ringke-fusion',
    brand: 'Ringke', category: 'fundas',
    name: 'Ringke Fusion',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 16 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Panel trasero transparente + bordes TPU reforzados' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ringke-air',
    brand: 'Ringke', category: 'fundas',
    name: 'Ringke Air',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 13 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Ultra ligera, opción de entrada más económica de la marca' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'esr-cloud-soft-magnetic',
    brand: 'ESR', category: 'fundas',
    name: 'ESR Cloud Soft Magnetic',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 20 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Referente en retención magnética MagSafe/Qi2 según pruebas 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'esr-classic-hybrid',
    brand: 'ESR', category: 'fundas',
    name: 'ESR Classic Hybrid',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 16 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Marca de mayor crecimiento reciente en el segmento medio' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'esr-metro-kickstand',
    brand: 'ESR', category: 'fundas',
    name: 'ESR Metro Kickstand',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 22 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Kickstand integrado, alta demanda para contenido/streaming móvil' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'otterbox-commuter-series',
    brand: 'OtterBox', category: 'fundas',
    name: 'OtterBox Commuter Series',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 40 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: '\'Mejor funda de iPhone\' varios años seguidos según TechGearLab' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'otterbox-defender-series',
    brand: 'OtterBox', category: 'fundas',
    name: 'OtterBox Defender Series',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 55 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Protección extrema multicapa, estándar en entornos de trabajo rudo' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'otterbox-symmetry',
    brand: 'OtterBox', category: 'fundas',
    name: 'OtterBox Symmetry',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 45 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Balance entre protección y perfil delgado' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'uag-monarch',
    brand: 'UAG', category: 'fundas',
    name: 'UAG Monarch',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 50 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Certificación de caída 1.5–3m con estética premium' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'uag-plasma',
    brand: 'UAG', category: 'fundas',
    name: 'UAG Plasma',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 35 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Resistencia UAG a precio de entrada' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'uag-pathfinder',
    brand: 'UAG', category: 'fundas',
    name: 'UAG Pathfinder',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 38 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Textura outdoor, muy citada en guías de protección 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'uag-civilian',
    brand: 'UAG', category: 'fundas',
    name: 'UAG Civilian',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 42 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Diseño más urbano dentro de la línea resistente' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nomad-modern-leather-case',
    brand: 'Nomad', category: 'fundas',
    name: 'Nomad Modern Leather Case',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 55 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: '+17,000 reseñas 5 estrellas y garantía de 2 años, líder en cuero premium' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nomad-leather-folio',
    brand: 'Nomad', category: 'fundas',
    name: 'Nomad Leather Folio',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 65 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Folio con slots de tarjeta, alta demanda como reemplazo de billetera' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'casetify-impact-case',
    brand: 'Casetify', category: 'fundas',
    name: 'Casetify Impact Case',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 48 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Líder en personalización — colabs de artistas, muy fuerte en redes' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'casetify-mirror-case',
    brand: 'Casetify', category: 'fundas',
    name: 'Casetify Mirror Case',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 58 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Formato espejo, uno de los diseños más compartidos en TikTok 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'peak-design-everyday-case',
    brand: 'Peak Design', category: 'fundas',
    name: 'Peak Design Everyday Case',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 50 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Retención magnética entre las más fuertes probadas en 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'pitaka-magez-case-4',
    brand: 'Pitaka', category: 'fundas',
    name: 'Pitaka MagEZ Case 4',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 60 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Fibra de aramida tejida, favorito de la comunidad tech/unboxing' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'mous-limitless-5',
    brand: 'Mous', category: 'fundas',
    name: 'Mous Limitless 5',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 55 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Referente en protección extrema junto a OtterBox y UAG' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'mous-contour',
    brand: 'Mous', category: 'fundas',
    name: 'Mous Contour',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 50 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Versión más delgada de la línea insignia de la marca' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'tech21-evo-check',
    brand: 'Tech21', category: 'fundas',
    name: 'Tech21 Evo Check',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 30 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Patrón a cuadros reconocible, opción de protección visible sin ser rugged' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'speck-presidio2-grip',
    brand: 'Speck', category: 'fundas',
    name: 'Speck Presidio2 Grip',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 35 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Grip texturizado, recurrente en comparativas de caída' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'zagg-denali-case',
    brand: 'ZAGG', category: 'fundas',
    name: 'ZAGG Denali Case',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 45 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Rugged con certificación de caída, tienda oficial fuerte en Amazon' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'catalyst-influence-series',
    brand: 'Catalyst', category: 'fundas',
    name: 'Catalyst Influence Series',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 50 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Resistente al agua, marca nativa de Amazon con reseñas muy altas' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'encased-slim-case',
    brand: 'Encased', category: 'fundas',
    name: 'Encased Slim Case',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/funda-protectora-shop.svg',
      hoverImage: '/funda-protectora-hand.svg',
      storage: [{ label: null, price: 15 }],
    }],
    specs: [
      { label: 'Modelo compatible', value: 'iPhone 17 Pro · Pro Max' },
      { label: 'Por qué', value: 'Marca nacida y vendida casi exclusivamente en Amazon — sin fricción de envío' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },


  // ── Bajo pedido — audio (estudio de mercado) ──────────────

  {
    id: 'sony-wf-1000xm6',
    brand: 'Sony', category: 'audio',
    name: 'Sony WF-1000XM6',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 300 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Nuevo benchmark de calidad de sonido in-ear, tope de gama 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'sony-wh-1000xm6',
    brand: 'Sony', category: 'audio',
    name: 'Sony WH-1000XM6',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 400 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Consenso como mejor over-ear 2026: ANC líder + 30h de batería' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'sony-wf-c710n',
    brand: 'Sony', category: 'audio',
    name: 'Sony WF-C710N',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 120 }],
    }],
    specs: [
      { label: 'Por qué', value: 'ANC de gama alta a mitad de precio — mejor relación calidad-precio media' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'sennheiser-momentum-true-wireless-4',
    brand: 'Sennheiser', category: 'audio',
    name: 'Sennheiser Momentum True Wireless 4',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 300 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Perfil de sonido neutro muy citado por reviewers especializados' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'sennheiser-momentum-4-wireless',
    brand: 'Sennheiser', category: 'audio',
    name: 'Sennheiser Momentum 4 Wireless',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 380 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Preferido cuando la prioridad es calidad de sonido sobre ANC' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'sennheiser-accentum-true-wireless',
    brand: 'Sennheiser', category: 'audio',
    name: 'Sennheiser Accentum True Wireless',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 180 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión accesible de la línea Momentum' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'bose-quietcomfort-ultra-earbuds-gen-2',
    brand: 'Bose', category: 'audio',
    name: 'Bose QuietComfort Ultra Earbuds (Gen 2)',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 300 }],
    }],
    specs: [
      { label: 'Por qué', value: 'La opción multiplataforma más recomendada, sin sesgo de ecosistema' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'bose-quietcomfort-ultra',
    brand: 'Bose', category: 'audio',
    name: 'Bose QuietComfort Ultra',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 430 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Líder en comodidad y personalización de sonido over-ear' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-buds-3-fe',
    brand: 'Samsung', category: 'audio',
    name: 'Samsung Galaxy Buds 3 FE',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 150 }],
    }],
    specs: [
      { label: 'Por qué', value: 'La mayoría de features del Buds3 Pro a precio más accesible' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-buds-4-pro',
    brand: 'Samsung', category: 'audio',
    name: 'Samsung Galaxy Buds 4 Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 250 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor opción para el ecosistema Samsung según reviews 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nothing-ear',
    brand: 'Nothing', category: 'audio',
    name: 'Nothing Ear',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 150 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Diseño transparente distintivo + sonido sobre el promedio de precio' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nothing-ear-a',
    brand: 'Nothing', category: 'audio',
    name: 'Nothing Ear (a)',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 99 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión económica de Nothing, muy viral por diseño' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'cmf-buds-pro-2',
    brand: 'CMF by Nothing', category: 'audio',
    name: 'CMF Buds Pro 2',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 59 }],
    }],
    specs: [
      { label: 'Por qué', value: '\'Rinden más de lo que cuestan\' — ANC sólido a precio de entrada' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'oneplus-buds-4',
    brand: 'OnePlus', category: 'audio',
    name: 'OnePlus Buds 4',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 100 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Ancla de precio agresiva, buen punto de entrada de marca reconocida' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'jbl-live-770nc',
    brand: 'JBL', category: 'audio',
    name: 'JBL Live 770NC',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 200 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Resistente al agua, 65h de batería — favorito para gimnasio' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'jbl-tune-770nc',
    brand: 'JBL', category: 'audio',
    name: 'JBL Tune 770NC',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 130 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión más accesible con ANC de la línea Live' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'jbl-tour-pro-3',
    brand: 'JBL', category: 'audio',
    name: 'JBL Tour Pro 3',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 250 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Estuche con pantalla táctil, diferenciador único en el segmento' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'audio-technica-ath-m50x',
    brand: 'Audio-Technica', category: 'audio',
    name: 'Audio-Technica ATH-M50X',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 170 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Estándar de estudio/profesional, recurrente en toda comparativa' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-soundcore-q20i',
    brand: 'Anker', category: 'audio',
    name: 'Anker Soundcore Q20i',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 60 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Best buy de presupuesto — \'rinde muy por encima de su precio\'' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-soundcore-q30',
    brand: 'Anker', category: 'audio',
    name: 'Anker Soundcore Q30',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 80 }],
    }],
    specs: [
      { label: 'Por qué', value: 'El paso siguiente dentro de la misma línea de valor' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-soundcore-liberty-5',
    brand: 'Anker', category: 'audio',
    name: 'Anker Soundcore Liberty 5',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 130 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Gama media de Soundcore con ANC competitivo' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'beats-fit-pro-2',
    brand: 'Beats', category: 'audio',
    name: 'Beats Fit Pro 2',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 200 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Fuerte en integración iOS, alta demanda en el público Apple' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'beats-studio-pro',
    brand: 'Beats', category: 'audio',
    name: 'Beats Studio Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 300 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Over-ear insignia de Beats, tracción constante en redes' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'skullcandy-crusher-anc-2',
    brand: 'Skullcandy', category: 'audio',
    name: 'Skullcandy Crusher ANC 2',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 150 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Bajos ajustables, nicho fiel entre público joven' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'marshall-motif-ii-anc',
    brand: 'Marshall', category: 'audio',
    name: 'Marshall Motif II ANC',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 200 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Estética retro Marshall, fuerte identidad de marca' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'marshall-major-v',
    brand: 'Marshall', category: 'audio',
    name: 'Marshall Major V',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 130 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión on-ear más accesible de Marshall' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'bang-olufsen-beoplay-ex',
    brand: 'B&O', category: 'audio',
    name: 'Bang & Olufsen Beoplay EX',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 300 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Segmento premium/diseño, aspiracional para el comprador Apple/DJI' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'jabra-elite-10-gen-2',
    brand: 'Jabra', category: 'audio',
    name: 'Jabra Elite 10 Gen 2',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 250 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Fuerte en llamadas — recurrente en comparativas profesionales' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: '1more-comfobuds-pro-2',
    brand: '1MORE', category: 'audio',
    name: '1MORE ComfoBuds Pro 2',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 100 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Buena relación ANC/precio, creciendo en mercados emergentes' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'edifier-neobuds-pro-2',
    brand: 'Edifier', category: 'audio',
    name: 'Edifier NeoBuds Pro 2',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/audio-generico-shop.svg',
      hoverImage: '/audio-generico-hand.svg',
      storage: [{ label: null, price: 100 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Códec LDAC a precio medio, favorito de audiófilos de presupuesto' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },


  // ── Bajo pedido — telefonos (estudio de mercado) ──────────────

  {
    id: 'google-pixel-10-pro',
    brand: 'Google', category: 'telefonos',
    name: 'Google Pixel 10 Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 949 }],
    }],
    specs: [
      { label: 'Por qué', value: '\'El mejor Android que puedes comprar ahora\' — cámara y software líderes' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'google-pixel-10',
    brand: 'Google', category: 'telefonos',
    name: 'Google Pixel 10',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 799 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Tensor G5 + 7 años de actualizaciones, gran relación precio-soporte' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'google-pixel-10a',
    brand: 'Google', category: 'telefonos',
    name: 'Google Pixel 10a',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 499 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Experiencia Pixel completa manteniendo precio de entrada' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'google-pixel-9a',
    brand: 'Google', category: 'telefonos',
    name: 'Google Pixel 9a',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 499 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Cámara y confiabilidad a largo plazo muy citadas en 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'google-pixel-9',
    brand: 'Google', category: 'telefonos',
    name: 'Google Pixel 9',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 599 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Generación anterior con precio ya ajustado, sigue vendiéndose bien' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'google-pixel-9-pro',
    brand: 'Google', category: 'telefonos',
    name: 'Google Pixel 9 Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 799 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión Pro de generación anterior a precio de gama media-alta' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-s26',
    brand: 'Samsung', category: 'telefonos',
    name: 'Samsung Galaxy S26',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 799 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Snapdragon 8 Elite Gen 5 — el flagship estándar de Samsung bajo el tope' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-s26-samsung',
    brand: 'Samsung', category: 'telefonos',
    name: 'Samsung Galaxy S26+',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 999 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Pantalla más grande del S26 justo en el límite de presupuesto' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-s25-fe',
    brand: 'Samsung', category: 'telefonos',
    name: 'Samsung Galaxy S25 FE',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 650 }],
    }],
    specs: [
      { label: 'Por qué', value: 'La mayoría del rendimiento del S25 a precio inferior' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-a57',
    brand: 'Samsung', category: 'telefonos',
    name: 'Samsung Galaxy A57',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 550 }],
    }],
    specs: [
      { label: 'Por qué', value: '6.9mm de grosor récord — diseño como diferenciador principal' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-a56',
    brand: 'Samsung', category: 'telefonos',
    name: 'Samsung Galaxy A56',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 450 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Gama media estable, alto volumen de venta histórico' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-a36',
    brand: 'Samsung', category: 'telefonos',
    name: 'Samsung Galaxy A36',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 350 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Punto de entrada Samsung con buena cámara para su precio' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-a26',
    brand: 'Samsung', category: 'telefonos',
    name: 'Samsung Galaxy A26',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 250 }],
    }],
    specs: [
      { label: 'Por qué', value: 'La opción más económica de la línea A con soporte oficial' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-z-flip7-fe',
    brand: 'Samsung', category: 'telefonos',
    name: 'Samsung Galaxy Z Flip7 FE',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 899 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Plegable de entrada — categoría en crecimiento fuerte en 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'samsung-galaxy-xcover7',
    brand: 'Samsung', category: 'telefonos',
    name: 'Samsung Galaxy XCover7',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 500 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Resistente/rugged, nicho pero con demanda constante' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'oneplus-15',
    brand: 'OnePlus', category: 'telefonos',
    name: 'OnePlus 15',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 899 }],
    }],
    specs: [
      { label: 'Por qué', value: '\'Mejor Android en relación precio-rendimiento\' según Android Central' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'oneplus-13',
    brand: 'OnePlus', category: 'telefonos',
    name: 'OnePlus 13',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 699 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Generación anterior, sigue entre los más recomendados 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'oneplus-13r',
    brand: 'OnePlus', category: 'telefonos',
    name: 'OnePlus 13R',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 599 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión recortada del flagship a precio medio' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'oneplus-nord-5',
    brand: 'OnePlus', category: 'telefonos',
    name: 'OnePlus Nord 5',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 499 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Gama media OnePlus con carga rápida como diferenciador' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'oneplus-nord-ce-5',
    brand: 'OnePlus', category: 'telefonos',
    name: 'OnePlus Nord CE 5',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 349 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Punto de entrada de la marca, buen volumen de venta' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nothing-phone-3',
    brand: 'Nothing', category: 'telefonos',
    name: 'Nothing Phone 3',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 799 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Glyph Matrix y triple cámara — el diseño más distintivo del mercado' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nothing-phone-3a',
    brand: 'Nothing', category: 'telefonos',
    name: 'Nothing Phone 3a',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 379 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mismo lenguaje de diseño Nothing a precio de entrada' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nothing-phone-3a-pro',
    brand: 'Nothing', category: 'telefonos',
    name: 'Nothing Phone 3a Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 459 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Cámara mejorada sobre el 3a manteniendo precio accesible' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nothing-phone-2a',
    brand: 'Nothing', category: 'telefonos',
    name: 'Nothing Phone 2a',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 349 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Generación anterior con precio ya reducido, sigue disponible' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'motorola-edge-60-pro',
    brand: 'Motorola', category: 'telefonos',
    name: 'Motorola Edge 60 Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 599 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Buen equilibrio construcción/precio dentro de la gama Edge' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'motorola-edge-60',
    brand: 'Motorola', category: 'telefonos',
    name: 'Motorola Edge 60',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 449 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión estándar de la línea Edge, buena relación precio-pantalla' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'motorola-razr-2025',
    brand: 'Motorola', category: 'telefonos',
    name: 'Motorola Razr 2025',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 699 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Plegable flip más accesible del mercado, tracción fuerte en Amazon' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'motorola-razr-2025-motorola',
    brand: 'Motorola', category: 'telefonos',
    name: 'Motorola Razr+ 2025',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 999 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión Plus del flip, justo en el límite de presupuesto' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'motorola-moto-g-power-2026',
    brand: 'Motorola', category: 'telefonos',
    name: 'Motorola Moto G Power (2026)',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 250 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor Motorola económico — IP y batería sólidas' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'asus-rog-phone-9-pro',
    brand: 'ASUS', category: 'telefonos',
    name: 'ASUS ROG Phone 9 Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/telefono-generico-shop.svg',
      hoverImage: '/telefono-generico-hand.svg',
      storage: [{ label: null, price: 999 }],
    }],
    specs: [
      { label: 'Por qué', value: 'El más cercano a un \'laptop gaming\' en formato teléfono' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },


  // ── Bajo pedido — gaming (estudio de mercado) ──────────────

  {
    id: 'xbox-wireless-controller',
    brand: 'Microsoft', category: 'gaming',
    name: 'Xbox Wireless Controller',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 60 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor mando 2026 por versatilidad multiplataforma y precio justo' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'sony-dualsense-ps5',
    brand: 'Sony', category: 'gaming',
    name: 'Sony DualSense (PS5)',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 70 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Gatillos adaptativos y háptica — estándar de la experiencia PS5' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'sony-dualsense-edge',
    brand: 'Sony', category: 'gaming',
    name: 'Sony DualSense Edge',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 200 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión pro con sticks intercambiables para jugador competitivo' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nintendo-switch-pro-controller',
    brand: 'Nintendo', category: 'gaming',
    name: 'Nintendo Switch Pro Controller',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 70 }],
    }],
    specs: [
      { label: 'Por qué', value: 'El mando recomendado para Switch en todas las guías 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'xbox-elite-series-2-core',
    brand: 'Microsoft', category: 'gaming',
    name: 'Xbox Elite Series 2 Core',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 130 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Paletas traseras y tensión ajustable — el más personalizable' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'razer-wolverine-v3-pro',
    brand: 'Razer', category: 'gaming',
    name: 'Razer Wolverine V3 Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 170 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Sticks Hall Effect, opción premium de terceros' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'gamesir-g7-pro-8k',
    brand: 'GameSir', category: 'gaming',
    name: 'GameSir G7 Pro 8K',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 90 }],
    }],
    specs: [
      { label: 'Por qué', value: '8,000Hz de polling — la mayor tasa disponible, mitad de precio del Elite 2' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'gamesir-nova-lite-2',
    brand: 'GameSir', category: 'gaming',
    name: 'GameSir Nova Lite 2',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 40 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor opción general por sticks Hall Effect y compatibilidad amplia' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: '8bitdo-ultimate-2-wireless',
    brand: '8BitDo', category: 'gaming',
    name: '8BitDo Ultimate 2 Wireless',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 65 }],
    }],
    specs: [
      { label: 'Por qué', value: 'TMR sticks + gatillos Hall Effect + dock incluido, top 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: '8bitdo-ultimate-2c',
    brand: '8BitDo', category: 'gaming',
    name: '8BitDo Ultimate 2C',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 35 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Ligero y ergonómico, 1000Hz de polling' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: '8bitdo-pro-2-wired',
    brand: '8BitDo', category: 'gaming',
    name: '8BitDo Pro 2 Wired',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 30 }],
    }],
    specs: [
      { label: 'Por qué', value: 'La opción budget más citada en rankings 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'backbone-one',
    brand: 'Backbone', category: 'gaming',
    name: 'Backbone One',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 100 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Convierte el teléfono en consola — muy fuerte en mobile gaming' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'turtle-beach-recon-cloud',
    brand: 'Turtle Beach', category: 'gaming',
    name: 'Turtle Beach Recon Cloud',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 80 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mando enfocado en cloud gaming multiplataforma' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'powera-fusion-pro-3',
    brand: 'PowerA', category: 'gaming',
    name: 'PowerA Fusion Pro 3',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 65 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Alternativa con licencia oficial a precio competitivo' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: '8bitdo-charging-dock',
    brand: '8BitDo', category: 'gaming',
    name: '8BitDo Charging Dock',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 20 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Diseño minimalista con iluminación sutil, combo natural con sus mandos' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'powera-xbox-charging-dock',
    brand: 'PowerA', category: 'gaming',
    name: 'PowerA Xbox Charging Dock',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 25 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Licencia oficial Xbox + 2 años de garantía' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-steam-deck-docking-station',
    brand: 'Anker', category: 'gaming',
    name: 'Anker Steam Deck Docking Station',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 60 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Hub 6-en-1 con HDMI 4K@60Hz y Ethernet — muy recomendado 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'razer-handheld-dock-chroma',
    brand: 'Razer', category: 'gaming',
    name: 'Razer Handheld Dock Chroma',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 100 }],
    }],
    specs: [
      { label: 'Por qué', value: '100W passthrough, compatible Steam Deck/ROG Ally/iPhone' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'jsaux-hb0603-dock',
    brand: 'JSAUX', category: 'gaming',
    name: 'JSAUX HB0603 Dock',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 70 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Puerto Ethernet Gigabit, fuerte en setups competitivos' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ugreen-9-in-1-dock',
    brand: 'UGREEN', category: 'gaming',
    name: 'UGREEN 9-in-1 Dock',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 90 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Diseño plegable, alto rendimiento sostenido para escritorio' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'nexigo-enhanced-charging-dock',
    brand: 'NexiGo', category: 'gaming',
    name: 'NexiGo Enhanced Charging Dock',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 45 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor dock para Meta Quest 3 según VRGearGuide' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'amvr-rgb-charging-dock',
    brand: 'AMVR', category: 'gaming',
    name: 'AMVR RGB Charging Dock',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 35 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Carga headset + controles en un par de horas, iluminación RGB' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-647-charging-station',
    brand: 'Anker', category: 'gaming',
    name: 'Anker 647 Charging Station',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 130 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Estación 10-en-1 con ActiveShield 2.0 para setups multi-dispositivo' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'thrustmaster-t-flight-hotas-x',
    brand: 'Thrustmaster', category: 'gaming',
    name: 'Thrustmaster T-Flight Hotas X',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 100 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor joystick general para PC según PC Gamer' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'logitech-extreme-3d-pro',
    brand: 'Logitech', category: 'gaming',
    name: 'Logitech Extreme 3D Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 50 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Joystick de entrada más recomendado para simuladores' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'turtle-beach-velocityone-flightstick',
    brand: 'Turtle Beach', category: 'gaming',
    name: 'Turtle Beach VelocityOne Flightstick',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 200 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Pantalla OLED integrada, muy valorado por configurabilidad' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'moza-r3-racing-wheel',
    brand: 'MOZA', category: 'gaming',
    name: 'MOZA R3 Racing Wheel',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 280 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Kit volante+base+pedales de entrada a direct drive' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'monoprice-dark-matter-pro-racing-wheel',
    brand: 'Monoprice', category: 'gaming',
    name: 'Monoprice Dark Matter Pro Racing Wheel',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 200 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Kit todo incluido con palanca de cambios realista' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'victrix-pro-fs-12-arcade-stick',
    brand: 'Victrix', category: 'gaming',
    name: 'Victrix Pro FS-12 Arcade Stick',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 250 }],
    }],
    specs: [
      { label: 'Por qué', value: 'El fight stick de referencia para competencia según reviews 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'dark-matter-arcade-fighting-stick',
    brand: 'Monoprice', category: 'gaming',
    name: 'Dark Matter Arcade Fighting Stick',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/mando-gaming-shop.svg',
      hoverImage: '/mando-gaming-hand.svg',
      storage: [{ label: null, price: 100 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Componentes Sanwa Denshi a precio accesible' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },


  // ── Bajo pedido — cargadores (estudio de mercado) ──────────────

  {
    id: 'anker-prime-100w-gan-charger',
    brand: 'Anker', category: 'cargadores',
    name: 'Anker Prime 100W GaN Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 100 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor cargador USB-C general 2026 — 3 puertos con reparto dinámico' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-prime-200w-gan-charger',
    brand: 'Anker', category: 'cargadores',
    name: 'Anker Prime 200W GaN Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 150 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Carga simultánea de laptop + tablet + teléfono sin perder velocidad' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-511-nano-3-30w',
    brand: 'Anker', category: 'cargadores',
    name: 'Anker 511 Nano 3 (30W)',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 16 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor opción de un solo puerto para teléfono' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-535-67w-car-charger',
    brand: 'Anker', category: 'cargadores',
    name: 'Anker 535 67W Car Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 35 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Recomendado #1 para carga vehicular multi-dispositivo' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-maggo-3-in-1-station',
    brand: 'Anker', category: 'cargadores',
    name: 'Anker MagGo 3-in-1 Station',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 90 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Carga iPhone + Apple Watch + AirPods en un solo mueble' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-maggo-wireless-stand',
    brand: 'Anker', category: 'cargadores',
    name: 'Anker MagGo Wireless Stand',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 45 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión de pie, upsell natural sobre el pad básico' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-zolo-magnetic-wireless-pad',
    brand: 'Anker', category: 'cargadores',
    name: 'Anker Zolo Magnetic Wireless Pad',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 30 }],
    }],
    specs: [
      { label: 'Por qué', value: '15W con tecnología Qi2, alternativa económica a MagSafe' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'anker-prime-27-650mah-power-bank',
    brand: 'Anker', category: 'cargadores',
    name: 'Anker Prime 27,650mAh Power Bank',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 200 }],
    }],
    specs: [
      { label: 'Por qué', value: '\'El power bank más capaz que puedes comprar en 2026\'' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ugreen-nexode-100w',
    brand: 'UGREEN', category: 'cargadores',
    name: 'UGREEN Nexode 100W',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 46 }],
    }],
    specs: [
      { label: 'Por qué', value: '90% del rendimiento del Anker Prime a la mitad del precio' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ugreen-nexode-65w-ultra-slim',
    brand: 'UGREEN', category: 'cargadores',
    name: 'UGREEN Nexode 65W Ultra-Slim',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 35 }],
    }],
    specs: [
      { label: 'Por qué', value: '3 puertos en formato delgado, ideal para viaje' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ugreen-qi2-wireless-pad',
    brand: 'UGREEN', category: 'cargadores',
    name: 'UGREEN Qi2 Wireless Pad',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 25 }],
    }],
    specs: [
      { label: 'Por qué', value: '15W constantes por debajo de $30, muy bien valorado' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ugreen-diginest-pro',
    brand: 'UGREEN', category: 'cargadores',
    name: 'UGREEN DigiNest Pro',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 60 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Estación multi-puerto para escritorio permanente' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'baseus-blade-hd-power-bank',
    brand: 'Baseus', category: 'cargadores',
    name: 'Baseus Blade HD Power Bank',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 70 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Diseño premiado, el power bank \'más bonito\' del segmento' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'baseus-gan5-pro-100w',
    brand: 'Baseus', category: 'cargadores',
    name: 'Baseus GaN5 Pro 100W',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 55 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Compacto y frío gracias a GaN, fuerte relación precio-potencia' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'belkin-boostcharge-pro-qi2-pad',
    brand: 'Belkin', category: 'cargadores',
    name: 'Belkin BoostCharge Pro Qi2 Pad',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 25 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Soporte horizontal, el pedido de entrada más probable' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'belkin-boostcharge-pro-3-in-1',
    brand: 'Belkin', category: 'cargadores',
    name: 'Belkin BoostCharge Pro 3-in-1',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 119 }],
    }],
    specs: [
      { label: 'Por qué', value: 'MagSafe + Apple Watch + AirPods, \'mejor cargador\' según Tom\'s Guide' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'belkin-boostcharge-3-in-1-con-adaptador',
    brand: 'Belkin', category: 'cargadores',
    name: 'Belkin BoostCharge 3-in-1 (con adaptador)',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 80 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Versión sin cargador de pared incluido, más accesible' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'iniu-45w-20-000mah-power-bank',
    brand: 'INIU', category: 'cargadores',
    name: 'INIU 45W 20,000mAh Power Bank',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 37 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor power bank de presupuesto 2026 según reviews' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'satechi-165w-usb-c-charger',
    brand: 'Satechi', category: 'cargadores',
    name: 'Satechi 165W USB-C Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 90 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Diseño aluminio premium, apunta al comprador Apple/creator' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'satechi-trio-wireless-charging-pad',
    brand: 'Satechi', category: 'cargadores',
    name: 'Satechi Trio Wireless Charging Pad',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 60 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Carga 3 dispositivos, estética a juego con productos Apple' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'aukey-omnia-mix-gan-charger',
    brand: 'Aukey', category: 'cargadores',
    name: 'Aukey Omnia Mix GaN Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 40 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Buena relación precio-potencia en formato compacto' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ravpower-65w-gan-charger',
    brand: 'RAVPower', category: 'cargadores',
    name: 'RAVPower 65W GaN Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 30 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Opción económica recurrente en comparativas GaN' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'tollefe-78w-5-in-1-car-charger',
    brand: 'Tollefe', category: 'cargadores',
    name: 'Tollefe 78W 5-in-1 Car Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 25 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Mejor cargador de auto \'todo incluido\' según reviews 2026' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'ainope-6-port-car-charger',
    brand: 'AINOPE', category: 'cargadores',
    name: 'AINOPE 6-Port Car Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 22 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Reparto inteligente de potencia, pensado para familias' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'mophie-snap-wireless-charger',
    brand: 'Mophie', category: 'cargadores',
    name: 'Mophie Snap+ Wireless Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 50 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Snap magnético con buen acabado, alternativa a ESR/Anker' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'twelve-south-powerpic',
    brand: 'Twelve South', category: 'cargadores',
    name: 'Twelve South PowerPic',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 90 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Cargador MagSafe con diseño tipo marco/objeto de escritorio' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'esr-halolock-kickstand-charger',
    brand: 'ESR', category: 'cargadores',
    name: 'ESR HaloLock Kickstand Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 30 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Kickstand + carga magnética, mismo ADN que sus fundas' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'native-union-snap-magnetic-charger',
    brand: 'Native Union', category: 'cargadores',
    name: 'Native Union Snap Magnetic Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 45 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Cable trenzado + snap magnético, fuerte en diseño' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'choetech-3-in-1-magsafe-stand',
    brand: 'Choetech', category: 'cargadores',
    name: 'Choetech 3-in-1 MagSafe Stand',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 55 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Marca de venta casi exclusiva en Amazon, alto volumen de reseñas' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
    ],
  },

  {
    id: 'torras-cool-lava-magsafe-charger',
    brand: 'Torras', category: 'cargadores',
    name: 'Torras Cool Lava MagSafe Charger',
    tag: null, bgText: null,
    byOrder: true,
    colorVariants: [{
      color: null, hex: '#1a1a1a',
      image: '/cargador-generico-shop.svg',
      hoverImage: '/cargador-generico-hand.svg',
      storage: [{ label: null, price: 45 }],
    }],
    specs: [
      { label: 'Por qué', value: 'Marca con tracción viral en redes por sus acabados' },
      { label: 'Entrega', value: 'Bajo pedido · tiempo de entrega según disponibilidad' },
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

export const brands = ['Apple', 'DJI', 'Oakley', 'Shokz', 'BOYA']

// Precio mínimo entre todos los colorVariants y storage
export const basePrice = (p) =>
  Math.min(...p.colorVariants.flatMap(cv => cv.storage.map(s => s.price)))
