// Agrupa specs planas (label/value) en categorías para el modal de producto.
// Clasificación por label exacto — funciona para todos los productos sin tocar products.js.

const CATEGORY_MAP = {
  // Rendimiento
  'Chip': 'rendimiento', 'Estabilización': 'rendimiento', 'Tecnología': 'rendimiento',
  'Modos': 'rendimiento', 'Controles': 'rendimiento', 'Seguimiento': 'rendimiento', 'Detección': 'rendimiento',
  // Cámara y pantalla
  'Pantalla': 'camara', 'Cámara principal': 'camara', 'Ultra Wide': 'camara', 'Teleobjetivo': 'camara',
  'Video': 'camara', 'Cámara': 'camara', 'Lentes': 'camara',
  // Audio
  'Micrófono': 'audio', 'Cancelación': 'audio', 'Audio': 'audio', 'Audio espacial': 'audio',
  'Transparencia': 'audio', 'Formato': 'audio',
  // Batería y carga
  'Batería': 'bateria', 'Carga': 'bateria', 'Con estuche': 'bateria', 'Carga máx.': 'bateria',
  'Peso': 'bateria', 'Extensión': 'bateria', 'Plegado': 'bateria',
  // Conectividad
  'Conectividad': 'conectividad', 'Rango': 'conectividad', 'Transmisores': 'conectividad',
  'Receptor': 'conectividad', 'App': 'conectividad', 'Compatibilidad': 'conectividad',
  'Memoria': 'conectividad', 'Estuche': 'conectividad',
  // Seguridad
  'Resistencia': 'seguridad', 'Seguridad': 'seguridad', 'Apple Intelligence': 'seguridad', 'Asistente': 'seguridad',
  // Garantía y contenido
  'Contenido': 'compra', 'Garantía': 'compra',
}

const CATEGORY_ORDER = [
  { key: 'rendimiento',   title: 'Rendimiento' },
  { key: 'camara',        title: 'Cámara y pantalla' },
  { key: 'audio',         title: 'Audio' },
  { key: 'bateria',       title: 'Batería y carga' },
  { key: 'conectividad',  title: 'Conectividad' },
  { key: 'seguridad',     title: 'Seguridad' },
  { key: 'compra',        title: 'Garantía y contenido' },
  { key: 'general',       title: 'General' },
]

export function groupSpecs(specs) {
  if (!specs?.length) return []
  const buckets = {}
  specs.forEach(spec => {
    const key = CATEGORY_MAP[spec.label] || 'general'
    if (!buckets[key]) buckets[key] = []
    buckets[key].push(spec)
  })
  return CATEGORY_ORDER
    .filter(c => buckets[c.key]?.length)
    .map(c => ({ ...c, items: buckets[c.key] }))
}
