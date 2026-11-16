import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Button } from './ui/Button';
import { Magnetic } from './ui/Magnetic';
import { Eyebrow } from './ui/Reveal';
import { SplitText } from './ui/SplitText';
import { DUR, EASE } from '../lib/motion';
import { useMedia } from '../lib/useVisible';

const HeroCanvas = lazy(() => import('./hero/HeroCanvas'));

const POSTER = '/assets/hero/poster.webp';
const POSTER_MOBILE = '/assets/hero/poster-mobile.webp';

const CHAPTERS = [
  { at: [0.2, 0.27, 0.42, 0.48], n: '01', label: 'Build', title: 'Designed and engineered in-house.', body: 'Websites, apps and stores, from first sketch to launch, by one team.' },
  { at: [0.5, 0.56, 0.71, 0.77], n: '02', label: 'Grow', title: 'Search, ads and content that compound.', body: 'SEO, AI search, paid campaigns and social, measured against enquiries.' },
  { at: [0.8, 0.86, 1, 1], n: '03', label: 'Automate', title: 'AI agents that take over the busywork.', body: 'Follow-ups, support and reporting handled, with a person in the loop.' },
];

const Chapter: React.FC<{ c: (typeof CHAPTERS)[number]; p: MotionValue<number> }> = ({ c, p }) => {
  const opacity = useTransform(p, c.at, [0, 1, 1, 0]);
  const y = useTransform(p, [c.at[0], c.at[1]], [36, 0]);
  const clip = useTransform(p, [c.at[0], c.at[1]], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const fill = useTransform(p, [c.at[1], c.at[2]], [0, 1]);
  return (
    <motion.div style={{ opacity, y }} className="absolute bottom-0 left-0 max-w-[40rem]" aria-hidden="true">
      <div className="flex items-center gap-4">
        <span className="serif-accent text-6xl leading-none text-brand-blue sm:text-7xl">{c.n}</span>
        <span className="relative block h-px w-16 overflow-hidden bg-line-strong">
          <motion.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-brand-navy" />
        </span>
        <span className="t-micro text-fg-muted">{c.label}</span>
      </div>
      <motion.p style={{ clipPath: clip }} className="t-h1 mt-5 text-fg">{c.title}</motion.p>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-soft">{c.body}</p>
    </motion.div>
  );
};

/** If WebGL is unavailable the canvas throws; show the poster instead. */
class CanvasBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** A still of the scene. Shown first, and kept wherever the live scene does not load. */
const Poster: React.FC = () => (
  <picture>
    <source media="(max-width: 767px)" srcSet={POSTER_MOBILE} />
    <img
      src={POSTER}
      alt=""
      width={1600}
      height={1000}
      fetchPriority="low"
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    />
  </picture>
);

/**
 * When to start the live 3D scene. Desktop: once the browser is idle after first paint.
 * Phones and tablets: on the first scroll or touch, so the 1 MB scene never competes with
 * the first paint on a mobile connection.
 */
function useStartScene() {
  const [start, setStart] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    const go = () => setStart(true);
    if (desktop) {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 1200 });
      else setTimeout(go, 600);
      return;
    }
    const events = ['scroll', 'touchstart', 'pointerdown', 'keydown'] as const;
    const once = () => {
      events.forEach((e) => window.removeEventListener(e, once));
      go();
    };
    events.forEach((e) => window.addEventListener(e, once, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, once));
  }, []);
  return start;
}

