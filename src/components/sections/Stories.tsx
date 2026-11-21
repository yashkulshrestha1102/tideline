'use client';

import { stories } from '@/lib/site';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Stories.module.css';

/** Auto-scrolling row of story cards (pauses on hover). */
export default function Stories() {
  const loop = [...stories.items, ...stories.items];
  return (
    <section id="stories" className={styles.section}>
      <div className={styles.head}>
        <SectionHeading eyebrow={stories.eyebrow} title={stories.title} align="center" />
      </div>
      <div className={styles.rail}>
        <div className={styles.track}>
          {loop.map((s, i) => (
            <figure key={i} data-cursor="Story" className={styles.card} aria-hidden={i >= stories.items.length}>
              <svg className={styles.quoteMark} width="40" height="30" viewBox="0 0 56 40" fill="none" aria-hidden="true">
                <path d="M4 38V22C4 10 10 4 22 2M32 38V22c0-12 6-18 18-20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <blockquote className={styles.quote}>{s.quote}</blockquote>
              <figcaption className={styles.by}>
                <span className={styles.avatar}>{s.name.replace(/[^A-Za-z]/g, '').slice(0, 1) || 'T'}</span>
                <span>
                  <b>{s.name}</b>
                  <small>{s.role}</small>
                </span>
                <span className={styles.result}>{s.result}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
