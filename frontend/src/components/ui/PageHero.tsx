import React from 'react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from './Breadcrumbs';
import { Eyebrow, SplitHeading } from './Reveal';
import { SplitText } from './SplitText';
import { ShaderField } from './ShaderField';
import { DUR, EASE } from '../../lib/motion';

/**
 * Shared header for inner pages, in three layouts so pages do not all look alike:
 * - split:  copy beside a visual (pass `aside`) — services, industries, locations
 * - center: centred copy over a flowing light field — about, pricing, process, contact
 * - type:   oversized headline, no visual — work, insights, articles
 * Default is `split` when an aside is given, otherwise `type`.
 */
export const PageHero: React.FC<{
  crumbs: { label: string; to?: string }[];
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  note?: React.ReactNode;
  layout?: 'split' | 'center' | 'type';
}> = ({ crumbs, eyebrow, title, accent, lead, actions, aside, note, layout }) => {
  const mode = layout ?? (aside ? 'split' : 'type');

  const body = (
    <div className="fade-up" style={{ animationDelay: '0.45s' }}>
      {lead && <p className={`t-lead mt-6 text-fg-soft ${mode === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{lead}</p>}
      {actions && <div className={`mt-9 flex flex-wrap items-center gap-3 ${mode === 'center' ? 'justify-center' : ''}`}>{actions}</div>}
      {note && <div className={`mt-8 text-[13px] leading-relaxed text-fg-muted ${mode === 'center' ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>{note}</div>}
    </div>
  );

  if (mode === 'center') {
    return (
      <section className="relative isolate overflow-hidden border-b border-line pb-20 pt-32 sm:pb-28 sm:pt-44">
        <ShaderField tone="light" className="-z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-canvas to-transparent" aria-hidden="true" />
        <div className="container-x text-center">
          <div className="flex justify-center"><Breadcrumbs items={crumbs} /></div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <SplitText as="h1" delay={0.1} text={title} accent={accent} className="t-h1 mx-auto mt-5 max-w-5xl text-fg" />
          {body}
        </div>
      </section>
    );
  }

  if (mode === 'type') {
    return (
      <section className="relative border-b border-line bg-canvas pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="container-x">
          <Breadcrumbs items={crumbs} />
          <Eyebrow>{eyebrow}</Eyebrow>
          <SplitText as="h1" delay={0.1} text={title} accent={accent} className={`mt-6 text-fg ${title.length > 48 ? 't-h1 max-w-5xl' : 't-display max-w-[16ch]'}`} />
          <div className="mt-2 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:col-start-6">{body}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative border-b border-line bg-canvas pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Breadcrumbs items={crumbs} />
          <Eyebrow>{eyebrow}</Eyebrow>
          <SplitText as="h1" delay={0.1} text={title} accent={accent} className="t-h1 mt-5 text-fg" />
          {body}
        </div>
        {aside && (
          <motion.div
            className="hidden lg:col-span-5 lg:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.3 }}
          >
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  );
};

/** Section heading block used across inner pages. */
export const SectionHead: React.FC<{
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: React.ReactNode;
  className?: string;
}> = ({ eyebrow, title, accent, intro, className = '' }) => (
  <div className={`max-w-3xl ${className}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <SplitHeading as="h2" text={title} accent={accent} className="t-h2 mt-5 text-fg" />
    {intro && <p className="t-lead mt-5 text-fg-soft">{intro}</p>}
  </div>
);

export default PageHero;
