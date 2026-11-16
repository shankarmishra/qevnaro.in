

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ServiceDetailLayout, type ServicePageData } from '../../components/common/ServiceDetailLayout';

const DATA: ServicePageData = {
  badge: 'Category F · Conversational Systems',
  title: 'AI Chatbots & Conversational Systems That Never Sleep',
  subtitle: 'Deploy intelligent website and WhatsApp chatbots trained on your business data to answer inquiries, qualify leads, and book sales meetings 24 hours a day.',
  overview: [
    'Traditional rule-based chatbots with rigid button menus frustrate customers and fail whenever a user types an unexpected question. Conversely, unconstrained AI bots risk hallucinating incorrect prices or embarrassing the brand.',
    'At Qevnaro, we engineer reliable, grounded conversational systems. Our bots combine large language models with strict knowledge retrieval (RAG) and API tools — allowing them to understand natural language, check real-time database availability, qualify leads, and hand off seamlessly to human reps when necessary.'
  ],
  whyNeeded: {
    heading: 'Why Intelligent Conversational Bots Outperform Static Lead Forms',
    points: [
      { title: 'Zero Wait Times', desc: 'Engage website visitors and WhatsApp users within 1 second, when buying intent is at its highest point.' },
      { title: 'Interactive Lead Qualification', desc: 'Ask natural conversational questions to screen budget, timeline, and company size before booking calls.' },
      { title: '70%+ Ticket Deflection', desc: 'Automatically resolve repetitive tier-1 customer inquiries regarding hours, pricing, and common policies.' },
      { title: 'Omnichannel Deployment', desc: 'Deploy a single unified conversational brain across your web portal, mobile app, and WhatsApp Business API.' }
    ]
  },
  problemsSolved: [
    {
      title: 'Frustrating "I Don’t Understand" Menu Bots',
      problem: 'Old-fashioned decision-tree bots that break whenever a customer asks a question outside of pre-set options.',
      solution: 'Natural language semantic parsing powered by modern LLMs that understand typos, slang, and context.'
    },
    {
      title: 'Lost Leads Outside Business Hours',
      problem: 'Prospects browsing your website at 10 PM on a Saturday leave without converting because nobody is online.',
      solution: '24/7 AI agents that answer questions, capture contact details, and book calendar appointments in real time.'
    },
    {
      title: 'Support Agents Overwhelmed by FAQs',
      problem: 'Support teams spending half their workday answering the same repetitive questions over and over.',
      solution: 'RAG-grounded assistants answering standard queries instantly with direct links to relevant documentation.'
    }
  ],
  deliverables: [
    'Custom AI conversational chatbot widget designed to match your brand website',
    'Official WhatsApp Business API chatbot integration with multi-agent inbox handoff',
    'RAG vector knowledge base trained on your company FAQs, PDFs, and product catalogs',
    'CRM and calendar integration (HubSpot, Salesforce, Calendly, Google Calendar)',
    'Strict guardrails and prompt safety layers to eliminate hallucinations and off-topic chat',
    'Human-agent takeover dashboard allowing staff to intervene in live conversations seamlessly',
    'Monthly conversation analytics tracking resolution rate, lead captures, and sentiment'
  ],
  subServices: [
    { title: 'Website AI Chatbots', desc: 'Custom floating chat widgets embedded into your website or web application.' },
    { title: 'WhatsApp Business Bots', desc: 'Interactive conversational assistants operating inside official WhatsApp accounts.' },
    { title: 'Lead Qualification Bots', desc: 'Conversational screening flows that capture and score high-value business leads.' },
    { title: 'Customer Support Assistants', desc: 'Instant 24/7 resolution for common customer service and account inquiries.' },
    { title: 'Knowledge Base & RAG Bots', desc: 'Chatbots that cite specific paragraphs from your internal SOPs and manuals.' },
    { title: 'CRM & Calendar Bookers', desc: 'Directly checking sales rep calendar availability and scheduling meetings.' }
  ],
  methodology: [
    { step: '01', title: 'Knowledge Ingestion & Scope', desc: 'Collecting company documentation, FAQs, product catalogs, and defining bot boundaries.' },
    { step: '02', title: 'Personality & Prompt Guardrails', desc: 'Setting brand tone of voice, formatting rules, and strict negative constraints.' },
    { step: '03', title: 'Integration & API Tool Setup', desc: 'Connecting the bot to your CRM, calendar, email, and human escalation inbox.' },
    { step: '04', title: 'Adversarial Testing & Launch', desc: 'Stress-testing with edge-case and trick questions to ensure 100% reliable behavior.' }
  ],
  toolsAndTech: [
    { category: 'AI Inference Engines', items: ['OpenAI GPT-4o mini', 'Google Gemini 2.5 Flash', 'Claude 3.5 Haiku', 'Custom Local LLMs'] },
    { category: 'Chat Interfaces', items: ['Custom React Chat Widget', 'WhatsApp Cloud API', 'Slack / Teams Bots', 'Telegram API'] },
    { category: 'Integrations & Storage', items: ['Pinecone Vector DB', 'Calendly API', 'HubSpot CRM Webhooks', 'Zendesk / Intercom'] }
  ],
  whoNeedsThis: [
    'Companies receiving high volumes of inbound website visitors or WhatsApp inquiries.',
    'Healthcare clinics needing an automated appointment booking and clinic hours assistant.',
    'B2B SaaS companies wanting to qualify leads and book demos without manual rep emails.',
    'E-commerce brands answering sizing, shipping, and order tracking inquiries 24/7.'
  ],
  businessOutcomes: [
    { metric: '< 2s', label: 'Response Time', desc: 'Instantaneous conversational engagement eliminating lead drop-off.' },
    { metric: '70%+', label: 'Deflection Rate', desc: 'Standard support questions resolved without human agent intervention.' },
    { metric: 'Zero', label: 'Hallucinations', desc: 'Strict negative constraints ensuring the bot only cites verified knowledge.' }
  ],
  relatedCaseStudies: [
    { title: 'MenusQR Instant Dining Support Engine', desc: 'Automated table-side dining assistant answering ingredient and order queries.', href: '/case-studies/menusqr', tag: 'Conversational POS' }
  ],
  relatedServices: [
    { title: 'AI Business Automation', desc: 'Extending conversational bots into full back-office automated workflows.', href: '/services/ai-automation' },
    { title: 'Email & WhatsApp Marketing', desc: 'Combining conversational chat with automated marketing nurture sequences.', href: '/services/email-marketing' },
    { title: 'Web Development', desc: 'Embedding lightweight, responsive chat widgets into your website.', href: '/services/web-development' }
  ],
  faqs: [
    { q: 'Can a human staff member take over the conversation from the AI bot?', a: 'Yes. Every chatbot system we deploy includes a human-escalation protocol. If a customer asks to speak with a human, or if the AI detects complex sentiment or a request outside its knowledge base, it notifies your team via email, Slack, or your CRM inbox so a live agent can step in immediately.' },
    { q: 'Can the chatbot book appointments directly onto our team’s calendar?', a: 'Yes. We integrate directly with calendar tools like Calendly, Google Calendar, or Microsoft Outlook. The bot checks live availability in real time, offers available time slots in chat, and confirms the meeting directly without requiring external links.' },
    { q: 'How difficult is it to update the bot’s knowledge when our policies or prices change?', a: 'Very easy. We build an administrative management interface or sync the bot directly with a Google Sheet, Notion database, or knowledge folder. Whenever you update text in your document, the bot’s knowledge base updates automatically within minutes.' }
  ],
  icon: MessageSquare
};




export const ChatbotsAgents: React.FC = () => <ServiceDetailLayout data={DATA} />;

export default ChatbotsAgents;
