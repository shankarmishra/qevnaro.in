import React from 'react';
import { ArrowRight, ArrowUpRight, Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { PageHero, SectionHead } from '../ui/PageHero';
import { BrowserFrame, PhoneFrame } from '../ui/DeviceFrame';
import { SEO } from '../ui/SEO';
import { FinalCTA } from '../home/FinalCTA';
import { creativeWorkSchema } from '../../lib/schema';
import { projects, type Project } from '../../lib/projects';

/** Editorial case study: big screenshots of the live product, facts in a sticky column, then the story. */
export const CaseStudyLayout: React.FC<{ project: Project }> = ({ project: p }) => {
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];
  const facts: [string, React.ReactNode][] = [
    ['Client', p.client],
    ['Industry', p.industry],
    ['Type', p.category],
    ['Live at', <a key="u" href={p.liveUrl} target="_blank" rel="noreferrer" className="link-underline text-brand-sky">{p.host}</a>],
  ];

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title={`${p.name} Case Study: ${p.category}`}
        description={`${p.tagline} ${p.intro}`.slice(0, 300)}
        path={p.path}
        image={p.shots.desktop[0]}
        jsonLd={creativeWorkSchema({ name: p.name, description: p.intro, path: p.path, image: p.shots.desktop[0], url: p.liveUrl })}
      />

      <PageHero
        crumbs={[{ label: 'Work', to: '/work' }, { label: p.name }]}
        eyebrow={`${p.industry} · ${p.category}`}
        title={p.tagline}
        lead={p.intro}
        actions={
          <>
            <Button href={p.liveUrl}>Visit {p.host}</Button>
            <Button to="/contact" variant="outline">Discuss a similar project</Button>
          </>
        }
      />

      {/* Hero screenshots */}
      <section className="border-b border-line bg-elevated">
        <div className="container-x relative py-14 sm:py-20">
          <div className="relative mx-auto max-w-5xl pb-12 pl-10 sm:pl-20">
            <BrowserFrame src={p.shots.desktop[0]} alt={`${p.name} home page on desktop`} url={p.host} eager />
            <PhoneFrame
              src={p.shots.mobile}
              alt={`${p.name} home page on a phone`}
              className="absolute bottom-0 left-0 w-[24%] min-w-[96px] max-w-[210px]"
            />
          </div>
        </div>
      </section>

      {/* Facts + challenge */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <dl className="border-t border-line-strong lg:sticky lg:top-28">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <dt className="t-micro text-fg-muted">{k}</dt>
                  <dd className="text-right text-[15px] font-medium text-fg">{v}</dd>
                </div>
              ))}
              <div className="border-b border-line py-5">
                <dt className="t-micro text-fg-muted">What we delivered</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {p.services.map((s) => (
                    <span key={s} className="rounded-full border border-line-strong px-3 py-1 text-[13px] text-fg-soft">{s}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>

          <div className="lg:col-span-8">
            <SectionHead eyebrow="The challenge" title="What needed solving" accent="solving" />
            <ol className="mt-10 border-t border-line-strong">
              {p.challenge.map((c, i) => (
                <Reveal as="li" key={i} delay={i * 0.05} className="flex gap-6 border-b border-line py-6">
                    <span className="serif-accent text-3xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-[17px] leading-relaxed text-fg-soft">{c}</p>
                  </Reveal>
              ))}
            </ol>

            <div className="mt-16 grid gap-12 sm:grid-cols-2">
              <div>
                <p className="t-micro text-fg-muted">Objectives</p>
                <ul className="mt-5 space-y-3.5">
                  {p.objectives.map((t) => (
                    <li key={t} className="flex gap-3 text-[15px] leading-snug text-fg-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-micro text-fg-muted">Strategy</p>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-fg-soft">
                  {p.strategy.map((s) => <p key={s}>{s}</p>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed image rows from the live product */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow="The product" title="A closer look at what shipped" accent="shipped" />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {p.shots.desktop.slice(1).map((src, i) => (
              <Reveal key={src} delay={i * 0.08}>
                <BrowserFrame src={src} alt={`${p.name} screen ${i + 2}`} url={p.host} />
              </Reveal>
            ))}
          </div>
          {p.gallery.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {p.gallery.map((g) => (
                <img
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-[var(--radius-md)] border border-line object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Approach + technology */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="Our approach" title="How we worked" accent="worked" />
          <ol className="mt-12 grid gap-x-8 gap-y-10 border-t border-line-strong pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {p.approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.06}>
                  <span className="serif-accent text-4xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3 mt-4 text-fg">{a.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{a.desc}</p>
                </Reveal>
            ))}
          </ol>

          <div className="mt-20">
            <p className="t-micro text-fg-muted">What it runs on</p>
            <dl className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {p.tech.map((t) => (
                <div key={t.title} className="bg-surface p-6">
                  <dt className="font-display text-[17px] font-medium tracking-tight text-fg">{t.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-fg-soft">{t.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow="Results" title="Outcomes" />
          {p.results && p.results.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {p.results.map((r) => (
                <div key={r.label} className="rounded-[var(--radius-lg)] border border-line bg-surface p-7">
                  <div className="font-display text-4xl font-medium tracking-tight text-fg">{r.value}</div>
                  <div className="mt-2 text-sm text-fg-soft">{r.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 flex max-w-2xl items-start gap-3 text-[17px] leading-relaxed text-fg-soft">
              <Info className="mt-1.5 h-4 w-4 shrink-0 text-brand-blue" />
              <span>
                The product is live at{' '}
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="link-underline text-brand-sky">{p.host}</a>.
                We only publish figures that have been verified with the client, so measured outcomes will
                be added here once they are confirmed.
              </span>
            </p>
          )}
        </div>
      </section>

      {/* Next project */}
      {next.slug !== p.slug && (
        <Link to={next.path} className="group block border-b border-line bg-surface">
          <div className="container-x flex items-center justify-between gap-8 py-16 sm:py-20">
            <div>
              <p className="t-micro text-fg-muted">Next project</p>
              <p className="t-display mt-4 text-fg transition-colors group-hover:text-brand-blue">{next.name}</p>
              <p className="t-lead mt-3 max-w-xl text-fg-soft">{next.tagline}</p>
            </div>
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-all duration-500 group-hover:border-brand-navy group-hover:bg-brand-navy group-hover:text-white sm:h-20 sm:w-20">
              <ArrowRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      )}

      <div className="border-b border-line bg-canvas">
        <div className="container-x py-6">
          <Link to="/work" className="group inline-flex items-center gap-2 text-[15px] font-medium text-fg">
            <span className="link-underline">All work</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <FinalCTA
        heading="Have something similar in mind?"
        accent="mind?"
        body="Tell us what you are building and we will tell you honestly how we would approach it."
      />
    </div>
  );
};

export default CaseStudyLayout;
