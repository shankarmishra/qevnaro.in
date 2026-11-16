import { ArrowRight, ArrowUpRight, Check, Info, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { Accordion } from '../ui/Accordion';
import { PageHero, SectionHead } from '../ui/PageHero';
import { SEO } from '../ui/SEO';
import type { LineArtKind } from '../ui/line-art/LineArt';
import { ServiceObject, objectFor } from '../ui/ServiceObject';
import { FinalCTA } from '../home/FinalCTA';
import { faqSchema, serviceSchema } from '../../lib/schema';
import { SERVICE_SHORT } from '../../data/services';
import { placesForService } from '../../data/cityServices';
import { INDUSTRY_SERVICES } from '../../data/industryServices';
import { INSIGHTS } from '../../data/insights';
import { QuickAnswer } from '../ui/QuickAnswer';

export interface ServiceProblem { title: string; problem: string; solution: string }
export interface ServiceSubItem { title: string; desc: string }
export interface ServiceFAQ { q: string; a: string }

export interface ServicePageData {
  badge: string;
  title: string;
  subtitle: string;
  overview: string[];
  whyNeeded: { heading: string; points: { title: string; desc: string }[] };
  problemsSolved: ServiceProblem[];
  deliverables: string[];
  subServices: ServiceSubItem[];
  methodology: { step: string; title: string; desc: string }[];
  toolsAndTech: { category: string; items: string[] }[];
  whoNeedsThis: string[];
  businessOutcomes: { metric: string; label: string; desc: string }[];
  relatedCaseStudies: { title: string; desc: string; href: string; tag: string }[];
  relatedServices: { title: string; desc: string; href: string }[];
  faqs: ServiceFAQ[];
  icon: LucideIcon;
  // optional enrichments
  art?: LineArtKind;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  /** Honest scope note shown under the hero (e.g. "No guaranteed rankings"). */
  disclaimer?: string;
  /** Extra comparison / deep-dive blocks (e.g. SEO vs AEO vs GEO, SEO sub-disciplines). */
  extraSections?: { eyebrow: string; title: string; intro?: string; columns: { title: string; items: string[] }[] }[];
}

export const ServiceDetailLayout: React.FC<{ data: ServicePageData; children?: React.ReactNode }> = ({ data, children }) => {
  const path = data.slug ? `/services/${data.slug}` : undefined;
  const desc = data.seoDescription ?? data.subtitle;
  const short = (data.slug && SERVICE_SHORT[data.slug]) || data.badge.split('·').pop()!.trim();
  const places = placesForService(data.slug ?? '');
  const forIndustries = INDUSTRY_SERVICES.filter((x) => x.service === data.slug);
  const reading = INSIGHTS.filter((a) => a.services?.includes(data.slug ?? '')).slice(0, 3);

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title={data.seoTitle ?? data.title}
        description={desc}
        path={path}
        jsonLd={[
          serviceSchema({ name: short, description: desc, path: path ?? '/services' }),
          ...(data.faqs.length ? [faqSchema(data.faqs)] : []),
        ]}
      />

      {/* 1. Hero */}
      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label: short }]}
        eyebrow={data.badge}
        title={data.title}
        lead={data.subtitle}
        actions={
          <>
            <Button to="/contact">Request a quote</Button>
            <a
              href="#scope"
              className="inline-flex min-h-[46px] items-center rounded-full border border-line-strong px-6 text-sm font-medium text-fg transition-colors hover:border-fg"
            >
              See what&apos;s included
            </a>
          </>
        }
        note={
          data.disclaimer && (
            <p className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {data.disclaimer}
            </p>
          )
        }
        aside={
          <div className="aspect-square w-full overflow-hidden rounded-[var(--radius-xl)] border border-line bg-[radial-gradient(ellipse_at_50%_55%,#ffffff_0%,#F1F0EB_75%)]">
            <ServiceObject kind={objectFor(data.art ?? 'code')} className="h-full w-full" />
          </div>
        }
      />

      <QuickAnswer
        q={`What is ${short}, and who provides it?`}
        a={`${data.overview[0]} Qevnaro provides ${short.toLowerCase().startsWith('seo') || /^[A-Z]{2,}/.test(short) ? short : short.toLowerCase()} from Noida and Bengaluru for businesses across India and in the US, UAE, UK, Australia and Canada, quoted by scope after a short call.`}
      />

      {/* 2. Direct answer + why */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead eyebrow="In short" title={`What ${short} is, and why it matters`} />
            <Reveal>
              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-fg-soft">
                {data.overview.map((p, i) => (
                  <p key={i} className={i === 0 ? 'text-xl leading-relaxed text-fg' : undefined}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="t-micro text-fg-muted">Why businesses need it</p>
              <h3 className="t-h3 mt-3 text-fg">{data.whyNeeded.heading}</h3>
              <ul className="mt-6 border-t border-line-strong">
                {data.whyNeeded.points.map((pt, i) => (
                  <li key={i} className="flex gap-4 border-b border-line py-5">
                    <span className="font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <strong className="block text-[15px] font-medium text-fg">{pt.title}</strong>
                      <span className="mt-1 block text-sm leading-relaxed text-fg-soft">{pt.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Problems */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow="Problems we solve" title="The bottlenecks this removes" accent="removes" />
          <div className="mt-14 grid gap-x-10 border-t border-line-strong md:grid-cols-3">
            {data.problemsSolved.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <article className="flex h-full flex-col border-b border-line py-8 md:border-b-0">
                  <span className="font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3 mt-3 text-fg">{item.title}</h3>
                  <p className="t-micro mt-6 text-fg-muted">The problem</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{item.problem}</p>
                  <p className="t-micro mt-6 text-brand-sky">What we do</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg">{item.solution}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Scope */}
      <section id="scope" className="section-y scroll-mt-24 border-b border-line bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Scope" title="What's included" accent="included" />
            <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2">
              {data.subServices.map((s, i) => (
                <div key={i} className="bg-surface p-6 transition-colors hover:bg-elevated">
                  <h3 className="font-display text-[17px] font-medium tracking-tight text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-soft">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="notch-tr sticky top-28 bg-brand-navy p-8 text-white sm:p-10">
              <p className="t-micro text-white/60">Deliverables</p>
              <h3 className="t-h3 mt-3 text-white">What Qevnaro hands over</h3>
              <ul className="mb-9 mt-6 space-y-3">
                {data.deliverables.map((d, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-snug text-white/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7FA8FF]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <Button to="/contact" variant="light" className="w-full">Discuss your scope</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Extra deep-dive sections */}
      {data.extraSections?.map((sec, k) => (
        <section key={k} className="section-y border-b border-line bg-canvas">
          <div className="container-x">
            <SectionHead eyebrow={sec.eyebrow} title={sec.title} intro={sec.intro} />
            <div className={`mt-12 grid gap-4 ${sec.columns.length > 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'}`}>
              {sec.columns.map((c, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="h-full rounded-[var(--radius-lg)] border border-line bg-surface p-7">
                    <h3 className="font-display text-lg font-medium tracking-tight text-fg">{c.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {c.items.map((it, j) => (
                        <li key={j} className="flex gap-2.5 text-sm leading-snug text-fg-soft">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-blue" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 5. Method */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="Approach" title="How we work, step by step" accent="step by step" />
          <ol className="mt-14 grid gap-x-8 gap-y-10 border-t border-line-strong pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {data.methodology.map((m, i) => (
              <Reveal as="li" key={i} delay={i * 0.07} className="list-none">
                  <span className="serif-accent text-4xl leading-none text-brand-blue">{m.step}</span>
                  <h3 className="t-h3 mt-4 text-fg">{m.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{m.desc}</p>
                </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12">
            <Link to="/process" className="group inline-flex items-center gap-2 text-[15px] font-medium text-fg">
              <span className="link-underline">Our full process</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 6. Tools + who it is for */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Tools & technologies" title="What we build with" />
            <dl className="mt-10 border-t border-line-strong">
              {data.toolsAndTech.map((t, i) => (
                <div key={i} className="grid gap-3 border-b border-line py-5 sm:grid-cols-[11rem_1fr]">
                  <dt className="text-[15px] font-medium text-fg">{t.category}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {t.items.map((it, j) => (
                      <span key={j} className="rounded-full border border-line-strong bg-surface px-3 py-1 text-[13px] text-fg-soft">{it}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="t-micro text-fg-muted">Who it&apos;s for</p>
            <h2 className="t-h3 mt-3 text-fg">Who benefits most</h2>
            <ul className="mt-6 space-y-3.5">
              {data.whoNeedsThis.map((w, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-snug text-fg-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 7. What to expect */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="What to expect" title="What changes for your business" accent="business" />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {data.businessOutcomes.map((b, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full rounded-[var(--radius-lg)] border border-line bg-canvas p-7">
                  <div className="serif-accent text-3xl leading-tight text-brand-blue">{b.metric}</div>
                  <div className="mt-1 font-display text-lg font-medium tracking-tight text-fg">{b.label}</div>
                  <p className="mt-3 text-sm leading-relaxed text-fg-soft">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Optional showcase slot */}
      {children && (
        <section className="section-y border-b border-line bg-canvas">
          <div className="container-x">{children}</div>
        </section>
      )}

      {/* 8. Related: cities, pricing, case studies, services */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {data.relatedCaseStudies.length > 0 && (
              <>
                <p className="t-micro text-fg-muted">Related work</p>
                <div className="mb-12 mt-4 border-t border-line-strong">
                  {data.relatedCaseStudies.map((cs, i) => (
                    <Link key={i} to={cs.href} className="group flex items-start justify-between gap-6 border-b border-line py-6">
                      <div>
                        <span className="t-micro text-brand-sky">{cs.tag}</span>
                        <div className="t-h3 mt-2 text-fg"><span className="link-underline">{cs.title}</span></div>
                        <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{cs.desc}</p>
                      </div>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                    </Link>
                  ))}
                </div>
              </>
            )}
            <p className="t-micro text-fg-muted">Cost</p>
            <ul className="mt-4 border-t border-line-strong">
              <li className="border-b border-line">
                <Link to="/pricing" className="group flex items-center justify-between py-4 text-[17px] font-medium text-fg">
                  <span className="link-underline">How {short} is priced</span>
                  <ArrowUpRight className="h-4 w-4 text-fg-muted group-hover:text-brand-blue" />
                </Link>
              </li>
            </ul>
            {forIndustries.length > 0 && (
              <>
                <p className="t-micro mt-10 text-fg-muted">By industry</p>
                <ul className="mt-4 border-t border-line-strong">
                  {forIndustries.map((x) => (
                    <li key={x.industry} className="border-b border-line">
                      <Link to={`/services/${x.service}/for/${x.industry}`} className="group flex items-center justify-between py-4 text-[17px] font-medium text-fg">
                        <span className="link-underline">{x.title}</span>
                        <ArrowUpRight className="h-4 w-4 text-fg-muted group-hover:text-brand-blue" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {(places.cities.length > 0 || places.countries.length > 0) && (
              <>
                <p className="t-micro mt-10 text-fg-muted">{short} by location</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {places.cities.map((c) => (
                    <li key={c.slug}>
                      <Link to={`/services/${data.slug}/${c.slug}`} className="inline-flex rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-[14px] text-fg transition-colors hover:border-fg">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                  {places.countries.map((c) => (
                    <li key={c.slug}>
                      <Link to={`/services/${data.slug}/${c.slug}`} className="inline-flex rounded-full border border-brand-blue/40 bg-surface px-3.5 py-1.5 text-[14px] text-fg transition-colors hover:border-brand-blue">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {reading.length > 0 && (
              <>
                <p className="t-micro mt-10 text-fg-muted">Related reading</p>
                <ul className="mt-4 border-t border-line-strong">
                  {reading.map((a) => (
                    <li key={a.slug} className="border-b border-line">
                      <Link to={`/insights/${a.slug}`} className="group flex items-center justify-between gap-4 py-4 text-[16px] font-medium text-fg">
                        <span className="link-underline">{a.title}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-muted group-hover:text-brand-blue" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {data.relatedServices.length > 0 && (
            <div className="lg:col-span-5">
              <p className="t-micro text-fg-muted">Pairs well with</p>
              <ul className="mt-4 border-t border-line-strong">
                {data.relatedServices.map((rs, i) => (
                  <li key={i} className="border-b border-line">
                    <Link to={rs.href} className="group flex items-center justify-between gap-4 py-5">
                      <div>
                        <div className="text-[17px] font-medium text-fg"><span className="link-underline">{rs.title}</span></div>
                        <div className="mt-1 text-sm text-fg-muted">{rs.desc}</div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-muted group-hover:text-brand-blue" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 9. FAQ */}
      {data.faqs.length > 0 && (
        <section className="section-y border-b border-line bg-surface">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHead eyebrow="FAQ" title={`${short}: common questions`} />
            </div>
            <div className="lg:col-span-8">
              <Accordion items={data.faqs} />
            </div>
          </div>
        </section>
      )}

      <FinalCTA
        heading={`Let's talk about your ${short} project.`}
        accent="project."
        body="Tell us what you're building and where you want to go next. We'll reply with an honest view of scope, timeline and cost."
      />
    </div>
  );
};

export default ServiceDetailLayout;
