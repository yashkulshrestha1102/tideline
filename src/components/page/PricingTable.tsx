'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icons';
import styles from './PricingTable.module.css';

type Plan = {
  name: string;
  monthly: string;
  yearly: string;
  note: string;
  features: readonly string[];
  cta: string;
  popular?: boolean;
};

export default function PricingTable({ founders, investors }: {
  founders: readonly Plan[];
  investors: readonly Plan[];
}) {
  const [who, setWho] = useState<'founders' | 'investors'>('founders');
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const plans = who === 'founders' ? founders : investors;

  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="inner">
        <div className={styles.toggles}>
          <Toggle
            id="who"
            value={who}
            options={[['founders', 'For founders'], ['investors', 'For investors']]}
            onChange={(v) => setWho(v as typeof who)}
          />
          <Toggle
            id="billing"
            value={billing}
            options={[['monthly', 'Monthly'], ['yearly', 'Yearly']]}
            onChange={(v) => setBilling(v as typeof billing)}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={who}
            className={styles.grid}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
              exit: { opacity: 0, transition: { duration: 0.2 } },
            }}
          >
            {plans.map((p) => {
              const price = billing === 'monthly' ? p.monthly : p.yearly;
              const isText = price === 'Free' || price === 'Custom';
              return (
                <motion.div
                  key={p.name}
                  className={`${styles.card} ${p.popular ? styles.popular : ''}`}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {p.popular && <span className={styles.badge}>Most popular</span>}
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.note}>{p.note}</p>
                  <div className={styles.price}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price + billing}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className={styles.amount}
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>
                    {!isText && <span className={styles.per}>/ {billing === 'monthly' ? 'month' : 'year'}</span>}
                  </div>
                  <ul className={styles.features}>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Icon name="check" size={15} stroke={2.6} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={p.cta === 'Talk to sales' ? '/contact' : '/get-matched'}
                    className={`btn ${p.popular ? styles.btnLight : 'btn-primary'} ${styles.cta}`}
                  >
                    {p.cta}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Toggle({ id, value, options, onChange }: {
  id: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  return (
    <div className={styles.toggle} role="tablist">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          role="tab"
          aria-selected={value === v}
          className={`${styles.opt} ${value === v ? styles.optOn : ''}`}
          onClick={() => onChange(v)}
        >
          {value === v && (
            <motion.span layoutId={`tl-toggle-${id}`} className={styles.optPill} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
          )}
          <span className={styles.optLabel}>{label}</span>
        </button>
      ))}
    </div>
  );
}
