'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { stats } from '@/lib/site';
import CountUp from '@/components/ui/CountUp';
import { FoundersIcon, GlobeIcon, HandshakeIcon } from '@/components/ui/Icons';
import styles from './StatsStrip.module.css';

const icons = {
  founders: <FoundersIcon />,
  handshake: <HandshakeIcon />,
  globe: <GlobeIcon />,
};

export default function StatsStrip() {
  return (
    <motion.section
      className={styles.strip}
      aria-label="Platform at a glance"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.row}>
        {stats.map((s, i) => (
          <Fragment key={s.label}>
            {i > 0 && <span className={styles.sep} aria-hidden="true" />}
            <div className={styles.item}>
              {icons[s.icon]}
              <CountUp className={styles.num} to={s.value} suffix={s.suffix} delay={1.2 + i * 0.1} />
              <span className={styles.label}>{s.label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </motion.section>
  );
}
