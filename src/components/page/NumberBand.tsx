'use client';

import { motion } from 'framer-motion';
import CountUp from '@/components/ui/CountUp';
import styles from './NumberBand.module.css';

export type NumberItem = { value: number; prefix?: string; suffix?: string; label: string };

export default function NumberBand({ items }: { items: readonly NumberItem[] }) {
  return (
    <section className={styles.band}>
      <div className={styles.grid}>
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            className={styles.item}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.num}>
              {it.prefix}
              <CountUp to={it.value} />
              <span className={styles.suffix}>{it.suffix}</span>
            </div>
            <div className={styles.label}>{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
