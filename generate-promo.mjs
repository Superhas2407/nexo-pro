import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_KEY = process.env.OPENROUTER_API_KEY
if (!API_KEY) {
  console.error('Falta OPENROUTER_API_KEY. Corre con: node --env-file=.env generate-promo.mjs')
  process.exit(1)
}
const MODEL   = 'google/gemini-3-pro-image'
const OUT     = path.join(__dirname, 'carousel-output')

// Load product images
const iphone  = fs.readFileSync(path.join(__dirname, 'public', 'iphone-silver-shop.webp')).toString('base64')
const dji     = fs.readFileSync(path.join(__dirname, 'public', 'dji-osmo8-shop.webp')).toString('base64')

async function generate(prompt, images, filename, w, h) {
  console.log(`Generating ${filename}...`)
  const content = [
    ...images.map(({ b64, mime }) => ({
      type: 'image_url',
      image_url: { url: `data:${mime};base64,${b64}` }
    })),
    { type: 'text', text: prompt }
  ]

  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://nexo-pro.vercel.app',
      'X-Title': 'Nexo Pro Promo',
    },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content }] }),
  })

  const data = await r.json()
  const imgEntry = data.choices?.[0]?.message?.images?.[0]
  if (!imgEntry) throw new Error(`No image (${filename}): ` + JSON.stringify(data).slice(0, 300))

  const b64 = imgEntry.image_url.url.replace(/^data:image\/\w+;base64,/, '')
  const buf = await sharp(Buffer.from(b64, 'base64'))
    .resize(w, h, { fit: 'cover', position: 'center' })
    .png({ quality: 95 })
    .toBuffer()

  fs.writeFileSync(path.join(OUT, filename), buf)
  console.log(`Saved ${filename} — ${Math.round(buf.length / 1024)} KB`)
}

const SCENE = `SCENE: Sleek dark tech showroom at night. Background #0d0d0f. Dramatic overhead spotlights casting warm amber pools of light on a matte dark surface. The provided product images (iPhone 17 Pro and DJI Osmo Mobile 8) are arranged on the surface as hero objects — do not distort them, composite them naturally catching the amber light. iPhone on the left, DJI gimbal on the right, slight overlap, both sharp and detailed. Deep bokeh background with faint cyan (#0ea7b7) LED accent strips. Film grain. Cinematic atmosphere.`

const SHARED_TEXT = `
Brand: Nexo Pro (@nexopro.ccs)
Colors: background #0d0d0f, accent cyan #0ea7b7, white text
Handle always present: "@nexopro.ccs" in cyan monospace
Website pill: "nexoproccs.com" inside a rounded badge with cyan border`

const POST_PROMPT = `${SCENE}
${SHARED_TEXT}

FORMAT: 4:5 portrait Instagram post, 1080x1350px.

TEXT OVERLAY:
- Top-left: "@nexopro.ccs" in #0ea7b7 monospace tiny
- Top-right: "save for later" white italic small
- Upper area above products:
  * Small tag pill "NEXO PRO · VE" cyan border
  * Large Playfair Display italic white: "Los dispositivos" / "que todos quieren."
  * Cyan bold italic: "al mejor precio."
- Below products:
  * Pill row: "iPhone 17 Pro" · "DJI Osmo 8" with subtle dark borders
  * Website badge: rounded rectangle cyan border glowing, "nexoproccs.com" white monospace inside
- Bottom hook italic white: "visita la tienda y encuentra el tuyo →"
- Footer: thin separator, "@nexopro.ccs" left, "01" right gray

Ultra cinematic, Apple-level product advertising, editorial magazine quality.`

const STORY_PROMPT = `SCENE: Dark premium tech studio, background #0d0d0f. Single dramatic overhead amber spotlight illuminates a sleek matte surface. The iPhone 17 Pro (silver, provided photo) and DJI Osmo Mobile 8 (provided photo) are placed on the surface as hero objects — large, sharply lit, naturally composited. Lots of negative space above and below. Minimal. Cinematic. Deep bokeh, film grain, no clutter.

FORMAT: 9:16 portrait Instagram Story, 1080x1920px.

LAYOUT — extremely minimal, lots of breathing room:
- Top-left only: "@nexopro.ccs" in #0ea7b7 monospace, very small, subtle
- CENTER of frame: products hero-sized, dramatic lighting, taking up roughly the middle 50% of the frame vertically
- Below products, centered:
  * One bold white Playfair Display italic line: "Lo mejor,"
  * One cyan #0ea7b7 bold italic line: "al mejor precio."
  * Generous whitespace
  * One rounded pill/badge with subtle cyan glow border: "nexoproccs.com" in white monospace
- Nothing else. No bullet lists. No extra text. No footer.

Minimalist Apple-level composition. Silence and space around the products. Premium dark aesthetic.`

fs.mkdirSync(OUT, { recursive: true })

const imgs = [
  { b64: iphone, mime: 'image/webp' },
  { b64: dji,    mime: 'image/webp' },
]

// Generate both in parallel
await Promise.all([
  generate(POST_PROMPT,  imgs, 'promo-post.png',  1080, 1350),
  generate(STORY_PROMPT, imgs, 'promo-story.png', 1080, 1920),
])

console.log('\nDone!')
