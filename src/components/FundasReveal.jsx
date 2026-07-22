import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function FundasReveal() {
  const containerRef = useRef(null)
  const isMobile = useBreakpoint(768)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const imgScale  = useTransform(scrollYProgress, [0, 0.55], isMobile ? [1, 1] : [1.08, 1])
  const imgY      = useTransform(scrollYProgress, [0, 0.55], isMobile ? ['0%', '0%'] : ['-4%', '0%'])
  const overlayOp = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.45, 0.25, 0.55])

  const eyeOp   = useTransform(scrollYProgress, [0, 0.18], isMobile ? [1, 1] : [0, 1])
  const eyeY    = useTransform(scrollYProgress, [0, 0.18], isMobile ? [0, 0] : [20, 0])

  const titleOp = useTransform(scrollYProgress, [0.12, 0.32], isMobile ? [1, 1] : [0, 1])
  const titleY  = useTransform(scrollYProgress, [0.12, 0.32], isMobile ? [0, 0] : [32, 0])

  const infoOp  = useTransform(scrollYProgress, [0.32, 0.5], isMobile ? [1, 1] : [0, 1])
  const infoY   = useTransform(scrollYProgress, [0.32, 0.5], isMobile ? [0, 0] : [24, 0])

  const ctaOp   = useTransform(scrollYProgress, [0.52, 0.68], isMobile ? [1, 1] : [0, 1])
  const ctaY    = useTransform(scrollYProgress, [0.52, 0.68], isMobile ? [0, 0] : [20, 0])

  const hintOp  = useTransform(scrollYProgress, [0, 0.12], isMobile ? [0, 0] : [1, 0])

  return (
    <div ref={containerRef} style={{ height: isMobile ? '260vh' : '240vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100svh', overflow: 'hidden',
        background: '#0b3a66',
      }}>

        {/* Imagen principal */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          scale: imgScale, y: imgY,
        }}>
          <img
            src="/fundas-reveal.webp"
            alt="Fundas PULSE"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: isMobile ? '25% center' : 'center 40%',
            }}
          />
        </motion.div>

        {/* Overlay fijo — oscurece el bottom para legibilidad */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.82) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Overlay animado — efecto cinético en scroll */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.18)',
          opacity: overlayOp,
          pointerEvents: 'none',
        }} />

        {/* Contenido */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          padding: isMobile ? '0 24px 56px' : '0 48px 72px',
          textAlign: 'center',
        }}>
          <div>
            <motion.p style={{
              opacity: eyeOp, y: eyeY,
              fontSize: isMobile ? 11 : 12,
              fontWeight: 600, letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#0057FF',
              margin: '0 0 10px', lineHeight: 1,
            }}>
              Fundas · Protección
            </motion.p>
            <motion.h2 style={{
              opacity: titleOp, y: titleY,
              fontSize: isMobile ? 'clamp(64px, 16vw, 100px)' : 'clamp(90px, 10vw, 148px)',
              fontWeight: 200, letterSpacing: isMobile ? -3 : -6,
              color: '#fff', lineHeight: 0.9,
              marginBottom: 20,
            }}>
              Línea Fundas
            </motion.h2>
          </div>

          {/* Marcas + precio */}
          <motion.div style={{
            opacity: infoOp, y: infoY,
            display: 'flex', alignItems: 'center',
            gap: 14, marginBottom: 36,
          }}>
            <span style={{
              fontSize: 12, color: 'rgba(255,255,255,0.45)',
              fontWeight: 400, letterSpacing: 0.5,
            }}>
              Spigen · UAG · OtterBox
            </span>
            <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.18)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500, letterSpacing: 0.5 }}>
              Desde REF 13
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div style={{
            opacity: ctaOp, y: ctaY,
            display: 'flex', gap: 12,
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? '100%' : 'auto',
          }}>
            <a
              href="/tienda?categoria=fundas"
              style={{
                display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
                background: '#0057FF', color: '#fff',
                padding: '13px 32px', borderRadius: 99,
                fontSize: 13, fontWeight: 500,
                width: isMobile ? '100%' : 'auto',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#337BFF'}
              onMouseLeave={e => e.currentTarget.style.background = '#0057FF'}
            >
              Ver fundas
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="https://wa.me/584223194044"
              style={{
                display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
                border: '1.5px solid rgba(255,255,255,0.3)', color: '#fff',
                padding: '13px 32px', borderRadius: 99,
                fontSize: 13, fontWeight: 500,
                width: isMobile ? '100%' : 'auto',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent' }}
            >
              Cotizar
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div style={{
          position: 'absolute', bottom: 28, left: '50%',
          translateX: '-50%', opacity: hintOp,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: 9, letterSpacing: 2.5, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontWeight: 600 }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}
