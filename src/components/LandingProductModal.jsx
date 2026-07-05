import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function LandingProductModal({ product, onClose }) {
  const isMobile = useBreakpoint(768)

  useEffect(() => {
    if (!product) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [product])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="landing-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(24px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '0 0 0' : '40px',
          }}
        >
          {/* Panel */}
          <motion.div
            key={product.name}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.32, 0, 0.16, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '100%' : 520,
              height: isMobile ? '100dvh' : 'auto',
              background: 'rgba(12,12,14,0.95)',
              border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.07)',
              borderRadius: isMobile ? 0 : 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 20, right: 20, zIndex: 10,
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 16, lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Imagen */}
            <div style={{
              width: '100%',
              height: isMobile ? '52dvh' : 320,
              flexShrink: 0,
              position: 'relative',
              background: 'radial-gradient(ellipse at center, rgba(14,167,183,0.06) 0%, transparent 70%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <motion.img
                src={product.image?.src}
                alt={product.image?.alt || product.name}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.32, 0, 0.16, 1], delay: 0.08 }}
                style={{
                  maxHeight: isMobile ? '80%' : 260,
                  maxWidth: '75%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 32px 48px rgba(0,0,0,0.6))',
                }}
              />
            </div>

            {/* Info */}
            <div style={{
              width: '100%', padding: isMobile ? '28px 32px 40px' : '28px 40px 40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', gap: 0,
            }}>
              {/* Nombre */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                style={{
                  fontSize: isMobile ? 'clamp(22px, 6vw, 28px)' : 26,
                  fontWeight: 400, letterSpacing: -1,
                  color: '#fff', margin: '0 0 12px',
                  lineHeight: 1.15,
                }}
              >
                {product.name}
              </motion.h2>

              {/* Descripción */}
              {product.description && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  style={{
                    fontSize: 13, color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.65, margin: '0 0 20px',
                    maxWidth: 340,
                  }}
                >
                  {product.description}
                </motion.p>
              )}

              {/* Variants */}
              {product.variants?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.3 }}
                  style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}
                >
                  {product.variants.map((v, i) => (
                    <span key={i} style={{
                      padding: '5px 14px', borderRadius: 99,
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.5)', fontSize: 11,
                      letterSpacing: 0.3,
                    }}>
                      {v}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Precio */}
              {product.price && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  style={{
                    fontSize: 22, fontWeight: 500,
                    color: '#0057FF', margin: '0 0 28px',
                    letterSpacing: -0.5,
                  }}
                >
                  {product.price}
                </motion.p>
              )}

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                style={{
                  display: 'flex', gap: 10,
                  flexDirection: isMobile ? 'column' : 'row',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                <a
                  href="/tienda"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: '#0057FF', color: '#fff',
                    padding: '13px 28px', borderRadius: 99,
                    fontSize: 13, fontWeight: 500,
                    width: isMobile ? '100%' : 'auto',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#337BFF'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0057FF'}
                >
                  Ver en tienda
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff',
                    padding: '13px 28px', borderRadius: 99,
                    fontSize: 13, fontWeight: 500,
                    width: isMobile ? '100%' : 'auto',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent' }}
                >
                  Cotizar
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


