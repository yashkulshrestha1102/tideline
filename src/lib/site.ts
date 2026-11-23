// ------------------------------------------------------------
// All website copy lives here — edit text without touching components.
// ------------------------------------------------------------

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; items: NavLink[] };

export const brand = {
  name: 'Raisedesk',
  company: 'Businezexcellence StartX LLP',
};

export const navGroups: NavGroup[] = [
  {
    label: 'The Platform',
    items: [
      { label: 'How it works', href: '/platform#how-it-works' },
      { label: 'AI matching', href: '/platform#ai-matching' },
      { label: 'Security', href: '/platform#security' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'For Founders',
    items: [
      { label: 'Overview', href: '/founders' },
      { label: 'Pitch room', href: '/founders#pitch-room' },
      { label: 'Data room', href: '/founders#data-room' },
      { label: 'Founder toolkit', href: '/founders#toolkit' },
    ],
  },
  {
    label: 'For Investors',
    items: [
      { label: 'Overview', href: '/investors' },
      { label: 'Curated deal flow', href: '/investors#deal-flow' },
      { label: 'Thesis matching', href: '/investors#thesis' },
      { label: 'Due diligence', href: '/investors#diligence' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Blog', href: '/insights' },
      { label: 'Funding reports', href: '/insights#reports' },
      { label: 'Success stories', href: '/insights#stories' },
      { label: 'About us', href: '/about' },
    ],
  },
];

export const footerGroups: NavGroup[] = [
  {
    label: 'Platform',
    items: [
      { label: 'How it works', href: '/platform' },
      { label: 'AI matching', href: '/platform#ai-matching' },
      { label: 'Security', href: '/platform#security' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { label: 'For founders', href: '/founders' },
      { label: 'For investors', href: '/investors' },
      { label: 'Get matched', href: '/get-matched' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Insights', href: '/insights' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Legal',
    items: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of use', href: '/terms' },
    ],
  },
];

export const hero = {
  eyebrow: 'Fundraising, reimagined',
  titleLine1: 'Capital finds',
  titleLine2Plain: 'its',
  titleLine2Italic: 'direction',
  subtitle: 'Connect ambitious founders with aligned investors through the power of AI.',
  primaryCta: { label: 'Find your match', href: '/get-matched' },
  secondaryCta: { label: 'Explore the process', href: '#journey' },
  investorFit: 94,
};

export const stats = [
  { icon: 'founders', value: 1200, suffix: '+', label: 'founders' },
  { icon: 'handshake', value: 480, suffix: '+', label: 'investor profiles' },
  { icon: 'globe', value: 32, suffix: '', label: 'markets' },
] as const;

export const journey = {
  eyebrow: 'Our Journey',
  titleParts: ['A clearer path from ', 'idea', ' to ', 'investment'],
  steps: [
    { icon: 'bulb', title: 'Define', text: ['Share your vision and', 'build your founder profile.'] },
    { icon: 'search', title: 'Discover', text: ['Let our AI find the most', 'relevant investors for you.'] },
    { icon: 'people', title: 'Connect', text: ['Engage with aligned', 'investors securely.'] },
    { icon: 'growth', title: 'Grow', text: ['Track progress and', 'unlock new opportunities.'] },
  ],
} as const;

// ---------------- Step 2 ----------------

export const marqueeRows = [
  {
    direction: 'left',
    variant: 'solid',
    items: ['AI matching', 'Warm introductions', 'Pitch rooms', 'Data rooms', 'Due diligence'],
  },
  {
    direction: 'right',
    variant: 'outline',
    items: ['Founders', 'Angel investors', 'Venture funds', 'Family offices', 'Corporate VCs'],
  },
] as const;

export const statement = {
  eyebrow: 'Why Raisedesk',
  // Words wrapped in *asterisks* get the sea-green accent
  text: 'Most founders spend months chasing investors who were never a fit. Raisedesk reads your company the way an investor would — and points you to the *capital* *already* *looking* *for* *you.*',
};

export const aiMatching = {
  eyebrow: 'AI Matching',
  // *word* = italic sea-green
  title: 'A match score you can *actually* *read.*',
  text: 'No black box. Every recommendation breaks down into the factors investors care about, so you know exactly why a fund fits — and what to sharpen before you pitch.',
  points: [
    'Thesis-level matching, not keyword filters',
    'ESG and impact goals weighted into every score',
    'Scores refresh automatically as your metrics grow',
    'Warm, double opt-in introductions — never cold emails',
  ],
  cta: { label: 'See your matches', href: '/get-matched' },
  sample: {
    initial: 'B',
    name: 'Blue Harbour Ventures',
    meta: 'Seed – Series A · Climate, Fintech',
    score: 91,
    factors: [
      { label: 'Stage fit', value: 96 },
      { label: 'Sector thesis', value: 92 },
      { label: 'Ticket size', value: 88 },
      { label: 'Geography', value: 85 },
      { label: 'ESG alignment', value: 84 },
    ],
    why: 'They led two climate-fintech seed rounds this year and prefer founder-led B2B models with early revenue.',
  },
  chips: ['Thesis match', 'ESG aligned', 'Intro ready'],
};

// ---------------- Step 3: rest of the home page ----------------

export const audience = {
  eyebrow: 'Built for both sides',
  title: 'One platform. *Two* *sides* of every round.',
  founders: {
    tag: 'For founders',
    title: 'Spend your weeks building, *not* *chasing.*',
    text: 'One profile replaces a hundred cold emails. Get a ranked shortlist, warm intros and a pitch room that tells you what landed.',
    points: ['Ranked investor shortlist in 24 hours', 'Warm, double opt-in introductions', 'Pitch room with slide-level analytics'],
    cta: { label: 'Start as a founder', href: '/founders' },
  },
  investors: {
    tag: 'For investors',
    title: 'Deal flow that already *fits* *your* *thesis.*',
    text: 'Pre-screened startups scored against your stage, sector and ticket size — with diligence-ready data rooms from day one.',
    points: ['Thesis-matched startups, not noise', 'Structured, comparable company profiles', 'Diligence tracking in one place'],
    cta: { label: 'Join as an investor', href: '/investors' },
  },
};

export const toolkit = {
  eyebrow: 'The founder toolkit',
  title: 'Everything the raise needs, *nothing* *it* *doesn’t.*',
  text: 'Scroll sideways through the tools built into every Raisedesk workspace.',
  items: [
    { icon: 'video', title: 'Virtual pitch room', text: 'Interactive slides, live Q&A and page-by-page engagement analytics after every session.', tone: 'dark' },
    { icon: 'lock', title: 'Secure data room', text: 'Permissioned documents with watermarking, access logs and a real-time diligence checklist.', tone: 'light' },
    { icon: 'calc', title: 'Valuation calculator', text: 'Benchmark your pre-money against comparable rounds before the first call.', tone: 'light' },
    { icon: 'drop', title: 'Burn-rate analyzer', text: 'Runway, unit economics and the exact month you need the round to close.', tone: 'teal' },
    { icon: 'layers', title: 'Scenario planner', text: 'Model dilution, hiring plans and growth curves across best, base and worst cases.', tone: 'light' },
    { icon: 'leaf', title: 'Impact & ESG tracker', text: 'Report the sustainability metrics investors increasingly ask for.', tone: 'dark' },
  ],
} as const;

export const stories = {
  eyebrow: 'Success stories',
  title: 'Rounds that found their *direction.*',
  // Replace these with real, approved quotes from your founders and investors.
  items: [
    { quote: '[Add a real quote from your first funded founder here.]', name: '[Founder name]', role: '[Role, Company]', result: '[Amount raised]' },
    { quote: '[Add a quote about how fast the matching worked.]', name: '[Founder name]', role: '[Role, Company]', result: '[Time to close]' },
    { quote: '[Add a quote from an investor about deal-flow quality.]', name: '[Investor name]', role: '[Partner, Fund]', result: '[Deals reviewed]' },
    { quote: '[Add a quote about the pitch room or data room.]', name: '[Founder name]', role: '[Role, Company]', result: '[Outcome]' },
  ],
};

export const faq = {
  eyebrow: 'Questions',
  title: 'Before you *dive* *in.*',
  items: [
    { q: 'How does the AI decide which investors fit me?', a: 'It compares your profile — stage, sector, traction, round size, geography and impact goals — against each investor’s stated thesis and past deals, then shows the score and the reasons behind it.' },
    { q: 'How quickly will I see my first matches?', a: 'Most founders see a ranked shortlist within a day of completing their profile. Scores update automatically as you add metrics.' },
    { q: 'Are introductions really warm?', a: 'Yes. Investors opt in after seeing your summary, so every introduction starts with mutual interest rather than a cold email.' },
    { q: 'Is my data room secure?', a: 'Documents are permission-based, watermarked and access is logged. You can revoke any investor’s access at any time.' },
    { q: 'What does it cost?', a: 'Founders can start free. Paid plans unlock unlimited introductions, the pitch room and advanced analytics — see the Pricing page for details.' },
  ],
};

export const ctaBand = {
  title: 'Let the right capital *find* *you.*',
  text: 'Build your profile in about 15 minutes. Your first matches arrive the next day.',
  primary: { label: 'Get matched free', href: '/get-matched' },
  secondary: { label: 'Talk to our team', href: '/contact' },
};

// ---------------- Effects ----------------
export const effects = {
  waterRipple: true, // water ripple under the cursor — always on
  waterRippleStyle: 'realistic' as 'realistic' | 'rings', // 'realistic' = WebGL water, 'rings' = simple circles
  designerCursor: true, // dot + gliding circle cursor (desktop only)
};
