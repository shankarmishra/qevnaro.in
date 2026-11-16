/**
 * Places Qevnaro serves, with enough local substance that each page says something specific.
 * Offices are real (Noida, Bengaluru). Every other city is served remotely, and pages say so.
 */

export type SectorKey =
  | 'it' | 'saas' | 'realestate' | 'manufacturing' | 'education' | 'healthcare'
  | 'hospitality' | 'retail' | 'finance' | 'media' | 'pharma' | 'logistics' | 'professional';

export const SECTOR_LABEL: Record<SectorKey, string> = {
  it: 'IT and business services',
  saas: 'Startups and SaaS',
  realestate: 'Real estate and construction',
  manufacturing: 'Manufacturing and B2B',
  education: 'Education and coaching',
  healthcare: 'Healthcare and clinics',
  hospitality: 'Hospitality, food and tourism',
  retail: 'Retail and D2C brands',
  finance: 'Finance and fintech',
  media: 'Media and entertainment',
  pharma: 'Pharma and life sciences',
  logistics: 'Logistics and trade',
  professional: 'Professional services',
};

export interface City {
  slug: string;
  name: string;
  region: string;
  /** Real office details, only for Noida and Bengaluru. */
  office?: { locality: string; postalCode: string };
  headline: string;
  market: string;
  buyers: string;
  sectors: SectorKey[];
  areas: string[];
  languages: string[];
}

