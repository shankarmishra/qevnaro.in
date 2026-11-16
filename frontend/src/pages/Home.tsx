import React from 'react';
import { Hero } from '../components/Hero';
import { ProofStrip } from '../components/home/ProofStrip';
import { Manifesto } from '../components/home/Manifesto';
import { ServicesBento } from '../components/home/ServicesBento';
import { WorkGallery } from '../components/home/WorkGallery';
import { WhySection } from '../components/home/WhySection';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { InsightsSection } from '../components/home/InsightsSection';
import { FAQSection } from '../components/home/FAQSection';
import { FinalCTA } from '../components/home/FinalCTA';
import { SEO } from '../components/ui/SEO';
import { VelocityMarquee } from '../components/ui/Motion';
import { organizationSchema, websiteSchema } from '../lib/schema';

export const Home: React.FC = () => (
  <>
    <SEO
      title="Qevnaro | Web Development, Digital Marketing & AI Automation Agency in India"
      description="Qevnaro is a technology and digital growth agency in Noida and Bengaluru. We build websites and apps, run SEO, GEO and paid campaigns, and automate operations with AI."
      path="/"
      jsonLd={[organizationSchema(), websiteSchema()]}
    />
    <Hero />
    <ProofStrip />
    <VelocityMarquee
      items={['Websites', 'Mobile apps', 'E-commerce', 'SEO & GEO', 'Performance marketing', 'Branding', 'AI automation']}
      className="border-b border-line bg-canvas py-8 font-display text-[clamp(3rem,9vw,8.5rem)] font-medium leading-none tracking-[-0.045em] text-fg"
    />
    <Manifesto />
    <ServicesBento />
    <WorkGallery />
    <WhySection />
    <IndustriesSection />
    <ProcessSection />
    <InsightsSection />
    <FAQSection />
    <FinalCTA />
  </>
);

export default Home;
