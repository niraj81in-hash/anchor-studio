import type { Service, PricingPlan } from '@/types';

export const SITE = {
  name:        'Anchor Studio',
  tagline:     'We create the content. You run the business.',
  heroTagline: 'Content strategy is just chess for your brand.',
  domain:      'https://www.getanchorstudio.com',
  email:       'hello@getanchorstudio.com',
  calendly:    process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com',
} as const;

export const FOUNDER = {
  name:    'Nivaan Shrivastava',
  title:   'Chess National Master',
  grade:   '',
  bio:     'Nivaan founded Anchor Studio to give growing businesses the strategic content they need without the overhead of a full agency. A Chess National Master, he brings the same systems thinking and pattern recognition from competitive chess to content strategy — planning three moves ahead so your brand stays visible and consistent. He built Anchor Studio on AI-accelerated workflows that let him deliver agency-quality work at freelancer speed.',
  chips: [
    '♛ Chess National Master',
    'AI-accelerated workflows',
    'Strategic content planning',
    'chess-club-hub founder',
  ],
} as const;

export const SERVICES: Service[] = [
  { name: 'Content Package',          icon: '✍️', description: '4 blog posts + 12 social captions/month, written in your brand voice.' },
  { name: 'Chess Club Content',       icon: '♟',  description: 'Newsletters, tournament recaps, player spotlights — built for chess clubs and academies.' },
  { name: 'SEO Blog Retainer',        icon: '📈', description: '8 keyword-optimised posts per month to rank on Google and drive organic leads.' },
  { name: 'Email Sequence Buildout',  icon: '📧', description: 'Welcome, nurture, and sales sequences — written once, working forever.' },
  { name: 'AI Chatbot Setup',         icon: '🤖', description: 'Claude-powered chatbot that qualifies leads and answers client questions 24/7.' },
  { name: 'AI Workflow Audit',        icon: '⚙️', description: 'Map and automate 3 business processes — cut hours from your week permanently.' },
];

export const PRICING: PricingPlan[] = [
  {
    name: 'Chess Club',
    chessHub: true,
    features: [
      'Monthly club newsletter',
      '4 tournament recap posts',
      'Content calendar & scheduling',
      'Player spotlight content',
      'Cancel anytime',
    ],
  },
  {
    name: 'Growth',
    popular: true,
    features: [
      '8 SEO blog posts/month',
      '20 social captions',
      'Monthly keyword strategy',
      'Priority 2-day turnaround',
      'Performance report',
      'Cancel anytime',
    ],
  },
  {
    name: 'Full Service',
    features: [
      'Everything in Growth',
      'AI chatbot for your site',
      'Email sequence buildout',
      'Custom platform integrations',
      'Same-day turnaround',
    ],
  },
];

export const NICHES = [
  { label: 'Local businesses',         note: 'Community content, Google presence',      best: true  },
  { label: 'Real estate agents',       note: 'Listings, market updates, personal brand',best: false },
  { label: 'Financial advisors',       note: 'Education content, newsletters',          best: false },
  { label: 'Tutoring & test prep',     note: 'SEO content, parent marketing, social',   best: true  },
  { label: 'STEM education brands',    note: 'Thought leadership, curriculum content',  best: true  },
  { label: 'Chess clubs & academies',  note: 'Newsletters, recaps, coaching content',   best: true  },
] as const;

export const HOW_IT_WORKS = [
  { num: '01', title: 'Discovery call',  body: '30 minutes. We learn your business, voice, goals, and whether chess-club-hub integration applies.' },
  { num: '02', title: 'We get to work', body: '1–3 business days to your first content batch, fully written in your voice.' },
  { num: '03', title: 'You approve',    body: 'Review, one round of edits, then publish. Takes under 15 minutes on your end.' },
  { num: '04', title: 'Stay visible',   body: 'Consistent content every month. You focus on running your business or club.' },
] as const;

export const COMPARE_ROWS = [
  { label: 'Monthly cost',              agency: '$3,000–$10,000', freelancer: '$500–$1,500', anchor: 'Custom — Book a Call'      },
  { label: 'Turnaround',                agency: '1–2 weeks',      freelancer: '3–7 days',    anchor: '1–3 days'         },
  { label: 'AI-accelerated',            agency: 'Rarely',         freelancer: 'Sometimes',   anchor: 'Always'           },
  { label: 'Brand voice matching',      agency: 'Yes',            freelancer: 'Sometimes',   anchor: 'Always'           },
  { label: 'Strategic keyword planning',agency: 'Add-on',         freelancer: 'Rarely',      anchor: 'Included'         },
  { label: 'Cancel anytime',            agency: 'Often locked in',freelancer: 'Yes',         anchor: 'Yes — 30 days'    },
] as const;
