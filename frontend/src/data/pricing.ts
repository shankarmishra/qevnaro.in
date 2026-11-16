/**
 * How Qevnaro prices work. No figures are published until they are confirmed:
 * add a `range` (e.g. '₹60,000 to ₹2,50,000') to any item below and it will appear
 * on the pricing page automatically.
 */
export interface PricingItem {
  group: string;
  model: 'Fixed project' | 'Monthly retainer' | 'Project, then retainer';
  services: string[];
  /** What makes the price go up or down. */
  drivers: string[];
  /** Optional published range. Leave undefined to show "Quoted after a scoping call". */
  range?: string;
}

export const PRICING: PricingItem[] = [
  {
    group: 'Websites and web apps',
    model: 'Fixed project',
    services: ['web-development', 'ui-ux-design'],
    drivers: [
      'Number of unique page templates, not the number of pages',
      'Custom design versus adapting an existing design system',
      'Integrations: CRM, payments, booking, ERP',
      'Content: whether we write it or you supply it',
      'Languages and regions',
    ],
  },
  {
    group: 'Mobile apps',
    model: 'Fixed project',
    services: ['mobile-app-development'],
    drivers: [
      'One platform or both iOS and Android',
      'Whether a back end and admin panel already exist',
      'Real-time features, payments, maps or offline use',
      'Number of user roles',
      'Store submission and ongoing release support',
    ],
  },
  {
    group: 'Online stores',
    model: 'Fixed project',
    services: ['ecommerce-development'],
    drivers: [
      'Platform: Shopify, WooCommerce or custom',
      'Catalogue size and how products are imported',
      'Custom theme versus a configured one',
      'Payment, shipping, tax and marketplace integrations',
      'Subscriptions, B2B pricing or multi-currency',
    ],
  },
  {
    group: 'SEO, GEO and content',
    model: 'Monthly retainer',
    services: ['seo', 'geo-aeo', 'content-marketing'],
    drivers: [
      'Size of the site and how much technical repair it needs',
      'How competitive the target searches are',
      'Number of locations or languages',
      'Amount of new content each month',
      'Link and mention outreach',
    ],
  },
  {
    group: 'Paid campaigns and social',
    model: 'Monthly retainer',
    services: ['performance-marketing', 'digital-marketing', 'social-media-marketing', 'email-marketing'],
    drivers: [
      'Number of platforms and campaigns managed',
      'Monthly ad spend (paid by you directly to the platforms)',
      'Volume of creative: statics, video, landing pages',
      'How often you want reporting and review calls',
      'CRM and conversion-tracking setup',
    ],
  },
  {
    group: 'Brand and creative',
    model: 'Fixed project',
    services: ['branding', 'video-creative-production'],
    drivers: [
      'New identity versus a refresh',
      'Naming and positioning work',
      'Number of deliverables: guidelines, templates, packaging',
      'Shoot days, locations and talent for video',
      'Rounds of revision agreed up front',
    ],
  },
  {
    group: 'AI, automation and cloud',
    model: 'Project, then retainer',
    services: ['ai-automation', 'chatbots-agents', 'marketing-automation', 'cloud-devops'],
    drivers: [
      'Number of workflows and the systems they connect',
      'Quality and volume of the data or documents involved',
      'Usage-based costs from AI and cloud providers',
      'How much human review the process needs',
      'Monitoring and support hours after launch',
    ],
  },
];

export const PRICING_MODELS = [
  {
    title: 'Fixed-scope project',
    best: 'Websites, apps, stores and brand work',
    desc: 'We agree exactly what will be delivered, write it down with a timeline, and quote one price for it. If the scope changes, we tell you what that does to cost and time before doing the work.',
  },
  {
    title: 'Monthly retainer',
    best: 'SEO, advertising, social media and content',
    desc: 'Ongoing work for a set monthly fee, with the activities and reporting spelled out. Ad spend is separate and is paid by you directly to Google, Meta or LinkedIn.',
  },
  {
    title: 'Support and maintenance',
    best: 'After launch',
    desc: 'A smaller monthly plan for updates, security, monitoring and small improvements, so what we built keeps working and keeps getting better.',
  },
];

export const PRICING_FAQS = [
  {
    q: 'Why are there no prices on this page?',
    a: 'Because the honest answer depends on scope. Two "business websites" can differ several times over in effort. Rather than publish a number that is wrong for most people, we explain what drives cost and give you a written quote after a short conversation.',
  },
  {
    q: 'How quickly can I get a quote?',
    a: 'Tell us what you need through the contact page or WhatsApp. For most projects one short call is enough for us to send a written proposal with scope, timeline and cost.',
  },
  {
    q: 'Is advertising spend included in your fee?',
    a: 'No. Ad spend is paid by you directly to the platform, from your own ad account, so you always see exactly where it goes. Our fee covers planning, creative, management and reporting.',
  },
  {
    q: 'What is not included in a project quote?',
    a: 'Third-party costs such as domains, hosting, paid plugins, stock media, software licences and AI or cloud usage are separate from our fee. We list them in the proposal so there are no surprises.',
  },
  {
    q: 'Can we start small?',
    a: 'Yes, and we often recommend it. A first phase with a clear outcome lets you judge the work before committing to more.',
  },
  {
    q: 'Do I own what you build?',
    a: 'Yes. Ownership of the final approved work transfers to you on full payment, as set out in the agreement, and we build inside accounts that you own wherever possible.',
  },
];
