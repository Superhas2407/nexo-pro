// Clave que une una variante de la tienda con su precio publicado desde
// PULSE Stock: "producto|color|almacenamiento". WILDCARD en color y
// almacenamiento = todas las variantes del producto.
export const WILDCARD = '*'

export const webPriceKey = (productId, color, storage) =>
  `${productId}|${color ?? ''}|${storage ?? ''}`
