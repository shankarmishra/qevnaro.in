import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../../lib/projects';
import { SERVICES_LIST } from '../../data/services';
import { industries } from '../../data/industries';
import { CountUp } from '../ui/Motion';

const FACTS = [
  { value: projects.length, label: 'live products built end to end' },
  { value: SERVICES_LIST.length, label: 'services under one roof' },
  { value: industries.length, label: 'industries we plan for' },
  { value: 6, label: 'markets served: India, USA, UAE, UK, Australia, Canada' },
];

/** Plain, checkable facts in place of vanity metrics. */
export const ProofStrip: React.FC = () => (
  <section className="border-y border-line bg-surface" aria-label="Qevnaro at a glance">
    <div className="container-x grid gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:items-end lg:gap-x-10">
      <div>
        <p className="t-micro text-fg-muted">Live products we built</p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Visit"
                className="group inline-flex items-center gap-1.5 font-display text-2xl font-medium tracking-tight text-fg"
              >
                <span className="link-underline">{p.name}</span>
                <ArrowUpRight className="h-4 w-4 text-brand-blue transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      {FACTS.map((f) => (
        <div key={f.label} className="border-l border-line pl-5">
          <CountUp value={f.value} className="block font-display text-5xl font-medium leading-none tracking-[-0.04em] text-fg tabular-nums" />
          <p className="mt-3 text-[13px] leading-snug text-fg-muted">{f.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ProofStrip;
