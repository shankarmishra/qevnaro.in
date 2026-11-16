import { createContext } from 'react';

/** Per-page head data. Collected during the build-time render, applied to document.head in the browser. */
export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  image: string;
  robots: string;
  type: string;
  jsonLd: object[];
}

export interface HeadCollector {
  head?: HeadData;
}

export const HeadContext = createContext<HeadCollector | null>(null);

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Head tags as an HTML string, for the prerender step. */
export function renderHead(h: HeadData, siteName: string): string {
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="robots" content="${h.robots}" />`,
    `<link rel="canonical" href="${esc(h.canonical)}" />`,
    `<meta property="og:site_name" content="${esc(siteName)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:type" content="${h.type}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${esc(h.canonical)}" />`,
    `<meta property="og:image" content="${esc(h.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${esc(h.image)}" />`,
    ...h.jsonLd.map(
      (j) => `<script type="application/ld+json" data-route-jsonld>${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`,
    ),
  ];
  return tags.join('\n    ');
}
