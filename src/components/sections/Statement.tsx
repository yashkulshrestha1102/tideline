'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { statement } from '@/lib/site';
import { ScrollHighlight } from '@/components/ui/TextEffects';
import styles from './Statement.module.css';

export default function Statement({
  eyebrow = statement.eyebrow,
  text = statement.text,
}: { eyebrow?: string; text?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // decorative ribbons drift sideways while you scroll
  const leftX = useTransform(scrollYProgress, [0, 1], ['-12%', '8%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section data-section="statement" ref={ref} className={styles.section} aria-label={eyebrow}>
      <motion.svg className={styles.ribbonL} style={{ x: leftX }} viewBox="0 0 600 300" fill="none" aria-hidden="true">
        <path d="M0 220 C 140 80, 260 300, 420 160 S 560 40, 600 80" stroke="url(#tlStL)" strokeWidth="46" strokeLinecap="round" />
        <defs>
          <linearGradient id="tlStL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#9ad3c1" stopOpacity="0" />
            <stop offset=".6" stopColor="#66BEAC" stopOpacity=".35" />
            <stop offset="1" stopColor="#66BEAC" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
      <motion.svg className={styles.ribbonR} style={{ x: rightX }} viewBox="0 0 600 300" fill="none" aria-hidden="true">
        <path d="M0 80 C 160 220, 300 0, 440 140 S 560 260, 600 200" stroke="url(#tlStR)" strokeWidth="30" strokeLinecap="round" />
        <defs>
          <linearGradient id="tlStR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#66BEAC" stopOpacity="0" />
            <stop offset=".4" stopColor="#13786a" stopOpacity=".3" />
            <stop offset="1" stopColor="#9ad3c1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      <div className={styles.inner}>
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.eyebrowLine} />
          {eyebrow}
        </motion.div>
        <ScrollHighlight text={text} className={styles.text} accentClassName={styles.accent} />
      </div>
    </section>
  );
}
