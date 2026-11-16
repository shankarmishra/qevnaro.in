import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { PageHero, SectionHead } from '../components/ui/PageHero';
import { SEO } from '../components/ui/SEO';
import { FinalCTA } from '../components/home/FinalCTA';
import { offices, site } from '../lib/site';

const areas = ['Engineering', 'Design', 'Marketing and SEO', 'Content and video', 'Project management'];

const look = [
  { t: 'Craft', d: 'You care about doing things properly, and you notice the details.' },
  { t: 'Curiosity', d: 'You enjoy learning new tools and understanding how businesses work.' },
  { t: 'Clear communication', d: 'You explain your thinking simply and listen well.' },
];

export function Careers() {
  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Careers at Qevnaro: Engineering, Design and Marketing Roles"
        description="Qevnaro is always open to talented engineers, designers and marketers in Noida and Bengaluru. Tell us what you do and what you would like to work on."
        path="/careers"
      />

      <PageHero
        layout="center"
        crumbs={[{ label: 'Careers' }]}
        eyebrow="Careers"
        title="We are always open to talented people."
        accent="talented people."
        lead="We do not have specific roles listed right now, but we enjoy meeting people who are good at what they do. If that sounds like you, tell us about yourself."
        actions={
          <>
            <Button to="/contact">Get in touch</Button>
            {site.email && (
              <Button href={`mailto:${site.email}?subject=Career%20enquiry`} variant="outline" arrow={false}>Email us</Button>
            )}
          </>
        }
      />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Where you could fit" title="Areas we work in" />
            <ul className="mt-10 border-t border-line-strong">
              {areas.map((a, i) => (
                <li key={a} className="flex items-center gap-5 border-b border-line py-4">
                  <span className="font-mono text-xs text-brand-sky">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl font-medium tracking-tight text-fg">{a}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-fg-muted">Based in {offices.map((o) => o.city).join(' and ')}.</p>
          </div>
          <div className="lg:col-span-7">
            <SectionHead eyebrow="What we look for" title="The qualities that matter to us" accent="matter" />
            <ol className="mt-10 border-t border-line-strong">
              {look.map((l, i) => (
                <Reveal as="li" key={l.t} delay={i * 0.06} className="flex gap-6 border-b border-line py-7">
                    <span className="serif-accent text-4xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="t-h3 text-fg">{l.t}</h3>
                      <p className="mt-2 text-[17px] leading-relaxed text-fg-soft">{l.d}</p>
                    </div>
                  </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Say hello."
        accent="hello."
        body="Use the contact form and mention what you do and what you would like to work on. Include a link to your portfolio or profile if you have one."
      />
    </div>
  );
}

export default Careers;
