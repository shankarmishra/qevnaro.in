import type { Variants } from 'framer-motion';

/** One easing and three durations for the whole site. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DUR = { fast: 0.35, base: 0.7, slow: 1.1 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const viewport = { once: true, margin: '-80px' } as const;

/** Extra delay for above-the-fold entrances while the once-per-session brand intro plays. */
export const introDelay = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('intro') ? 1.15 : 0;
