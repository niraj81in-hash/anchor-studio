import type { Service, PricingPlan } from '@/types';

export const SITE = {
  name:        'Anchor Studio',
  tagline:     'I create the content. You run the business.',
  heroTagline: 'Content strategy is just chess for your brand.',
  domain:      'https://www.getanchorstudio.com',
  email:       'hello@getanchorstudio.com',
  calendly:    process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/nirajshriva',
} as const;

export const FOUNDER = {
  name:    'Nivaan',
  title:   'Chess National Master',
  grade:   '',
  bio:     'I started Anchor Studio because I believe every small business deserves content that actually works. As a Chess National Master, I think in systems and sequences — it\'s how my brain works from competitive chess, and it\'s how I approach your content calendar. I use AI-accelerated workflows that let me deliver agency-quality work at solo-operator speed. I\'m building this one client at a time — founding clients get my lowest rates, locked in permanently, and direct access to me for everything.',
  chips: [
    '♛ Chess National Master',
    'AI-accelerated workflows',
    'Strategic content planning',
    'Direct founder access',
  ],
} as const;

export const SERVICES: Service[] = [
  { name: 'Content Package',          icon: '✍️', description: '4 blog posts + 12 social captions/month, written in your brand voice. Best for local professional services.' },
  { name: 'Chess Club Content',       icon: '♟',  description: 'Newsletters, tournament recaps, player spotlights, coaching content. Built specifically for chess clubs and academies.' },
  { name: 'SEO Blog Retainer',        icon: '📈', description: '8 keyword-optimized posts/month to rank on Google and drive organic leads. Includes monthly keyword strategy.' },
  { name: 'Email Sequence Buildout',  icon: '📧', description: 'Welcome, nurture, and sales sequences — written once, working forever.' },
];

export const PRICING: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$500/mo',
    features: [
      '4 blog posts/month',
      '8 social captions',
      'Monthly content calendar',
      'Cancel anytime',
    ],
  },
  {
    name: 'Growth',
    price: '$900/mo',
    popular: true,
    features: [
      '8 SEO blog posts/month',
      '20 social captions',
      'Monthly keyword strategy',
      'Priority 2-day turnaround',
      'Cancel anytime',
    ],
  },
  {
    name: 'Chess Club',
    price: '$400/mo',
    features: [
      'Monthly club newsletter',
      '4 tournament recap posts',
      'Player spotlight content',
      'Content calendar & scheduling',
      'Cancel anytime',
    ],
  },
];

export const NICHES = [
  { label: 'Chess Clubs & Academies',  note: 'Tournament recaps, newsletters, player spotlights. Built by a National Master who understands the community.', best: true },
  { label: 'Local Professional Services', note: 'Financial advisors, tutors, real estate agents, small firms. SEO content, email sequences, social presence.', best: true },
] as const;

export const HOW_IT_WORKS = [
  { num: '01', title: 'Free call (30 min)',  body: 'Tell me about your business, your audience, and what\'s not working. I\'ll tell you honestly if I can help.' },
  { num: '02', title: 'I get to work', body: 'First content batch delivered within 72 hours. Written in your voice, not mine.' },
  { num: '03', title: 'You review',    body: 'One round of edits, 15 minutes of your time. That\'s it.' },
  { num: '04', title: 'Consistent visibility',   body: 'Every month, your content goes out on schedule. You focus on clients.' },
] as const;

export const PORTFOLIO_SAMPLES = [
  {
    title: 'Sample: Monthly Newsletter for a Chess Academy',
    type: 'Newsletter',
    excerpt: 'A comprehensive monthly update covering tournament results, student achievements, upcoming events, and strategic chess tips. Written in the academy\'s authoritative yet approachable voice.',
    content: 'Dear Chess Families, This month has been extraordinary at [Academy Name]. Our junior team took gold at the state championships, with 8-year-old prodigy Sarah leading the charge with a perfect 7/7 score...'
  },
  {
    title: 'Sample: SEO Blog Post for a Financial Advisor',
    type: 'Blog',
    excerpt: 'In-depth guide to retirement planning strategies, optimized for "retirement planning Metuchen NJ" and related keywords. Establishes authority while driving qualified leads.',
    content: 'Planning for retirement in today\'s volatile market requires a strategic approach that balances risk management with growth opportunities. Here\'s how local families can build a retirement portfolio that lasts...'
  },
  {
    title: 'Sample: Welcome Email Sequence for a Tutoring Center',
    type: 'Email',
    excerpt: 'Three-part welcome sequence that builds trust, showcases expertise, and converts trial students to long-term clients. Automated but personal.',
    content: 'Welcome to [Tutoring Center]! I\'m excited to help your child excel in [subject]. Based on your initial assessment, here\'s our customized learning plan for the first month...'
  },
  {
    title: 'Sample: Social Content Calendar for a Real Estate Agent',
    type: 'Social',
    excerpt: 'Weekly content mix of market updates, neighborhood highlights, client success stories, and engagement posts. Consistent presence that builds trust and drives inquiries.',
    content: '🏡 JUST SOLD: Beautiful 4BR colonial in desirable Metuchen neighborhood! This home featured an updated kitchen and finished basement. Congratulations to the Smith family on their new beginning. #MetuchenRealEstate #HomeSweetHome'
  },
] as const;

export const POSITIONING = {
  paragraph: 'You could hire an agency for $5,000/month and wait two weeks for deliverables. You could try to do it yourself with ChatGPT and spend hours prompt-engineering mediocre posts. Or you could work directly with me — agency-level strategy, AI-powered speed, and a founding-client price that makes sense for a small business.',
  features: [
    { icon: '👤', title: 'Direct access', description: 'You work with me, not a junior copywriter' },
    { icon: '🤖', title: 'AI-accelerated', description: 'Research and first drafts are AI-powered; strategy and voice are human' },
    { icon: '🛡️', title: 'Risk-free start', description: 'Cancel after month one, no questions asked' },
  ],
} as const;

export const COMPARE_ROWS = [
  { label: 'Monthly cost',              agency: '$3,000–$10,000', freelancer: '$500–$1,500', anchor: 'Custom — Book a Call'      },
  { label: 'Turnaround',                agency: '1–2 weeks',      freelancer: '3–7 days',    anchor: '1–3 days'         },
  { label: 'AI-accelerated',            agency: 'Rarely',         freelancer: 'Sometimes',   anchor: 'Always'           },
  { label: 'Brand voice matching',      agency: 'Yes',            freelancer: 'Sometimes',   anchor: 'Always'           },
  { label: 'Strategic keyword planning',agency: 'Add-on',         freelancer: 'Rarely',      anchor: 'Included'         },
  { label: 'Cancel anytime',            agency: 'Often locked in',freelancer: 'Yes',         anchor: 'Yes — 30 days'    },
] as const;
