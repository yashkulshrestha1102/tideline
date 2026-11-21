'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Icon } from '@/components/ui/Icons';
import f from './forms.module.css';
import styles from './MatchWizard.module.css';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEPS = ['You', 'Company', 'The round', 'Contact'] as const;
const STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B+'];
const SECTORS = ['Fintech', 'Climate', 'SaaS', 'Healthtech', 'D2C', 'Deeptech & AI', 'Agritech', 'Edtech'];
const TICKETS = ['Under $250K', '$250K – $1M', '$1M – $5M', '$5M+'];
const REGIONS = ['India', 'South-East Asia', 'Middle East', 'Europe', 'North America'];

type Data = {
  role: 'founder' | 'investor' | '';
  company: string;
  website: string;
  stage: string;
  sectors: string[];
  ticket: string;
  regions: string[];
  name: string;
  email: string;
};

const empty: Data = { role: '', company: '', website: '', stage: '', sectors: [], ticket: '', regions: [], name: '', email: '' };

export default function MatchWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [d, setD] = useState<Data>(empty);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const isFounder = d.role !== 'investor';
  const toggle = (k: 'sectors' | 'regions', v: string) =>
    setD((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));

  const validate = () => {
    if (step === 0 && !d.role) return 'Please choose founder or investor.';
    if (step === 1 && (!d.company.trim() || !d.stage || d.sectors.length === 0))
      return isFounder ? 'Add your company name, stage and at least one sector.' : 'Add your fund name, stages and at least one sector.';
    if (step === 2 && (!d.ticket || d.regions.length === 0)) return 'Choose a ticket size and at least one region.';
    if (step === 3 && (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email))) return 'Please add your name and a valid email.';
    return '';
  };

  const next = () => {
    const err = validate();
    setError(err);
    if (err) return;
    if (step === STEPS.length - 1) {
      // TODO: send `d` to your backend here, e.g. fetch('/api/match', { method: 'POST', body: JSON.stringify(d) })
      setDone(true);
      return;
    }
    setDir(1);
    setStep((s) => s + 1);
  };
  const back = () => {
    setError('');
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <section className={styles.wrap}>
      <div className={styles.bgRibbon} aria-hidden="true" />
      <div className={styles.shell}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
        >
          <div className="eyebrow">Get matched</div>
          <h1 className={styles.title}>
            Let’s find your <em className="accent">match.</em>
          </h1>
          <p className={styles.sub}>Four quick steps. About two minutes.</p>
        </motion.div>

        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease }}
        >
          {done ? (
            <Done name={d.name} isFounder={isFounder} />
          ) : (
            <>
              {/* progress */}
              <ol className={styles.steps}>
                {STEPS.map((s, i) => (
                  <li key={s} className={`${styles.stepItem} ${i <= step ? styles.stepOn : ''}`}>
                    <span className={styles.stepDot}>{i < step ? <Icon name="check" size={13} stroke={3} /> : i + 1}</span>
                    <span className={styles.stepLabel}>{s}</span>
                  </li>
                ))}
              </ol>
              <div className={styles.bar}>
                <motion.i animate={{ scaleX: (step + 1) / STEPS.length }} transition={{ duration: 0.6, ease }} />
              </div>

              <div className={styles.body}>
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -60 }}
                    transition={{ duration: 0.45, ease }}
                    className={styles.pane}
                  >
                    {step === 0 && (
                      <>
                        <h2 className={styles.q}>Which side of the table are you on?</h2>
                        <div className={styles.roles}>
                          {[
                            { v: 'founder' as const, t: 'I’m a founder', s: 'Raising capital for my startup', icon: 'rocket' },
                            { v: 'investor' as const, t: 'I’m an investor', s: 'Looking for aligned startups', icon: 'target' },
                          ].map((r) => (
                            <button
                              key={r.v}
                              type="button"
                              className={`${styles.role} ${d.role === r.v ? styles.roleOn : ''}`}
                              aria-pressed={d.role === r.v}
                              onClick={() => setD((s) => ({ ...s, role: r.v }))}
                            >
                              <span className={styles.roleIcon}><Icon name={r.icon} size={26} /></span>
                              <b>{r.t}</b>
                              <small>{r.s}</small>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <h2 className={styles.q}>{isFounder ? 'Tell us about your company' : 'Tell us about your fund'}</h2>
                        <div className={f.row2}>
                          <label className={f.field}>
                            <span className={f.label}>{isFounder ? 'Company name' : 'Fund / firm name'}</span>
                            <input className={f.input} value={d.company} onChange={(e) => setD((s) => ({ ...s, company: e.target.value }))} />
                          </label>
                          <label className={f.field}>
                            <span className={f.label}>Website (optional)</span>
                            <input className={f.input} value={d.website} placeholder="https://" onChange={(e) => setD((s) => ({ ...s, website: e.target.value }))} />
                          </label>
                        </div>
                        <Chips label={isFounder ? 'Stage' : 'Stage you invest in'} options={STAGES} isOn={(v) => d.stage === v} onPick={(v) => setD((s) => ({ ...s, stage: v }))} />
                        <Chips label="Sectors" options={SECTORS} isOn={(v) => d.sectors.includes(v)} onPick={(v) => toggle('sectors', v)} />
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h2 className={styles.q}>{isFounder ? 'About the round' : 'About your cheques'}</h2>
                        <Chips label={isFounder ? 'How much are you raising?' : 'Typical ticket size'} options={TICKETS} isOn={(v) => d.ticket === v} onPick={(v) => setD((s) => ({ ...s, ticket: v }))} />
                        <Chips label={isFounder ? 'Where are your investors?' : 'Where do you invest?'} options={REGIONS} isOn={(v) => d.regions.includes(v)} onPick={(v) => toggle('regions', v)} />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <h2 className={styles.q}>Where should we send your matches?</h2>
                        <div className={f.row2}>
                          <label className={f.field}>
                            <span className={f.label}>Full name</span>
                            <input className={f.input} value={d.name} autoComplete="name" onChange={(e) => setD((s) => ({ ...s, name: e.target.value }))} />
                          </label>
                          <label className={f.field}>
                            <span className={f.label}>Work email</span>
                            <input className={f.input} type="email" value={d.email} autoComplete="email" onChange={(e) => setD((s) => ({ ...s, email: e.target.value }))} />
                          </label>
                        </div>
                        <p className={styles.legal}>
                          By continuing you agree to our <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy policy</Link>.
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {error && (
                <motion.p key={error} className={f.error} initial={{ opacity: 0 }} animate={{ opacity: 1, x: [0, -8, 8, -4, 0] }}>
                  {error}
                </motion.p>
              )}

              <div className={styles.nav}>
                <button type="button" className={`btn btn-ghost ${styles.navBtn}`} onClick={back} disabled={step === 0}>
                  Back
                </button>
                <button type="button" className={`btn btn-primary ${styles.navBtn}`} onClick={next}>
                  {step === STEPS.length - 1 ? 'Find my matches' : 'Continue'} <ArrowRight className="arrow" />
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Chips({ label, options, isOn, onPick }: {
  label: string;
  options: string[];
  isOn: (v: string) => boolean;
  onPick: (v: string) => void;
}) {
  return (
    <div className={f.field} style={{ marginTop: 22 }}>
      <span className={f.label}>{label}</span>
      <div className={f.chips}>
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={isOn(o)} className={`${f.chip} ${isOn(o) ? f.chipOn : ''}`} onClick={() => onPick(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Finish screen: a short "scanning" animation, then a confirmation. */
function Done({ name, isFounder }: { name: string; isFounder: boolean }) {
  const [scanning, setScanning] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setScanning(false), 2600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={styles.done}>
      <div className={styles.radar} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={styles.pulse} style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
        <span className={styles.radarCore}>
          {scanning ? <Icon name="search" size={34} /> : <Icon name="check" size={36} stroke={2.4} />}
        </span>
      </div>
      <AnimatePresence mode="wait">
        {scanning ? (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className={styles.doneTitle}>Reading your profile…</h2>
            <p className={styles.doneText}>
              Comparing it against {isFounder ? 'investor theses' : 'startup profiles'} on stage, sector, size and region.
            </p>
          </motion.div>
        ) : (
          <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <h2 className={styles.doneTitle}>You’re in, {name.split(' ')[0]}.</h2>
            <p className={styles.doneText}>
              We’re preparing your first {isFounder ? 'investor' : 'startup'} matches and will email them to you within 24 hours.
            </p>
            <div className={styles.doneActions}>
              <Link href="/" className="btn btn-primary">Back to home <ArrowRight className="arrow" /></Link>
              <Link href={isFounder ? '/founders' : '/investors'} className="btn btn-ghost">
                Explore {isFounder ? 'founder' : 'investor'} tools
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
