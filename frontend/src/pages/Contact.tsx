import React, { useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/ui/SEO';
import { SERVICE_GROUPS, SERVICE_SHORT } from '../data/services';
import { organizationSchema } from '../lib/schema';
import { offices, site, whatsappLink } from '../lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'mt-2 w-full rounded-[var(--radius-sm)] border border-line-strong bg-surface px-4 py-3 text-[15px] text-fg outline-none transition-colors placeholder:text-fg-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';
const label = 'block text-[13px] font-medium text-fg';

const STEPS = [
  { title: 'You tell us the goal', desc: 'A few lines on what you are building or trying to improve is enough to start.' },
  { title: 'We ask a few questions', desc: 'A short call or chat to understand your business, audience, timeline and constraints.' },
  { title: 'You get a written proposal', desc: 'Scope, approach, timeline and cost, in plain language.' },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const wa = whatsappLink();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return; // honeypot

    // With a form endpoint configured, post to it. Otherwise open the visitor's email app
    // with the enquiry filled in, so nothing is silently dropped.
    if (!site.formEndpoint) {
      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone && `Phone: ${data.phone}`,
        data.company && `Company: ${data.company}`,
        data.service && `Interested in: ${data.service}`,
        '',
        data.message,
      ]
        .filter((l): l is string => typeof l === 'string')
        .join('\n');
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry from ${data.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-canvas text-fg">
      <SEO
        title="Contact Qevnaro: Start a Project in Noida or Bengaluru"
        description="Tell Qevnaro about your website, app, marketing or automation project. Reach us by form, WhatsApp, phone or email. Offices in Noida Sector 62 and Bengaluru HSR Layout."
        path="/contact"
        jsonLd={[{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Qevnaro', url: `${site.url}/contact` }, organizationSchema()]}
      />

      <PageHero
        layout="center"
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Contact"
        title="Tell us what you're building."
        accent="building."
        lead="Use the form, or message us directly on WhatsApp if that is quicker. Either way, a person who can actually scope the work reads it."
      />

      <section className="section-y border-b border-line bg-surface">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            {status === 'sent' ? (
              <div className="rounded-[var(--radius-lg)] border border-line bg-canvas p-10" role="status">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-navy text-white">
                  <Check className="h-5 w-5" />
                </span>
                <h2 className="t-h2 mt-6 text-fg">
                  {site.formEndpoint ? 'Thank you. Your enquiry is with us.' : 'Your email app should now be open.'}
                </h2>
                <p className="t-lead mt-4 text-fg-soft">
                  {site.formEndpoint
                    ? 'We will read it and reply by email.'
                    : `Send the prepared message and we will reply by email. If nothing opened, write to ${site.email} directly.`}
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="link-underline mt-8 text-[15px] font-medium text-brand-sky">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate={false} aria-labelledby="form-title">
                <h2 id="form-title" className="t-h2 text-fg">Project enquiry</h2>
                <p className="mt-3 text-[15px] text-fg-soft">Fields marked * are required.</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <label className={label}>
                    Your name *
                    <input name="name" required autoComplete="name" className={field} />
                  </label>
                  <label className={label}>
                    Work email *
                    <input name="email" type="email" required autoComplete="email" className={field} />
                  </label>
                  <label className={label}>
                    Phone or WhatsApp
                    <input name="phone" type="tel" autoComplete="tel" className={field} />
                  </label>
                  <label className={label}>
                    Company
                    <input name="company" autoComplete="organization" className={field} />
                  </label>
                  <label className={`${label} sm:col-span-2`}>
                    What do you need help with?
                    <select name="service" defaultValue="" className={field}>
                      <option value="">Not sure yet</option>
                      {SERVICE_GROUPS.map((g) => (
                        <optgroup key={g.key} label={g.key}>
                          {g.services.map((s) => (
                            <option key={s.slug} value={SERVICE_SHORT[s.slug] ?? s.title}>{SERVICE_SHORT[s.slug] ?? s.title}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </label>
                  <label className={`${label} sm:col-span-2`}>
                    About the project *
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="What are you building or trying to improve? Any deadline or budget range we should know about?"
                      className={field}
                    />
                  </label>
                  {/* Honeypot: hidden from people, tempting to bots */}
                  <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                </div>

                {status === 'error' && (
                  <p role="alert" className="mt-5 text-[15px] text-bad">
                    That did not send. Please try again, or write to {site.email}.
                  </p>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button type="submit" size="lg" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending' : 'Send enquiry'}
                  </Button>
                  <p className="text-[13px] text-fg-muted">
                    By sending this you agree to our <Link to="/privacy-policy" className="underline underline-offset-2">privacy policy</Link>.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Direct channels */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="t-micro text-fg-muted">Or reach us directly</p>
              <ul className="mt-4 border-t border-line-strong">
                {wa && (
                  <li className="border-b border-line">
                    <a href={wa} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-5">
                      <MessageCircle className="h-5 w-5 text-brand-blue" />
                      <span className="flex-1">
                        <span className="block text-[17px] font-medium text-fg">WhatsApp</span>
                        <span className="text-sm text-fg-muted">Opens a chat with our team</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-fg-muted group-hover:text-brand-blue" />
                    </a>
                  </li>
                )}
                {site.phone && (
                  <li className="border-b border-line">
                    <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="group flex items-center gap-4 py-5">
                      <Phone className="h-5 w-5 text-brand-blue" />
                      <span className="flex-1">
                        <span className="block text-[17px] font-medium text-fg">{site.phone}</span>
                        <span className="text-sm text-fg-muted">Monday to Saturday, 9 am to 9 pm IST</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-fg-muted group-hover:text-brand-blue" />
                    </a>
                  </li>
                )}
                {site.email && (
                  <li className="border-b border-line">
                    <a href={`mailto:${site.email}`} className="group flex items-center gap-4 py-5">
                      <Mail className="h-5 w-5 text-brand-blue" />
                      <span className="flex-1">
                        <span className="block text-[17px] font-medium text-fg">{site.email}</span>
                        <span className="text-sm text-fg-muted">Briefs, RFPs and documents</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-fg-muted group-hover:text-brand-blue" />
                    </a>
                  </li>
                )}
              </ul>

              <p className="t-micro mt-10 text-fg-muted">Offices</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {offices.map((o) => (
                  <li key={o.slug}>
                    <Link to={`/locations/${o.slug}`} className="group flex items-start gap-4 rounded-[var(--radius-md)] border border-line bg-canvas p-5 transition-colors hover:border-line-strong">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                      <span>
                        <span className="block text-[17px] font-medium text-fg">{o.city}</span>
                        <span className="text-sm text-fg-muted">{o.locality}, {o.region} {o.postalCode}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-y bg-canvas">
        <div className="container-x">
          <p className="t-micro text-fg-muted">What happens next</p>
          <ol className="mt-6 grid gap-x-10 border-t border-line-strong md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.07} className="border-b border-line py-8 md:border-b-0">
                  <span className="serif-accent text-4xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3 mt-4 text-fg">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{s.desc}</p>
                </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
