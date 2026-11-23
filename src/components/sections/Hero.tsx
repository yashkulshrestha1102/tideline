'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { hero } from '@/lib/site';
import { ArrowRight, BarsIcon, PlayCircle } from '@/components/ui/Icons';
import CountUp from '@/components/ui/CountUp';
import StatsStrip from './StatsStrip';
import styles from './Hero.module.css';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Glow points sit on top of the pearls in the artwork (% of the visual box)
const pearls = [
  { x: 48.3, y: 49.5, s: 120, d: 4.2 },
  { x: 35.6, y: 37, s: 46, d: 3.1 },
  { x: 45.1, y: 25.9, s: 42, d: 3.7 },
  { x: 70.8, y: 47.9, s: 50, d: 2.9 },
  { x: 29.3, y: 58, s: 40, d: 3.4 },
  { x: 10.2, y: 71.4, s: 58, d: 4.6 },
  { x: 25.2, y: 87.5, s: 40, d: 3.9 },
  { x: 91.6, y: 37.9, s: 42, d: 3.3 },
];

const fitBars = [
  { w: 72, c: 'hsl(calc(var(--th, 0deg) + 161.1deg) calc(39.3% * var(--ts, 1)) 71.6%)' },
  { w: 80, c: 'var(--mint)' },
  { w: 66, c: 'hsl(calc(var(--th, 0deg) + 168.3deg) calc(65.3% * var(--ts, 1)) 33.9%)' },
  { w: 52, c: 'hsl(calc(var(--th, 0deg) + 171.7deg) calc(72.7% * var(--ts, 1)) 27.3%)' },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const visY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const visOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  const line = (delay: number) => ({
    initial: { y: '105%' },
    animate: { y: '0%' },
    transition: { duration: 1.2, delay, ease },
  });
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <div data-section="hero" ref={ref} className={styles.wrap} id="top">
      {/* ---------- Artwork ---------- */}
      <motion.div
        className={styles.visual}
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease }}
      >
        <motion.div className={styles.parallax} style={{ y: visY, opacity: visOpacity }}>
          <div className={styles.ribbons}>
            <Image
              src="/images/hero-ribbons-white.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 960px) 100vw, 56vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.sheen} />
          {pearls.map((p, i) => (
            <span
              key={i}
              className={styles.pearl}
              style={
                {
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  '--s': `${p.s}px`,
                  '--d': `${p.d}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </motion.div>

        {/* Investor fit card */}
        <motion.div
          className={styles.fitWrap}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease }}
        >
          <div className={styles.fitCard}>
            <div>
              <div className={styles.fitHead}>
                <BarsIcon />
                <span>Investor fit</span>
              </div>
              <div className={styles.fitValue}>
                <CountUp to={hero.investorFit} delay={1.2} suffix="%" />
              </div>
            </div>
            <div className={styles.fitBars}>
              {fitBars.map((b, i) => (
                <div key={i} className={styles.track}>
                  <motion.div
                    className={styles.fill}
                    style={{ width: `${b.w}%`, backgroundColor: b.c }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.4, delay: 1.4 + i * 0.12, ease }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- Copy ---------- */}
      <section className={styles.hero}>
        <motion.div className={styles.copy} style={{ y: copyY }}>
          <motion.div className={styles.eyebrow} {...rise(0.2)}>
            <motion.span
              className={styles.eyebrowLine}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease }}
            />
            {hero.eyebrow}
          </motion.div>

          <h1 className={styles.title}>
            <span className={styles.mask}>
              <motion.span className={styles.lineIn} {...line(0.35)}>
                {hero.titleLine1}
              </motion.span>
            </span>
            <span className={styles.mask}>
              <motion.span className={styles.lineIn} {...line(0.5)}>
                {hero.titleLine2Plain} <em>{hero.titleLine2Italic}</em>
                <span className={styles.dot}>.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p className={styles.sub} {...rise(0.75)}>
            {hero.subtitle}
          </motion.p>

          <motion.div className={styles.ctas} {...rise(0.9)}>
            <a href={hero.primaryCta.href} className={`btn btn-primary ${styles.ctaMain}`}>
              {hero.primaryCta.label} <ArrowRight size={20} className="arrow" />
            </a>
            <a href={hero.secondaryCta.href} className={`btn btn-ghost ${styles.ctaGhost}`}>
              <PlayCircle /> {hero.secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>
      </section>

      <StatsStrip />
    </div>
  );
}
