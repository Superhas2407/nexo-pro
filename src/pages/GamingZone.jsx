import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, basePrice, gamingTypes } from '../data/products'
import Navbar from '../components/Navbar'
import WhatsAppFab from '../components/WhatsAppFab'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import Logo from '../components/Logo'
import { useBreakpoint } from '../hooks/useBreakpoint'

const GREEN = '#1FD37A'
const HERO_FRAME_COUNT = 49

function frameSrc(i) {
  return `/gaming-hero-frames/frame-${String(i + 1).padStart(3, '0')}.webp`
}

function GamingLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: '#0a0a0a',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Logo variant="white" height={40} accent={GREEN} />
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 2, background: GREEN, borderRadius: 2 }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#999', margin: 0 }}
      >
        Entrando a la Zona Gaming
      </motion.p>
    </motion.div>
  )
}

function HeroContent({ isMobile, gamingCount }) {
  return (
    <div style={{
      padding: isMobile ? '0 20px 40px' : '0 32px 56px',
      maxWidth: 1340, margin: '0 auto',
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 14px', borderRadius: 99,
        border: `1px solid ${GREEN}`, color: GREEN,
        fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
        marginBottom: 20,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN }} />
        Zona Gaming
      </span>
      <h1 style={{
        fontSize: 'clamp(34px, 6vw, 64px)', fontWeight: 500, letterSpacing: -1.5,
        color: '#fff', margin: 0, lineHeight: 1.05,
      }}>
        Mandos, docks y<br />volantes para jugar en serio.
      </h1>
      <p style={{ fontSize: 15, color: '#999', margin: '16px 0 0', maxWidth: 520 }}>
        {gamingCount} productos bajo pedido — de mandos pro hasta estaciones de carga y controles de simulación.
      </p>

      <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row', marginTop: 32 }}>
        <a href="#gaming-grid" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: GREEN, color: '#0a0a0a',
          fontSize: 15, fontWeight: 600,
          padding: isMobile ? '15px 28px' : '15px 32px',
          borderRadius: 99, textDecoration: 'none',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#5be89f'}
          onMouseLeave={e => e.currentTarget.style.background = GREEN}
        >
          Ver productos
        </a>
        <a href="https://wa.me/584223194044?text=Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20Zona%20Gaming%20de%20PULSE." style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          border: '1.5px solid rgba(255,255,255,0.45)', color: '#fff',
          fontSize: 15, fontWeight: 600,
          padding: isMobile ? '15px 28px' : '15px 32px',
          borderRadius: 99, textDecoration: 'none',
          transition: 'border-color 0.2s, background 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'transparent' }}
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function GamingZone() {
  const isMobile = useBreakpoint(768)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalColorIdx, setModalColorIdx] = useState(0)
  const [modalSkipSpread, setModalSkipSpread] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState('all')
  const [activeBrands, setActiveBrands] = useState([])
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const currentFrameRef = useRef(-1)
  const heroContentRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  // Precarga todos los fotogramas del hero (scrub por canvas, sin decodificar video)
  useEffect(() => {
    if (isMobile) return
    let cancelled = false
    const imgs = new Array(HERO_FRAME_COUNT)
    for (let i = 0; i < HERO_FRAME_COUNT; i++) {
      const img = new Image()
      img.src = frameSrc(i)
      imgs[i] = img
    }
    framesRef.current = imgs
    return () => { cancelled = true }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const drawFrame = (index) => {
      const img = framesRef.current[index]
      if (!img || !img.complete || !img.naturalWidth) return false
      const dpr = window.devicePixelRatio || 1
      const cw = canvas.clientWidth * dpr
      const ch = canvas.clientHeight * dpr
      if (canvas.width !== cw) canvas.width = cw
      if (canvas.height !== ch) canvas.height = ch
      // object-fit: cover
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      const x = (cw - w) / 2
      const y = (ch - h) / 2
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, x, y, w, h)
      return true
    }

    const getProgress = () => {
      const hero = heroRef.current
      if (!hero) return 0
      const rect = hero.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return 0
      return Math.min(1, Math.max(0, -rect.top / scrollable))
    }

    const requestFrame = () => {
      const progress = getProgress()
      const idx = Math.min(HERO_FRAME_COUNT - 1, Math.max(0, Math.round(progress * (HERO_FRAME_COUNT - 1))))
      if (idx !== currentFrameRef.current) {
        if (drawFrame(idx)) currentFrameRef.current = idx
      }
      // El texto/botones solo aparecen al terminar el scroll del parallax, no durante el scrub
      if (heroContentRef.current) {
        const revealOp = Math.min(1, Math.max(0, (progress - 0.85) / 0.15))
        heroContentRef.current.style.opacity = String(revealOp)
        heroContentRef.current.style.pointerEvents = revealOp > 0.5 ? 'auto' : 'none'
      }
    }

    requestFrame()
    window.addEventListener('scroll', requestFrame, { passive: true })
    window.addEventListener('resize', requestFrame)
    const preloadPoll = setInterval(requestFrame, 200)
    return () => {
      window.removeEventListener('scroll', requestFrame)
      window.removeEventListener('resize', requestFrame)
      clearInterval(preloadPoll)
    }
  }, [isMobile])

  const allGaming = products
    .filter(p => p.category === 'gaming')
    .sort((a, b) => basePrice(a) - basePrice(b))

  const availableBrands = [...new Set(
    (activeType === 'all' ? allGaming : allGaming.filter(p => p.gamingType === activeType)).map(p => p.brand)
  )].sort((a, b) => a.localeCompare(b))

  const gaming = allGaming
    .filter(p => activeType === 'all' || p.gamingType === activeType)
    .filter(p => activeBrands.length === 0 || activeBrands.includes(p.brand))

  const toggleBrand = (b) =>
    setActiveBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])

  const changeType = (id) => {
    setActiveType(id)
    setActiveBrands([])
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'inherit' }}>
      <AnimatePresence>
        {loading && <GamingLoader />}
      </AnimatePresence>

      <Navbar />

      {/* Hero — secuencia de fotogramas en canvas, scrubbeada con el scroll (sin latencia de decodificación de video) */}
      {isMobile ? (
        <div style={{ position: 'relative' }}>
          <img
            src="/gaming-hero-bg-mobile.webp"
            alt="PULSE Zona Gaming"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(10,10,10,0) 45%, rgba(10,10,10,0.9) 88%, #0a0a0a 100%)',
          }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
            <HeroContent isMobile={isMobile} gamingCount={allGaming.length} />
          </div>
        </div>
      ) : (
        <div ref={heroRef} style={{ height: '220vh', position: 'relative' }}>
          <div style={{
            position: 'sticky', top: 0,
            height: '100svh', overflow: 'hidden',
            background: '#0a0a0a',
          }}>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(10,10,10,0) 45%, rgba(10,10,10,0.88) 88%, #0a0a0a 100%)',
            }} />
            <div ref={heroContentRef} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, opacity: 0, transition: 'opacity 0.15s linear' }}>
              <HeroContent isMobile={isMobile} gamingCount={allGaming.length} />
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div id="gaming-grid" style={{ maxWidth: 1340, margin: '0 auto', padding: isMobile ? '24px 16px 0' : '40px 32px 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {gamingTypes.map(t => {
            const active = activeType === t.id
            return (
              <button
                key={t.id}
                onClick={() => changeType(t.id)}
                style={{
                  padding: '9px 15px', borderRadius: 99,
                  border: active ? `1.5px solid ${GREEN}` : '1.5px solid rgba(255,255,255,0.18)',
                  background: active ? GREEN : 'transparent',
                  color: active ? '#0a0a0a' : '#ccc',
                  fontSize: 12.5, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.12s',
                }}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {availableBrands.length > 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {availableBrands.map(b => {
              const active = activeBrands.includes(b)
              return (
                <button
                  key={b}
                  onClick={() => toggleBrand(b)}
                  style={{
                    padding: '7px 13px', borderRadius: 99,
                    border: active ? `1.5px solid ${GREEN}` : '1px solid rgba(255,255,255,0.12)',
                    background: active ? 'rgba(31,211,122,0.12)' : 'transparent',
                    color: active ? GREEN : '#999',
                    fontSize: 11.5, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.12s',
                  }}
                >
                  {b}
                </button>
              )
            })}
          </div>
        )}

        <p style={{ fontSize: 12, color: '#666', margin: '0 0 20px' }}>
          {gaming.length} producto{gaming.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: isMobile ? '0 16px 100px' : '0 32px 120px' }}>
        <div className="store-grid">
          {gaming.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              theme="green"
              onClick={(colorIdx = 0, colorPicked = false) => {
                setModalColorIdx(colorIdx)
                setModalSkipSpread(colorPicked)
                setSelectedProduct(p)
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            allProducts={products}
            initialColorIdx={modalColorIdx}
            skipSpread={modalSkipSpread}
            theme="green"
            onClose={() => { setSelectedProduct(null); setModalColorIdx(0); setModalSkipSpread(false) }}
          />
        )}
      </AnimatePresence>

      <WhatsAppFab />
    </div>
  )
}
