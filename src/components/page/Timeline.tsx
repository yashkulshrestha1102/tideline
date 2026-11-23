'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icons';
import styles from './Timeline.module.css';

export type TimelineStep = { icon: string; tag: string; title: string; text: string };

/** Zig-zag timeline; the centre line fills as you scroll and steps slide in from alternate sides. */
export default function Timeline({ id, eyebrow, title, text, steps }: {
  id?: string;
  eyebrow: string;
  title: string;
  text?: string;
  steps: readonly TimelineStep[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });

  return (
    <section data-section="timeline" id={id} className={`section-pad ${styles.section}`}>
      <div className="inner">
        <SectionHeading eyebrow={eyebrow} title={title} text={text} dark align="center" />

        <div ref={ref} className={styles.wrap}>
          <div className={styles.line} aria-hidden="true">
            <motion.i style={{ scaleY: fill }} />
          </div>

          {steps.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <div key={s.title} className={`${styles.step} ${left ? styles.left : styles.right}`}>
                <motion.span
                  className={styles.node}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-30% 0px -30% 0px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <Icon name={s.icon} size={22} />
                </motion.span>
                <motion.div
                  className={styles.card}
                  initial={{ opacity: 0, x: left ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.tag}>{s.tag}</span>
                  <h3 className={styles.title}>{s.title}</h3>
                  <p className={styles.text}>{s.text}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
