import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Eyebrow, Reveal, SplitHeading } from '../ui/Reveal';

export const PROCESS_STEPS = [
  {
    n: '01', title: 'Discover',
    desc: 'We understand your business, audience and goals before proposing anything.',
    does: ['Stakeholder conversations and goal setting', 'Audience and market understanding', 'Review of your existing site, product and channels'],
    gets: ['A shared understanding of objectives', 'Clear priorities and constraints'],
  },
  {
    n: '02', title: 'Strategize',
    desc: 'We define scope, architecture, creative direction and growth strategy.',
    does: ['Scope and technical architecture', 'Creative direction and information structure', 'Growth and measurement plan'],
    gets: ['A written plan and roadmap', 'Agreed scope, milestones and approach'],
  },
  {
    n: '03', title: 'Create & Build',
    desc: 'We design, develop, write, integrate and execute.',
    does: ['UI/UX design and brand work', 'Front-end, back-end and integrations', 'Content, creative and campaign setup'],
    gets: ['Working builds you can review early', 'Regular demos and feedback loops'],
  },
  {
    n: '04', title: 'Launch & Optimize',
    desc: 'We test, deploy, measure and refine.',
    does: ['Quality assurance and performance checks', 'Deployment and go-live support', 'Tracking, measurement and refinement'],
    gets: ['A tested, launched product or campaign', 'Data to guide the next improvements'],
  },
  {
    n: '05', title: 'Grow & Support',
    desc: 'Maintenance, insights, optimisation and ongoing improvements.',
    does: ['Maintenance and monitoring', 'Reporting and insight', 'Continued optimisation and new features'],
    gets: ['A partner after launch', 'A steady cycle of improvement'],
  },
];

/** Five steps on a timeline whose line fills as you scroll past. */
export const ProcessSection: React.FC = () => {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.7', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="section-y border-t border-line bg-surface" aria-labelledby="process-heading">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal><Eyebrow>How we work</Eyebrow></Reveal>
            <SplitHeading
              as="h2"
              text="From first conversation to steady growth."
              accent="steady growth."
              className="t-h1 mt-5 text-fg"
            />
            <span id="process-heading" className="sr-only">Our process</span>
            <Reveal delay={0.1}>
              <Link to="/process" className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-fg">
                <span className="link-underline">See the full process</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>

        <ol ref={list} className="relative lg:col-span-8">
          <span className="absolute bottom-0 left-[19px] top-0 w-px bg-line-strong" aria-hidden="true" />
          <motion.span
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-brand-blue"
            aria-hidden="true"
          />
          {PROCESS_STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={0.04 * i} className="relative grid gap-6 pb-14 pl-16 last:pb-0 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:gap-10">
                <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface font-mono text-xs text-fg">
                  {s.n}
                </span>
                <div>
                  <h3 className="t-h2 text-fg">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-soft">{s.desc}</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="t-micro text-fg-muted">What we do</p>
                    <ul className="mt-3 space-y-2.5">
                      {s.does.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm leading-snug text-fg-soft">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-blue" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="t-micro text-fg-muted">What you get</p>
                    <ul className="mt-3 space-y-2.5">
                      {s.gets.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm leading-snug text-fg-soft">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-blue" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
