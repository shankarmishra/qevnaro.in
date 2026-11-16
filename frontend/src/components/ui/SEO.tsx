import { useContext, useEffect } from 'react';
import { HeadContext, type HeadData } from '../../lib/head';
import { site } from '../../lib/site';

interface Props {
  title: string;
  description: string;
  path?: string;
  image?: string;
  jsonLd?: object | object[] | null;
  noindex?: boolean;
  type?: 'website' | 'article';
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/** Social image per page type, unless a page passes its own. */
const defaultImage = (p: string) =>
  p.startsWith('/services') || p.startsWith('/industries') || p === '/pricing' || p === '/process'
    ? '/og/services.jpg'
    : p.startsWith('/work')
      ? '/og/work.jpg'
      : p.startsWith('/insights') || p === '/glossary'
        ? '/og/insights.jpg'
        : p.startsWith('/locations') || p.startsWith('/global')
          ? '/og/locations.jpg'
          : '/og/home.jpg';

const build = ({ title, description, path, image, jsonLd, noindex, type = 'website' }: Props): HeadData => {
  const p = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  image = image ?? defaultImage(p);
  return {
    title: title.includes('Qevnaro') ? title : `${title} | Qevnaro`,
    description,
    canonical: site.url + (p === '/' ? '/' : p.replace(/\/$/, '')),
    image: image.startsWith('http') ? image : site.url + image,
    robots: noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large',
    type,
    jsonLd: (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []).filter(Boolean) as object[],
  };
};

/**
 * Per-route head manager. During the build-time render it hands the head data to the
 * prerenderer (so every page ships its own title, canonical, Open Graph and JSON-LD in
 * static HTML); in the browser it keeps document.head in sync on navigation.
 */
export const SEO = (props: Props) => {
  const collector = useContext(HeadContext);
  const head = build(props);
  if (collector) collector.head = head;

  const key = JSON.stringify(head);
  useEffect(() => {
    const h: HeadData = JSON.parse(key);
    document.title = h.title;
    setMeta('name', 'description', h.description);
    setMeta('name', 'robots', h.robots);
    setMeta('property', 'og:type', h.type);
    setMeta('property', 'og:title', h.title);
    setMeta('property', 'og:description', h.description);
    setMeta('property', 'og:url', h.canonical);
    setMeta('property', 'og:image', h.image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', h.title);
    setMeta('name', 'twitter:description', h.description);
    setMeta('name', 'twitter:image', h.image);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = h.canonical;

    document.head.querySelectorAll('script[data-route-jsonld]').forEach((n) => n.remove());
    h.jsonLd.forEach((j) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-route-jsonld', '');
      s.textContent = JSON.stringify(j);
      document.head.appendChild(s);
    });
  }, [key]);
  return null;
};
