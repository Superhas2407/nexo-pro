import { useState } from 'react'
import { products, basePrice } from '../data/products'

const fmt = (n) => 'REF ' + n.toLocaleString('en-US')

const tabs = [
  { label: 'Más populares', ids: ['iphone-17-pro', 'iphone-17-pro-max', 'dji-om7p', 'airpods-pro-3'] },
  { label: 'Nuevos',        ids: ['iphone-17-pro', 'dji-om8', 'airpods-pro-3', 'dji-om7'] },
]

function FeatCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const v = product.colorVariants[0]
  const isPng = v.image?.endsWith('.png')
  const price = fmt(basePrice(product))

  const tagColors = {
    'Nuevo':   { bg: '#0ea7b7', color: '#fff' },
    'Pro':     { bg: '#111', color: '#fff' },
    'Popular': { bg: '#f0c000', color: '#111' },
  }
  const tagStyle = product.tag ? tagColors[product.tag] : null

  return (
    <a
      href={`/tienda?producto=${product.id}`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: '#fff',
        border: `1.5px solid ${hovered ? '#0ea7b7' : '#eee'}`,
        borderRadius: 12, overflow: 'hidden',
        transition: 'all 0.22s cubic-bezier(.22,1,.36,1)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 8px 28px rgba(7,83,86,0.09)' : 'none',
        height: '100%', display: 'flex', flexDirection: 'column',
      }}>
        {/* Imagen */}
        <div style={{
          background: '#f7f7f5', height: 200, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', flexShrink: 0,
        }}>
          {tagStyle && (
            <span style={{
              position: 'absolute', top: 12, left: 12, zIndex: 1,
              fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
              padding: '3px 10px', borderRadius: 99, textTransform: 'uppercase',
              background: tagStyle.bg, color: tagStyle.color,
            }}>
              {product.tag}
            </span>
          )}
          {v.image ? (
            <>
              <img
                src={v.image}
                alt={product.name}
                style={{
                  maxHeight: '85%', maxWidth: '85%',
                  objectFit: 'contain',
                  opacity: hovered && v.hoverImage ? 0 : 1,
                  transition: 'opacity 0.4s ease',
                  position: 'absolute',
                }}
              />
              {v.hoverImage && (
                <img
                  src={v.hoverImage}
                  alt={product.name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    position: 'absolute', inset: 0,
                  }}
                />
              )}
            </>
          ) : (
            <div style={{ width: 60, height: 80, background: 'rgba(14,167,183,0.08)', borderRadius: 8, border: '1px solid rgba(14,167,183,0.2)' }} />
          )}
        </div>

        {/* Info */}
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#0ea7b7', letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 4px' }}>
            {product.brand}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a', margin: '0 0 8px', lineHeight: 1.3 }}>
            {product.name}
          </h3>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#075356', margin: '0 0 16px' }}>
            {product.colorVariants.length > 1 || product.colorVariants[0].storage.length > 1
              ? 'Desde ' + price
              : price}
          </p>
          <div style={{
            marginTop: 'auto',
            padding: '12px 10px', background: '#075356', color: '#fff',
            borderRadius: 8, fontSize: 13, fontWeight: 500,
            textAlign: 'center', transition: 'background 0.18s',
            ...(hovered ? { background: '#0ea7b7' } : {}),
          }}>
            Ver producto
          </div>
        </div>
      </div>
    </a>
  )
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0)

  const tabProducts = tabs[activeTab].ids
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)

  return (
    <section className="section-pad" style={{ background: '#fff', paddingTop: 72, paddingBottom: 72 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h2 style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>Lo más vendido</h2>
          <a href="/tienda" style={{ fontSize: 14, color: '#0ea7b7', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
            Ver todo →
          </a>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #e8ecec', marginBottom: 32, gap: 0 }}>
          {tabs.map((tab, i) => (
            <button key={tab.label} onClick={() => setActiveTab(i)} style={{
              padding: '13px 20px', background: 'none', border: 'none',
              borderBottom: activeTab === i ? '2px solid #0ea7b7' : '2px solid transparent',
              color: activeTab === i ? '#075356' : '#999',
              fontWeight: activeTab === i ? 600 : 400,
              fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.18s',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {tabProducts.map(p => <FeatCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}
