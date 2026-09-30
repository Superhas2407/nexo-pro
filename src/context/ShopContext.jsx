import { createContext, useContext, useState, useEffect } from 'react'
import { products } from '../data/products'

const ShopContext = createContext(null)

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}

// El carrito guardado de otra visita puede tener un precio viejo — lo
// actualiza al precio vigente (products.js + precios de PULSE Stock).
const withCurrentPrice = (item) => {
  const cv = products.find(p => p.id === item.productId)?.colorVariants
    .find(v => (v.color || null) === item.color)
  const s = cv?.storage.find(o => (o.label || null) === item.storage)
  return s ? { ...item, price: s.price } : item
}

export function ShopProvider({ children }) {
  const [cart, setCart]         = useState(() => load('nexo_cart', []).map(withCurrentPrice))
  const [wishlist, setWishlist] = useState(() => load('nexo_wish', []))

  useEffect(() => { localStorage.setItem('nexo_cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('nexo_wish', JSON.stringify(wishlist)) }, [wishlist])

  // ── Cart ─────────────────────────────────────────────────
  const cartKey = (productId, color, storage) =>
    `${productId}__${color || ''}__${storage || ''}`

  const addToCart = (product, colorVariant, storageOption) => {
    const key = cartKey(product.id, colorVariant.color, storageOption?.label)
    setCart(prev => {
      const exists = prev.find(i => i.key === key)
      if (exists) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, {
        key,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        color: colorVariant.color || null,
        colorHex: colorVariant.hex || null,
        storage: storageOption?.label || null,
        price: storageOption?.price ?? colorVariant.storage[0].price,
        image: colorVariant.image,
        qty: 1,
      }]
    })
  }

  const removeFromCart = (key) => setCart(prev => prev.filter(i => i.key !== key))

  const updateQty = (key, qty) => {
    if (qty < 1) return removeFromCart(key)
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  const cartWaText = () => {
    if (!cart.length) return ''
    const lines = cart.map(i => {
      const parts = [i.name, i.color, i.storage].filter(Boolean).join(' · ')
      return `- ${parts} (x${i.qty})`
    })
    return encodeURIComponent(`Hola! Quisiera cotizar:\n${lines.join('\n')}\n¿Disponibilidad?`)
  }

  // ── Wishlist ──────────────────────────────────────────────
  const wishKey = (productId, color) => `${productId}__${color || ''}`

  const isInWishlist = (productId, color) =>
    wishlist.some(i => i.key === wishKey(productId, color))

  const toggleWishlist = (product, colorVariant) => {
    const key = wishKey(product.id, colorVariant.color)
    setWishlist(prev => {
      if (prev.find(i => i.key === key)) return prev.filter(i => i.key !== key)
      return [...prev, {
        key,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        color: colorVariant.color || null,
        colorHex: colorVariant.hex || null,
        price: colorVariant.storage[0].price,
        image: colorVariant.image,
        link: `/tienda?producto=${product.id}${colorVariant.color ? `&color=${encodeURIComponent(colorVariant.color)}` : ''}`,
      }]
    })
  }

  const removeFromWishlist = (key) => setWishlist(prev => prev.filter(i => i.key !== key))

  return (
    <ShopContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartWaText,
      wishlist, isInWishlist, toggleWishlist, removeFromWishlist,
    }}>
      {children}
    </ShopContext.Provider>
  )
}

export const useShop = () => useContext(ShopContext)
