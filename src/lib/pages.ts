// ------------------------------------------------------------
// Copy for the inner pages. Edit text here.
// *word* = italic sea-green accent in headings.
// ------------------------------------------------------------
import type { FeatureRow } from '@/components/page/FeatureRows';
import type { GridItem } from '@/components/page/FeatureGrid';
import type { TimelineStep } from '@/components/page/Timeline';
import type { NumberItem } from '@/components/page/NumberBand';

/* ===================== PLATFORM ===================== */
export const platformPage = {
  hero: {
    crumb: 'The Platform',
    eyebrow: 'The Platform',
    title: 'Fundraising, *engineered* for clarity.',
    text: 'From your first profile to a signed term sheet, every step of the raise lives in one calm, intelligent workspace.',
    primary: { label: 'Get matched', href: '/get-matched' },
    secondary: { label: 'See pricing', href: '/pricing' },
  },
  timeline: {
    eyebrow: 'How it works',
    title: 'Six steps from *idea* to *investment.*',
    text: 'A typical round on Tideline moves from profile to close in about six weeks.',
    steps: [
      { icon: 'bulb', tag: 'Day 1', title: 'Build your profile', text: 'A guided wizard captures your vision, traction, metrics and round — no deck needed to start.' },
      { icon: 'search', tag: 'Day 2', title: 'Get your shortlist', text: 'Our AI scores every investor on stage, sector, ticket size, geography and ESG fit.' },
      { icon: 'handshake', tag: 'Week 1–2', title: 'Warm introductions', text: 'Investors opt in after reading your summary, so every intro starts with mutual interest.' },
      { icon: 'video', tag: 'Week 3–4', title: 'Pitch with insight', text: 'Run live sessions in the pitch room and see which slides held attention.' },
      { icon: 'lock', tag: 'Week 4–5', title: 'Diligence, organised', text: 'Share a permissioned data room and track every request in one checklist.' },
      { icon: 'rocket', tag: 'Week 5–6', title: 'Close & grow', text: 'Sign, close and keep investors updated with built-in reporting.' },
    ] satisfies TimelineStep[],
  },
  rows: [
    {
      id: 'ai-matching',
      eyebrow: 'AI matching',
      title: 'Scores you can *read*, not just trust.',
      text: 'Every match comes with a transparent breakdown, so you know why an investor fits and what to sharpen before you pitch.',
      bullets: ['Thesis-level matching, not keyword filters', 'Five weighted fit factors', 'Scores refresh as your metrics grow'],
      visual: 'score',
    },
    {
      id: 'security',
      eyebrow: 'Security',
      title: 'Built like a *vault*, feels like a *workspace.*',
      text: 'Your documents and data are protected at every step, with full control over who sees what and when.',
      bullets: ['Encryption in transit and at rest', 'Granular, revocable access', 'Watermarking and complete audit trails'],
      visual: 'shield',
    },
  ] satisfies FeatureRow[],
  faq: [
    { q: 'Who can join Tideline?', a: 'Founders raising from pre-seed to Series A, and investors — angels, funds, family offices and corporate VCs — who want curated, thesis-matched deal flow.' },
    { q: 'How is my data used for matching?', a: 'Only to compute fit scores and show you relevant investors. You control what investors can see before and after an introduction.' },
    { q: 'Can I use Tideline alongside my own network?', a: 'Yes. You can add investors you already know and track every conversation in one pipeline.' },
  ],
};

/* ===================== FOUNDERS ===================== */
export const foundersPage = {
  hero: {
    crumb: 'For Founders',
    eyebrow: 'For Founders',
    title: 'Raise with *focus*, not friction.',
    text: 'One profile, a ranked list of aligned investors, and the tools to pitch, share and close — all in one place.',
    primary: { label: 'Start free', href: '/get-matched' },
    secondary: { label: 'How it works', href: '/platform#how-it-works' },
  },
  rows: [
    {
      id: 'founder-profile',
      eyebrow: 'Your profile',
      title: 'Tell your story *once.*',
      text: 'A guided profile turns your vision and metrics into an investor-ready summary that powers every match.',
      bullets: ['Guided questions, no deck required', 'Profile strength score with tips', 'Auto-generated one-page summary'],
      visual: 'profile',
    },
    {
      id: 'pitch-room',
      eyebrow: 'Pitch room',
      title: 'Know which slides *landed.*',
      text: 'Present live or share asynchronously, answer questions in context and see engagement slide by slide.',
      bullets: ['Live sessions with Q&A', 'Slide-level attention analytics', 'Shareable, trackable deck links'],
      visual: 'pitch',
    },
    {
      id: 'data-room',
      eyebrow: 'Data room',
      title: 'Diligence without the *chaos.*',
      text: 'A permissioned data room with a live checklist, so investors find what they need and you see what they viewed.',
      bullets: ['Folder-level permissions', 'View tracking per investor', 'Request checklist with status'],
      visual: 'data',
    },
  ] satisfies FeatureRow[],
  toolkit: {
    eyebrow: 'Founder toolkit',
    title: 'Plan the raise like a *CFO.*',
    text: 'Financial tools built into every workspace.',
    items: [
      { icon: 'calc', title: 'Valuation calculator', text: 'Benchmark your pre-money against comparable rounds.' },
      { icon: 'drop', title: 'Burn-rate analyzer', text: 'Runway, burn and the month your round must close.' },
      { icon: 'layers', title: 'Scenario planner', text: 'Model dilution and hiring across best, base and worst cases.' },
      { icon: 'chart', title: 'Unit economics', text: 'CAC, LTV and payback in one clean view.' },
      { icon: 'leaf', title: 'ESG tracker', text: 'Report the impact metrics investors ask for.' },
      { icon: 'doc', title: 'Investor updates', text: 'Send polished monthly updates in minutes.' },
    ] satisfies GridItem[],
  },
  faq: [
    { q: 'Do I need a pitch deck to start?', a: 'No. The guided profile is enough to generate your first matches. You can add a deck any time.' },
    { q: 'Which stages do you support?', a: 'Pre-seed, seed and Series A rounds across most sectors.' },
    { q: 'Can investors see my profile without permission?', a: 'Investors see a short summary only. Full details and documents are shared after you accept an introduction.' },
  ],
};

