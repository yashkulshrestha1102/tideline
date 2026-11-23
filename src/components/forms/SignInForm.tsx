'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Icon } from '@/components/ui/Icons';
import f from './forms.module.css';
import styles from './SignInForm.module.css';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
      setError('Please enter a valid email and a password of at least 6 characters.');
      return;
    }
    setError('');
    setLoading(true);
    // TODO: connect authentication here (e.g. NextAuth / Supabase / your API).
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setError('Sign in is not connected yet. Hook this form up to your authentication service.');
  };

  return (
    <section data-section="sign-in" className={styles.wrap}>
      <motion.aside
        className={styles.art}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease }}
      >
        <div className={styles.artImg} aria-hidden="true">
          <Image src="/images/hero-ribbons-dark.webp" alt="" fill priority sizes="50vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.artCopy}>
          <p className={styles.artQuote}>
            Capital finds its <em>direction.</em>
          </p>
          <p className={styles.artSub}>Your matches, intros and data room — right where you left them.</p>
        </div>
      </motion.aside>

      <motion.div
        className={styles.panel}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease }}
      >
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.sub}>
          New to Raisedesk? <Link href="/get-matched">Create your profile</Link>
        </p>

        <button type="button" className={styles.google}>
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
          </svg>
          Continue with Google
        </button>

        <div className={styles.or}><span>or</span></div>

        <form onSubmit={submit} noValidate className={styles.form}>
          <label className={f.field}>
            <span className={f.label}>Email</span>
            <input className={f.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label className={f.field}>
            <span className={styles.pwHead}>
              <span className={f.label}>Password</span>
              <Link href="/contact" className={styles.forgot}>Forgot password?</Link>
            </span>
            <span className={styles.pwWrap}>
              <input
                className={f.input}
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button type="button" className={styles.eye} onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}>
                <Icon name="eye" size={18} />
              </button>
            </span>
          </label>
          {error && (
            <motion.p className={f.error} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: [0, -8, 8, -4, 0] }}>
              {error}
            </motion.p>
          )}
          <button type="submit" className={`btn btn-primary ${f.submit}`} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'} <ArrowRight className="arrow" />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
