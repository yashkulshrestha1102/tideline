// ------------------------------------------------------------
// Realistic water ripple (WebGL2 height-field simulation).
// The cursor drops "stones" into a virtual water surface; waves
// spread, interfere and fade, and are lit like real water
// (bright crests + soft sea-green shadows) on a transparent,
// click-through canvas over the page. Sleeps when idle.
// Returns null when the device can't run it (caller falls back).
// ------------------------------------------------------------

export type WaterOptions = {
  /** cursor ripple radius in CSS px */
  radius?: number;
  /** how strongly the cursor pushes the water */
  strength?: number;
  /** 0.95 (short) … 0.995 (long) — how long waves keep travelling */
  damping?: number;
  /** how bright/visible the lighting is */
  intensity?: number;
};

const VS = `#version 300 es
in vec2 p;
out vec2 uv;
void main() {
  uv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const SIM = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_texel;
uniform float u_damping;
in vec2 uv;
out vec4 o;
void main() {
  vec4 s = texture(u_state, uv);
  float avg = (
    texture(u_state, uv + vec2(u_texel.x, 0.0)).r +
    texture(u_state, uv - vec2(u_texel.x, 0.0)).r +
    texture(u_state, uv + vec2(0.0, u_texel.y)).r +
    texture(u_state, uv - vec2(0.0, u_texel.y)).r
  ) * 0.25;
  s.g += (avg - s.r) * 2.0;
  s.g *= u_damping;
  s.r += s.g;
  s.r *= 0.998;
  o = s;
}`;

const DROP = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_res;
uniform vec4 u_drops[16];
uniform int u_count;
in vec2 uv;
out vec4 o;
void main() {
  vec4 s = texture(u_state, uv);
  vec2 px = uv * u_res;
  for (int i = 0; i < 16; i++) {
    if (i >= u_count) break;
    vec4 d = u_drops[i];
    float dist = length(px - d.xy) / d.z;
    float drop = max(0.0, 1.0 - dist);
    drop = 0.5 - cos(drop * 3.14159265) * 0.5;
    s.r += drop * d.w;
  }
  o = s;
}`;

const RENDER = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_texel;
uniform float u_intensity;
in vec2 uv;
out vec4 o;
void main() {
  float hL = texture(u_state, uv - vec2(u_texel.x, 0.0)).r;
  float hR = texture(u_state, uv + vec2(u_texel.x, 0.0)).r;
  float hD = texture(u_state, uv - vec2(0.0, u_texel.y)).r;
  float hU = texture(u_state, uv + vec2(0.0, u_texel.y)).r;
  vec3 n = normalize(vec3((hL - hR) * 6.0, (hD - hU) * 6.0, 1.0));

  // soft light from the top-left: crests facing it brighten, others darken
  vec3 L = normalize(vec3(-0.45, 0.55, 1.0));
  float shade = dot(n, L) - L.z;

  // sharp glints, invisible on flat water
  vec3 H = normalize(vec3(-0.35, 0.45, 1.0));
  float glint = pow(max(dot(n, H) - 0.0, 0.0), 220.0);
  float flatGlint = pow(H.z, 220.0);
  glint = max(glint - flatGlint, 0.0);

  float hi = clamp(max(shade, 0.0) * 2.6 * u_intensity + glint * 0.8, 0.0, 0.6);
  float sh = clamp(max(-shade, 0.0) * 2.0 * u_intensity, 0.0, 0.3);

  vec3 teal = vec3(0.075, 0.47, 0.415);
  // premultiplied alpha
  vec3 rgb = vec3(1.0) * hi + teal * sh;
  float a = clamp(hi + sh, 0.0, 0.85);
  o = vec4(rgb, a);
}`;

type Drop = { x: number; y: number; r: number; s: number };

