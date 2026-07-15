import { Component, useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { products, basePrice } from '../data/products'
import { useShop } from '../context/ShopContext'
import { generateInvoiceImage } from '../utils/invoiceImage'

const WA_BASE = 'https://wa.me/584223194044'

const navItems = [
  { label: 'Tienda',       to: '/tienda' },
  { label: 'Nosotros',     to: WA_BASE + '?text=' + encodeURIComponent('Hola! Quiero saber más sobre PULSE.') },
  { label: 'Contáctanos',  to: WA_BASE + '?text=' + encodeURIComponent('Hola! Me gustaría hacer una consulta.') },
]

const buildDropdown = (categoryIds) =>
  products
    .filter(p => categoryIds.includes(p.category))
    .flatMap(p =>
      p.colorVariants
        .filter(v => v.image)
        .map(v => ({
          name: p.name,
          color: v.color,
          image: v.image,
          price: v.storage[0].price,
          link: `/tienda?producto=${p.id}${v.color ? `&color=${encodeURIComponent(v.color)}` : ''}`,
        }))
    )
    .filter((item, idx, arr) =>
      arr.findIndex(x => x.image === item.image) === idx
    )

const dropdownMenus = {
  iPhone: buildDropdown(['iphone']),
  DJI:    buildDropdown(['dji-estab', 'dji-audio']),
  Oakley: buildDropdown(['oakley']),
}

/* —?—? Search overlay —?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—? */
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
                  <p style={{ margin: 0, fontSize: 12, color: '#0057FF', fontWeight: 600 }}>
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

/* —?—? Cart recommendations —?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—? */
const CART_RECS = [
  { label: 'iPhone 17 Pro', image: '/iphone-orange-hand.webp', href: '/tienda?categoria=iphone' },
  { label: 'DJI Osmo',      image: '/dji-osmo7p-hand.webp',    href: '/tienda?categoria=dji-estab' },
  { label: 'Oakley Meta',   image: '/oakley-hstn-red-hand.webp', href: '/tienda?categoria=oakley' },
]

function CartRecs({ onClose }) {
  const [active, setActive] = useState(0)
  const scrollRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cardW = el.firstElementChild?.offsetWidth ?? 120
    const idx = Math.round(el.scrollLeft / (cardW + 10))
    setActive(Math.min(idx, CART_RECS.length - 1))
  }

  const scrollTo = (i) => {
    const el = scrollRef.current
    if (!el) return
    const cardW = el.firstElementChild?.offsetWidth ?? 120
    el.scrollTo({ left: i * (cardW + 10), behavior: 'smooth' })
    setActive(i)
  }

  const onMouseDown = (e) => {
    drag.current = { active: true, startX: e.pageX - scrollRef.current.offsetLeft, scrollLeft: scrollRef.current.scrollLeft }
    scrollRef.current.style.cursor = 'grabbing'
    scrollRef.current.style.scrollSnapType = 'none'
  }
  const onMouseMove = (e) => {
    if (!drag.current.active) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX)
  }
  const onMouseUp = () => {
    drag.current.active = false
    scrollRef.current.style.cursor = 'grab'
    scrollRef.current.style.scrollSnapType = 'x mandatory'
  }

  return (
    <>
      {/* Carrusel edge-to-edge con peek del último card */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="hide-scrollbar"
        style={{ cursor: 'grab' }}
        style={{
          display: 'flex', gap: 10,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 4,
        }}
      >
        {CART_RECS.map((rec, i) => (
          <a key={i} href={rec.href} onClick={onClose}
            style={{ textDecoration: 'none', flex: '0 0 120px', scrollSnapAlign: 'start' }}>
            <div style={{
              borderRadius: 14, border: '1.5px solid #e8e8e8',
              marginBottom: 8, aspectRatio: '3/4',
              background: '#fff',
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
              padding: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img src={rec.image} alt={rec.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
            </div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#111', margin: '0 0 2px' }}>{rec.label}</p>
          </a>
        ))}
      </div>
      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
        {CART_RECS.map((_, i) => (
          <div key={i} onClick={() => scrollTo(i)} style={{
            width: i === active ? 18 : 6, height: 6, borderRadius: 99,
            background: i === active ? '#0057FF' : '#e0e0e0',
            cursor: 'pointer', transition: 'all 0.25s ease',
          }} />
        ))}
      </div>
    </>
  )
}

/* —?—? Panel lateral (carrito / favoritos) —?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—? */
function SidePanel({ title, icon, children, onClose, panelTop = 8 }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
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
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', top: panelTop,
          ...(window.innerWidth < 768
            ? { left: 16, right: 16 }
            : { right: 24, width: 340 }
          ),
          maxHeight: `calc(100svh - ${panelTop}px - 16px)`,
          background: '#fff',
          boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
          borderRadius: 20,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {icon}
            <span style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>{title}</span>
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

/* —?—? Mega menu dropdown —?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—? */
function MegaMenu({ label, items, categoryHref }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  const enter = () => { clearTimeout(closeTimer.current); setOpen(true) }
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(false), 150) }

  return (
    <div onMouseEnter={enter} onMouseLeave={leave}>
      <button style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '6px 14px', fontSize: 15, fontWeight: 600,
        color: open ? '#0057FF' : '#111',
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: 'inherit', whiteSpace: 'nowrap',
        transition: 'color 0.15s',
      }}>
        {label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 4, scale: 0.98, x: '-50%' }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 78,
              left: '50%',
              width: 'min(1100px, 92vw)',
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 12px 48px rgba(0,0,0,0.11), 0 2px 8px rgba(0,0,0,0.06)',
              zIndex: 200,
              overflow: 'hidden',
            }}
            onMouseEnter={enter}
            onMouseLeave={leave}
          >
            <div style={{ display: 'flex' }}>

              {/* Columna izquierda ×" info estilo ProductLines */}
              <div style={{
                width: 200, flexShrink: 0,
                background: '#f8f8f8',
                padding: '28px 24px',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                borderRight: '1px solid #f0f0f0',
              }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', color: '#0057FF', margin: '0 0 10px' }}>
                    {label}
                  </p>
                  <h3 style={{ fontSize: 22, fontWeight: 400, letterSpacing: -0.8, color: '#1a1a1a', margin: 0, lineHeight: 1.2 }}>
                    Toda la<br />línea.
                  </h3>
                </div>
                <a href={categoryHref} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 600, color: '#111',
                  textDecoration: 'none', marginTop: 24,
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0057FF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#111'}
                >
                  Ver todos
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

              {/* Productos */}
              <div style={{ flex: 1, padding: '28px 24px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  {items.map((item, i) => (
                    <a key={i} href={item.link} style={{ textDecoration: 'none', flexShrink: 0, width: 150 }}>
                      <div
                        style={{ transition: 'transform 0.22s cubic-bezier(.22,1,.36,1)' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                      >
                        {/* Imagen */}
                        <div style={{
                          height: 140, background: '#f5f5f3',
                          borderRadius: 12, overflow: 'hidden',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginBottom: 10,
                        }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '100%', height: '100%',
                              objectFit: item.image.includes('-shop.') ? 'contain' : 'cover',
                              padding: item.image.includes('-shop.') ? 14 : 0,
                            }}
                          />
                        </div>
                        {/* Info */}
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#111', margin: '0 0 2px', lineHeight: 1.3 }}>{item.name}</p>
                        {item.color && <p style={{ fontSize: 11, color: '#aaa', margin: '0 0 4px' }}>{item.color}</p>}
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#0057FF', margin: 0 }}>REF {item.price.toLocaleString()}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* —?—? Nav links —?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—? */
function NavLinks() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })
  const refs = useRef([])
  const pathname = window.location.pathname

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* Dropdowns de categoría */}
      <MegaMenu label="iPhone" items={dropdownMenus.iPhone} categoryHref="/tienda?categoria=iphone" />
      <MegaMenu label="DJI"    items={dropdownMenus.DJI}    categoryHref="/tienda?categoria=dji-estab" />
      <MegaMenu label="Oakley" items={dropdownMenus.Oakley} categoryHref="/tienda?categoria=oakley" />

      {/* Links planos */}
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
              display: 'block', padding: '6px 14px',
              fontSize: 15,
              fontWeight: pathname === item.to ? 700 : 600,
              color: pathname === item.to ? '#0057FF' : '#111',
              whiteSpace: 'nowrap', textDecoration: 'none',
              userSelect: 'none',
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

const Badge = ({ count }) => (
  <span style={{
    position: 'absolute', top: 2, right: 2,
    minWidth: 16, height: 16, borderRadius: 99,
    background: '#0057FF', color: '#fff',
    fontSize: 9, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '0 4px', pointerEvents: 'none',
    lineHeight: 1,
  }}>
    {count > 9 ? '9+' : count}
  </span>
)

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

/* —?—? Navbar principal —?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—?—? */
export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [cartOpen, setCartOpen]       = useState(false)
  const [wishOpen, setWishOpen]       = useState(false)
  const [atTop, setAtTop]             = useState(true)
  const [panelTop, setPanelTop]        = useState(86)
  const headerRef                      = useRef(null)
  const pillRef                        = useRef(null)
  const { cart, wishlist, removeFromCart, updateQty, removeFromWishlist, cartTotal, cartWaText } = useShop()
  const [sendingOrder, setSendingOrder] = useState(false)
  const [orderToast, setOrderToast]     = useState(false)

  // Detección sincrónica (sin await) de si el navegador puede compartir archivos —
  // así podemos decidir YA, dentro del click, si vamos por share nativo o por el
  // link normal a WhatsApp.
  const supportsFileShare = () => {
    try {
      const dummy = new File([], 'pedido-pulse.png', { type: 'image/png' })
      return !!(navigator.canShare && navigator.share && navigator.canShare({ files: [dummy] }))
    } catch {
      return false
    }
  }

  // Genera la factura y la descarga en segundo plano, sin bloquear ni depender
  // de la navegación a WhatsApp (que ya la maneja el <a> de forma nativa).
  const downloadInvoiceInBackground = async () => {
    try {
      const blob = await generateInvoiceImage(cart, cartTotal)
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'pedido-pulse.png'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      setOrderToast(true)
      setTimeout(() => setOrderToast(false), 4500)
    } catch {
      // si falla la generación de la imagen no pasa nada — el link a WhatsApp ya navegó
    }
  }

  // Mobile con Web Share API: genera la factura y la comparte directo con WhatsApp
  const shareInvoiceOrder = async () => {
    setSendingOrder(true)
    const waUrl = `${WA_BASE}?text=${cartWaText()}`
    try {
      const blob = await generateInvoiceImage(cart, cartTotal)
      const file = blob ? new File([blob], 'pedido-pulse.png', { type: 'image/png' }) : null
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Pedido PULSE', text: decodeURIComponent(cartWaText()) })
      } else {
        window.location.href = waUrl // sin popup: navega la pestaña actual, siempre funciona
      }
    } catch (err) {
      if (err?.name !== 'AbortError') window.location.href = waUrl
    } finally {
      setSendingOrder(false)
    }
  }

  // Click en "Cotizar por WhatsApp": si el navegador soporta compartir archivos
  // (mobile), interceptamos y compartimos la factura directo. Si no (desktop/
  // Safari sin soporte), dejamos que el <a> navegue nativo a WhatsApp — es la
  // única forma 100% confiable de abrir la pestaña sin que la bloqueen — y
  // generamos la imagen aparte para descargarla.
  const handleWhatsAppOrder = (e) => {
    if (!cart.length) { e.preventDefault(); return }
    if (supportsFileShare()) {
      e.preventDefault()
      shareInvoiceOrder()
    } else {
      downloadInvoiceInBackground()
    }
    setCartOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < window.innerHeight - 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [mobileOpen])

  /* mide desde el pill (no el header) ×" ignora el announcement bar */
  const getPillBottom = () =>
    pillRef.current ? pillRef.current.getBoundingClientRect().bottom + 8 : 86

  const openCart = () => {
    setPanelTop(getPillBottom())
    setMobileOpen(false)
    setCartOpen(true)
  }
  const openWish = () => {
    setPanelTop(getPillBottom())
    setMobileOpen(false)
    setWishOpen(true)
  }

  return (
    <>
      {/* Top page fade ×" contraste sobre el hero oscuro, desaparece al hacer scroll */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 110, pointerEvents: 'none', zIndex: 99,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)',
        opacity: 1,
      }} />

      <header ref={headerRef} style={{ position: 'sticky', top: 0, zIndex: 100, background: 'transparent', pointerEvents: 'none', padding: '14px 24px' }}>
        <div ref={pillRef} style={{
          display: 'flex', alignItems: 'center',
          height: 52, padding: '0 16px', gap: 12,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: 999,
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

          {/* Íconos derecha ×" desktop */}
          <div className="nav-right-desktop" style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={() => setSearchOpen(true)} style={iconBtn} title="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <button onClick={() => openWish()} style={{ ...iconBtn, position: 'relative' }} title="Lista de deseos">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              {wishlist.length > 0 && <Badge count={wishlist.length} />}
            </button>

            <button onClick={() => openCart()} style={{ ...iconBtn, position: 'relative' }} title="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cart.length > 0 && <Badge count={cart.reduce((s, i) => s + i.qty, 0)} />}
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
            <button onClick={() => openCart()} style={{ ...iconBtn, position: 'relative' }} title="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cart.length > 0 && <Badge count={cart.reduce((s, i) => s + i.qty, 0)} />}
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
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: getPillBottom(), left: 16, right: 16, zIndex: 99,
              background: '#f2f2f2',
              borderRadius: 20,
              boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
              overflowY: 'auto',
              maxHeight: 'calc(100svh - 96px)',
            }}
          >
            <div style={{ padding: '12px 12px 12px' }}>
              {/* Categorías con imagen */}
              {[
                { label: 'iPhone',      sub: 'iPhone 17 Pro & Pro Max', image: '/iphone-orange-hand.webp',    href: '/tienda?categoria=iphone' },
                { label: 'DJI',         sub: 'Estabilizadores & Audio',  image: '/dji-osmo7p-hand.webp',      href: '/tienda?categoria=dji-estab' },
                { label: 'Oakley Meta', sub: 'HSTN & Vanguard',          image: '/oakley-hstn-red-hand.webp', href: '/tienda?categoria=oakley' },
              ].map((item, i) => (
                <a key={i} href={item.href} onClick={() => setMobileOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: '#fff', borderRadius: 14,
                  padding: '12px 14px', marginBottom: 8,
                  textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#f0f0f0' }}>
                    <img src={item.image} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: '#111', margin: '0 0 2px' }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: '#999', margin: 0 }}>{item.sub}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                </a>
              ))}

              {/* Divider */}
              <div style={{ height: 1, background: '#e8e8e8', margin: '8px 0' }} />

              {/* Links planos */}
              {navItems.map((item, i) => (
                <a key={i} href={item.to} onClick={() => setMobileOpen(false)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: '#fff', borderRadius: 14,
                  padding: '15px 16px', marginBottom: 8,
                  fontSize: 15, fontWeight: 500,
                  color: window.location.pathname === item.to ? '#0057FF' : '#111',
                  textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                  {item.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                </a>
              ))}

              {/* Favoritos + Carrito */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <button onClick={() => { openWish(); setMobileOpen(false) }} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#fff', border: 'none', borderRadius: 14, padding: '14px',
                  fontSize: 13, fontWeight: 500, color: '#111', cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  Favoritos
                </button>
                <button onClick={() => { openCart(); setMobileOpen(false) }} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#fff', border: 'none', borderRadius: 14, padding: '14px',
                  fontSize: 13, fontWeight: 500, color: '#111', cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  Carrito
                </button>
              </div>

              {/* WhatsApp CTA */}
              <a href={WA_BASE} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#111', color: '#fff', padding: '16px 20px', borderRadius: 14,
                fontSize: 13, fontWeight: 500, textDecoration: 'none', marginBottom: 32,
              }}>
                <WaIcon />
                Cotizar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            panelTop={panelTop}
          >
            {cart.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Empty message */}
                <div style={{ padding: '32px 20px 20px', textAlign: 'center' }}>
                  <p style={{ fontSize: 17, fontWeight: 600, color: '#111', margin: '0 0 8px' }}>Tu carrito está vacío</p>
                  <p style={{ fontSize: 13, color: '#999', lineHeight: 1.6, margin: 0 }}>
                    Explora la colección y agrega lo que más te guste.
                  </p>
                </div>

                {/* Productos recomendados */}
                <div style={{ flex: 1, paddingBottom: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: '#bbb', margin: '0 0 14px', textAlign: 'center' }}>
                    Te puede interesar
                  </p>
                  <CartRecs onClose={() => setCartOpen(false)} />
                </div>

                {/* CTA */}
                <div style={{ padding: '16px 20px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <a href="/tienda" onClick={() => setCartOpen(false)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#111', color: '#fff', padding: '15px 20px',
                    borderRadius: 99, fontSize: 14, fontWeight: 600,
                    textDecoration: 'none', width: '100%', boxSizing: 'border-box',
                  }}>
                    Explorar colección ×'
                  </a>
                  <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', margin: '10px 0 0' }}>
                    Entrega inmediata · Garantía oficial
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f5f5f3' }}>
                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 8px' }}>
                  {cart.map(item => (
                    <div key={item.key} style={{
                      display: 'flex', gap: 12, padding: '12px',
                      background: '#fff', borderRadius: 14,
                      marginBottom: 8,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}>
                      {/* Imagen */}
                      <div style={{ width: 64, height: 64, flexShrink: 0, background: '#f5f5f5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {item.image
                          ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: item.image.includes('-shop.') ? 'contain' : 'cover', padding: item.image.includes('-shop.') ? 6 : 0 }} />
                          : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                        }
                      </div>
                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, color: '#111', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>{item.name}</p>
                          <button onClick={() => removeFromCart(item.key)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', padding: 0, lineHeight: 1, flexShrink: 0, transition: 'color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#e53935'}
                            onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                          </button>
                        </div>
                        <p style={{ fontSize: 12, color: '#888', margin: '0 0 10px', fontWeight: 500 }}>
                          {[item.color, item.storage].filter(Boolean).join(' · ') || 'Estándar'}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {/* Qty pill */}
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5', borderRadius: 99, overflow: 'hidden', background: '#fff' }}>
                            <button onClick={() => updateQty(item.key, item.qty - 1)} style={{ width: 30, height: 26, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 15, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                            <span style={{ fontSize: 12, fontWeight: 600, minWidth: 20, textAlign: 'center', color: '#111' }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.key, item.qty + 1)} style={{ width: 30, height: 26, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 15, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                          </div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#111', margin: 0 }}>REF {(item.price * item.qty).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Footer */}
                <div style={{ padding: '14px 16px 20px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Subtotal</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>REF {cartTotal.toLocaleString()}</span>
                  </div>
                  <a
                    href={`${WA_BASE}?text=${cartWaText()}`}
                    target="_blank" rel="noopener noreferrer"
                    onClick={handleWhatsAppOrder}
                    aria-disabled={sendingOrder}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      background: '#111', color: '#fff', padding: '14px 20px', borderRadius: 99,
                      fontSize: 13, fontWeight: 600, textDecoration: 'none', width: '100%',
                      boxSizing: 'border-box', border: 'none',
                      opacity: sendingOrder ? 0.7 : 1,
                      cursor: sendingOrder ? 'default' : 'pointer',
                    }}
                  >
                    {sendingOrder ? 'Generando pedido…' : (<><WaIcon /> Cotizar por WhatsApp</>)}
                  </a>
                  <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', margin: '10px 0 0' }}>Entrega inmediata · Garantía oficial</p>
                </div>
              </div>
            )}
          </SidePanel>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wishOpen && (
          <SidePanel
            title="Lista de deseos"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>}
            onClose={() => setWishOpen(false)}
            panelTop={panelTop}
          >
            {wishlist.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 40, textAlign: 'center', gap: 16 }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                <p style={{ fontSize: 15, fontWeight: 500, color: '#111', margin: 0 }}>Tu lista de deseos está vacía</p>
                <p style={{ fontSize: 13, color: '#999', margin: 0, lineHeight: 1.6 }}>Toca el corazón en cualquier producto para guardarlo aquí.</p>
                <a href="/tienda" onClick={() => setWishOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#111', color: '#fff', padding: '12px 24px', borderRadius: 99, fontSize: 13, fontWeight: 500, textDecoration: 'none', marginTop: 8 }}>
                  Explorar tienda
                </a>
              </div>
            ) : (
              <div style={{ padding: '8px 0' }}>
                {wishlist.map(item => (
                  <div key={item.key} style={{ display: 'flex', gap: 12, padding: '14px 20px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ width: 52, height: 64, flexShrink: 0, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {item.image
                        ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: item.image.includes('-shop.') ? 'contain' : 'cover', padding: item.image.includes('-shop.') ? 4 : 0 }} />
                        : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#111', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                      {item.color && <p style={{ fontSize: 11, color: '#999', margin: '0 0 8px' }}>{item.color}</p>}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0057FF' }}>REF {item.price.toLocaleString()}</span>
                        <a href={item.link} onClick={() => setWishOpen(false)} style={{ fontSize: 11, color: '#555', textDecoration: 'none', fontWeight: 500 }}>Ver ×'</a>
                      </div>
                    </div>
                    <button onClick={() => removeFromWishlist(item.key)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: 18, lineHeight: 1, alignSelf: 'flex-start', padding: 0, transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e53935'}
                      onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
                    >×</button>
                  </div>
                ))}
              </div>
            )}
          </SidePanel>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {orderToast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
              zIndex: 400, background: '#111', color: '#fff',
              padding: '12px 20px', borderRadius: 99,
              fontSize: 12, fontWeight: 500, textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              maxWidth: 'calc(100vw - 32px)',
            }}
          >
            Imagen del pedido descargada — adjúntala en el chat de WhatsApp
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const iconBtn = {
  width: 44, height: 44, borderRadius: 8,
  border: 'none', background: 'transparent',
  cursor: 'pointer', display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  color: '#444',
}

