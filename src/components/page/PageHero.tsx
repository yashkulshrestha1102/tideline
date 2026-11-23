'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitReveal } from '@/components/ui/TextEffects';
import { ArrowRight } from '@/components/ui/Icons';
import styles from './PageHero.module.css';

type Cta = { label: string; href: string };
type Props = {
  crumb: string;
  eyebrow: string;
  title: string; // *word* = italic accent
  text: string;
  primary?: Cta;
  secondary?: Cta;
  flip?: boolean;
  compact?: boolean;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PageHero({ crumb, eyebrow, title, text, primary, secondary, flip, compact }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const artX = useTransform(scrollYProgress, [0, 1], ['0%', flip ? '-8%' : '8%']);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section data-section="page-hero" ref={ref} className={`${styles.hero} ${compact ? styles.compact : ''}`}>
      <motion.div
        className={styles.art}
        style={{ y: artY, x: artX }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
        aria-hidden="true"
      >
        <div className={`${styles.float} ${flip ? styles.flip : ''}`}>
          <Image src="/images/hero-ribbons-white.webp" alt="" fill priority sizes="60vw" style={{ objectFit: 'cover' }} />
        </div>
      </motion.div>

      <motion.div className={styles.inner} style={{ y: copyY }}>
        <motion.nav
          className={styles.crumbs}
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{crumb}</span>
        </motion.nav>

        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
        >
          {eyebrow}
        </motion.div>

        <SplitReveal as="h1" text={title} className={styles.title} accentClassName="accent" delay={0.6} />

        <motion.p
          className={styles.text}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease }}
        >
          {text}
        </motion.p>

        {(primary || secondary) && (
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease }}
          >
            {primary && (
              <Link href={primary.href} className={`btn btn-primary ${styles.btn}`}>
                {primary.label} <ArrowRight className="arrow" />
              </Link>
            )}
            {secondary && (
              <Link href={secondary.href} className={`btn btn-ghost ${styles.btn}`}>
                {secondary.label}
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
