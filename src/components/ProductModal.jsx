import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useShop } from '../context/ShopContext'

const fmt = (n) => 'REF ' + n.toLocaleString('en-US')

export default function ProductModal({ product, onClose, initialColorIdx = 0, skipSpread = false }) {
  const isMobile = useBreakpoint(768)
  const { addToCart, isInWishlist, toggleWishlist } = useShop()
  const [cartAdded, setCartAdded] = useState(false)

  const [selectedColorIdx, setSelectedColorIdx] = useState(initialColorIdx)
  const selectedColor = product.colorVariants[selectedColorIdx]

  const allImages = selectedColor.images?.length > 1
    ? selectedColor.images
    : [selectedColor.image].filter(Boolean)

  const [selectedStorage, setSelectedStorage] = useState(selectedColor.storage[0])
  const [mainImg, setMainImg] = useState(selectedColor.image)
  const [showSpread, setShowSpread] = useState(
    !skipSpread && product.colorVariants.length > 1 && !!product.bgText
  )

  const storageOptions = selectedColor.storage.filter(s => s.label)

  const varRefs = useRef([])
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 })

  useLayoutEffect(() => {
    const el = varRefs.current[0]
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 })
  }, [selectedColorIdx])

  const selectColor = (idx) => {
    setSelectedColorIdx(idx)
    const cv = product.colorVariants[idx]
    setSelectedStorage(cv.storage[0])
    setMainImg(cv.image)
  }

  const selectStorage = (s, i) => {
    setSelectedStorage(s)
    const el = varRefs.current[i]
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 })
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.history.pushState({ modal: true }, '')
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    const onPop = () => onClose()
    window.addEventListener('keydown', onKey)
    window.addEventListener('popstate', onPop)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('popstate', onPop)
    }
  }, [onClose])

  const waText = encodeURIComponent(
    `Hola! Me interesa el ${product.name}${selectedStorage.label ? ' ' + selectedStorage.label : ''}${selectedColor.color ? ' · ' + selectedColor.color : ''}. ¿Está disponible?`
  )

  const hasMultipleColors = product.colorVariants.length > 1

  /* —?—?—? Info panel ×" reutilizado en desktop y mobile —?—?—? */
  const InfoPanel = () => (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: isMobile ? '24px 20px 28px' : '60px 48px',
      gap: 16,
    }}>
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#0057FF' }}>
        {product.brand}
      </span>

      <h2 style={{
        fontSize: isMobile ? 28 : 36, fontWeight: 300, letterSpacing: -1.5,
        color: '#111', margin: 0, lineHeight: 1.05,
      }}>
        {product.name.split(' ').slice(0, -1).join(' ')}<br />
        <span style={{ fontWeight: 500 }}>{product.name.split(' ').slice(-1)[0]}</span>
      </h2>

      <AnimatePresence mode="wait">
        <motion.p
          key={selectedStorage.price + '-' + selectedColorIdx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          style={{ fontSize: 20, fontWeight: 600, color: '#111', margin: 0 }}
        >
          {fmt(selectedStorage.price)}
        </motion.p>
      </AnimatePresence>

      {storageOptions.length > 1 && (
        <div style={{ position: 'relative', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <motion.div
            animate={{ left: pill.left, width: pill.width, opacity: pill.opacity }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              position: 'absolute', top: 0, height: '100%',
              background: '#111', borderRadius: 4,
              pointerEvents: 'none', zIndex: 0,
            }}
          />
          {storageOptions.map((s, i) => {
            const active = s.label === selectedStorage.label
            return (
              <button
                key={s.label}
                ref={el => varRefs.current[i] = el}
                onClick={() => selectStorage(s, i)}
                style={{
                  position: 'relative', zIndex: 1,
                  padding: '7px 14px', borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.15)',
                  background: 'transparent',
                  color: active ? '#fff' : '#666',
                  fontSize: 11, fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'color 0.15s',
                }}
              >
                {s.label}
              </button>
            )
          })}
        </div>
      )}

      {hasMultipleColors && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#bbb' }}>
            Color
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {product.colorVariants.map((cv, i) => {
              const active = i === selectedColorIdx
              return (
                <button
                  key={cv.color || i}
                  onClick={() => selectColor(i)}
                  title={cv.color}
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: cv.hex || '#ccc', border: 'none',
                    cursor: 'pointer', padding: 0,
                    boxShadow: active
                      ? '0 0 0 2px #fff, 0 0 0 3.5px #111'
                      : '0 0 0 2px #fff, 0 0 0 3.5px rgba(0,0,0,0.15)',
                    transition: 'box-shadow 0.15s',
                  }}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 4 }}>
        {/* Agregar al carrito */}
        <button
          onClick={() => {
            addToCart(product, selectedColor, selectedStorage)
            setCartAdded(true)
            setTimeout(() => setCartAdded(false), 2000)
          }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: cartAdded ? '#0057FF' : '#111', color: '#fff',
            padding: '12px 20px', borderRadius: 8,
            fontSize: 11, fontWeight: 600, border: 'none',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
        >
          {cartAdded ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
              Agregado
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Agregar al carrito
            </>
          )}
        </button>

        {/* Favoritos */}
        <button
          onClick={() => toggleWishlist(product, selectedColor)}
          title={isInWishlist(product.id, selectedColor.color) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          style={{
            width: 42, height: 42, borderRadius: 8,
            border: '1.5px solid rgba(0,0,0,0.12)',
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isInWishlist(product.id, selectedColor.color) ? '#e53935' : '#999',
            transition: 'color 0.2s, border-color 0.2s',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={isInWishlist(product.id, selectedColor.color) ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/584223194044?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            border: '1.5px solid rgba(0,0,0,0.12)', color: '#555',
            padding: '11px 16px', borderRadius: 8,
            fontSize: 11, fontWeight: 600, textDecoration: 'none',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.color = '#25D366' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = '#555' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Cotizar
        </a>
      </div>

      {hasMultipleColors && (
        <button
          onClick={() => setShowSpread(true)}
          style={{
            background: 'none', border: 'none', padding: 0,
            fontSize: 10, color: '#bbb', cursor: 'pointer',
            textAlign: 'left', letterSpacing: 0.5, fontFamily: 'inherit',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#555'}
          onMouseLeave={e => e.currentTarget.style.color = '#bbb'}
        >
          × Ver todos los colores
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.15)' }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'fixed', inset: 0, zIndex: 201, background: '#fff', overflow: 'hidden' }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 20,
            width: 34, height: 34, borderRadius: '50%',
            border: 'none', background: 'rgba(0,0,0,0.07)',
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: '#555',
          }}
        >×</button>

        <AnimatePresence mode="wait">

          {/* ─── SPREAD ─── */}
          {showSpread && (
            <motion.div
              key="spread"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', overflow: 'hidden' }}
            >
              {/* Tap hint ×" solo mobile, centrado abajo */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  style={{
                    position: 'absolute', bottom: 28, left: 0, right: 0,
                    display: 'flex', justifyContent: 'center', zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: 'rgba(0,0,0,0.06)', borderRadius: 99,
                      padding: '6px 14px',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 11V6a3 3 0 016 0v5m-9 4v-4a6 6 0 0112 0v4a6 6 0 01-12 0z"/>
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.4)', letterSpacing: 0.2 }}>
                      Toca para elegir
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {product.colorVariants.map((cv, i) => (
                <motion.div
                  key={cv.color || i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  whileHover={{ flex: 1.18 }}
                  onClick={() => { selectColor(i); setShowSpread(false) }}
                  style={{
                    flex: 1,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', position: 'relative',
                    background: cv.hex
                      ? `color-mix(in srgb, ${cv.hex} 10%, white)`
                      : '#fafafa',
                    transition: 'flex 0.35s cubic-bezier(.22,1,.36,1)',
                    overflow: 'hidden',
                    borderRight: i < product.colorVariants.length - 1
                      ? '1px solid rgba(0,0,0,0.06)' : 'none',
                    padding: isMobile ? '32px 16px 64px' : '80px 32px 48px',
                    gap: isMobile ? 16 : 28,
                  }}
                >
                  {/* bgText ×" parte superior de la mitad */}
                  {product.bgText && (
                    <span style={{
                      position: 'absolute',
                      top: isMobile ? '16%' : '18%',
                      left: '50%', transform: 'translateX(-50%)',
                      fontSize: isMobile ? 'clamp(20px, 6.5vw, 36px)' : 'clamp(40px, 6vw, 80px)',
                      fontWeight: 800, letterSpacing: -2,
                      color: cv.hex
                        ? `color-mix(in srgb, ${cv.hex} 45%, #c8c8c8)`
                        : '#d8d8d8',
                      userSelect: 'none', pointerEvents: 'none',
                      whiteSpace: 'nowrap', lineHeight: 1,
                    }}>
                      {product.bgText}
                    </span>
                  )}

                  {/* Imagen */}
                  <motion.img
                    src={cv.image}
                    alt={cv.color}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.1, type: 'spring', stiffness: 260, damping: 24 }}
                    style={{
                      height: isMobile ? '38vh' : '52vh',
                      maxHeight: isMobile ? 280 : 440,
                      objectFit: 'contain', display: 'block',
                      position: 'relative', zIndex: 1,
                      filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.13))',
                    }}
                  />

                  {/* Label abajo */}
                  <div style={{
                    position: 'relative', zIndex: 1,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      {cv.hex && (
                        <div style={{
                          width: 11, height: 11, borderRadius: '50%',
                          background: cv.hex, border: '1.5px solid rgba(0,0,0,0.14)',
                          flexShrink: 0,
                        }} />
                      )}
                      <span style={{ fontSize: isMobile ? 13 : 15, fontWeight: 600, color: '#111' }}>
                        {cv.color || product.name}
                      </span>
                    </div>
                    <span style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: '#0057FF' }}>
                      {fmt(cv.storage[0].price)}
                    </span>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ─── DETALLE ─── */}
          {!showSpread && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
            >
              {isMobile ? (
                /* —?—? MOBILE: columna única —?—? */
                <div>
                  {/* Imagen arriba */}
                  <div style={{
                    height: '50vh', minHeight: 280,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '60px 20px 20px', position: 'relative',
                    background: '#fafafa',
                  }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={mainImg}
                        src={mainImg}
                        alt={product.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                        style={{ maxHeight: '100%', maxWidth: '80%', objectFit: 'contain' }}
                      />
                    </AnimatePresence>

                    {/* Thumbnails en mobile */}
                    {allImages.length > 1 && (
                      <div style={{
                        position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                        display: 'flex', gap: 8,
                      }}>
                        {allImages.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setMainImg(img)}
                            style={{
                              width: 32, height: 44, padding: 0,
                              border: 'none', background: 'transparent', cursor: 'pointer',
                              opacity: mainImg === img ? 1 : 0.3,
                              transition: 'opacity 0.2s',
                            }}
                          >
                            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Info abajo */}
                  <InfoPanel />
                </div>
              ) : (
                /* —?—? DESKTOP: 3 columnas —?—? */
                <div>
                  <div style={{ height: '100vh', display: 'flex', position: 'relative' }}>
                    {/* Izquierda */}
                    <div style={{
                      flex: '0 0 300px',
                      display: 'flex', flexDirection: 'column',
                      justifyContent: 'flex-end',
                      position: 'relative', zIndex: 2,
                    }}>
                      <InfoPanel />
                    </div>

                    {/* Centro: imagen */}
                    <div style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', padding: '60px 40px',
                    }}>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={mainImg}
                          src={mainImg}
                          alt={product.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                          style={{ maxHeight: '80%', maxWidth: '85%', objectFit: 'contain' }}
                        />
                      </AnimatePresence>

                      {allImages.length > 1 && (
                        <div style={{ position: 'absolute', bottom: 36, right: 36, display: 'flex', gap: 10 }}>
                          {allImages.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setMainImg(img)}
                              style={{
                                width: 36, height: 50, padding: 0,
                                border: 'none', background: 'transparent', cursor: 'pointer',
                                opacity: mainImg === img ? 1 : 0.25,
                                transition: 'opacity 0.2s',
                              }}
                            >
                              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </button>
                          ))}
                        </div>
                      )}

                      {allImages.length > 1 && (
                        <p style={{
                          position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
                          fontSize: 9, fontWeight: 700, letterSpacing: 3,
                          textTransform: 'uppercase', color: '#ddd',
                          pointerEvents: 'none', margin: 0, whiteSpace: 'nowrap',
                        }}>
                          Haz clic en las imágenes
                        </p>
                      )}
                    </div>

                    {/* Derecha: ghost */}
                    {allImages.length > 1 && (
                      <div
                        onClick={() => setMainImg(allImages[(allImages.indexOf(mainImg) + 1) % allImages.length])}
                        style={{
                          flex: '0 0 180px', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', padding: '40px 16px', cursor: 'pointer',
                        }}
                      >
                        <img
                          src={allImages[(allImages.indexOf(mainImg) + 1) % allImages.length]}
                          alt=""
                          style={{ width: '100%', maxHeight: '70%', objectFit: 'contain', opacity: 0.35, transition: 'opacity 0.25s' }}
                          onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
                          onMouseLeave={e => e.currentTarget.style.opacity = 0.35}
                        />
                      </div>
                    )}

                    {product.specs && (
                      <motion.div
                        animate={{ y: [0, 7, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                        style={{
                          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                          pointerEvents: 'none',
                        }}
                      >
                        <span style={{ fontSize: 8, letterSpacing: 2, color: '#ccc', textTransform: 'uppercase', fontWeight: 600 }}>Specs</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round">
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* Specs ×" tanto mobile como desktop */}
              {product.specs && (
                <div style={{
                  minHeight: isMobile ? 'auto' : '100vh',
                  background: '#fafafa',
                  padding: isMobile ? '40px 20px 60px' : '80px 80px 100px',
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                }}>
                  <div style={{ maxWidth: 900, margin: '0 auto 40px' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#0057FF', marginBottom: 10 }}>
                      {product.brand}
                    </p>
                    <h2 style={{
                      fontSize: isMobile ? 'clamp(22px, 6vw, 36px)' : 'clamp(28px, 4vw, 48px)',
                      fontWeight: 300, letterSpacing: -1.5, color: '#111', margin: 0,
                    }}>
                      {product.name}<br />
                      <span style={{ fontWeight: 500 }}>Especificaciones</span>
                    </h2>
                  </div>

                  <div style={{
                    maxWidth: 900, margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: 0,
                  }}>
                    {product.specs.map((spec, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '18px 0',
                          borderTop: '1px solid rgba(0,0,0,0.07)',
                          paddingRight: !isMobile && i % 2 === 0 ? 40 : 0,
                          paddingLeft: !isMobile && i % 2 === 1 ? 40 : 0,
                          borderLeft: !isMobile && i % 2 === 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                        }}
                      >
                        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#aaa', margin: '0 0 6px' }}>
                          {spec.label}
                        </p>
                        <p style={{ fontSize: 15, fontWeight: 400, color: '#111', margin: 0, lineHeight: 1.5 }}>
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

