'use client';

import { useEffect, useRef, useState } from 'react';
import { effects } from '@/lib/site';
import { Icon } from '@/components/ui/Icons';
import { createRippleEngine } from './rippleEngine';
import { createWaterGL } from './waterGL';
import styles from './WaterRipple.module.css';

const KEY = 'tl-water-ripple';

/**
 * Site-wide water ripple that follows the cursor.
 * - The canvas is click-through (pointer-events: none), so links, buttons and scrolling are untouched.
 * - Pauses itself when idle, respects "reduce motion", skips touch-drag on phones.
 * - Optional on/off pill (bottom-left) for testing — switch it off in src/lib/site.ts.
 */
export default function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(effects.waterRipple);
  const [ready, setReady] = useState(false);

  // remember the visitor's choice
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved !== null) setOn(saved === '1');
    } catch {
      /* storage unavailable — keep default */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !on || !canvasRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // realistic WebGL water first; simple rings if the device can't run WebGL2
    const engine =
      (effects.waterRippleStyle === 'realistic' && createWaterGL(canvasRef.current)) ||
      createRippleEngine(canvasRef.current);
    return () => engine.destroy();
  }, [on, ready]);

  const toggle = () => {
    setOn((v) => {
      const next = !v;
      try {
        window.localStorage.setItem(KEY, next ? '1' : '0');
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return (
    <>
      {on && <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />}
      {effects.showRippleToggle && ready && (
        <button
          type="button"
          className={`${styles.toggle} ${on ? styles.on : ''}`}
          onClick={toggle}
          aria-pressed={on}
        >
          <span className={styles.dot}>
            <Icon name="drop" size={15} />
          </span>
          Water ripple {on ? 'on' : 'off'}
        </button>
      )}
    </>
  );
}
