import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Check, Globe2, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { Accordion } from '../../components/ui/Accordion';
import { PageHero, SectionHead } from '../../components/ui/PageHero';
import { QuickAnswer } from '../../components/ui/QuickAnswer';
import { SEO } from '../../components/ui/SEO';
import { FinalCTA } from '../../components/home/FinalCTA';
import { NotFound } from '../NotFound';
import { CITY_SERVICES, cityFaqs, servicesForCity } from '../../data/cityServices';
import { COUNTRY_SERVICE_ANGLE, COUNTRY_SERVICE_SLUGS, SECTOR_LABEL, SERVICE_SECTOR_PROJECTS, getCity, getCountry, type City, type Country } from '../../data/geo';
import { faqSchema, serviceSchema } from '../../lib/schema';
import { projects } from '../../lib/projects';

/** One service in one place: a city in India or a country we serve remotely. */
export default function ServiceCityPage() {
  const { service = '', city: place } = useParams<{ service: string; city: string }>();
  const svc = CITY_SERVICES[service];
  const city = getCity(place);
  const country = getCountry(place);
  if (!svc) return <NotFound />;
  if (city && servicesForCity(city).includes(service)) return <CityView service={service} city={city} />;
  if (country && (COUNTRY_SERVICE_SLUGS as readonly string[]).includes(service)) return <CountryView service={service} country={country} />;
  return <NotFound />;
}

