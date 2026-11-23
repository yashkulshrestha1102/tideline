// ------------------------------------------------------------
// Theme Lab — colour presets for trying combinations live.
// Every sea-green shade on the site is written as
//   hsl(calc(var(--th) + <hue>deg) calc(<sat>% * var(--ts)) <light>%)
// so changing --th (hue shift) and --ts (saturation) recolours the
// whole site at once while keeping every light/dark relationship.
// --accent is the coral dot / highlight colour.
// ------------------------------------------------------------

export type Theme = { id: string; name: string; th: number; ts: number; accent: string };

export const themes: Theme[] = [
  { id: 'sea', name: 'Sea Green (current)', th: 0, ts: 1, accent: '#F4715D' },
  { id: 'emerald', name: 'Emerald', th: -24, ts: 1, accent: '#F4B45D' },
  { id: 'ocean', name: 'Ocean Blue', th: 26, ts: 1, accent: '#F4715D' },
  { id: 'navy', name: 'Royal Navy', th: 44, ts: 0.85, accent: '#E9B44C' },
  { id: 'indigo', name: 'Indigo', th: 66, ts: 0.85, accent: '#FF8A65' },
  { id: 'plum', name: 'Plum', th: 112, ts: 0.7, accent: '#F2B880' },
  { id: 'wine', name: 'Burgundy', th: 165, ts: 0.75, accent: '#E8C07A' },
  { id: 'olive', name: 'Forest Olive', th: -62, ts: 0.75, accent: '#E07A5F' },
  { id: 'gold', name: 'Bronze Gold', th: -132, ts: 0.85, accent: '#1F8A70' },
  { id: 'graphite', name: 'Graphite', th: 0, ts: 0.12, accent: '#F4715D' },
];

export const accents = ['#F4715D', '#F4B45D', '#E9B44C', '#FF8A65', '#4FB3FF', '#A3D65C', '#FF7AA8', '#1F8A70'];

export const THEME_EVENT = 'rd-theme-change';

/** Apply a theme to the page (CSS variables) and tell canvas/WebGL effects. */
export function applyTheme(t: { th: number; ts: number; accent: string }) {
  const root = document.documentElement;
  root.style.setProperty('--th', `${t.th}deg`);
  root.style.setProperty('--ts', String(t.ts));
  root.style.setProperty('--accent', t.accent);
  window.dispatchEvent(new Event(THEME_EVENT));
}

function readVars() {
  if (typeof window === 'undefined') return { th: 0, ts: 1 };
  const cs = getComputedStyle(document.documentElement);
  const th = parseFloat(cs.getPropertyValue('--th')) || 0;
  const tsRaw = parseFloat(cs.getPropertyValue('--ts'));
  return { th, ts: Number.isNaN(tsRaw) ? 1 : tsRaw };
}

/** Recolour an RGB brand colour with the active theme (for canvas / WebGL). */
export function themed(r: number, g: number, b: number): [number, number, number] {
  const { th, ts } = readVars();
  if (!th && ts === 1) return [r, g, b];
  // rgb -> hsl
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
  }
  // shift
  h = (((h + th) % 360) + 360) % 360;
  const s2 = Math.min(1, s * ts);
  // hsl -> rgb
  const c = (1 - Math.abs(2 * l - 1)) * s2;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r1, g1, b1] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)];
}
