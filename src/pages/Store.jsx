import { useState, useMemo, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { products, categories, brands, basePrice } from '../data/products'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import AnnouncementBar from '../components/AnnouncementBar'
import Navbar from '../components/Navbar'
import WhatsAppFab from '../components/WhatsAppFab'
import { useBreakpoint } from '../hooks/useBreakpoint'

const SORT_OPTIONS = [
  { value: 'default',    label: 'Destacados' },
  { value: 'price-asc',  label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'name',       label: 'Nombre A-Z' },
]

export default function Store() {
  const isMobile = useBreakpoint(768)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeBrands, setActiveBrands] = useState([])
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalColorIdx, setModalColorIdx] = useState(0)
  const [modalSkipSpread, setModalSkipSpread] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('producto')
    const color = params.get('color')
    if (id) {
      const found = products.find(p => p.id === id)
      if (found) {
        const colorIdx = color
          ? Math.max(0, found.colorVariants.findIndex(v => v.color === color))
          : 0
        setModalColorIdx(colorIdx)
        setModalSkipSpread(!!color && found.category !== 'oakley')
        setSelectedProduct(found)
      }
    }
  }, [])

  const toggleBrand = (b) =>
    setActiveBrands(prev =>
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    )

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory)
    if (activeBrands.length > 0) list = list.filter(p => activeBrands.includes(p.brand))
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    )
    if (sort === 'price-asc')  list.sort((a, b) => basePrice(a) - basePrice(b))
    if (sort === 'price-desc') list.sort((a, b) => basePrice(b) - basePrice(a))
    if (sort === 'name')       list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCategory, activeBrands, sort, search])

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f3', fontFamily: 'inherit' }}>
      <AnnouncementBar />
      <Navbar />

      {/* Barra de filtros horizontal sticky */}
      <div style={{
        position: 'sticky',
        top: 68,
        zIndex: 90,
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          maxWidth: 1340,
          margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 54,
          overflow: 'auto',
          scrollbarWidth: 'none',
        }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 6, flex: 1, alignItems: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 99,
                  border: activeCategory === cat.id
                    ? '1.5px solid #111'
                    : '1.5px solid rgba(0,0,0,0.12)',
                  background: activeCategory === cat.id ? '#111' : 'transparent',
                  color: activeCategory === cat.id ? '#fff' : '#555',
                  fontSize: 12,
                  fontWeight: activeCategory === cat.id ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  letterSpacing: 0.2,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              style={{
                padding: '6px 12px 6px 30px',
                borderRadius: 99,
                border: '1.5px solid rgba(0,0,0,0.12)',
                background: '#f5f5f3',
                fontSize: 12,
                color: '#111',
                outline: 'none',
                width: 160,
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Separador */}
          <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.1)', flexShrink: 0 }} />

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: '#999', whiteSpace: 'nowrap' }}>Ordenar:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                padding: '5px 10px',
                borderRadius: 8,
                border: '1.5px solid rgba(0,0,0,0.12)',
                background: '#f5f5f3',
                fontSize: 12,
                color: '#111',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Page title */}
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: isMobile ? '28px 16px 20px' : '40px 32px 28px' }}>
        <h1 style={{
          fontSize: 'clamp(26px, 3.5vw, 38px)',
          fontWeight: 500,
          letterSpacing: -1,
          color: '#111',
          margin: 0,
        }}>
          Tienda
        </h1>
        <p style={{ fontSize: 13, color: '#888', margin: '6px 0 0' }}>
          {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: isMobile ? '0 16px 80px' : '0 32px 100px' }}>
        {/* Filtros de marca inline */}
        {brands.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: '#aaa' }}>
              Marca
            </span>
            {brands.map(b => {
              const active = activeBrands.includes(b)
              return (
                <label
                  key={b}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                >
                  <div
                    onClick={() => toggleBrand(b)}
                    style={{
                      width: 15, height: 15, borderRadius: 4, flexShrink: 0,
                      border: active ? '2px solid #111' : '2px solid #ccc',
                      background: active ? '#111' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    {active && (
                      <svg width="8" height="8" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 12, color: active ? '#111' : '#666', fontWeight: active ? 500 : 400 }}>
                    {b}
                  </span>
                </label>
              )
            })}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="store-grid">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={(colorIdx = 0, colorPicked = false) => {
                  setModalColorIdx(colorIdx)
                  setModalSkipSpread(colorPicked)
                  setSelectedProduct(p)
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ marginBottom: 16 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <p style={{ fontSize: 15, color: '#aaa', margin: 0 }}>Sin resultados. Intenta otros filtros.</p>
          </div>
        )}
      </div>

      <WhatsAppFab />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            allProducts={products}
            onClose={() => { setSelectedProduct(null); setModalSkipSpread(false); setModalColorIdx(0) }}
            initialColorIdx={modalColorIdx}
            skipSpread={modalSkipSpread}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
