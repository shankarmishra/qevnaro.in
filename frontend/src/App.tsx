import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandMenu } from './components/common/CommandMenu';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { QEVNARO_CHEVRON_PATH, QEVNARO_NAVY_PATH } from './components/common/QevnaroLogo';
import { REDIRECTS } from './routes';
import { EASE } from './lib/motion';
import { Cursor } from './components/ui/Motion';
import { useIdle } from './components/ui/ServiceObject';

const SceneRoot = lazy(() => import('./components/three/SceneRoot'));

/** The shared 3D canvas loads after first paint, in the browser only. */
function LazyScene() {
  const idle = useIdle(1500);
  const [desktop, setDesktop] = useState(false);
  useEffect(() => setDesktop(window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches), []);
  if (!idle || !desktop) return null;
  return (
    <Suspense fallback={null}>
      <SceneRoot />
    </Suspense>
  );
}

// Home is eager for a fast first paint; every other route is code-split
import { Home } from './pages/Home';

const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About || m.default })));
const Careers = lazy(() => import('./pages/Careers').then((m) => ({ default: m.Careers || m.default })));
const Contact = lazy(() => import('./pages/Contact'));
const Work = lazy(() => import('./pages/Work').then((m) => ({ default: m.Work || m.default })));
const Process = lazy(() => import('./pages/Process').then((m) => ({ default: m.Process || m.default })));
const Pricing = lazy(() => import('./pages/Pricing'));
const Insights = lazy(() => import('./pages/Insights'));
const InsightArticle = lazy(() => import('./pages/InsightArticle').then((m) => ({ default: m.InsightArticle || m.default })));
const AgentsAtWork = lazy(() => import('./pages/AgentsAtWorkPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PulseNCareCaseStudy = lazy(() => import('./pages/case-studies/PulseNCareCaseStudy'));
const MenuSQRCaseStudy = lazy(() => import('./pages/case-studies/MenuSQRCaseStudy'));

const PrivacyPolicy = lazy(() => import('./pages/legal/Privacy'));
const TermsAndConditions = lazy(() => import('./pages/legal/Terms'));
const CookiesPolicy = lazy(() => import('./pages/legal/Cookies'));

const IndustriesIndex = lazy(() => import('./pages/industries/IndustriesIndex'));
const IndustryPage = lazy(() => import('./pages/industries/IndustryPage').then((m) => ({ default: m.IndustryPage || m.default })));
const LocationPage = lazy(() => import('./pages/locations/LocationPage'));
const LocationsIndex = lazy(() => import('./pages/locations/LocationsIndex'));
const GlobalPage = lazy(() => import('./pages/locations/GlobalPage'));
const Glossary = lazy(() => import('./pages/Glossary'));
const IndustryServicePage = lazy(() => import('./pages/services/IndustryServicePage'));

const ServicesOverview = lazy(() => import('./pages/services/ServicesOverview').then((m) => ({ default: m.ServicesOverview || m.default })));
const ServiceCityPage = lazy(() => import('./pages/services/ServiceCityPage'));
const SERVICE_PAGES: Record<string, ReturnType<typeof lazy>> = {
  'web-development': lazy(() => import('./pages/services/WebDevelopment')),
  'mobile-app-development': lazy(() => import('./pages/services/MobileAppDevelopment')),
  'ecommerce-development': lazy(() => import('./pages/services/EcommerceDevelopment')),
  'ui-ux-design': lazy(() => import('./pages/services/UiUxDesign')),
  'digital-marketing': lazy(() => import('./pages/services/DigitalMarketing')),
  'social-media-marketing': lazy(() => import('./pages/services/SocialMediaMarketing')),
  seo: lazy(() => import('./pages/services/SEO')),
  'geo-aeo': lazy(() => import('./pages/services/GeoAeo')),
  'performance-marketing': lazy(() => import('./pages/services/PerformanceMarketing')),
  branding: lazy(() => import('./pages/services/Branding')),
  'content-marketing': lazy(() => import('./pages/services/ContentMarketing')),
  'video-creative-production': lazy(() => import('./pages/services/VideoProduction')),
  'email-marketing': lazy(() => import('./pages/services/EmailMarketing')),
  'marketing-automation': lazy(() => import('./pages/services/MarketingAutomation')),
  'ai-automation': lazy(() => import('./pages/services/AiAutomation')),
  'chatbots-agents': lazy(() => import('./pages/services/ChatbotsAgents')),
  'cloud-devops': lazy(() => import('./pages/services/CloudDevops')),
};

/** Inertial smooth scrolling (disabled for reduced-motion users). */
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

const titleOf = (pathname: string) => {
  const seg = pathname.split('/').filter(Boolean).pop();
  if (!seg) return 'Home';
  return seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

/** Navy curtain carrying the logo mark; rises over the old page and lifts off the new one. */
function Curtain() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [run, setRun] = useState<string | null>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setRun(pathname);
  }, [pathname]);

  return (
    <AnimatePresence>
      {run && (
        <motion.div
          key={run}
          className="pointer-events-none fixed inset-0 z-[9500] grid place-items-center bg-brand-navy"
          initial={{ y: '100%' }}
          animate={{ y: ['100%', '0%', '0%', '-100%'] }}
          transition={{ duration: 1.05, times: [0, 0.4, 0.56, 1], ease: EASE }}
          onAnimationComplete={() => setRun(null)}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-5">
            <svg viewBox="0 0 117 107" className="h-12 w-auto">
              <path d={QEVNARO_NAVY_PATH} fill="#fff" />
              <path d={QEVNARO_CHEVRON_PATH} fill="#3175FE" />
            </svg>
            <span className="serif-accent text-4xl text-white sm:text-5xl">{titleOf(run)}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const RouteFallback = () => (
  <div className="grid min-h-[70vh] place-items-center" role="status" aria-label="Loading page">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-brand-blue" />
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        // The outgoing page simply holds while the curtain covers it.
        exit={{ opacity: 1, transition: { duration: 0.43 } }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/process" element={<Process />} />
            <Route path="/pricing" element={<Pricing />} />

            <Route path="/work" element={<Work />} />
            <Route path="/work/pulsencare" element={<PulseNCareCaseStudy />} />
            <Route path="/work/menusqr" element={<MenuSQRCaseStudy />} />

            <Route path="/services" element={<ServicesOverview />} />
            {Object.entries(SERVICE_PAGES).map(([slug, Page]) => (
              <Route key={slug} path={`/services/${slug}`} element={<Page />} />
            ))}
            <Route path="/services/:service/:city" element={<ServiceCityPage />} />
            <Route path="/services/:service/for/:industry" element={<IndustryServicePage />} />

            <Route path="/industries" element={<IndustriesIndex />} />
            <Route path="/industries/:slug" element={<IndustryPage />} />
            <Route path="/locations" element={<LocationsIndex />} />
            <Route path="/locations/:city" element={<LocationPage />} />
            <Route path="/global" element={<GlobalPage />} />
            <Route path="/global/:country" element={<GlobalPage />} />
            <Route path="/glossary" element={<Glossary />} />

            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightArticle />} />

            <Route path="/agents-at-work" element={<AgentsAtWork />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />

            {REDIRECTS.map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

/** The whole app without a router, so the browser and the build-time renderer can each supply their own. */
export function AppShell() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <ScrollProgress />
      <Curtain />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col bg-canvas font-sans text-fg">
        <Navbar />
        <main id="main" className="flex-grow">
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </main>
        <Footer />
        <CommandMenu />
        <Cursor />
        <LazyScene />
      </div>
    </MotionConfig>
  );
}

export default AppShell;
