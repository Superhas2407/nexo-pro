import { Component, useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { products, basePrice } from '../data/products'

const WA_BASE = 'https://wa.me/584223194044'

const navItems = [
  { label: 'Tienda',       to: '/tienda' },
  { label: 'Nosotros',     to: WA_BASE + '?text=' + encodeURIComponent('Hola! Quiero saber más sobre Nexo Pro.') },
  { label: 'Contáctanos',  to: WA_BASE + '?text=' + encodeURIComponent('Hola! Me gustaría hacer una consulta.') },
]

/* ── Search overlay ─────────────────────────────────────── */
function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = query.trim().length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: '#fff',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          borderRadius: '0 0 16px 16px',
          overflow: 'hidden',
        }}
      >
        {/* Input */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', gap: 12, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: 16, fontFamily: 'inherit', color: '#111',
              background: 'transparent',
            }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: 20, lineHeight: 1 }}>×</button>
        </div>

        {/* Resultados */}
        {results.length > 0 && (
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {results.map(p => (
              <a
                key={p.id}
                href={`/tienda?producto=${p.id}`}
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 20px', textDecoration: 'none', color: '#111',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8f8f8'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: 44, height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.colorVariants[0]?.image && (
                    <img src={p.colorVariants[0].image} alt={p.name} style={{ maxWidth: 44, maxHeight: 44, objectFit: 'contain' }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{p.name}</p>
                  <p style={{ margin: 0, fontSize: 12, color: '#0ea7b7', fontWeight: 600 }}>
                    {'REF ' + basePrice(p).toLocaleString()}
                  </p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            ))}
          </div>
        )}

        {query.trim().length > 0 && results.length === 0 && (
          <div style={{ padding: '24px 20px', textAlign: 'center', color: '#aaa', fontSize: 14 }}>
            Sin resultados para "{query}"
          </div>
        )}

        {query.trim().length === 0 && (
          <div style={{ padding: '16px 20px' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: '#bbb', margin: '0 0 10px' }}>
              Populares
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['iPhone 17 Pro', 'DJI Osmo', 'AirPods'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  style={{
                    padding: '6px 14px', borderRadius: 99,
                    border: '1px solid rgba(0,0,0,0.12)',
                    background: 'transparent', cursor: 'pointer',
                    fontSize: 12, color: '#555', fontFamily: 'inherit',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── Panel lateral (carrito / favoritos) ─────────────────── */
function SidePanel({ title, icon, children, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.3)' }}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: 360, maxWidth: '90vw',
          background: '#fff',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {icon}
            <span style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>{title}</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Nav links ──────────────────────────────────────────── */
function NavLinks() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })
  const refs = useRef([])
  const pathname = window.location.pathname

  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      onMouseLeave={() => setPosition(p => ({ ...p, opacity: 0 }))}
    >
      <motion.div
        animate={position}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          position: 'absolute', top: '50%', translateY: '-50%',
          height: 32, borderRadius: 8, background: '#f0f0f0',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      {navItems.map((item, i) => (
        <a
          key={item.label}
          href={item.to}
          ref={el => refs.current[i] = el}
          onMouseEnter={() => {
            const el = refs.current[i]
            if (!el) return
            setPosition({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 })
          }}
          style={{
            position: 'relative', zIndex: 1,
            display: 'block', padding: '6px 16px',
            fontSize: 15,
            fontWeight: pathname === item.to ? 700 : 600,
            color: pathname === item.to ? '#0ea7b7' : '#111',
            whiteSpace: 'nowrap', textDecoration: 'none',
            userSelect: 'none',
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}

class NavBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false } }
  static getDerivedStateFromError() { return { error: true } }
  render() { return this.state.error ? null : this.props.children }
}

const WaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

/* ── Navbar principal ───────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [cartOpen, setCartOpen]       = useState(false)
  const [wishOpen, setWishOpen]       = useState(false)

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'transparent', pointerEvents: 'none' }}>
        <div style={{
          width: '100%', display: 'flex', alignItems: 'center',
          height: 68, padding: '0 20px', gap: 16,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
          pointerEvents: 'auto',
        }}>

          {/* Logo */}
          <a href="/" style={{ flex: 'none', display: 'flex', alignItems: 'center' }}>
            <Logo variant="color" height={36} />
          </a>

          {/* Nav links desktop */}
          <div className="nav-links-desktop" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <NavBoundary><NavLinks /></NavBoundary>
          </div>

          {/* Spacer mobile */}
          <div className="nav-spacer-mobile" style={{ flex: 1 }} />

          {/* Íconos derecha — desktop */}
          <div className="nav-right-desktop" style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={() => setSearchOpen(true)} style={iconBtn} title="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <button onClick={() => setWishOpen(true)} style={iconBtn} title="Lista de deseos">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>

            <button onClick={() => setCartOpen(true)} style={iconBtn} title="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </button>

            <div style={{ width: 1, height: 20, background: '#e5e5e5', margin: '0 8px' }} />

            <a href={WA_BASE} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#111', color: '#fff',
              padding: '8px 18px', borderRadius: 99,
              fontSize: 12, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              <WaIcon />
              Cotizar
            </a>
          </div>

          {/* Mobile: iconos + hamburger */}
          <div className="nav-right-mobile" style={{ alignItems: 'center', gap: 4 }}>
            <button onClick={() => setSearchOpen(true)} style={iconBtn} title="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button onClick={() => setMobileOpen(o => !o)} style={iconBtn} aria-label="Menú">
              {mobileOpen
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              }
            </button>
          </div>
        </div>
      </header>

      {/* Menú mobile */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
          background: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
          {navItems.map(item => (
            <a key={item.label} href={item.to} onClick={() => setMobileOpen(false)} style={{
              display: 'block', padding: '16px 24px', fontSize: 15, fontWeight: 500,
              color: window.location.pathname === item.to ? '#0ea7b7' : '#111',
              borderBottom: '1px solid rgba(0,0,0,0.05)', textDecoration: 'none',
            }}>
              {item.label}
            </a>
          ))}
          <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: 8 }}>
            <button onClick={() => { setWishOpen(true); setMobileOpen(false) }} style={{ ...iconBtn, flex: 1, background: '#f5f5f5', borderRadius: 8, fontSize: 13, color: '#555', gap: 8, fontFamily: 'inherit' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              Favoritos
            </button>
            <button onClick={() => { setCartOpen(true); setMobileOpen(false) }} style={{ ...iconBtn, flex: 1, background: '#f5f5f5', borderRadius: 8, fontSize: 13, color: '#555', gap: 8, fontFamily: 'inherit' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Carrito
            </button>
          </div>
          <div style={{ padding: '16px 24px 24px' }}>
            <a href={WA_BASE} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: '#111', color: '#fff', padding: '14px 20px', borderRadius: 8,
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
            }}>
              <WaIcon />
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Overlays */}
      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <SidePanel
            title="Carrito"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>}
            onClose={() => setCartOpen(false)}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 40, textAlign: 'center', gap: 16 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              <p style={{ fontSize: 15, fontWeight: 500, color: '#111', margin: 0 }}>Tu carrito está vacío</p>
              <p style={{ fontSize: 13, color: '#999', margin: 0, lineHeight: 1.6 }}>Explora la tienda y cotiza los productos que te interesan por WhatsApp.</p>
              <a href="/tienda" onClick={() => setCartOpen(false)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#111', color: '#fff', padding: '12px 24px', borderRadius: 99,
                fontSize: 13, fontWeight: 500, textDecoration: 'none', marginTop: 8,
              }}>
                Ver tienda
              </a>
              <a href={WA_BASE + '?text=' + encodeURIComponent('Hola! Quiero hacer un pedido.')} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(0,0,0,0.12)', color: '#111', padding: '12px 24px', borderRadius: 99,
                fontSize: 13, fontWeight: 500, textDecoration: 'none',
              }}>
                <WaIcon />
                Cotizar por WhatsApp
              </a>
            </div>
          </SidePanel>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wishOpen && (
          <SidePanel
            title="Lista de deseos"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>}
            onClose={() => setWishOpen(false)}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 40, textAlign: 'center', gap: 16 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              <p style={{ fontSize: 15, fontWeight: 500, color: '#111', margin: 0 }}>Tu lista de deseos está vacía</p>
              <p style={{ fontSize: 13, color: '#999', margin: 0, lineHeight: 1.6 }}>Guarda los productos que te gusten para verlos después.</p>
              <a href="/tienda" onClick={() => setWishOpen(false)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#111', color: '#fff', padding: '12px 24px', borderRadius: 99,
                fontSize: 13, fontWeight: 500, textDecoration: 'none', marginTop: 8,
              }}>
                Explorar tienda
              </a>
            </div>
          </SidePanel>
        )}
      </AnimatePresence>
    </>
  )
}

const iconBtn = {
  width: 38, height: 38, borderRadius: 8,
  border: 'none', background: 'transparent',
  cursor: 'pointer', display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  color: '#444',
}
