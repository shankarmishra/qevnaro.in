import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { Accordion } from '../../components/ui/Accordion';
import { PageHero, SectionHead } from '../../components/ui/PageHero';
import { QuickAnswer } from '../../components/ui/QuickAnswer';
import { SEO } from '../../components/ui/SEO';
import { FinalCTA } from '../../components/home/FinalCTA';
import { NotFound } from '../NotFound';
import { CITY_SERVICES, servicesForCity } from '../../data/cityServices';
import { CITIES, SECTOR_LABEL, getCity } from '../../data/geo';
import { SERVICE_GROUPS, SERVICE_SHORT } from '../../data/services';
import { faqSchema, localBusinessSchema } from '../../lib/schema';
import { site, whatsappLink } from '../../lib/site';

/** A city page: real office details where we have one, honest remote service everywhere else. */
export default function LocationPage() {
  const { city: slug } = useParams<{ city: string }>();
  const city = getCity(slug);
  if (!city) return <NotFound />;

  const office = city.office;
  const services = servicesForCity(city);
  const wa = whatsappLink(`Hi Qevnaro, I am in ${city.name} and would like to discuss a project.`);
  const nearby = CITIES.filter((c) => c.slug !== city.slug).slice(0, 8);
  const faqs = [
    office
      ? {
          q: `Where is Qevnaro's ${city.name} office?`,
          a: `Our ${city.name} office is in ${office.locality}, ${city.name}, ${city.region} ${office.postalCode}. Please contact us before visiting so the right person is available.`,
        }
      : {
          q: `Does Qevnaro have an office in ${city.name}?`,
          a: `No. Qevnaro's offices are in Noida and Bengaluru. We work with ${city.name} businesses remotely and can plan in-person meetings for larger projects.`,
        },
    {
      q: `Which areas of ${city.name} do you work with?`,
      a: `We work with businesses across ${city.areas.join(', ')} and the surrounding region.`,
    },
    {
      q: `What services does Qevnaro offer in ${city.name}?`,
      a: 'All of them: website and app development, e-commerce, UI/UX design, SEO, GEO and AEO, digital and performance marketing, social media, branding, content, video, AI automation, chatbots and cloud.',
    },
    {
      q: `Which industries do you work with in ${city.name}?`,
      a: `Most of our ${city.name} work is for ${city.sectors.slice(0, 4).map((s) => SECTOR_LABEL[s].toLowerCase()).join(', ')}, and we take on other sectors too.`,
    },
  ];
  const localSchema = office
    ? localBusinessSchema(city.slug)
    : {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Web development and digital marketing in ${city.name}`,
        provider: { '@id': `${site.url}/#organization`, '@type': 'Organization', name: site.name },
        areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: city.region } },
        url: `${site.url}/locations/${city.slug}`,
      };

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title={`Web Development & Digital Marketing Agency in ${city.name} | Qevnaro`}
        description={`${office ? `Qevnaro's ${city.name} office in ${office.locality}` : `Qevnaro works with ${city.name} businesses remotely`}: website and app development, SEO, GEO, performance marketing, branding and AI automation for ${city.areas.slice(0, 4).join(', ')}.`}
        path={`/locations/${city.slug}`}
        jsonLd={[localSchema, faqSchema(faqs)].filter(Boolean) as object[]}
      />

      <PageHero
        crumbs={[{ label: 'Locations', to: '/locations' }, { label: city.name }]}
        eyebrow={office ? `${office.locality} · ${city.region}` : `${city.region} · served remotely`}
        title={`Qevnaro in ${city.name}`}
        accent={city.name}
        lead={`A technology and digital growth agency ${office ? `in ${office.locality}` : `working with ${city.name} businesses`}. We build websites and apps, and run the search, advertising and automation that grow them, across ${city.headline}.`}
        actions={
          <>
            <Button to="/contact">Start a project</Button>
            {wa && <Button href={wa} variant="outline" arrow={false}>WhatsApp us</Button>}
          </>
        }
      />

      <QuickAnswer
        q={`Is there a good web development and digital marketing agency in ${city.name}?`}
        a={`Qevnaro builds websites and apps and runs SEO, ads and AI automation for ${city.name} businesses${office ? ` from its office in ${office.locality}` : ', working remotely from its offices in Noida and Bengaluru'}. Two of its live products, Pulse n Care and MenusQR, can be checked online, and every project is quoted in writing after a short call.`}
      />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead eyebrow={`Working in ${city.headline}`} title="A market we plan for specifically" accent="specifically" />
            <Reveal>
              <div className="mt-8 space-y-5">
                <p className="text-xl leading-relaxed text-fg">{city.market}</p>
                <p className="text-[17px] leading-relaxed text-fg-soft">{city.buyers}</p>
              </div>
            </Reveal>
            <p className="t-micro mt-12 text-fg-muted">Sectors we plan for here</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {city.sectors.map((s) => (
                <li key={s} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-fg-soft">{SECTOR_LABEL[s]}</li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="notch-tr bg-brand-navy p-8 text-white sm:p-10 lg:sticky lg:top-28">
              <p className="t-micro text-white/60">{office ? 'Office' : 'How we work here'}</p>
              {office ? (
                <address className="mt-3 not-italic">
                  <span className="t-h3 block text-white">Qevnaro {city.name}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-white/80">
                    {office.locality}, {city.name}<br />
                    {city.region} {office.postalCode}, India
                  </span>
                </address>
              ) : (
                <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                  Remote delivery from our Noida and Bengaluru offices: video calls, WhatsApp and a shared project board,
                  with in-person meetings for larger projects.
                </p>
              )}
              <ul className="mt-7 space-y-3 text-[15px]">
                {site.phone && (
                  <li><a href={`tel:${site.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-3 text-white hover:underline"><Phone className="h-4 w-4 text-[#7FA8FF]" />{site.phone}</a></li>
                )}
                {site.email && (
                  <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-white hover:underline"><Mail className="h-4 w-4 text-[#7FA8FF]" />{site.email}</a></li>
                )}
                {wa && (
                  <li><a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-white hover:underline"><MessageCircle className="h-4 w-4 text-[#7FA8FF]" />WhatsApp</a></li>
                )}
              </ul>
              <p className="t-micro mt-8 text-white/60">Areas</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">{city.areas.join(' · ')}</p>
              <p className="t-micro mt-6 text-white/60">Languages</p>
              <p className="mt-2 text-[15px] text-white/85">{city.languages.join(', ')}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow={`Services in ${city.name}`} title="What we do here" accent="here" />
          <ul className="mt-12 grid gap-x-10 border-t border-line-strong sm:grid-cols-2">
            {services.map((s) => (
              <li key={s} className="border-b border-line">
                <Link to={`/services/${s}/${city.slug}`} className="group flex items-center justify-between gap-4 py-5">
                  <span className="t-h3 text-fg transition-transform duration-300 group-hover:translate-x-1.5">
                    {CITY_SERVICES[s].label} in {city.name}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="t-micro mt-14 text-fg-muted">Everything else we offer</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {SERVICE_GROUPS.flatMap((g) => g.services)
              .filter((s) => !services.includes(s.slug))
              .map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="inline-flex rounded-full border border-line-strong bg-surface px-4 py-2 text-sm text-fg transition-colors hover:border-fg">
                    {SERVICE_SHORT[s.slug] ?? s.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title={`Qevnaro in ${city.name}: questions`} />
            <p className="t-micro mt-10 text-fg-muted">Other cities</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {nearby.map((c) => (
                <li key={c.slug}>
                  <Link to={`/locations/${c.slug}`} className="link-underline text-[15px] text-fg-soft hover:text-fg">{c.name}</Link>
                </li>
              ))}
              <li><Link to="/locations" className="link-underline text-[15px] font-medium text-brand-sky">All locations</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-8"><Accordion items={faqs} /></div>
        </div>
      </section>

      <FinalCTA heading={`Based in ${city.name}? Let's talk.`} accent="talk." body="Tell us what you are building or trying to improve, and we will suggest a sensible first step." />
    </div>
  );
}
