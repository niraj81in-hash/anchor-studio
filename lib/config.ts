import type { Service, PricingPlan } from '@/types';

export const SITE = {
  name:        'Anchor Studio',
  tagline:     'The only content partner built specifically for chess organizations — by a National Master who understands the community.',
  heroTagline: 'Content strategy for chess — by someone who actually plays.',
  domain:      'https://www.getanchorstudio.com',
  email:       'hello@getanchorstudio.com',
  calendly:    process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/nirajshriva',
} as const;

export const FOUNDER = {
  name:    'Nivaan',
  title:   'Chess National Master',
  grade:   '',
  bio:     'As a Chess National Master, I think in systems and sequences — it\'s how my brain works from competitive chess, and it\'s how I approach your content calendar. I started Anchor Studio because I saw chess organizations struggling with content that actually reaches parents and builds community. I use AI-accelerated workflows that let me deliver agency-quality work at solo-operator speed. Founding clients get my lowest rates, locked in permanently, and direct access to me for everything.',
  chips: [
    '♛ Chess National Master',
    'AI-accelerated workflows',
    'Strategic content planning',
    'Direct founder access',
  ],
} as const;

export const SERVICES: Service[] = [
  { name: 'Chess Club & Academy Content', icon: '♟',  description: 'Newsletters, tournament recaps, player spotlights, coaching content. Built by a National Master who doesn\'t need you to explain what a Swiss-system is.' },
  { name: 'SEO & Blog Content',           icon: '📈', description: 'Keyword-optimized posts to drive enrollment and discovery. Rank for "[city] chess lessons" or "[city] tutoring" and attract new families.' },
  { name: 'Email Sequences',              icon: '📧', description: 'Welcome, nurture, and re-enrollment sequences. Written once, working forever to convert prospects and retain students.' },
];

export const PRICING: PricingPlan[] = [
  {
    name: 'Chess',
    price: '$400/mo',
    features: [
      'Monthly club newsletter',
      '4 tournament recap posts',
      'Player spotlight content',
      'Content calendar & scheduling',
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
];

export const NICHES = [
  { label: 'Chess Organizations', note: 'Academies, clubs, state/national federations. I speak your language because I\'ve lived in this world as a National Master. Your content won\'t need a chess glossary attached.', best: true },
  { label: 'Education Businesses', note: 'Tutoring centers, test prep, coding academies, music schools. Enrollment-driven businesses that run on community trust and parent confidence. The same content engine, adapted for your world.', best: false },
] as const;

export const HOW_IT_WORKS = [
  { num: '01', title: 'Discovery call (30 min)', body: 'We discuss your chess organization or education business, your audience, and your content challenges. I bring chess thinking to understand your strategic position.' },
  { num: '02', title: 'Strategic planning', body: 'I map out your content calendar like a chess opening — systematic, sequenced, and designed for long-term advantage. AI accelerates the execution.' },
  { num: '03', title: 'First delivery (72hrs)', body: 'Your first batch arrives — tournament recaps, newsletters, or enrollment content. Written in your voice, not mine. One round of quick edits.' },
  { num: '04', title: 'Ongoing partnership', body: 'Consistent content every month. You focus on teaching chess or growing enrollment. I handle the communication strategy.' },
] as const;

export const PORTFOLIO_SAMPLES = [
  {
    title: 'Chess Academy Monthly Newsletter',
    type: 'Newsletter',
    excerpt: 'A comprehensive monthly update covering tournament results, student achievements, upcoming events, and strategic chess tips. Written in the academy\'s authoritative yet approachable voice.',
    content: 'Dear Chess Families, This month has been extraordinary at [Academy Name]. Our junior team took gold at the state championships, with 8-year-old prodigy Sarah leading the charge with a perfect 7/7 score...'
  },
  {
    title: 'Chess Tournament Recap Blog Post',
    type: 'Blog',
    excerpt: 'Detailed tournament analysis with game highlights, key moments, and lessons learned. Appeals to both current families and prospective students looking for a competitive program.',
    content: 'The [Tournament Name] was a resounding success for our young chess warriors. With 47 participants from 12 different schools, the competition was fierce but the sportsmanship was exemplary...'
  },
  {
    title: 'Tutoring Center Welcome Email Sequence',
    type: 'Email',
    excerpt: 'Three-part welcome sequence that builds trust, showcases expertise, and converts trial students to long-term clients. Automated but personal.',
    content: 'Welcome to [Tutoring Center]! I\'m excited to help your child excel in [subject]. Based on your initial assessment, here\'s our customized learning plan for the first month...'
  },
  {
    title: 'SEO Blog Post for Tutoring Center',
    type: 'Blog',
    excerpt: 'Keyword-optimized guide to help parents choose the right tutoring program, ranking for local search terms and driving qualified enrollment inquiries.',
    content: 'Choosing the right tutoring program for your child can make the difference between frustration and academic success. Here\'s what to look for when selecting a [City] tutoring center...'
  },
] as const;

export const THE_PROBLEM = {
  headline: 'You\'re great at teaching chess. Content falls through the cracks.',
  description: 'Chess academy owners and education business leaders are experts in their field — but newsletters get delayed, tournament recaps never get written, and social media sits silent. Parents don\'t know what\'s happening. New families never hear about your program. Your chess expertise deserves to be communicated as powerfully as it\'s taught.',
  painPoints: [
    'Tournament results that never get shared with families',
    'Newsletter deadlines that consistently get missed',
    'Social media that could attract new students but doesn\'t',
    'Content that requires chess knowledge you don\'t have time to explain',
  ],
} as const;

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
