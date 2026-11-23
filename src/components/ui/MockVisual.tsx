'use client';

import { motion } from 'framer-motion';
import { Icon } from './Icons';
import styles from './MockVisual.module.css';

export type MockKind = 'pitch' | 'data' | 'chart' | 'deals' | 'thesis' | 'shield' | 'profile' | 'score';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const vp = { once: true, margin: '-60px' } as const;

/** Illustrative product UI used beside feature copy. Labelled as sample data. */
export default function MockVisual({ kind }: { kind: MockKind }) {
  return (
    <div className={styles.stage}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.window}>
        <div className={styles.bar} aria-hidden="true">
          <span /><span /><span />
          <em>{titles[kind]}</em>
        </div>
        <div className={styles.body}>{render(kind)}</div>
      </div>
    </div>
  );
}

const titles: Record<MockKind, string> = {
  pitch: 'Pitch room · Live',
  data: 'Data room',
  chart: 'Runway & growth',
  deals: 'Deal flow · Today',
  thesis: 'Investment thesis',
  shield: 'Security centre',
  profile: 'Founder profile',
  score: 'Match breakdown',
};

function render(kind: MockKind) {
  switch (kind) {
    case 'pitch':
      return (
        <div className={styles.pitch}>
          <div className={styles.screen}>
            <div className={styles.slideTitle}>Series Seed · Slide 6 of 14</div>
            <svg viewBox="0 0 300 110" className={styles.slideChart} aria-hidden="true">
              <motion.path
                d="M0 100 C 60 95, 100 80, 150 60 S 240 20, 300 10"
                fill="none"
                stroke="#9ee6d2"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={vp}
                transition={{ duration: 2, ease }}
              />
            </svg>
            <span className={styles.live}><i /> Live · 4 viewers</span>
          </div>
          <div className={styles.qa}>
            {['What is your CAC payback?', 'How big is the pilot pipeline?'].map((q, i) => (
              <motion.div
                key={q}
                className={styles.bubble}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.4, ease }}
              >
                <Icon name="chat" size={14} /> {q}
              </motion.div>
            ))}
          </div>
        </div>
      );
    case 'data':
      return (
        <div className={styles.list}>
          {[
            ['Financial model FY26.xlsx', 'Viewed 3×', 100],
            ['Cap table.pdf', 'Viewed 2×', 100],
            ['Customer contracts', 'In review', 70],
            ['IP assignments', 'Requested', 35],
          ].map(([name, meta, pct], i) => (
            <motion.div
              key={name as string}
              className={styles.row}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease }}
            >
              <span className={styles.rowIcon}><Icon name={i < 2 ? 'lock' : 'doc'} size={16} /></span>
              <span className={styles.rowMain}>
                <b>{name}</b>
                <small>{meta}</small>
              </span>
              <span className={styles.mini}>
                <motion.i
                  style={{ width: `${pct}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={vp}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.12, ease }}
                />
              </span>
            </motion.div>
          ))}
        </div>
      );
    case 'chart':
      return (
        <div>
          <div className={styles.kpis}>
            {[['Runway', '19 mo'], ['Burn', '$62K/mo'], ['MRR growth', '+14%']].map(([k, v]) => (
              <div key={k} className={styles.kpi}><small>{k}</small><b>{v}</b></div>
            ))}
          </div>
          <svg viewBox="0 0 320 140" className={styles.chart} aria-hidden="true">
            {[30, 60, 90, 120].map((y) => (
              <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="color-mix(in srgb, var(--ink-2) 7%, transparent)" />
            ))}
            <motion.path
              d="M0 130 C 50 120, 90 110, 130 92 S 220 50, 320 18"
              fill="none" stroke="#2BA58C" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={vp}
              transition={{ duration: 2, ease }}
            />
            <motion.path
              d="M0 130 C 60 126, 110 118, 160 108 S 250 84, 320 70"
              fill="none" stroke="#66BEAC" strokeWidth="2.5" strokeDasharray="6 6"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={vp}
              transition={{ duration: 2, delay: 0.3, ease }}
            />
          </svg>
        </div>
      );
    case 'deals':
      return (
        <div className={styles.list}>
          {[
            ['Solaris Grid', 'Climate · Seed', 94],
            ['Ledgerly', 'Fintech · Pre-A', 89],
            ['Kinship Health', 'Healthtech · Seed', 86],
            ['Farmloop', 'Agritech · Pre-seed', 81],
          ].map(([name, meta, fit], i) => (
            <motion.div
              key={name as string}
              className={styles.row}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease }}
            >
              <span className={styles.avatar}>{(name as string)[0]}</span>
              <span className={styles.rowMain}>
                <b>{name}</b>
                <small>{meta}</small>
              </span>
              <span className={styles.fit}>{fit}% fit</span>
            </motion.div>
          ))}
        </div>
      );
    case 'thesis':
      return (
        <div>
          {[
            ['Stage', ['Pre-seed', 'Seed', 'Series A']],
            ['Sectors', ['Climate', 'Fintech', 'SaaS', 'Health']],
            ['Ticket size', ['$100K–$500K', '$500K–$2M']],
            ['Geography', ['India', 'SE Asia', 'Middle East']],
          ].map(([label, chips], gi) => (
            <div key={label as string} className={styles.group}>
              <small>{label as string}</small>
              <div className={styles.chips}>
                {(chips as string[]).map((c, i) => (
                  <motion.span
                    key={c}
                    className={`${styles.chip} ${(i + gi) % 2 === 0 ? styles.chipOn : ''}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={vp}
                    transition={{ duration: 0.5, delay: 0.15 + gi * 0.15 + i * 0.05, ease }}
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case 'shield':
      return (
        <div className={styles.shield}>
          <div className={styles.shieldCore}>
            <span className={styles.orbit} aria-hidden="true" />
            <span className={`${styles.orbit} ${styles.orbit2}`} aria-hidden="true" />
            <Icon name="shield" size={54} stroke={1.3} />
          </div>
          <div className={styles.badges}>
            {['256-bit encryption', 'Granular access', 'Watermarked files', 'Full audit trail'].map((b, i) => (
              <motion.span
                key={b}
                className={styles.badge}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
              >
                <Icon name="check" size={14} stroke={2.4} /> {b}
              </motion.span>
            ))}
          </div>
        </div>
      );
    case 'profile':
      return (
        <div className={styles.form}>
          {[
            ['Company', 'Solaris Grid'],
            ['Stage', 'Seed'],
            ['Raising', '$1.5M'],
            ['Monthly revenue', '$48K'],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              className={styles.field}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease }}
            >
              <small>{k}</small>
              <b>{v}</b>
            </motion.div>
          ))}
          <div className={styles.progressWrap}>
            <small>Profile strength</small>
            <div className={styles.progress}>
              <motion.i
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 0.86 }}
                viewport={vp}
                transition={{ duration: 1.6, delay: 0.6, ease }}
              />
            </div>
          </div>
        </div>
      );
    case 'score':
    default:
      return (
        <div className={styles.list}>
          {[['Stage fit', 96], ['Sector thesis', 92], ['Ticket size', 88], ['Geography', 85], ['ESG', 84]].map(
            ([k, v], i) => (
              <div key={k as string} className={styles.scoreRow}>
                <span>{k}</span>
                <span className={styles.mini}>
                  <motion.i
                    style={{ width: `${v}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={vp}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease }}
                  />
                </span>
                <b>{v}</b>
              </div>
            ),
          )}
        </div>
      );
  }
}
