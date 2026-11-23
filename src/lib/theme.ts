// ------------------------------------------------------------
// Theme Lab engine — every colour on the site is a CSS variable
// ("role"). This file turns a theme state into those variables,
// per-section overrides and artwork swaps.
// ------------------------------------------------------------

export type Roles = {
  bg?: string; // page background
  surface?: string; // cards, panels, inputs
  heading?: string; // headings & strong text
  body?: string; // paragraph text
  primary?: string; // buttons, links, icons
  deep?: string; // dark sections (journey, toolkit, footer, CTA)
  onDeep?: string; // text on dark sections
};
export type SectionLook = { bg?: string; text?: string; card?: string };
export type ThemeState = {
  th: number; // brand hue shift (deg) for all remaining brand shades
  ts: number; // brand saturation multiplier
  accent: string;
  roles: Roles;
  sections: Record<string, SectionLook>;
};

export const DEFAULT_STATE: ThemeState = { th: 0, ts: 1, accent: '#F4715D', roles: {}, sections: {} };

export const ROLE_LABELS: { key: keyof Roles; label: string; hint: string }[] = [
  { key: 'bg', label: 'Page background', hint: 'Main background of every page' },
  { key: 'surface', label: 'Cards & panels', hint: 'Cards, menus, inputs' },
  { key: 'heading', label: 'Heading text', hint: 'Titles and strong text' },
  { key: 'body', label: 'Body text', hint: 'Paragraphs and small text' },
  { key: 'primary', label: 'Buttons & links', hint: 'Primary buttons, icons, links' },
  { key: 'deep', label: 'Dark sections', hint: 'Journey, toolkit, CTA, footer' },
  { key: 'onDeep', label: 'Text on dark sections', hint: 'Text inside dark sections' },
];

/* ---------- full looks (change everything) ---------- */
export const looks: { id: string; name: string; state: Partial<ThemeState> }[] = [
  { id: 'original', name: 'Original', state: { th: 0, ts: 1, accent: '#F4715D', roles: {} } },
  {
    id: 'dark',
    name: 'Dark mode',
    state: {
      th: 0, ts: 1, accent: '#F4715D',
      roles: { bg: '#0B0F0E', surface: '#141B1A', heading: '#F2F6F5', body: '#B7C4C0', primary: '#2BA58C', deep: '#050807', onDeep: '#EAF6F1' },
    },
  },
  {
    id: 'midnight',
    name: 'Midnight navy',
    state: {
      th: 40, ts: 0.9, accent: '#F2B880',
      roles: { bg: '#0A1120', surface: '#121B2F', heading: '#EEF2FF', body: '#A9B4CC', primary: '#4C7DFF', deep: '#060A14', onDeep: '#E6EBFF' },
    },
  },
  {
    id: 'mono',
    name: 'Black & white',
    state: {
      th: 0, ts: 0, accent: '#F4715D',
      roles: { bg: '#FFFFFF', surface: '#FFFFFF', heading: '#0A0A0A', body: '#4A4A4A', primary: '#111111', deep: '#0A0A0A', onDeep: '#FFFFFF' },
    },
  },
  { id: 'grey', name: 'Soft grey', state: { th: 0, ts: 1, accent: '#F4715D', roles: { bg: '#F3F5F5', surface: '#FFFFFF' } } },
  { id: 'ivory', name: 'Warm ivory', state: { th: 0, ts: 1, accent: '#F4715D', roles: { bg: '#FBF6EC', surface: '#FFFFFF' } } },
];

/* ---------- brand colour only (keeps backgrounds & text) ---------- */
export const brandHues = [
  { id: 'sea', name: 'Sea green', th: 0, ts: 1 },
  { id: 'emerald', name: 'Emerald', th: -24, ts: 1 },
  { id: 'ocean', name: 'Ocean blue', th: 26, ts: 1 },
  { id: 'navy', name: 'Royal navy', th: 44, ts: 0.85 },
  { id: 'indigo', name: 'Indigo', th: 66, ts: 0.85 },
  { id: 'plum', name: 'Plum', th: 112, ts: 0.7 },
  { id: 'wine', name: 'Burgundy', th: 165, ts: 0.75 },
  { id: 'olive', name: 'Forest olive', th: -62, ts: 0.75 },
  { id: 'gold', name: 'Bronze gold', th: -132, ts: 0.85 },
  { id: 'graphite', name: 'Graphite', th: 0, ts: 0.12 },
];

