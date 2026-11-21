'use client';

import { motion } from 'framer-motion';
import PageHero from './PageHero';
import styles from './LegalPage.module.css';

export type LegalSection = { title: string; body: string };

export default function LegalPage({ crumb, title, updated, intro, sections }: {
  crumb: string;
  title: string;
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
}) {
  return (
    <main>
      <PageHero crumb={crumb} eyebrow={`Last updated · ${updated}`} title={title} text={intro} compact />
      <section className={`section-pad ${styles.section}`}>
        <div className={styles.layout}>
          <nav className={styles.toc} aria-label="On this page">
            <div className={styles.tocTitle}>On this page</div>
            {sections.map((s, i) => (
              <a key={s.title} href={`#s${i + 1}`}>
                <span>{String(i + 1).padStart(2, '0')}</span> {s.title}
              </a>
            ))}
          </nav>
          <div className={styles.content}>
            {sections.map((s, i) => (
              <motion.article
                key={s.title}
                id={`s${i + 1}`}
                className={styles.block}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <p>{s.body}</p>
              </motion.article>
            ))}
            <p className={styles.note}>
              This page is a starting template. Have it reviewed by your legal adviser before publishing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