function ProofList() {
  return (
    <ul className="mt-4 border-t border-line-strong">
      {projects.map((p) => (
        <li key={p.slug} className="border-b border-line">
          <Link to={p.path} className="group flex items-center gap-5 py-5" data-cursor="View">
            <img
              src={p.shots.desktop[0]}
              alt={`${p.name} website`}
              loading="lazy"
              className="aspect-[16/10] w-28 shrink-0 rounded-[var(--radius-sm)] border border-line object-cover object-top sm:w-40"
            />
            <span className="flex-1">
              <span className="t-h3 block text-fg"><span className="link-underline">{p.name}</span></span>
              <span className="mt-1 block text-[15px] text-fg-soft">{p.tagline}</span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Includes({ items, label, service }: { items: string[]; label: string; service: string }) {
  return (
    <section className="section-y border-b border-line bg-canvas">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Scope" title="What's included" accent="included" />
          <p className="mt-6 text-[17px] leading-relaxed text-fg-soft">
            The same scope applies wherever you are based. The full{' '}
            <Link to={`/services/${service}`} className="link-underline text-brand-sky">{label.toLowerCase()} page</Link>{' '}
            covers the method, tools and deliverables in detail.
          </p>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:col-span-7">
          {items.map((it) => (
            <li key={it} className="flex gap-3 bg-surface p-6 text-[15px] leading-snug text-fg">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
              {it}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CityView({ service, city }: { service: string; city: City }) {
  const svc = CITY_SERVICES[service];
  const path = `/services/${service}/${city.slug}`;
  const faqs = cityFaqs(svc.label, city);
  const office = city.office;
  const officeAngle = office && svc.angle?.[city.slug as 'noida' | 'bengaluru'];
  const typical =
    (office && svc.typical?.[city.slug as 'noida' | 'bengaluru']) ||
    city.sectors.map((s) => SERVICE_SECTOR_PROJECTS[service]?.[s]).filter((x): x is string => !!x).slice(0, 5);
  const title = `${svc.titleNoun} in ${city.name}`;
  const description = `${svc.label} for businesses in ${city.name}${office ? `, from our office in ${office.locality}` : ', delivered remotely from Noida and Bengaluru'}. ${svc.what.split('. ')[0]}.`;
  const others = servicesForCity(city).filter((s) => s !== service);

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title={`${title} | Qevnaro`}
        description={description}
        path={path}
        jsonLd={[serviceSchema({ name: svc.label, description: svc.what, path, city: city.name }), faqSchema(faqs)]}
      />

      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label: svc.label, to: `/services/${service}` }, { label: city.name }]}
        eyebrow={office ? `${city.name} · ${office.locality}` : `${city.name} · ${city.region}`}
        title={`${svc.label} in ${city.name}`}
        accent={city.name}
        lead={svc.what}
        actions={
          <>
            <Button to="/contact">Request a quote</Button>
            <Button to={`/services/${service}`} variant="outline">Full {svc.label.toLowerCase()} service</Button>
          </>
        }
      />

      <QuickAnswer
        q={`Who offers ${svc.label.toLowerCase()} in ${city.name}?`}
        a={`Qevnaro provides ${svc.label.toLowerCase()} for businesses in ${city.name} and ${city.areas.slice(0, 3).join(', ')}, ${
          office ? `from its office in ${office.locality}, ${city.name}` : 'working remotely from its offices in Noida and Bengaluru'
        }. Work is quoted by scope after a short call, with a written proposal covering deliverables, timeline and cost.`}
      />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead eyebrow={`The ${city.headline} market`} title={`What ${svc.label.toLowerCase()} needs to do here`} accent="here" />
            <Reveal>
              <div className="mt-8 space-y-5">
                {officeAngle && <p className="text-xl leading-relaxed text-fg">{officeAngle}</p>}
                <p className={officeAngle ? 'text-[17px] leading-relaxed text-fg-soft' : 'text-xl leading-relaxed text-fg'}>{city.market}</p>
                <p className="text-[17px] leading-relaxed text-fg-soft">{city.buyers}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="t-micro text-fg-muted">Typical {svc.label.toLowerCase()} projects in {city.name}</p>
              <ul className="mt-4 border-t border-line-strong">
                {typical.map((t, i) => (
                  <li key={t} className="flex gap-4 border-b border-line py-4">
                    <span className="font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[17px] font-medium text-fg">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="t-micro mt-10 text-fg-muted">Sectors we plan for</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {city.sectors.map((s) => (
                  <li key={s} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-fg-soft">{SECTOR_LABEL[s]}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Includes items={svc.includes} label={svc.label} service={service} />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="t-micro text-fg-muted">Work you can open and check</p>
            <ProofList />
          </div>
          <div className="lg:col-span-5">
            <div className="notch-tr bg-brand-navy p-8 text-white sm:p-10">
              <MapPin className="h-5 w-5 text-[#7FA8FF]" />
              <h2 className="t-h3 mt-4 text-white">{office ? `Qevnaro ${city.name}` : `Serving ${city.name}`}</h2>
              <p className="mt-2 text-[15px] text-white/75">
                {office ? `${office.locality}, ${city.name}, ${city.region} ${office.postalCode}` : `Delivered remotely from Noida and Bengaluru, with in-person meetings for larger projects.`}
              </p>
              <p className="t-micro mt-7 text-white/60">Areas we serve</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">{city.areas.join(' · ')}</p>
              <Link to={`/locations/${city.slug}`} className="link-underline mt-7 inline-block text-[15px] font-medium text-white">
                Qevnaro in {city.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title={`${svc.label} in ${city.name}: common questions`} />
          </div>
          <div className="lg:col-span-8"><Accordion items={faqs} /></div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-16 sm:py-20">
        <div className="container-x">
          <p className="t-micro text-fg-muted">Other services in {city.name}</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {others.map((s) => (
              <li key={s}>
                <Link to={`/services/${s}/${city.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-canvas px-4 py-2 text-sm text-fg transition-colors hover:border-fg">
                  {CITY_SERVICES[s].label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        heading={`Planning a ${svc.label.toLowerCase()} project in ${city.name}?`}
        accent={`${city.name}?`}
        body="Tell us what you need. We will reply with how we would approach it, how long it should take and what it is likely to cost."
      />
    </div>
  );
}

function CountryView({ service, country }: { service: string; country: Country }) {
  const svc = CITY_SERVICES[service];
  const path = `/services/${service}/${country.slug}`;
  const angle = COUNTRY_SERVICE_ANGLE[country.slug][service as (typeof COUNTRY_SERVICE_SLUGS)[number]];
  const faqs = [
    ...country.faqs,
    {
      q: `Why hire an India-based team for ${svc.label.toLowerCase()} in ${country.short}?`,
      a: `You get a full team, design, engineering and marketing, for the budget a single local hire or small agency would need, with daily written updates and a contract that fixes scope, timeline and cost in ${country.currency}.`,
    },
  ];
  const title = `${svc.titleNoun} for ${country.name} Businesses`;
  const description = `${svc.label} for businesses in ${country.short}, delivered by Qevnaro's team in India. ${angle.split('. ')[0]}.`;

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title={`${title} | Qevnaro`}
        description={description}
        path={path}
        jsonLd={[
          { ...serviceSchema({ name: svc.label, description: svc.what, path }), areaServed: { '@type': 'Country', name: country.name } },
          faqSchema(faqs),
        ]}
      />

      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label: svc.label, to: `/services/${service}` }, { label: country.name }]}
        eyebrow={`${country.name} · remote team in India`}
        title={`${svc.label} for businesses in ${country.short}`}
        accent={country.short === 'the US' ? 'US' : country.short}
        lead={svc.what}
        actions={
          <>
            <Button to="/contact">Request a quote</Button>
            <Button to={`/global/${country.slug}`} variant="outline">Working with us from {country.short}</Button>
          </>
        }
      />

      <QuickAnswer
        q={`Can an Indian agency handle ${svc.label.toLowerCase()} for a business in ${country.short}?`}
        a={`Yes. Qevnaro works with clients in ${country.short} remotely from India. ${country.overlap.split('. ')[0]}. Projects are quoted and invoiced in ${country.currency}, with written updates every working day.`}
      />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead eyebrow={`For the ${country.name} market`} title={`What ${svc.label.toLowerCase()} needs to get right in ${country.short}`} />
            <Reveal>
              <div className="mt-8 space-y-5">
                <p className="text-xl leading-relaxed text-fg">{angle}</p>
                <p className="text-[17px] leading-relaxed text-fg-soft">{country.compliance}</p>
                <p className="text-[17px] leading-relaxed text-fg-soft">{country.buyers}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="notch-tr bg-brand-navy p-8 text-white sm:p-10 lg:sticky lg:top-28">
              <Globe2 className="h-5 w-5 text-[#7FA8FF]" />
              <h2 className="t-h3 mt-4 text-white">How we work with {country.short}</h2>
              <p className="t-micro mt-6 text-white/60">Time zones</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">{country.overlap}</p>
              <p className="t-micro mt-6 text-white/60">Day to day</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">{country.workingWith}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Includes items={svc.includes} label={svc.label} service={service} />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="t-micro text-fg-muted">Work you can open and check</p>
            <ProofList />
          </div>
          <div className="lg:col-span-5">
            <p className="t-micro text-fg-muted">Engagement and billing</p>
            <p className="mt-4 text-[17px] leading-relaxed text-fg-soft">{country.engagement}</p>
          </div>
        </div>
      </section>

      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title={`${svc.label} from India for ${country.short}: questions`} />
          </div>
          <div className="lg:col-span-8"><Accordion items={faqs} /></div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-16 sm:py-20">
        <div className="container-x">
          <p className="t-micro text-fg-muted">Other services for {country.short}</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {COUNTRY_SERVICE_SLUGS.filter((s) => s !== service).map((s) => (
              <li key={s}>
                <Link to={`/services/${s}/${country.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-canvas px-4 py-2 text-sm text-fg transition-colors hover:border-fg">
                  {CITY_SERVICES[s].label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        heading={`Based in ${country.short}? Let's talk.`}
        accent="talk."
        body={`Tell us what you need. We will reply with an approach, a timeline and a quote in ${country.currency}.`}
      />
    </div>
  );
}
