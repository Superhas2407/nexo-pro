import { useEffect, useRef } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'
import Logo from './Logo'

const HERO_FRAME_COUNT = 49

function frameSrc(i) {
  return `/landing-hero-frames/frame-${String(i + 1).padStart(3, '0')}.webp`
}

function HeroContent({ isMobile }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: isMobile ? 'flex-end' : 'center',
      padding: isMobile
        ? '0 24px 56px'
        : `0 0 0 64px`,
      maxWidth: isMobile ? '100%' : '48%',
      pointerEvents: 'none',
    }}>
      <h1 style={{
        fontSize: isMobile ? 'clamp(36px, 10vw, 52px)' : 'clamp(44px, 4.5vw, 72px)',
        fontWeight: 700,
        lineHeight: 1.02,
        letterSpacing: isMobile ? -1.5 : -2.5,
        color: '#fff',
        margin: '0 0 14px',
        whiteSpace: 'pre-line',
      }}>
        {'Tecnología\naspiracional.'}
      </h1>

      <p style={{
        fontSize: isMobile ? 14 : 16,
        color: 'rgba(255,255,255,0.65)',
        lineHeight: 1.6,
        margin: '0 0 32px',
        maxWidth: 380,
      }}>
        Apple, DJI y Oakley originales.<br />
        Entrega inmediata y garantía oficial.
      </p>

      <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row', pointerEvents: 'auto' }}>
        <a href="/tienda" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: '#0057FF', color: '#fff',
          fontSize: 15, fontWeight: 600,
          padding: isMobile ? '15px 28px' : '15px 32px',
          borderRadius: 99, textDecoration: 'none',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#337BFF'}
          onMouseLeave={e => e.currentTarget.style.background = '#0057FF'}
        >
          Ver productos
        </a>
        <a href="https://wa.me/584223194044?text=Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20PULSE." style={{
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

export default function HeroSlider() {
  const isMobile = useBreakpoint(768)
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const currentFrameRef = useRef(-1)
  const logoRef = useRef(null)

  // Precarga los fotogramas del Oakley Meta Vanguard (scrub por canvas, sin decodificar video)
  useEffect(() => {
    if (isMobile) return
    const imgs = new Array(HERO_FRAME_COUNT)
    for (let i = 0; i < HERO_FRAME_COUNT; i++) {
      const img = new Image()
      img.src = frameSrc(i)
      imgs[i] = img
    }
    framesRef.current = imgs
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
      // El logo PULSE está al frente al cargar y se desvanece en el primer 35% del scroll
      if (logoRef.current) {
        const logoOpacity = Math.min(1, Math.max(0, 1 - progress / 0.35))
        logoRef.current.style.opacity = String(logoOpacity)
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

  if (isMobile) {
    return (
      <div style={{
        position: 'relative',
        height: '100svh',
        minHeight: 600,
        overflow: 'hidden',
        marginTop: -68,
        background: '#080808',
      }}>
        <img
          src="/hero-pulse-v2-mobile.webp"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
        <HeroContent isMobile />
      </div>
    )
  }

  return (
    <div ref={heroRef} style={{ height: '170vh', position: 'relative', marginTop: -68 }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100svh', minHeight: 640,
        overflow: 'hidden',
        background: '#050b1a',
      }}>
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(5,11,26,0.75) 0%, rgba(5,11,26,0.35) 45%, rgba(5,11,26,0.15) 70%, rgba(5,11,26,0.45) 100%)',
        }} />
        <div
          ref={logoRef}
          style={{
            position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)',
            pointerEvents: 'none', transition: 'opacity 0.1s linear',
          }}
        >
          <Logo variant="white" height={64} accent="#0057FF" />
        </div>
        <HeroContent isMobile={false} />
      </div>
    </div>
  )
}
