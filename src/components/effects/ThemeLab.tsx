'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { accents, applyTheme, themes } from '@/lib/theme';
import styles from './ThemeLab.module.css';

const KEY = 'rd-theme-lab';
type State = { th: number; ts: number; accent: string };
const DEFAULT: State = { th: 0, ts: 1, accent: '#F4715D' };

/**
 * Floating colour panel (bottom-right) for trying colour combinations live.
 * Choices are remembered, and "Copy link" makes a URL that opens the site
 * in exactly this theme (?th=26&ts=1&ac=F4715D) — handy for sharing.
 */
export default function ThemeLab() {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState<State>(DEFAULT);
  const [copied, setCopied] = useState('');

  // first load: URL params > saved choice > default
  useEffect(() => {
    let start = DEFAULT;
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) start = { ...DEFAULT, ...JSON.parse(saved) };
    } catch {
      /* ignore */
    }
    const q = new URLSearchParams(window.location.search);
    const preset = themes.find((x) => x.id === q.get('theme'));
    if (preset) start = { th: preset.th, ts: preset.ts, accent: preset.accent };
    if (q.has('th')) start = { ...start, th: Number(q.get('th')) || 0 };
    if (q.has('ts')) start = { ...start, ts: Number(q.get('ts')) };
    if (q.has('ac')) start = { ...start, accent: `#${q.get('ac')}` };
    setT(start);
  }, []);

  useEffect(() => {
    applyTheme(t);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(t));
    } catch {
      /* ignore */
    }
  }, [t]);

  const active = themes.find((x) => x.th === t.th && x.ts === t.ts);

  const copy = async (what: 'link' | 'values') => {
    const link = `${window.location.origin}${window.location.pathname}?th=${t.th}&ts=${t.ts}&ac=${t.accent.replace('#', '')}`;
    const values = `Hue shift: ${t.th}°  ·  Saturation: ${t.ts}  ·  Accent: ${t.accent}`;
    try {
      await navigator.clipboard.writeText(what === 'link' ? link : values);
      setCopied(what === 'link' ? 'Link copied' : 'Values copied');
    } catch {
      setCopied(what === 'link' ? link : values);
    }
    window.setTimeout(() => setCopied(''), 2500);
  };

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            data-lenis-prevent
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.head}>
              <b>Theme Lab</b>
              <span>Try colour combinations live</span>
            </div>

            <div className={styles.label}>Presets</div>
            <div className={styles.presets}>
              {themes.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  className={`${styles.preset} ${active?.id === x.id ? styles.presetOn : ''}`}
                  onClick={() => setT({ th: x.th, ts: x.ts, accent: x.accent })}
                  style={{ '--th': `${x.th}deg`, '--ts': x.ts } as React.CSSProperties}
                >
                  <span className={styles.swatch} aria-hidden="true">
                    <i className={styles.sw1} />
                    <i className={styles.sw2} />
                    <i className={styles.sw3} />
                    <i style={{ background: x.accent }} />
                  </span>
                  {x.name}
                </button>
              ))}
            </div>

            <div className={styles.label}>
              Fine-tune <em>{active ? active.name : 'Custom'}</em>
            </div>
            <label className={styles.slider}>
              <span>Colour (hue) <b>{t.th}°</b></span>
              <input
                type="range"
                min={-180}
                max={180}
                step={2}
                value={t.th}
                onChange={(e) => setT((s) => ({ ...s, th: Number(e.target.value) }))}
                className={styles.hue}
              />
            </label>
            <label className={styles.slider}>
              <span>Richness (saturation) <b>{Math.round(t.ts * 100)}%</b></span>
              <input
                type="range"
                min={0}
                max={1.5}
                step={0.05}
                value={t.ts}
                onChange={(e) => setT((s) => ({ ...s, ts: Number(e.target.value) }))}
              />
            </label>

            <div className={styles.label}>Accent dot</div>
            <div className={styles.accents}>
              {accents.map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-label={`Accent ${a}`}
                  className={`${styles.accent} ${t.accent.toLowerCase() === a.toLowerCase() ? styles.accentOn : ''}`}
                  style={{ background: a }}
                  onClick={() => setT((s) => ({ ...s, accent: a }))}
                />
              ))}
              <label className={styles.picker} aria-label="Pick any accent colour">
                <input type="color" value={t.accent} onChange={(e) => setT((s) => ({ ...s, accent: e.target.value }))} />
                +
              </label>
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={() => copy('link')}>Copy link</button>
              <button type="button" onClick={() => copy('values')}>Copy values</button>
              <button type="button" onClick={() => setT(DEFAULT)}>Reset</button>
            </div>
            {copied && <p className={styles.copied}>{copied}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={styles.fab}
        aria-expanded={open}
        aria-label={open ? 'Close Theme Lab' : 'Open Theme Lab'}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.2-9-7.2z" />
          <circle cx="7.5" cy="11" r="1" fill="currentColor" />
          <circle cx="10" cy="7" r="1" fill="currentColor" />
          <circle cx="14.5" cy="7" r="1" fill="currentColor" />
        </svg>
        {open ? 'Close' : 'Theme Lab'}
      </button>
    </div>
  );
}
