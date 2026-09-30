import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { products } from './src/data/products.js'
import { WILDCARD, webPriceKey } from './src/data/webPriceKey.js'

// Catálogo de la web como JSON (/web-catalog.json) — PULSE Stock lo lee para
// vincular cada producto del inventario con sus variantes en la tienda.
function webCatalogJson() {
  const items = []
  for (const p of products) {
    items.push({ key: webPriceKey(p.id, WILDCARD, WILDCARD), label: `${p.name} — todas las variantes` })
    for (const cv of p.colorVariants) {
      for (const s of cv.storage) {
        items.push({
          key: webPriceKey(p.id, cv.color, s.label),
          label: [p.name, cv.color, s.label].filter(Boolean).join(' · '),
          price: s.price,
        })
      }
    }
  }
  return JSON.stringify(items)
}

function webCatalogPlugin() {
  return {
    name: 'web-catalog',
    configureServer(server) {
      server.middlewares.use('/web-catalog.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(webCatalogJson())
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'web-catalog.json', source: webCatalogJson() })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), webCatalogPlugin()],
})
