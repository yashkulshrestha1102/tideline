'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { aiMatching } from '@/lib/site';
import { SlideIn, SplitReveal } from '@/components/ui/TextEffects';
import CountUp from '@/components/ui/CountUp';
import { ArrowRight } from '@/components/ui/Icons';
import styles from './AiMatching.module.css';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const barColors = ['var(--teal)', '#13786a', '#1e8f79', 'var(--mint)', '#9ad3c1'];
const R = 56;
const CIRC = 2 * Math.PI * R;

export default function AiMatching() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ['8%', '-38%']);
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const s = aiMatching.sample;

  return (
    <section data-section="ai-matching" id="ai-matching" ref={ref} className={styles.section}>
      {/* giant ghost word sliding sideways on scroll */}
      <motion.div className={styles.ghost} style={{ x: ghostX, y: '-50%' }} aria-hidden="true">
        precision matching · precision matching
      </motion.div>

      <div className={styles.inner}>
        {/* ---------- Left: copy ---------- */}
        <div className={styles.copy}>
          <SlideIn from="left" className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            {aiMatching.eyebrow}
          </SlideIn>

          <SplitReveal text={aiMatching.title} className={styles.title} accentClassName={styles.accent} delay={0.1} />

          <SlideIn from="left" delay={0.2}>
            <p className={styles.text}>{aiMatching.text}</p>
          </SlideIn>

          <ul className={styles.points}>
            {aiMatching.points.map((p, i) => (
              <motion.li
                key={p}
                className={styles.point}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease }}
              >
                <span className={styles.check} aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                {p}
              </motion.li>
            ))}
          </ul>

          <SlideIn from="left" delay={0.5}>
            <a href={aiMatching.cta.href} className={`btn btn-primary ${styles.cta}`}>
              {aiMatching.cta.label} <ArrowRight className="arrow" />
            </a>
          </SlideIn>
        </div>

        {/* ---------- Right: sample match card ---------- */}
        <SlideIn from="right" distance={140} className={styles.cardCol}>
          <motion.div style={{ y: cardY }} className={styles.cardStage}>
            <div className={styles.glow} aria-hidden="true" />

            {aiMatching.chips.map((c, i) => (
              <motion.span
                key={c}
                className={`${styles.chip} ${styles[`chip${i}`]}`}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 + i * 0.15, ease }}
              >
                <span className={styles.chipDot} />
                {c}
              </motion.span>
            ))}

            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.fund}>
                  <span className={styles.avatar}>{s.initial}</span>
                  <div>
                    <div className={styles.fundName}>{s.name}</div>
                    <div className={styles.fundMeta}>{s.meta}</div>
                  </div>
                </div>
                <span className={styles.sampleTag}>Sample match</span>
              </div>

              <div className={styles.scoreRow}>
                <div className={styles.ring}>
                  <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
                    <circle cx="66" cy="66" r={R} fill="none" stroke="#333A39" strokeWidth="10" />
                    <g transform="rotate(-90 66 66)">
                      <motion.circle
                        cx="66"
                        cy="66"
                        r={R}
                        fill="none"
                        stroke="url(#tlRing)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={CIRC}
                        initial={{ strokeDashoffset: CIRC }}
                        whileInView={{ strokeDashoffset: CIRC * (1 - s.score / 100) }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5, ease }}
                      />
                    </g>
                    <defs>
                      <linearGradient id="tlRing" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#66BEAC" />
                        <stop offset="1" stopColor="#2BA58C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className={styles.ringLabel}>
                    <CountUp to={s.score} delay={0.5} duration={2} className={styles.ringNum} />
                    <span className={styles.ringCap}>Fit score</span>
                  </div>
                </div>

                <div className={styles.factors}>
                  {s.factors.map((f, i) => (
                    <div key={f.label}>
                      <div className={styles.factorHead}>
                        <span>{f.label}</span>
                        <CountUp to={f.value} delay={0.6 + i * 0.12} className={styles.factorVal} />
                      </div>
                      <div className={styles.track}>
                        <motion.div
                          className={styles.fill}
                          style={{ width: `${f.value}%`, backgroundColor: barColors[i % barColors.length] }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: 0.6 + i * 0.12, ease }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                className={styles.why}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 1.3, ease }}
              >
                <svg className={styles.spark} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l2.2 5.6L20 10l-5.8 1.4L12 17l-2.2-5.6L4 10l5.8-1.4z" />
                </svg>
                <span>
                  <strong>Why this fits:</strong> {s.why}
                </span>
              </motion.div>

              <div className={styles.cardActions}>
                <button type="button" className={`btn btn-primary ${styles.smallBtn}`}>Request intro</button>
                <button type="button" className={`btn btn-ghost ${styles.smallBtn}`}>Save to shortlist</button>
              </div>
            </div>
          </motion.div>
        </SlideIn>
      </div>
    </section>
  );
}
