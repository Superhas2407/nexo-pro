import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint'

const STORAGE_KEY = 'pulse_cookie_consent'

export default function CookieConsent() {
  const isMobile = useBreakpoint(768)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  const respond = (value) => {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            zIndex: 1000,
            bottom: isMobile ? 96 : 24,
            left: isMobile ? 16 : 24,
            right: isMobile ? 16 : 'auto',
            width: isMobile ? 'auto' : 380,
            background: '#fff',
            borderRadius: 20,
            boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            padding: 20,
          }}
        >
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#333', margin: '0 0 16px' }}>
            Usamos cookies para mejorar tu experiencia y recordar tus preferencias. Al continuar navegando aceptas nuestra{' '}
            <a href="/terminos#cookies" style={{ color: '#0057FF', fontWeight: 600 }}>Política de Cookies</a>.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => respond('accepted')}
              style={{
                flex: 1, background: '#0057FF', color: '#fff', border: 'none',
                borderRadius: 99, padding: '11px 16px', fontSize: 13, fontWeight: 600,
              }}
            >
              Aceptar
            </button>
            <button
              onClick={() => respond('rejected')}
              style={{
                flex: 1, background: 'transparent', color: '#111', border: '1.5px solid #e5e5e5',
                borderRadius: 99, padding: '11px 16px', fontSize: 13, fontWeight: 600,
              }}
            >
              Rechazar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
