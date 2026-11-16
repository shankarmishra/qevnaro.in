import { CITIES, COUNTRIES, COUNTRY_SERVICE_SLUGS, type City } from './geo';

/** Services that have clear local search intent and get a page per office city. */
export const CITY_SERVICE_SLUGS = [
  'web-development',
  'mobile-app-development',
  'ecommerce-development',
  'seo',
  'geo-aeo',
  'digital-marketing',
  'performance-marketing',
  'branding',
] as const;

export type CityServiceSlug = (typeof CITY_SERVICE_SLUGS)[number];
type CitySlug = 'noida' | 'bengaluru';

/** Services with a page in every other metro (served remotely). */
export const METRO_SERVICE_SLUGS = ['web-development', 'mobile-app-development', 'ecommerce-development', 'seo', 'digital-marketing', 'performance-marketing'] as const;

interface CityServiceContent {
  /** Name used in headings, e.g. "Web development". */
  label: string;
  /** Agent noun for the title, e.g. "Web Development Company". */
  titleNoun: string;
  /** One-paragraph plain answer to "what do you do". */
  what: string;
  /** Hand-written local angle and typical projects, for the two office cities. */
  angle?: Record<CitySlug, string>;
  typical?: Record<CitySlug, string[]>;
  includes: string[];
}

