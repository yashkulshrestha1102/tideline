'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ctaBand } from '@/lib/site';
import { SplitReveal } from '@/components/ui/TextEffects';
import { ArrowRight } from '@/components/ui/Icons';
import styles from './CtaBand.module.css';

export default function CtaBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const artX = useTransform(scrollYProgress, [0, 1], ['18%', '-12%']);
  const artRotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section data-section="cta" ref={ref} className={styles.section}>
      <motion.div className={styles.art} style={{ x: artX, rotate: artRotate }} aria-hidden="true">
        <Image src="/images/hero-ribbons-white.webp" alt="" fill sizes="70vw" style={{ objectFit: 'cover' }} />
      </motion.div>
      <div className={styles.veil} aria-hidden="true" />

      <div className={styles.inner}>
        <SplitReveal text={ctaBand.title} className={styles.title} accentClassName="accent-light" />
        <motion.p
          className={styles.text}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {ctaBand.text}
        </motion.p>
        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={ctaBand.primary.href} className={`btn ${styles.primary}`}>
            {ctaBand.primary.label} <ArrowRight className="arrow" />
          </Link>
          <Link href={ctaBand.secondary.href} className={`btn ${styles.secondary}`}>
            {ctaBand.secondary.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
