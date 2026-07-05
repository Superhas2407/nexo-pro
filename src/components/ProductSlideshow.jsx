// Adapted from Framer ProductSlideshow ×" all framer-specific APIs removed
import { useState, startTransition, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function MobilePeekCarousel({ items, dark = false }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveIndex(i)
          }
        },
        { root: container, threshold: 0.6 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach(o => o?.disconnect())
  }, [items.length])

  const item = items[activeIndex]

  return (
    <div>
      <div
        ref={scrollRef}
        style={{
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          gap: 12,
          paddingLeft: '12vw',
          paddingRight: '12vw',
          paddingBottom: 4,
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            ref={el => cardRefs.current[i] = el}
            style={{
              scrollSnapAlign: 'center',
              flexShrink: 0,
              width: '76vw',
              height: '58vw',
              opacity: activeIndex === i ? 1 : 0.4,
              transition: 'opacity 0.3s',
            }}
          >
            <img
              src={it.image?.src}
              alt={it.image?.alt || it.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
        {items.map((_, i) => (
          <div key={i} style={{
            width: activeIndex === i ? 18 : 6,
            height: 6, borderRadius: 99,
            background: activeIndex === i ? '#0057FF' : dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>

      {/* Info ×" se actualiza con el scroll */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          style={{ textAlign: 'center', padding: '20px 24px 32px' }}
        >
          <p style={{ fontSize: 17, fontWeight: 500, color: dark ? '#fff' : '#1a1a1a', margin: '0 0 4px', letterSpacing: -0.4 }}>
            {item.name}
          </p>
          <p style={{ fontSize: 12, fontWeight: 600, color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', margin: '0 0 10px' }}>
            {item.description}
          </p>
          <p style={{ fontSize: 18, fontWeight: 500, color: '#0057FF', margin: '0 0 20px' }}>
            {item.price}
          </p>
          <a
            href="/tienda"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#0057FF', color: '#fff',
              padding: '12px 28px', borderRadius: 99,
              fontSize: 13, fontWeight: 500,
            }}
          >
            Ver en tienda
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

let instanceCounter = 0

export default function ProductSlideshow({
  items = [],
  baseSize = { width: 220, height: 300 },
  scaleUp = { maxScale: 180, time: 0.45, easing: 'easeInOut', sizeDecrement: 18 },
  settings = { gap: 16, radius: 12, background: 'transparent' },
  bgText = '',
  lightBg = false,
  darkTheme = false,
  imageFit = 'cover',
}) {
  const displayItems = items.length > 0 ? items : []

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [activeSubImageIndex, setActiveSubImageIndex] = useState(displayItems.map(() => 0))
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isZoomedIn, setIsZoomedIn] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const containerRef = useRef(null)
  const scrollCooldown = useRef(false)
  const lastTapTime = useRef(0)
  const instanceId = useRef(instanceCounter++)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const openSlideshow = index => {
    startTransition(() => {
      setSelectedIndex(index)
      if (!lightBg) setIsZoomedIn(true)
      setShowInfo(true)
    })
  }

  const closeSlideshow = () => {
    startTransition(() => {
      setShowInfo(false)
      setSelectedIndex(null)
      setIsZoomedIn(false)
    })
  }

  const goToNext = () => {
    startTransition(() => {
      if (selectedIndex !== null && selectedIndex < displayItems.length - 1)
        setSelectedIndex(selectedIndex + 1)
    })
  }

  const goToPrev = () => {
    startTransition(() => {
      if (selectedIndex !== null && selectedIndex > 0)
        setSelectedIndex(selectedIndex - 1)
    })
  }

  const handleImageClick = index => {
    if (isZoomedIn) {
      if (selectedIndex === index) {
        if (isMobile) {
          const now = Date.now()
          if (now - lastTapTime.current < 300) { closeSlideshow(); lastTapTime.current = 0 }
          else lastTapTime.current = now
        } else {
          closeSlideshow()
        }
      } else {
        startTransition(() => setSelectedIndex(index))
      }
    } else {
      openSlideshow(index)
    }
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el || !isZoomedIn || selectedIndex === null || lightBg) return
    const onWheel = e => {
      e.preventDefault()
      if (scrollCooldown.current) return
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX
      if (Math.abs(delta) < 10) return
      scrollCooldown.current = true
      delta > 0 ? goToNext() : goToPrev()
      setTimeout(() => { scrollCooldown.current = false }, scaleUp.time * 1000)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [isZoomedIn, selectedIndex, displayItems.length, lightBg])

  useEffect(() => {
    const onKey = e => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') closeSlideshow()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex, isZoomedIn])

  const scaledW = baseSize.width * (scaleUp.maxScale / 100)
  const scaledH = baseSize.height * (scaleUp.maxScale / 100)

  // —?—? Mobile peek carousel (landing context only) —?—?—?—?—?—?—?—?—?—?—?—?—?—?
  if (lightBg && isMobile) {
    return <MobilePeekCarousel items={displayItems} dark={darkTheme} />
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={{ width: '100%', position: 'relative', background: settings.background, outline: 'none' }}
    >
      {/* Close hint when zoomed */}
      <AnimatePresence>
        {isZoomedIn && (
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={closeSlideshow}
            style={{
              position: 'absolute', top: 16, right: 16, zIndex: 30,
              background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', borderRadius: 99, padding: '6px 14px',
              fontSize: 12, cursor: 'pointer', backdropFilter: 'blur(8px)',
            }}
          >
            × Cerrar
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bg text */}
      {bgText && !isZoomedIn && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        }}>
          <span style={{ fontSize: 'clamp(80px, 14vw, 180px)', fontWeight: 500, color: 'rgba(255,255,255,0.04)', letterSpacing: -4, whiteSpace: 'nowrap' }}>
            {bgText}
          </span>
        </div>
      )}

      {/* Card strip */}
      <div style={{
        display: 'flex', gap: settings.gap, padding: `${settings.gap}px`,
        justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap',
        width: '100%', position: 'relative', zIndex: 5,
        height: isZoomedIn ? scaledH + 120 : baseSize.height + settings.gap * 2,
        overflow: 'visible', transition: `height ${scaleUp.time}s ${scaleUp.easing}`,
      }}>
        {displayItems.map((item, index) => {
          const hasSubImages = item.subImages?.length > 0
          const currentSub = activeSubImageIndex[index] || 0
          const activeImg = hasSubImages && currentSub > 0 ? item.subImages[currentSub - 1] : item.image

          const selectedScale = scaleUp.maxScale / 100
          const xOffset = isZoomedIn
            ? (index - selectedIndex) * (scaledW + settings.gap * 2) - baseSize.width / 2
            : 0
          const yOffset = isZoomedIn ? -baseSize.height / 2 : 0
          const cardScale = isZoomedIn
            ? selectedIndex === index
              ? selectedScale
              : Math.max(0.08, selectedScale * (1 - Math.abs(selectedIndex - index) * scaleUp.sizeDecrement / 100))
            : 1
          const cardOpacity = isZoomedIn
            ? selectedIndex === index ? 1 : 0.18
            : hoveredIndex !== null && hoveredIndex !== index ? 0.55 : 1

          return (
            <motion.div
              key={index}
              layoutId={`product-${instanceId.current}-${index}`}
              style={{
                position: 'relative', borderRadius: settings.radius,
                overflow: 'hidden', cursor: 'pointer',
                width: baseSize.width, height: baseSize.height,
                flexShrink: 0, transformOrigin: 'center center',
              }}
              animate={{ scale: cardScale, opacity: cardOpacity, x: xOffset, y: yOffset }}
              transition={{ duration: scaleUp.time, ease: scaleUp.easing }}
              whileHover={!isZoomedIn ? { scale: 1.04 } : undefined}
              whileTap={!isZoomedIn ? { scale: 0.97 } : undefined}
              drag={isZoomedIn && selectedIndex === index ? 'x' : false}
              dragConstraints={{ left: -80, right: 80 }}
              dragElastic={0.1}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (!isZoomedIn || selectedIndex !== index) return
                if (Math.abs(info.offset.x) > 30 || Math.abs(info.velocity.x) > 200) {
                  info.offset.x > 0 ? goToPrev() : goToNext()
                }
              }}
              onClick={e => { e.stopPropagation(); handleImageClick(index) }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={activeImg?.src}
                alt={activeImg?.alt || item.name}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling && (e.currentTarget.nextSibling.style.display = 'flex')
                }}
                style={{ width: '100%', height: '100%', objectFit: imageFit, display: 'block' }}
              />
              {/* Placeholder si la imagen no carga */}
              <div style={{
                display: 'none', position: 'absolute', inset: 0,
                alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8,
                background: 'rgba(255,255,255,0.04)',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9l4-4 4 4 4-6 4 6"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '0 8px' }}>{item.name}</span>
              </div>

              {/* Sub-image thumbnails */}
              {isZoomedIn && selectedIndex === index && hasSubImages && (
                <div
                  style={{
                    position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', gap: 6, zIndex: 20,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {[item.image, ...(item.subImages || [])].map((img, si) => (
                    <div
                      key={si}
                      onClick={e => { e.stopPropagation(); startTransition(() => { const n = [...activeSubImageIndex]; n[index] = si; setActiveSubImageIndex(n) }) }}
                      style={{
                        width: 36, height: 36, borderRadius: 6, overflow: 'hidden',
                        cursor: 'pointer', border: currentSub === si ? '2px solid #0057FF' : '2px solid rgba(255,255,255,0.2)',
                        opacity: currentSub === si ? 1 : 0.55,
                        transition: 'all 0.2s',
                      }}
                    >
                      <img src={img?.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Product info panel */}
      <AnimatePresence>
        {showInfo && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 480, margin: '0 auto', padding: '0 24px 24px',
              textAlign: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 500, color: darkTheme ? '#fff' : '#1a1a1a', letterSpacing: -0.5 }}>
                  {displayItems[selectedIndex]?.name}
                </h3>
                {displayItems[selectedIndex]?.description && (
                  <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: darkTheme ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)', lineHeight: 1.6, letterSpacing: 0.2 }}>
                    {displayItems[selectedIndex].description}
                  </p>
                )}
                {displayItems[selectedIndex]?.price && (
                  <p style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 500, color: '#0057FF' }}>
                    {displayItems[selectedIndex].price}
                  </p>
                )}
                {displayItems[selectedIndex]?.link && (
                  <a
                    href={displayItems[selectedIndex].link}
                    onMouseEnter={e => { e.currentTarget.style.background = '#337BFF' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#0057FF' }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: '#0057FF', color: '#fff',
                      padding: '11px 24px', borderRadius: 99,
                      fontSize: 13, fontWeight: 500, transition: 'background 0.2s',
                    }}
                  >
                    Ver en tienda
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navegación */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 20 }}>
              <button
                onClick={goToPrev}
                disabled={selectedIndex === 0}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: `1px solid ${darkTheme ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                  background: 'transparent',
                  color: selectedIndex === 0
                    ? (darkTheme ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')
                    : (darkTheme ? '#fff' : '#1a1a1a'),
                  cursor: selectedIndex === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <span style={{ fontSize: 12, fontWeight: 600, color: darkTheme ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>
                {selectedIndex + 1} / {displayItems.length}
              </span>
              <button
                onClick={goToNext}
                disabled={selectedIndex === displayItems.length - 1}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: `1px solid ${darkTheme ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                  background: 'transparent',
                  color: selectedIndex === displayItems.length - 1
                    ? (darkTheme ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')
                    : (darkTheme ? '#fff' : '#1a1a1a'),
                  cursor: selectedIndex === displayItems.length - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


