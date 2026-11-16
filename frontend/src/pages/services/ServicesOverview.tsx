import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, SectionHead } from '../../components/ui/PageHero';
import { Reveal } from '../../components/ui/Reveal';
import { Button } from '../../components/ui/Button';
import { SEO } from '../../components/ui/SEO';
import { LineArt } from '../../components/ui/line-art/LineArt';
import { FinalCTA } from '../../components/home/FinalCTA';
import { SERVICE_GROUPS, SERVICES_LIST, SERVICE_SHORT } from '../../data/services';
import { site } from '../../lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Qevnaro services',
  itemListElement: SERVICES_LIST.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.title,
    url: `${site.url}/services/${s.slug}`,
  })),
};

const FIT = [
  { title: 'Starting from zero', desc: 'Brand, website and the first channels, sequenced so each step pays for the next.', links: ['branding', 'web-development', 'seo'] },
  { title: 'Growing what exists', desc: 'More qualified enquiries from the site and channels you already have.', links: ['digital-marketing', 'performance-marketing', 'geo-aeo'] },
  { title: 'Removing manual work', desc: 'Automate follow-ups, reporting and support so the team can focus on customers.', links: ['marketing-automation', 'ai-automation', 'chatbots-agents'] },
];

export function ServicesOverview() {
  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Services: Web, Apps, SEO, Marketing, Branding & AI Automation"
        description={`All ${SERVICES_LIST.length} Qevnaro services in one place: website and app development, e-commerce, UI/UX, SEO, GEO, performance marketing, social media, branding, content, video, AI automation, chatbots and cloud.`}
        path="/services"
        jsonLd={jsonLd}
      />

      <PageHero
        crumbs={[{ label: 'Services' }]}
        eyebrow={`${SERVICES_LIST.length} services · one team`}
        title="Everything you need to build and grow online."
        accent="grow online."
        lead="Four groups of work that are usually bought from four different vendors. We plan them together, so the site, the brand, the marketing and the automation all pull in the same direction."
        actions={
          <>
            <Button to="/contact">Talk to us about scope</Button>
            <Button to="/pricing" variant="outline">How pricing works</Button>
          </>
        }
      />

      {SERVICE_GROUPS.map((g, gi) => (
        <section key={g.key} className={`section-y border-b border-line ${gi % 2 ? 'bg-canvas' : 'bg-surface'}`}>
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="flex items-baseline gap-4">
                  <span className="serif-accent text-5xl leading-none text-brand-blue">{g.n}</span>
                  <span className="t-micro text-fg-muted">{g.key}</span>
                </div>
                <h2 className="t-h1 mt-5 text-fg">{g.verb}</h2>
                <p className="t-lead mt-4 text-fg-soft">{g.blurb}</p>
                <div className="mt-8 hidden w-56 text-brand-navy/25 lg:block" aria-hidden="true">
                  <LineArt kind={g.art} />
                </div>
              </div>
            </div>

            <ul className="border-t border-line-strong lg:col-span-8">
              {g.services.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 0.04} className="border-b border-line">
                    <Link to={`/services/${s.slug}`} className="group grid gap-2 py-7 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] sm:items-center sm:gap-8">
                      <h3 className="t-h3 text-fg transition-transform duration-300 group-hover:translate-x-1.5">
                        {s.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-fg-soft">{s.shortDesc}</p>
                      <span className="hidden h-10 w-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-all duration-300 group-hover:border-brand-navy group-hover:bg-brand-navy group-hover:text-white sm:grid" aria-hidden="true">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section-y border-b border-line bg-elevated">
        <div className="container-x">
          <SectionHead eyebrow="Where to start" title="Pick the situation that sounds like yours" accent="yours" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {FIT.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-8">
                  <h3 className="t-h3 text-fg">{f.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-soft">{f.desc}</p>
                  <ul className="mt-6 border-t border-line">
                    {f.links.map((slug) => (
                      <li key={slug} className="border-b border-line">
                        <Link to={`/services/${slug}`} className="group flex items-center justify-between py-3 text-[15px] font-medium text-fg hover:text-brand-sky">
                          {SERVICE_SHORT[slug]}
                          <ArrowUpRight className="h-4 w-4 text-fg-muted group-hover:text-brand-blue" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA heading="Not sure which service you need?" accent="need?" body="Describe the goal and we will suggest the smallest scope that gets you there." />
    </div>
  );
}

export default ServicesOverview;
