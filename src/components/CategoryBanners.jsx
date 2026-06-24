import { useState } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'

const banners = [
  { image: '/banner-iphone.webp',    label: 'iPhone',             sub: 'Toda la línea desbloqueada',    href: '#' },
  { image: '/banner-dji-mic.webp',   label: 'DJI Audio',          sub: 'Micrófonos profesionales',      href: '#' },
  { image: '/banner-dji-osmo.webp',  label: 'DJI Estabilizadores',sub: 'Para creadores de contenido',   href: '#' },
  { image: '/banner-oakley.webp',    label: 'Oakley Meta',        sub: 'Lentes inteligentes',           href: '#' },
]

export default function CategoryBanners() {
  const [hovered, setHovered] = useState(null)
  const isMobile = useBreakpoint(768)

  if (isMobile) {
    return (
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '52vw 52vw',
        gap: 2,
        background: '#0a0a0a',
      }}>
        {banners.map((b, i) => (
          <a
            key={i}
            href={b.href}
            style={{
              position: 'relative',
              display: 'block',
              overflow: 'hidden',
              textDecoration: 'none',
            }}
          >
            <img
              src={b.image}
              alt={b.label}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            {/* Overlay degradado */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
            }} />

            {/* Contenido */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '0 12px 14px',
              display: 'flex', flexDirection: 'column', gap: 5,
            }}>
              <span style={{
                fontSize: 10, color: 'rgba(255,255,255,0.6)',
                letterSpacing: 0.3, lineHeight: 1.3,
              }}>
                {b.sub}
              </span>
              <span style={{
                display: 'inline-block',
                padding: '5px 10px',
                border: '1px solid rgba(255,255,255,0.4)',
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                fontSize: 9, fontWeight: 600,
                letterSpacing: 2, textTransform: 'uppercase',
                alignSelf: 'flex-start',
              }}>
                {b.label}
              </span>
            </div>
          </a>
        ))}
      </section>
    )
  }

  return (
    <section style={{
      display: 'flex',
      height: '78vh', minHeight: 460, maxHeight: 680,
      overflow: 'hidden', background: '#0a0a0a',
    }}>
      {banners.map((b, i) => {
        const isHovered = hovered === i
        const anyHovered = hovered !== null
        const isOther = anyHovered && !isHovered

        return (
          <a
            key={i}
            href={b.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: isHovered ? 2.2 : isOther ? 0.7 : 1,
              position: 'relative', overflow: 'hidden',
              display: 'block',
              transition: 'flex 0.55s cubic-bezier(0.4,0,0.2,1)',
              borderRight: i < banners.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              textDecoration: 'none',
            }}
          >
            <img
              src={b.image} alt={b.label}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
                transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: isHovered
                ? 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.08) 100%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)',
              transition: 'background 0.4s ease',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '0 28px 32px',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
            }}>
              <span style={{
                fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: 0.5,
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%',
              }}>
                {b.sub}
              </span>
              <span style={{
                display: 'inline-block', padding: '9px 20px',
                border: isHovered ? '1.5px solid #0ea7b7' : '1.5px solid rgba(255,255,255,0.45)',
                background: isHovered ? '#0ea7b7' : 'rgba(0,0,0,0.25)',
                backdropFilter: 'blur(8px)',
                color: '#fff', fontSize: 10, fontWeight: 500,
                letterSpacing: 2.5, textTransform: 'uppercase', whiteSpace: 'nowrap',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }}>
                {b.label}
              </span>
            </div>
            <div style={{
              position: 'absolute', top: 24, right: 24,
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0.7)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
          </a>
        )
      })}
    </section>
  )
}
