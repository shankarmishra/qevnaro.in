/** Plain-language definitions of the terms clients ask about most. Each links to the service it relates to. */
export interface Term {
  term: string;
  slug: string;
  def: string;
  service?: string;
}

const t = (term: string, def: string, service?: string): Term => ({
  term,
  slug: term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  def,
  service,
});

export const GLOSSARY: Term[] = [
  t('AEO (Answer Engine Optimisation)', 'Structuring content so that search features and AI assistants can lift a direct answer from it, usually by stating the answer plainly near the top of a page and marking it up clearly.', 'geo-aeo'),
  t('A/B testing', 'Showing two versions of a page, ad or email to similar audiences and measuring which performs better, so changes are decided by evidence rather than opinion.', 'performance-marketing'),
  t('AI agent', 'Software that uses a language model to plan and carry out multi-step tasks, such as reading an enquiry, looking up data and drafting a reply, usually within limits set by a person.', 'chatbots-agents'),
  t('API', 'An application programming interface: a defined way for two pieces of software to exchange data, such as a website sending a lead to a CRM.', 'web-development'),
  t('Backlink', 'A link from another website to yours. Relevant links from reputable sites are one of the signals search engines use to judge authority.', 'seo'),
  t('Bounce rate', 'The share of visits that leave after viewing a single page without interacting. In GA4 the related measure is engagement rate.', 'digital-marketing'),
  t('Brand guidelines', 'A document that sets how a brand looks and sounds: logo use, colours, typography, imagery and tone of voice, so everyone applies it consistently.', 'branding'),
  t('Canonical URL', 'The version of a page you tell search engines to treat as the original when similar content exists at several addresses.', 'seo'),
  t('CDN', 'A content delivery network: servers around the world that store copies of a site\'s files so pages load quickly wherever the visitor is.', 'cloud-devops'),
  t('CI/CD', 'Continuous integration and continuous delivery: automated testing and deployment so code changes reach the live site safely and often.', 'cloud-devops'),
  t('CLS (Cumulative Layout Shift)', 'A Core Web Vitals metric measuring how much a page jumps around while loading. Lower is better.', 'web-development'),
  t('CMS', 'A content management system: the admin panel that lets your team edit pages, posts and products without touching code.', 'web-development'),
  t('Conversion rate', 'The percentage of visitors who complete a goal, such as filling a form, booking or buying.', 'performance-marketing'),
  t('Core Web Vitals', 'Google\'s three user-experience measurements: loading (LCP), responsiveness (INP) and visual stability (CLS).', 'web-development'),
  t('CPC (Cost per click)', 'What you pay on average each time someone clicks your ad.', 'performance-marketing'),
  t('CPL (Cost per lead)', 'Total ad spend divided by the number of leads it produced. A more useful measure than cost per click for most service businesses.', 'performance-marketing'),
  t('CRM', 'Customer relationship management software that keeps every lead and customer, their history and next steps in one place.', 'marketing-automation'),
  t('Design system', 'A shared library of design rules and reusable components that keeps a product or website consistent as it grows.', 'ui-ux-design'),
  t('E-E-A-T', 'Experience, Expertise, Authoritativeness and Trustworthiness: the qualities Google\'s guidelines ask raters to look for in content, especially on topics affecting health or money.', 'seo'),
  t('Entity', 'A distinct thing a search engine or AI model recognises, such as a company, person or place, with known facts attached to it.', 'geo-aeo'),
  t('GA4', 'Google Analytics 4, Google\'s current analytics platform, which measures visits and actions as events.', 'digital-marketing'),
  t('GEO (Generative Engine Optimisation)', 'Making a business easy for AI assistants such as ChatGPT, Gemini and Perplexity to understand and cite, through clear content, consistent entity data and third-party mentions.', 'geo-aeo'),
  t('Google Business Profile', 'The free listing that shows a business on Google Maps and local results, with address, hours, photos and reviews.', 'seo'),
  t('Headless commerce', 'An online store where the shopping engine and the customer-facing front end are separate, allowing a faster, fully custom storefront.', 'ecommerce-development'),
  t('INP (Interaction to Next Paint)', 'A Core Web Vitals metric measuring how quickly a page responds after a tap, click or key press.', 'web-development'),
  t('Landing page', 'A page built for one campaign or audience with a single goal, usually an enquiry or sign-up.', 'performance-marketing'),
  t('LCP (Largest Contentful Paint)', 'A Core Web Vitals metric measuring how long the main content of a page takes to appear.', 'web-development'),
  t('Lead scoring', 'Ranking leads by how likely they are to buy, based on who they are and what they have done, so sales focus on the best ones first.', 'marketing-automation'),
  t('llms.txt', 'A plain-text file at the root of a website that lists its key pages for AI tools. It is a proposed convention, not a ranking factor.', 'geo-aeo'),
  t('Local SEO', 'Improving visibility for searches with local intent, through Google Business Profile, reviews, consistent listings and location pages.', 'seo'),
  t('MVP', 'Minimum viable product: the smallest version of a product that real users can use, built to learn quickly before investing more.', 'mobile-app-development'),
  t('NAP consistency', 'Keeping your business name, address and phone number identical everywhere they appear online, which helps local search.', 'seo'),
  t('PWA (Progressive Web App)', 'A website that behaves like an app: it can be added to the home screen and work quickly on mobile without an app-store download.', 'web-development'),
  t('RAG (Retrieval-Augmented Generation)', 'A way of making an AI assistant answer from your own documents: it first retrieves relevant passages, then writes an answer based on them.', 'ai-automation'),
  t('ROAS (Return on ad spend)', 'Revenue earned for every unit of currency spent on ads.', 'performance-marketing'),
  t('Schema markup', 'Structured data added to a page\'s code that tells search engines exactly what it describes, such as a business, product, article or FAQ.', 'seo'),
  t('SERP', 'Search engine results page: everything shown after a search, including ads, maps, AI overviews and organic results.', 'seo'),
  t('Sitemap', 'A file listing the pages of a site so search engines can find and crawl them.', 'seo'),
  t('UX (User experience)', 'How easy and pleasant it is for someone to achieve what they came to do on a website or app.', 'ui-ux-design'),
  t('Wireframe', 'A simple, unstyled layout of a page that settles structure and content before visual design begins.', 'ui-ux-design'),
];
