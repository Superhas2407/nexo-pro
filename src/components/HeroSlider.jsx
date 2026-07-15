import { useBreakpoint } from '../hooks/useBreakpoint'

export default function HeroSlider() {
  const isMobile = useBreakpoint(768)

  return (
    <div style={{
      position: 'relative',
      height: '100svh',
      minHeight: isMobile ? 600 : 640,
      overflow: 'hidden',
      marginTop: -68,
      background: '#080808',
    }}>
      {/* Imagen — sin texto/botones quemados (hero v2), no necesita overlay */}
      {isMobile ? (
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
      ) : (
        <img
          src="/hero-pulse-v2.webp"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            height: '100%',
            width: 'auto',
            maxWidth: 'none',
            objectFit: 'cover',
          }}
        />
      )}

      {/* Contenido real */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-end' : 'center',
        padding: isMobile
          ? '0 24px 56px'
          : `${68 / 2}px 0 0 64px`,
        maxWidth: isMobile ? '100%' : '48%',
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

        <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row' }}>
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
    </div>
  )
}
