'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { Icon } from '@/components/ui/Icons';
import styles from './FeatureGrid.module.css';

export type GridItem = { icon: string; title: string; text: string };

export default function FeatureGrid({ id, eyebrow, title, text, items, dark = false }: {
  id?: string;
  eyebrow: string;
  title: string;
  text?: string;
  items: readonly GridItem[];
  dark?: boolean;
}) {
  return (
    <section id={id} className={`section-pad ${styles.section} ${dark ? styles.dark : ''}`}>
      <div className="inner">
        <SectionHeading eyebrow={eyebrow} title={title} text={text} dark={dark} align="center" />
        <div className={styles.grid}>
          {items.map((it, i) => (
            <SpotlightCard
              key={it.title}
              tone={dark ? 'dark' : i % 5 === 0 ? 'teal' : 'light'}
              delay={(i % 3) * 0.1}
              from={i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'}
            >
              <span className={styles.icon}>
                <Icon name={it.icon} size={26} />
              </span>
              <h3 className={styles.title}>{it.title}</h3>
              <p className={styles.text}>{it.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
