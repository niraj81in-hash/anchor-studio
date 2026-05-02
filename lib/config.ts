import type { Service, PricingPlan, PortfolioSample } from '@/types';

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

export const PORTFOLIO_SAMPLES: PortfolioSample[] = [
  {
    title: 'Chess Academy Monthly Newsletter',
    type: 'Newsletter',
    slug: 'chess-academy-newsletter',
    excerpt: 'A comprehensive monthly update covering tournament results, student achievements, upcoming events, and strategic chess tips. Written in the academy\'s authoritative yet approachable voice.',
    content: 'Dear Chess Families, This month has been extraordinary at [Academy Name]. Our junior team took gold at the state championships...',
    sections: [
      {
        body: 'Dear Westfield Chess Academy Families,',
      },
      {
        body: 'Spring is here, and so is the competitive season. April was one of our strongest months yet — three tournament gold medals, two National Scholastic qualifiers, and a first-year student who just earned their first rated win. Here\'s everything that happened and what\'s coming next.',
      },
      {
        heading: 'April Highlights at a Glance',
        body: '♟ State Scholastic Championship: 1st Place (U1200 Section)\n♟ Garden State Spring Open: 2 gold, 1 silver\n♟ 14 students achieved new rating milestones\n♟ New beginner cohort launched: 22 enrolled',
      },
      {
        heading: 'State Scholastic Championship Recap',
        body: 'Our U1200 team put together a dominant performance at the NJ State Scholastic Championship in Cherry Hill. Led by sixth-grader Marcus Chen (4.5/5) and fourth-grader Priya Patel (4/5), the team finished first in their section by a full point.\n\nMarcus played an exceptional Sicilian Defense in round 4 against the defending champion — a game our coaching staff has already added to our training library. We\'ll be sharing a full analysis in next month\'s newsletter.\n\nFor families who want to replay the games: all rated results are posted on US Chess at [link].',
      },
      {
        heading: 'Student Spotlight: Aiden Torres',
        body: 'Every coach has a student who makes them smile. This month, that\'s eight-year-old Aiden Torres.\n\nAiden joined our beginner program in January with zero chess experience. In April, he played his first rated tournament — finishing with 2.5/4 and earning a provisional rating of 621. He celebrated with a handshake to every opponent, win or loss.\n\n"I used to be afraid of losing," Aiden told his mom on the way home. "Now I just want to see what I missed."\n\nThat\'s the Westfield Chess Academy way.',
      },
      {
        heading: 'Upcoming Events in May',
        body: 'May 10 — Spring Club Championship (in-house rated event, all levels welcome)\nMay 17 — Parent & Student Chess Night (casual, 6–8pm, bring snacks!)\nMay 24–25 — Empire City Open (NYC) — advanced students only, registration closes May 15\nMay 31 — End-of-Year Celebration & Awards\n\nTo register for any event, reply to this email or visit [registration link].',
      },
      {
        heading: 'Chess Tip of the Month: The Principle of Two Weaknesses',
        body: 'When you have a small advantage, beginners try to win immediately. Strong players create a second problem.\n\nThe idea: if your opponent is defending one weakness (say, a backward pawn on d6), you maintain that pressure while opening a second front — a kingside attack, a passed pawn, an active rook. Now they can only defend one problem at a time.\n\nThis month in practice, ask your child: "What\'s their weakness? Is there a second one I can create?"\n\nSmall habits, long-term gains.',
      },
      {
        body: 'Until next month,\n\nCoach Nivaan\nWestfield Chess Academy\nhello@westfieldchess.com | (908) 555-0193\n\nP.S. Our summer intensive camp has 6 spots remaining. Enrollment closes May 20 — details at [link].',
      },
    ],
  },
  {
    title: 'Chess Tournament Recap Blog Post',
    type: 'Blog',
    slug: 'chess-tournament-recap',
    excerpt: 'Detailed tournament analysis with game highlights, key moments, and lessons learned. Appeals to both current families and prospective students looking for a competitive program.',
    content: 'The [Tournament Name] was a resounding success for our young chess warriors. With 47 participants from 12 different schools, the competition was fierce but the sportsmanship was exemplary...',
    sections: [
      {
        body: 'Forty-seven students. Twelve schools. One very proud coaching staff.\n\nLast weekend, our Westfield Chess Academy team competed at the NJ State Scholastic Championship in Cherry Hill — and came home with first place in the U1200 section, a second-place finish in U800, and four individual medals. Here\'s the full breakdown.',
      },
      {
        heading: 'The Tournament',
        body: 'The NJ State Scholastic Championship is one of the most competitive scholastic events in the region, drawing top programs from across New Jersey and parts of Pennsylvania. This year\'s tournament used a 5-round Swiss format with G/45+5 time controls — long enough for real chess, fast enough to keep the day moving.\n\nOur players competed across four sections: U800, U1000, U1200, and U1500. We entered 14 students total.',
      },
      {
        heading: 'Section Results',
        body: 'U1200 Section — 1st Place (Team)\nOur strongest section finish of the year. Marcus Chen led the team with 4.5/5, earning Board 1 gold. Priya Patel scored 4/5 on Board 2, and Kevin Walsh contributed 3.5/5 on Board 3. The team finished a full point ahead of second place.\n\nU800 Section — 2nd Place (Team)\nOur youngest competitors represented the academy with skill and heart. Sofia Rodriguez earned individual bronze with 3.5/5 in her first-ever rated tournament. Three of our four U800 players set new personal rating bests.\n\nU1500 Section\nJordana Park had our individual highlight of the day — a clean 5/5 finish for individual gold, including a win against the top seed in round 4.',
      },
      {
        heading: 'Game of the Tournament: Marcus vs. Defending Champion',
        body: 'Round 4, Board 1. Marcus (Westfield, 1187) vs. Ryan M. (Ridgewood, 1203).\n\nRyan was the defending U1200 champion. Marcus had just come off a tense draw in round 3 and needed a win to stay in first.\n\nMarcus chose the Sicilian Najdorf — an aggressive choice that signaled he came to fight, not hold. By move 18, he had established a protected passed pawn on d5 with his rooks doubling on the c-file. Ryan defended resourcefully, but Marcus converted a technically precise endgame in 47 moves.\n\nAfter the game, Ryan immediately offered a handshake and said, "That d5 pawn — I never found the right time to take it." Marcus smiled: "That was the plan."\n\nWe\'ll be posting a full annotated version of this game in our newsletter next week.',
      },
      {
        heading: 'Coaching Takeaways',
        body: 'A few patterns we saw across the day that we\'ll be addressing in upcoming practice sessions:\n\n1. Time management: Several students in the U800 section spent too much time in the opening and rushed the middlegame. We\'ll be doing a clock management drill this week.\n\n2. Endgame conversion: Our U1200 team converted well, but two games that should have been wins became draws due to king activity errors. King activity drills next session.\n\n3. Positional patience: The strongest performances of the day all had one thing in common — the players didn\'t rush. They improved piece coordination before attacking. This is the culture we\'re building.',
      },
      {
        heading: 'What\'s Next',
        body: 'May 10 — Spring Club Championship (in-house). All students welcome.\nMay 24–25 — Empire City Open (NYC). Advanced students, registration closes May 15.\n\nTo our students: you made the academy proud. To our parents: thank you for getting up early and cheering loudly.\n\nNow let\'s get back to work.',
      },
    ],
  },
  {
    title: 'Tutoring Center Welcome Email Sequence',
    type: 'Email',
    slug: 'tutoring-welcome-email',
    excerpt: 'Three-part welcome sequence that builds trust, showcases expertise, and converts trial students to long-term clients. Automated but personal.',
    content: 'Welcome to [Tutoring Center]! I\'m excited to help your child excel in [subject]. Based on your initial assessment, here\'s our customized learning plan for the first month...',
    sections: [
      {
        heading: 'Email 1 of 3 — Welcome (sent immediately after enrollment)',
        body: 'Subject: Welcome to Brightpath Tutoring, [First Name] — here\'s your first week plan\n\n―\n\nHi [Parent Name],\n\nThank you for choosing Brightpath Tutoring for [Student Name]. I\'m really glad you\'re here.\n\nI\'ve reviewed [Student Name]\'s initial assessment, and I want to be direct with you: there are specific, fixable gaps in [subject] that are holding them back. The good news — we see this pattern all the time, and we know exactly how to address it.\n\nHere\'s what the first month looks like:\n\nWeek 1: Diagnostic deep-dive. We identify the exact concepts that need reinforcement — not just general "math" or "reading," but the precise skills.\n\nWeek 2: Foundation work. Before we move forward, we make sure the foundation is solid. This is the step most students skip, and it\'s why they stay stuck.\n\nWeeks 3–4: Accelerated application. Once the foundation is there, progress happens fast. Most students see a measurable improvement in confidence within the first month.\n\nYou\'ll receive a written progress update after every session. No surprises — you\'ll always know exactly where we are.\n\nI\'ll be in touch Friday with your first session summary.\n\nWarm regards,\n[Tutor Name]\nBrightpath Tutoring\n\nP.S. If you have any questions before your first session, just reply to this email. I personally read every message.',
      },
      {
        heading: 'Email 2 of 3 — Learning Approach (sent 3 days after first session)',
        body: 'Subject: What [Student Name]\'s first session told us\n\n―\n\nHi [Parent Name],\n\n[Student Name] did great in their first session — and I want to explain what we learned.\n\nHere\'s something most tutoring centers won\'t tell you: the way a student makes mistakes matters more than the mistakes themselves.\n\n[Student Name] has strong conceptual understanding — when we worked through new material, they picked it up quickly. The challenge isn\'t intelligence; it\'s a procedural gap in [specific skill area] that\'s causing consistent errors under test conditions.\n\nThis is actually good news. Procedural gaps are the easiest type to fix, because once a student understands the correct process and practices it enough times, it becomes automatic. Conceptual gaps take much longer.\n\nOur next two sessions will focus on building that procedural fluency with targeted drills — repetitive but purposeful. You may hear [Student Name] say it feels "boring." That\'s normal. That\'s also how mastery is built.\n\nExpected timeline for improvement: 3–4 weeks before you see the grade changes. 6–8 weeks before [Student Name] tells you they "actually get it now."\n\nI\'ll send your Week 2 summary on [date].\n\n[Tutor Name]',
      },
      {
        heading: 'Email 3 of 3 — Building Momentum (sent at 30-day mark)',
        body: 'Subject: One month in — here\'s what\'s changed for [Student Name]\n\n―\n\nHi [Parent Name],\n\nOne month ago, [Student Name] came in with [specific challenge noted at assessment]. Today, I want to share what\'s changed — and what\'s still ahead.\n\nWhat we\'ve accomplished:\n✓ Closed the procedural gap in [skill area] — [Student Name] is now completing these problems accurately 85% of the time\n✓ Built a study framework they can use independently\n✓ Increased session engagement significantly — they\'re asking better questions now\n\nWhat\'s next:\nMonth 2 is where students usually notice the momentum shift. The foundation work we did in Month 1 starts paying off in unexpected places — not just in [subject], but in confidence and study habits overall.\n\nWe\'re scheduling Month 2 sessions now. If you\'d like to continue, your rate is locked in at the founding-client price — it won\'t increase as long as you remain an active student.\n\nIf you have any questions about Month 2 goals, I\'d love to do a quick 10-minute call. Just reply and we\'ll find a time.\n\nThank you for trusting us with [Student Name]\'s education. It genuinely matters to us.\n\n[Tutor Name]\nBrightpath Tutoring',
      },
    ],
  },
  {
    title: 'SEO Blog Post for Tutoring Center',
    type: 'Blog',
    slug: 'tutoring-seo-blog',
    excerpt: 'Keyword-optimized guide to help parents choose the right tutoring program, ranking for local search terms and driving qualified enrollment inquiries.',
    content: 'Choosing the right tutoring program for your child can make the difference between frustration and academic success. Here\'s what to look for when selecting a [City] tutoring center...',
    sections: [
      {
        heading: '5 Things to Look for When Choosing a Tutoring Center in [Your City]',
        body: 'Every parent searching for "[city] tutoring" gets the same flood of options — franchise chains, independent tutors, learning centers, online platforms. The websites all say the same things: personalized learning, certified instructors, proven results.\n\nSo how do you actually choose?\n\nAfter working with hundreds of families, we\'ve identified five factors that separate tutoring programs that produce lasting improvement from those that simply feel productive. Here\'s what to look for — and what to ask.',
      },
      {
        heading: '1. A Diagnostic That Goes Beyond the Grade',
        body: 'The first session at any quality tutoring center should be a diagnostic assessment — not just a placement test, but a structured evaluation of how a student thinks, where they get stuck, and what kind of learner they are.\n\nA grade tells you where a student is. A good diagnostic tells you why.\n\nAsk: "What does your initial assessment look like, and what will it tell me that I don\'t already know from my child\'s report card?"\n\nIf the answer is vague, or if they skip the diagnostic entirely, that\'s a red flag.',
      },
      {
        heading: '2. Clear Communication With Parents',
        body: 'Your child spends one or two hours a week with their tutor. You spend the rest of the time with them. If the tutoring center isn\'t communicating with you regularly, you\'re flying blind.\n\nLook for programs that send session-by-session progress updates, not just quarterly reports. You should know what was covered, what the student struggled with, and what to reinforce at home.\n\nAsk: "How will I know if my child isn\'t making progress?" A good program has a clear answer. A poor one will tell you to "wait and see."',
      },
      {
        heading: '3. A Specific Plan — Not Just "More Practice"',
        body: '"We\'ll work on math" is not a plan. A real plan looks like: "In the first four weeks, we\'re closing the fraction computation gap that\'s causing errors on multi-step word problems. We\'ll know it\'s closed when [Student] can complete 8/10 of these problems correctly without prompting."\n\nSpecificity is a sign that a program understands your child\'s actual needs — not just their subject area.\n\nAsk for a written outline of the first month\'s goals before you commit.',
      },
      {
        heading: '4. Tutors Who Stay (Low Staff Turnover)',
        body: 'Consistency matters in tutoring. It takes time for a tutor to understand how a student learns, what motivates them, and where their specific gaps are. Programs with high staff turnover restart this process every few months — and the student pays the price.\n\nAsk: "What\'s your average tutor tenure?" or "Will my child have the same tutor each session?"\n\nThe answer tells you a lot about the organization\'s culture, not just their hiring practices.',
      },
      {
        heading: '5. A Track Record You Can Verify',
        body: 'Testimonials on a website are selected. Ask for something more concrete: grade improvement data, client retention rates, or references you can contact directly.\n\nThe best tutoring centers can tell you something like: "85% of our students improve at least one full letter grade within 90 days."\n\nIf they can\'t give you any data-backed claims, ask why.',
      },
      {
        heading: 'Questions to Ask Before You Enroll',
        body: '• What does the initial diagnostic assess, and how long does it take?\n• How often will I receive written progress updates?\n• What\'s the plan for my child specifically — not just your general curriculum?\n• What happens if my child isn\'t making progress after 60 days?\n• What\'s your tutor retention rate?\n• Can you share any outcome data from past students?\n\nA program that answers these questions clearly and confidently is one worth trying.',
      },
      {
        heading: 'The Bottom Line',
        body: 'Choosing a tutoring center isn\'t just about proximity or price. It\'s about finding a program that can explain exactly how they\'ll help your child — and give you the visibility to see whether it\'s working.\n\nIf you\'re looking for a [city] tutoring center that takes this approach, we\'d love to start with a conversation. Book a free 20-minute consultation and we\'ll tell you exactly whether we\'re a good fit for your child\'s needs.',
      },
    ],
  },
];

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
