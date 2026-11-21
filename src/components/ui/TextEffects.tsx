'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ============================================================
   SplitReveal — each word rises out of a mask, one after another,
   when the heading scrolls into view.
   Wrap a word in *asterisks* to make it italic + accent colored.
   ============================================================ */
type SplitProps = {
  text: string;
  className?: string;
  accentClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
};

export function SplitReveal({ text, className, accentClassName, delay = 0, as = 'h2' }: SplitProps) {
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(' ');
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((raw, i) => {
        const accent = raw.includes('*');
        const word = raw.replace(/\*/g, '');
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'top',
              paddingBottom: '0.12em',
              marginBottom: '-0.12em',
            }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              className={accent ? accentClassName : undefined}
              variants={{
                hidden: { y: '110%', rotate: 4 },
                show: { y: '0%', rotate: 0, transition: { duration: 1, ease } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </Tag>
  );
}

/* ============================================================
   ScrollHighlight — a big statement whose words light up
   one by one as the reader scrolls through it.
   ============================================================ */
export function ScrollHighlight({ text, className, accentClassName }: {
  text: string;
  className?: string;
  accentClassName?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((raw, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const accent = raw.includes('*');
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            className={accent ? accentClassName : undefined}
          >
            {raw.replace(/\*/g, '')}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range, className }: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <span style={{ display: 'inline-block', marginRight: '0.26em' }}>
      <motion.span className={className} style={{ display: 'inline-block', opacity, y }}>
        {children}
      </motion.span>
    </span>
  );
}

/* ============================================================
   SlideIn — content glides in from the left or right.
   ============================================================ */
export function SlideIn({ children, from = 'left', delay = 0, distance = 90, className, style }: {
  children: React.ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x: from === 'left' ? -distance : distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
