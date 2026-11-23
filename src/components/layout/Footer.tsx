'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { brand, footerGroups } from '@/lib/site';
import { ArrowRight, Icon } from '@/components/ui/Icons';
import Logo from '@/components/ui/Logo';
import styles from './Footer.module.css';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Footer() {
  const lenis = useLenis();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const letters = brand.name.toUpperCase().split('');

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo} aria-label={`${brand.name} home`}>
              <Logo light id="rd-foot" />
            </Link>
            <p className={styles.tagline}>
              AI-guided fundraising for founders and investors who would rather build than chase. A product of {brand.company}.
            </p>

            <form
              className={styles.news}
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes('@')) setJoined(true);
              }}
            >
              <label htmlFor="footer-email" className={styles.newsLabel}>
                Monthly funding insights, in your inbox
              </label>
              {joined ? (
                <p className={styles.thanks}>Thank you — you are on the list.</p>
              ) : (
                <div className={styles.newsRow}>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" aria-label="Subscribe">
                    <ArrowRight />
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className={styles.cols}>
            {footerGroups.map((g, gi) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: gi * 0.08, ease }}
              >
                <div className={styles.colTitle}>{g.label}</div>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.label}>
                      <Link href={it.href} className={styles.link}>
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* giant wordmark, letters rise one by one */}
        <motion.div
          className={styles.giant}
          aria-hidden="true"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-20px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {letters.map((l, i) => (
            <span key={i} className={styles.giantMask}>
              <motion.span
                className={styles.giantLetter}
                variants={{
                  hidden: { y: '100%' },
                  show: { y: '0%', transition: { duration: 1.1, ease } },
                }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </motion.div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {brand.name} — a product of {brand.company}. All rights reserved.</span>
          <div className={styles.social}>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" size={18} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <Icon name="x" size={16} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon name="instagram" size={18} />
            </a>
          </div>
          <button type="button" className={styles.toTop} onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}>
            Back to top <Icon name="arrowUp" size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
