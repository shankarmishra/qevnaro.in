import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info, X } from 'lucide-react';
import { AgentsSwarmEngine } from '../components/agents-at-work/AgentsSwarmEngine';
import { Eyebrow } from '../components/ui/Reveal';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SEO } from '../components/ui/SEO';

/**
 * A page that assembles itself block by block, as a demonstration of how a multi-agent
 * pipeline divides work. The animation is scripted; the copy describes what such systems
 * genuinely do and where they fall short, with no performance figures.
 */
const AGENT_CARDS = [
  {
    name: 'Orchestrator',
    role: 'Plans the work',
    desc: 'Breaks a brief into smaller tasks, decides the order, and hands each one to the agent best suited to it.',
    use: 'Used for multi-step jobs such as onboarding a lead or preparing a report',
    code: '<Orchestrator />',
    agent: 'Agent Apex',
  },
  {
    name: 'Knowledge assistant',
    role: 'Answers from your documents',
    desc: 'Searches your own PDFs, policies and product data, then answers with that material as the source instead of guessing.',
    use: 'Used for support desks, internal help and sales enablement',
    code: '<KnowledgeAssistant source="your-docs" />',
    agent: 'Vector RAG',
  },
  {
    name: 'Content assistant',
    role: 'Drafts and adapts copy',
    desc: 'Produces first drafts of ads, emails and page copy in your tone, for a person to review, edit and approve.',
    use: 'Used for campaign variants, product descriptions and follow-up emails',
    code: '<ContentAssistant review="human" />',
    agent: 'CRO Engine',
  },
  {
    name: 'Operations monitor',
    role: 'Watches and alerts',
    desc: 'Keeps an eye on forms, queues, uptime and deployments, and raises an alert or runs an agreed fix when something breaks.',
    use: 'Used for lead routing, order status and deployment checks',
    code: '<OperationsMonitor alerts="on" />',
    agent: 'DevOps Sentinel',
  },
];

const GOOD = [
  'Repetitive, rules-based steps: routing leads, tagging tickets, filling CRM fields',
  'Answering common questions from documents you already have',
  'First drafts that a person then edits',
  'Watching for a condition and telling the right person quickly',
];
const NOT_GOOD = [
  'Decisions that need judgement, context or accountability',
  'Anything where a wrong answer is costly and nobody checks it',
  'Replacing a missing process: automation speeds up a process, it does not invent one',
  'Guaranteed accuracy. Outputs need review, especially at the start',
];

const LOG = [
  ['Orchestrator', 'Split the brief into tasks and assigned them.'],
  ['Knowledge assistant', 'Indexed the supplied documents for retrieval.'],
  ['Content assistant', 'Drafted the page copy and sent it for review.'],
  ['Operations monitor', 'Checked the build and reported it healthy.'],
];

