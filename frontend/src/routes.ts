import { SERVICES_LIST } from './data/services';
import { industries } from './data/industries';
import { INSIGHTS } from './data/insights';
import { placePaths } from './data/cityServices';
import { CITIES, COUNTRIES } from './data/geo';
import { industryServicePaths } from './data/industryServices';
import { projects } from './lib/projects';

/** Old URLs that now live elsewhere. Mirrored as HTTP 301s in vercel.json by the prerender step. */
export const REDIRECTS: [string, string][] = [
  ['/services/app-development', '/services/mobile-app-development'],
  ['/services/social-media', '/services/social-media-marketing'],
  ['/services/ui-design', '/services/ui-ux-design'],
  ['/solutions/e-commerce', '/services/ecommerce-development'],
  ['/solutions/lead-generation', '/services/performance-marketing'],
  ['/solutions/brand-identity', '/services/branding'],
  ['/portfolio', '/work'],
  ['/case-studies/pulsencare', '/work/pulsencare'],
  ['/case-studies/menusqr', '/work/menusqr'],
  ['/industries/edtech', '/industries/education'],
  ['/industries/retail-ecommerce', '/industries/ecommerce-retail'],
  ['/industries/manufacturing', '/industries/manufacturing-b2b'],
  ['/industries/fintech', '/industries/finance-consulting'],
  ['/lab/agents-at-work', '/agents-at-work'],
];

const CORE = [
  '/', '/services', '/work', '/industries', '/process', '/pricing', '/about', '/insights', '/glossary',
  '/contact', '/careers', '/agents-at-work', '/locations', '/global',
  '/privacy-policy', '/terms-and-conditions', '/cookies-policy',
];

/** Every indexable URL on the site. The single list used for prerendering, the sitemap and llms.txt. */
export const allPaths = (): string[] => [
  ...CORE,
  ...projects.map((p) => `/work/${p.slug}`),
  ...SERVICES_LIST.map((s) => `/services/${s.slug}`),
  ...placePaths(),
  ...industryServicePaths(),
  ...CITIES.map((c) => `/locations/${c.slug}`),
  ...COUNTRIES.map((c) => `/global/${c.slug}`),
  ...industries.map((i) => `/industries/${i.slug}`),
  ...INSIGHTS.map((a) => `/insights/${a.slug}`),
];
