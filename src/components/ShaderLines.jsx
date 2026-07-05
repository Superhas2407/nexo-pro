﻿import { useEffect, useRef } from 'react'

export function ShaderLines() {
  const containerRef = useRef(null)
  const sceneRef = useRef({
    camera: null, scene: null, renderer: null, uniforms: null, animationId: null,
  })
  const resizeRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const init = () => {
      if (!containerRef.current || !window.THREE) return
      const THREE = window.THREE
      const container = containerRef.current
      container.innerHTML = ''

      const camera = new THREE.Camera()
      camera.position.z = 1
      const scene = new THREE.Scene()
      const geometry = new THREE.PlaneBufferGeometry(2, 2)

      const uniforms = {
        time:       { type: 'f',  value: 1.0 },
        resolution: { type: 'v2', value: new THREE.Vector2() },
      }

      const vertexShader = `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `

      // Brand palette mapped to the 3 line color channels:
      // channel 0 â†’ #075356  (dark teal)
      // channel 1 â†’ #0057FF  (mid cyan)
      // channel 2 â†’ #337BFF  (light cyan)
      const fragmentShader = `
        precision highp float;
        uniform vec2 resolution;
        uniform float time;

        float random(in float x)  { return fract(sin(x) * 1e4); }
        float random(vec2 st) { return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453); }

        void main() {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

          vec2 grid = vec2(4.0, 2.0);
          vec2 px   = vec2(256.0);
          uv.x = floor(uv.x * px.x / grid.x) / (px.x / grid.x);
          uv.y = floor(uv.y * px.y / grid.y) / (px.y / grid.y);

          float t = time * 0.06 + random(uv.x) * 0.4;
          float lw = 0.0008;

          vec3 c = vec3(0.0);
          for (int j = 0; j < 3; j++) {
            for (int i = 0; i < 5; i++) {
              c[j] += lw * float(i * i) / abs(
                fract(t - 0.01 * float(j) + float(i) * 0.01) - length(uv)
              );
            }
          }

          // Remap channels to Nexo Pro brand colors
          vec3 col = vec3(0.027, 0.325, 0.337) * c[0]   // #075356
                   + vec3(0.055, 0.655, 0.718) * c[1]   // #0057FF
                   + vec3(0.239, 0.784, 0.839) * c[2];  // #337BFF

          gl_FragColor = vec4(col, 1.0);
        }
      `

      const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
      scene.add(new THREE.Mesh(geometry, material))

      const renderer = new THREE.WebGLRenderer()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      sceneRef.current = { camera, scene, renderer, uniforms, animationId: null }

      const onResize = () => {
        const { width, height } = container.getBoundingClientRect()
        renderer.setSize(width, height)
        uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height)
      }
      resizeRef.current = onResize
      onResize()
      window.addEventListener('resize', onResize)

      const animate = () => {
        sceneRef.current.animationId = requestAnimationFrame(animate)
        uniforms.time.value += 0.05
        renderer.render(scene, camera)
      }
      animate()
    }

    if (window.THREE) {
      init()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js'
      script.onload = init
      script.id = 'threejs-cdn'
      document.head.appendChild(script)
    }

    return () => {
      const { animationId, renderer } = sceneRef.current
      if (animationId) cancelAnimationFrame(animationId)
      if (renderer) renderer.dispose()
      if (resizeRef.current) window.removeEventListener('resize', resizeRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}


