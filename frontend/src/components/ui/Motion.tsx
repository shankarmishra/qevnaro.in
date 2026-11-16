import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';

/* ───────────────────────────── Custom cursor ───────────────────────────── */

/**
 * A dot that tracks the pointer and a ring that follows with lag. Grows over links and buttons;
 * elements with data-cursor="View" show that label inside the ring. Fine pointers only; the
 * native cursor stays visible.
 */
export const Cursor: React.FC = () => {
  const [on, setOn] = useState(false);
  const [label, setLabel] = useState('');
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine) return;
    setOn(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest?.('[data-cursor], a, button, [role="button"], summary');
      setHot(!!el);
      setLabel(el?.getAttribute('data-cursor') ?? '');
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  if (!on) return null;
  const size = label ? 88 : hot ? 46 : 30;
  return (
    <div className="pointer-events-none fixed inset-0 z-[9980]" aria-hidden="true">
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <span className="absolute -left-[3px] -top-[3px] block h-1.5 w-1.5 rounded-full bg-brand-blue" />
      </motion.div>
      <motion.div style={{ x: rx, y: ry }} className="absolute left-0 top-0">
        <motion.span
          animate={{ width: size, height: size, x: -size / 2, y: -size / 2 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className={`grid place-items-center rounded-full border ${
            label ? 'border-brand-navy bg-brand-navy text-white' : 'border-brand-navy/40'
          }`}
        >
          {label && <span className="t-micro text-[10px] text-white">{label}</span>}
        </motion.span>
      </motion.div>
    </div>
  );
};

/* ───────────────────────────── Count up ───────────────────────────── */

/** Counts from 0 to the value when scrolled into view. */
export const CountUp: React.FC<{ value: number; className?: string; duration?: number }> = ({ value, className, duration = 1.6 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(value);
  const started = useRef(false);
  useEffect(() => {
    if (!seen || started.current) return;
    started.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    const c = animate(0, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [seen, value, duration]);
  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  );
};

/* ───────────────────────────── Velocity marquee ───────────────────────────── */

/** A line of very large words that drifts sideways; scrolling speeds it up and can reverse it. */
export const VelocityMarquee: React.FC<{ items: string[]; baseSpeed?: number; className?: string }> = ({
  items,
  baseSpeed = 2.4,
  className = '',
}) => {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let move = dir.current * baseSpeed * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    base.set(base.get() - move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-[0.35em]">{t}</span>
          <svg viewBox="0 0 60 37" className="h-[0.32em] w-auto shrink-0 text-brand-blue" aria-hidden="true">
            <path d="M0 20 L35 0 L60 28 L45 36.5 L32 23 L15.5 31 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <motion.div style={{ x }} className="flex w-max">
        {row}
        {row}
      </motion.div>
    </div>
  );
};

/* ───────────────────────────── Hover preview ───────────────────────────── */

/**
 * A floating card that follows the pointer while it is over a list, showing a preview of the
 * hovered row. Rows call `show(id)` on enter; the container calls `hide()` on leave.
 */
export function useHoverPreview() {
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 });
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches), []);

  const bind = {
    onPointerMove: (e: React.PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    },
    onPointerLeave: () => setActive(null),
  };
  return { active: fine ? active : null, show: setActive, bind, sx, sy };
}

export const HoverCard: React.FC<{
  open: boolean;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  children: React.ReactNode;
}> = ({ open, x, y, children }) => (
  <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block" aria-hidden="true">
    <motion.div
      initial={false}
      animate={open ? { opacity: 1, scale: 1, rotate: -2 } : { opacity: 0, scale: 0.6, rotate: 4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="ml-8 -mt-28 w-72 overflow-hidden rounded-[var(--radius-lg)] border border-line-strong bg-surface shadow-[0_40px_80px_-30px_rgba(12,29,72,0.45)]"
    >
      {children}
    </motion.div>
  </motion.div>
);
