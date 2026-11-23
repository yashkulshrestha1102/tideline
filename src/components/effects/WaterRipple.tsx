'use client';

import { useEffect, useRef } from 'react';
import { effects } from '@/lib/site';
import { createRippleEngine } from './rippleEngine';
import { createWaterGL } from './waterGL';
import styles from './WaterRipple.module.css';

/**
 * Site-wide water ripple that follows the cursor (always on).
 * The canvas is click-through, so links, buttons and scrolling are untouched.
 * It sleeps when idle and respects the visitor's "reduce motion" setting.
 */
export default function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!effects.waterRipple || !canvasRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // realistic WebGL water first; simple rings if the device can't run WebGL2
    const engine =
      (effects.waterRippleStyle === 'realistic' && createWaterGL(canvasRef.current)) ||
      createRippleEngine(canvasRef.current);
    return () => engine.destroy();
  }, []);

  if (!effects.waterRipple) return null;
  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
