/**
 * Service-for-industry pages. Each one is written for the combination, not assembled from the
 * service page and the industry page, so it answers what that buyer actually asks.
 */
export interface IndustryService {
  service: string;
  industry: string;
  title: string;
  intro: string;
  needs: string[];
  build: string[];
  mistakes: string[];
  faqs: { q: string; a: string }[];
}

export const INDUSTRY_SERVICES: IndustryService[] = [
  {
    service: 'seo',
    industry: 'healthcare',
    title: 'SEO for hospitals, clinics and doctors',
    intro:
      'Patients search for a symptom, a specialty or a clinic near them, and usually call one of the first three results they trust. Healthcare SEO is about earning that place with accurate, reviewed information, a well-kept Google Business Profile and pages for each treatment and doctor.',
    needs: ['A page for every specialty, treatment and doctor', 'A complete Google Business Profile per location', 'Reviews collected and answered consistently', 'Medical content reviewed by a qualified clinician'],
    build: ['Technical audit and fixes for speed and indexing', 'Location and treatment page structure', 'MedicalClinic, Physician and FAQ schema', 'Review and local-citation programme'],
    mistakes: ['Promising cures or outcomes, which breaks advertising and search rules', 'One generic "services" page for twenty treatments', 'Doctor profiles with no credentials or registration details'],
    faqs: [
      { q: 'How long does SEO take for a clinic?', a: 'Local visibility for a single clinic often improves within two to four months once the Business Profile, reviews and service pages are in order. Competitive specialties in large cities take longer.' },
      { q: 'Who writes the medical content?', a: 'We draft in plain language and a qualified clinician from your team reviews and approves every page before it is published. Their name and credentials can appear on the page.' },
      { q: 'Can you guarantee first place on Google?', a: 'No. Nobody can. We commit to the work and to reporting what changed each month.' },
    ],
  },
  {
    service: 'web-development',
    industry: 'healthcare',
    title: 'Website development for hospitals and clinics',
    intro:
      'A clinic website has two jobs: help a worried patient or relative find the right doctor quickly, and make booking easy on a phone. Everything else is secondary. We build healthcare sites around those two journeys, with the accessibility and privacy care that patients expect.',
    needs: ['Doctor and department pages people can actually navigate', 'Appointment booking or call-back that works on mobile', 'Accessible design for older and low-vision users', 'Careful handling of any personal health data'],
    build: ['Department, doctor and treatment templates', 'Booking integration or enquiry flow with WhatsApp', 'WCAG-checked accessible build', 'Analytics that track bookings, not just visits'],
    mistakes: ['Hiding the phone number behind a contact page', 'Stock photos of models instead of your real doctors', 'Collecting health details on forms without a clear privacy notice'],
    faqs: [
      { q: 'Can patients book appointments on the website?', a: 'Yes. We connect to your existing booking system, or build a simple request flow that confirms by phone or WhatsApp if you do not have one.' },
      { q: 'Do you build multi-location hospital sites?', a: 'Yes. Each location gets its own page with address, departments, doctors and timings, which also helps local search.' },
      { q: 'We built Pulse n Care. Is that relevant?', a: 'It is ours: Pulse n Care is a home-nursing and teleconsultation platform we designed and built, so we know the booking, trust and privacy questions healthcare sites raise.' },
    ],
  },
  {
    service: 'web-development',
    industry: 'real-estate',
    title: 'Website development for real-estate developers and brokers',
    intro:
      'Property buyers compare projects for weeks. A real-estate site has to give them what they compare on, location, floor plans, price range, approvals and possession dates, and capture a serious enquiry without making them fight a form.',
    needs: ['A microsite or page per project with floor plans and location', 'Clear status: approvals, possession date, price range', 'Fast-loading galleries and walkthrough video', 'Enquiry capture routed straight to sales'],
    build: ['Project and unit templates with plan viewers', 'Location maps with nearby schools, transit and offices', 'Lead forms connected to your CRM and WhatsApp', 'Landing pages ready for ad campaigns'],
    mistakes: ['Hiding price ranges, which pushes buyers to portals', 'Huge uncompressed renders that take seconds to load', 'Enquiries that land in an inbox nobody checks'],
    faqs: [
      { q: 'Do you build separate microsites for each project?', a: 'We can, or we build one site with a section per project. One site is usually better for search, while microsites suit large launches with their own campaigns.' },
      { q: 'Can leads go straight to our sales team?', a: 'Yes. Enquiries can be pushed to your CRM, emailed to the project manager and sent to WhatsApp within seconds.' },
      { q: 'Do you include regulatory details?', a: 'We add the registration details and disclaimers you provide on each project page. You remain responsible for their accuracy.' },
    ],
  },
  {
    service: 'performance-marketing',
    industry: 'real-estate',
    title: 'Performance marketing for real estate',
    intro:
      'Real-estate ads are expensive and attract a lot of casual clicks. The work is in narrowing who sees them, qualifying people before they become a lead, and telling the ad platforms which enquiries turned into site visits so they find more of those people.',
    needs: ['Tight location and audience targeting', 'Landing pages per project, not the home page', 'Lead qualification before the form submits', 'Sales feedback on which leads were real'],
    build: ['Google search and Meta campaigns per project', 'Qualifying landing pages with budget and timeline questions', 'CRM and offline-conversion tracking', 'Weekly optimisation against cost per site visit'],
    mistakes: ['Optimising for cost per lead instead of cost per site visit', 'Sending every campaign to the same generic page', 'No follow-up within the first hour of an enquiry'],
    faqs: [
      { q: 'Is ad spend included in your fee?', a: 'No. Ad spend is paid by you directly to Google or Meta from your own account. Our fee covers planning, creative, management and reporting.' },
      { q: 'How do you reduce junk leads?', a: 'By qualifying on the landing page, targeting more tightly and feeding real outcomes back to the platforms so they optimise for buyers, not form-fillers.' },
      { q: 'Which platforms work best for property?', a: 'Google search captures people already looking; Meta builds interest for launches. Most projects use both, with budgets shifted to whatever produces site visits.' },
    ],
  },
  {
    service: 'seo',
    industry: 'education',
    title: 'SEO for schools, colleges and coaching institutes',
    intro:
      'Students and parents research courses for months before admissions open. Education SEO means being found in that research phase, with course, fee and outcome pages that answer real questions, so you are on the shortlist when the decision is made.',
    needs: ['A page per course with fees, duration and eligibility', 'Admissions information that is current', 'Local visibility for each campus', 'Content that answers comparison questions'],
    build: ['Course and campus page structure', 'Course and EducationalOrganization schema', 'Admission-season content calendar', 'Google Business Profile per campus'],
    mistakes: ['Course details only in a PDF brochure', 'Outdated fees and dates left online for years', 'Claims about placements without evidence'],
    faqs: [
      { q: 'When should we start SEO before admissions?', a: 'Ideally six months before the season opens, so pages are indexed and trusted by the time families start searching.' },
      { q: 'Do you work with coaching institutes?', a: 'Yes. Coaching search is very local and very competitive, so we focus on centre pages, results pages you can substantiate, and reviews.' },
      { q: 'Can you help multi-campus institutions?', a: 'Yes. Each campus gets its own page and Business Profile, linked from a central course catalogue.' },
    ],
  },
  {
    service: 'performance-marketing',
    industry: 'education',
    title: 'Admissions campaigns for education',
    intro:
      'Admissions marketing runs in short, intense windows. Campaigns have to be ready before the window opens, reach parents and students where they research, and route every enquiry to a counsellor fast enough to matter.',
    needs: ['Campaigns timed to the admission calendar', 'Separate messaging for students and parents', 'Instant routing of enquiries to counsellors', 'Tracking from click to enrolment'],
    build: ['Google search, YouTube and Meta campaigns', 'Course-specific landing pages', 'WhatsApp and CRM follow-up automation', 'Enrolment-based reporting'],
    mistakes: ['Starting campaigns after the window opens', 'Measuring enquiries instead of enrolments', 'Leads waiting a day for a call-back'],
    faqs: [
      { q: 'When should admissions campaigns start?', a: 'Awareness campaigns six to eight weeks before applications open, with spend peaking as deadlines approach.' },
      { q: 'Can you connect leads to our counsellors?', a: 'Yes. Leads can go straight to your CRM and counsellors\' WhatsApp, with automated first replies so nobody waits.' },
      { q: 'Do you follow ad-platform rules for education?', a: 'Yes. We avoid guarantees of results or jobs and keep claims to what you can substantiate.' },
    ],
  },
  {
    service: 'ecommerce-development',
    industry: 'ecommerce-retail',
    title: 'E-commerce development for D2C and retail brands',
    intro:
      'For a D2C brand the store is the business. It has to load fast on a mid-range phone, make products look as good as they are, and get from cart to paid in as few taps as possible, with the data flowing to the tools that bring customers back.',
    needs: ['Product pages that sell: photos, sizing, reviews', 'Fast mobile checkout with UPI and COD', 'Inventory and courier integrations', 'Email, WhatsApp and ad-platform tracking'],
    build: ['Shopify, WooCommerce or headless store', 'Custom product and collection templates', 'Payment, shipping and GST setup', 'Retention flows and analytics'],
    mistakes: ['A theme so heavy the store loads slowly on 4G', 'Forcing account creation before checkout', 'No way to recover abandoned carts'],
    faqs: [
      { q: 'Shopify or WooCommerce for a new brand?', a: 'Shopify is usually faster to launch and run; WooCommerce suits brands already on WordPress or with content-led growth. Our insights article compares them in detail.' },
      { q: 'Can you migrate an existing store?', a: 'Yes, with products, customers, orders and URL redirects moved so you keep search rankings.' },
      { q: 'Do you set up marketing after launch?', a: 'Yes. Retention email and WhatsApp flows, ads and SEO can run under the same team.' },
    ],
  },
  {
    service: 'seo',
    industry: 'saas-technology',
    title: 'SEO for SaaS and technology companies',
    intro:
      'SaaS buyers search for problems, alternatives and comparisons long before they search for your name. SaaS SEO is built around those searches, with product, use-case and comparison pages that are technically sound and genuinely useful to someone evaluating tools.',
    needs: ['Use-case and integration pages', 'Honest comparison and alternative pages', 'Documentation that is indexable and well structured', 'Fast, technically clean marketing site'],
    build: ['Keyword map across problem, solution and comparison intent', 'Programmatic templates where they add value', 'SoftwareApplication and FAQ schema', 'Content that supports sales conversations'],
    mistakes: ['Only targeting your own product category name', 'Comparison pages that are obviously one-sided', 'Docs on a subdomain nobody links to'],
    faqs: [
      { q: 'Do you work with B2B SaaS?', a: 'Yes, B2B and B2C. Most of our SaaS work is B2B, where search supports long sales cycles.' },
      { q: 'Can you write technical content?', a: 'Yes. Our team includes engineers, so we can write accurately about APIs, integrations and architecture, reviewed by your product team.' },
      { q: 'How do you measure SaaS SEO?', a: 'By sign-ups, demo requests and pipeline from organic search, not just traffic.' },
    ],
  },
  {
    service: 'web-development',
    industry: 'saas-technology',
    title: 'Marketing sites for SaaS and technology companies',
    intro:
      'A SaaS marketing site is judged like the product: speed, clarity and craft. It has to explain a technical product in seconds, convert visitors into trials or demos, and let your marketing team ship pages without waiting on engineering.',
    needs: ['A homepage that explains the product in one screen', 'Pricing, use-case and integration pages', 'A CMS your marketers can use', 'Analytics and product sign-up tracking'],
    build: ['Modern, fast front end with a headless CMS', 'Reusable page sections for campaigns', 'Trial and demo flows connected to your CRM', 'Docs and changelog sections'],
    mistakes: ['Feature lists instead of outcomes', 'Every page change needing a developer', 'Heavy animation that hurts load time'],
    faqs: [
      { q: 'Which CMS do you use?', a: 'It depends on your team: headless options such as Sanity or Contentful, or WordPress where marketers already know it.' },
      { q: 'Can you match our product design system?', a: 'Yes. We build the site on your tokens and components so marketing and product look like one brand.' },
      { q: 'Do you design as well as build?', a: 'Yes. Design and engineering are one team, which keeps the build faithful to the design.' },
    ],
  },
  {
    service: 'digital-marketing',
    industry: 'hospitality',
    title: 'Digital marketing for restaurants, cafés and hotels',
    intro:
      'Hospitality is won locally and visually. Guests decide from Maps, reviews and a few photos, so marketing a restaurant or hotel means being findable nearby, looking as good online as in person, and turning first visits into regulars.',
    needs: ['A strong Google Business Profile with current menu and hours', 'Steady, good-quality social content', 'Direct booking or ordering to reduce commission', 'A reason for guests to come back'],
    build: ['Local SEO and review programme', 'Social content and short-form video', 'Direct ordering or booking pages', 'WhatsApp and loyalty campaigns'],
    mistakes: ['Menus and hours that are wrong on Google', 'Relying entirely on aggregator commissions', 'Posting only offers, never the experience'],
    faqs: [
      { q: 'Can you reduce our dependence on delivery apps?', a: 'Partly. Direct ordering, QR menus and loyalty campaigns move repeat customers to your own channel; aggregators still help with discovery.' },
      { q: 'Do you shoot photos and video?', a: 'Yes, through our video and creative production service, or we work with your existing content.' },
      { q: 'We built MenusQR. Why does it matter here?', a: 'MenusQR is our QR menu and ordering platform for restaurants, so we understand day-to-day operations, not just marketing.' },
    ],
  },
  {
    service: 'chatbots-agents',
    industry: 'real-estate',
    title: 'AI chatbots for real estate',
    intro:
      'Property enquiries arrive at all hours and most ask the same things: price, size, possession, location. A well-built assistant answers those instantly from your project data, asks a few qualifying questions and hands serious buyers to your sales team with the details already captured.',
    needs: ['Accurate answers from your own project data', 'Qualification: budget, timeline, configuration', 'Hand-off to a human with full context', 'Availability on website and WhatsApp'],
    build: ['Assistant grounded in your brochures and price lists', 'WhatsApp and website deployment', 'CRM integration with lead scoring', 'Human takeover and conversation review'],
    mistakes: ['Letting a bot invent prices or availability', 'No clear path to a human', 'Bots that ask ten questions before answering one'],
    faqs: [
      { q: 'Will the bot make up answers?', a: 'It is restricted to the documents and data you provide and is set to hand over to a person when it does not know. We review conversations to keep improving it.' },
      { q: 'Can it work on WhatsApp?', a: 'Yes, through the WhatsApp Business Platform, alongside your website chat.' },
      { q: 'Does it replace our sales team?', a: 'No. It handles the first questions and qualification, so your team spends time on buyers who are ready to talk.' },
    ],
  },
  {
    service: 'seo',
    industry: 'professional-services',
    title: 'SEO for law firms, CAs and consultancies',
    intro:
      'Clients choose professional firms on trust, and they start by searching for a specific problem. SEO for a firm means publishing clear, expert answers to those problems under named professionals, and making sure the firm shows up locally when someone is ready to call.',
    needs: ['Practice-area pages written for clients, not peers', 'Named authors with credentials', 'Local visibility for each office', 'Content that respects professional rules'],
    build: ['Practice-area and service page structure', 'Author pages and Person schema', 'Local SEO for each office', 'Article programme on real client questions'],
    mistakes: ['Pages full of jargon clients never search for', 'Anonymous content with no visible expert', 'Claims that breach professional advertising rules'],
    faqs: [
      { q: 'Can a law or CA firm advertise online?', a: 'Rules differ by profession and country. We keep content informational and within the guidance your professional body sets, and you approve everything before it goes live.' },
      { q: 'Who writes the articles?', a: 'We draft from interviews with your professionals and they review and sign off, so the expertise is genuinely theirs.' },
      { q: 'How soon do enquiries come?', a: 'Local visibility can improve within a few months; article-led growth builds over six to twelve months.' },
    ],
  },
];

export const getIndustryService = (service?: string, industry?: string) =>
  INDUSTRY_SERVICES.find((x) => x.service === service && x.industry === industry);

export const industryServicePaths = () => INDUSTRY_SERVICES.map((x) => `/services/${x.service}/for/${x.industry}`);
