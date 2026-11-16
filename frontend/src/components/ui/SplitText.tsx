import React from 'react';

/**
 * Character-by-character masked reveal for display headings, driven by CSS so the heading paints
 * as soon as the stylesheet loads, without waiting for JavaScript (good for LCP). The full sentence
 * is in the heading as plain text (sr-only); the animated letters are aria-hidden. Words never
 * break across lines. While the once-per-session brand intro plays, the animation waits for it.
 */
export const SplitText: React.FC<{
  text: string;
  as?: 'h1' | 'h2' | 'p';
  className?: string;
  /** Space-separated words to set in the serif italic accent. */
  accent?: string;
  /** Kept for API compatibility; the reveal starts on its own. */
  play?: boolean;
  delay?: number;
  stagger?: number;
}> = ({ text, as = 'h1', className, accent, delay = 0, stagger = 0.02 }) => {
  const Tag = as;
  const accents = accent ? accent.split(' ') : [];
  const words = text.split(' ');
  let n = 0;
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <React.Fragment key={wi}>
            <span className="-mb-[0.16em] inline-block overflow-hidden whitespace-nowrap pb-[0.16em] align-bottom">
              <span className={accents.includes(w) ? 'serif-accent inline-block' : 'inline-block'}>
                {[...w].map((c, ci) => {
                  const i = n++;
                  return (
                    <span key={ci} className="split-char" style={{ animationDelay: `${(delay + i * stagger).toFixed(3)}s` }}>
                      {c}
                    </span>
                  );
                })}
              </span>
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </span>
    </Tag>
  );
};

export default SplitText;