export function createWaterGL(canvas: HTMLCanvasElement, opts: WaterOptions = {}) {
  const radius = opts.radius ?? 22;
  const strength = opts.strength ?? 0.75;
  const damping = opts.damping ?? 0.975;
  const intensity = opts.intensity ?? 0.75;

  // probe on a throw-away canvas first, so the real canvas stays free for the 2D fallback
  const probe = document.createElement('canvas').getContext('webgl2');
  if (!probe || !probe.getExtension('EXT_color_buffer_float')) return null;
  probe.getExtension('WEBGL_lose_context')?.loseContext();

  const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;
  gl.getExtension('EXT_color_buffer_float');

  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('[water] shader error', gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  };
  const program = (fs: string) => {
    const v = compile(gl.VERTEX_SHADER, VS);
    const f = compile(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    const p = gl.createProgram()!;
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.bindAttribLocation(p, 0, 'p');
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.warn('[water] link error', gl.getProgramInfoLog(p));
      return null;
    }
    return p;
  };

  const simP = program(SIM);
  const dropP = program(DROP);
  const renP = program(RENDER);
  if (!simP || !dropP || !renP) return null;

  const u = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n);
  const U = {
    sim: { state: u(simP, 'u_state'), texel: u(simP, 'u_texel'), damping: u(simP, 'u_damping') },
    drop: { state: u(dropP, 'u_state'), res: u(dropP, 'u_res'), drops: u(dropP, 'u_drops'), count: u(dropP, 'u_count') },
    ren: { state: u(renP, 'u_state'), texel: u(renP, 'u_texel'), intensity: u(renP, 'u_intensity') },
  };

  // full-screen triangle
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const SCALE = 1 / 3; // simulation runs at 1/3 resolution (fast, naturally soft)
  let cssW = 0;
  let cssH = 0;
  let simW = 0;
  let simH = 0;
  let textures: WebGLTexture[] = [];
  let fbos: WebGLFramebuffer[] = [];
  let cur = 0;

  const makeTarget = () => {
    const t = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, simW, simH, 0, gl.RGBA, gl.HALF_FLOAT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const f = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, f);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { t, f };
  };

  const resize = () => {
    cssW = window.innerWidth;
    cssH = window.innerHeight;
    canvas.width = cssW;
    canvas.height = cssH;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    simW = Math.max(2, Math.round(cssW * SCALE));
    simH = Math.max(2, Math.round(cssH * SCALE));
    textures.forEach((t) => gl.deleteTexture(t));
    fbos.forEach((f) => gl.deleteFramebuffer(f));
    const a = makeTarget();
    const b = makeTarget();
    textures = [a.t, b.t];
    fbos = [a.f, b.f];
    cur = 0;
  };

  const step = (prog: WebGLProgram) => {
    const next = 1 - cur;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbos[next]);
    gl.viewport(0, 0, simW, simH);
    gl.useProgram(prog);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[cur]);
    return next;
  };

  let pending: Drop[] = [];
  const flushDrops = () => {
    while (pending.length) {
      const batch = pending.splice(0, 16);
      const next = step(dropP);
      gl.uniform1i(U.drop.state, 0);
      gl.uniform2f(U.drop.res, simW, simH);
      const arr = new Float32Array(64);
      batch.forEach((d, i) => arr.set([d.x * SCALE, (cssH - d.y) * SCALE, Math.max(d.r * SCALE, 1.5), d.s], i * 4));
      gl.uniform4fv(U.drop.drops, arr);
      gl.uniform1i(U.drop.count, batch.length);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      cur = next;
    }
  };

  const simulate = () => {
    const next = step(simP);
    gl.uniform1i(U.sim.state, 0);
    gl.uniform2f(U.sim.texel, 1 / simW, 1 / simH);
    gl.uniform1f(U.sim.damping, damping);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    cur = next;
  };

  const render = () => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, cssW, cssH);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(renP);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[cur]);
    gl.uniform1i(U.ren.state, 0);
    gl.uniform2f(U.ren.texel, 1 / simW, 1 / simH);
    gl.uniform1f(U.ren.intensity, intensity);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  // ---------------- loop (sleeps when idle) ----------------
  let raf = 0;
  let running = false;
  let lastInput = 0;
  const IDLE_MS = 4000;

  const frame = () => {
    flushDrops();
    simulate();
    simulate();
    render();
    if (performance.now() - lastInput > IDLE_MS) {
      running = false;
      resize(); // resets water to calm & clears
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return;
    }
    raf = requestAnimationFrame(frame);
  };
  const wake = () => {
    lastInput = performance.now();
    if (running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  };

  // ---------------- input ----------------
  let last: { x: number; y: number; t: number } | null = null;

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const now = performance.now();
    const x = e.clientX;
    const y = e.clientY;
    if (!last || now - last.t > 200) {
      last = { x, y, t: now };
      pending.push({ x, y, r: radius, s: strength * 0.25 });
      wake();
      return;
    }
    const dx = x - last.x;
    const dy = y - last.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 3) return;
    const speed = Math.min(dist / Math.max(now - last.t, 1), 3); // px per ms
    const s = strength * (0.18 + speed * 0.22);
    const steps = Math.min(Math.ceil(dist / 9), 12);
    for (let i = 1; i <= steps; i++) {
      pending.push({ x: last.x + (dx * i) / steps, y: last.y + (dy * i) / steps, r: radius, s: s / Math.sqrt(steps) });
    }
    last = { x, y, t: now };
    wake();
  };

  const onDown = (e: PointerEvent) => {
    pending.push({ x: e.clientX, y: e.clientY, r: radius * 1.8, s: strength * 1.3 });
    wake();
  };

  const onVisibility = () => {
    if (document.hidden) lastInput = 0;
  };

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);

  return {
    destroy: () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', onVisibility);
      textures.forEach((t) => gl.deleteTexture(t));
      fbos.forEach((f) => gl.deleteFramebuffer(f));
    },
  };
}
