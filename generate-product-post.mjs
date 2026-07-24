import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_KEY = process.env.OPENROUTER_API_KEY
if (!API_KEY) {
  console.error('Falta OPENROUTER_API_KEY. Corre con: node --env-file=.env generate-product-post.mjs')
  process.exit(1)
}
const MODEL   = 'google/gemini-3-pro-image'
const OUT     = path.join(__dirname, 'carousel-output')

async function main() {
  fs.mkdirSync(OUT, { recursive: true })

  // Load real product image from public/
  const shopImg  = fs.readFileSync(path.join(__dirname, 'public', 'dji-osmo8-shop.webp'))
  const shopB64  = shopImg.toString('base64')

  const PROMPT = `SCENE: Late-night filmmaker's studio. A sleek matte carbon-fiber desk surface dominates the foreground, lit by a single dramatic overhead spotlight casting warm amber volumetric light with deep cinematic shadows. The provided DJI Osmo Mobile 8 product photo is placed on the desk as the HERO OBJECT — do not alter or distort it, just composite it naturally into the scene sitting on the surface, catching the amber spotlight glow on its matte black body. Around the gimbal: a professional smartphone slightly out of focus to its left, a small black lens cloth folded neatly to its right, a filmmaker's notebook partially visible at the edge. Background: dark studio walls, barely visible film equipment in the deep blur. Faint cyan (#0ea7b7) LED accent strips run horizontally along the back wall, softly illuminating the scene. Extreme depth of field blur on background. Fine film grain overlay. Movie-poster atmosphere. 4:5 portrait Instagram format, 1080x1350px.

TEXT OVERLAY — placed artfully in the composition, NOT obstructing the product:
Upper area (above the gimbal):
- "@nexopro.ccs" in #0ea7b7 IBM Plex Mono, very small, top-left corner
- Brand tag: "DJI — OSMO MOBILE 8" in #0ea7b7 monospace caps, small, with a tiny cyan dot prefix
- Large Playfair Display italic serif white headline (2 lines): "Captura cada" / "momento perfecto."
- Below in #0ea7b7 bold italic serif: "sin temblores. sin límites."
- Tiny monospace detail row: "3 ejes · plegable · auto-seguimiento · REF 270"

Lower area (below or beside the product):
- Price badge: rounded rectangle, dark semi-transparent bg, cyan border glow, "REF 270" in #0ea7b7 bold monospace inside
- Hook phrase in white italic serif, small: "el gimbal que cambia cómo ves el mundo..."

FOOTER — very bottom, subtle dark gradient behind:
- Left: "@nexopro.ccs" in #0ea7b7 monospace small
- Right: "save for later" in white italic serif small

STYLE: Photorealistic cinematic composite. The real product photo must appear naturally lit by the amber spotlight — as if it was always sitting on that desk. Warm golden volumetric rays on the device body. Cyan rim accent from the back LED strip. Deep shadows under the gimbal. Ultra high quality, Apple-level product advertising, editorial magazine feel, Hasselblad-grade depth.`

  console.log('Sending real product photo to Gemini Pro...')
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://nexo-pro.vercel.app',
      'X-Title': 'Nexo Pro Product Post',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:image/webp;base64,${shopB64}` },
          },
          {
            type: 'text',
            text: PROMPT,
          },
        ],
      }],
    }),
  })

  const data = await r.json()
  const imgEntry = data.choices?.[0]?.message?.images?.[0]
  if (!imgEntry) throw new Error('No image: ' + JSON.stringify(data).slice(0, 400))

  const b64 = imgEntry.image_url.url.replace(/^data:image\/\w+;base64,/, '')
  const raw  = Buffer.from(b64, 'base64')

  const out = await sharp(raw)
    .resize(1080, 1350, { fit: 'cover', position: 'center' })
    .png({ quality: 95 })
    .toBuffer()

  const outFile = path.join(OUT, 'dji-osmo8-cinematic-v2.png')
  fs.writeFileSync(outFile, out)
  console.log(`Saved: dji-osmo8-cinematic-v2.png — ${Math.round(out.length / 1024)} KB`)
}

main().catch(e => { console.error(e); process.exit(1) })
