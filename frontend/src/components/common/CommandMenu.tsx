import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Search, X } from 'lucide-react';
import { SERVICES_LIST, SERVICE_SHORT } from '../../data/services';
import { industries } from '../../data/industries';
import { INSIGHTS } from '../../data/insights';
import { projects } from '../../lib/projects';
import { offices } from '../../lib/site';
import { DUR, EASE } from '../../lib/motion';

interface Item {
  title: string;
  group: string;
  href: string;
}

const PAGES: Item[] = [
  { title: 'Home', group: 'Pages', href: '/' },
  { title: 'Services', group: 'Pages', href: '/services' },
  { title: 'Work', group: 'Pages', href: '/work' },
  { title: 'Industries', group: 'Pages', href: '/industries' },
  { title: 'Process', group: 'Pages', href: '/process' },
  { title: 'Pricing', group: 'Pages', href: '/pricing' },
  { title: 'About', group: 'Pages', href: '/about' },
  { title: 'Insights', group: 'Pages', href: '/insights' },
  { title: 'Careers', group: 'Pages', href: '/careers' },
  { title: 'Contact', group: 'Pages', href: '/contact' },
];

/** Site-wide quick jump. Opens with Ctrl/⌘ K or the search button in the header. */
export const CommandMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const all = useMemo<Item[]>(
    () => [
      ...PAGES,
      ...SERVICES_LIST.map((s) => ({ title: SERVICE_SHORT[s.slug] ?? s.title, group: 'Services', href: `/services/${s.slug}` })),
      ...projects.map((p) => ({ title: p.name, group: 'Work', href: `/work/${p.slug}` })),
      ...industries.map((i) => ({ title: i.name, group: 'Industries', href: `/industries/${i.slug}` })),
      ...offices.map((o) => ({ title: `${o.city} office`, group: 'Locations', href: `/locations/${o.slug}` })),
      ...INSIGHTS.map((a) => ({ title: a.title, group: 'Insights', href: `/insights/${a.slug}` })),
    ],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all.slice(0, 12);
    return all.filter((i) => `${i.title} ${i.group}`.toLowerCase().includes(q)).slice(0, 12);
  }, [all, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
    setIndex(0);
    lastFocus.current?.focus();
  };

  useEffect(() => {
    const show = () => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener('keydown', key);
    window.addEventListener('qev:command', show);
    return () => {
      window.removeEventListener('keydown', key);
      window.removeEventListener('qev:command', show);
    };
  }, []);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  useEffect(() => setIndex(0), [query]);
  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const go = (item?: Item) => {
    if (!item) return;
    close();
    navigate(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[index]);
    } else if (e.key === 'Tab') {
      // Keep focus inside the dialog
      e.preventDefault();
      input.current?.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9990] flex items-start justify-center bg-brand-navy/30 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.fast }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DUR.fast, ease: EASE }}
            className="w-full max-w-xl overflow-hidden rounded-[var(--radius-lg)] border border-line-strong bg-surface shadow-[0_40px_90px_-30px_rgba(12,29,72,0.45)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden="true" />
              <input
                ref={input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, work, industries, articles"
                aria-label="Search"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-results"
                aria-activedescendant={results[index] ? `command-item-${index}` : undefined}
                className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-muted"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-fg-muted hover:bg-elevated hover:text-fg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul ref={list} id="command-results" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-fg-muted">Nothing matches “{query}”.</li>
              )}
              {results.map((r, i) => (
                <li
                  key={r.href}
                  id={`command-item-${i}`}
                  data-i={i}
                  role="option"
                  aria-selected={i === index}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => go(r)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 ${
                    i === index ? 'bg-elevated' : ''
                  }`}
                >
                  <span className="truncate text-[15px] text-fg">{r.title}</span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="t-micro text-fg-muted">{r.group}</span>
                    {i === index && <CornerDownLeft className="h-3.5 w-3.5 text-fg-muted" aria-hidden="true" />}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-5 py-3 text-[12px] text-fg-muted">
              <span>↑ ↓ to move · Enter to open · Esc to close</span>
              <span className="font-mono">Ctrl K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
