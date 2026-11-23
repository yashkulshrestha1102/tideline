'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { toolkit } from '@/lib/site';
import { SplitReveal } from '@/components/ui/TextEffects';
import { Icon } from '@/components/ui/Icons';
import styles from './ToolkitScroller.module.css';

/**
 * Pinned horizontal scroll: the section sticks to the screen while
 * vertical scrolling slides the cards sideways (left).
 */
export default function ToolkitScroller() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], ['0%', '-62%']);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section data-section="toolkit" ref={ref} className={styles.section} id="toolkit">
      <div className={styles.sticky}>
        <div className={styles.head}>
          <motion.div
            className="eyebrow eyebrow-light"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {toolkit.eyebrow}
          </motion.div>
          <SplitReveal text={toolkit.title} className={styles.title} accentClassName="accent-light" />
          <p className={styles.sub}>{toolkit.text}</p>
          <div className={styles.progress} aria-hidden="true">
            <motion.i style={{ scaleX: bar }} />
          </div>
        </div>

        <div className={styles.viewport}>
          <motion.div className={styles.track} style={{ x }}>
            {toolkit.items.map((it, i) => (
              <article key={it.title} data-cursor="Scroll" className={`${styles.card} ${styles[it.tone]}`}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.icon}>
                  <Icon name={it.icon} size={30} stroke={1.5} />
                </span>
                <h3 className={styles.cardTitle}>{it.title}</h3>
                <p className={styles.cardText}>{it.text}</p>
                <svg className={styles.wave} viewBox="0 0 300 80" fill="none" aria-hidden="true">
                  <path d="M0 60 C 60 20, 120 80, 180 40 S 270 10, 300 30" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M0 70 C 60 30, 120 90, 180 50 S 270 20, 300 40" stroke="currentColor" strokeWidth="1" opacity=".5" />
                </svg>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
