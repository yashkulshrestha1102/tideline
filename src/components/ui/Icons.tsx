// Hand-tuned stroke icons used across the site.
type P = { size?: number; className?: string };

export function ArrowRight({ size = 18, className }: P) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDown({ size = 12, className }: P) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function PlayCircle({ size = 22, className }: P) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8.3v7.4l5.6-3.7z" />
    </svg>
  );
}

export function MenuIcon({ size = 24, open = false }: P & { open?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
    </svg>
  );
}

export function BarsIcon() {
  return (
    <svg width="26" height="24" viewBox="0 0 26 24" aria-hidden="true">
      <rect x="1" y="14" width="5" height="9" rx="1" fill="#2BA58C" />
      <rect x="9" y="9" width="5" height="14" rx="1" fill="#2BA58C" />
      <rect x="17" y="2" width="5" height="21" rx="1" fill="#2BA58C" />
    </svg>
  );
}

export function LogoMark({ light = false }: { light?: boolean }) {
  const c = light ? ['#9EE6D2', '#5FC9AF', '#2BA58C'] : ['#0B4E49', '#0E6B62', '#2C8F82'];
  return (
    <svg width="78" height="34" viewBox="0 0 78 34" fill="none" aria-hidden="true">
      <path d="M2 13 C 14 2, 26 2, 38 10 S 62 18, 76 8" stroke={c[0]} strokeWidth="3" strokeLinecap="round" />
      <path d="M2 21 C 14 10, 26 10, 38 18 S 62 26, 76 16" stroke={c[1]} strokeWidth="3" strokeLinecap="round" />
      <path d="M2 29 C 14 18, 26 18, 38 26 S 62 34, 76 24" stroke={c[2]} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Stats icons ---------- */
export function FoundersIcon() {
  return (
    <svg width="38" height="30" viewBox="0 0 38 30" fill="none" stroke="#14625A" strokeWidth={1.6}
      strokeLinecap="round" aria-hidden="true">
      <circle cx="19" cy="9" r="5" />
      <circle cx="8" cy="12" r="3.6" />
      <circle cx="30" cy="12" r="3.6" />
      <path d="M10 27c0-5 4-9 9-9s9 4 9 9" />
      <path d="M2 26c0-4 2.6-7 6-7 1.5 0 2.8.5 3.8 1.4M36 26c0-4-2.6-7-6-7-1.5 0-2.8.5-3.8 1.4" />
    </svg>
  );
}

export function HandshakeIcon() {
  return (
    <svg width="42" height="30" viewBox="0 0 42 30" fill="none" stroke="#14625A" strokeWidth={1.6}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 10l7-5 6 2 5-2 6 3" />
      <path d="M40 10l-7-5-5 1" />
      <path d="M9 5l-7 12 3 3M33 5l7 12-4 3" />
      <path d="M15 8l-4 5c1.5 1.5 3.5 1.5 5 0l3-2 9 8c1 1 0 3-1.5 2l-4-3M24 20c1 1 0 3-1.5 2l-3-2.5M20 23c1 1 0 2.6-1.4 2l-2.4-2M16 25c.8.9-.2 2.2-1.4 1.6L12 24.5M5 20l4.5 4" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#14625A" strokeWidth={1.3} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2c3 3 4.5 6.5 4.5 10S15 19 12 22M12 2C9 5 7.5 8.5 7.5 12S9 19 12 22M4 7h16M4 17h16" />
    </svg>
  );
}

/* ---------- Journey icons ---------- */
const jp = {
  fill: 'none',
  stroke: '#E9FFF7',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function BulbIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" strokeWidth={1.3} {...jp} aria-hidden="true">
      <path d="M9 18h6M10 21h4M12 6a5 5 0 0 0-3 9c.6.5 1 1.1 1 2h4c0-.9.4-1.5 1-2a5 5 0 0 0-3-9z" />
      <path d="M12 1.5v1.8M4.6 4.6l1.3 1.3M19.4 4.6l-1.3 1.3M2 11h1.8M20.2 11H22" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth={1.5} {...jp} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  );
}

export function PeopleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" strokeWidth={1.3} {...jp} aria-hidden="true">
      <circle cx="12" cy="7.5" r="3" />
      <circle cx="5.5" cy="9.5" r="2.2" />
      <circle cx="18.5" cy="9.5" r="2.2" />
      <path d="M6.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6" />
      <path d="M1.5 18.5c0-2.4 1.6-4.3 3.8-4.3M22.5 18.5c0-2.4-1.6-4.3-3.8-4.3" />
    </svg>
  );
}

export function GrowthIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth={1.5} {...jp} aria-hidden="true">
      <path d="M5 20v-4M9.5 20v-7M14 20v-5M18.5 20v-9" />
      <path d="M4 11l5-4 4 3 7-6" />
      <path d="M16 4h4v4" />
    </svg>
  );
}

/* ---------- Generic line icons (by name) ---------- */
const paths: Record<string, string> = {
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  chart: 'M3 20h18M6 16v-4M11 16V9M16 16v-6M20 5l-5 4-4-2-5 4',
  calc: 'M6 3h12v18H6zM9 7h6M9 11h1M12 11h1M15 11h0M9 15h1M12 15h1M15 15h0',
  drop: 'M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11zM12 14v4',
  leaf: 'M5 21c0-8 6-14 15-16-1 9-7 15-15 16zM5 21l7-7',
  spark: 'M12 3l2.2 5.6L20 10l-5.8 1.4L12 17l-2.2-5.6L4 10l5.8-1.4z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2c3 3 4.5 6.5 4.5 10S15 19 12 22M12 2C9 5 7.5 8.5 7.5 12S9 19 12 22',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c0-4 3-7 7-7s7 3 7 7M17 3.5a4 4 0 0 1 0 7.5M22 21c0-3-1.7-5.5-4-6.5',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  phone: 'M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z',
  pin: 'M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  chat: 'M4 5h16v11H9l-5 4z',
  video: 'M3 6h12v12H3zM15 10l6-3v10l-6-3',
  filter: 'M3 5h18l-7 8v6l-4 2v-8z',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c1-4 5-9 13-9 0 8-5 12-9 13zM15 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
  book: 'M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  check: 'M5 12l5 5 9-10',
  scale: 'M12 3v18M5 7h14M5 7l-3 7a4 4 0 0 0 6 0zM19 7l-3 7a4 4 0 0 0 6 0zM8 21h8',
  handshake: 'M2 9l5-4 5 2 5-2 5 4M7 5L2 13l3 3M17 5l5 8-3 3M9 9l-3 4c1.5 1.5 3 1.5 4.5 0L13 11l6 6c1 1-.5 2.5-1.5 1.5L14 15',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L21 21',
  linkedin: 'M4 9h4v11H4zM6 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 3.4 2 3.4 4.6V20h-4v-5.8c0-1.3 0-3-1.8-3S13 12.6 13 14V20h-3z',
  x: 'M4 4l16 16M20 4L4 20',
  instagram: 'M4 4h16v16H4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 7h.01',
  arrowUp: 'M12 20V5M6 11l6-6 6 6',
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24, stroke = 1.6, className }: {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const d = paths[name] ?? paths.spark;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