export const CITY_SERVICES: Record<string, CityServiceContent> = {
  'ui-ux-design': {
    label: 'UI/UX design',
    titleNoun: 'UI/UX Design Agency',
    what:
      'We research how your customers think and work, then design interfaces, prototypes and design systems that make your website or product easy to use. Every design is tested with real users and handed over in a form your developers can build from directly.',
    includes: ['User research and interviews', 'Information architecture', 'Wireframes and clickable prototypes', 'Visual design and design system', 'Usability testing', 'Developer handover'],
  },
  'ai-automation': {
    label: 'AI automation',
    titleNoun: 'AI Automation Agency',
    what:
      'We automate repetitive work with AI and workflow tools: reading documents, routing leads, answering common questions, preparing reports. Each automation is connected to the systems you already use, with a person reviewing anything where a mistake would matter.',
    includes: ['Process mapping and use-case selection', 'Document and data extraction', 'Assistants grounded in your own documents', 'CRM, email and WhatsApp integrations', 'Human review steps', 'Monitoring and improvement'],
  },
  'web-development': {
    label: 'Web development',
    titleNoun: 'Web Development Company',
    what:
      'We design and build business websites, landing pages and web applications that load fast, read clearly and turn visitors into enquiries. The same team handles design, engineering, content structure and the technical SEO a new site needs from day one.',
    angle: {
      noida:
        'Most Noida businesses we speak to already have a website that looks acceptable and produces almost nothing. The usual causes are slow pages on mobile data, no clear next step, and no local signals for Google to work with. We rebuild around the enquiry: service pages that answer real questions, click-to-call and WhatsApp actions, and location detail that helps you appear for searches across NCR.',
      bengaluru:
        'In Bengaluru the bar is set by product companies, so a marketing site is judged like software: performance scores, accessibility, clean handover and a codebase your own engineers can extend. We build on modern frameworks, document what we ship and integrate with the tools your team already uses, from your CRM to your analytics stack.',
    },
    typical: {
      noida: ['Corporate and B2B company websites', 'Real-estate project and lead-capture sites', 'School, college and coaching websites', 'Clinic and hospital websites with booking'],
      bengaluru: ['SaaS marketing sites and product pages', 'Startup launch sites and waitlists', 'Web applications and customer portals', 'Restaurant and café sites with ordering'],
    },
    includes: ['Discovery and sitemap', 'UI design and responsive build', 'CMS so your team can edit content', 'On-page SEO, schema and analytics', 'Speed and accessibility checks', 'Launch, redirects and handover'],
  },
  'mobile-app-development': {
    label: 'Mobile app development',
    titleNoun: 'Mobile App Development Company',
    what:
      'We build iOS, Android and cross-platform apps, from the first clickable prototype to store release and ongoing updates. Design, front end, back end and API work are done by one team, so the app and the system behind it are planned together.',
    angle: {
      noida:
        'App projects in Noida and NCR are often operational tools: field-sales and service apps, dealer and distributor ordering, patient and student apps tied to an existing system. The hard part is rarely the screens, it is connecting cleanly to the ERP, billing or CRM already in place. We scope that integration first, so the estimate reflects the real work.',
      bengaluru:
        'Bengaluru founders usually need to learn quickly: an MVP in the hands of real users, measured properly, then iterated. We keep the first release deliberately small, instrument it so you can see what people actually do, and build it so that scaling later does not mean starting again.',
    },
    typical: {
      noida: ['Field-force and service apps', 'Dealer and distributor ordering apps', 'Healthcare and home-care apps', 'Education and coaching apps'],
      bengaluru: ['Startup MVPs for iOS and Android', 'Consumer and marketplace apps', 'Companion apps for SaaS products', 'Food ordering and loyalty apps'],
    },
    includes: ['Product scoping and prototype', 'UI/UX design for both platforms', 'React Native or native build', 'APIs, admin panel and integrations', 'Testing and store submission', 'Updates and maintenance'],
  },
  'ecommerce-development': {
    label: 'E-commerce development',
    titleNoun: 'E-commerce Development Company',
    what:
      'We build online stores on Shopify, WooCommerce or custom headless setups, with payments, shipping, inventory and the product-page detail that decides whether a visitor buys. We also set up the tracking you need to see which channels pay for themselves.',
    angle: {
      noida:
        'NCR sellers often move online from a wholesale or showroom business, with large catalogues, GST invoicing and cash-on-delivery customers. We set up the store around those realities: bulk product import, COD and UPI options, courier integrations that cover North India well, and WhatsApp order updates that customers here actually read.',
      bengaluru:
        'Bengaluru D2C brands compete on experience and repeat purchase. We focus on fast product pages, a short checkout, subscriptions and loyalty where they fit, and clean data flowing into your email, WhatsApp and ad platforms so retention is not left to chance.',
    },
    typical: {
      noida: ['Wholesale-to-online catalogue stores', 'Fashion, furniture and home décor stores', 'B2B ordering portals', 'Marketplace-plus-own-store setups'],
      bengaluru: ['D2C brand stores on Shopify', 'Subscription and repeat-order stores', 'Headless storefronts for speed', 'Food, wellness and lifestyle brands'],
    },
    includes: ['Platform choice and store setup', 'Theme design and product templates', 'Payments, shipping and tax setup', 'Product import and SEO basics', 'Analytics and conversion tracking', 'Training and post-launch support'],
  },
  seo: {
    label: 'SEO',
    titleNoun: 'SEO Company',
    what:
      'We run technical, on-page, content and local SEO as one audited, reported programme. That means fixing what stops your pages being crawled and understood, matching pages to what people search for, and building the local and authority signals that decide who appears first. We do not guarantee rankings; we commit to the work and to showing you what changed.',
    angle: {
      noida:
        'Local search in Noida is really NCR search: someone in Sector 137 will happily call a business in Ghaziabad or Delhi if it appears first. We build location coverage that reflects where you genuinely serve, bring your Google Business Profile, reviews and directory listings into line, and target the sector-level and service-level searches that produce calls rather than chasing one broad keyword.',
      bengaluru:
        'Bengaluru search is split between neighbourhood intent for consumer businesses and national or global intent for software companies. For local businesses we work area by area, from HSR Layout to Whitefield. For SaaS and technology teams we focus on technical health, comparison and problem-led content, and the documentation-quality detail that technical buyers look for.',
    },
    typical: {
      noida: ['Local SEO for clinics, schools and services', 'Real-estate project and locality pages', 'B2B and manufacturing lead-generation SEO', 'Multi-location SEO across NCR'],
      bengaluru: ['SaaS and B2B technology SEO', 'Local SEO for restaurants and clinics', 'Content-led SEO for startups', 'Technical SEO audits and migrations'],
    },
    includes: ['Technical audit and fixes', 'Keyword and intent mapping', 'On-page and content optimisation', 'Google Business Profile and citations', 'Schema markup', 'Monthly reporting in plain language'],
  },
  'geo-aeo': {
    label: 'GEO and AEO',
    titleNoun: 'GEO & AEO (AI Search Optimisation) Agency',
    what:
      'Generative engine optimisation (GEO) and answer engine optimisation (AEO) are the work of making your business understandable and citable by AI assistants such as ChatGPT, Gemini, Perplexity and Google AI Overviews. We structure your content, entity data and third-party mentions so that when someone asks an assistant for a recommendation, it has accurate material about you to draw on. No agency can control what an AI model says, and we do not promise placements.',
    angle: {
      noida:
        'Buyers in NCR increasingly ask an assistant before they search: "best CBSE school near Sector 62", "reliable home nursing in Noida". Assistants answer from sources they can read and trust, so we make sure your services, areas served, pricing approach and proof are stated plainly on your site and repeated consistently on Google Business Profile, directories and review platforms.',
      bengaluru:
        'In Bengaluru, technical buyers already use assistants to shortlist tools and vendors. We focus on the material those answers are built from: clear product and comparison pages, well-structured documentation, accurate schema, and presence on the review sites and communities that models cite for software.',
    },
    typical: {
      noida: ['Local service businesses wanting AI recommendations', 'Healthcare and education providers', 'Real-estate brands', 'B2B suppliers with niche products'],
      bengaluru: ['SaaS and developer-tool companies', 'Startups building category awareness', 'Consumer brands and restaurants', 'Professional and consulting firms'],
    },
    includes: ['AI visibility audit across assistants', 'Entity and schema clean-up', 'Answer-first content restructuring', 'llms.txt and crawler access review', 'Third-party mention and listing plan', 'Tracking of brand mentions in AI answers'],
  },
  'digital-marketing': {
    label: 'Digital marketing',
    titleNoun: 'Digital Marketing Agency',
    what:
      'We plan and run digital marketing as one connected system: search, paid campaigns, social, content, email and WhatsApp, measured against enquiries and sales rather than impressions. One team owns the plan, so channels support each other instead of competing for credit.',
    angle: {
      noida:
        'NCR businesses often run ads and social through separate freelancers with nobody looking at the whole picture. We start by tracing where current enquiries really come from, then put budget behind the two or three channels that fit your sector, typically Google search and Maps for local services, Meta for consumer and real estate, and LinkedIn for B2B.',
      bengaluru:
        'Bengaluru teams tend to be data-literate and want to see the numbers. We set up tracking properly first, agree the metric that matters with you, and report against it, whether that is demo requests for a SaaS product or table bookings and repeat orders for a restaurant.',
    },
    typical: {
      noida: ['Lead generation for real estate and education', 'Local marketing for clinics and services', 'B2B demand generation', 'Festive and seasonal retail campaigns'],
      bengaluru: ['Full-funnel marketing for startups', 'Demand generation for SaaS', 'Restaurant and café marketing', 'D2C growth and retention'],
    },
    includes: ['Channel and budget plan', 'Tracking and analytics setup', 'Campaign creative and copy', 'Landing pages', 'Email and WhatsApp follow-up', 'Monthly performance review'],
  },
  'performance-marketing': {
    label: 'Performance marketing',
    titleNoun: 'Performance Marketing Agency',
    what:
      'We manage paid campaigns on Google, YouTube, Meta and LinkedIn with one aim: a cost per lead or sale that makes sense for your business. That covers account structure, creative, landing pages and conversion tracking, with ad spend billed to you directly by the platforms.',
    angle: {
      noida:
        'Clicks in NCR are expensive in real estate, education and healthcare, and a lot of that spend is wasted on the wrong localities or on forms that attract junk leads. We tighten location and audience targeting, qualify leads on the landing page, and connect campaigns to your CRM or WhatsApp so the sales team can tell us which leads were real.',
      bengaluru:
        'For Bengaluru startups, paid media is usually a test of whether a channel can scale. We run structured experiments with clear budgets and stop rules, track down to qualified pipeline or paid orders rather than sign-ups, and tell you early when a channel is not working.',
    },
    typical: {
      noida: ['Real-estate lead campaigns', 'Admissions campaigns for schools and institutes', 'Clinic and hospital appointment ads', 'B2B LinkedIn and search campaigns'],
      bengaluru: ['SaaS demo and trial campaigns', 'App install campaigns', 'D2C Meta and Google Shopping', 'Restaurant and delivery promotions'],
    },
    includes: ['Account audit and structure', 'Audience and keyword research', 'Ad creative and copy testing', 'Landing-page optimisation', 'Conversion and CRM tracking', 'Weekly optimisation and monthly reports'],
  },
  branding: {
    label: 'Branding',
    titleNoun: 'Branding Agency',
    what:
      'We create brand identities that hold together everywhere a business shows up: strategy and positioning, name and logo, colour and type, and the guidelines and templates your team needs to use them consistently across the website, social media, packaging and print.',
    angle: {
      noida:
        'Many NCR businesses have grown for years on relationships and now need to look as established as they are, especially when selling to larger companies or online. We clarify what you stand for, then build an identity that works on a tender document, a factory signboard and an Instagram post alike.',
      bengaluru:
        'Bengaluru is full of well-designed brands, so a new one has to be distinctive rather than merely tidy. We work with founders early, often before launch, to settle positioning and voice, then design an identity system that carries from the pitch deck to the product interface.',
    },
    typical: {
      noida: ['Rebrands for established family businesses', 'Real-estate project branding', 'School and healthcare identities', 'B2B and manufacturing brands'],
      bengaluru: ['Startup and product brand identities', 'Restaurant, café and hospitality brands', 'D2C packaging and brand systems', 'Brand refreshes after funding'],
    },
    includes: ['Positioning and messaging', 'Logo and visual identity', 'Colour, type and imagery system', 'Brand guidelines', 'Social and presentation templates', 'Website and collateral rollout'],
  },
};

