import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, categories, devices, colorSwatches, basePrice, compatibleDevice, caseType, caseTypes, PHONE_FILTER_CATEGORIES } from '../data/products'
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
  const [activeDevices, setActiveDevices] = useState([])
  const [activeTypes, setActiveTypes] = useState([])
  const [activeBrands, setActiveBrands] = useState([])
  const [activeColors, setActiveColors] = useState([])
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalColorIdx, setModalColorIdx] = useState(0)
  const [modalSkipSpread, setModalSkipSpread] = useState(false)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = filterPanelOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [filterPanelOpen])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('producto')
    const color = params.get('color')
    const buscar = params.get('buscar')
    const categoria = params.get('categoria')
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
    if (buscar) setSearch(buscar)
    if (categoria && categories.some(c => c.id === categoria)) setActiveCategory(categoria)
  }, [])

  const toggle = (setter) => (value) =>
    setter(prev => prev.includes(value) ? prev.filter(x => x !== value) : [...prev, value])
  const toggleDevice = toggle(setActiveDevices)
  const toggleType = toggle(setActiveTypes)
  const toggleBrand = toggle(setActiveBrands)
  const toggleColor = toggle(setActiveColors)

  const resetFilters = () => {
    setActiveCategory('all')
    setActiveDevices([])
    setActiveTypes([])
    setActiveBrands([])
    setActiveColors([])
    setSearch('')
  }

  // Facetas en cascada: cada nivel se calcula sobre el filtrado por los niveles anteriores
  const byCategory = useMemo(() => {
    if (activeCategory === 'all') return products
    if (activeCategory === 'telefonos') return products.filter(p => PHONE_FILTER_CATEGORIES.includes(p.category))
    return products.filter(p => p.category === activeCategory)
  }, [activeCategory])

  const showDeviceFilter = activeCategory === 'fundas'
  const showTypeFilter = activeCategory === 'fundas'

  const byDevice = useMemo(() => {
    if (!showDeviceFilter || activeDevices.length === 0) return byCategory
    return byCategory.filter(p => activeDevices.includes(compatibleDevice(p)))
  }, [byCategory, activeDevices, showDeviceFilter])

  const availableTypes = useMemo(() => {
    if (!showTypeFilter) return []
    const set = new Set(byDevice.map(caseType).filter(Boolean))
    return caseTypes.filter(t => set.has(t))
  }, [byDevice, showTypeFilter])

  const byType = useMemo(() => {
    if (!showTypeFilter || activeTypes.length === 0) return byDevice
    return byDevice.filter(p => activeTypes.includes(caseType(p)))
  }, [byDevice, activeTypes, showTypeFilter])

  const availableBrands = useMemo(() =>
    [...new Set(byType.map(p => p.brand))].sort((a, b) => a.localeCompare(b))
  , [byType])

  const byBrand = useMemo(() =>
    activeBrands.length === 0 ? byType : byType.filter(p => activeBrands.includes(p.brand))
  , [byType, activeBrands])

  const availableColors = useMemo(() => {
    const names = new Set()
    byBrand.forEach(p => p.colorVariants.forEach(cv => { if (cv.color) names.add(cv.color) }))
    return colorSwatches.filter(c => names.has(c.color))
  }, [byBrand])

  const byColor = useMemo(() => {
    if (activeColors.length === 0) return byBrand
    return byBrand.filter(p => p.colorVariants.some(cv => activeColors.includes(cv.color)))
  }, [byBrand, activeColors])

  const availableDevices = useMemo(() => {
    if (!showDeviceFilter) return []
    const set = new Set(byCategory.map(compatibleDevice).filter(Boolean))
    return devices.filter(d => set.has(d))
  }, [byCategory, showDeviceFilter])

  const filtered = useMemo(() => {
    let list = [...byColor]
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    )
    if (sort === 'price-asc')  list.sort((a, b) => basePrice(a) - basePrice(b))
    if (sort === 'price-desc') list.sort((a, b) => basePrice(b) - basePrice(a))
    if (sort === 'name')       list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [byColor, search, sort])

  // Al cambiar de categoría, limpiamos filtros que ya no aplican
  const changeCategory = (id) => {
    setActiveCategory(id)
    setActiveDevices([])
    setActiveTypes([])
  }

  const activeFilterChips = [
    ...(activeCategory !== 'all' ? [{ type: 'category', label: categories.find(c => c.id === activeCategory)?.label, onRemove: () => changeCategory('all') }] : []),
    ...activeDevices.map(d => ({ type: 'device', label: d, onRemove: () => toggleDevice(d) })),
    ...activeTypes.map(t => ({ type: 'type', label: t, onRemove: () => toggleType(t) })),
    ...activeBrands.map(b => ({ type: 'brand', label: b, onRemove: () => toggleBrand(b) })),
    ...activeColors.map(c => ({ type: 'color', label: c, onRemove: () => toggleColor(c) })),
  ]

  const hasActiveFilters = activeFilterChips.length > 0

  /* ─── Secciones de filtro (reutilizadas en sidebar desktop + panel mobile) ─── */
  const FilterSections = () => {
    const [showAllBrands, setShowAllBrands] = useState(false)
    const [showAllColors, setShowAllColors] = useState(false)
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: '0 5px' }}>
      {/* TYPE */}
      <div>
        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.3, color: '#111' }}>
          Categoría
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {categories.map(cat => {
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => changeCategory(cat.id)}
                style={{
                  padding: '9px 15px', borderRadius: 99,
                  border: active ? '1.5px solid #111' : '1.5px solid rgba(0,0,0,0.15)',
                  background: active ? '#111' : '#fff',
                  color: active ? '#fff' : '#333',
                  fontSize: 12.5, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.12s',
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* DEVICE — solo si estamos viendo fundas */}
      {showDeviceFilter && availableDevices.length > 0 && (
        <div>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.3, color: '#111' }}>
            Dispositivo
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {availableDevices.map(d => {
              const active = activeDevices.includes(d)
              return (
                <button
                  key={d}
                  onClick={() => toggleDevice(d)}
                  style={{
                    padding: '9px 15px', borderRadius: 99,
                    border: active ? '1.5px solid #0057FF' : '1.5px solid rgba(0,0,0,0.15)',
                    background: active ? '#0057FF' : '#fff',
                    color: active ? '#fff' : '#333',
                    fontSize: 12.5, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.12s',
                  }}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* TIPO — línea del modelo (Liquid Air, Tough Armor, Symmetry...) */}
      {showTypeFilter && availableTypes.length > 0 && (
        <div>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.3, color: '#111' }}>
            Tipo
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {availableTypes.map(t => {
              const active = activeTypes.includes(t)
              return (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  style={{
                    padding: '8px 14px', borderRadius: 99,
                    border: active ? '1.5px solid #111' : '1.5px solid rgba(0,0,0,0.15)',
                    background: active ? '#111' : '#fff',
                    color: active ? '#fff' : '#333',
                    fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.12s',
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* MARCA */}
      {availableBrands.length > 0 && (
        <div>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.3, color: '#111' }}>
            Marca
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {(showAllBrands ? availableBrands : availableBrands.slice(0, 14)).map(b => {
              const active = activeBrands.includes(b)
              return (
                <button
                  key={b}
                  onClick={() => toggleBrand(b)}
                  style={{
                    padding: '8px 14px', borderRadius: 99,
                    border: active ? '1.5px solid #111' : '1.5px solid rgba(0,0,0,0.15)',
                    background: active ? '#111' : '#fff',
                    color: active ? '#fff' : '#333',
                    fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.12s',
                  }}
                >
                  {b}
                </button>
              )
            })}
            {availableBrands.length > 14 && (
              <button
                onClick={() => setShowAllBrands(v => !v)}
                style={{
                  padding: '8px 14px', borderRadius: 99,
                  border: '1.5px dashed rgba(0,87,255,0.4)',
                  background: 'transparent', color: '#0057FF',
                  fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {showAllBrands ? 'Ver menos' : `+${availableBrands.length - 14} más`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* COLOR */}
      {availableColors.length > 0 && (
        <div>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.3, color: '#111' }}>
            Color
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 14 }}>
            {(showAllColors ? availableColors : availableColors.slice(0, 20)).map(({ color, hex }) => {
              const active = activeColors.includes(color)
              return (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  title={color}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: hex, border: 'none', padding: 0, cursor: 'pointer',
                    boxShadow: active
                      ? '0 0 0 2.5px #fff, 0 0 0 4.5px #0057FF'
                      : '0 0 0 2.5px #fff, 0 0 0 4px rgba(0,0,0,0.15)',
                    transition: 'box-shadow 0.15s',
                  }}
                />
              )
            })}
            {availableColors.length > 20 && (
              <button
                onClick={() => setShowAllColors(v => !v)}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1.5px dashed rgba(0,87,255,0.4)',
                  background: 'transparent', color: '#0057FF',
                  fontSize: 10, fontWeight: 700, lineHeight: 1,
                  cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {showAllColors ? '−' : `+${availableColors.length - 20}`}
              </button>
            )}
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          style={{
            background: 'transparent', color: '#111', border: '1.5px solid #111',
            borderRadius: 99, padding: '13px 16px',
            fontSize: 13, fontWeight: 800, letterSpacing: -0.2,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          × Limpiar filtros
        </button>
      )}
    </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f3', fontFamily: 'inherit' }}>
      <AnnouncementBar />
      <Navbar />

      {/* Barra superior sticky: filtros (mobile), buscador, orden */}
      <div style={{
        position: 'sticky',
        top: 68,
        zIndex: 90,
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        {isMobile ? (
          <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Fila 1: buscador a todo lo ancho */}
            <div style={{ position: 'relative' }}>
              <svg
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar productos..."
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '10px 14px 10px 34px',
                  borderRadius: 99,
                  border: '1.5px solid rgba(0,0,0,0.1)',
                  background: '#f5f5f3',
                  fontSize: 13,
                  color: '#111',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Fila 2: filtros + orden */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <button
                onClick={() => setFilterPanelOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '9px 14px', borderRadius: 99,
                  border: hasActiveFilters ? 'none' : '1.5px solid rgba(0,0,0,0.12)',
                  background: hasActiveFilters ? '#0057FF' : 'transparent',
                  color: hasActiveFilters ? '#fff' : '#333',
                  fontSize: 12.5, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
                </svg>
                Filtros{hasActiveFilters ? ` (${activeFilterChips.length})` : ''}
              </button>

              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  padding: '9px 10px',
                  borderRadius: 99,
                  border: '1.5px solid rgba(0,0,0,0.12)',
                  background: '#f5f5f3',
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: '#111',
                  outline: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  minWidth: 0,
                }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div style={{
            maxWidth: 1340,
            margin: '0 auto',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 54,
          }}>
            <div style={{ flex: 1 }} />

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

            <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.1)', flexShrink: 0 }} />

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
        )}
      </div>

      {/* Page title */}
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: isMobile ? '28px 16px 20px' : '40px 32px 20px' }}>
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

        {/* Chips de filtros activos */}
        {hasActiveFilters && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 16 }}>
            {activeFilterChips.map((chip, i) => (
              <button
                key={chip.type + chip.label + i}
                onClick={chip.onRemove}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 10px 6px 12px', borderRadius: 99,
                  border: '1.5px solid rgba(0,0,0,0.12)', background: '#fff',
                  fontSize: 12, color: '#333', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {chip.label}
                <span style={{ fontSize: 13, color: '#999', lineHeight: 1 }}>×</span>
              </button>
            ))}
            <button
              onClick={resetFilters}
              style={{
                fontSize: 12, color: '#0057FF', fontWeight: 600,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px 4px', fontFamily: 'inherit',
              }}
            >
              Limpiar todo
            </button>
          </div>
        )}
      </div>

      {/* Body: sidebar (desktop) + grid */}
      <div style={{
        maxWidth: 1340, margin: '0 auto',
        padding: isMobile ? '0 16px 80px' : '0 32px 100px',
        display: 'flex', gap: 40, alignItems: 'flex-start',
      }}>
        {!isMobile && (
          <aside style={{
            flex: '0 0 220px',
            position: 'sticky', top: 138,
            maxHeight: 'calc(100vh - 158px)', overflowY: 'auto',
            overscrollBehavior: 'contain',
            paddingRight: 4, paddingBottom: 20,
          }}>
            <FilterSections />
          </aside>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
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
      </div>

      {/* Panel de filtros mobile */}
      <AnimatePresence>
        {isMobile && filterPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setFilterPanelOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.3)' }}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              style={{
                position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 301,
                background: '#fff', borderRadius: '20px 20px 0 0',
                maxHeight: '85vh', display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', flexShrink: 0,
              }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>Filtros</span>
                <button
                  onClick={() => setFilterPanelOpen(false)}
                  style={{
                    width: 32, height: 32, borderRadius: '50%', border: 'none',
                    background: 'rgba(0,0,0,0.06)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#555',
                  }}
                >×</button>
              </div>
              <div style={{ padding: '20px', overflowY: 'auto', flex: 1, minHeight: 0, overscrollBehavior: 'contain' }}>
                <FilterSections />
              </div>
              <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
                <button
                  onClick={() => setFilterPanelOpen(false)}
                  style={{
                    width: '100%', background: '#0057FF', color: '#fff', border: 'none',
                    borderRadius: 8, padding: '14px', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Ver {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <WhatsAppFab />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            allProducts={products}
            onClose={() => { setSelectedProduct(null); setModalSkipSpread(false); setModalColorIdx(0) }}
            initialColorIdx={modalColorIdx}
            skipSpread={modalSkipSpread}
            theme={selectedProduct.category === 'gaming' ? 'green' : 'blue'}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
