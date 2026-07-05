import { useEffect, useRef } from 'react'

function normalizeColor(hexCode) {
  return [
    ((hexCode >> 16) & 255) / 255,
    ((hexCode >> 8) & 255) / 255,
    (255 & hexCode) / 255,
  ]
}

class MiniGl {
  constructor(canvas) {
    this.canvas = canvas
    this.meshes = []
    const gl = canvas.getContext('webgl', { antialias: true })
    if (!gl) throw new Error('WebGL not supported')
    this.gl = gl
    const context = gl
    const _miniGl = this

    this.Uniform = class {
      constructor(e) {
        this.type = 'float'
        Object.assign(this, e)
        const typeMap = { float:'1f', int:'1i', vec2:'2fv', vec3:'3fv', vec4:'4fv', mat4:'Matrix4fv' }
        this.typeFn = typeMap[this.type] || '1f'
      }
      update(location) {
        if (this.value === undefined || location === null) return
        const isMatrix = this.typeFn.indexOf('Matrix') === 0
        if (isMatrix) context[`uniform${this.typeFn}`](location, this.transpose || false, this.value)
        else context[`uniform${this.typeFn}`](location, this.value)
      }
      getDeclaration(name, type, length) {
        if (this.excludeFrom === type) return ''
        if (this.type === 'array') {
          return this.value[0].getDeclaration(name, type, this.value.length) +
            `\nconst int ${name}_length = ${this.value.length};`
        }
        if (this.type === 'struct') {
          let n = name.replace('u_', '')
          n = n.charAt(0).toUpperCase() + n.slice(1)
          const fields = Object.entries(this.value)
            .map(([k, u]) => u.getDeclaration(k, type).replace(/^uniform/, ''))
            .join('')
          return `uniform struct ${n} {\n${fields}\n} ${name}${length ? `[${length}]` : ''};`
        }
        return `uniform ${this.type} ${name}${length ? `[${length}]` : ''};`
      }
    }

    this.Attribute = class {
      constructor(e) {
        this.type = context.FLOAT
        this.normalized = false
        this.buffer = context.createBuffer()
        Object.assign(this, e)
      }
      update() {
        if (!this.values) return
        context.bindBuffer(this.target, this.buffer)
        context.bufferData(this.target, this.values, context.STATIC_DRAW)
      }
      attach(name, program) {
        const loc = context.getAttribLocation(program, name)
        if (this.target === context.ARRAY_BUFFER) {
          context.bindBuffer(this.target, this.buffer)
          context.enableVertexAttribArray(loc)
          context.vertexAttribPointer(loc, this.size, this.type, this.normalized, 0, 0)
        }
        return loc
      }
      use(loc) {
        context.bindBuffer(this.target, this.buffer)
        if (this.target === context.ARRAY_BUFFER) {
          context.enableVertexAttribArray(loc)
          context.vertexAttribPointer(loc, this.size, this.type, this.normalized, 0, 0)
        }
      }
    }

    this.Material = class {
      constructor(vertexShaders, fragments, uniforms = {}) {
        const material = this
        material.uniforms = uniforms
        material.uniformInstances = []

        function getShader(type, source) {
          const shader = context.createShader(type)
          context.shaderSource(shader, source)
          context.compileShader(shader)
          if (!context.getShaderParameter(shader, context.COMPILE_STATUS))
            throw new Error(context.getShaderInfoLog(shader))
          return shader
        }

        function getUniformDeclarations(uniforms, type) {
          return Object.entries(uniforms)
            .map(([name, val]) => val.getDeclaration(name, type))
            .join('\n')
        }

        const prefix = 'precision highp float;'
        const vertexSource = `${prefix}\nattribute vec4 position;\nattribute vec2 uv;\nattribute vec2 uvNorm;\n${getUniformDeclarations(_miniGl.commonUniforms, 'vertex')}\n${getUniformDeclarations(uniforms, 'vertex')}\n${vertexShaders}`
        const fragmentSource = `${prefix}\n${getUniformDeclarations(_miniGl.commonUniforms, 'fragment')}\n${getUniformDeclarations(uniforms, 'fragment')}\n${fragments}`

        material.program = context.createProgram()
        context.attachShader(material.program, getShader(context.VERTEX_SHADER, vertexSource))
        context.attachShader(material.program, getShader(context.FRAGMENT_SHADER, fragmentSource))
        context.linkProgram(material.program)
        if (!context.getProgramParameter(material.program, context.LINK_STATUS))
          throw new Error(context.getProgramInfoLog(material.program))

        context.useProgram(material.program)
        material.attachUniforms(undefined, _miniGl.commonUniforms)
        material.attachUniforms(undefined, material.uniforms)
      }

      attachUniforms(name, uniforms) {
        if (name === undefined) {
          Object.entries(uniforms).forEach(([n, u]) => this.attachUniforms(n, u))
        } else if (uniforms.type === 'array') {
          uniforms.value.forEach((u, i) => this.attachUniforms(`${name}[${i}]`, u))
        } else if (uniforms.type === 'struct') {
          Object.entries(uniforms.value).forEach(([u, i]) => this.attachUniforms(`${name}.${u}`, i))
        } else {
          this.uniformInstances.push({ uniform: uniforms, location: context.getUniformLocation(this.program, name) })
        }
      }
    }

    this.PlaneGeometry = class {
      constructor() {
        this.width = 1; this.height = 1; this.vertexCount = 0
        this.attributes = {
          position: new _miniGl.Attribute({ target: context.ARRAY_BUFFER, size: 3 }),
          uv: new _miniGl.Attribute({ target: context.ARRAY_BUFFER, size: 2 }),
          uvNorm: new _miniGl.Attribute({ target: context.ARRAY_BUFFER, size: 2 }),
          index: new _miniGl.Attribute({ target: context.ELEMENT_ARRAY_BUFFER, size: 3, type: context.UNSIGNED_SHORT }),
        }
      }
      setTopology(xSegs = 1, ySegs = 1) {
        this.xSegCount = xSegs; this.ySegCount = ySegs
        this.vertexCount = (xSegs + 1) * (ySegs + 1)
        const quadCount = xSegs * ySegs * 2
        this.attributes.uv.values = new Float32Array(2 * this.vertexCount)
        this.attributes.uvNorm.values = new Float32Array(2 * this.vertexCount)
        this.attributes.index.values = new Uint16Array(3 * quadCount)
        for (let y = 0; y <= ySegs; y++) {
          for (let x = 0; x <= xSegs; x++) {
            const i = y * (xSegs + 1) + x
            this.attributes.uv.values[2*i] = x / xSegs
            this.attributes.uv.values[2*i+1] = 1 - y / ySegs
            this.attributes.uvNorm.values[2*i] = (x / xSegs) * 2 - 1
            this.attributes.uvNorm.values[2*i+1] = 1 - (y / ySegs) * 2
            if (x < xSegs && y < ySegs) {
              const s = y * xSegs + x
              this.attributes.index.values[6*s] = i
              this.attributes.index.values[6*s+1] = i + 1 + xSegs
              this.attributes.index.values[6*s+2] = i + 1
              this.attributes.index.values[6*s+3] = i + 1
              this.attributes.index.values[6*s+4] = i + 1 + xSegs
              this.attributes.index.values[6*s+5] = i + 2 + xSegs
            }
          }
        }
        this.attributes.uv.update(); this.attributes.uvNorm.update(); this.attributes.index.update()
      }
      setSize(width = 1, height = 1) {
        this.width = width; this.height = height
        this.attributes.position.values = new Float32Array(3 * this.vertexCount)
        const ox = width / -2, oy = height / -2
        const sw = width / this.xSegCount, sh = height / this.ySegCount
        for (let y = 0; y <= this.ySegCount; y++) {
          for (let x = 0; x <= this.xSegCount; x++) {
            const idx = y * (this.xSegCount + 1) + x
            this.attributes.position.values[3*idx] = ox + x * sw
            this.attributes.position.values[3*idx+1] = -(oy + y * sh)
            this.attributes.position.values[3*idx+2] = 0
          }
        }
        this.attributes.position.update()
      }
    }

    this.Mesh = class {
      constructor(geometry, material) {
        this.geometry = geometry; this.material = material
        this.attributeInstances = []
        Object.entries(geometry.attributes).forEach(([name, attr]) => {
          this.attributeInstances.push({ attribute: attr, location: attr.attach(name, material.program) })
        })
        _miniGl.meshes.push(this)
      }
      draw() {
        context.useProgram(this.material.program)
        this.material.uniformInstances.forEach(({ uniform, location }) => uniform.update(location))
        this.attributeInstances.forEach(({ attribute, location }) => attribute.use(location))
        context.drawElements(context.TRIANGLES, this.geometry.attributes.index.values.length, context.UNSIGNED_SHORT, 0)
      }
    }

    const I = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
    this.commonUniforms = {
      projectionMatrix: new this.Uniform({ type: 'mat4', value: I }),
      modelViewMatrix:  new this.Uniform({ type: 'mat4', value: I }),
      resolution:  new this.Uniform({ type: 'vec2',  value: [1,1] }),
      aspectRatio: new this.Uniform({ type: 'float', value: 1 }),
    }
  }

