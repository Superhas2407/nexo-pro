import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function ProductCard({ product, onClick }) {
  const [hovered, setHovered]                   = useState(false)
  const [imgError, setImgError]                 = useState(false)
  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [selectedStorageIdx, setSelectedStorageIdx] = useState(0)
  const [colorPicked, setColorPicked]           = useState(false)

  const { isInWishlist, toggleWishlist } = useShop()
  const isMobile = useBreakpoint(768)

  const selectedVariant = product.colorVariants[selectedColorIdx]
  const storageOptions  = selectedVariant.storage.filter(s => s.label)
  const selectedStorage = storageOptions[selectedStorageIdx] ?? selectedVariant.storage[0]
  const hasMultiStorage = storageOptions.length > 1
  const colorDots       = product.colorVariants.filter(cv => cv.hex)
  const hasColors       = colorDots.length > 1
  const inWish          = isInWishlist(product.id, selectedVariant.color)

  const mainImage  = selectedVariant.image
  const hoverImage = selectedVariant.hoverImage

  const fmtPrice = (n) => (hasMultiStorage ? 'Desde REF ' : 'REF ') + n.toLocaleString('en-US')

  const tagColors = {
    'Pro':       { bg: '#111', color: '#fff' },
    'Nuevo':     { bg: '#111', color: '#fff' },
    'Popular':   { bg: '#f0c000', color: '#111' },
    'Exclusivo': { bg: '#5c3d1e', color: '#fff' },
  }

  const handleColorClick = (e, idx) => {
    e.stopPropagation()
    setSelectedColorIdx(idx)
    setSelectedStorageIdx(0)
    setColorPicked(true)
  }

  const handleStorageClick = (e, idx) => {
    e.stopPropagation()
    setSelectedStorageIdx(idx)
  }

  return (
    <div
      onClick={() => onClick(selectedColorIdx, colorPicked)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 12,
        overflow: 'hidden', cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered
          ? '0 8px 24px rgba(0,0,0,0.09)'
          : '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      {/* Imagen */}
      <div style={{ position: 'relative', aspectRatio: '3/4', background: '#efefed', overflow: 'hidden' }}>
        {!imgError && mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: mainImage.includes('-shop.') ? 'contain' : 'cover',
              padding: mainImage.includes('-shop.') ? '12px' : 0,
              opacity: (hovered && hoverImage) ? 0 : 1,
              transform: hovered && !hoverImage ? 'scale(1.04)' : 'scale(1)',
              transition: 'opacity 0.45s ease, transform 0.5s ease',
            }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9l4-4 4 4 4-6 4 6"/><circle cx="7.5" cy="7.5" r="1.5"/>
            </svg>
          </div>
        )}

        {hoverImage && (
          <img
            src={hoverImage}
            alt={product.name + ' lifestyle'}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'opacity 0.45s ease, transform 0.5s ease',
            }}
          />
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product, selectedVariant) }}
          style={{
            position: 'absolute', top: 8, right: 8, zIndex: 2,
            width: 32, height: 32, borderRadius: '50%',
            border: 'none', background: 'rgba(255,255,255,0.9)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: inWish ? '#e53935' : '#bbb',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            transition: 'color 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill={inWish ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        {/* Tag */}
        {product.tag && tagColors[product.tag] && (
          <span style={{
            position: 'absolute', top: 10, left: 10,
            background: tagColors[product.tag].bg, color: tagColors[product.tag].color,
            fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
            padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase',
          }}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>

        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', margin: 0, lineHeight: 1.3 }}>
          {product.name}
        </h3>

        <p style={{ fontSize: 12, color: '#888', margin: '2px 0 0', lineHeight: 1.4 }}>
          {product.brand}
          {selectedVariant.color ? ` · ${selectedVariant.color}` : ''}
        </p>

        {product.specs?.[0] && (
          <p style={{
            fontSize: 11, fontWeight: 500, color: '#aaa', margin: '4px 0 0',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {product.specs[0].value}
          </p>
        )}

        <p style={{ fontSize: 14, fontWeight: 600, color: '#111', margin: '8px 0 0' }}>
          {fmtPrice(selectedStorage.price)}
        </p>

        {/* Storage pills */}
        {hasMultiStorage && (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
            {storageOptions.map((s, i) => (
              <button
                key={i}
                onClick={e => handleStorageClick(e, i)}
                style={{
                  padding: isMobile ? '10px 12px' : '3px 9px',
                  minHeight: isMobile ? 44 : 'auto',
                  borderRadius: 99, fontSize: 11, fontWeight: 500,
                  border: i === selectedStorageIdx ? '1.5px solid #111' : '1.5px solid rgba(0,0,0,0.14)',
                  background: i === selectedStorageIdx ? '#111' : 'transparent',
                  color: i === selectedStorageIdx ? '#fff' : '#555',
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Color dots — al fondo */}
        {hasColors && (() => {
          const hitSize  = isMobile ? 44 : 26
          const dotSize  = isMobile ? 16 : 13
          const visGap   = 5
          const overlap  = hitSize - dotSize - visGap   // solapamiento entre hit areas
          const edgePad  = (hitSize - dotSize) / 2      // compensación del borde izquierdo
          return (
            <div style={{ display: 'flex', gap: 0, marginTop: 8, marginLeft: -edgePad, overflow: 'visible' }}>
              {colorDots.slice(0, 8).map((cv, i) => {
                const realIdx    = product.colorVariants.indexOf(cv)
                const isSelected = realIdx === selectedColorIdx
                return (
                  <div
                    key={i}
                    onClick={e => handleColorClick(e, realIdx)}
                    title={cv.color}
                    style={{
                      width: hitSize, height: hitSize, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      marginRight: -overlap,
                    }}
                  >
                    <div style={{
                      width: dotSize, height: dotSize, borderRadius: '50%',
                      background: cv.hex,
                      border: isSelected ? '2px solid transparent' : '1.5px solid rgba(0,0,0,0.12)',
                      outline: isSelected ? '2px solid #111' : 'none',
                      outlineOffset: isSelected ? '2px' : '0',
                      transition: 'outline 0.15s, transform 0.15s',
                      transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                    }} />
                  </div>
                )
              })}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
