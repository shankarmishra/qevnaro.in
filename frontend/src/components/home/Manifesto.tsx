import React from 'react';
import { Eyebrow, Reveal } from '../ui/Reveal';
import { TextReveal } from '../ui/TextReveal';
import { Button } from '../ui/Button';

const PROBLEMS = [
  'A website that looks fine but brings in no enquiries.',
  'Ad spend that never turns into learning.',
  'A brand that looks different on every channel.',
  'Manual follow-ups that eat the week.',
];

/** Who we are, in one paragraph that reads itself as you scroll. */
export const Manifesto: React.FC = () => (
  <section id="intro" className="section-y scroll-mt-20 bg-canvas">
    <div className="container-x">
      <Reveal><Eyebrow>Who we are</Eyebrow></Reveal>
      <h2 className="sr-only">One partner for technology, design and marketing</h2>
      <TextReveal
        className="mt-8 max-w-[62rem] font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.14] tracking-[-0.03em] text-fg"
        text="Most businesses hire one vendor for the website, another for ads, a third for the brand and nobody for what happens in between. Qevnaro puts strategy, design, engineering and marketing in *one* *team,* so what we build and how it grows are planned *together.*"
      />

      <div className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="t-micro text-fg-muted">The problems we are usually called in for</p>
        </Reveal>
        <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:col-span-8">
          {PROBLEMS.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 0.06} className="flex gap-4 text-[17px] leading-snug text-fg-soft">
                <span className="mt-1 font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                {p}
              </Reveal>
          ))}
        </ul>
      </div>

      <Reveal className="mt-12">
        <Button to="/about" variant="outline">About Qevnaro</Button>
      </Reveal>
    </div>
  </section>
);

export default Manifesto;
