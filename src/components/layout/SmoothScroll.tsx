'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';

/**
 * - Lenis: buttery smooth scrolling. `anchors` makes links like #journey glide.
 * - MotionConfig reducedMotion="user": visitors who turned animations off in their
 *   OS get a calm version, decided on the client (no hydration errors).
 * - RouteScroll: new page → start at the top, or glide to #section if the link has one.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          lerp: 0.09,
          smoothWheel: true,
          anchors: { offset: -88 },
        }}
      >
        <RouteScroll />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}

function RouteScroll() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    if (hash) {
      const t = window.setTimeout(() => {
        const el = document.querySelector(hash);
        if (el instanceof HTMLElement) lenis.scrollTo(el, { offset: -88, duration: 1.4 });
      }, 450);
      return () => window.clearTimeout(t);
    }
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}
