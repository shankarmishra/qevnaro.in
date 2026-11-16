import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow, Reveal, SplitHeading } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { LineArt } from '../ui/line-art/LineArt';
import { industries } from '../../data/industries';
import { DUR, EASE } from '../../lib/motion';

/** Industries as an index: a list on the right, a drawing of the hovered one on the left. */
export const IndustriesSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section className="section-y border-t border-line bg-canvas" aria-labelledby="industries-heading">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Reveal><Eyebrow>Industries</Eyebrow></Reveal>
            <SplitHeading
              as="h2"
              text="Built around how your industry works."
              accent="industry"
              className="t-h1 mt-5 text-fg"
            />
            <span id="industries-heading" className="sr-only">Industries we work with</span>
          </div>
          <Reveal delay={0.1}>
            <Button to="/industries" variant="outline">All industries</Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: DUR.fast, ease: EASE }}
                >
                  <div className="mx-auto aspect-[4/3] w-full max-w-sm text-brand-navy" aria-hidden="true">
                    <LineArt kind={current.art} />
                  </div>
                  <p className="t-micro mt-6 text-fg-muted">{current.name}</p>
                  <p className="mt-2 text-[17px] leading-snug text-fg">{current.tagline}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <ul className="border-t border-line-strong lg:col-span-7">
            {industries.map((ind, i) => {
              const on = i === active;
              return (
                <li key={ind.slug} className="border-b border-line">
                  <Link
                    to={`/industries/${ind.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center gap-5 py-5 sm:gap-8 sm:py-6"
                  >
                    <span className={`font-mono text-xs transition-colors ${on ? 'text-brand-sky' : 'text-fg-muted'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex-1 font-display text-2xl font-medium tracking-tight transition-all duration-500 sm:text-[2rem] ${
                        on ? 'translate-x-2 text-fg' : 'text-fg-muted group-hover:text-fg'
                      }`}
                    >
                      {ind.name}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        on ? 'border-brand-navy bg-brand-navy text-white' : 'border-line-strong text-fg-muted'
                      }`}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
