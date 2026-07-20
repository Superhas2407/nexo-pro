import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, basePrice } from '../data/products'
import Navbar from '../components/Navbar'
import WhatsAppFab from '../components/WhatsAppFab'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import Logo from '../components/Logo'
import { useBreakpoint } from '../hooks/useBreakpoint'

const GREEN = '#1FD37A'

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

export default function GamingZone() {
  const isMobile = useBreakpoint(768)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalColorIdx, setModalColorIdx] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const gaming = products
    .filter(p => p.category === 'gaming')
    .sort((a, b) => basePrice(a) - basePrice(b))

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'inherit' }}>
      <AnimatePresence>
        {loading && <GamingLoader />}
      </AnimatePresence>

      <Navbar />

      {/* Hero */}
      <div style={{
        padding: isMobile ? '110px 20px 40px' : '150px 32px 64px',
        maxWidth: 1340, margin: '0 auto',
        borderBottom: `1px solid rgba(31,211,122,0.15)`,
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
          {gaming.length} productos bajo pedido — de mandos pro hasta estaciones de carga y controles de simulación.
        </p>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: isMobile ? '32px 16px 100px' : '48px 32px 120px' }}>
        <div className="store-grid">
          {gaming.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={(colorIdx = 0) => {
                setModalColorIdx(colorIdx)
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
            skipSpread={true}
            theme="green"
            onClose={() => { setSelectedProduct(null); setModalColorIdx(0) }}
          />
        )}
      </AnimatePresence>

      <WhatsAppFab />
    </div>
  )
}
