import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SEO } from '../components/ui/SEO';
import { FinalCTA } from '../components/home/FinalCTA';
import { GLOSSARY } from '../data/glossary';
import { SERVICE_SHORT } from '../data/services';
import { site } from '../lib/site';

export default function Glossary() {
  const letters = Array.from(new Set(GLOSSARY.map((g) => g.term[0].toUpperCase())));
  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Glossary: Web, SEO, GEO, Marketing and AI Terms Explained"
        description="Plain-language definitions of the terms that come up in website, SEO, AI search, advertising and automation projects, from AEO and Core Web Vitals to RAG and ROAS."
        path="/glossary"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: 'Qevnaro glossary',
          url: `${site.url}/glossary`,
          hasDefinedTerm: GLOSSARY.map((g) => ({
            '@type': 'DefinedTerm',
            name: g.term,
            description: g.def,
            url: `${site.url}/glossary#${g.slug}`,
          })),
        }}
      />
      <PageHero
        crumbs={[{ label: 'Glossary' }]}
        eyebrow={`${GLOSSARY.length} terms`}
        title="The jargon, explained plainly."
        accent="plainly."
        lead="Terms that come up in website, search, advertising and automation projects, each in a sentence or two, with a link to the work it relates to."
      />

      <nav aria-label="Jump to letter" className="sticky top-[76px] z-20 border-b border-line bg-canvas/90 backdrop-blur">
        <div className="container-x flex flex-wrap gap-1 py-3">
          {letters.map((l) => (
            <a key={l} href={`#letter-${l}`} className="grid h-9 w-9 place-items-center rounded-full font-mono text-sm text-fg-soft hover:bg-elevated hover:text-fg">
              {l}
            </a>
          ))}
        </div>
      </nav>

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          {letters.map((l) => (
            <div key={l} id={`letter-${l}`} className="grid scroll-mt-40 gap-6 border-t border-line-strong py-10 lg:grid-cols-12">
              <p className="serif-accent text-6xl leading-none text-brand-blue lg:col-span-2">{l}</p>
              <dl className="lg:col-span-10">
                {GLOSSARY.filter((g) => g.term[0].toUpperCase() === l).map((g) => (
                  <div key={g.slug} id={g.slug} className="scroll-mt-40 border-b border-line py-6 last:border-b-0">
                    <dt className="t-h3 text-fg">{g.term}</dt>
                    <dd className="mt-2 max-w-3xl text-[17px] leading-relaxed text-fg-soft">{g.def}</dd>
                    {g.service && (
                      <dd className="mt-3">
                        <Link to={`/services/${g.service}`} className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-sky">
                          <span className="link-underline">{SERVICE_SHORT[g.service]}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA heading="Prefer a conversation to a glossary?" accent="conversation" body="Tell us what you are trying to do and we will explain the options in plain language." />
    </div>
  );
}