export const CITIES: City[] = [
  {
    slug: 'noida',
    name: 'Noida',
    region: 'Uttar Pradesh',
    office: { locality: 'Sector 62', postalCode: '201309' },
    headline: 'Noida and Delhi NCR',
    market:
      'Noida sits inside one of the most crowded business markets in India. IT and services companies fill Sectors 62, 63 and the Expressway corridor, electronics and manufacturing units run through Phase 2 and Greater Noida, and real-estate developers, schools, coaching institutes and clinics all compete for the same local customer.',
    buyers:
      'Customers here compare several options before they call anyone, often searching in a mix of English and Hindi and across Noida, Delhi, Ghaziabad and Gurugram at once. Being specific about what you do and where you serve matters more than being loud.',
    sectors: ['it', 'realestate', 'manufacturing', 'education', 'healthcare', 'retail'],
    areas: ['Sector 62', 'Sector 18', 'Noida Expressway', 'Greater Noida', 'Ghaziabad', 'Indirapuram'],
    languages: ['English', 'Hindi'],
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    region: 'Karnataka',
    office: { locality: 'HSR Layout', postalCode: '560102' },
    headline: 'Bengaluru',
    market:
      'Bengaluru is a product city. HSR Layout, Koramangala and Indiranagar are dense with startups and SaaS teams, Whitefield and Electronic City house larger technology companies, and the same neighbourhoods support one of the most competitive restaurant, café and consumer-brand scenes in the country.',
    buyers:
      'Buyers here are usually technical or product-minded. They read the detail, check how a site performs and expect clear documentation, so vague promises lose to precise, well-built work.',
    sectors: ['saas', 'it', 'hospitality', 'retail', 'healthcare', 'professional'],
    areas: ['HSR Layout', 'Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'Marathahalli'],
    languages: ['English', 'Kannada', 'Hindi'],
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    region: 'Delhi NCT',
    headline: 'Delhi',
    market:
      'Delhi runs on trade, services and institutions. Wholesale and retail markets from Chandni Chowk to Karol Bagh, the electronics hub at Nehru Place, the Okhla industrial area, coaching clusters in Mukherjee Nagar and Laxmi Nagar, and a dense network of hospitals, law firms and consultancies all sell to the same crowded city.',
    buyers:
      'Delhi buyers bargain, compare and ask around. Reviews, a visible phone number and a clear price range often decide who gets the call, and many searches mix English with Hindi.',
    sectors: ['retail', 'professional', 'education', 'healthcare', 'hospitality', 'media'],
    areas: ['Connaught Place', 'Nehru Place', 'Okhla', 'Saket', 'Dwarka', 'Karol Bagh'],
    languages: ['Hindi', 'English', 'Punjabi'],
  },
  {
    slug: 'gurugram',
    name: 'Gurugram',
    region: 'Haryana',
    headline: 'Gurugram',
    market:
      'Gurugram is where many multinational and corporate offices in India sit, around Cyber City, Golf Course Road and Udyog Vihar, with a fast-growing startup scene alongside. Manesar adds automotive and component manufacturing, and new residential sectors keep real estate one of the busiest categories.',
    buyers:
      'Decisions here are often made by teams rather than owners, with procurement steps, security questions and a need for documentation. Polished presentation and dependable process matter as much as price.',
    sectors: ['it', 'saas', 'realestate', 'manufacturing', 'hospitality', 'professional'],
    areas: ['Cyber City', 'Golf Course Road', 'Sohna Road', 'Udyog Vihar', 'MG Road', 'Manesar'],
    languages: ['English', 'Hindi'],
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra',
    headline: 'Mumbai',
    market:
      'Mumbai is the commercial capital: banks and financial firms around Nariman Point and BKC, media and entertainment companies in Andheri and Film City, D2C and fashion brands in Lower Parel, and port-led logistics and trade through Navi Mumbai. Real estate stretches from the island city to Thane.',
    buyers:
      'Mumbai moves fast and expects the same from suppliers. Brands here compete on creative quality and speed, and finance and media clients bring stricter compliance and approval processes.',
    sectors: ['finance', 'media', 'retail', 'realestate', 'logistics', 'saas'],
    areas: ['BKC', 'Lower Parel', 'Andheri', 'Powai', 'Navi Mumbai', 'Thane'],
    languages: ['English', 'Hindi', 'Marathi'],
  },
  {
    slug: 'pune',
    name: 'Pune',
    region: 'Maharashtra',
    headline: 'Pune',
    market:
      'Pune combines a large IT workforce in Hinjewadi, Kharadi and Magarpatta with one of India\'s main automotive and engineering belts in Pimpri-Chinchwad and Chakan. It is also a major education city, and a steady stream of startups and SaaS companies has grown up around both.',
    buyers:
      'Pune buyers tend to be practical and engineering-minded. B2B companies here need sites that explain technical products clearly, and education brands compete hard on reputation and admissions timing.',
    sectors: ['it', 'manufacturing', 'education', 'saas', 'realestate', 'healthcare'],
    areas: ['Hinjewadi', 'Kharadi', 'Baner', 'Magarpatta', 'Pimpri-Chinchwad', 'Viman Nagar'],
    languages: ['English', 'Marathi', 'Hindi'],
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    region: 'Telangana',
    headline: 'Hyderabad',
    market:
      'Hyderabad\'s HITEC City, Gachibowli and Madhapur form one of the country\'s biggest technology clusters, and Genome Valley makes it a centre for pharma and life sciences. A growing healthcare sector and rapid residential development around the western corridor complete the picture.',
    buyers:
      'Technology and pharma buyers here expect accuracy and process: clear documentation, careful claims and compliance-aware marketing, especially in regulated categories.',
    sectors: ['it', 'pharma', 'healthcare', 'realestate', 'saas', 'education'],
    areas: ['HITEC City', 'Gachibowli', 'Madhapur', 'Kondapur', 'Banjara Hills', 'Jubilee Hills'],
    languages: ['English', 'Telugu', 'Hindi'],
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    region: 'Tamil Nadu',
    headline: 'Chennai',
    market:
      'Chennai is home to some of India\'s best-known SaaS companies and an IT corridor along OMR, a large automotive and electronics manufacturing base around Sriperumbudur and Oragadam, and hospitals that draw patients from across the country and abroad. T. Nagar remains one of the busiest retail districts in India.',
    buyers:
      'Chennai buyers value reliability and long relationships. Product companies look for global-quality work, while healthcare and retail businesses often need content in both English and Tamil.',
    sectors: ['saas', 'manufacturing', 'healthcare', 'it', 'retail', 'education'],
    areas: ['OMR', 'Guindy', 'T. Nagar', 'Anna Nagar', 'Velachery', 'Ambattur'],
    languages: ['English', 'Tamil'],
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    region: 'West Bengal',
    headline: 'Kolkata',
    market:
      'Kolkata is eastern India\'s trading and institutional hub. Salt Lake Sector V and New Town host IT and services firms, Burrabazar remains a major wholesale market, and the city has strong education, healthcare and food businesses that serve the whole region.',
    buyers:
      'Kolkata businesses are often family-run and relationship-led. Trust is built slowly, and sites and campaigns that respect Bengali-speaking audiences tend to perform better than generic national ones.',
    sectors: ['it', 'retail', 'education', 'healthcare', 'hospitality', 'manufacturing'],
    areas: ['Salt Lake Sector V', 'New Town', 'Park Street', 'Ballygunge', 'Howrah', 'Rajarhat'],
    languages: ['English', 'Bengali', 'Hindi'],
  },
  {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    region: 'Gujarat',
    headline: 'Ahmedabad',
    market:
      'Ahmedabad is a business-owner city: textiles, chemicals and pharma manufacturing in its industrial estates, a strong trading culture, fast-growing D2C brands, and GIFT City nearby in Gandhinagar adding finance. Real estate along SG Highway and the western suburbs is among the most active categories.',
    buyers:
      'Owners here decide quickly but watch value closely. They want to see return on spend, and B2B manufacturers increasingly need sites that win export enquiries as well as domestic ones.',
    sectors: ['manufacturing', 'pharma', 'retail', 'realestate', 'finance', 'education'],
    areas: ['SG Highway', 'Prahlad Nagar', 'Navrangpura', 'Bodakdev', 'Gandhinagar', 'Naroda'],
    languages: ['English', 'Gujarati', 'Hindi'],
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan',
    headline: 'Jaipur',
    market:
      'Jaipur\'s economy mixes tourism and hospitality with crafts that sell worldwide: gems and jewellery, block-printed textiles and handicrafts, many of them exported. Sitapura and other industrial areas host manufacturers, the city is a growing education hub, and IT work is expanding around Malviya Nagar and Mahindra SEZ.',
    buyers:
      'Many Jaipur businesses sell to customers far away, from tourists planning a trip to overseas buyers of jewellery and textiles, so search visibility, strong photography and simple international ordering matter.',
    sectors: ['hospitality', 'retail', 'manufacturing', 'education', 'realestate', 'it'],
    areas: ['C-Scheme', 'Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'Sitapura', 'Tonk Road'],
    languages: ['Hindi', 'English'],
  },
  {
    slug: 'chandigarh',
    name: 'Chandigarh',
    region: 'Chandigarh, Mohali and Panchkula',
    headline: 'Chandigarh Tricity',
    market:
      'The Tricity of Chandigarh, Mohali and Panchkula is a planned, high-income region with a large education and study-abroad sector, major hospitals, an IT cluster in Mohali, and steady residential growth along the airport road. Many businesses here serve Punjab, Haryana and Himachal as well.',
    buyers:
      'Competition is intense in a few categories, especially immigration and study-abroad consultancies, clinics and real estate, so local search and reputation work carry a lot of weight.',
    sectors: ['education', 'healthcare', 'realestate', 'it', 'hospitality', 'professional'],
    areas: ['Sector 17', 'Mohali IT City', 'Panchkula', 'Zirakpur', 'Industrial Area', 'Kharar'],
    languages: ['English', 'Punjabi', 'Hindi'],
  },
];

export const getCity = (slug?: string) => CITIES.find((c) => c.slug === slug);

/** Typical first projects per service and sector. Combined with each city's sector mix. */
export const SERVICE_SECTOR_PROJECTS: Record<string, Partial<Record<SectorKey, string>>> = {
  'web-development': {
    it: 'Corporate and capability sites for services firms', saas: 'Product marketing sites and documentation', realestate: 'Project microsites with lead capture',
    manufacturing: 'Product catalogue sites that win export enquiries', education: 'Admissions-ready institute websites', healthcare: 'Clinic and hospital sites with booking',
    hospitality: 'Restaurant and hotel sites with direct booking', retail: 'Brand sites linked to online stores', finance: 'Compliance-aware sites for financial firms',
    media: 'Content-heavy publishing sites', pharma: 'Product and compliance-reviewed corporate sites', logistics: 'Service and quote-request sites for logistics firms', professional: 'Authority sites for firms and consultancies',
  },
  'mobile-app-development': {
    it: 'Internal tools and field-force apps', saas: 'Companion apps for SaaS products', realestate: 'Buyer and site-visit apps', manufacturing: 'Dealer and distributor ordering apps',
    education: 'Learner apps with content and progress', healthcare: 'Patient booking and teleconsultation apps', hospitality: 'Ordering and loyalty apps', retail: 'Shopping and loyalty apps',
    finance: 'Customer self-service apps', media: 'Content and subscription apps', pharma: 'Medical-rep and field apps', logistics: 'Driver and tracking apps', professional: 'Client portals on mobile',
  },
  'ecommerce-development': {
    manufacturing: 'B2B ordering portals with price tiers', retail: 'D2C stores on Shopify or custom', hospitality: 'Online ordering and gift cards', pharma: 'Compliance-aware product catalogues',
    education: 'Course and test-series stores', healthcare: 'Wellness and pharmacy stores', media: 'Merchandise and subscription stores', realestate: 'Booking-amount payment flows', saas: 'Self-serve checkout for software plans',
  },
  seo: {
    it: 'Service-page SEO for B2B enquiries', saas: 'Product-led and comparison content SEO', realestate: 'Locality and project-page SEO', manufacturing: 'Product and export-market SEO',
    education: 'Course and admissions SEO', healthcare: 'Local SEO for clinics and specialists', hospitality: 'Local and Maps SEO for restaurants and hotels', retail: 'Category and product SEO',
    finance: 'Trust-focused SEO for financial services', media: 'News and content SEO', pharma: 'Compliance-aware content SEO', logistics: 'Route and service-area SEO', professional: 'Expertise-led SEO for firms',
  },
  'geo-aeo': {
    it: 'Being shortlisted when buyers ask AI for vendors', saas: 'Accurate answers about your product in AI tools', healthcare: 'Clear, citable clinic and treatment information', education: 'Course facts AI assistants can quote',
    realestate: 'Project facts assistants can repeat correctly', retail: 'Product information AI shopping answers use', professional: 'Expertise AI assistants attribute to you', hospitality: 'Being recommended for local dining and stays',
  },
  'digital-marketing': {
    it: 'B2B demand generation', saas: 'Full-funnel growth for startups', realestate: 'Lead generation for projects', manufacturing: 'Export and dealer lead generation', education: 'Admissions marketing',
    healthcare: 'Patient acquisition marketing', hospitality: 'Restaurant and hotel marketing', retail: 'D2C growth and retention', finance: 'Compliant financial-product marketing', media: 'Audience growth', professional: 'Lead generation for firms',
  },
  'performance-marketing': {
    it: 'LinkedIn and search campaigns for B2B', saas: 'Demo and trial campaigns', realestate: 'Project lead campaigns with qualification', manufacturing: 'Search campaigns for industrial buyers',
    education: 'Admission-season campaigns', healthcare: 'Appointment campaigns within ad policies', hospitality: 'Booking and delivery promotions', retail: 'Meta and Google Shopping for D2C', finance: 'Policy-compliant lead campaigns',
  },
  branding: {
    it: 'Brand refresh for services firms', saas: 'Startup and product identities', realestate: 'Project and developer branding', manufacturing: 'Identity for B2B and export brands', education: 'Institution identities',
    healthcare: 'Clinic and hospital identities', hospitality: 'Restaurant, café and hotel brands', retail: 'D2C packaging and brand systems', finance: 'Trust-led financial brands', professional: 'Identity for firms and consultancies',
  },
};

/* ───────────────────────────── International ───────────────────────────── */

export interface Country {
  slug: string;
  name: string;
  short: string;
  currency: string;
  overlap: string;
  workingWith: string;
  compliance: string;
  engagement: string;
  buyers: string;
  faqs: { q: string; a: string }[];
}

export const COUNTRIES: Country[] = [
  {
    slug: 'usa',
    name: 'United States',
    short: 'the US',
    currency: 'USD',
    overlap:
      'India is 9.5 to 10.5 hours ahead of US Eastern time, so our evening overlaps your morning. We schedule calls in that window, and the rest of the day works in your favour: you brief us at the end of your day and wake up to progress.',
    workingWith:
      'Most US clients work with us asynchronously: written updates every working day, a shared board for tasks, recorded walkthroughs of builds, and one scheduled call a week. Urgent issues have a direct WhatsApp or Slack line.',
    compliance:
      'We follow the requirements you set for your market, such as accessibility expectations under the ADA, state privacy laws like the CCPA, and HIPAA-aware handling when a project touches health data. We sign NDAs and work inside accounts you own.',
    engagement:
      'Common engagements are a fixed-scope build (a marketing site, web app or store) or a dedicated monthly team for development, SEO and campaigns. Quotes and invoices are in USD.',
    buyers:
      'US buyers usually come to us to get senior-quality work with more capacity for the budget, without the overhead of managing freelancers.',
    faqs: [
      { q: 'How do you handle the time difference with the US?', a: 'We overlap with US Eastern mornings for calls and work during your night, sending a written update before your day starts. Most clients find it speeds projects up rather than slowing them down.' },
      { q: 'Can you invoice in US dollars?', a: 'Yes. Quotes and invoices are issued in USD and paid by international bank transfer or another method agreed in the contract.' },
      { q: 'Will you sign an NDA and work in our accounts?', a: 'Yes. We sign NDAs before discovery, and we build and run campaigns inside accounts that you own, so you keep the data and the access.' },
    ],
  },
  {
    slug: 'uae',
    name: 'United Arab Emirates',
    short: 'the UAE',
    currency: 'AED',
    overlap:
      'The UAE is only 1.5 hours behind India, so our working days almost fully overlap. Calls, reviews and quick fixes happen in real time, much as they would with a local agency.',
    workingWith:
      'Dubai and Abu Dhabi clients often combine regular video calls with in-person visits for kick-offs and launches. Day-to-day work runs over WhatsApp, email and a shared task board.',
    compliance:
      'We build bilingual English and Arabic sites with proper right-to-left layouts when needed, and handle personal data in line with the UAE\'s data-protection law and any free-zone rules that apply to you.',
    engagement:
      'Typical work includes bilingual business websites, e-commerce stores, real-estate and hospitality lead generation, and SEO for searches across the GCC. Quotes can be in AED or USD.',
    buyers:
      'UAE businesses choose us for close time-zone alignment, bilingual capability and pricing that leaves room in the budget for marketing.',
    faqs: [
      { q: 'Can you build Arabic and English websites?', a: 'Yes. We design and build bilingual sites with right-to-left layouts, separate language URLs and SEO set up for both languages.' },
      { q: 'Do you work with businesses across the GCC?', a: 'Yes. Most of our Gulf work is for the UAE, and we also support businesses targeting Saudi Arabia, Qatar, Oman, Kuwait and Bahrain.' },
      { q: 'Can we meet in person?', a: 'For larger projects we can plan in-person kick-off or launch meetings. Most day-to-day work happens over calls and messaging.' },
    ],
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    short: 'the UK',
    currency: 'GBP',
    overlap:
      'India is 4.5 to 5.5 hours ahead of the UK, so your whole morning overlaps our afternoon. That leaves time for a daily stand-up or review call, with work continuing while you are offline.',
    workingWith:
      'UK clients usually work with a weekly call, written updates, and a project board they can check at any time. We are comfortable working alongside an in-house team or another agency.',
    compliance:
      'We build with UK GDPR in mind: consent-based cookie banners, privacy notices, data-processing agreements, and analytics configured to respect consent. Accessibility follows WCAG.',
    engagement:
      'Common engagements are website rebuilds, e-commerce on Shopify or WooCommerce, SEO retainers and paid-media management. Quotes and invoices are available in GBP.',
    buyers:
      'UK businesses often come to us for a capable, design-led team that can take on a full rebuild or extend their marketing capacity without a London agency budget.',
    faqs: [
      { q: 'Do you build GDPR-compliant websites?', a: 'We build to UK GDPR requirements: consent management, privacy notices, data-processing terms and analytics that respect consent. Final legal sign-off stays with you or your adviser.' },
      { q: 'How much does the time difference affect a project?', a: 'Very little. Your mornings overlap our afternoons, which is enough for daily calls, and work continues during your evening.' },
      { q: 'Can you invoice in pounds?', a: 'Yes, quotes and invoices can be issued in GBP.' },
    ],
  },
  {
    slug: 'australia',
    name: 'Australia',
    short: 'Australia',
    currency: 'AUD',
    overlap:
      'Australia\'s east coast is 4.5 to 5.5 hours ahead of India, so our mornings overlap your afternoons. Calls happen after your lunch, and we keep working after your day ends.',
    workingWith:
      'Australian clients typically run a weekly call with daily written updates. Small businesses often hand us the whole digital side, from the website to local SEO and Google Ads.',
    compliance:
      'We handle personal information in line with the Privacy Act and the Australian Privacy Principles you are bound by, use consent-aware analytics, and build to WCAG accessibility standards.',
    engagement:
      'Typical work includes trade and service-business websites, e-commerce stores, local SEO across suburbs and cities, and Google Ads management. Quotes and invoices are available in AUD.',
    buyers:
      'Australian businesses tend to come to us for dependable delivery at a cost that makes ongoing SEO and ads affordable.',
    faqs: [
      { q: 'Do you do local SEO for Australian suburbs and cities?', a: 'Yes. We set up Google Business Profiles, suburb and service pages that say something real, and local citations, measured in Search Console.' },
      { q: 'What hours do you work with Australian clients?', a: 'Our mornings overlap Australian afternoons, which is when we hold calls. Updates are written so nothing waits on a meeting.' },
      { q: 'Can you invoice in Australian dollars?', a: 'Yes, quotes and invoices can be issued in AUD.' },
    ],
  },
  {
    slug: 'canada',
    name: 'Canada',
    short: 'Canada',
    currency: 'CAD',
    overlap:
      'India is 9.5 to 13.5 hours ahead of Canada depending on the province, so our evenings overlap Canadian mornings. We meet in that window and send updates before your day starts.',
    workingWith:
      'Canadian clients usually work with a weekly call, written daily updates and a shared board. We can work alongside your in-house team or take on the full project.',
    compliance:
      'We follow PIPEDA and any provincial privacy rules that apply to you, set up consent-aware analytics, and build bilingual English and French sites when you sell in Quebec.',
    engagement:
      'Common engagements are website and web-app builds, e-commerce stores, SEO and paid-media retainers. Quotes and invoices are available in CAD or USD.',
    buyers:
      'Canadian businesses come to us for a full-service team that can design, build and market under one contract.',
    faqs: [
      { q: 'Can you build English and French websites for Canada?', a: 'Yes. We build bilingual sites with separate language URLs and SEO set up for both languages, which matters for selling in Quebec.' },
      { q: 'How do you handle Canadian time zones?', a: 'Our evenings overlap Canadian mornings for calls, and we send written updates before your day begins.' },
      { q: 'Can you invoice in Canadian dollars?', a: 'Yes, quotes and invoices can be issued in CAD or USD.' },
    ],
  },
];

export const getCountry = (slug?: string) => COUNTRIES.find((c) => c.slug === slug);

/** Services commonly bought across borders, with a market-specific angle for each country. */
export const COUNTRY_SERVICE_SLUGS = ['web-development', 'mobile-app-development', 'ecommerce-development', 'ui-ux-design', 'seo', 'ai-automation'] as const;

export const COUNTRY_SERVICE_ANGLE: Record<string, Record<(typeof COUNTRY_SERVICE_SLUGS)[number], string>> = {
  usa: {
    'web-development': 'US buyers judge a site in seconds, so we build for Core Web Vitals, ADA-aware accessibility and clear conversion paths, and hand over code your own team can maintain.',
    'mobile-app-development': 'For US products we plan for App Store and Play Store review from the start, build with analytics in place, and keep releases on a predictable schedule your stakeholders can plan around.',
    'ecommerce-development': 'US stores need fast checkouts, sales-tax handling and integrations with US shipping carriers; we set these up on Shopify or a custom stack and connect them to your marketing tools.',
    'ui-ux-design': 'We run research and usability testing with your US users remotely, then turn findings into design systems your developers can build from.',
    seo: 'US search is competitive, so we focus on technical health, content that answers real buyer questions, and links earned from relevant US publications, reported monthly.',
    'ai-automation': 'For US teams we automate high-volume work such as lead routing, support triage and reporting, with human review where accuracy matters and data kept in your own accounts.',
  },
  uae: {
    'web-development': 'UAE sites usually need English and Arabic with proper right-to-left layouts, WhatsApp as a primary contact path, and fast loading on mobile, which is how most customers browse.',
    'mobile-app-development': 'We build bilingual apps for the UAE market with right-to-left support, local payment gateways and the polish customers in Dubai and Abu Dhabi expect.',
    'ecommerce-development': 'For UAE stores we set up AED pricing, VAT, local payment options and delivery partners, with bilingual product pages and fast mobile checkout.',
    'ui-ux-design': 'We design bilingual interfaces that work equally well left-to-right and right-to-left, tested with the mix of nationalities that make up most UAE audiences.',
    seo: 'We target searches in English and Arabic across the UAE and wider GCC, with location pages for Dubai, Abu Dhabi and Sharjah that reflect where you really operate.',
    'ai-automation': 'UAE businesses get the most from automating WhatsApp enquiries, bookings and follow-ups, in English and Arabic, connected to the CRM you already use.',
  },
  uk: {
    'web-development': 'UK sites need consent-managed analytics, WCAG accessibility and fast performance; we build them on frameworks your team or a future agency can pick up easily.',
    'mobile-app-development': 'For UK products we build to accessibility guidelines and GDPR expectations from the first sprint, with releases planned around your launch dates.',
    'ecommerce-development': 'We set up UK stores with VAT handling, Royal Mail or courier integrations, and Klarna-style payment options where they suit your customers.',
    'ui-ux-design': 'We run remote research with UK users and produce accessible, documented design systems that hold up under real use.',
    seo: 'UK SEO work covers technical health, content that matches how British customers search, and local visibility across the towns and cities you serve.',
    'ai-automation': 'For UK teams we automate repetitive admin, customer service and reporting with GDPR-aware data handling and a human in the loop for decisions that matter.',
  },
  australia: {
    'web-development': 'Australian service businesses need sites that load fast on mobile, show suburbs served and make it easy to call or book; we build those and connect them to your CRM.',
    'mobile-app-development': 'We build apps for Australian businesses with local payment options, offline-friendly behaviour for regional users, and release support across both app stores.',
    'ecommerce-development': 'For Australian stores we set up GST, Australia Post or courier integrations and Afterpay-style payments where they fit your customers.',
    'ui-ux-design': 'We design and test interfaces with Australian users remotely, focused on clarity and accessibility to WCAG standards.',
    seo: 'Local SEO across suburbs and cities is where most Australian businesses win; we combine Google Business Profile work with service pages that say something specific.',
    'ai-automation': 'Australian teams often automate quoting, booking confirmations and follow-ups; we build these with clear hand-offs to your staff.',
  },
  canada: {
    'web-development': 'Canadian sites often need English and French versions, PIPEDA-aware data handling and good performance across the country; we plan all three from the start.',
    'mobile-app-development': 'We build bilingual apps for the Canadian market and plan app-store releases, analytics and privacy settings around PIPEDA.',
    'ecommerce-development': 'For Canadian stores we set up CAD pricing, GST/HST handling, Canada Post or courier integrations and bilingual product content where needed.',
    'ui-ux-design': 'We research and design with Canadian users, including French-speaking users where your market needs it, and document everything for your developers.',
    seo: 'We run SEO for Canadian searches in English and, where relevant, French, with location pages for the provinces and cities you actually serve.',
    'ai-automation': 'Canadian teams automate support, lead routing and reporting with us, in English and French, with personal data handled under PIPEDA.',
  },
};
