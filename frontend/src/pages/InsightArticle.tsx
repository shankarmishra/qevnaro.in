import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Check, Clock, Link2 } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FinalCTA } from '../components/home/FinalCTA';
import { TEAM } from '../data/team';
import { INSIGHTS, formatDate, getInsight, slugifyHeading } from '../data/insights';
import NotFound from './NotFound';
import { site } from '../lib/site';

const SITE = site.url;

export const InsightArticle: React.FC = () => {
  const { slug = '' } = useParams();
  const article = getInsight(slug);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  const toc = useMemo(
    () => (article?.blocks ?? []).filter((b) => b.type === 'heading').map((b) => ({ id: slugifyHeading((b as { text: string }).text), text: (b as { text: string }).text })),
    [article],
  );

  const [active, setActive] = useState('');
  const [copied, setCopied] = useState(false);
  const [prevSlug, setPrevSlug] = useState(slug);
  if (prevSlug !== slug) {
    setPrevSlug(slug);
    setActive('');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!toc.length) return;
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-90px 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  if (!article) return <NotFound />;

  const url = `${SITE}/insights/${article.slug}`;
  const related = (article.related ?? [])
    .map((s) => getInsight(s))
    .filter(Boolean)
    .concat(INSIGHTS.filter((a) => a.slug !== article.slug && !(article.related ?? []).includes(a.slug)))
    .slice(0, 3) as typeof INSIGHTS;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const enc = encodeURIComponent;
  const shareBtn =
    'inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-[13px] font-medium text-fg-soft transition-colors hover:border-fg hover:text-fg';

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title={article.title}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          dateModified: article.updated ?? article.date,
          articleSection: article.category,
          image: `${SITE}/og/insights.jpg`,
          inLanguage: 'en-IN',
          // Named authors once the team is listed in data/team.ts; the organisation until then.
          author: TEAM.length
            ? TEAM.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role }))
            : { '@type': 'Organization', name: 'Qevnaro', url: SITE },
          publisher: { '@type': 'Organization', name: 'Qevnaro', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/logo-qevnaro.png` } },
          mainEntityOfPage: url,
        }}
      />

      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-blue"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <header className="border-b border-line bg-canvas pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div className="container-x"><div className="max-w-4xl">
          <Breadcrumbs items={[{ label: 'Insights', to: '/insights' }, { label: article.category }]} />
          <span className="t-micro text-brand-sky">{article.category}</span>
          <h1 className="t-h1 mt-5 text-fg">{article.title}</h1>
          <p className="t-lead mt-6 text-fg-soft">{article.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-muted">
            <span className="text-fg-soft">{article.author}</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readingMinutes} min read</span>
          </div>
        </div></div>
      </header>

      <div className="container-x grid gap-12 bg-canvas py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
        <aside className="hidden lg:block">
          <nav aria-label="Table of contents" className="sticky top-28">
            <p className="t-micro mb-4 text-fg-muted">On this page</p>
            <ul className="space-y-1 border-l border-line">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors ${
                      active === t.id ? 'border-brand-blue text-fg' : 'border-transparent text-fg-muted hover:text-fg'
                    }`}
                  >
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0 max-w-[68ch]">
          {article.blocks.map((b, i) => {
            if (b.type === 'heading')
              return (
                <h2 key={i} id={slugifyHeading(b.text)} className="t-h2 mt-14 scroll-mt-28 text-fg first:mt-0">
                  {b.text}
                </h2>
              );
            if (b.type === 'paragraph')
              return <p key={i} className="mt-5 text-[1.125rem] leading-[1.8] text-fg-soft">{b.text}</p>;
            const Tag = b.ordered ? 'ol' : 'ul';
            return (
              <Tag
                key={i}
                className={`mt-5 space-y-3 pl-6 text-[1.125rem] leading-[1.7] text-fg-soft marker:text-brand-blue ${b.ordered ? 'list-decimal' : 'list-disc'}`}
              >
                {b.items.map((it, j) => <li key={j}>{it}</li>)}
              </Tag>
            );
          })}

          <div className="mt-14 border-t border-line pt-8">
            <p className="mb-4 text-sm text-fg-muted">Share this article</p>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={copy} className={shareBtn}>
                {copied ? <Check className="h-3.5 w-3.5 text-ok" /> : <Link2 className="h-3.5 w-3.5" />}
                {copied ? 'Link copied' : 'Copy link'}
              </button>
              <a className={shareBtn} target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}>
                LinkedIn
              </a>
              <a className={shareBtn} target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(article.title)}`}>
                X
              </a>
            </div>
          </div>
        </article>
      </div>

      <section className="border-t border-line bg-surface">
        <div className="container-x py-16 sm:py-20">
          <h2 className="t-h2 text-fg">Related articles</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                to={`/insights/${a.slug}`}
                className="group rounded-[var(--radius-lg)] border border-line bg-canvas p-7 transition-colors hover:border-line-strong"
              >
                <span className="t-micro text-brand-sky">{a.category}</span>
                <h3 className="t-h3 mt-3 text-fg"><span className="link-underline">{a.title}</span></h3>
                <p className="mt-3 text-xs text-fg-muted">{a.readingMinutes} min read</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA heading="Want help applying this to your business?" accent="business?" body="Share your goals and we will suggest a practical next step." />
    </div>
  );
};

export default InsightArticle;
