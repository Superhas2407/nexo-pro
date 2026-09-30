import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { products, categories } from './src/data/products.js'
import { webPriceKey } from './src/data/webPriceKey.js'

// Catálogo de la web como JSON (/web-catalog.json) — PULSE Stock lo lee para
// su pestaña "Inventario web" y para vincular productos del inventario con
// sus variantes en la tienda. `price` es el precio de products.js.
function webCatalogJson() {
  return JSON.stringify({
    categories: categories.filter(c => c.id !== 'all'),
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      image: p.colorVariants[0]?.image ?? null,
      variants: p.colorVariants.flatMap(cv => cv.storage.map(s => ({
        key: webPriceKey(p.id, cv.color, s.label),
        color: cv.color ?? null,
        storage: s.label ?? null,
        price: s.price,
      }))),
    })),
  })
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
