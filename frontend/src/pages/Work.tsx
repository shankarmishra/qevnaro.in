import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { PageHero } from '../components/ui/PageHero';
import { BrowserFrame, PhoneFrame } from '../components/ui/DeviceFrame';
import { SEO } from '../components/ui/SEO';
import { FinalCTA } from '../components/home/FinalCTA';
import { projects } from '../lib/projects';
import { site } from '../lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Qevnaro work',
  url: `${site.url}/work`,
  hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.name, url: site.url + p.path, description: p.tagline })),
};

export function Work() {
  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Our Work: Live Products Designed and Built by Qevnaro"
        description="Case studies of products Qevnaro designed and built end to end: Pulse n Care, a home-nursing and teleconsultation platform, and MenusQR, a QR menu and ordering platform."
        path="/work"
        jsonLd={jsonLd}
      />

      <PageHero
        crumbs={[{ label: 'Work' }]}
        eyebrow="Selected work"
        title="Products we designed and built."
        accent="built."
        lead="A small, honest selection. Each project below is live, and each case study explains what the problem was and how we approached it."
      />

      <section className="bg-canvas">
        {projects.map((p, i) => (
          <article key={p.slug} className="border-b border-line">
            <div className={`container-x grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16`}>
              <Reveal className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
                <Link to={p.path} aria-label={`${p.name} case study`} className="group relative block pb-10 pl-8 sm:pl-14">
                  <BrowserFrame
                    src={p.shots.desktop[0]}
                    alt={`${p.name} website, home page`}
                    url={p.host}
                    eager={i === 0}
                    className="transition-transform duration-700 group-hover:-translate-y-1.5"
                  />
                  <PhoneFrame
                    src={p.shots.mobile}
                    alt={`${p.name} on a phone`}
                    className="absolute bottom-0 left-0 w-[24%] min-w-[92px] max-w-[190px] transition-transform duration-700 group-hover:-translate-y-3"
                  />
                </Link>
              </Reveal>

              <Reveal delay={0.1} className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  <span className="serif-accent text-5xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-px w-10 bg-line-strong" />
                  <span className="t-micro text-fg-muted">{p.industry} · {p.category}</span>
                </div>
                <h2 className="t-h1 mt-6 text-fg">{p.name}</h2>
                <p className="t-lead mt-4 text-fg-soft">{p.tagline}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{p.intro}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.services.map((s) => (
                    <li key={s} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-fg-soft">{s}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link to={p.path} className="group inline-flex items-center gap-2 text-[15px] font-medium text-fg">
                    <span className="link-underline">Read the case study</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-[15px] text-fg-muted hover:text-fg">
                    <span className="link-underline">{p.host}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      <FinalCTA heading="Your project could be next." accent="next." body="Tell us what you want to build and we will reply with an honest view of how we would do it." />
    </div>
  );
}

export default Work;
