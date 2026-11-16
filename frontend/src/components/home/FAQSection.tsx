import React from 'react';
import { Eyebrow, Reveal, SplitHeading } from '../ui/Reveal';
import { Accordion } from '../ui/Accordion';
import { Button } from '../ui/Button';
import { GLOBAL_FAQS } from '../../data/faqs';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GLOBAL_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export const FAQSection: React.FC = () => (
  <section className="section-y border-t border-line bg-surface" aria-labelledby="faq-heading">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
          <SplitHeading as="h2" text="Questions, answered plainly." accent="plainly." className="t-h1 mt-5 text-fg" />
          <span id="faq-heading" className="sr-only">Frequently asked questions</span>
          <Reveal delay={0.1}>
            <p className="t-lead mt-5 text-fg-soft">
              How we work, what we offer and what to expect. Not seeing your question? Ask us directly.
            </p>
            <Button to="/contact" variant="outline" className="mt-7">Ask a question</Button>
          </Reveal>
        </div>
      </div>
      <Reveal className="lg:col-span-8">
        <Accordion items={GLOBAL_FAQS} />
      </Reveal>
    </div>
  </section>
);

export default FAQSection;
