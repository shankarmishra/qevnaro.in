import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { PageHero, SectionHead } from '../../components/ui/PageHero';
import { SEO } from '../../components/ui/SEO';
import { FinalCTA } from '../../components/home/FinalCTA';
import { CITIES, COUNTRIES, SECTOR_LABEL } from '../../data/geo';
import { site } from '../../lib/site';

export default function LocationsIndex() {
  const offices = CITIES.filter((c) => c.office);
  const remote = CITIES.filter((c) => !c.office);
  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Locations: Offices in Noida and Bengaluru, Clients Across India and Abroad"
        description={`Qevnaro has offices in Noida and Bengaluru and works with businesses in ${remote.map((c) => c.name).join(', ')}, and in the US, UAE, UK, Australia and Canada.`}
        path="/locations"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Qevnaro locations',
          itemListElement: CITIES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${site.url}/locations/${c.slug}` })),
        }}
      />
      <PageHero
        crumbs={[{ label: 'Locations' }]}
        eyebrow="Where we work"
        title="Two offices, clients everywhere."
        accent="everywhere."
        lead="Our team works from Noida and Bengaluru. We serve businesses across India's major cities remotely, and clients in five other countries."
        actions={<Button to="/contact">Talk to us</Button>}
      />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="Offices" title="Where you can find us" />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {offices.map((c) => (
              <Link key={c.slug} to={`/locations/${c.slug}`} className="group notch-tr bg-brand-navy p-8 text-white sm:p-10" data-cursor="View">
                <p className="t-micro text-white/60">{c.office!.locality} · {c.region}</p>
                <h2 className="t-h1 mt-4 text-white">{c.name}</h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">{c.market.split('. ')[0]}.</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-white">
                  <span className="link-underline">Qevnaro {c.name}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow="India" title="Cities we serve remotely" accent="remotely" />
          <ul className="mt-10 grid gap-x-10 border-t border-line-strong sm:grid-cols-2 lg:grid-cols-3">
            {remote.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 3) * 0.04} className="h-full border-b border-line">
                  <Link to={`/locations/${c.slug}`} className="group block py-6">
                    <span className="flex items-center justify-between">
                      <span className="t-h3 text-fg">{c.name}</span>
                      <ArrowUpRight className="h-4 w-4 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                    </span>
                    <span className="mt-2 block text-[13px] leading-snug text-fg-muted">{c.sectors.slice(0, 3).map((s) => SECTOR_LABEL[s]).join(' · ')}</span>
                  </Link>
                </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="Global" title="Outside India" />
          <ul className="mt-10 flex flex-wrap gap-3">
            {COUNTRIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/global/${c.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-canvas px-5 py-2.5 text-[15px] text-fg transition-colors hover:border-fg">
                  {c.name} <ArrowUpRight className="h-3.5 w-3.5 text-fg-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