/* ===================== INVESTORS ===================== */
export const investorsPage = {
  hero: {
    crumb: 'For Investors',
    eyebrow: 'For Investors',
    title: 'Deal flow, *distilled* to your thesis.',
    text: 'Pre-screened startups scored against what you actually invest in — with structured data and diligence-ready rooms.',
    primary: { label: 'Join as an investor', href: '/get-matched' },
    secondary: { label: 'Talk to our team', href: '/contact' },
  },
  rows: [
    {
      id: 'deal-flow',
      eyebrow: 'Curated deal flow',
      title: 'Only the companies that *fit.*',
      text: 'A daily shortlist of startups ranked by fit, so your team spends time on conversations, not filtering.',
      bullets: ['Ranked by thesis fit', 'Structured, comparable profiles', 'Save, share and assign to partners'],
      visual: 'deals',
    },
    {
      id: 'thesis',
      eyebrow: 'Thesis matching',
      title: 'Teach the AI how *you* invest.',
      text: 'Set stage, sectors, ticket size and geography once. Matching sharpens with every pass and every deal you back.',
      bullets: ['Multi-fund and multi-partner theses', 'Impact and ESG preferences', 'Learns from your decisions'],
      visual: 'thesis',
    },
    {
      id: 'diligence',
      eyebrow: 'Due diligence',
      title: 'Diligence in *one* *place.*',
      text: 'Request documents, track responses and collaborate with your team inside each company’s data room.',
      bullets: ['Request lists with status', 'Team notes and ratings', 'Exportable diligence reports'],
      visual: 'data',
    },
  ] satisfies FeatureRow[],
  benefits: {
    eyebrow: 'Why investors use Tideline',
    title: 'Less noise. *Better* *signal.*',
    items: [
      { icon: 'filter', title: 'Pre-screened', text: 'Every company completes a structured profile before it reaches you.' },
      { icon: 'target', title: 'Thesis-first', text: 'Matches reflect your mandate, not a keyword search.' },
      { icon: 'users', title: 'Team workflows', text: 'Assign deals, leave notes and keep partners aligned.' },
      { icon: 'eye', title: 'Full visibility', text: 'Metrics, documents and history in one view.' },
      { icon: 'shield', title: 'Confidential', text: 'Granular access and audit trails on every room.' },
      { icon: 'globe', title: 'Global reach', text: 'Discover companies across markets you invest in.' },
    ] satisfies GridItem[],
  },
};

/* ===================== INSIGHTS ===================== */
export const insightsPage = {
  hero: {
    crumb: 'Insights',
    eyebrow: 'Insights',
    title: 'Notes from the *tideline.*',
    text: 'Guides, data and stories on raising capital — written for founders and investors.',
  },
  categories: ['All', 'Fundraising', 'Investors', 'Finance', 'ESG'],
  // Sample article cards — replace with your real posts (or connect a CMS later).
  articles: [
    { cat: 'Fundraising', title: 'How to build a seed-round investor list that actually converts', mins: 8, featured: true },
    { cat: 'Finance', title: 'Runway math: when to start raising your next round', mins: 6 },
    { cat: 'Investors', title: 'What investors look for in a first meeting', mins: 5 },
    { cat: 'ESG', title: 'Impact metrics early-stage startups can track from day one', mins: 7 },
    { cat: 'Fundraising', title: 'Warm intros vs cold outreach: making every contact count', mins: 4 },
    { cat: 'Finance', title: 'A founder’s guide to dilution and the cap table', mins: 9 },
  ],
  reports: [
    { title: 'Seed funding report', period: '[Quarter, Year]', text: 'Round sizes, valuations and sector trends across early-stage deals.' },
    { title: 'Investor appetite index', period: '[Quarter, Year]', text: 'Which sectors and stages investors are prioritising right now.' },
    { title: 'Climate & impact capital', period: '[Year]', text: 'How ESG-focused capital is being deployed at the early stage.' },
  ],
};

