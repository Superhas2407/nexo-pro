// Genera una imagen tipo factura/ticket del carrito para adjuntar al pedido por WhatsApp.

const FONT = '"IBM Plex Mono", monospace'

function loadImage(src) {
  return new Promise(resolve => {
    if (!src) return resolve(null)
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

// Dibuja una imagen centrada dentro de un cuadro, preservando su aspect ratio (como object-fit: contain)
function drawContain(ctx, img, x, y, size) {
  if (!img) {
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'
    ctx.lineWidth = 1
    ctx.strokeRect(x, y, size, size)
    return
  }
  const scale = Math.min(size / img.width, size / img.height)
  const w = img.width * scale
  const h = img.height * scale
  ctx.drawImage(img, x + (size - w) / 2, y + (size - h) / 2, w, h)
}

export async function generateInvoiceImage(cart, cartTotal) {
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready
  }

  const images = await Promise.all(cart.map(item => loadImage(item.image)))

  const width = 720
  const pad = 40
  const rowHeight = 92
  const headerHeight = 150
  const summaryHeight = 76
  const footerHeight = 90
  const height = headerHeight + cart.length * rowHeight + summaryHeight + footerHeight

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const canvas = document.createElement('canvas')
  canvas.width = width * dpr
  canvas.height = height * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  // ── Encabezado ──
  ctx.fillStyle = '#0057FF'
  ctx.font = `700 12px ${FONT}`
  ctx.fillText('P U L S E', pad, 42)

  ctx.fillStyle = '#111'
  ctx.font = `700 28px ${FONT}`
  ctx.fillText('Pedido', pad, 82)

  ctx.fillStyle = '#999'
  ctx.font = `400 12px ${FONT}`
  const dateStr = new Date().toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' })
  ctx.fillText(dateStr, pad, 104)

  ctx.fillStyle = '#999'
  const itemsLabel = `${cart.length} ${cart.length === 1 ? 'producto' : 'productos'}`
  const itemsLabelW = ctx.measureText(itemsLabel).width
  ctx.fillText(itemsLabel, width - pad - itemsLabelW, 104)

  ctx.strokeStyle = '#111'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(pad, headerHeight - 20)
  ctx.lineTo(width - pad, headerHeight - 20)
  ctx.stroke()

  // ── Items ──
  let y = headerHeight
  const imgSize = 60

  cart.forEach((item, i) => {
    drawContain(ctx, images[i], pad, y, imgSize)

    const textX = pad + imgSize + 18
    ctx.fillStyle = '#111'
    ctx.font = `700 15px ${FONT}`
    ctx.fillText(item.name, textX, y + 22)

    ctx.fillStyle = '#888'
    ctx.font = `400 12px ${FONT}`
    const sub = [item.color, item.storage].filter(Boolean).join(' · ') || 'Estándar'
    ctx.fillText(`${sub} · x${item.qty}`, textX, y + 42)

    ctx.fillStyle = '#111'
    ctx.font = `700 15px ${FONT}`
    const priceText = `REF ${(item.price * item.qty).toLocaleString('en-US')}`
    const priceW = ctx.measureText(priceText).width
    ctx.fillText(priceText, width - pad - priceW, y + 32)

    const lineY = y + imgSize + 16
    ctx.strokeStyle = 'rgba(0,0,0,0.15)'
    ctx.lineWidth = 1
    ctx.setLineDash([1, 3])
    ctx.beginPath()
    ctx.moveTo(pad, lineY)
    ctx.lineTo(width - pad, lineY)
    ctx.stroke()
    ctx.setLineDash([])

    y += rowHeight
  })

  // ── Subtotal ──
  ctx.strokeStyle = '#111'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(pad, y + 8)
  ctx.lineTo(width - pad, y + 8)
  ctx.stroke()

  ctx.fillStyle = '#111'
  ctx.font = `700 17px ${FONT}`
  ctx.fillText('SUBTOTAL', pad, y + 42)
  const totalText = `REF ${cartTotal.toLocaleString('en-US')}`
  const totalW = ctx.measureText(totalText).width
  ctx.fillText(totalText, width - pad - totalW, y + 42)

  y += summaryHeight

  // ── Pie ──
  ctx.strokeStyle = '#111'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(pad, y)
  ctx.lineTo(width - pad, y)
  ctx.stroke()

  ctx.fillStyle = '#999'
  ctx.font = `400 11px ${FONT}`
  ctx.fillText('PULSE · Envíos a nivel nacional', pad, y + 26)
  ctx.fillText('WhatsApp +58 422-3194044', pad, y + 44)

  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
}
