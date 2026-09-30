import { products } from './products'
import { WILDCARD, webPriceKey } from './webPriceKey'

// Precios y disponibilidad publicados desde PULSE Stock (colección pública
// `webPrices` en Firestore). Solo trae el precio de venta detal, si está
// agotado y si está oculto — costos y márgenes nunca salen de PULSE Stock. Se aplican sobre
// `products` antes del primer render, así todos los componentes leen el
// precio vigente sin cambios. Variantes agotadas: `storage[].soldOut`.
const WEB_PRICES_URL =
  'https://firestore.googleapis.com/v1/projects/pulse--stock/databases/(default)/documents/webPrices'
const CACHE_KEY = 'pulse_web_prices_v2'
const WAIT_MS = 1500

async function fetchWebPrices() {
  const entries = {} // key -> { price, soldOut }
  let pageToken = ''
  do {
    const url = `${WEB_PRICES_URL}?pageSize=300${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`webPrices ${res.status}`)
    const data = await res.json()
    for (const doc of data.documents ?? []) {
      const f = doc.fields ?? {}
      const key = f.key?.stringValue
      if (!key) continue
      const price = Number(f.priceUsd?.doubleValue ?? f.priceUsd?.integerValue)
      entries[key] = {
        price: Number.isFinite(price) && price > 0 ? price : null,
        soldOut: f.soldOut?.booleanValue === true,
        hidden: f.hidden?.booleanValue === true,
      }
    }
    pageToken = data.nextPageToken ?? ''
  } while (pageToken)
  return entries
}

// Precio original de products.js por variante — si PULSE Stock deja de
// publicar una variante, vuelve a este.
const staticPrices = new WeakMap()

// Catálogo completo antes de ocultar nada — "Ocultar de la web" en PULSE
// Stock publica "producto|*|*" con hidden y el producto sale de `products`.
const catalog = [...products]

function applyWebPrices(entries) {
  const visible = catalog.filter(p => !entries[webPriceKey(p.id, WILDCARD, WILDCARD)]?.hidden)
  products.splice(0, products.length, ...visible)

  for (const p of catalog) {
    const all = entries[webPriceKey(p.id, WILDCARD, WILDCARD)]
    for (const cv of p.colorVariants) {
      for (const s of cv.storage) {
        if (!staticPrices.has(s)) staticPrices.set(s, s.price)
        const e = entries[webPriceKey(p.id, cv.color, s.label)] ?? all
        s.price = e?.price ?? staticPrices.get(s)
        s.soldOut = e?.soldOut === true
      }
    }
  }
}

const readCache = () => {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY)) } catch { return null }
}
const writeCache = (entries) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entries))
    localStorage.removeItem('pulse_web_prices') // formato anterior, solo precios
  } catch { /* sin storage */ }
}

// Aplica los precios de la última visita al instante y espera un momento por
// los actuales. Si tardan más de WAIT_MS la página carga igual y los nuevos
// quedan guardados para la próxima visita.
export function loadWebPrices() {
  const cached = readCache()
  if (cached) applyWebPrices(cached)

  let rendered = false
  const fresh = fetchWebPrices()
    .then(entries => {
      writeCache(entries)
      if (!rendered) applyWebPrices(entries)
    })
    .catch(() => { /* sin conexión o sin permiso — quedan los precios de products.js */ })

  const timeout = new Promise(resolve => setTimeout(resolve, WAIT_MS))
  return Promise.race([fresh, timeout]).then(() => { rendered = true })
}
