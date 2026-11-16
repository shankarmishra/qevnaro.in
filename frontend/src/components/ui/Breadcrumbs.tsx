import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { breadcrumbSchema } from '../../lib/schema';

/** Visual breadcrumbs plus matching BreadcrumbList structured data. */
export const Breadcrumbs = ({ items }: { items: { label: string; to?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="mb-8">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(items)) }} />
    <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-fg-muted">
      <li><Link to="/" className="transition-colors hover:text-fg">Home</Link></li>
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          {it.to ? (
            <Link to={it.to} className="transition-colors hover:text-fg">{it.label}</Link>
          ) : (
            <span aria-current="page" className="text-fg">{it.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
