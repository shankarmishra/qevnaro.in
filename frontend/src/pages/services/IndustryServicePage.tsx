import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { Accordion } from '../../components/ui/Accordion';
import { PageHero, SectionHead } from '../../components/ui/PageHero';
import { QuickAnswer } from '../../components/ui/QuickAnswer';
import { ServiceObject, objectFor } from '../../components/ui/ServiceObject';
import { SEO } from '../../components/ui/SEO';
import { FinalCTA } from '../../components/home/FinalCTA';
import { NotFound } from '../NotFound';
import { INDUSTRY_SERVICES, getIndustryService } from '../../data/industryServices';
import { getIndustry } from '../../data/industries';
import { getServiceMeta, SERVICE_SHORT } from '../../data/services';
import { faqSchema, serviceSchema } from '../../lib/schema';

/** A service for one industry: written for that buyer, linked to both parent pages. */
export default function IndustryServicePage() {
  const { service, industry } = useParams<{ service: string; industry: string }>();
  const x = getIndustryService(service, industry);
  const ind = getIndustry(industry);
  const meta = getServiceMeta(service ?? '');
  if (!x || !ind || !meta) return <NotFound />;

  const path = `/services/${x.service}/for/${x.industry}`;
  const label = SERVICE_SHORT[x.service] ?? meta.title;
  const related = INDUSTRY_SERVICES.filter((o) => o !== x && (o.industry === x.industry || o.service === x.service));

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title={`${x.title} | Qevnaro`}
        description={x.intro.split('. ').slice(0, 2).join('. ') + '.'}
        path={path}
        jsonLd={[
          { ...serviceSchema({ name: x.title, description: x.intro, path }), audience: { '@type': 'BusinessAudience', name: ind.name } },
          faqSchema(x.faqs),
        ]}
      />

      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label, to: `/services/${x.service}` }, { label: ind.shortName }]}
        eyebrow={`${label} · ${ind.shortName}`}
        title={x.title}
        lead={x.intro}
        actions={
          <>
            <Button to="/contact">Talk to us</Button>
            <Button to={`/industries/${x.industry}`} variant="outline">{ind.shortName} overview</Button>
          </>
        }
        aside={
          <div className="aspect-square w-full overflow-hidden rounded-[var(--radius-xl)] border border-line bg-[radial-gradient(ellipse_at_50%_55%,#ffffff_0%,#F1F0EB_75%)]">
            <ServiceObject kind={objectFor(meta.artKind)} className="h-full w-full" />
          </div>
        }
      />

      <QuickAnswer
        q={`What does good ${label.toLowerCase()} for ${ind.shortName.toLowerCase()} include?`}
        a={`${x.needs.slice(0, 3).join('; ')}. Qevnaro delivers this from Noida and Bengaluru for businesses across India and abroad, quoted by scope after a short call.`}
      />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-3 lg:gap-10">
          {[
            { h: `What ${ind.shortName.toLowerCase()} businesses need`, items: x.needs, icon: 'check' },
            { h: 'What we build', items: x.build, icon: 'check' },
            { h: 'Mistakes we see often', items: x.mistakes, icon: 'x' },
          ].map((col, i) => (
            <Reveal key={col.h} delay={i * 0.06}>
              <div className={i === 1 ? 'notch-tr h-full bg-brand-navy p-8 text-white sm:p-10' : 'h-full rounded-[var(--radius-lg)] border border-line bg-canvas p-8 sm:p-10'}>
                <h2 className={`t-h3 ${i === 1 ? 'text-white' : 'text-fg'}`}>{col.h}</h2>
                <ul className="mt-6 space-y-3.5">
                  {col.items.map((it) => (
                    <li key={it} className={`flex gap-3 text-[15px] leading-snug ${i === 1 ? 'text-white/85' : 'text-fg-soft'}`}>
                      {col.icon === 'x' ? <X className="mt-0.5 h-4 w-4 shrink-0 text-bad" /> : <Check className={`mt-0.5 h-4 w-4 shrink-0 ${i === 1 ? 'text-[#7FA8FF]' : 'text-brand-blue'}`} />}
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title="Questions we hear" />
          </div>
          <div className="lg:col-span-8"><Accordion items={x.faqs} /></div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-b border-line bg-surface py-16 sm:py-20">
          <div className="container-x">
            <p className="t-micro text-fg-muted">Related</p>
            <ul className="mt-5 grid gap-x-10 border-t border-line-strong sm:grid-cols-2">
              {related.map((o) => (
                <li key={`${o.service}-${o.industry}`} className="border-b border-line">
                  <Link to={`/services/${o.service}/for/${o.industry}`} className="group flex items-center justify-between gap-4 py-4 text-[17px] font-medium text-fg">
                    <span className="link-underline">{o.title}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-muted group-hover:text-brand-blue" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCTA heading={`Let's talk about your ${ind.shortName.toLowerCase()} project.`} accent="project." />
    </div>
  );
}
