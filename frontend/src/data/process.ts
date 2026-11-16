
export interface Step {
  num: string;
  title: string;
  summary: string;
  we: string[];
  you: string[];
  need: string[];
}

export const STEPS: Step[] = [
  {
    num: '01', title: 'Discover',
    summary: 'We learn your business, customers and constraints before proposing anything.',
    we: ['Run a kickoff conversation on goals, audience and success measures', 'Review your current site, analytics and competitors', 'Identify risks, dependencies and quick wins'],
    you: ['A shared understanding of the problem and the goals', 'A clear scope and priorities', 'A written summary of findings'],
    need: ['Access to existing site, analytics and accounts where relevant', 'Honest context on what has and has not worked', 'A named decision-maker'],
  },
  {
    num: '02', title: 'Strategize',
    summary: 'We turn what we learned into a plan you can approve with confidence.',
    we: ['Define structure, features and content approach', 'Choose technology that fits the goals and the team', 'Agree timeline, milestones and review points'],
    you: ['A proposed plan, sitemap or architecture', 'A timeline with milestones', 'A transparent estimate and assumptions'],
    need: ['Feedback on the plan within the agreed window', 'Sign-off on scope before build starts', 'Brand assets and existing content inventory'],
  },
  {
    num: '03', title: 'Create & Build',
    summary: 'Design and engineering move together, with checkpoints so there are no late surprises.',
    we: ['Design the key screens and the visual system', 'Build, integrate and test across devices and browsers', 'Share working previews at each milestone'],
    you: ['Reviewable designs and live previews', 'A tested build covering speed, accessibility and search basics', 'Documentation for how things work'],
    need: ['Final copy, images and product data', 'Structured feedback on each review round', 'Access to third-party tools being integrated'],
  },
  {
    num: '04', title: 'Launch & Optimize',
    summary: 'We release carefully, then use real data to improve the first version.',
    we: ['Run a pre-launch checklist and prepare redirects', 'Go live with analytics and monitoring in place', 'Review early behaviour and fix what the data shows'],
    you: ['A live, monitored product', 'Tracking set up against your goals', 'A short list of recommended improvements'],
    need: ['Approval to go live', 'Domain and hosting access if we do not manage them', 'Availability during launch window'],
  },
  {
    num: '05', title: 'Grow & Support',
    summary: 'Good digital products keep evolving. We stay available to maintain and expand.',
    we: ['Maintain, update and secure what we built', 'Report on the numbers that matter to you', 'Plan the next round of improvements with you'],
    you: ['Ongoing support and maintenance options', 'Regular, plain-language reporting', 'A prioritised roadmap'],
    need: ['Periodic review of results and priorities', 'Timely approval of new work', 'Feedback from your team and customers'],
  },
];

export const PRINCIPLES = [
  { t: 'Clarity over jargon', d: 'We explain decisions in plain language so you can make informed calls.' },
  { t: 'Honest estimates', d: 'We state assumptions and risks up front, and tell you early when something changes.' },
  { t: 'Small, visible steps', d: 'Regular previews mean you see progress and can steer before it is expensive.' },
  { t: 'Measure what matters', d: 'We tie work to business outcomes, not vanity numbers.' },
  { t: 'Built to last', d: 'Clean, documented work that your team or another developer can pick up.' },
  { t: 'No guaranteed rankings', d: 'We do not promise results nobody can control. We promise careful work and transparent reporting.' },
];