/** True once the once-per-session brand intro has finished (or immediately when there is none). */
function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const d = document.documentElement;
    if (!d.classList.contains('intro') || d.classList.contains('intro-done')) {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener('qev:intro-done', on);
    const cap = setTimeout(on, 3200);
    return () => {
      window.removeEventListener('qev:intro-done', on);
      clearTimeout(cap);
    };
  }, []);
  return done;
}

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useMedia('(prefers-reduced-motion: reduce)');
  const [ready, setReady] = useState(false);
  const play = useIntroDone();
  const start = useStartScene();

  const onReady = () => {
    setReady(true);
    window.dispatchEvent(new Event('qev:hero-ready'));
  };

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.12], [0, -80]);
  const introBlur = useTransform(scrollYProgress, [0, 0.12], ['blur(0px)', 'blur(6px)']);
  const captionVeil = useTransform(scrollYProgress, [0.14, 0.24], [0, 1]);
  const creditOpacity = useTransform(scrollYProgress, [0.24, 0.3, 0.42, 0.48], [0, 1, 1, 0]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: play ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: DUR.slow, ease: EASE, delay },
  });

  return (
    <section ref={ref} data-hero className={reduce ? 'relative' : 'relative h-[420vh]'} aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden bg-canvas">
        {/* Still frame first; the live scene fades in over it once it has rendered */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">
          <Poster />
        </div>

        {/* Real-time scene: a glass Qevnaro mark, the camera passes through it into the work */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.6, ease: EASE }}
          aria-hidden="true"
        >
          {start && (
            <CanvasBoundary fallback={<Poster />} onFail={onReady}>
              <Suspense fallback={null}>
                <HeroCanvas progress={scrollYProgress} still={reduce} onReady={onReady} />
              </Suspense>
            </CanvasBoundary>
          )}
        </motion.div>

        {/* Veil that keeps the intro copy readable */}
        <motion.div
          style={reduce ? undefined : { opacity: introOpacity }}
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,247,0.97)_0%,rgba(250,250,247,0.9)_44%,rgba(250,250,247,0)_70%)] md:bg-[linear-gradient(90deg,rgba(250,250,247,0.95)_0%,rgba(250,250,247,0.75)_32%,rgba(250,250,247,0)_58%)]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-canvas to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas to-transparent" aria-hidden="true" />

        {/* Intro copy */}
        <motion.div
          style={reduce ? undefined : { opacity: introOpacity, y: introY, filter: introBlur }}
          className="container-x absolute inset-x-0 top-[13svh] md:top-[19svh]"
        >
          <div className="max-w-[42rem]">
            <motion.div {...enter(0.05)}>
              <Eyebrow>
                Technology &amp; growth agency<span className="hidden sm:inline"> · Noida · Bengaluru · Worldwide</span>
              </Eyebrow>
            </motion.div>

            <SplitText
              as="h1"
              play={play}
              delay={0.15}
              text="Websites, apps and marketing, built by one team."
              accent="one team."
              className="t-display mt-6 text-fg"
            />

            <motion.p {...enter(0.85)} className="t-lead mt-7 max-w-[34rem] text-fg-soft">
              Qevnaro designs and builds your website or app, then runs the SEO, ads and AI automation that
              bring customers to it. One partner from first sketch to steady growth.
            </motion.p>

            <motion.div {...enter(1)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <Button to="/contact" size="lg" className="w-full sm:w-auto">Start a project</Button>
              </Magnetic>
              <Magnetic>
                <Button to="/work" variant="outline" size="lg" className="w-full bg-canvas/80 backdrop-blur-sm sm:w-auto">
                  See our work
                </Button>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>

        {!reduce && (
          <>
            {/* Soft veil behind the chapter captions */}
            <motion.div
              style={{ opacity: captionVeil }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_64%_60%_at_10%_95%,rgba(250,250,247,0.97)_0%,rgba(250,250,247,0.72)_45%,rgba(250,250,247,0)_72%)] max-md:bg-[linear-gradient(0deg,rgba(250,250,247,0.95)_0%,rgba(250,250,247,0.78)_26%,rgba(250,250,247,0)_46%)]"
              aria-hidden="true"
            />
            {/* Chapter captions */}
            <div className="container-x pointer-events-none absolute inset-x-0 bottom-[10svh]">
              <div className="relative h-0">
                {CHAPTERS.map((c) => (
                  <Chapter key={c.n} c={c} p={scrollYProgress} />
                ))}
              </div>
            </div>

            {/* What is on the screens */}
            <motion.p
              style={{ opacity: creditOpacity }}
              className="t-micro pointer-events-none absolute right-6 top-24 hidden max-w-[16rem] text-right text-fg-muted lg:right-10 lg:block"
              aria-hidden="true"
            >
              On screen: Pulse n Care and MenusQR, two live products we built
            </motion.p>

            {/* Scroll dial */}
            <motion.div
              {...enter(1.2)}
              className="pointer-events-none absolute bottom-8 right-6 hidden items-center gap-3 md:flex lg:right-10"
              aria-hidden="true"
            >
              <span className="t-micro text-fg-muted">Scroll</span>
              <span className="relative block h-px w-24 overflow-hidden bg-line-strong">
                <motion.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-brand-navy" />
              </span>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
