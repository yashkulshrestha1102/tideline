'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import styles from './ScrollMarquee.module.css';

export type MarqueeRow = {
  items: readonly string[];
  direction: 'left' | 'right';
  variant?: 'solid' | 'outline' | 'italic';
};

/**
 * Big text rows that drift on their own AND slide left/right as you scroll.
 * Row 1 moves one way, row 2 the other.
 */
export default function ScrollMarquee({ rows }: { rows: readonly MarqueeRow[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.4 });

  return (
    <div ref={ref} className={styles.wrap}>
      {rows.map((row, i) => (
        <Row key={i} row={row} progress={progress} />
      ))}
    </div>
  );
}

function Row({ row, progress }: { row: MarqueeRow; progress: MotionValue<number> }) {
  const x = useTransform(
    progress,
    [0, 1],
    row.direction === 'left' ? ['0%', '-22%'] : ['-22%', '0%'],
  );
  const variant = row.variant ?? 'solid';
  // 3 copies so the CSS loop never shows a gap
  const copies = [0, 1, 2];

  return (
    <motion.div className={styles.row} style={{ x }}>
      <div className={`${styles.track} ${row.direction === 'right' ? styles.reverse : ''}`}>
        {copies.map((c) => (
          <div key={c} className={styles.group} aria-hidden={c > 0}>
            {row.items.map((item) => (
              <span key={item} className={styles.itemWrap}>
                <span className={`${styles.item} ${styles[variant]}`}>{item}</span>
                <span className={styles.pearl} aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
