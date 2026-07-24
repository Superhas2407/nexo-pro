import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_KEY = process.env.OPENROUTER_API_KEY
if (!API_KEY) {
  console.error('Falta OPENROUTER_API_KEY. Corre con: node --env-file=.env generate-single-post.mjs')
  process.exit(1)
}
const MODEL   = 'google/gemini-3-pro-image'
const OUT     = path.join(__dirname, 'carousel-output')

const PROMPT = `SCENE: Sleek minimalist filmmaker's studio at night. A carbon-fiber desk surface fills the foreground, lit by a single dramatic overhead spotlight casting warm amber light with deep shadows. The DJI Osmo Mobile 8 gimbal sits perfectly centered on the surface — rendered in photorealistic detail: matte black finish, folded compact form, three visible axes, DJI logo subtly embossed. Around it: a blurred smartphone, a small lens cloth, a filmmaker's black notebook slightly out of focus. Background: dark studio walls with faint cyan (#0ea7b7) LED accent strips glowing softly. Extreme depth of field blur on background. Film grain. Cinematic movie-set atmosphere. 4:5 portrait Instagram format.

TEXT OVERLAY (on the image, artfully composed):
- Upper area: "DJI Osmo Mobile 8" in bold white Playfair Display italic serif, large
- Below headline: "Estabilidad perfecta" in #0ea7b7 cyan italic serif, slightly smaller
- Below accent: "para cada momento." in white italic serif
- Small detail below: "Plegable · 3 ejes · Ultra-estable" in monospace small, #0ea7b7
- Price badge (bottom left area): rounded rectangle, dark with cyan border, "REF 270" in cyan bold monospace

HOOK PHRASE (elegant, lower third): "capta el mundo como nunca lo habías visto..." in white italic serif, smaller

FOOTER (very bottom, subtle):
- Left: "@nexopro.ccs" in #0ea7b7 monospace small
- Right: "save for later" in white italic serif small
- Very subtle dark gradient at bottom for footer readability

STYLE: Photorealistic 3D render. Warm amber volumetric light rays on device. Cyan rim lighting from behind. Deep shadows. Film grain texture. Ultra high quality, professional product advertising, Apple-level aesthetic, editorial magazine quality.`

async function main() {
  fs.mkdirSync(OUT, { recursive: true })
  const outFile = path.join(OUT, 'dji-osmo8-post.png')

  console.log('Generating DJI Osmo 8 cinematic post (Pro model)...')
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://nexo-pro.vercel.app',
      'X-Title': 'Nexo Pro IG Post',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: PROMPT }],
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

  fs.writeFileSync(outFile, out)
  console.log(`Saved: dji-osmo8-post.png — ${Math.round(out.length / 1024)} KB`)
}

main().catch(e => { console.error(e); process.exit(1) })
