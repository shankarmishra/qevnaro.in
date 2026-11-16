import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { Accordion } from '../../components/ui/Accordion';
import { PageHero, SectionHead } from '../../components/ui/PageHero';
import { QuickAnswer } from '../../components/ui/QuickAnswer';
import { SEO } from '../../components/ui/SEO';
import { FinalCTA } from '../../components/home/FinalCTA';
import { NotFound } from '../NotFound';
import { CITY_SERVICES } from '../../data/cityServices';
import { COUNTRIES, COUNTRY_SERVICE_SLUGS, getCountry } from '../../data/geo';
import { faqSchema } from '../../lib/schema';
import { site } from '../../lib/site';

const PROCESS = [
  'A first call in your working hours to understand the goal',
  'A written proposal with scope, timeline and a fixed price in your currency',
  'Daily written updates and a shared board you can check any time',
  'Previews of work at every milestone, with your feedback built in',
  'Launch, handover of code and accounts, and optional ongoing support',
];

/** /global lists the markets; /global/:country explains how working with us from that country runs. */
export default function GlobalPage() {
  const { country: slug } = useParams<{ country?: string }>();
  if (!slug) return <GlobalIndex />;
  const country = getCountry(slug);
  if (!country) return <NotFound />;

  const path = `/global/${country.slug}`;
  return (
    <div className="bg-canvas text-fg">
      <SEO
        title={`Web Development & Digital Marketing Agency for ${country.name} Businesses | Qevnaro`}
        description={`How businesses in ${country.short} work with Qevnaro's team in India: time-zone overlap, communication, ${country.currency} billing, privacy and compliance, and the services most often hired.`}
        path={path}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `Web development and digital marketing for ${country.name}`,
            provider: { '@id': `${site.url}/#organization`, '@type': 'Organization', name: site.name },
            areaServed: { '@type': 'Country', name: country.name },
            url: site.url + path,
          },
          faqSchema(country.faqs),
        ]}
      />

      <PageHero
        layout="center"
        crumbs={[{ label: 'Global', to: '/global' }, { label: country.name }]}
        eyebrow={`${country.name} · ${country.currency}`}
        title={`An India-based team for businesses in ${country.short}.`}
        accent={`${country.short === 'the US' ? 'US.' : `${country.short}.`}`}
        lead={country.buyers}
        actions={<Button to="/contact">Book a call in your time zone</Button>}
      />

      <QuickAnswer
        q={`How does working with Qevnaro from ${country.short} work?`}
        a={`${country.overlap} ${country.engagement}`}
      />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-3">
          {[
            ['Time zones', country.overlap],
            ['Day to day', country.workingWith],
            ['Privacy and compliance', country.compliance],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06} className="bg-surface p-8 sm:p-10">
              <span className="serif-accent text-4xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="t-h3 mt-4 text-fg">{k}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-soft">{v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead eyebrow={`Services for ${country.short}`} title="What clients here usually hire us for" accent="hire us for" />
            <ul className="mt-10 border-t border-line-strong">
              {COUNTRY_SERVICE_SLUGS.map((s) => (
                <li key={s} className="border-b border-line">
                  <Link to={`/services/${s}/${country.slug}`} className="group flex items-center justify-between gap-4 py-5">
                    <span className="t-h3 text-fg transition-transform duration-300 group-hover:translate-x-1.5">
                      {CITY_SERVICES[s].label} for {country.short}
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="notch-tr bg-brand-navy p-8 text-white sm:p-10 lg:sticky lg:top-28">
              <p className="t-micro text-white/60">How a project runs</p>
              <ol className="mt-5 space-y-4">
                {PROCESS.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-snug text-white/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7FA8FF]" />
                    {p}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title={`Working with us from ${country.short}`} />
            <p className="t-micro mt-10 text-fg-muted">Other markets</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {COUNTRIES.filter((c) => c.slug !== country.slug).map((c) => (
                <li key={c.slug}><Link to={`/global/${c.slug}`} className="link-underline text-[15px] text-fg-soft hover:text-fg">{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8"><Accordion items={country.faqs} /></div>
        </div>
      </section>

      <FinalCTA heading={`Based in ${country.short}? Let's talk.`} accent="talk." body={`Tell us what you need. We will reply with an approach, a timeline and a quote in ${country.currency}.`} />
    </div>
  );
}

function GlobalIndex() {
  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Global: Working with Qevnaro from the US, UAE, UK, Australia and Canada"
        description="Qevnaro works with businesses outside India from its team in Noida and Bengaluru. How it works for clients in the United States, UAE, United Kingdom, Australia and Canada."
        path="/global"
      />
      <PageHero
        crumbs={[{ label: 'Global' }]}
        eyebrow="Outside India"
        title="One team in India, clients around the world."
        accent="around the world."
        lead="We work with businesses in the United States, the UAE, the United Kingdom, Australia and Canada. Each market has its own time zone, currency and privacy rules; here is how we handle them."
        actions={<Button to="/contact">Book a call</Button>}
      />
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <ul className="border-t border-line-strong">
            {COUNTRIES.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 0.05} className="border-b border-line">
                  <Link to={`/global/${c.slug}`} className="group grid gap-3 py-8 lg:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)_auto] lg:items-center lg:gap-10">
                    <span className="font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="t-h2 text-fg transition-transform duration-300 group-hover:translate-x-1.5">{c.name}</h2>
                    <p className="text-[15px] leading-relaxed text-fg-soft">{c.overlap.split('. ')[0]}.</p>
                    <ArrowUpRight className="hidden h-5 w-5 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue lg:block" />
                  </Link>
                </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
