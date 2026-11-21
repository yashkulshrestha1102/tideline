'use client';

import { motion } from 'framer-motion';
import { SplitReveal } from './TextEffects';
import styles from './SectionHeading.module.css';

type Props = {
  eyebrow?: string;
  title: string; // *word* = italic accent
  text?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  as?: 'h1' | 'h2';
  size?: 'md' | 'lg' | 'xl';
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  dark = false,
  as = 'h2',
  size = 'lg',
}: Props) {
  const center = align === 'center';
  return (
    <div className={`${styles.wrap} ${center ? styles.center : ''}`}>
      {eyebrow && (
        <motion.div
          className={`eyebrow ${dark ? 'eyebrow-light' : ''} ${center ? 'eyebrow-center' : ''}`}
          initial={{ opacity: 0, x: center ? 0 : -40, y: center ? 16 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow}
        </motion.div>
      )}
      <SplitReveal
        as={as}
        text={title}
        className={`${styles.title} ${styles[size]} ${dark ? styles.dark : ''}`}
        accentClassName={dark ? 'accent-light' : 'accent'}
        delay={0.1}
      />
      {text && (
        <motion.p
          className={`${styles.text} ${dark ? styles.textDark : ''}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
