import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { QevnaroLogo } from './common/QevnaroLogo';
import { Button } from './ui/Button';
import { SERVICE_GROUPS, SERVICE_SHORT } from '../data/services';
import { offices, site, whatsappLink } from '../lib/site';

const COMPANY = [
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/industries', label: 'Industries' },
  { to: '/process', label: 'Process' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/insights', label: 'Insights' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/locations', label: 'Locations' },
  { to: '/global', label: 'Global' },
  { to: '/agents-at-work', label: 'Agents at work' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

const SOCIALS: { key: keyof typeof site.social; label: string }[] = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'x', label: 'X' },
  { key: 'youtube', label: 'YouTube' },
];

const colTitle = 't-micro text-fg-muted';

/** The name in very large type, rising out of a mask as the footer scrolls in. */
function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['70%', '0%']);
  return (
    <div ref={ref} className="overflow-hidden border-t border-line" aria-hidden="true">
      <motion.p
        style={{ y }}
        className="container-x select-none whitespace-nowrap pb-2 pt-6 text-center font-display text-[clamp(4.5rem,21vw,21rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-brand-navy"
      >
        Qevnaro<span className="text-brand-blue">.</span>
      </motion.p>
    </div>
  );
}
const linkCls = 'link-underline text-[15px] text-fg-soft transition-colors hover:text-fg';

export const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const wa = whatsappLink();
  // The home and contact pages end with their own call to action.
  const showBand = pathname !== '/' && pathname !== '/contact';

  return (
    <footer className="border-t border-line bg-canvas">
      {showBand && (
        <div className="border-b border-line">
          <div className="container-x flex flex-col items-start justify-between gap-6 py-14 lg:flex-row lg:items-center">
            <p className="t-h2 max-w-2xl text-fg">
              Build better. <span className="serif-accent text-brand-blue">Grow smarter.</span> Move forward.
            </p>
            <Button to="/contact" size="lg">Start a project</Button>
          </div>
        </div>
      )}

      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Link to="/" aria-label="Qevnaro home" className="inline-flex">
            <QevnaroLogo tone="light" markSize={34} />
          </Link>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-fg-soft">
            A technology and digital growth agency. We design, build and grow websites, apps and brands for
            businesses across India.
          </p>
          <ul className="mt-6 space-y-1.5 text-[15px] text-fg-soft">
            {site.email && <li><a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a></li>}
            {site.phone && <li><a href={`tel:${site.phone.replace(/\s/g, '')}`} className={linkCls}>{site.phone}</a></li>}
            {wa && <li><a href={wa} target="_blank" rel="noreferrer" className={linkCls}>WhatsApp us</a></li>}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {SOCIALS.filter((s) => site.social[s.key]).map((s) => (
              <li key={s.key}>
                <a href={site.social[s.key]} target="_blank" rel="noreferrer" className={linkCls}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Services" className="grid grid-cols-2 gap-x-8 gap-y-10 lg:col-span-5">
          {SERVICE_GROUPS.map((g) => (
            <div key={g.key}>
              <h3 className={colTitle}>{g.key}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.services.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className={linkCls}>{SERVICE_SHORT[s.slug] ?? s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:col-span-3 lg:grid-cols-1">
          <nav aria-label="Company">
            <h3 className={colTitle}>Company</h3>
            <ul className="mt-4 grid grid-cols-1 gap-y-2.5 lg:grid-cols-2 lg:gap-x-6">
              {COMPANY.map((l) => (
                <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className={colTitle}>Offices</h3>
            <ul className="mt-4 space-y-2.5">
              {offices.map((o) => (
                <li key={o.slug}>
                  <Link to={`/locations/${o.slug}`} className={linkCls}>
                    {o.city}, {o.locality}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Wordmark />

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-6 text-[13px] text-fg-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Qevnaro. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link to="/privacy-policy" className="hover:text-fg">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-fg">Terms &amp; Conditions</Link></li>
            <li><Link to="/cookies-policy" className="hover:text-fg">Cookie Policy</Link></li>
            <li>
              <a href="#main" className="inline-flex items-center gap-1.5 hover:text-fg">
                Back to top <ArrowUp className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
