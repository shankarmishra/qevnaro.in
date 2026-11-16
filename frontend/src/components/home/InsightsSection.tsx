import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow, Reveal, SplitHeading } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { INSIGHTS, formatDate } from '../../data/insights';

export const InsightsSection: React.FC = () => {
  const items = INSIGHTS.slice(0, 3);
  if (!items.length) return null;

  return (
    <section className="section-y border-t border-line bg-canvas" aria-labelledby="insights-heading">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Reveal><Eyebrow>Insights</Eyebrow></Reveal>
            <SplitHeading
              as="h2"
              text="Notes for businesses building what's next."
              accent="what's next."
              className="t-h1 mt-5 text-fg"
            />
            <span id="insights-heading" className="sr-only">Latest insights</span>
          </div>
          <Reveal delay={0.1}>
            <Button to="/insights" variant="outline">All insights</Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 border-t border-line-strong md:grid-cols-3">
          {items.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.07}>
              <Link to={`/insights/${a.slug}`} className="group flex h-full flex-col border-b border-line py-8 md:border-b-0">
                <div className="flex items-center justify-between">
                  <span className="t-micro text-brand-sky">{a.category}</span>
                  <ArrowUpRight className="h-4 w-4 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                </div>
                <h3 className="t-h3 mt-5 text-fg">
                  <span className="link-underline">{a.title}</span>
                </h3>
                <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-fg-soft">{a.excerpt}</p>
                <p className="mt-auto pt-6 text-[13px] text-fg-muted">
                  {formatDate(a.date)} · {a.readingMinutes} min read
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
