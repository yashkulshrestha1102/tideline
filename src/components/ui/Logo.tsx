// Raisedesk logo: a sea-green tile with a "desk" line and a curve that
// rises off it (raising capital), ending in a coral dot — the same dot
// that closes the hero headline.

type MarkProps = { size?: number; light?: boolean; id?: string };

export function LogoMark({ size = 40, light = false, id = 'rd' }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(calc(var(--th, 0deg) + 172.3deg) calc(74.5% * var(--ts, 1)) 30.8%)" />
          <stop offset="1" stopColor="hsl(calc(var(--th, 0deg) + 176.2deg) calc(92.9% * var(--ts, 1)) 16.7%)" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill={`url(#${id}-bg)`} />
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="11.25"
        stroke={light ? 'hsl(calc(var(--th, 0deg) + 163.3deg) calc(59.0% * var(--ts, 1)) 76.1% / 0.45)' : 'rgba(255,255,255,0.18)'}
        strokeWidth="1.5"
      />
      {/* the desk */}
      <path d="M10 29.5H30" stroke="rgba(255,255,255,0.55)" strokeWidth="2.4" strokeLinecap="round" />
      {/* the raise */}
      <path d="M10 25C16 25 18.5 13.5 27 11.6" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="28.6" cy="11.3" r="3" fill="var(--accent, #F4715D)" />
    </svg>
  );
}

export default function Logo({ light = false, size = 40, id }: MarkProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <LogoMark size={size} light={light} id={id} />
      <span
        style={{
          fontFamily: 'var(--f-display)',
          fontSize: size * 0.78,
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: light ? 'hsl(calc(var(--th, 0deg) + 155.0deg) calc(40.0% * var(--ts, 1)) 94.1%)' : 'hsl(calc(var(--th, 0deg) + 175.3deg) calc(70.4% * var(--ts, 1)) 10.6%)',
        }}
      >
        Raise
        <em style={{ fontStyle: 'italic', color: light ? 'hsl(calc(var(--th, 0deg) + 163.3deg) calc(59.0% * var(--ts, 1)) 76.1%)' : 'hsl(calc(var(--th, 0deg) + 171.7deg) calc(72.7% * var(--ts, 1)) 27.3%)' }}>desk</em>
      </span>
    </span>
  );
}
