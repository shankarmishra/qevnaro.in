import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { PageHero, SectionHead } from '../components/ui/PageHero';
import { TextReveal } from '../components/ui/TextReveal';
import { SEO } from '../components/ui/SEO';
import { FinalCTA } from '../components/home/FinalCTA';
import { SERVICE_GROUPS } from '../data/services';
import { COMPANY, TEAM } from '../data/team';
import { organizationSchema } from '../lib/schema';
import { projects } from '../lib/projects';
import { offices, site } from '../lib/site';

const principles = [
  ['Start with the goal', 'Every project begins with what you want to change in your business, not with a list of features.'],
  ['Keep it simple', 'The best solution is usually the simplest one that fully does the job.'],
  ['Measure what matters', 'We agree how success will be judged early, and report on it honestly.'],
];

const values = [
  { title: 'Plain speaking', desc: 'We explain things without jargon and tell you when something is not worth doing.' },
  { title: 'Craft over speed', desc: 'We move quickly, but never at the cost of quality you will notice.' },
  { title: 'Honest promises', desc: 'We do not guarantee rankings or inflate numbers. We commit to what we can control.' },
  { title: 'Ownership', desc: 'We treat your product as if it were ours, and stay accountable after launch.' },
  { title: 'Respect for your time', desc: 'Short feedback loops, clear updates and no surprises.' },
];

const collab = [
  { t: 'Conversation', d: 'We listen first: your goals, your customers, your constraints.' },
  { t: 'Proposal', d: 'A clear scope, timeline and cost, written in plain language.' },
  { t: 'Build together', d: 'Regular previews so you see progress and shape it as we go.' },
  { t: 'Launch and support', d: 'We release carefully, then stay on hand to improve what we shipped.' },
];