  setSize(w = 640, h = 480) {
    this.width = w; this.height = h
    this.canvas.width = w; this.canvas.height = h
    this.gl.viewport(0, 0, w, h)
    this.commonUniforms.resolution.value = [w, h]
    this.commonUniforms.aspectRatio.value = w / h
  }

  setOrthographicCamera() {
    this.commonUniforms.projectionMatrix.value = [2/this.width,0,0,0, 0,2/this.height,0,0, 0,0,-0.001,0, 0,0,0,1]
  }

  render() {
    this.gl.clearColor(0,0,0,0)
    this.gl.clearDepth(1)
    this.meshes.forEach(m => m.draw())
  }
}

class Gradient {
  constructor(canvas, colors) {
    this.canvas = canvas; this.colors = colors
    this.minigl = new MiniGl(canvas)
    this.time = 0; this.last = 0; this.isPlaying = false
    this.animate = this.animate.bind(this)
  }

  init(opts = {}) {
    const { shadowPower=6, darkenTop=false, noiseSpeed=0.000005, noiseFrequency=[0.00014,0.00029], deform={} } = opts
    const sectionColors = this.colors.map(hex => normalizeColor(parseInt(hex.replace('#','0x'), 16)))
    const U = (e) => new this.minigl.Uniform(e)

    const uniforms = {
      u_time:         U({ value: 0 }),
      u_shadow_power: U({ value: shadowPower }),
      u_darken_top:   U({ value: darkenTop ? 1 : 0 }),
      u_active_colors: U({ value: [1,1,1,1], type: 'vec4' }),
      u_global: U({ value: {
        noiseFreq:  U({ value: noiseFrequency, type: 'vec2' }),
        noiseSpeed: U({ value: noiseSpeed }),
      }, type: 'struct' }),
      u_vertDeform: U({ value: {
        incline:      U({ value: deform.incline      ?? 0 }),
        offsetTop:    U({ value: deform.offsetTop    ?? -0.5 }),
        offsetBottom: U({ value: deform.offsetBottom ?? -0.5 }),
        noiseFreq:    U({ value: deform.noiseFreq    ?? [3,4], type: 'vec2' }),
        noiseAmp:     U({ value: deform.noiseAmp     ?? 320 }),
        noiseSpeed:   U({ value: deform.noiseSpeed   ?? 10 }),
        noiseFlow:    U({ value: deform.noiseFlow    ?? 3 }),
        noiseSeed:    U({ value: deform.noiseSeed    ?? 5 }),
      }, type: 'struct', excludeFrom: 'fragment' }),
      u_baseColor: U({ value: sectionColors[0], type: 'vec3', excludeFrom: 'fragment' }),
      u_waveLayers: U({ value: [], excludeFrom: 'fragment', type: 'array' }),
    }

    for (let i = 1; i < sectionColors.length; i++) {
      uniforms.u_waveLayers.value.push(U({ value: {
        color:      U({ value: sectionColors[i], type: 'vec3' }),
        noiseFreq:  U({ value: [2+i/sectionColors.length, 3+i/sectionColors.length], type: 'vec2' }),
        noiseSpeed: U({ value: 11 + 0.3*i }),
        noiseFlow:  U({ value: 6.5 + 0.3*i }),
        noiseSeed:  U({ value: 5 + 10*i }),
        noiseFloor: U({ value: 0.1 }),
        noiseCeil:  U({ value: 0.63 + 0.07*i }),
      }, type: 'struct' }))
    }

    const vertexShader = `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
vec3 blendNormal(vec3 base,vec3 blend){return blend;}
vec3 blendNormal(vec3 base,vec3 blend,float opacity){return blend*opacity+base*(1.-opacity);}
varying vec3 v_color;
void main(){
  float time=u_time*u_global.noiseSpeed;
  vec2 noiseCoord=resolution*uvNorm*u_global.noiseFreq;
  float tilt=resolution.y/2.*uvNorm.y;
  float incline=resolution.x*uvNorm.x/2.*u_vertDeform.incline;
  float offset=resolution.x/2.*u_vertDeform.incline*mix(u_vertDeform.offsetBottom,u_vertDeform.offsetTop,uv.y);
  float noise=snoise(vec3(noiseCoord.x*u_vertDeform.noiseFreq.x+time*u_vertDeform.noiseFlow,noiseCoord.y*u_vertDeform.noiseFreq.y,time*u_vertDeform.noiseSpeed+u_vertDeform.noiseSeed))*u_vertDeform.noiseAmp;
  noise*=1.-pow(abs(uvNorm.y),2.);
  noise=max(0.,noise);
  vec3 pos=vec3(position.x,position.y+tilt+incline+noise-offset,position.z);
  v_color=u_baseColor;
  for(int i=0;i<u_waveLayers_length;i++){
    if(u_active_colors[i+1]==1.){
      WaveLayers layer=u_waveLayers[i];
      float layerNoise=smoothstep(layer.noiseFloor,layer.noiseCeil,snoise(vec3(noiseCoord.x*layer.noiseFreq.x+time*layer.noiseFlow,noiseCoord.y*layer.noiseFreq.y,time*layer.noiseSpeed+layer.noiseSeed))/2.+.5);
      v_color=blendNormal(v_color,layer.color,pow(layerNoise,4.));
    }
  }
  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
}`

    const fragmentShader = `
varying vec3 v_color;
void main(){
  vec3 color=v_color;
  if(u_darken_top==1.){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    color.g-=pow(st.y+sin(-12.)*st.x,u_shadow_power)*.4;
  }
  gl_FragColor=vec4(color,1.);
}`

    const material = new this.minigl.Material(vertexShader, fragmentShader, uniforms)
    const geometry = new this.minigl.PlaneGeometry()
    this.mesh = new this.minigl.Mesh(geometry, material)
    this.resize()
    window.addEventListener('resize', () => this.resize())
  }

