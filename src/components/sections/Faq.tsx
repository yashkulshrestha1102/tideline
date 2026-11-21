'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { faq } from '@/lib/site';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Faq.module.css';

type Item = { q: string; a: string };

export default function Faq({ items = faq.items, eyebrow = faq.eyebrow, title = faq.title }: {
  items?: readonly Item[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" className={`section-pad ${styles.section}`}>
      <div className={`inner ${styles.grid}`}>
        <div className={styles.left}>
          <SectionHeading eyebrow={eyebrow} title={title} size="md" />
          <p className={styles.help}>
            Still curious? <Link href="/contact">Talk to our team</Link>
          </p>
        </div>

        <div className={styles.list}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={it.q}
                className={styles.item}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  className={styles.q}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{it.q}</span>
                  <span className={`${styles.plus} ${isOpen ? styles.plusOpen : ''}`} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className={styles.a}>{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
