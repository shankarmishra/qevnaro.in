import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';
import { HeadContext, renderHead, type HeadCollector } from './lib/head';
import { site, offices } from './lib/site';
import { allPaths, REDIRECTS } from './routes';
import { SERVICES_LIST, SERVICE_GROUPS } from './data/services';
import { industries } from './data/industries';
import { INSIGHTS } from './data/insights';
import { projects } from './lib/projects';
import { GLOBAL_FAQS } from './data/faqs';
import { CITIES, COUNTRIES } from './data/geo';
import { INDUSTRY_SERVICES } from './data/industryServices';
import { GLOSSARY } from './data/glossary';
import { CITY_SERVICES, servicesForCity } from './data/cityServices';

/** Render one URL to static HTML. Waits for every lazy route, so the output is the full page. */
const tree = (url: string, collector: HeadCollector) => (
  <HeadContext.Provider value={collector}>
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>
  </HeadContext.Provider>
);

/**
 * React streams large Suspense boundaries "outlined": a fallback in place and the real content in
 * a hidden block that a script swaps in. For static HTML that crawlers read without JavaScript,
 * every boundary must be inline, so the chunk size is effectively unlimited.
 */
const OPTIONS = { progressiveChunkSize: Number.MAX_SAFE_INTEGER };

export async function render(url: string): Promise<{ html: string; head: string }> {
  // First pass loads every React.lazy route module this URL needs, so in the second pass they
  // render synchronously and nothing suspends.
  await prerender(tree(url, {}), OPTIONS);
  const collector: HeadCollector = {};
  const { prelude } = await prerender(tree(url, collector), OPTIONS);
  const html = await new Response(prelude as ReadableStream).text();
  if (html.includes('<template id="B:')) throw new Error(`Incomplete prerender (suspended content) for ${url}`);
  if (!collector.head) throw new Error(`No <SEO> rendered for ${url}`);
  return { html, head: renderHead(collector.head, site.name) };
}

/** Site data the build step needs for the sitemap, redirects and llms.txt. */
export const data = {
  site,
  offices,
  paths: allPaths(),
  redirects: REDIRECTS,
  groups: SERVICE_GROUPS.map((g) => ({ key: g.key, blurb: g.blurb, slugs: g.services.map((s) => s.slug) })),
  services: SERVICES_LIST.map((s) => ({ slug: s.slug, title: s.title, desc: s.shortDesc })),
  industries: industries.map((i) => ({ slug: i.slug, name: i.name, desc: i.tagline })),
  insights: INSIGHTS.map((a) => ({ slug: a.slug, title: a.title, desc: a.excerpt, date: a.date })),
  projects: projects.map((p) => ({ slug: p.slug, name: p.name, desc: p.tagline, url: p.liveUrl })),
  faqs: GLOBAL_FAQS.map((f) => ({ q: f.q, a: f.a })),
  cities: CITIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    office: !!c.office,
    desc: c.market.split('. ')[0] + '.',
    services: servicesForCity(c).map((s) => ({ slug: s, label: CITY_SERVICES[s].label })),
  })),
  countries: COUNTRIES.map((c) => ({ slug: c.slug, name: c.name, desc: c.overlap.split('. ')[0] + '.' })),
  combos: INDUSTRY_SERVICES.map((x) => ({ path: `/services/${x.service}/for/${x.industry}`, title: x.title, desc: x.intro.split('. ')[0] + '.' })),
  glossary: GLOSSARY.map((g) => ({ term: g.term, def: g.def })),
};
