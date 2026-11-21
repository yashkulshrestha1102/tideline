'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Icon } from '@/components/ui/Icons';
import f from './forms.module.css';
import styles from './ContactForm.module.css';

type Channel = { icon: string; label: string; value: string };
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ContactForm({ channels, topics }: { channels: readonly Channel[]; topics: readonly string[] }) {
  const [topic, setTopic] = useState(topics[0]);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) errs.message = 'Please write at least 10 characters.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('sending');
    // TODO: connect to your backend / email service here, e.g.
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify({ ...form, topic }) });
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('sent');
  };

  return (
    <section className={`section-pad ${styles.section}`}>
      <div className={`inner ${styles.grid}`}>
        <div className={styles.channels}>
          {channels.map((c, i) => (
            <motion.div
              key={c.label}
              className={styles.channel}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.12, ease }}
            >
              <span className={styles.channelIcon}>
                <Icon name={c.icon} size={22} />
              </span>
              <span>
                <small>{c.label}</small>
                <b>{c.value}</b>
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
        >
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="sent"
                className={styles.sent}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease }}
              >
                <motion.span
                  className={styles.tick}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
                >
                  <Icon name="check" size={34} stroke={2.4} />
                </motion.span>
                <h3>Message sent</h3>
                <p>Thanks, {form.name.split(' ')[0]}. We will get back to you at {form.email} within one business day.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -20 }} className={styles.form}>
                <div className={f.field}>
                  <span className={f.label}>What can we help with?</span>
                  <div className={f.chips}>
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`${f.chip} ${topic === t ? f.chipOn : ''}`}
                        aria-pressed={topic === t}
                        onClick={() => setTopic(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={f.row2}>
                  <label className={f.field}>
                    <span className={f.label}>Full name</span>
                    <input className={f.input} value={form.name} onChange={set('name')} autoComplete="name" />
                    {errors.name && <span className={f.error}>{errors.name}</span>}
                  </label>
                  <label className={f.field}>
                    <span className={f.label}>Work email</span>
                    <input className={f.input} type="email" value={form.email} onChange={set('email')} autoComplete="email" />
                    {errors.email && <span className={f.error}>{errors.email}</span>}
                  </label>
                </div>

                <label className={f.field}>
                  <span className={f.label}>Company (optional)</span>
                  <input className={f.input} value={form.company} onChange={set('company')} autoComplete="organization" />
                </label>

                <label className={f.field}>
                  <span className={f.label}>Message</span>
                  <textarea className={f.textarea} value={form.message} onChange={set('message')} />
                  {errors.message && <span className={f.error}>{errors.message}</span>}
                </label>

                <button type="submit" className={`btn btn-primary ${f.submit}`} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight className="arrow" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
