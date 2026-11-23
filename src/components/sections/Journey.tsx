'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { journey } from '@/lib/site';
import { BulbIcon, ChevronDown, GrowthIcon, PeopleIcon, SearchIcon } from '@/components/ui/Icons';
import styles from './Journey.module.css';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const icons = {
  bulb: <BulbIcon />,
  search: <SearchIcon />,
  people: <PeopleIcon />,
  growth: <GrowthIcon />,
};

export default function Journey() {
  const inView = { once: true, margin: '-80px' } as const;
  const draw = (delay = 0, origin: 'left' | 'right' = 'left') => ({
    style: { transformOrigin: origin },
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: inView,
    transition: { duration: 1.2, delay, ease },
  });
  const [t1, t2, t3, t4] = journey.titleParts;

  return (
    <section data-section="journey" id="journey" className={styles.section}>
      <svg className={styles.bg} viewBox="0 0 1440 400" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="tlArc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5fd3b6" stopOpacity="0" />
            <stop offset=".5" stopColor="#5fd3b6" stopOpacity=".35" />
            <stop offset="1" stopColor="#5fd3b6" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="tlPlanet" cx=".85" cy="1.05" r=".6">
            <stop offset="0" stopColor="#2aa391" stopOpacity=".45" />
            <stop offset="1" stopColor="#2aa391" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="400" fill="url(#tlPlanet)" />
        <path d="M-60 40 C 80 120, 140 260, 120 420" stroke="url(#tlArc)" strokeWidth="1.2" />
        <path d="M-90 80 C 60 160, 110 290, 80 420" stroke="url(#tlArc)" strokeWidth="1" />
        <path d="M1500 120 C 1340 170, 1260 290, 1250 420" stroke="url(#tlArc)" strokeWidth="1.4" />
        <path d="M1520 170 C 1380 220, 1310 320, 1300 420" stroke="#9ef0d8" strokeOpacity=".28" strokeWidth="1" />
      </svg>
      <div className={styles.topLine} />

      <div className={styles.inner}>
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 1, ease }}
        >
          <motion.span className={styles.eyebrowLine} {...draw(0.2, 'right')} />
          <span className={styles.eyebrowText}>{journey.eyebrow}</span>
          <motion.span className={styles.eyebrowLine} {...draw(0.2)} />
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 1.1, delay: 0.1, ease }}
        >
          {t1}
          <em>{t2}</em>
          {t3}
          <em>{t4}</em>
        </motion.h2>

        <div className={styles.steps}>
          {journey.steps.map((s, i) => (
            <Fragment key={s.title}>
              {i > 0 && (
                <div className={styles.connector} aria-hidden="true">
                  <motion.div className={styles.link} {...draw(0.3 + i * 0.25)}>
                    <i style={{ animationDelay: `${i * 1.5}s` }} />
                  </motion.div>
                </div>
              )}
              <motion.div
                className={styles.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 1, delay: 0.2 + i * 0.18, ease }}
              >
                <div className={styles.icon}>{icons[s.icon]}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepText}>
                  {s.text[0]}
                  <br />
                  {s.text[1]}
                </p>
              </motion.div>
            </Fragment>
          ))}
        </div>

        <div className={styles.footer}>
          <motion.span className={styles.footLine} {...draw(0.4, 'right')} />
          <a href="#ai-matching" className={styles.scrollBtn} aria-label="Scroll to next section">
            <ChevronDown />
          </a>
          <motion.span className={`${styles.footLine} ${styles.footLineR}`} {...draw(0.4)} />
        </div>
      </div>
    </section>
  );
}
