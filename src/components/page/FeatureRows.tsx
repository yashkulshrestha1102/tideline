'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MockVisual, { type MockKind } from '@/components/ui/MockVisual';
import { SlideIn, SplitReveal } from '@/components/ui/TextEffects';
import { Icon } from '@/components/ui/Icons';
import styles from './FeatureRows.module.css';

export type FeatureRow = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  bullets: readonly string[];
  visual: MockKind;
};

/** Alternating rows: copy slides in from one side, product visual from the other. */
export default function FeatureRows({ rows }: { rows: readonly FeatureRow[] }) {
  return (
    <section className={styles.section}>
      {rows.map((r, i) => (
        <Row key={r.id} row={r} index={i} />
      ))}
    </section>
  );
}

function Row({ row, index }: { row: FeatureRow; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const numX = useTransform(scrollYProgress, [0, 1], index % 2 ? ['-20%', '20%'] : ['20%', '-20%']);
  const visY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const reverse = index % 2 === 1;

  return (
    <div id={row.id} ref={ref} className={`${styles.row} ${reverse ? styles.reverse : ''}`}>
      <motion.span className={styles.bigNum} style={{ x: numX }} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <div className={styles.copy}>
        <SlideIn from={reverse ? 'right' : 'left'}>
          <div className="eyebrow">{row.eyebrow}</div>
        </SlideIn>
        <SplitReveal text={row.title} className={styles.title} accentClassName="accent" delay={0.1} />
        <SlideIn from={reverse ? 'right' : 'left'} delay={0.15}>
          <p className={styles.text}>{row.text}</p>
        </SlideIn>
        <ul className={styles.bullets}>
          {row.bullets.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: reverse ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.check}>
                <Icon name="check" size={13} stroke={2.8} />
              </span>
              {b}
            </motion.li>
          ))}
        </ul>
      </div>

      <SlideIn from={reverse ? 'left' : 'right'} distance={120} className={styles.visual}>
        <motion.div style={{ y: visY }}>
          <MockVisual kind={row.visual} />
        </motion.div>
      </SlideIn>
    </div>
  );
}
