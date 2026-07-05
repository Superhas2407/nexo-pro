import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function CharStagger({ text }) {
  const chars = text.split('')
  return (
    <span style={{ display: 'inline-flex', overflow: 'visible' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(10px)', scale: 3, skewY: 3, x: 40 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, skewY: 0, x: 0 }}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 400,
            delay: 0.4 + i * 0.04,
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

function CyclingText({ texts, interval = 1800 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % texts.length), interval)
    return () => clearInterval(id)
  }, [texts, interval])

  return (
    <div style={{ position: 'relative', height: 22, overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            margin: 0, fontSize: 13, fontWeight: 500,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: 0.5, textAlign: 'center',
          }}
        >
          {texts[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDone?.(), 800)
    }, 2800)
    return () => clearTimeout(id)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#040e0f', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Blob izquierda-abajo */}
          <motion.div
            initial={{ x: -900, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 2.2 }}
            style={{
              position: 'absolute', bottom: -200, left: -200,
              width: 640, height: 640, borderRadius: '50%',
              background: 'radial-gradient(60% 60% at 50% 50%, rgba(14,167,183,0.55) 0%, transparent 100%)',
              filter: 'blur(57px)',
              pointerEvents: 'none',
            }}
          />

          {/* Blob derecha-arriba */}
          <motion.div
            initial={{ x: 900, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 2.2 }}
            style={{
              position: 'absolute', top: -200, right: -200,
              width: 640, height: 640, borderRadius: '50%',
              background: 'radial-gradient(60% 60% at 50% 50%, rgba(7,83,86,0.7) 0%, transparent 100%)',
              filter: 'blur(57px)',
              pointerEvents: 'none',
            }}
          />

          {/* Contenido */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(52px, 8vw, 108px)',
              fontWeight: 400,
              color: '#fff',
              letterSpacing: -3,
              lineHeight: 1,
              marginBottom: 18,
            }}>
              <CharStagger text="NEXO" />
              <span style={{ color: '#0057FF' }}> </span>
              <CharStagger text="PRO" />
            </h1>

            <motion.div
              initial={{ opacity: 0, scale: 1.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 1.4, delay: 0.5 }}
            >
              <CyclingText
                texts={[
                  'Tecnología aspiracional.',
                  'Apple · DJI · Oakley Meta.',
                  'Distribución oficial en México.',
                ]}
                interval={1600}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