export const accents = ['#F4715D', '#F4B45D', '#E9B44C', '#FF8A65', '#4FB3FF', '#A3D65C', '#FF7AA8', '#1F8A70', '#FFFFFF', '#111111'];

export const THEME_EVENT = 'rd-theme-change';

/* ---------- helpers ---------- */
const mix = (a: string, pct: number, b: string) => `color-mix(in srgb, ${a} ${pct}%, ${b})`;

export function luminance(hex: string) {
  const m = hex.replace('#', '');
  if (m.length < 6) return 1;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const isWhite = (hex?: string) => !hex || hex.toLowerCase() === '#ffffff';

/** CSS variable values for a set of role colours. */
function roleVars(r: Roles, bgFallback = 'var(--bg)'): Record<string, string> {
  const v: Record<string, string> = {};
  const bg = r.bg ?? bgFallback;
  if (r.bg) Object.assign(v, { '--bg': r.bg });
  if (r.surface) {
    Object.assign(v, {
      '--surface': r.surface,
      '--tint': mix('var(--teal)', 16, r.surface),
      '--tint-2': mix('var(--teal)', 8, r.surface),
      '--tint-3': mix('var(--teal)', 10, r.surface),
      '--tint-4': mix('var(--ink-2)', 4, r.surface),
      '--tint-5': mix('var(--ink-2)', 14, r.surface),
      '--tint-6': mix('var(--ink-2)', 12, r.surface),
    });
  }
  if (r.heading) Object.assign(v, { '--ink': r.heading, '--ink-2': r.heading, '--ink-3': r.heading });
  if (r.body) {
    Object.assign(v, {
      '--muted': r.body,
      '--subtle': mix(r.body, 82, bg),
      '--subtle-2': mix(r.body, 90, bg),
      '--subtle-3': mix(r.body, 66, bg),
      '--subtle-4': mix(r.body, 56, bg),
    });
  }
  if (r.primary) {
    Object.assign(v, {
      '--teal': r.primary,
      '--teal-dark': mix(r.primary, 80, '#000000'),
      '--teal-icon': r.primary,
      '--mint': mix(r.primary, 72, '#ffffff'),
    });
  }
  if (r.deep) {
    Object.assign(v, {
      '--deep': r.deep,
      '--deep-2': mix(r.deep, 90, '#ffffff'),
      '--deep-3': r.deep,
      '--deep-4': mix(r.deep, 78, '#000000'),
      '--deep-5': mix(r.deep, 84, '#ffffff'),
      '--deep-6': r.deep,
    });
  }
  if (r.onDeep) {
    const d = r.deep ?? 'var(--deep)';
    Object.assign(v, {
      '--on-deep': r.onDeep,
      '--on-deep-2': r.onDeep,
      '--on-deep-3': r.onDeep,
      '--odm': mix(r.onDeep, 76, d),
      '--odm-2': mix(r.onDeep, 70, d),
      '--odm-3': mix(r.onDeep, 88, d),
      '--odm-4': mix(r.onDeep, 66, d),
      '--odm-5': mix(r.onDeep, 86, d),
      '--odm-6': mix(r.onDeep, 90, d),
      '--odm-7': mix(r.onDeep, 50, d),
    });
  }
  return v;
}
const ALL_ROLE_VARS = Object.keys(
  roleVars({ bg: '#000', surface: '#000', heading: '#000', body: '#000', primary: '#000', deep: '#000', onDeep: '#000' }),
);

const artMode = (bg?: string) => (isWhite(bg) ? '' : luminance(bg as string) < 0.45 ? 'dark' : 'light');

/** Apply the whole theme to the page. */
export function applyTheme(t: ThemeState) {
  const root = document.documentElement;
  root.style.setProperty('--th', `${t.th}deg`);
  root.style.setProperty('--ts', String(t.ts));
  root.style.setProperty('--accent', t.accent);

  const vars = roleVars(t.roles);
  ALL_ROLE_VARS.forEach((k) => (k in vars ? root.style.setProperty(k, vars[k]) : root.style.removeProperty(k)));

  const art = artMode(t.roles.bg);
  root.classList.toggle('rd-art-light', art === 'light');
  root.classList.toggle('rd-art-dark', art === 'dark');

  // per-section overrides → one <style> tag
  let css = '';
  Object.entries(t.sections).forEach(([name, s]) => {
    if (!s.bg && !s.text && !s.card) return;
    const sel = `[data-section="${name}"]`;
    const r: Roles = {};
    if (s.bg) Object.assign(r, { bg: s.bg, deep: s.bg });
    if (s.text) Object.assign(r, { heading: s.text, body: mix(s.text, 82, s.bg ?? 'var(--bg)'), onDeep: s.text });
    if (s.card) r.surface = s.card;
    const v = roleVars(r, s.bg ?? 'var(--bg)');
    if (s.bg) v['--cream-2'] = s.bg;
    const decl = Object.entries(v).map(([k, val]) => `${k}:${val};`).join('');
    css += `${sel}{${decl}${s.bg ? `background:${s.bg} !important;` : ''}${s.text ? `color:${s.text};` : ''}}`;
    if (s.bg) {
      const mode = artMode(s.bg);
      if (mode) {
        const suffix = mode === 'dark' ? 'dark' : 'clear';
        css += `${sel} img[src*="hero-ribbons"]{content:url('/images/hero-ribbons-${suffix}.webp')}`;
        // the stats strip can be the section itself or sit inside it (e.g. inside the hero)
        css += `${sel}[data-section="stats"]::before,${sel}[data-section="numbers"]::before,${sel} [data-section="stats"]::before,${sel} [data-section="numbers"]::before{background-image:url('/images/stats-strip-${suffix}.webp')}`;
        css += `${sel} [data-section="stats"],${sel} [data-section="numbers"]{background:${s.bg} !important}`;
      }
    }
  });
  let tag = document.getElementById('rd-theme-sections');
  if (!tag) {
    tag = document.createElement('style');
    tag.id = 'rd-theme-sections';
    document.head.appendChild(tag);
  }
  tag.textContent = css;

  window.dispatchEvent(new Event(THEME_EVENT));
}

/** Current colour of a CSS expression as #rrggbb (for colour pickers). */
export function resolveColor(expr: string, prop: 'color' | 'backgroundColor' = 'color', scope?: Element | null) {
  const el = document.createElement('span');
  el.style[prop] = expr;
  (scope ?? document.body).appendChild(el);
  const c = getComputedStyle(el)[prop];
  el.remove();
  return rgbToHex(c);
}
export function rgbToHex(c: string) {
  const m = c.match(/[\d.]+/g);
  if (!m || m.length < 3) return '#000000';
  return `#${m.slice(0, 3).map((x) => Math.round(Number(x)).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function readVars() {
  if (typeof window === 'undefined') return { th: 0, ts: 1 };
  const cs = getComputedStyle(document.documentElement);
  const th = parseFloat(cs.getPropertyValue('--th')) || 0;
  const tsRaw = parseFloat(cs.getPropertyValue('--ts'));
  return { th, ts: Number.isNaN(tsRaw) ? 1 : tsRaw };
}

/** Recolour an RGB brand colour with the active hue/saturation (for canvas / WebGL). */
export function themed(r: number, g: number, b: number): [number, number, number] {
  const { th, ts } = readVars();
  if (!th && ts === 1) return [r, g, b];
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
  h = (((h + th) % 360) + 360) % 360;
  const s2 = Math.min(1, s * ts);
  const c = (1 - Math.abs(2 * l - 1)) * s2;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r1, g1, b1] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)];
}

/* ---------- share links ---------- */
export function encodeState(t: ThemeState) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodeState(s: string): ThemeState | null {
  try {
    const b = s.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(b + '==='.slice((b.length + 3) % 4))));
    return { ...DEFAULT_STATE, ...JSON.parse(json) };
  } catch {
    return null;
  }
}
