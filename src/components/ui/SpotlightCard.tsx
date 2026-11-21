'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './SpotlightCard.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark' | 'teal';
  delay?: number;
  from?: 'up' | 'left' | 'right';
};

/**
 * Card with a soft light that follows the mouse + a gentle 3D tilt,
 * and a staggered entrance when it scrolls into view.
 */
export default function SpotlightCard({ children, className, tone = 'light', delay = 0, from = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * 6}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const toneClass = { light: styles.toneLight, dark: styles.toneDark, teal: styles.toneTeal };
  const offset = from === 'left' ? { x: -60, y: 0 } : from === 'right' ? { x: 60, y: 0 } : { x: 0, y: 50 };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div ref={ref} className={`${styles.card} ${toneClass[tone]}`} onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
    </motion.div>
  );
}
