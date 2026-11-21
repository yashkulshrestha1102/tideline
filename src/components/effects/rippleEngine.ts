// ------------------------------------------------------------
// Water ripple engine (plain canvas 2D, no libraries).
// Draws soft water rings under the cursor on a transparent,
// click-through canvas. Sleeps when nothing is moving.
// ------------------------------------------------------------

type Ripple = {
  x: number;
  y: number;
  born: number;
  life: number;
  maxR: number;
  strength: number;
  splash: boolean;
};

export type RippleEngine = { destroy: () => void };

export function createRippleEngine(canvas: HTMLCanvasElement): RippleEngine {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { destroy: () => {} };

  const ripples: Ripple[] = [];
  const MAX = 40;
  const SPACING = 44; // px the cursor must travel before a new ripple
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  let w = 0;
  let h = 0;
  let raf = 0;
  let running = false;
  let last = { x: -9999, y: -9999, t: 0 };

  // soft light that follows the cursor with a little lag
  const glow = { x: -9999, y: -9999, tx: -9999, ty: -9999, a: 0, ta: 0 };

  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const add = (x: number, y: number, strength: number, splash = false, delay = 0) => {
    ripples.push({
      x,
      y,
      born: performance.now() + delay,
      life: splash ? 2200 : 1800,
      maxR: splash ? 160 : 50 + strength * 55,
      strength: Math.min(strength, 1),
      splash,
    });
    if (ripples.length > MAX) ripples.shift();
    start();
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const now = performance.now();
    const x = e.clientX;
    const y = e.clientY;
    glow.tx = x;
    glow.ty = y;
    glow.ta = 1;
    if (glow.x < -999) {
      glow.x = x;
      glow.y = y;
    }
    const dist = Math.hypot(x - last.x, y - last.y);
    const dt = Math.max(now - last.t, 1);
    if (dist > SPACING || (dist > 6 && dt > 160)) {
      const speed = Math.min(dist / dt, 2.5); // px per ms
      add(x, y, 0.35 + speed * 0.3);
      last = { x, y, t: now };
    }
    start();
  };

  const onDown = (e: PointerEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    add(x, y, 1, true);
    add(x, y, 0.7, true, 140);
    add(x, y, 0.45, true, 300);
  };

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  const draw = (now: number) => {
    ctx.clearRect(0, 0, w, h);

    // cursor glow (fades out when the mouse rests)
    glow.x += (glow.tx - glow.x) * 0.12;
    glow.y += (glow.ty - glow.y) * 0.12;
    glow.a += (glow.ta - glow.a) * 0.06;
    glow.ta *= 0.985;
    if (glow.a > 0.01) {
      const R = 130;
      const g = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, R);
      g.addColorStop(0, `rgba(158, 230, 210, ${0.16 * glow.a})`);
      g.addColorStop(0.5, `rgba(43, 165, 140, ${0.05 * glow.a})`);
      g.addColorStop(1, 'rgba(43, 165, 140, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(glow.x - R, glow.y - R, R * 2, R * 2);
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      const age = now - r.born;
      if (age < 0) continue;
      const t = age / r.life;
      if (t >= 1) {
        ripples.splice(i, 1);
        continue;
      }
      const radius = 3 + ease(t) * r.maxR;
      const fade = Math.pow(1 - t, 1.5) * r.strength;
      const band = Math.max(radius * 0.32, 6);

      // soft water band: teal trough inside, light crest outside
      const inner = Math.max(radius - band, 0);
      const grad = ctx.createRadialGradient(r.x, r.y, inner, r.x, r.y, radius + 2);
      grad.addColorStop(0, 'rgba(19, 120, 106, 0)');
      grad.addColorStop(0.45, `rgba(19, 120, 106, ${0.16 * fade})`);
      grad.addColorStop(0.8, `rgba(255, 255, 255, ${0.2 * fade})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(r.x, r.y, radius + 2, 0, Math.PI * 2);
      ctx.arc(r.x, r.y, inner, 0, Math.PI * 2, true);
      ctx.fill();

      // thin bright crest line
      ctx.beginPath();
      ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * fade})`;
      ctx.lineWidth = 0.6 + 1.2 * (1 - t);
      ctx.stroke();

      // thin teal line just inside, so rings also read on light backgrounds
      ctx.beginPath();
      ctx.arc(r.x, r.y, Math.max(radius - 3, 0), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(19, 120, 106, ${(r.splash ? 0.45 : 0.4) * fade})`;
      ctx.lineWidth = 0.6 + 1.1 * (1 - t);
      ctx.stroke();
    }

    if (ripples.length === 0 && glow.a < 0.01) {
      running = false;
      ctx.clearRect(0, 0, w, h);
      return;
    }
    raf = requestAnimationFrame(draw);
  };

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(draw);
  }

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      running = false;
      ripples.length = 0;
      ctx.clearRect(0, 0, w, h);
    }
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
    },
  };
}
