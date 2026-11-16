import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { PageHero } from '../../components/ui/PageHero';
import { SEO } from '../../components/ui/SEO';
import { ServiceObject } from '../../components/ui/ServiceObject';
import { FinalCTA } from '../../components/home/FinalCTA';
import { industries } from '../../data/industries';
import { site } from '../../lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Industries Qevnaro works with',
  itemListElement: industries.map((ind, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: ind.name,
    url: `${site.url}/industries/${ind.slug}`,
  })),
};

export const IndustriesIndex: React.FC = () => (
  <div className="bg-canvas text-fg">
    <SEO
      title="Industries We Serve: Healthcare, Education, Real Estate, E-commerce, SaaS & More"
      description="Websites, marketing and technology planned around how each sector buys: healthcare, education, real estate, e-commerce, SaaS, hospitality, professional services, manufacturing and finance."
      path="/industries"
      jsonLd={jsonLd}
    />

    <PageHero
      crumbs={[{ label: 'Industries' }]}
      eyebrow={`${industries.length} sectors`}
      title="Built around how your industry actually buys."
      accent="actually buys."
      lead="A clinic, a developer and a SaaS team face different customers and different rules. Pick your sector to see the challenges we plan for and the work we would do."
      actions={<Button to="/contact">Discuss your industry</Button>}
      aside={
        <div className="aspect-square w-full overflow-hidden rounded-[var(--radius-xl)] border border-line bg-[radial-gradient(ellipse_at_50%_55%,#ffffff_0%,#F1F0EB_75%)]">
          <ServiceObject kind="brand" className="h-full w-full" />
        </div>
      }
    />

    <section className="section-y border-b border-line bg-surface">
      <div className="container-x">
        <ul className="border-t border-line-strong">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={(i % 4) * 0.04} className="border-b border-line">
                <Link
                  to={`/industries/${ind.slug}`}
                  className="group grid gap-4 py-8 lg:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)_auto] lg:items-center lg:gap-10"
                >
                  <span className="font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-brand-navy transition-colors duration-300 group-hover:border-brand-navy group-hover:bg-brand-navy group-hover:text-white">
                      <ind.icon className="h-5 w-5" />
                    </span>
                    <h2 className="t-h2 text-fg transition-transform duration-300 group-hover:translate-x-1.5">{ind.name}</h2>
                  </div>
                  <div>
                    <p className="text-[15px] leading-relaxed text-fg-soft">{ind.tagline}</p>
                    <p className="mt-2 text-[13px] text-fg-muted">
                      Typical first project: {ind.solutions[0].title}
                    </p>
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue lg:block" />
                </Link>
              </Reveal>
          ))}
        </ul>
      </div>
    </section>

    <FinalCTA
      heading="Don't see your sector?"
      accent="sector?"
      body="We work across more industries than listed here. Tell us about your business and we will say honestly whether we are the right fit."
    />
  </div>
);

export default IndustriesIndex;
