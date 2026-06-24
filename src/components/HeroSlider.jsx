import Logo from './Logo'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function HeroSlider() {
  const isMobile = useBreakpoint(768)

  return (
    <div style={{
      position: 'relative',
      height: '100svh',
      minHeight: isMobile ? 580 : 600,
      overflow: 'hidden',
      marginTop: -68,
      zIndex: 0,
    }}>
      {/* Imagen de fondo — mobile vs desktop */}
      <img
        src={isMobile ? '/dji-mic-hero-mobile.webp' : '/dji-mic-hero.webp'}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: isMobile ? 'center 30%' : 'center',
        }}
      />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isMobile
          ? 'linear-gradient(to bottom, rgba(4,14,20,0.55) 0%, rgba(4,14,20,0.72) 60%, rgba(4,14,20,0.92) 100%)'
          : 'rgba(4,14,20,0.68)',
      }} />

      {/* Contenido */}
      <div style={{
        position: 'relative', zIndex: 1,
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: isMobile ? 'flex-end' : 'center',
        textAlign: 'center',
        padding: isMobile ? '0 24px 56px' : '68px 24px 0',
      }}>
        <div style={{ marginBottom: 20 }}>
          <Logo variant="white" height={isMobile ? 36 : 44} />
        </div>

        <h1 style={{
          fontSize: isMobile ? 'clamp(36px, 10vw, 52px)' : 'clamp(44px, 7vw, 96px)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: isMobile ? -1.5 : -2,
          color: '#fff',
          marginBottom: 16,
          whiteSpace: 'pre-line',
        }}>
          {'Tecnología\naspiracional.'}
        </h1>

        <p style={{
          fontSize: isMobile ? 13 : 15,
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7,
          maxWidth: isMobile ? 320 : 460,
          marginBottom: 32,
        }}>
          Apple, DJI y Oakley Meta — los productos que defines con tu estilo de vida. Entrega inmediata y garantía oficial.
        </p>

        <div style={{
          display: 'flex', gap: 10,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          width: isMobile ? '100%' : 'auto',
        }}>
          <a href="/tienda" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: '#0ea7b7', color: '#fff',
            fontSize: 14, fontWeight: 500,
            padding: isMobile ? '15px 32px' : '14px 32px',
            borderRadius: 99,
            width: isMobile ? '100%' : 'auto',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#3dc8d6'}
            onMouseLeave={e => e.currentTarget.style.background = '#0ea7b7'}
          >
            Ver productos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="https://wa.me/584223194044?text=Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos%20de%20Nexo%20Pro." style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff',
            fontSize: 14, fontWeight: 500,
            padding: isMobile ? '15px 32px' : '14px 32px',
            borderRadius: 99,
            width: isMobile ? '100%' : 'auto',
            transition: 'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'transparent' }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
