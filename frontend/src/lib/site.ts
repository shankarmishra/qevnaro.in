/**
 * Single source of truth for business contact details.
 * Values come from Vite env vars (see .env.example) with the published details as fallbacks.
 */
const env = import.meta.env;

export const site = {
  name: 'Qevnaro',
  /** The host Vercel serves (the apex domain redirects here). Canonicals, sitemap and schema all use it. */
  url: 'https://www.qevnaro.in',
  tagline: 'Build Better. Grow Smarter. Move Forward.',
  description:
    'Qevnaro is a technology and digital growth agency in Noida and Bengaluru, India. It builds websites, web and mobile apps, and runs SEO, GEO, paid campaigns, branding and AI automation for growing businesses.',
  email: (env.VITE_CONTACT_EMAIL as string | undefined) || 'qevnaro@gmail.com',
  phone: (env.VITE_CONTACT_PHONE as string | undefined) || '+91 87965 30323',
  whatsapp: ((env.VITE_WHATSAPP_NUMBER as string | undefined) || '918796530323').replace(/\D/g, ''),
  address: (env.VITE_CONTACT_ADDRESS as string | undefined) || 'Noida Sector 62 & Bengaluru HSR Layout, India',
  formEndpoint: (env.VITE_FORM_ENDPOINT as string | undefined) || '',
  /** Search engine verification codes and analytics, all optional. */
  googleVerification: (env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined) || '',
  bingVerification: (env.VITE_BING_SITE_VERIFICATION as string | undefined) || '',
  gaId: (env.VITE_GA_MEASUREMENT_ID as string | undefined) || '',
  social: {
    // Only profiles that are confirmed to exist get a default. Set the others in .env when they are live:
    // listing a profile that does not exist weakens the entity data search engines and AI assistants rely on.
    linkedin: (env.VITE_SOCIAL_LINKEDIN as string | undefined) || '',
    instagram: (env.VITE_SOCIAL_INSTAGRAM as string | undefined) || 'https://www.instagram.com/qevnaro/',
    x: (env.VITE_SOCIAL_X as string | undefined) || '',
    youtube: (env.VITE_SOCIAL_YOUTUBE as string | undefined) || '',
  },
};

export interface Office {
  slug: 'noida' | 'bengaluru';
  city: string;
  locality: string;
  region: string;
  postalCode: string;
  /** Nearby areas and cities served from this office. */
  serves: string[];
}

export const offices: Office[] = [
  {
    slug: 'noida',
    city: 'Noida',
    locality: 'Sector 62',
    region: 'Uttar Pradesh',
    postalCode: '201309',
    serves: ['Noida', 'Greater Noida', 'Delhi', 'Ghaziabad', 'Gurugram', 'Faridabad'],
  },
  {
    slug: 'bengaluru',
    city: 'Bengaluru',
    locality: 'HSR Layout',
    region: 'Karnataka',
    postalCode: '560102',
    serves: ['HSR Layout', 'Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'Marathahalli'],
  },
];

export const getOffice = (slug?: string) => offices.find((o) => o.slug === slug);

export const whatsappLink = (text = 'Hi Qevnaro, I would like to discuss a project.') =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : '';
