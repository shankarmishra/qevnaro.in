import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Check, Info } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { Accordion } from '../../components/ui/Accordion';
import { PageHero, SectionHead } from '../../components/ui/PageHero';
import { SEO } from '../../components/ui/SEO';
import { ServiceObject, objectFor } from '../../components/ui/ServiceObject';
import { FinalCTA } from '../../components/home/FinalCTA';
import { NotFound } from '../NotFound';
import { getIndustry, industries, SERVICE_LABELS } from '../../data/industries';
import { faqSchema } from '../../lib/schema';
import { projects } from '../../lib/projects';

export const IndustryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const ind = getIndustry(slug);
  if (!ind) {
    return <NotFound title="We could not find that industry." body="It may have moved or never existed. Browse the industries we work with instead." />;
  }

  const path = `/industries/${ind.slug}`;
  const related = Array.from(new Set(ind.solutions.map((s) => s.service)));
  const others = industries.filter((i) => i.slug !== ind.slug);
  // A case study from the same sector, when we have one
  const proof = projects.find((p) => ind.name.toLowerCase().includes(p.industry.toLowerCase()));

  return (
    <div className="bg-canvas text-fg">
      <SEO title={ind.seoTitle} description={ind.seoDescription} path={path} jsonLd={faqSchema(ind.faqs)} />

      <PageHero
        crumbs={[{ label: 'Industries', to: '/industries' }, { label: ind.shortName }]}
        eyebrow={`Industry · ${ind.shortName}`}
        title={ind.name}
        lead={ind.tagline}
        actions={
          <>
            <Button to="/contact">Talk to us</Button>
            <a href="#challenges" className="inline-flex min-h-[46px] items-center rounded-full border border-line-strong px-6 text-sm font-medium text-fg transition-colors hover:border-fg">
              See how we help
            </a>
          </>
        }
        note={
          ind.disclaimer && (
            <p className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {ind.disclaimer}
            </p>
          )
        }
        aside={
          <div className="aspect-square w-full overflow-hidden rounded-[var(--radius-xl)] border border-line bg-[radial-gradient(ellipse_at_50%_55%,#ffffff_0%,#F1F0EB_75%)]">
            <ServiceObject kind={objectFor(ind.art)} className="h-full w-full" />
          </div>
        }
      />

      {/* Landscape */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="The landscape" title={`Digital in ${ind.shortName.toLowerCase()}, honestly`} accent="honestly" />
          </div>
          <Reveal delay={0.1} className="space-y-5 lg:col-span-8">
            <p className="text-xl leading-relaxed text-fg">{ind.intro[0]}</p>
            <p className="text-[17px] leading-relaxed text-fg-soft">{ind.intro[1]}</p>
          </Reveal>
        </div>
      </section>

      {/* Challenges and what we build */}
      <section id="challenges" className="section-y scroll-mt-24 border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow="Challenges and solutions" title="What gets in the way, and what we build" accent="build" />
          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="t-micro text-fg-muted">Common challenges</p>
              <ul className="mt-4 border-t border-line-strong">
                {ind.challenges.map((c, i) => (
                  <Reveal as="li" key={c.title} delay={i * 0.04} className="flex gap-5 border-b border-line py-5">
                      <span className="font-mono text-xs text-fg-muted">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <strong className="block font-display text-[17px] font-medium tracking-tight text-fg">{c.title}</strong>
                        <span className="mt-1 block text-[15px] leading-relaxed text-fg-soft">{c.desc}</span>
                      </div>
                    </Reveal>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-micro text-brand-sky">What we build</p>
              <ul className="mt-4 border-t border-line-strong">
                {ind.solutions.map((s, i) => (
                  <Reveal as="li" key={s.title} delay={i * 0.04} className="border-b border-line">
                      <Link to={`/services/${s.service}`} className="group flex items-start justify-between gap-5 py-5">
                        <span>
                          <strong className="block font-display text-[17px] font-medium tracking-tight text-fg">
                            <span className="link-underline">{s.title}</span>
                          </strong>
                          <span className="mt-1 block text-[15px] leading-relaxed text-fg-soft">{s.desc}</span>
                          <span className="t-micro mt-2.5 block text-brand-sky">{SERVICE_LABELS[s.service]}</span>
                        </span>
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                      </Link>
                    </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Channels + technology */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Marketing channels" title="Where your audience is" />
            <ul className="mt-10 border-t border-line-strong">
              {ind.channels.map((c, i) => (
                <li key={c.title} className="flex gap-5 border-b border-line py-5">
                  <span className="font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong className="block text-[17px] font-medium text-fg">{c.title}</strong>
                    <span className="mt-1 block text-[15px] leading-relaxed text-fg-soft">{c.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="notch-tr bg-brand-navy p-8 text-white sm:p-10 lg:sticky lg:top-28">
              <p className="t-micro text-white/60">Technology requirements</p>
              <h2 className="t-h3 mt-3 text-white">What the build must handle</h2>
              <ul className="mt-6 space-y-5">
                {ind.technology.map((t) => (
                  <li key={t.title} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7FA8FF]" />
                    <div>
                      <strong className="block text-[15px] font-medium text-white">{t.title}</strong>
                      <span className="mt-0.5 block text-sm leading-relaxed text-white/75">{t.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we help */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow="How we help" title="A simple path from audit to results" accent="results" />
          <ol className="mt-14 grid gap-x-8 gap-y-10 border-t border-line-strong pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {ind.howWeHelp.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06}>
                  <span className="serif-accent text-4xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3 mt-4 text-fg">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{s.desc}</p>
                </Reveal>
            ))}
          </ol>

          {proof && (
            <Reveal className="mt-16">
              <Link to={proof.path} className="group flex flex-col gap-6 rounded-[var(--radius-lg)] border border-line bg-surface p-7 transition-colors hover:border-line-strong sm:flex-row sm:items-center sm:p-9">
                <img
                  src={proof.shots.desktop[0]}
                  alt={`${proof.name} website`}
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-[var(--radius-md)] border border-line object-cover object-top sm:w-64"
                />
                <div className="flex-1">
                  <p className="t-micro text-brand-sky">We have built in this sector</p>
                  <p className="t-h3 mt-2 text-fg"><span className="link-underline">{proof.name}</span></p>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{proof.tagline}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title="Questions we hear often" />
          </div>
          <div className="lg:col-span-8"><Accordion items={ind.faqs} /></div>
        </div>
      </section>

      {/* Related */}
      <section className="border-b border-line bg-canvas py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="t-micro text-fg-muted">Related services</p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {related.map((s) => (
                <li key={s}>
                  <Link to={`/services/${s}`} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm text-fg transition-colors hover:border-fg">
                    {SERVICE_LABELS[s]} <ArrowUpRight className="h-3.5 w-3.5 text-fg-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-micro text-fg-muted">Other industries</p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link to={`/industries/${o.slug}`} className="link-underline text-[15px] text-fg-soft hover:text-fg">{o.shortName}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCTA
        heading={`Let's talk about your ${ind.shortName.toLowerCase()} goals.`}
        accent="goals."
        body="Tell us where you are and what you want to change. We will reply with an honest view of what is realistic."
      />
    </div>
  );
};

export default IndustryPage;
