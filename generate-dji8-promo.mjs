import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_KEY = process.env.OPENROUTER_API_KEY
if (!API_KEY) {
  console.error('Falta OPENROUTER_API_KEY. Corre con: node --env-file=.env generate-dji8-promo.mjs')
  process.exit(1)
}
const MODEL   = 'google/gemini-3-pro-image'
const OUT     = path.join(__dirname, 'carousel-output')

const dji = fs.readFileSync(path.join(__dirname, 'public', 'dji-osmo8-shop.webp')).toString('base64')

async function generate(prompt, filename, w, h) {
  console.log(`Generating ${filename}...`)
  const content = [
    { type: 'image_url', image_url: { url: `data:image/webp;base64,${dji}` } },
    { type: 'text', text: prompt }
  ]
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json', 'HTTP-Referer': 'https://nexoproccs.com' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content }] }),
  })
  const data = await r.json()
  const imgEntry = data.choices?.[0]?.message?.images?.[0]
  if (!imgEntry) throw new Error(`No image: ` + JSON.stringify(data).slice(0, 300))
  const b64 = imgEntry.image_url.url.replace(/^data:image\/\w+;base64,/, '')
  const buf = await sharp(Buffer.from(b64, 'base64'))
    .resize(w, h, { fit: 'cover', position: 'center' })
    .png({ quality: 95 })
    .toBuffer()
  fs.writeFileSync(path.join(OUT, filename), buf)
  console.log(`Saved ${filename} — ${Math.round(buf.length / 1024)} KB`)
}

const BASE = `
Use the provided real product photo of the DJI Osmo Mobile 8 gimbal — place it cleanly on the white background with a soft drop shadow beneath it. Do not distort or alter the product.

BRAND STYLE — very important:
- White or off-white (#fafafa) background
- Cyan #0ea7b7 as accent color
- DECORATIVE CURVED SHAPES: large flowing organic teal/cyan curved blobs or wave shapes placed at the bottom corners and possibly one at the top corner — like decorative brand swooshes, soft and rounded, similar to modern brand design. These give the image energy and brand identity without cluttering the center.
- Nexo Pro logo: a circle at the top center with the Nexo Pro brand mark inside (the interlocking N shape or just "NEXO PRO" text in a circle), in #0ea7b7 on white
- Typography: bold black sans-serif for product name, #0ea7b7 for accents and price, clean and modern
- NO bullet lists, NO emoji, NO clutter — minimal and breathable
`

const STORY = `${BASE}

FORMAT: 9:16 Instagram Story, 1080x1920px.

LAYOUT — minimal, lots of white space:
TOP:
- Nexo Pro circle logo centered, top area, #0ea7b7

CENTER:
- DJI Osmo Mobile 8 product photo large, centered, clean on white with soft shadow
- Slight tilt or 3/4 angle if it looks better

BOTTOM TEXT AREA (above the curved decorative shapes):
- Bold black large: "DJI Osmo Mobile 8"
- #0ea7b7 italic: "En tan solo..."
- Rounded rectangle price badge in #0ea7b7 solid fill, white text bold: "REF 210"

DECORATIVE:
- Teal curved organic shapes at bottom-left and bottom-right corners, flowing inward
- Maybe a small decorative curve top-right

FOOTER:
- "@nexopro.ccs" tiny centered in #0ea7b7

Clean, premium, breathable. No clutter.`

const POST = `${BASE}

FORMAT: 4:5 Instagram Post, 1080x1350px.

LAYOUT — clean, structured, with breathing room:

TOP SECTION:
- Nexo Pro circle logo small, top-left, #0ea7b7
- Right of logo or top-center: bold large black text "DJI Osmo Mobile 8" — this is the main headline, prominent, at the top just like a promo title
- Below headline: #0ea7b7 italic "En tan solo..." — tagline

MIDDLE SECTION:
- DJI Osmo Mobile 8 product photo large and centered, clean on white with soft drop shadow

BOTTOM SECTION (above the curved shapes):
- Rounded rectangle price badge: #0ea7b7 solid fill, white bold text "REF 210"
- Three short feature lines in small clean black text with a small cyan dot or dash:
  · "Estabilización 3 ejes"
  · "Diseño plegable"
  · "Auto-seguimiento inteligente"
- Tiny gray bottom: "nexoproccs.com"

DECORATIVE:
- Teal curved organic blob shapes at bottom-left and bottom-right corners
- Small teal curve accent near top-right

Premium, clean, conversion-focused. Product is hero, price is clear, features are scannable.`

fs.mkdirSync(OUT, { recursive: true })
await Promise.all([
  generate(STORY, 'dji8-story.png', 1080, 1350),
  generate(POST,  'dji8-post.png',  1080, 1350),
])
console.log('\nDone!')
