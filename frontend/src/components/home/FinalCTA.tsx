import React from 'react';
import { Button } from '../ui/Button';
import { Magnetic } from '../ui/Magnetic';
import { Eyebrow, Reveal, SplitHeading } from '../ui/Reveal';
import { ShaderField } from '../ui/ShaderField';
import { QEVNARO_CHEVRON_PATH, QEVNARO_NAVY_PATH } from '../common/QevnaroLogo';
import { site, whatsappLink } from '../../lib/site';

/** Closing call to action: navy flowing field, the logo mark, and oversized type. */
export const FinalCTA: React.FC<{ heading?: string; accent?: string; body?: string }> = ({
  heading = "Have a goal in mind? Let's make it happen.",
  accent = 'happen.',
  body = "Tell us what you're building, what you're trying to improve and where you want to go next.",
}) => {
  const wa = whatsappLink();
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white" aria-labelledby="cta-heading">
      <ShaderField tone="dark" className="-z-10" />
      <svg
        viewBox="0 0 117 107"
        className="pointer-events-none absolute -right-[6%] top-1/2 -z-10 h-[140%] w-auto -translate-y-1/2 opacity-[0.08]"
        aria-hidden="true"
      >
        <path d={QEVNARO_NAVY_PATH} fill="#fff" />
        <path d={QEVNARO_CHEVRON_PATH} fill="#fff" />
      </svg>

      <div className="container-x relative py-28 sm:py-36 lg:py-44">
        <Reveal><Eyebrow tone="light">Let&apos;s talk</Eyebrow></Reveal>
        <SplitHeading as="h2" text={heading} accent={accent} className="t-display mt-6 max-w-5xl text-white" />
        <span id="cta-heading" className="sr-only">Start a project with Qevnaro</span>
        <Reveal delay={0.15}>
          <p className="t-lead mt-7 max-w-xl text-white/75">{body}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <Button to="/contact" variant="light" size="lg" className="w-full sm:w-auto">Start your project</Button>
            </Magnetic>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/25 px-7 text-[15px] font-medium text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
              >
                Message us on WhatsApp
              </a>
            )}
          </div>
          {site.email && (
            <p className="mt-8 text-sm text-white/60">
              Or write to{' '}
              <a href={`mailto:${site.email}`} className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {site.email}
              </a>
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