export function About() {
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Qevnaro', url: `${site.url}/about` },
    {
      ...organizationSchema(),
      ...(COMPANY.foundingYear ? { foundingDate: COMPANY.foundingYear } : {}),
      ...(COMPANY.legalName ? { legalName: COMPANY.legalName } : {}),
      ...(TEAM.length
        ? { employee: TEAM.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role, ...(m.linkedin ? { sameAs: m.linkedin } : {}) })) }
        : {}),
    },
  ];

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="About Qevnaro: A Technology and Digital Growth Agency in Noida and Bengaluru"
        description="Qevnaro is a digital agency with offices in Noida and Bengaluru. Engineers, designers and marketers work as one team to build websites, apps and the marketing that grows them."
        path="/about"
        jsonLd={jsonLd}
      />

      <PageHero
        layout="center"
        crumbs={[{ label: 'About' }]}
        eyebrow="About Qevnaro"
        title="Technology and creativity, working as one team."
        accent="one team."
        lead="We are a digital agency that helps businesses build better products and grow with confidence. Engineers, designers and marketers sit at the same table, so what we make looks right and works right."
        actions={
          <>
            <Button to="/contact">Talk to us</Button>
            <Button to="/work" variant="outline">See our work</Button>
          </>
        }
      />

      {/* Why we exist */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <p className="t-micro text-fg-muted">Why we exist</p>
          <TextReveal
            className="mt-8 max-w-[60rem] font-display text-[clamp(1.6rem,3.2vw,2.9rem)] font-medium leading-[1.16] tracking-[-0.03em] text-fg"
            text="Too many businesses are handed either beautiful designs that do not work, or working software nobody enjoys using. Qevnaro exists to make good digital work easier to get, by bringing *both* *disciplines* together from the first idea to a live product, and staying with you as it *grows.*"
          />
          <dl className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Offices', offices.map((o) => o.city).join(' and ')],
              ['Live products built', projects.map((p) => p.name).join(', ')],
              ['Services', `${SERVICE_GROUPS.reduce((n, g) => n + g.services.length, 0)} across ${SERVICE_GROUPS.length} groups`],
              ['Motto', site.tagline],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface p-6">
                <dt className="t-micro text-fg-muted">{k}</dt>
                <dd className="mt-3 font-display text-lg font-medium leading-snug tracking-tight text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Vision and mission */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Vision and mission" title="Where we are headed" accent="headed" />
          </div>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            <Reveal className="bg-surface p-8 sm:p-10">
              <h3 className="t-h3 text-fg">Vision</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-fg-soft">
                A world where every ambitious business, large or small, has access to digital products and
                marketing of the highest standard.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="bg-surface p-8 sm:p-10">
              <h3 className="t-h3 text-fg">Mission</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-fg-soft">
                To design, build and grow digital experiences that are clear, dependable and measurably
                useful to the people who run them and the people who use them.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Technology and creativity */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x">
          <SectionHead
            eyebrow="Technology and creativity"
            title="Why the two belong together"
            accent="together"
            intro="When the two are planned together, designers know what is possible and engineers know what matters. The result is work that is both beautiful and dependable."
          />
          <div className="mt-12 grid gap-x-12 border-t border-line-strong md:grid-cols-2">
            <Reveal>
              <div className="border-b border-line py-8 md:border-b-0">
                <span className="serif-accent text-4xl leading-none text-brand-blue">01</span>
                <h3 className="t-h3 mt-4 text-fg">Technology gives it strength</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-fg-soft">
                  Speed, security, accessibility and reliability are what make a product trustworthy day after day.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="py-8">
                <span className="serif-accent text-4xl leading-none text-brand-blue">02</span>
                <h3 className="t-h3 mt-4 text-fg">Creativity gives it meaning</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-fg-soft">
                  Story, design and tone are what make people notice a product, understand it and choose it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow="What we do" title="Four kinds of work, one team" accent="one team" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_GROUPS.map((g, i) => (
              <Reveal as="li" key={g.key} delay={i * 0.05} className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-7">
                  <span className="serif-accent text-3xl leading-none text-brand-blue">{g.n}</span>
                  <h3 className="t-h3 mt-4 text-fg">{g.verb}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-soft">{g.blurb}</p>
                  <p className="mt-5 text-[13px] leading-relaxed text-fg-muted">{g.services.map((s) => s.title).join(' · ')}</p>
                </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10">
            <Link to="/services" className="group inline-flex items-center gap-2 text-[15px] font-medium text-fg">
              <span className="link-underline">All services</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Principles and values */}
      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Our approach" title="How we think about the work" />
            <ol className="mt-10 border-t border-line-strong">
              {principles.map(([t, d], i) => (
                <li key={t} className="flex gap-5 border-b border-line py-6">
                  <span className="font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-[17px] font-medium tracking-tight text-fg">{t}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-fg-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Values" title="How we work, day to day" />
            <ul className="mt-10 grid gap-x-10 border-t border-line-strong sm:grid-cols-2">
              {values.map((v) => (
                <li key={v.title} className="border-b border-line py-6">
                  <h3 className="font-display text-[17px] font-medium tracking-tight text-fg">{v.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-fg-soft">{v.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team: shown only once real profiles are added to data/team.ts */}
      {TEAM.length > 0 && (
        <section className="section-y border-b border-line bg-canvas">
          <div className="container-x">
            <SectionHead eyebrow="Leadership" title="The people behind Qevnaro" />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m) => (
                <li key={m.name} className="rounded-[var(--radius-lg)] border border-line bg-surface p-7">
                  {m.photo && (
                    <img src={m.photo} alt={m.name} loading="lazy" className="hex-clip mb-6 h-28 w-28 object-cover" />
                  )}
                  <h3 className="t-h3 text-fg">{m.name}</h3>
                  <p className="t-micro mt-1 text-brand-sky">{m.role}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-fg-soft">{m.bio}</p>
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noreferrer" className="link-underline mt-4 inline-block text-sm text-fg">
                      LinkedIn
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Working with us */}
      <section className="section-y border-b border-line bg-canvas">
        <div className="container-x">
          <SectionHead eyebrow="Collaboration" title="Working with us" />
          <ol className="mt-12 grid gap-x-8 gap-y-10 border-t border-line-strong pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {collab.map((c, i) => (
              <Reveal as="li" key={c.t} delay={i * 0.06}>
                  <span className="serif-accent text-4xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3 mt-4 text-fg">{c.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{c.d}</p>
                </Reveal>
            ))}
          </ol>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
            {offices.map((o) => (
              <Link key={o.slug} to={`/locations/${o.slug}`} className="group inline-flex items-center gap-2 text-[15px] font-medium text-fg">
                <span className="link-underline">{o.city} office</span>
                <ArrowUpRight className="h-4 w-4 text-fg-muted" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA heading="Let us build something good together." accent="together." body="Tell us about your project and we will reply with honest, practical next steps." />
    </div>
  );
}

export default About;
