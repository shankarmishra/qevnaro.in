import { offices, site } from './site';

/** Schema.org builders. Every page composes its JSON-LD from these so the entity data stays consistent. */

const ORG_ID = `${site.url}/#organization`;
const sameAs = () => Object.values(site.social).filter(Boolean);

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo-qevnaro.png`,
  image: `${site.url}/og/home.jpg`,
  description: site.description,
  slogan: site.tagline,
  email: site.email,
  telephone: site.phone,
  priceRange: '₹₹',
  address: offices.map((o) => ({
    '@type': 'PostalAddress',
    streetAddress: o.locality,
    addressLocality: o.city,
    addressRegion: o.region,
    postalCode: o.postalCode,
    addressCountry: 'IN',
  })),
  areaServed: [{ '@type': 'Country', name: 'India' }, ...offices.map((o) => ({ '@type': 'City', name: o.city }))],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.phone,
    email: site.email,
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  knowsAbout: [
    'Web development', 'Mobile app development', 'E-commerce development', 'UI/UX design',
    'Search engine optimization', 'Generative engine optimization', 'Performance marketing',
    'Social media marketing', 'Branding', 'AI automation', 'Chatbots', 'Cloud and DevOps',
  ],
  sameAs: sameAs(),
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
});

export const breadcrumbSchema = (items: { label: string; to?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ label: 'Home', to: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.label,
    ...(it.to ? { item: site.url + (it.to === '/' ? '/' : it.to) } : {}),
  })),
});

export const serviceSchema = (o: { name: string; description: string; path: string; city?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: o.name,
  serviceType: o.name,
  description: o.description,
  url: site.url + o.path,
  provider: { '@id': ORG_ID, '@type': 'Organization', name: site.name, url: site.url },
  areaServed: o.city ? { '@type': 'City', name: o.city } : { '@type': 'Country', name: 'India' },
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const localBusinessSchema = (slug: string) => {
  const o = offices.find((x) => x.slug === slug);
  if (!o) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/locations/${o.slug}#office`,
    name: `${site.name} ${o.city}`,
    url: `${site.url}/locations/${o.slug}`,
    parentOrganization: { '@id': ORG_ID },
    image: `${site.url}/og/home.jpg`,
    telephone: site.phone,
    email: site.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: o.locality,
      addressLocality: o.city,
      addressRegion: o.region,
      postalCode: o.postalCode,
      addressCountry: 'IN',
    },
    areaServed: o.serves.map((name) => ({ '@type': 'Place', name })),
  };
};

export const creativeWorkSchema = (o: { name: string; description: string; path: string; image: string; url: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: o.name,
  description: o.description,
  url: site.url + o.path,
  image: site.url + o.image,
  sameAs: o.url,
  creator: { '@id': ORG_ID },
});
