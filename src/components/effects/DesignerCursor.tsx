'use client';

import { useEffect, useRef } from 'react';
import styles from './DesignerCursor.module.css';

const HOVER_SELECTOR = 'a, button, [role="tab"], label, select, summary, input[type="range"], input[type="color"], [data-cursor]';
// only real typing fields get the normal caret (sliders, colour pickers etc. keep the circle)
const TEXT_SELECTOR =
  'textarea, [contenteditable="true"], input:not([type="range"]):not([type="color"]):not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"])';

/**
 * Designer cursor: a small dot that sticks to the pointer and a ring that
 * glides after it. The ring grows over links/buttons, shows a label over
 * elements with data-cursor="Label", and squeezes on click.
 * Only on devices with a real mouse; text fields keep the normal caret.
 */
export default function DesignerCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    root.classList.add('tl-cursor-on');

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let running = false;
    let visible = false;

    const render = () => {
      const k = reduce ? 1 : 0.2;
      pos.x += (mouse.x - pos.x) * k;
      pos.y += (mouse.y - pos.y) * k;
      scale += (targetScale - scale) * (reduce ? 1 : 0.18);
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;

      const settled =
        Math.abs(mouse.x - pos.x) < 0.1 && Math.abs(mouse.y - pos.y) < 0.1 && Math.abs(targetScale - scale) < 0.002;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(render);
    };
    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(render);
    };

    const show = (v: boolean) => {
      if (v === visible) return;
      visible = v;
      ring.classList.toggle(styles.visible, v);
      dot.classList.toggle(styles.visible, v);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        pos.x = mouse.x;
        pos.y = mouse.y;
      }
      show(true);
      kick();
    };

    const setMode = (target: EventTarget | null) => {
      const el = target instanceof Element ? target : null;
      const text = el?.closest(TEXT_SELECTOR);
      const hit = text ? null : el?.closest(HOVER_SELECTOR);
      const labelText = hit?.getAttribute('data-cursor') ?? '';

      ring.classList.toggle(styles.hover, !!hit && !labelText);
      ring.classList.toggle(styles.labelled, !!labelText);
      ring.classList.toggle(styles.hidden, !!text);
      // small controls (e.g. inside the Theme Lab) get a tighter ring so nothing is covered
      ring.classList.toggle(styles.compact, !!el?.closest('[data-cursor-compact]'));
      dot.classList.toggle(styles.hidden, !!text || !!labelText);
      label.textContent = labelText;
      targetScale = labelText ? 1 : 1;
      kick();
    };

    const onOver = (e: PointerEvent) => setMode(e.target);
    const onDown = () => {
      targetScale = 0.78;
      kick();
    };
    const onUp = () => {
      targetScale = 1;
      kick();
    };
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) show(false);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseout', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('tl-cursor-on');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true">
        <span ref={labelRef} className={styles.label} />
      </div>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