/* ===================== PRICING ===================== */
export const pricingPage = {
  hero: {
    crumb: 'Pricing',
    eyebrow: 'Pricing',
    title: 'Simple plans, *serious* results.',
    text: 'Start free and upgrade when your round is in motion. Replace the bracketed prices with your final pricing.',
  },
  founders: [
    {
      name: 'Starter',
      monthly: 'Free',
      yearly: 'Free',
      note: 'For exploring your options',
      features: ['Founder profile', 'Top 10 investor matches', '3 introductions per month', 'Basic data room'],
      cta: 'Start free',
    },
    {
      name: 'Growth',
      monthly: '[₹X,XXX]',
      yearly: '[₹X,XXX]',
      note: 'For founders actively raising',
      features: ['Unlimited matches', 'Unlimited introductions', 'Pitch room with analytics', 'Full data room', 'Founder toolkit'],
      cta: 'Choose Growth',
      popular: true,
    },
    {
      name: 'Scale',
      monthly: '[₹XX,XXX]',
      yearly: '[₹XX,XXX]',
      note: 'For larger rounds and teams',
      features: ['Everything in Growth', 'Team seats', 'Priority matching', 'Dedicated raise advisor'],
      cta: 'Choose Scale',
    },
  ],
  investors: [
    {
      name: 'Angel',
      monthly: '[₹X,XXX]',
      yearly: '[₹X,XXX]',
      note: 'For individual investors',
      features: ['Thesis matching', 'Daily curated deal flow', 'Data room access', 'Saved lists'],
      cta: 'Choose Angel',
    },
    {
      name: 'Fund',
      monthly: 'Custom',
      yearly: 'Custom',
      note: 'For funds and family offices',
      features: ['Multiple theses', 'Partner seats & workflows', 'Diligence tracking', 'Exportable reports', 'API access'],
      cta: 'Talk to sales',
      popular: true,
    },
  ],
  faq: [
    { q: 'Can I change plans later?', a: 'Yes, you can upgrade or downgrade at any time. Changes apply from your next billing cycle.' },
    { q: 'Do you take a success fee?', a: '[State your policy here — for example, no success fees on any plan.]' },
    { q: 'Is there a discount for yearly billing?', a: '[State your yearly discount here.]' },
  ],
};

/* ===================== ABOUT ===================== */
export const aboutPage = {
  hero: {
    crumb: 'About',
    eyebrow: 'About Tideline',
    title: 'We help capital find its *direction.*',
    text: 'Tideline exists so great companies don’t stall for want of the right investor — and great investors don’t miss them.',
  },
  mission:
    'Fundraising is still built on who you know. We think it should be built on *fit* — on whether a founder and an investor truly belong in the same round. Tideline uses AI to make that fit *visible*, *explainable* and *fast.*',
  values: {
    eyebrow: 'What we believe',
    title: 'Principles that *guide* us.',
    items: [
      { icon: 'eye', title: 'Transparency', text: 'Every score is explainable. No black boxes.' },
      { icon: 'handshake', title: 'Mutual fit', text: 'Introductions only happen when both sides opt in.' },
      { icon: 'shield', title: 'Trust', text: 'Founder data is protected and always under their control.' },
      { icon: 'leaf', title: 'Long-term impact', text: 'We weight sustainability into how capital is matched.' },
    ] satisfies GridItem[],
  },
  numbers: [
    { value: 1200, suffix: '+', label: 'Founders on the platform' },
    { value: 480, suffix: '+', label: 'Investor profiles' },
    { value: 32, label: 'Markets' },
  ] satisfies NumberItem[],
  team: [
    { name: '[Founder name]', role: 'Co-founder & CEO' },
    { name: '[Founder name]', role: 'Co-founder & CTO' },
    { name: '[Team member]', role: 'Head of Investor Relations' },
    { name: '[Team member]', role: 'Head of Product' },
  ],
};

/* ===================== CONTACT ===================== */
export const contactPage = {
  hero: {
    crumb: 'Contact',
    eyebrow: 'Contact',
    title: 'Let’s *talk.*',
    text: 'Questions about the platform, partnerships or press? We usually reply within one business day.',
  },
  channels: [
    { icon: 'mail', label: 'Email', value: '[hello@yourdomain.com]' },
    { icon: 'phone', label: 'Phone', value: '[+91 XXXXX XXXXX]' },
    { icon: 'pin', label: 'Office', value: '[Your office address]' },
  ],
  topics: ['I’m a founder', 'I’m an investor', 'Partnerships', 'Press', 'Something else'],
};
