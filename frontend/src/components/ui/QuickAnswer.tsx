import React from 'react';

/**
 * A short, direct answer to the question the page exists for, placed right after the header.
 * Search engines and AI assistants quote passages like this; people skimming get the point at once.
 */
export const QuickAnswer: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <section className="border-b border-line bg-elevated" aria-label="Quick answer">
    <div className="container-x grid gap-4 py-10 sm:py-12 lg:grid-cols-12 lg:gap-16">
      <h2 className="t-micro pt-1 text-brand-sky lg:col-span-4">{q}</h2>
      <p className="text-[19px] leading-relaxed text-fg lg:col-span-8">{a}</p>
    </div>
  </section>
);

export default QuickAnswer;
