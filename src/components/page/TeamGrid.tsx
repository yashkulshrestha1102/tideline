'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './TeamGrid.module.css';

export default function TeamGrid({ team }: { team: readonly { name: string; role: string }[] }) {
  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="inner">
        <SectionHeading eyebrow="The team" title="People behind the *current.*" align="center" />
        <div className={styles.grid}>
          {team.map((m, i) => (
            <motion.div
              key={m.role}
              className={styles.card}
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.photo} aria-hidden="true">
                <span>{m.name.replace(/[^A-Za-z]/g, '').slice(0, 1) || 'T'}</span>
                <svg viewBox="0 0 200 200" preserveAspectRatio="none">
                  <path d={`M0 ${150 - i * 10} C 60 ${90 + i * 8}, 120 ${190 - i * 6}, 200 ${110 + i * 5}`} stroke="rgba(158,230,210,.5)" strokeWidth="18" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.name}>{m.name}</div>
              <div className={styles.role}>{m.role}</div>
            </motion.div>
          ))}
        </div>
        <p className={styles.note}>Replace the placeholders with real names and photos (put images in /public/images/team).</p>
      </div>
    </section>
  );
}
