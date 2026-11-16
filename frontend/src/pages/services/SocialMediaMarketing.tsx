import { Share2 } from 'lucide-react';
import { ServiceDetailLayout, type ServicePageData } from '../../components/common/ServiceDetailLayout';

const DATA: ServicePageData = {
  badge: 'Digital Marketing & Growth · Social Media',
  title: 'Social Media That Builds a Brand People Remember.',
  subtitle: 'Content creation, organic page management and paid social planned together, with a calendar, a consistent voice and reporting you can read.',
  slug: 'social-media-marketing',
  art: 'brand',
  icon: Share2,
  seoTitle: 'Social Media Marketing Services | Qevnaro',
  seoDescription: 'Social media content creation, page management and paid social campaigns for Instagram, Facebook, LinkedIn and YouTube with clear reporting.',
  overview: [
    'Social media works when a brand shows up consistently with something worth seeing. That takes a clear voice, a repeatable content system and a team that responds to the audience, not only a posting schedule.',
    'Qevnaro separates three jobs that are often blurred together: creating the content, managing the organic presence and running paid social. You can engage us for any one or combine them under a single plan.'
  ],
  whyNeeded: {
    heading: 'What social media does for a business',
    points: [
      { title: 'Visible credibility', desc: 'Prospects often check your profiles before they contact you. An active, coherent presence reassures them.' },
      { title: 'Audience relationships', desc: 'Comments, messages and community moments create trust that ads alone cannot.' },
      { title: 'Content that travels', desc: 'Short video, carousels and stories give audiences easy ways to share your work.' },
      { title: 'Precise paid reach', desc: 'Platform targeting lets you reach defined groups when organic reach is limited.' }
    ]
  },
  problemsSolved: [
    { title: 'Irregular posting', problem: 'Content appears in bursts and then disappears when the team is busy.', solution: 'A content calendar, batch production and approval workflow that keeps cadence steady.' },
    { title: 'Content with no point of view', problem: 'Generic posts do not distinguish the brand from competitors.', solution: 'Content pillars and a defined voice grounded in your real expertise and offers.' },
    { title: 'Followers that never become customers', problem: 'Engagement is not connected to enquiries or sales.', solution: 'Clear calls to action, link tracking and lead capture from social to site or WhatsApp.' }
  ],
  deliverables: [
    'Social account and competitor audit',
    'Content pillars and tone-of-voice guide',
    'Monthly content calendar',
    'Designed posts, carousels and stories',
    'Short-form video and reel production',
    'Caption writing and hashtag research',
    'Scheduled publishing across platforms',
    'Community management and comment responses',
    'Paid social campaign setup where selected',
    'Monthly analytics report with recommendations'
  ],
  subServices: [
    { title: 'Social media strategy', desc: 'Platform selection, audience definition, pillars and goals.' },
    { title: 'Content creation', desc: 'Graphics, carousels, reels and stories designed to your brand system.' },
    { title: 'Organic page management', desc: 'Scheduling, publishing, replying and keeping profiles current.' },
    { title: 'Instagram and Facebook marketing', desc: 'Feed, reels, stories and groups for consumer and local brands.' },
    { title: 'LinkedIn marketing', desc: 'Company page and thought-leadership content for B2B audiences.' },
    { title: 'YouTube channel support', desc: 'Channel setup, titles, thumbnails and publishing cadence.' },
    { title: 'Paid social campaigns', desc: 'Meta and LinkedIn ads for awareness, leads and retargeting.' },
    { title: 'Influencer and creator outreach', desc: 'Shortlisting and coordinating creators suited to your audience.' },
    { title: 'Social listening and community', desc: 'Monitoring mentions and handling messages and reviews.' },
    { title: 'Reporting and analytics', desc: 'Reach, engagement, clicks and conversions reviewed monthly.' }
  ],
  methodology: [
    { step: '01', title: 'Account audit', desc: 'We review profiles, past content, audience and competitors.' },
    { step: '02', title: 'Pillars and calendar', desc: 'Themes and a publishing plan are agreed before production.' },
    { step: '03', title: 'Create and publish', desc: 'Content is produced, approved and scheduled.' },
    { step: '04', title: 'Engage', desc: 'We respond to comments and messages within agreed hours.' },
    { step: '05', title: 'Analyse and report', desc: 'Performance is reviewed and next month is adjusted accordingly.' }
  ],
  toolsAndTech: [
    { category: 'Creation', items: ['Figma', 'Adobe Creative Suite', 'CapCut / Premiere', 'Canva for templates'] },
    { category: 'Publishing', items: ['Meta Business Suite', 'LinkedIn', 'Scheduling tools', 'YouTube Studio'] },
    { category: 'Analytics', items: ['Platform insights', 'UTM links', 'GA4', 'Looker Studio'] }
  ],
  whoNeedsThis: [
    'Consumer brands wanting a visible Instagram and Facebook presence',
    'B2B firms building authority on LinkedIn',
    'Restaurants, clinics and retailers with local audiences',
    'Founders who lack time to post consistently',
    'Brands launching a product that needs awareness',
    'Companies with followers but no clear route to leads'
  ],
  businessOutcomes: [
    { metric: 'Consistent', label: 'Presence', desc: 'Regular, on-brand publishing instead of occasional bursts.' },
    { metric: 'Engaged', label: 'Community', desc: 'Prompt responses that make followers feel heard.' },
    { metric: 'Accountable', label: 'Reporting', desc: 'Monthly insight into what content is working and why.' }
  ],
  relatedCaseStudies: [],
  relatedServices: [
    { title: 'Video and Creative Production', desc: 'Reels and brand video.', href: '/services/video-creative-production' },
    { title: 'Performance Marketing', desc: 'Scale winning content with ads.', href: '/services/performance-marketing' },
    { title: 'Branding', desc: 'A strong identity to post from.', href: '/services/branding' }
  ],
  faqs: [
    { q: 'Which platforms should my business be on?', a: 'We choose based on where your audience spends time and what content you can sustain. Fewer platforms done well beat many done poorly.' },
    { q: 'Do you need access to my accounts?', a: 'We work through business-level access such as Meta Business Suite so you keep ownership of your accounts.' },
    { q: 'Can I approve posts before they go live?', a: 'Yes. Our workflow includes a review step before scheduling.' },
    { q: 'Is ad budget included?', a: 'No. Paid social spend goes directly to the platform and is separate from our management fee unless agreed otherwise.' },
    { q: 'How do you handle negative comments?', a: 'We agree escalation rules in advance, respond politely where appropriate and flag serious issues to you.' }
  ],
  extraSections: [
    {
      eyebrow: 'Three different jobs',
      title: 'Content creation, organic management and paid social',
      intro: 'These are related but distinct. Knowing which you need prevents paying for work you will not use.',
      columns: [
        { title: 'Content creation', items: ['Designs, carousels and reels', 'Copywriting and captions', 'Brand-consistent templates', 'Delivered as ready-to-post assets'] },
        { title: 'Organic management', items: ['Calendar and scheduling', 'Publishing and profile upkeep', 'Comment and message responses', 'Monthly analytics'] },
        { title: 'Paid social', items: ['Audience targeting and budgets', 'Ad creative variations', 'Retargeting and lead forms', 'Ad spend billed by platform'] }
      ]
    }
  ]
};

export const SocialMediaMarketing = () => <ServiceDetailLayout data={DATA} />;

export default SocialMediaMarketing;