  resize() {
    const w = this.canvas.parentElement?.offsetWidth || window.innerWidth
    const h = this.canvas.parentElement?.offsetHeight || window.innerHeight
    this.minigl.setSize(w, h)
    this.minigl.setOrthographicCamera()
    this.mesh.geometry.setTopology(Math.ceil(w * 0.02), Math.ceil(h * 0.05))
    this.mesh.geometry.setSize(w, h)
  }

  animate(timestamp) {
    if (!this.isPlaying) return
    this.time += Math.min(timestamp - this.last, 1000/15)
    this.last = timestamp
    this.mesh.material.uniforms.u_time.value = this.time
    this.minigl.render()
    this.animationId = requestAnimationFrame(this.animate)
  }

  start() { this.isPlaying = true; this.animationId = requestAnimationFrame(this.animate) }
  stop()  { this.isPlaying = false; if (this.animationId) cancelAnimationFrame(this.animationId) }
}

export function GradientWave({
  colors = ['#040e0f','#075356','#0057FF','#337BFF','#07626a'],
  isPlaying = true,
  shadowPower = 4,
  darkenTop = false,
  noiseSpeed = 0.000005,
  noiseFrequency = [0.00014, 0.00029],
  deform = { incline: 0.3, noiseAmp: 280, noiseFlow: 3 },
  style,
}) {
  const containerRef = useRef(null)
  const gradientRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = document.createElement('canvas')
    Object.assign(canvas.style, { position:'absolute', top:0, left:0, width:'100%', height:'100%', display:'block' })
    containerRef.current.appendChild(canvas)

    try {
      const gradient = new Gradient(canvas, colors)
      gradient.init({ shadowPower, darkenTop, noiseSpeed, noiseFrequency, deform })
      gradientRef.current = gradient
      if (isPlaying) gradient.start()
    } catch (e) {
      console.error('GradientWave init failed:', e)
    }

    return () => {
      gradientRef.current?.stop()
      if (containerRef.current?.contains(canvas)) containerRef.current.removeChild(canvas)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'hidden', ...style }}
    />
  )
}


