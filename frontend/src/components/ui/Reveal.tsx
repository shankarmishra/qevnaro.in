import React from 'react';
import { motion } from 'framer-motion';
import { DUR, EASE, viewport } from '../../lib/motion';

/** Fade + rise reveal when scrolled into view. */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Render as a list item when the reveal wraps one item of a list. */
  as?: 'div' | 'li';
}> = ({ children, delay = 0, y = 24, className, as = 'div' }) => {
  const Tag = as === 'li' ? motion.li : motion.div;
  return (
  <Tag
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewport}
    transition={{ duration: DUR.base, delay, ease: EASE }}
  >
    {children}
  </Tag>
  );
};

/**
 * Word-by-word masked headline reveal.
 * The words are real text nodes (readable by crawlers and screen readers).
 * Pass `accent` to set one or more words in the serif italic, e.g. accent="growth."
 */
export const SplitHeading: React.FC<{
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
  accent?: string;
  /** Animate on mount instead of when scrolled into view (for above-the-fold headings). */
  immediate?: boolean;
}> = ({ text, as = 'h2', className, delay = 0, accent, immediate }) => {
  const Tag = motion[as];
  const accents = accent ? accent.split(' ') : [];
  const words = text.split(' ');
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport };
  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className={accents.includes(w) ? 'serif-accent inline-block' : 'inline-block'}
              variants={{
                hidden: { y: '112%' },
                show: { y: 0, transition: { duration: DUR.slow, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
};

/** Small section label: the logo's chevron, then mono caps. */
export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string; tone?: 'dark' | 'light' }> = ({
  children,
  className = '',
  tone = 'dark',
}) => (
  <div className={`t-micro inline-flex items-center gap-2.5 ${tone === 'light' ? 'text-white/70' : 'text-fg-muted'} ${className}`}>
    <svg viewBox="0 0 60 37" className="h-2.5 w-auto shrink-0 text-brand-blue" aria-hidden="true">
      <path d="M0 20 L35 0 L60 28 L45 36.5 L32 23 L15.5 31 Z" fill="currentColor" />
    </svg>
    {children}
  </div>
);
