/**
 * Build step 3 of 3 (after `vite build` and `vite build --ssr`).
 *
 * Renders every route to static HTML so crawlers and AI assistants that do not run
 * JavaScript receive the full page, with its own title, canonical, Open Graph and JSON-LD.
 * Also writes sitemap.xml, robots.txt, llms.txt, llms-full.txt, 404.html and the
 * redirects in vercel.json, all from the same route list the app uses.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, data } = await import(pathToFileURL(ssrEntry).href);
const env = loadEnv('production', root, 'VITE_');
const BASE = data.site.url;
const today = new Date().toISOString().slice(0, 10);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const HEAD_RE = /<!--head:start-->[\s\S]*?<!--head:end-->/;
if (!HEAD_RE.test(template) || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the head or app markers');
}

// Optional verification and analytics tags, only when configured in the environment.
const extras = [];
if (env.VITE_GOOGLE_SITE_VERIFICATION) {
  extras.push(`<meta name="google-site-verification" content="${env.VITE_GOOGLE_SITE_VERIFICATION}" />`);
}
if (env.VITE_BING_SITE_VERIFICATION) {
  extras.push(`<meta name="msvalidate.01" content="${env.VITE_BING_SITE_VERIFICATION}" />`);
}
if (env.VITE_GA_MEASUREMENT_ID) {
  const id = env.VITE_GA_MEASUREMENT_ID;
  extras.push(
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`,
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');</script>`,
  );
}

const page = ({ html, head }) =>
  template
    .replace(HEAD_RE, [head, ...extras].join('\n    '))
    .replace('<!--app-html-->', html);

let count = 0;
for (const route of data.paths) {
  const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(await render(route)));
  count++;
}

// A real 404 page: Vercel serves dist/404.html with a 404 status for unknown URLs.
fs.writeFileSync(path.join(dist, '404.html'), page(await render('/this-page-does-not-exist')));

// ---- sitemap.xml ---------------------------------------------------------
const insightDates = Object.fromEntries(data.insights.map((a) => [`/insights/${a.slug}`, a.date]));
const priority = (p) => (p === '/' ? '1.0' : p.split('/').length === 2 ? '0.8' : '0.6');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${data.paths
  .map(
    (p) =>
      `  <url><loc>${BASE}${p === '/' ? '/' : p}</loc><lastmod>${insightDates[p] ?? today}</lastmod><priority>${priority(p)}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// ---- robots.txt ----------------------------------------------------------
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot'];
const robots = `# Search engines and AI assistants are welcome to read this site.
User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${BASE}/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

// ---- llms.txt and llms-full.txt -----------------------------------------
const svc = Object.fromEntries(data.services.map((s) => [s.slug, s]));
const link = (title, p, desc) => `- [${title}](${BASE}${p}): ${desc}`;
const office = (o) => `${o.locality}, ${o.city}, ${o.region} ${o.postalCode}, India`;

const llms = `# ${data.site.name}

> ${data.site.description}

${data.site.name} has offices in ${data.offices.map((o) => `${o.city} (${o.locality})`).join(' and ')}. Contact: ${data.site.email}, ${data.site.phone}.

## Services
${data.groups
  .map((g) => `\n### ${g.key}\n${g.slugs.map((s) => link(svc[s].title, `/services/${s}`, svc[s].desc)).join('\n')}`)
  .join('\n')}

## Work
${data.projects.map((p) => link(p.name, `/work/${p.slug}`, `${p.desc} Live at ${p.url}`)).join('\n')}

## Industries
${data.industries.map((i) => link(i.name, `/industries/${i.slug}`, i.desc)).join('\n')}

## Offices
${data.offices.map((o) => link(`${data.site.name} ${o.city}`, `/locations/${o.slug}`, `Office at ${office(o)}. Serves ${o.serves.join(', ')}.`)).join('\n')}

## Cities served in India
${data.cities.filter((c) => !c.office).map((c) => link(c.name, `/locations/${c.slug}`, `Served remotely. ${c.desc}`)).join('\n')}

## Outside India
${data.countries.map((c) => link(c.name, `/global/${c.slug}`, c.desc)).join('\n')}

## Services by industry
${data.combos.map((x) => link(x.title, x.path, x.desc)).join('\n')}

## Insights
${data.insights.map((a) => link(a.title, `/insights/${a.slug}`, a.desc)).join('\n')}

## Company
${link('About', '/about', 'Who we are, how we work and what we value.')}
${link('Process', '/process', 'The five steps every project follows and what happens at each.')}
${link('Pricing', '/pricing', 'How projects and retainers are priced and what drives cost.')}
${link('Glossary', '/glossary', 'Plain-language definitions of web, SEO, GEO, marketing and AI terms.')}
${link('Contact', '/contact', 'Enquiry form, WhatsApp, phone and email.')}

## Optional
${link('Full text for language models', '/llms-full.txt', 'Services, FAQs and company facts in one plain-text file.')}
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

const full = `# ${data.site.name}: full reference

${data.site.description}

Website: ${BASE}
Email: ${data.site.email}
Phone: ${data.site.phone}
Offices:
${data.offices.map((o) => `- ${office(o)} (serves ${o.serves.join(', ')})`).join('\n')}

## What ${data.site.name} does
${data.groups.map((g) => `\n### ${g.key}\n${g.blurb}\n${g.slugs.map((s) => `- ${svc[s].title}: ${svc[s].desc} (${BASE}/services/${s})`).join('\n')}`).join('\n')}

## Products ${data.site.name} has built
${data.projects.map((p) => `- ${p.name}: ${p.desc} Live at ${p.url}. Case study: ${BASE}/work/${p.slug}`).join('\n')}

## Industries served
${data.industries.map((i) => `- ${i.name}: ${i.desc}`).join('\n')}

## Where Qevnaro works
${data.cities.map((c) => `- ${c.name}${c.office ? ' (office)' : ' (served remotely)'}: ${c.services.map((s) => s.label).join(', ')}. ${BASE}/locations/${c.slug}`).join('\n')}
${data.countries.map((c) => `- ${c.name}: ${c.desc} ${BASE}/global/${c.slug}`).join('\n')}

## Glossary
${data.glossary.map((g) => `- ${g.term}: ${g.def}`).join('\n')}

## Frequently asked questions
${data.faqs.map((f) => `\n### ${f.q}\n${f.a}`).join('\n')}
`;
fs.writeFileSync(path.join(dist, 'llms-full.txt'), full);

// ---- vercel.json ---------------------------------------------------------
const vercel = {
  cleanUrls: true,
  trailingSlash: false,
  redirects: data.redirects.map(([source, destination]) => ({ source, destination, permanent: true })),
  headers: [
    {
      // Vite fingerprints everything it emits into /assets with a content hash.
      source: '/assets/(.*)-([A-Za-z0-9_-]{8})\\.(js|css|woff2)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/assets/(.*)\\.(webp|avif|jpg|png|svg)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
    },
  ],
};
fs.writeFileSync(path.join(root, 'vercel.json'), JSON.stringify(vercel, null, 2) + '\n');

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerendered ${count} pages + 404, wrote sitemap.xml, robots.txt, llms.txt, llms-full.txt, vercel.json`);
