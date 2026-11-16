import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Eyebrow, Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { BrowserFrame, PhoneFrame } from '../ui/DeviceFrame';
import { projects, type Project } from '../../lib/projects';
import { useMedia } from '../../lib/useVisible';

const Panel: React.FC<{ p: Project; i: number }> = ({ p, i }) => (
  <article className="grid w-full shrink-0 items-center gap-10 lg:w-[82vw] lg:max-w-[1180px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
    <div>
      <div className="flex items-center gap-4">
        <span className="serif-accent text-5xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
        <span className="h-px w-10 bg-line-strong" />
        <span className="t-micro text-fg-muted">{p.industry} · {p.category}</span>
      </div>
      <h3 className="t-h1 mt-6 text-fg">{p.name}</h3>
      <p className="t-lead mt-4 max-w-md text-fg-soft">{p.tagline}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {p.services.slice(0, 4).map((s) => (
          <li key={s} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-fg-soft">{s}</li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
        <Link to={`/work/${p.slug}`} className="group inline-flex items-center gap-2 text-[15px] font-medium text-fg">
          <span className="link-underline">Read the case study</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a href={p.liveUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-[15px] text-fg-muted hover:text-fg">
          <span className="link-underline">{p.host}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>

    <div className="relative pb-10 pl-8 sm:pl-14">
      <BrowserFrame src={p.shots.desktop[0]} alt={`${p.name} website, home page`} url={p.host} />
      <PhoneFrame
        src={p.shots.mobile}
        alt={`${p.name} on a phone`}
        className="absolute bottom-0 left-0 w-[26%] min-w-[92px] max-w-[180px]"
      />
    </div>
  </article>
);

/** Selected work. On desktop the section pins and the panels travel sideways as you scroll. */
export const WorkGallery: React.FC = () => {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const desktop = useMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  const [dist, setDist] = useState(0);

  useEffect(() => {
    if (!desktop) return;
    const measure = () => {
      const el = track.current;
      if (el) setDist(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  return (
    <section
      ref={section}
      className={`relative border-t border-line bg-canvas ${desktop ? 'h-[320vh]' : 'section-y'}`}
      aria-labelledby="work-heading"
    >
      <div className={desktop ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : ''}>
        <motion.div
          ref={track}
          style={desktop ? { x } : undefined}
          className={desktop ? 'flex w-max items-center gap-[9vw] pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] pr-[12vw]' : 'container-x flex flex-col gap-20'}
        >
          <div className="shrink-0 lg:w-[30vw] lg:max-w-[420px]">
            <Reveal><Eyebrow>Selected work</Eyebrow></Reveal>
            <h2 id="work-heading" className="t-h1 mt-5 text-fg">
              Two live products, built <span className="serif-accent">end to end.</span>
            </h2>
            <p className="t-lead mt-5 text-fg-soft">
              Not mock-ups. Both are running today, and you can open them and judge the work for yourself.
            </p>
            {desktop && (
              <p className="t-micro mt-10 flex items-center gap-3 text-fg-muted" aria-hidden="true">
                Keep scrolling <ArrowRight className="h-3.5 w-3.5" />
              </p>
            )}
          </div>

          {projects.map((p, i) => (
            <Panel key={p.slug} p={p} i={i} />
          ))}

          <div className="shrink-0 lg:w-[26vw] lg:max-w-[360px]">
            <p className="t-h2 text-fg">
              Yours could be <span className="serif-accent text-brand-blue">next.</span>
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-soft">
              Tell us what you are building. We will reply with how we would approach it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/contact">Start a project</Button>
              <Button to="/work" variant="outline" arrow={false}>All work</Button>
            </div>
          </div>
        </motion.div>

        {desktop && (
          <div className="container-x absolute inset-x-0 bottom-9" aria-hidden="true">
            <span className="relative block h-px w-full overflow-hidden bg-line-strong">
              <motion.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-brand-navy" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkGallery;
