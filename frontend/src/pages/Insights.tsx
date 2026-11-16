import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Search } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { PageHero } from '../components/ui/PageHero';
import { FinalCTA } from '../components/home/FinalCTA';
import { site } from '../lib/site';
import { Reveal } from '../components/ui/Reveal';
import { INSIGHTS, INSIGHT_CATEGORIES, formatDate, type InsightCategory } from '../data/insights';

const card = 'rounded-[var(--radius-lg)] border border-line bg-surface';

export const Insights: React.FC = () => {
  const [cat, setCat] = useState<InsightCategory | 'All'>('All');
  const [q, setQ] = useState('');

  const featured = INSIGHTS.find((a) => a.featured) ?? INSIGHTS[0];
  const filtering = cat !== 'All' || q.trim() !== '';

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return INSIGHTS.filter((a) => {
      if (!filtering && a.slug === featured.slug) return false;
      if (cat !== 'All' && a.category !== cat) return false;
      if (!term) return true;
      return (a.title + ' ' + a.excerpt + ' ' + a.category).toLowerCase().includes(term);
    });
  }, [cat, q, filtering, featured.slug]);

  const used = new Set(INSIGHTS.map((a) => a.category));

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Insights: Guides on Web Development, SEO, AI Search and Marketing"
        description="Practical, plain-language guides on web development, SEO, GEO and AI search, digital marketing and automation from the Qevnaro editorial team."
        path="/insights"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Qevnaro Insights',
          url: `${site.url}/insights`,
          blogPost: INSIGHTS.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: `${site.url}/insights/${a.slug}`, datePublished: a.date })),
        }}
      />

      <PageHero
        crumbs={[{ label: 'Insights' }]}
        eyebrow="Insights"
        title="Clear thinking on building and growing online."
        accent="growing online."
        lead="Honest, practical guides for business owners and teams. No hype, no invented statistics."
      />

      <section className="container-x py-16 sm:py-20">
        {/* Featured */}
        {!filtering && (
          <Reveal>
            <Link
              to={`/insights/${featured.slug}`}
              className={`${card} group relative mb-14 block overflow-hidden p-8 transition-colors hover:border-line-strong sm:p-12`}
            >
              <div className="relative max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted">
                  <span className="t-micro rounded-full bg-brand-navy px-3 py-1 text-white">Featured</span>
                  <span>{featured.category}</span>
                </div>
                <h2 className="t-h1 mt-5 text-fg">{featured.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-fg-soft">{featured.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-fg-muted">
                  <span>{featured.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readingMinutes} min read</span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-sky">
                  Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Controls */}
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {(['All', ...INSIGHT_CATEGORIES] as const).map((c) => {
              const active = cat === c;
              const empty = c !== 'All' && !used.has(c);
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? 'border-brand-navy bg-brand-navy text-white'
                      : `border-line-strong bg-surface hover:border-fg ${empty ? 'text-fg-muted' : 'text-fg-soft'}`
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Search articles</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles"
              className="w-full rounded-full border border-line-strong bg-surface py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-fg-muted focus:border-brand-blue focus:outline-none"
            />
          </label>
        </div>

        {/* Grid */}
        {list.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.06}>
                <Link
                  to={`/insights/${a.slug}`}
                  className={`${card} group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_50px_-34px_rgba(12,29,72,0.35)]`}
                >
                  <span className="t-micro text-brand-sky">{a.category}</span>
                  <h3 className="t-h3 mt-3 text-fg">{a.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-soft">{a.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 text-xs text-fg-muted">
                    <span>{a.author}</span>
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                    <span>{a.readingMinutes} min read</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className={`${card} p-10 text-center`}>
            <p className="text-fg-soft">
              {cat !== 'All' && !q
                ? `We have not published in ${cat} yet. More guides are on the way.`
                : 'No articles match your search.'}
            </p>
            <button
              type="button"
              onClick={() => { setCat('All'); setQ(''); }}
              className="mt-4 text-sm font-semibold text-brand-sky hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <FinalCTA heading="Have a question we have not covered?" accent="covered?" body="Tell us what you are working on and we will point you in a sensible direction." />
    </div>
  );
};

export default Insights;
