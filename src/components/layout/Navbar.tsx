'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { brand, navGroups } from '@/lib/site';
import { ArrowRight, ChevronDown, MenuIcon } from '@/components/ui/Icons';
import Logo from '@/components/ui/Logo';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const lenis = useLenis();

  // thin progress line at the top of the page
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menus whenever the page changes
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [pathname]);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    if (mobileOpen) lenis?.stop();
    else lenis?.start();
  }, [mobileOpen, lenis]);

  const isActive = (g: (typeof navGroups)[number]) =>
    g.items.some((it) => {
      const base = it.href.split('#')[0];
      return base !== '/' && pathname === base;
    });

  return (
    <header data-section="navbar" className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <motion.div className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />

      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" className={styles.logo} aria-label={`${brand.name} home`}>
          <Logo id="rd-nav" />
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {navGroups.map((g) => (
            <div key={g.label} className={styles.group}>
              <button
                type="button"
                className={`${styles.trigger} ${isActive(g) ? styles.active : ''}`}
                aria-haspopup="true"
              >
                {g.label}
                <ChevronDown className={styles.chev} />
              </button>
              <div className={styles.menu}>
                {g.items.map((it) => (
                  <Link key={it.label} href={it.href} className={styles.menuItem}>
                    {it.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.divider} aria-hidden="true" />
          <Link href="/signin" className={styles.signin}>Sign in</Link>
          <span className={`${styles.divider} ${styles.dividerSoft}`} aria-hidden="true" />
          <Link href="/get-matched" className={`btn btn-primary ${styles.cta}`}>
            Get matched <ArrowRight className="arrow" />
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </motion.div>

      {/* ---------- Mobile drawer ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.drawer}
            data-lenis-prevent
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {navGroups.map((g) => {
              const open = openGroup === g.label;
              return (
                <div key={g.label} className={styles.drawerGroup}>
                  <button
                    type="button"
                    className={styles.drawerTrigger}
                    aria-expanded={open}
                    onClick={() => setOpenGroup(open ? null : g.label)}
                  >
                    {g.label}
                    <ChevronDown className={open ? styles.chevOpen : undefined} size={14} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        {g.items.map((it) => (
                          <Link
                            key={it.label}
                            href={it.href}
                            className={styles.drawerItem}
                            onClick={() => setMobileOpen(false)}
                          >
                            {it.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <div className={styles.drawerFoot}>
              <Link href="/signin" className="btn btn-ghost" onClick={() => setMobileOpen(false)}>Sign in</Link>
              <Link href="/get-matched" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
                Get matched <ArrowRight className="arrow" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
