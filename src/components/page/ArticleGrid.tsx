'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icons';
import styles from './ArticleGrid.module.css';

type Article = { cat: string; title: string; mins: number; featured?: boolean };

/** Filterable article cards — cards re-flow smoothly when a category is picked. */
export default function ArticleGrid({ categories, articles }: {
  categories: readonly string[];
  articles: readonly Article[];
}) {
  const [cat, setCat] = useState('All');
  const shown = articles.filter((a) => cat === 'All' || a.cat === cat);

  return (
    <section data-section="articles" className={`section-pad ${styles.section}`}>
      <div className="inner">
        <div className={styles.filters} role="tablist" aria-label="Filter articles">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              className={`${styles.filter} ${cat === c ? styles.on : ''}`}
              onClick={() => setCat(c)}
            >
              {cat === c && <motion.span layoutId="tl-filter" className={styles.pill} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className={styles.filterLabel}>{c}</span>
            </button>
          ))}
        </div>

        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {shown.map((a, i) => (
              <motion.article
                layout
                key={a.title}
                data-cursor="Read"
                className={`${styles.card} ${a.featured && cat === 'All' ? styles.featured : ''}`}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.cover} aria-hidden="true">
                  <svg viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path d={`M0 ${140 - i * 8} C 100 ${60 + i * 10}, 200 ${180 - i * 6}, 400 ${70 + i * 9}`} stroke="hsl(calc(var(--th, 0deg) + 163.3deg) calc(59.0% * var(--ts, 1)) 76.1% / .55)" strokeWidth="26" fill="none" strokeLinecap="round" />
                    <path d={`M0 ${170 - i * 5} C 120 ${100 + i * 4}, 240 ${200 - i * 8}, 400 ${110 + i * 6}`} stroke="rgba(255,255,255,.35)" strokeWidth="2" fill="none" />
                  </svg>
                  <span className={styles.cat}>{a.cat}</span>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{a.title}</h3>
                  <div className={styles.meta}>
                    <span><Icon name="clock" size={14} /> {a.mins} min read</span>
                    <span className={styles.read}>
                      Read <Icon name="arrowUp" size={14} className={styles.readIcon} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
