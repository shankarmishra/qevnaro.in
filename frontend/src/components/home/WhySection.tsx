import React from 'react';
import { Eyebrow, Reveal, SplitHeading } from '../ui/Reveal';
import { ServiceObject } from '../ui/ServiceObject';

const POINTS = [
  { title: 'Technology and marketing under one roof', desc: 'Engineering, design and growth work in one team, so the site we build and the campaigns we run are planned together instead of handed over between vendors.' },
  { title: 'Scope that starts from your objective', desc: 'We start from what you are trying to improve, then choose the scope and tools that serve it, not the other way around.' },
  { title: 'Design and development together', desc: 'Designers and engineers collaborate from the first wireframe, which keeps what is designed buildable and what is built faithful to the design.' },
  { title: 'Built for enquiries, not applause', desc: 'Clear journeys, fast pages and purposeful calls to action, so visitors can find what they need and take the next step.' },
  { title: 'Plain-language communication', desc: 'Regular updates, shared visibility of progress and honest explanations of trade-offs and costs.' },
  { title: 'Technology that scales with you', desc: 'Modern, well-supported stacks and modular architecture, so the product can grow without a rebuild every time requirements change.' },
  { title: 'Decisions based on data', desc: 'Analytics and measurement are set up early, so decisions rest on what users actually do.' },
  { title: 'Support after launch', desc: 'Launch is a milestone, not the end. We offer maintenance, monitoring and iteration after go-live.' },
];

/** The dark chapter of the home page: eight principles as cards that stack while you scroll. */
export const WhySection: React.FC = () => (
  <section className="relative bg-brand-navy text-white" aria-labelledby="why-heading">
    <div className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <Reveal><Eyebrow tone="light">Why Qevnaro</Eyebrow></Reveal>
          <SplitHeading as="h2" text="A partner, not a vendor." accent="vendor." className="t-h1 mt-5 text-white" />
          <span id="why-heading" className="sr-only">Why choose Qevnaro</span>
          <Reveal delay={0.1}>
            <p className="t-lead mt-5 max-w-md text-white/70">
              We work as an extension of your team, with technology, design and marketing aimed at the outcomes your
              business cares about.
            </p>
          </Reveal>
          <div className="mt-10 hidden aspect-square w-full max-w-sm rounded-[var(--radius-xl)] bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#e9edf7_55%,#cfd8ef_100%)] lg:block">
            <ServiceObject kind="automate" className="h-full w-full" />
          </div>
        </div>
      </div>

      <ol className="lg:col-span-7">
        {POINTS.map((p, i) => (
          <li
            key={p.title}
            className="sticky mb-5 last:mb-0"
            style={{ top: `calc(7rem + ${i * 14}px)`, zIndex: i + 1 }}
          >
            <div className="rounded-[var(--radius-lg)] border border-white/10 bg-[#11255a] p-8 shadow-[0_-24px_48px_-28px_rgba(0,0,0,0.6)] sm:p-10">
              <div className="flex items-start gap-6">
                <span className="serif-accent text-5xl leading-none text-[#7FA8FF]">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="t-h3 text-white">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">{p.desc}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default WhySection;
