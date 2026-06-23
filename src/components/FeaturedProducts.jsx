import { useState } from 'react'

const tabs = ['Más populares', 'Nuevos', 'Ofertas']

const products = {
  0: [
    { brand: 'Apple', name: 'iPhone 16', price: '$31,999 MXN', badge: 'NUEVO', badgeStyle: { background: '#0ea7b7', color: '#fff' } },
    { brand: 'DJI', name: 'OM 6', price: '$4,499 MXN' },
    { brand: 'DJI', name: 'Mic 2', price: '$5,799 MXN', badge: 'NUEVO', badgeStyle: { background: '#0ea7b7', color: '#fff' } },
    { brand: 'Meta × Oakley', name: 'Headliner', price: '$8,999 MXN' },
  ],
  1: [
    { brand: 'Apple', name: 'iPhone 16 Pro Max', price: '$44,999 MXN', badge: 'NUEVO', badgeStyle: { background: '#0ea7b7', color: '#fff' } },
    { brand: 'DJI', name: 'RS 4 Mini', price: '$9,999 MXN', badge: 'NUEVO', badgeStyle: { background: '#0ea7b7', color: '#fff' } },
    { brand: 'DJI', name: 'Mic Mini', price: '$3,299 MXN' },
    { brand: 'Meta × Oakley', name: 'Skyline', price: '$7,999 MXN', badge: 'NUEVO', badgeStyle: { background: '#0ea7b7', color: '#fff' } },
  ],
  2: [
    { brand: 'Apple', name: 'iPhone 15', price: '$24,999 MXN', oldPrice: '$28,999 MXN', badge: 'OFERTA', badgeStyle: { background: '#faeeda', color: '#633806' } },
    { brand: 'DJI', name: 'OM 5', price: '$2,999 MXN', oldPrice: '$3,999 MXN', badge: 'OFERTA', badgeStyle: { background: '#faeeda', color: '#633806' } },
    { brand: 'DJI', name: 'Mic (1ra gen)', price: '$3,999 MXN', oldPrice: '$4,999 MXN', badge: 'OFERTA', badgeStyle: { background: '#faeeda', color: '#633806' } },
    { brand: 'Meta × Oakley', name: 'Headliner Smoke', price: '$7,499 MXN', oldPrice: '$9,999 MXN', badge: 'OFERTA', badgeStyle: { background: '#faeeda', color: '#633806' } },
  ],
}

function ProductCard({ product }) {
  return (
    <div style={{
      background: '#fff', border: '1.5px solid #eee', borderRadius: 12,
      overflow: 'hidden', cursor: 'pointer', transition: 'all 0.22s cubic-bezier(.22,1,.36,1)',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#0ea7b7'
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(7,83,86,0.09)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#eee'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <div style={{ background: '#f0fafb', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {product.badge && (
          <div style={{ position: 'absolute', top: 12, left: 12, fontSize: 10, fontWeight: 500, padding: '3px 10px', borderRadius: 99, letterSpacing: 0.5, ...product.badgeStyle }}>
            {product.badge}
          </div>
        )}
        <div style={{ width: 60, height: 80, background: 'rgba(14,167,183,0.08)', borderRadius: 8, border: '1px solid rgba(14,167,183,0.2)' }} />
      </div>
      <div style={{ padding: 16 }}>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>{product.brand}</p>
        <h3 style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a', marginBottom: 8 }}>{product.name}</h3>
        {product.oldPrice && (
          <p style={{ fontSize: 12, color: '#bbb', textDecoration: 'line-through', marginBottom: 4 }}>{product.oldPrice}</p>
        )}
        <p style={{ fontSize: 16, fontWeight: 500, color: '#075356', marginBottom: 16 }}>{product.price}</p>
        <button style={{ width: '100%', padding: '13px 10px', background: '#075356', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'background 0.18s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#07626a'}
          onMouseLeave={e => e.currentTarget.style.background = '#075356'}
        >
          Ver producto
        </button>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="section-pad" style={{ background: '#fff', paddingTop: 72, paddingBottom: 72 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h2 style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a' }}>Lo más vendido</h2>
          <a href="#" style={{ fontSize: 14, color: '#0ea7b7', fontWeight: 500, padding: '12px 0', display: 'inline-flex', alignItems: 'center' }}>Ver todo →</a>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #e8ecec', marginBottom: 32, gap: 0 }}>
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} style={{
              padding: '13px 20px', background: 'none', border: 'none',
              borderBottom: activeTab === i ? '2px solid #0ea7b7' : '2px solid transparent',
              color: activeTab === i ? '#075356' : '#999',
              fontWeight: activeTab === i ? 500 : 400,
              fontSize: 14, cursor: 'pointer',
              transition: 'all 0.18s',
            }}>
              {tab}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {products[activeTab].map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