/** Which services have a page for a given city. Office cities get all eight; other metros six. */
export const servicesForCity = (c: City): readonly string[] => (c.office ? CITY_SERVICE_SLUGS : METRO_SERVICE_SLUGS);

/** Every city and country that has a page for a given service. */
export const placesForService = (service: string) => ({
  cities: CITIES.filter((c) => servicesForCity(c).includes(service)),
  countries: (COUNTRY_SERVICE_SLUGS as readonly string[]).includes(service) ? COUNTRIES : [],
});

/** All service-in-a-place URLs, for prerendering and the sitemap. */
export const placePaths = () => [
  ...CITIES.flatMap((c) => servicesForCity(c).map((s) => `/services/${s}/${c.slug}`)),
  ...COUNTRIES.flatMap((c) => COUNTRY_SERVICE_SLUGS.map((s) => `/services/${s}/${c.slug}`)),
];

/** Questions people ask about hiring locally, answered honestly for office and remote cities. */
export const cityFaqs = (label: string, c: City) => {
  const office = c.office;
  return [
    office
      ? {
          q: `Do you work with businesses across ${c.name}, or only near ${office.locality}?`,
          a: `Our ${c.name} office is in ${office.locality}, and we work with businesses across ${c.areas.join(', ')}. Most projects run over video calls and shared documents, with in-person meetings when they are useful.`,
        }
      : {
          q: `Do you have an office in ${c.name}?`,
          a: `No. Our offices are in Noida and Bengaluru, and we work with ${c.name} businesses remotely, over video calls, WhatsApp and shared project boards. For larger projects we can plan in-person meetings.`,
        },
    {
      q: `How much does ${label.toLowerCase()} cost in ${c.name}?`,
      a: 'It depends on scope, not on the city. We agree what is included, write it down with a timeline, and quote for that. The pricing page explains what moves the cost up or down, and a short call is usually enough for a realistic range.',
    },
    {
      q: `Can you work in ${c.languages.filter((l) => l !== 'English').join(' or ') || 'local languages'} as well as English?`,
      a: `Our working language is English, and we write site content and campaigns in Hindi as well. For ${c.languages.filter((l) => l !== 'English' && l !== 'Hindi').join(' or ') || 'other regional languages'}, we work with native-speaking writers and reviewers when a project needs it.`,
    },
    {
      q: 'How do we get started?',
      a: 'Send a short note about what you need through the contact page or WhatsApp. We will ask a few questions, then send a written proposal covering scope, timeline and cost.',
    },
  ];
};
