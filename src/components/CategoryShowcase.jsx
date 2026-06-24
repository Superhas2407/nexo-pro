import { useRef, useState, useEffect } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'

const categories = [
  {
    label: 'iPhone',
    sub: 'iPhone 17 Pro & Pro Max',
    image: '/iphone-orange-hand.webp',
    href: '/tienda?categoria=iphone',
  },
  {
    label: 'DJI',
    sub: 'Estabilizadores & Audio',
    image: '/dji-osmo7p-hand.webp',
    href: '/tienda?categoria=dji-estab',
  },
  {
    label: 'Oakley Meta',
    sub: 'HSTN & Vanguard',
    image: '/oakley-hstn-red-hand.webp',
    href: '/tienda?categoria=oakley',
  },
  {
    label: 'Audio',
    sub: 'AirPods & Micrófonos',
    image: '/airpods-hand.webp',
    href: '/tienda?categoria=audio',
  },
]

function CategoryCard({ label, sub, image, href }) {
  return (
    <a href={href} style={{ textDecoration: 'none', flexShrink: 0, display: 'block' }}>
      <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: 16, background: '#e8e8e6' }}>
        <img
          src={image}
          alt={label}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(.22,1,.36,1)',
            display: 'block',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ paddingTop: 10 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#111', margin: '0 0 2px' }}>{label}</p>
        <p style={{ fontSize: 12, color: '#888', margin: 0 }}>{sub}</p>
      </div>
    </a>
  )
}

function MobileCarousel() {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft]   = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const cardW = el.firstElementChild?.offsetWidth ?? 260
    el.scrollBy({ left: dir * (cardW + 12), behavior: 'smooth' })
  }

  const arrowBtn = (dir, visible) => ({
    position: 'absolute',
    top: '35%',
    [dir < 0 ? 'left' : 'right']: 8,
    transform: 'translateY(-50%)',
    zIndex: 2,
    width: 36, height: 36, borderRadius: '50%',
    border: 'none',
    background: 'rgba(255,255,255,0.92)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.14)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    transition: 'opacity 0.2s ease',
  })

  return (
    <div style={{ position: 'relative' }}>
      {/* Arrow left */}
      <button style={arrowBtn(-1, canScrollLeft)} onClick={() => scroll(-1)} aria-label="Anterior">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex', gap: 12,
          overflowX: 'auto', paddingBottom: 8,
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none', scrollbarWidth: 'none',
        }}
        className="hide-scrollbar"
      >
        {categories.map((cat, i) => (
          <div key={i} style={{ flex: '0 0 68vw', scrollSnapAlign: 'start' }}>
            <CategoryCard {...cat} />
          </div>
        ))}
      </div>

      {/* Arrow right */}
      <button style={arrowBtn(1, canScrollRight)} onClick={() => scroll(1)} aria-label="Siguiente">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  )
}

export default function CategoryShowcase() {
  const isMobile = useBreakpoint(768)

  if (isMobile) {
    return (
      <section style={{ background: '#fff', paddingTop: 28, paddingBottom: 28, paddingLeft: 20, paddingRight: 0, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, paddingRight: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 500, letterSpacing: -0.8, color: '#111', margin: 0 }}>
            Explora la colección.
          </h2>
          <a href="/tienda" style={{ fontSize: 13, color: '#0ea7b7', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', padding: '8px 0 8px 12px' }}>
            Ver todo →
          </a>
        </div>
        {/* Carrusel — inicia a 20px del borde izquierdo por el padding de la sección */}
        <MobileCarousel />
      </section>
    )
  }

  return (
    <section style={{ background: '#fff', paddingTop: 48, paddingBottom: 48 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: -0.8, color: '#111', margin: 0 }}>
            Explora la colección.
          </h2>
          <a href="/tienda" style={{ fontSize: 13, color: '#0ea7b7', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', padding: '8px 0 8px 12px' }}>
            Ver todo →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {categories.map((cat, i) => <CategoryCard key={i} {...cat} />)}
        </div>
      </div>
    </section>
  )
}
