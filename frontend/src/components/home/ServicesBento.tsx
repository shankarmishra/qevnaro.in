import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow, Reveal, SplitHeading } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { ServiceObject, objectFor } from '../ui/ServiceObject';
import { SERVICE_GROUPS, SERVICE_SHORT, SERVICES_LIST } from '../../data/services';

/** Four service groups, each with its live 3D object, and every service page linked. */
export const ServicesBento: React.FC = () => (
  <section className="section-y border-t border-line bg-elevated" aria-labelledby="services-heading">
    <div className="container-x">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <Reveal><Eyebrow>What we do</Eyebrow></Reveal>
          <SplitHeading as="h2" text="Everything a growing business needs online." accent="online." className="t-h1 mt-5 text-fg" />
        </div>
        <Reveal delay={0.1}>
          <Button to="/services" variant="outline">All {SERVICES_LIST.length} services</Button>
        </Reveal>
      </div>
      <span id="services-heading" className="sr-only">Services</span>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {SERVICE_GROUPS.map((g, gi) => (
          <Reveal key={g.key} delay={gi * 0.06}>
            <article className="group/card relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_40px_80px_-50px_rgba(12,29,72,0.45)]">
              <div className="relative h-64 overflow-hidden border-b border-line bg-[radial-gradient(ellipse_at_50%_60%,#ffffff_0%,#F4F3EF_70%)] sm:h-72">
                <div className="absolute inset-0 transition-transform duration-700 group-hover/card:scale-[1.04]">
                  <ServiceObject kind={objectFor(g.art)} className="h-full w-full" />
                </div>
                <div className="absolute left-7 top-6 flex items-baseline gap-3">
                  <span className="serif-accent text-4xl leading-none text-brand-blue">{g.n}</span>
                  <span className="t-micro text-fg-muted">{g.key}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <h3 className="t-h2 text-fg">{g.verb}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fg-soft">{g.blurb}</p>
                <ul className="mt-7 border-t border-line">
                  {g.services.map((s) => (
                    <li key={s.slug} className="border-b border-line">
                      <Link
                        to={`/services/${s.slug}`}
                        className="group flex items-center justify-between gap-4 py-3.5 text-[15px] font-medium text-fg transition-colors hover:text-brand-sky"
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-1.5">{SERVICE_SHORT[s.slug] ?? s.title}</span>
                        <ArrowUpRight className="h-4 w-4 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesBento;
