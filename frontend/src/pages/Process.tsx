import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Check, Inbox, Package, Wrench } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { PageHero, SectionHead } from '../components/ui/PageHero';
import { FinalCTA } from '../components/home/FinalCTA';
import { PRINCIPLES, STEPS } from '../data/process';
import { site } from '../lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How a project runs at Qevnaro',
  description: 'The five stages every Qevnaro project goes through, from discovery to ongoing support.',
  url: `${site.url}/process`,
  step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.summary })),
};

const Column: React.FC<{ icon: React.ReactNode; title: string; items: string[] }> = ({ icon, title, items }) => (
  <div>
    <p className="t-micro flex items-center gap-2 text-fg-muted">{icon}{title}</p>
    <ul className="mt-4 space-y-3">
      {items.map((d) => (
        <li key={d} className="flex gap-2.5 text-[15px] leading-snug text-fg-soft">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
          {d}
        </li>
      ))}
    </ul>
  </div>
);

export const Process: React.FC = () => {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.6', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Our Process: How a Project Runs at Qevnaro"
        description="How Qevnaro works: Discover, Strategize, Create & Build, Launch & Optimize, Grow & Support. What we do, what you get and what we need from you at every step."
        path="/process"
        jsonLd={jsonLd}
      />

      <PageHero
        layout="center"
        crumbs={[{ label: 'Process' }]}
        eyebrow="How we work"
        title="Five steps, no surprises."
        accent="no surprises."
        lead="Every project follows the same path. At each step you can see what we do, what you get and what we need from you, so nothing depends on guesswork."
        actions={<Button to="/contact">Start with a conversation</Button>}
      />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <ol ref={list} className="relative">
            <span className="absolute bottom-0 left-[23px] top-0 w-px bg-line-strong" aria-hidden="true" />
            <motion.span style={{ scaleY: fill }} className="absolute bottom-0 left-[23px] top-0 w-px origin-top bg-brand-blue" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.num} delay={0.03 * i} className="relative pb-20 pl-20 last:pb-0 sm:pl-24">
                  <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-surface font-mono text-sm text-fg">
                    {s.num}
                  </span>
                  <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-4">
                      <h2 className="t-h1 text-fg">{s.title}</h2>
                      <p className="t-lead mt-4 text-fg-soft">{s.summary}</p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
                      <Column icon={<Wrench className="h-3.5 w-3.5" />} title="What we do" items={s.we} />
                      <Column icon={<Package className="h-3.5 w-3.5" />} title="What you get" items={s.you} />
                      <Column icon={<Inbox className="h-3.5 w-3.5" />} title="What we need" items={s.need} />
                    </div>
                  </div>
                </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow="Working principles" title="The rules we hold ourselves to" accent="ourselves" />
          <ul className="mt-12 grid gap-x-10 border-t border-line-strong sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.t} delay={(i % 3) * 0.05} className="h-full border-b border-line py-7">
                  <span className="font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3 mt-3 text-fg">{p.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{p.d}</p>
                </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA heading="Ready for step one?" accent="step one?" body="Tell us what you want to build or improve. A discovery conversation is the best place to begin." />
    </div>
  );
};

export default Process;
