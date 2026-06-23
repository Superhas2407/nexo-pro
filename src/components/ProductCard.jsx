import { useState } from 'react'
import { basePrice } from '../data/products'

export default function ProductCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const firstVariant = product.colorVariants[0]
  const mainImage = firstVariant.image
  const hoverImage = firstVariant.hoverImage

  const minPrice = basePrice(product)
  const allStorage = product.colorVariants.flatMap(cv => cv.storage.filter(s => s.label))
  const multi = allStorage.length > 1
  const fmt = (n) => (multi ? 'Desde REF ' : 'REF ') + n.toLocaleString('en-US')

  const colorDots = product.colorVariants.filter(cv => cv.hex)

  const tagColors = {
    'Pro':       { bg: '#111', color: '#fff' },
    'Nuevo':     { bg: '#111', color: '#fff' },
    'Popular':   { bg: '#f0c000', color: '#111' },
    'Exclusivo': { bg: '#5c3d1e', color: '#fff' },
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered
          ? '0 8px 24px rgba(0,0,0,0.09)'
          : '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      {/* Área de imagen */}
      <div style={{
        position: 'relative',
        aspectRatio: '3/4',
        background: '#efefed',
        overflow: 'hidden',
      }}>
        {/* Imagen base */}
        {!imgError && mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: mainImage.endsWith('.png') ? 'contain' : 'cover',
              padding: mainImage.endsWith('.png') ? '12px' : 0,
              opacity: (hovered && hoverImage) ? 0 : 1,
              transform: hovered && !hoverImage ? 'scale(1.04)' : 'scale(1)',
              transition: 'opacity 0.45s ease, transform 0.5s ease',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9l4-4 4 4 4-6 4 6"/>
              <circle cx="7.5" cy="7.5" r="1.5"/>
            </svg>
          </div>
        )}

        {/* Imagen hover (lifestyle) */}
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

        {/* Tag badge */}
        {product.tag && tagColors[product.tag] && (
          <span style={{
            position: 'absolute', top: 10, left: 10,
            background: tagColors[product.tag].bg,
            color: tagColors[product.tag].color,
            fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
            padding: '3px 8px', borderRadius: 4,
            textTransform: 'uppercase',
          }}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Brand + color dots */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 2,
        }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: 1.5,
            textTransform: 'uppercase', color: '#0ea7b7',
          }}>
            {product.brand}
          </span>
          {colorDots.length > 0 && (
            <div style={{ display: 'flex', gap: 3 }}>
              {colorDots.slice(0, 5).map((cv, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: cv.hex, border: '1.5px solid rgba(0,0,0,0.12)',
                }} />
              ))}
            </div>
          )}
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#111', margin: 0, lineHeight: 1.3 }}>
          {product.name}
        </h3>

        <p style={{ fontSize: 15, fontWeight: 600, color: '#111', margin: '6px 0 0' }}>
          {fmt(minPrice)}
        </p>
      </div>
    </div>
  )
}
