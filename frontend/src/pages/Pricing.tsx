import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { Accordion } from '../components/ui/Accordion';
import { PageHero, SectionHead } from '../components/ui/PageHero';
import { SEO } from '../components/ui/SEO';
import { FinalCTA } from '../components/home/FinalCTA';
import { PRICING, PRICING_FAQS, PRICING_MODELS } from '../data/pricing';
import { SERVICE_SHORT } from '../data/services';
import { faqSchema } from '../lib/schema';

const ALWAYS = [
  'A written scope, timeline and price before any work starts',
  'One point of contact who knows your project',
  'Regular previews, not a big reveal at the end',
  'Analytics and tracking set up as part of the build',
  'Handover of code, designs, accounts and documentation',
];

export default function Pricing() {
  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Pricing: How Website, App, SEO and Marketing Projects Are Priced"
        description="How Qevnaro prices website and app development, e-commerce, SEO, advertising, branding and AI automation: the pricing models we use, what moves the cost up or down, and what is always included."
        path="/pricing"
        jsonLd={faqSchema(PRICING_FAQS)}
      />

      <PageHero
        layout="center"
        crumbs={[{ label: 'Pricing' }]}
        eyebrow="Pricing"
        title="Priced by scope, agreed in writing."
        accent="in writing."
        lead="We do not publish a single number, because the honest price depends on what you need. This page explains how we charge, what makes a project cost more or less, and what you always get."
        actions={<Button to="/contact">Get a written quote</Button>}
      />

      {/* Models */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="How we charge" title="Three ways of working" accent="working" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {PRICING_MODELS.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-canvas p-8">
                  <span className="serif-accent text-4xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3 mt-5 text-fg">{m.title}</h3>
                  <p className="t-micro mt-2 text-fg-muted">Best for: {m.best}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-fg-soft">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cost drivers per group */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead
            eyebrow="What moves the cost"
            title="The things that make a project cost more or less"
            accent="more or less"
            intro="Find the kind of work you need. The list beside it is what we will ask about on the first call."
          />
          <div className="mt-12 border-t border-line-strong">
            {PRICING.map((p) => (
              <Reveal key={p.group}>
                <article className="grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <h3 className="t-h2 text-fg">{p.group}</h3>
                    <p className="t-micro mt-3 text-brand-sky">{p.model}</p>
                    <p className="mt-4 font-display text-lg font-medium tracking-tight text-fg">
                      {p.range ?? 'Quoted after a scoping call'}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.services.map((s) => (
                        <li key={s}>
                          <Link to={`/services/${s}`} className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 py-1 text-[13px] text-fg-soft transition-colors hover:border-fg hover:text-fg">
                            {SERVICE_SHORT[s]} <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2 lg:col-span-8">
                    {p.drivers.map((d) => (
                      <li key={d} className="flex gap-3 text-[15px] leading-snug text-fg-soft">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Always included + FAQ */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="notch-tr bg-brand-navy p-8 text-white sm:p-10 lg:sticky lg:top-28">
              <p className="t-micro text-white/60">Whatever the price</p>
              <h2 className="t-h3 mt-3 text-white">What you always get</h2>
              <ul className="mt-6 space-y-3.5">
                {ALWAYS.map((a) => (
                  <li key={a} className="flex gap-3 text-[15px] leading-snug text-white/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7FA8FF]" />
                    {a}
                  </li>
                ))}
              </ul>
              <Button to="/contact" variant="light" className="mt-9 w-full">Ask for a quote</Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHead eyebrow="FAQ" title="Questions about cost" />
            <div className="mt-10"><Accordion items={PRICING_FAQS} /></div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Want a real number for your project?"
        accent="your project?"
        body="Describe what you need in a few lines. We will come back with scope, timeline and cost in writing."
      />
    </div>
  );
}