export const AgentsAtWorkPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-canvas pb-24 pt-32 text-fg sm:pt-40">
      <SEO
        title="Agents at Work: How Multi-Agent AI Automation Divides the Work"
        description="A demonstration page that assembles itself block by block, showing how an orchestrator, a knowledge assistant, a content assistant and an operations monitor share a task, and what AI agents are and are not good at."
        path="/agents-at-work"
      />

      {/* Drives the block-by-block assembly animation */}
      <AgentsSwarmEngine containerRef={containerRef} autoPlay />

      <div className="container-x relative z-10">
        <Breadcrumbs items={[{ label: 'Agents at work' }]} />

        <div data-block data-code="<Headline />" data-log="typed the headline" data-agent="Neural Copy" className="max-w-4xl">
          <div className="fill">
            <Eyebrow>Lab · scripted demonstration</Eyebrow>
            <h1
              data-type="headline"
              data-text="A page that builds itself, the way agents share a job."
              className="t-h1 mt-5 text-fg"
            >
              A page that builds itself, the way agents share a job.
            </h1>
            <p className="t-lead mt-6 max-w-2xl text-fg-soft">
              Watch the blocks below arrive one at a time, each placed by a different agent. It is a staged
              animation, but the division of labour it shows is how we design real automation.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div data-block data-code="<SectionHeading />" data-log="placed the section heading" data-agent="Layout Synth" className="mb-8">
            <div className="fill flex items-end justify-between border-b border-line-strong pb-4">
              <h2 className="t-h2 text-fg">Four roles, one pipeline</h2>
              <span className="t-micro hidden text-fg-muted sm:block">Each block placed by one agent</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AGENT_CARDS.map((card, i) => (
              <div
                key={card.name}
                data-block
                data-code={card.code}
                data-log={`built the ${card.name.toLowerCase()} card`}
                data-agent={card.agent}
                className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-line bg-surface p-6"
              >
                <div className="fill">
                  <span className="serif-accent text-3xl leading-none text-brand-blue">{String(i + 1).padStart(2, '0')}</span>
                  <p className="t-micro mt-4 text-fg-muted">{card.role}</p>
                  <h3 className="t-h3 mt-2 text-fg">{card.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-soft">{card.desc}</p>
                </div>
                <p className="fill mt-6 border-t border-line pt-4 text-[13px] leading-snug text-fg-muted">{card.use}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          <div
            data-block
            data-code="<GoodAt />"
            data-log="listed what agents handle well"
            data-agent="Schema Core"
            className="rounded-[var(--radius-lg)] border border-line bg-surface p-7 sm:p-9"
          >
            <div className="fill">
              <h2 className="t-h3 text-fg">What agents are good at</h2>
              <ul className="mt-5 space-y-3.5">
                {GOOD.map((g) => (
                  <li key={g} className="flex gap-3 text-[15px] leading-snug text-fg-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            data-block
            data-code="<NotGoodAt />"
            data-log="listed the limits honestly"
            data-agent="Schema Core"
            className="rounded-[var(--radius-lg)] border border-line bg-surface p-7 sm:p-9"
          >
            <div className="fill">
              <h2 className="t-h3 text-fg">What they are not good at</h2>
              <ul className="mt-5 space-y-3.5">
                {NOT_GOOD.map((g) => (
                  <li key={g} className="flex gap-3 text-[15px] leading-snug text-fg-soft">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-bad" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div
            data-block
            data-code="<PipelineLog />"
            data-log="wrote the pipeline log"
            data-agent="Codex Engine"
            className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8"
          >
            <div className="fill">
              <div className="mb-4 flex items-center justify-between border-b border-line pb-4">
                <span className="t-micro text-fg">Pipeline log</span>
                <span className="flex items-center gap-1.5 text-[13px] text-fg-muted">
                  <Info className="h-3.5 w-3.5" /> Illustrative
                </span>
              </div>
              <ol className="space-y-2.5 font-mono text-[13px] leading-relaxed text-fg-soft">
                {LOG.map(([who, what], i) => (
                  <li key={who} className="flex flex-wrap gap-x-3 gap-y-0.5">
                    <span className="text-fg-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-medium text-brand-sky">{who}</span>
                    <span>{what}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div
            data-block
            data-code="<HandoverCTA />"
            data-log="handed over to a person"
            data-agent="Agent Apex"
            className="notch-tr bg-brand-navy p-8 text-white sm:p-14"
          >
            <div className="fill max-w-2xl">
              <p className="t-micro text-white/60">Handed over to a person</p>
              <h2 className="t-h1 mt-4 text-white">
                Want this kind of help in <span className="serif-accent">your</span> business?
              </h2>
              <p className="t-lead mt-5 text-white/75">
                We start with one workflow that costs your team time every week, automate it, and keep a
                person in the loop wherever a mistake would matter.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 text-[15px] font-medium text-brand-navy transition-colors hover:bg-canvas"
                >
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services/ai-automation"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/25 px-7 text-[15px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  AI automation services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsAtWorkPage;
