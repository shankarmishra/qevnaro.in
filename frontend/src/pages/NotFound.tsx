import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Button } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/Reveal';

const LINKS = [
  { to: '/services', label: 'Services', desc: 'What we build and run' },
  { to: '/work', label: 'Work', desc: 'Live products we built' },
  { to: '/insights', label: 'Insights', desc: 'Articles and guides' },
  { to: '/contact', label: 'Contact', desc: 'Talk to the team' },
];

export const NotFound: React.FC<{ title?: string; body?: string }> = ({
  title = 'This page took a wrong turn.',
  body = 'The address may be mistyped or the page may have moved. Try one of these instead.',
}) => (
  <div className="bg-canvas text-fg">
    <SEO title="Page not found" description="The page you are looking for could not be found." path="/404" noindex />
    <section className="container-x grid min-h-[86vh] items-center gap-12 pb-24 pt-36 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Eyebrow>Error 404</Eyebrow>
        <p className="mt-6 font-display text-[clamp(6rem,18vw,14rem)] font-medium leading-[0.85] tracking-[-0.06em] text-fg" aria-hidden="true">
          4<span className="serif-accent text-brand-blue">0</span>4
        </p>
        <h1 className="t-h2 mt-8 text-fg">{title}</h1>
        <p className="t-lead mt-4 max-w-md text-fg-soft">{body}</p>
        <div className="mt-9"><Button to="/">Go to homepage</Button></div>
      </div>
      <ul className="border-t border-line-strong lg:col-span-5">
        {LINKS.map((l) => (
          <li key={l.to} className="border-b border-line">
            <Link to={l.to} className="group flex items-center justify-between gap-4 py-5">
              <span>
                <span className="block text-[17px] font-medium text-fg"><span className="link-underline">{l.label}</span></span>
                <span className="text-sm text-fg-muted">{l.desc}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-fg-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default NotFound;
