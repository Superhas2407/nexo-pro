import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_KEY = process.env.OPENROUTER_API_KEY
if (!API_KEY) {
  console.error('Falta OPENROUTER_API_KEY. Corre con: node --env-file=.env generate-promo-v2.mjs')
  process.exit(1)
}
const MODEL   = 'google/gemini-3-pro-image'
const OUT     = path.join(__dirname, 'carousel-output')

const iphone = fs.readFileSync(path.join(__dirname, 'public', 'iphone-silver-shop.webp')).toString('base64')
const dji    = fs.readFileSync(path.join(__dirname, 'public', 'dji-osmo8-shop.webp')).toString('base64')

const imgs = [
  { b64: iphone, mime: 'image/webp' },
  { b64: dji,    mime: 'image/webp' },
]

async function generate(prompt, filename, w, h) {
  console.log(`Generating ${filename}...`)
  const content = [
    ...imgs.map(({ b64, mime }) => ({ type: 'image_url', image_url: { url: `data:${mime};base64,${b64}` } })),
    { type: 'text', text: prompt }
  ]
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json', 'HTTP-Referer': 'https://nexoproccs.com' },
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

const BASE = `
COLOR PALETTE: white/off-white background (#fafafa or pure white), cyan accent #0ea7b7, black text.
BRAND: Nexo Pro. Clean, minimal, premium. Think Apple Store aesthetic with cyan as the brand color.
PRODUCTS: Use the provided real product photos (iPhone 17 Pro silver + DJI Osmo Mobile 8). Place them cleanly on white/transparent — no dark studio, no amber lighting. Clean product photography style, slightly elevated shadow underneath each product. Products must look sharp and large.
NO bullet lists. NO emoji. NO cluttered text. Minimal is the rule.
`

const STORY = `${BASE}

FORMAT: 9:16 Instagram Story, 1080x1920px. Clean white background.

LAYOUT — minimal, generous breathing room:
- Top center: Nexo Pro logo mark — simple circle with "N" or the letters "NEXO PRO" inside, in #0ea7b7 on white, thin border
- Large empty white space after logo
- CENTER: the two products side by side — iPhone 17 Pro left, DJI Osmo 8 right — large, clean, floating slightly above a subtle soft shadow. No background clutter.
- Below products, centered:
  * One short bold sans-serif or serif line in black: "Lo mejor de la tecnología,"
  * One line in #0ea7b7 italic serif: "al alcance de todos."
  * Generous whitespace
  * One pill button: white background, #0ea7b7 border and text, "nexoproccs.com"
- Bottom: "@nexopro.ccs" in #0ea7b7 monospace, very small, centered

Lots of white space. Clean. Breathable. Elegant.`

const POST = `${BASE}

FORMAT: 4:5 Instagram Post, 1080x1350px. Clean white background.

LAYOUT — minimal, generous breathing room:
- Top left: simple "NEXO PRO" text in #0ea7b7 monospace tiny, with a small dot
- Top right: "@nexopro.ccs" in gray monospace tiny
- CENTER upper half: the two products side by side — iPhone 17 Pro left, DJI Osmo 8 right — large, clean, floating with a soft shadow underneath. No background.
- CENTER lower half:
  * Bold black serif headline: "Los dispositivos que todos quieren."
  * #0ea7b7 italic serif subline: "al mejor precio."
  * Generous whitespace
  * Pill badge: thin #0ea7b7 border, "nexoproccs.com" in #0ea7b7 monospace inside

Clean, breathable, premium white aesthetic.`

fs.mkdirSync(OUT, { recursive: true })
await Promise.all([
  generate(STORY, 'promo-story-v3.png', 1080, 1920),
  generate(POST,  'promo-post-v2.png',  1080, 1350),
])
console.log('\nDone!')
