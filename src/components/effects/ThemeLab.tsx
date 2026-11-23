'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  DEFAULT_STATE,
  ROLE_LABELS,
  accents,
  applyTheme,
  brandHues,
  decodeState,
  encodeState,
  looks,
  resolveColor,
  rgbToHex,
  type Roles,
  type SectionLook,
  type ThemeState,
} from '@/lib/theme';
import styles from './ThemeLab.module.css';

const KEY = 'rd-theme-lab-v2';
type Tab = 'looks' | 'colours' | 'sections';

// what each role currently looks like (for the pickers when untouched)
const ROLE_EXPR: Record<keyof Roles, string> = {
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  heading: 'var(--ink)',
  body: 'var(--muted)',
  primary: 'var(--teal)',
  deep: 'var(--deep)',
  onDeep: 'var(--on-deep)',
};

const prettyName = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Theme Lab (colour-testing copy only): change the page background, card
 * colour, text, buttons, dark sections and accent — globally or per
 * section — and share the exact look as a link.
 */
export default function ThemeLab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('looks');
  const [t, setT] = useState<ThemeState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const [sections, setSections] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [msg, setMsg] = useState('');
  const [, force] = useState(0);

  // first load: ?lab= link > saved > default
  useEffect(() => {
    let start = DEFAULT_STATE;
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) start = { ...DEFAULT_STATE, ...JSON.parse(saved) };
    } catch {
      /* ignore */
    }
    const lab = new URLSearchParams(window.location.search).get('lab');
    const fromLink = lab ? decodeState(lab) : null;
    if (fromLink) start = fromLink;
    setT(start);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyTheme(t);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(t));
    } catch {
      /* ignore */
    }
    force((n) => n + 1); // refresh picker values
  }, [t, ready]);

  // sections present on this page
  const scan = useCallback(() => {
    const names = Array.from(document.querySelectorAll('[data-section]'))
      .map((el) => el.getAttribute('data-section') || '')
      .filter((v, i, a) => v && a.indexOf(v) === i);
    setSections(names);
    setCurrent((c) => (names.includes(c) ? c : names[0] ?? ''));
  }, []);
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(scan, 600);
    return () => window.clearTimeout(id);
  }, [open, pathname, scan]);

  const setRole = (k: keyof Roles, v: string | undefined) =>
    setT((s) => {
      const roles = { ...s.roles };
      if (v === undefined) delete roles[k];
      else roles[k] = v;
      return { ...s, roles };
    });

  const setSection = (name: string, k: keyof SectionLook, v: string | undefined) =>
    setT((s) => {
      const cur = { ...(s.sections[name] ?? {}) };
      if (v === undefined) delete cur[k];
      else cur[k] = v;
      const next = { ...s.sections };
      if (Object.keys(cur).length) next[name] = cur;
      else delete next[name];
      return { ...s, sections: next };
    });

  const flash = (name: string) => {
    const el = document.querySelector(`[data-section="${name}"]`);
    if (!(el instanceof HTMLElement)) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.style.outline = '3px dashed #F4715D';
    el.style.outlineOffset = '-6px';
    window.setTimeout(() => {
      el.style.outline = '';
      el.style.outlineOffset = '';
    }, 1600);
  };

  const sectionValue = (name: string, k: keyof SectionLook) => {
    const v = t.sections[name]?.[k];
    if (v) return v;
    const el = typeof document !== 'undefined' ? document.querySelector(`[data-section="${name}"]`) : null;
    if (!el) return '#ffffff';
    if (k === 'text') return rgbToHex(getComputedStyle(el).color);
    if (k === 'card') return resolveColor('var(--surface)', 'backgroundColor', el);
    const bg = getComputedStyle(el).backgroundColor;
    return bg && !bg.includes('rgba(0, 0, 0, 0)') ? rgbToHex(bg) : resolveColor('var(--bg)', 'backgroundColor', el);
  };

  const copy = async (what: 'link' | 'values') => {
    const link = `${window.location.origin}${window.location.pathname}?lab=${encodeState(t)}`;
    const values = JSON.stringify(t, null, 2);
    try {
      await navigator.clipboard.writeText(what === 'link' ? link : values);
      setMsg(what === 'link' ? 'Link copied — open it on any laptop to see this exact look.' : 'Values copied — send them to the developer.');
    } catch {
      setMsg(what === 'link' ? link : values);
    }
    window.setTimeout(() => setMsg(''), 4000);
  };

  const roleValue = (k: keyof Roles) =>
    t.roles[k] ?? (typeof document !== 'undefined' ? resolveColor(ROLE_EXPR[k]) : '#000000');

  return (
    <div className={styles.root} data-cursor-compact>
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
              <span>Change any colour, globally or per section</span>
            </div>

            <div className={styles.tabs} role="tablist">
              {(['looks', 'colours', 'sections'] as Tab[]).map((x) => (
                <button
                  key={x}
                  type="button"
                  role="tab"
                  aria-selected={tab === x}
                  className={tab === x ? styles.tabOn : ''}
                  onClick={() => setTab(x)}
                >
                  {x === 'looks' ? 'Looks' : x === 'colours' ? 'Colours' : 'Sections'}
                </button>
              ))}
            </div>

            {/* ---------------- LOOKS ---------------- */}
            {tab === 'looks' && (
              <>
                <div className={styles.label}>Full looks</div>
                <div className={styles.grid}>
                  {looks.map((l) => {
                    const r = l.state.roles ?? {};
                    return (
                      <button
                        key={l.id}
                        type="button"
                        className={styles.card}
                        onClick={() => setT((s) => ({ ...s, ...l.state, roles: { ...(l.state.roles ?? {}) } }))}
                      >
                        <span className={styles.look} style={{ background: r.bg ?? '#ffffff', color: r.heading ?? '#082E2B' }}>
                          <i style={{ background: r.primary ?? '#03524D' }} />
                          <i style={{ background: r.deep ?? '#013432' }} />
                          <em>Aa</em>
                        </span>
                        {l.name}
                      </button>
                    );
                  })}
                </div>

                <div className={styles.label}>Brand colour only</div>
                <div className={styles.grid}>
                  {brandHues.map((x) => (
                    <button
                      key={x.id}
                      type="button"
                      className={`${styles.card} ${t.th === x.th && t.ts === x.ts ? styles.cardOn : ''}`}
                      onClick={() => setT((s) => ({ ...s, th: x.th, ts: x.ts }))}
                      style={{ '--th': `${x.th}deg`, '--ts': x.ts } as React.CSSProperties}
                    >
                      <span className={styles.swatch} aria-hidden="true">
                        <i className={styles.sw1} />
                        <i className={styles.sw2} />
                        <i className={styles.sw3} />
                      </span>
                      {x.name}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ---------------- COLOURS ---------------- */}
            {tab === 'colours' && (
              <>
                <div className={styles.label}>Whole website</div>
                {ROLE_LABELS.map((r) => (
                  <div key={r.key} className={styles.role}>
                    <label className={styles.colour}>
                      <input
                        type="color"
                        value={roleValue(r.key)}
                        onChange={(e) => setRole(r.key, e.target.value.toUpperCase())}
                      />
                      <span style={{ background: roleValue(r.key) }} />
                    </label>
                    <span className={styles.roleText}>
                      <b>{r.label}</b>
                      <small>{t.roles[r.key] ? t.roles[r.key] : r.hint}</small>
                    </span>
                    {t.roles[r.key] && (
                      <button type="button" className={styles.undo} onClick={() => setRole(r.key, undefined)} aria-label={`Reset ${r.label}`}>
                        ↺
                      </button>
                    )}
                  </div>
                ))}

                <div className={styles.label}>Brand shades (glows, tints, icons)</div>
                <label className={styles.slider}>
                  <span>Colour (hue) <b>{t.th}°</b></span>
                  <input type="range" min={-180} max={180} step={2} value={t.th} className={styles.hue}
                    onChange={(e) => setT((s) => ({ ...s, th: Number(e.target.value) }))} />
                </label>
                <label className={styles.slider}>
                  <span>Richness <b>{Math.round(t.ts * 100)}%</b></span>
                  <input type="range" min={0} max={1.5} step={0.05} value={t.ts}
                    onChange={(e) => setT((s) => ({ ...s, ts: Number(e.target.value) }))} />
                </label>

                <div className={styles.label}>Accent dot</div>
                <div className={styles.accents}>
                  {accents.map((a) => (
                    <button key={a} type="button" aria-label={`Accent ${a}`}
                      className={`${styles.accent} ${t.accent.toLowerCase() === a.toLowerCase() ? styles.accentOn : ''}`}
                      style={{ background: a }} onClick={() => setT((s) => ({ ...s, accent: a }))} />
                  ))}
                  <label className={styles.picker} aria-label="Any accent colour">
                    <input type="color" value={t.accent} onChange={(e) => setT((s) => ({ ...s, accent: e.target.value }))} />+
                  </label>
                </div>
              </>
            )}

            {/* ---------------- SECTIONS ---------------- */}
            {tab === 'sections' && (
              <>
                <div className={styles.label}>Sections on this page</div>
                <div className={styles.sectionList}>
                  {sections.map((name) => (
                    <button
                      key={name}
                      type="button"
                      className={`${styles.sectionBtn} ${current === name ? styles.sectionOn : ''}`}
                      onClick={() => {
                        setCurrent(name);
                        flash(name);
                      }}
                    >
                      {prettyName(name)}
                      {t.sections[name] && <i className={styles.dotChanged} aria-label="changed" />}
                    </button>
                  ))}
                  {!sections.length && <p className={styles.note}>Scroll the page a little, then reopen.</p>}
                </div>

                {current && (
                  <div className={styles.sectionEdit}>
                    <div className={styles.label}>{prettyName(current)}</div>
                    {(
                      [
                        ['bg', 'Background'],
                        ['text', 'Text'],
                        ['card', 'Cards inside'],
                      ] as [keyof SectionLook, string][]
                    ).map(([k, label]) => (
                      <div key={k} className={styles.role}>
                        <label className={styles.colour}>
                          <input type="color" value={sectionValue(current, k)}
                            onChange={(e) => setSection(current, k, e.target.value.toUpperCase())} />
                          <span style={{ background: sectionValue(current, k) }} />
                        </label>
                        <span className={styles.roleText}>
                          <b>{label}</b>
                          <small>{t.sections[current]?.[k] ?? 'Default'}</small>
                        </span>
                        {t.sections[current]?.[k] && (
                          <button type="button" className={styles.undo} onClick={() => setSection(current, k, undefined)} aria-label={`Reset ${label}`}>
                            ↺
                          </button>
                        )}
                      </div>
                    ))}
                    <div className={styles.quick}>
                      <button type="button" onClick={() => setT((s) => ({ ...s, sections: { ...s.sections, [current]: { bg: '#0B0F0E', text: '#F2F6F5', card: '#141B1A' } } }))}>Make dark</button>
                      <button type="button" onClick={() => setT((s) => ({ ...s, sections: { ...s.sections, [current]: { bg: '#FFFFFF', text: '#0B2F2C', card: '#FFFFFF' } } }))}>Make light</button>
                      <button type="button" onClick={() => setT((s) => { const n = { ...s.sections }; delete n[current]; return { ...s, sections: n }; })}>Reset section</button>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className={styles.actions}>
              <button type="button" onClick={() => copy('link')}>Copy link</button>
              <button type="button" onClick={() => copy('values')}>Copy values</button>
              <button type="button" onClick={() => setT(DEFAULT_STATE)}>Reset all</button>
            </div>
            {msg && <p className={styles.copied}>{msg}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <button type="button" className={styles.fab} aria-expanded={open}
        aria-label={open ? 'Close Theme Lab' : 'Open Theme Lab'} onClick={() => setOpen((v) => !v)}>
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
