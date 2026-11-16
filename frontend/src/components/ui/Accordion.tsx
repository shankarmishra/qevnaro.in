import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { DUR, EASE } from '../../lib/motion';

/** Hairline FAQ list. Answers stay in the DOM so crawlers always get them. */
export const Accordion = ({ items }: { items: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line-strong">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line-strong">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`font-display text-lg font-medium leading-snug tracking-tight transition-colors sm:text-xl ${
                    isOpen ? 'text-fg' : 'text-fg-soft group-hover:text-fg'
                  }`}
                >
                  {f.q}
                </span>
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? 'rotate-45 border-brand-navy bg-brand-navy text-white'
                      : 'border-line-strong text-fg-muted group-hover:border-fg group-hover:text-fg'
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <motion.div
              id={`faq-${i}`}
              role="region"
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: DUR.fast, ease: EASE }}
              className="overflow-hidden"
              style={{ visibility: isOpen ? 'visible' : 'hidden' }}
            >
              <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-relaxed text-fg-soft sm:text-base">{f.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
