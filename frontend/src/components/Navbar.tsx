import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { QevnaroLogo } from './common/QevnaroLogo';
import { Button } from './ui/Button';
import { SERVICE_GROUPS, SERVICE_SHORT } from '../data/services';
import { industries } from '../data/industries';
import { DUR, EASE } from '../lib/motion';

type Panel = 'services' | 'industries' | null;

const LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
];

const navCls = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${isActive ? 'text-fg' : 'text-fg-soft hover:text-fg'}`;

const triggerCls = (on: boolean) =>
  `inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${on ? 'text-fg' : 'text-fg-soft hover:text-fg'}`;

export const openCommandMenu = () => window.dispatchEvent(new Event('qev:command'));

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // Close everything on navigation and on Escape
  useEffect(() => {
    setPanel(null);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanel(null);
        setMobile(false);
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [mobile]);

  const solid = scrolled || panel !== null;

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setPanel(null)}>
      <div className="container-x pt-3">
        <div
          className={`flex h-[60px] items-center justify-between rounded-full pl-5 pr-2.5 transition-[background-color,border-color,box-shadow] duration-500 ${
            solid ? 'glass-dock' : 'border border-transparent'
          }`}
        >
          <Link to="/" aria-label="Qevnaro home" className="inline-flex shrink-0">
            <QevnaroLogo tone="light" markSize={30} />
          </Link>

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            <button
              type="button"
              className={triggerCls(panel === 'services' || pathname.startsWith('/services'))}
              aria-expanded={panel === 'services'}
              aria-controls="nav-services"
              onMouseEnter={() => setPanel('services')}
              onClick={() => setPanel(panel === 'services' ? null : 'services')}
            >
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${panel === 'services' ? 'rotate-180' : ''}`} />
            </button>
            <button
              type="button"
              className={triggerCls(panel === 'industries' || pathname.startsWith('/industries'))}
              aria-expanded={panel === 'industries'}
              aria-controls="nav-industries"
              onMouseEnter={() => setPanel('industries')}
              onClick={() => setPanel(panel === 'industries' ? null : 'industries')}
            >
              Industries
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${panel === 'industries' ? 'rotate-180' : ''}`} />
            </button>
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={navCls} onMouseEnter={() => setPanel(null)}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openCommandMenu}
              aria-label="Search the site"
              className="hidden h-10 w-10 place-items-center rounded-full text-fg-soft transition-colors hover:bg-elevated hover:text-fg md:grid"
            >
              <Search className="h-4 w-4" />
            </button>
            <span className="hidden md:block"><Button to="/contact" size="sm">Start a project</Button></span>
            <button
              type="button"
              onClick={() => setMobile((m) => !m)}
              aria-label={mobile ? 'Close menu' : 'Open menu'}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full text-fg lg:hidden"
            >
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop mega panels */}
        <AnimatePresence>
          {panel && (
            <motion.div
              key={panel}
              id={`nav-${panel}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: DUR.fast, ease: EASE }}
              className="glass-dock mt-2 hidden overflow-hidden rounded-[var(--radius-lg)] bg-white lg:block"
            >
              {panel === 'services' ? (
                <div>
                  <div className="grid grid-cols-4 divide-x divide-line">
                    {SERVICE_GROUPS.map((g) => (
                      <div key={g.key} className="p-7">
                        <div className="flex items-baseline gap-3">
                          <span className="serif-accent text-2xl leading-none text-brand-blue">{g.n}</span>
                          <span className="t-micro text-fg-muted">{g.key}</span>
                        </div>
                        <ul className="mt-5 space-y-0.5">
                          {g.services.map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="group -mx-2.5 flex items-center justify-between rounded-lg px-2.5 py-2 text-[15px] font-medium text-fg transition-colors hover:bg-elevated"
                              >
                                {SERVICE_SHORT[s.slug] ?? s.title}
                                <ArrowUpRight className="h-3.5 w-3.5 text-fg-muted opacity-0 transition-opacity group-hover:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/services"
                    className="group flex items-center justify-between border-t border-line bg-elevated px-7 py-4 text-sm font-medium text-fg"
                  >
                    See all services and how they fit together
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              ) : (
                <div>
                  <ul className="grid grid-cols-3 gap-x-6 gap-y-1 p-7">
                    {industries.map((ind) => (
                      <li key={ind.slug}>
                        <Link
                          to={`/industries/${ind.slug}`}
                          className="group -mx-2.5 flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-elevated"
                        >
                          <ind.icon className="h-4 w-4 shrink-0 text-brand-blue" />
                          <span className="text-[15px] font-medium text-fg">{ind.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/industries"
                    className="group flex items-center justify-between border-t border-line bg-elevated px-7 py-4 text-sm font-medium text-fg"
                  >
                    See all industries
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.fast, ease: EASE }}
            className="fixed inset-0 -z-10 overflow-y-auto bg-canvas pb-10 pt-24 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x">
              <details className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-3xl font-medium tracking-tight text-fg">
                  Services
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="grid gap-6 pb-6 sm:grid-cols-2">
                  {SERVICE_GROUPS.map((g) => (
                    <div key={g.key}>
                      <p className="t-micro text-fg-muted">{g.key}</p>
                      <ul className="mt-2">
                        {g.services.map((s) => (
                          <li key={s.slug}>
                            <Link to={`/services/${s.slug}`} className="block py-1.5 text-[17px] text-fg-soft">
                              {SERVICE_SHORT[s.slug] ?? s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link to="/services" className="text-[15px] font-medium text-brand-sky">All services</Link>
                </div>
              </details>
              <details className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-3xl font-medium tracking-tight text-fg">
                  Industries
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="pb-6">
                  {industries.map((ind) => (
                    <li key={ind.slug}>
                      <Link to={`/industries/${ind.slug}`} className="block py-1.5 text-[17px] text-fg-soft">{ind.name}</Link>
                    </li>
                  ))}
                </ul>
              </details>
              {[...LINKS, { to: '/process', label: 'Process' }, { to: '/careers', label: 'Careers' }].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="block border-b border-line py-4 font-display text-3xl font-medium tracking-tight text-fg"
                >
                  {l.label}
                </Link>
              ))}
              <Button to="/contact" size="lg" className="mt-8 w-full">Start a project</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
