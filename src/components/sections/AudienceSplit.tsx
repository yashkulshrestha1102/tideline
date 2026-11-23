'use client';

import Link from 'next/link';
import { audience } from '@/lib/site';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { SplitReveal } from '@/components/ui/TextEffects';
import { ArrowRight, Icon } from '@/components/ui/Icons';
import styles from './AudienceSplit.module.css';

export default function AudienceSplit() {
  const sides = [
    { data: audience.founders, tone: 'light' as const, from: 'left' as const, icon: 'rocket' },
    { data: audience.investors, tone: 'dark' as const, from: 'right' as const, icon: 'target' },
  ];

  return (
    <section data-section="founders-investors" className={`section-pad ${styles.section}`}>
      <div className="inner">
        <SectionHeading eyebrow={audience.eyebrow} title={audience.title} align="center" />

        <div className={styles.grid}>
          {sides.map(({ data, tone, from, icon }, i) => (
            <SpotlightCard key={data.tag} tone={tone} from={from} delay={i * 0.12} className={styles.cell}>
              <div className={styles.card}>
                <div className={styles.head}>
                  <span className={`${styles.tag} ${tone === 'dark' ? styles.tagDark : ''}`}>{data.tag}</span>
                  <span className={`${styles.icon} ${tone === 'dark' ? styles.iconDark : ''}`}>
                    <Icon name={icon} size={26} />
                  </span>
                </div>
                <SplitReveal
                  as="h3"
                  text={data.title}
                  className={`${styles.title} ${tone === 'dark' ? styles.titleDark : ''}`}
                  accentClassName={tone === 'dark' ? 'accent-light' : 'accent'}
                />
                <p className={`${styles.text} ${tone === 'dark' ? styles.textDark : ''}`}>{data.text}</p>
                <ul className={styles.points}>
                  {data.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={16} stroke={2.4} /> {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={data.cta.href}
                  className={`btn ${tone === 'dark' ? styles.btnLight : 'btn-primary'} ${styles.cta}`}
                >
                  {data.cta.label} <ArrowRight className="arrow" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
