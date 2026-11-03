import type { Service, PricingPlan, PortfolioSample, Testimonial } from '@/types';

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
    title: 'Girsh vs. Gao — Princeton National Chess Day Open',
    type: 'Game Analysis',
    slug: 'girsh-gao-national-chess-day',
    featured: true,
    sourceLabel: 'Featured in US Chess',
    sourceUrl: 'https://new.uschess.org/news/2026-national-chess-day-wrap',
    excerpt: 'A positional masterclass from the Premier section — FM Daniel Girsh outplays Vincent Gao and converts a series of small advantages. Annotated by NM Nivaan Shrivastava and featured by US Chess on National Chess Day.',
    content: 'FM Daniel Girsh (2392) vs. Vincent Gao (1765), Princeton National Chess Day Open, Round 2 — a lesson in positional play and converting small advantages.',
    sections: [
      {
        body: 'The Atlantic Chess Association organized the Princeton National Chess Day Open at the Princeton Marriott Hotel in New Jersey. It was an excellently run event, and the spacious venue, surrounded by the colors of fall, made for a great tournament experience. The tournament produced many wonderful games, both on and off the DGT broadcast boards. I selected the game below for its instructive value in positional play and in converting relatively small advantages.\n\nRound 2 of the Premier section featured FM Daniel Girsh (2392) against Vincent Gao (1765). Despite the sizable rating gap, the two players produced an excellent game in which Girsh gradually outplayed his opponent positionally. Let’s dive into the critical moments and instructive points.',
      },
      {
        heading: 'The opening: a Queen’s Indian / Catalan hybrid',
        body: 'Although the ECO classification marks the opening as a Queen’s Indian Defense, the structure quickly took on a Catalan flavor. White chose a flexible fianchetto setup with Nf3, c4, g3 and Bg2, while Black responded with the classical Queen’s Indian formation of ...Nf6, ...e6, ...b6 and ...Bb7. By move 9, the position was a typical hybrid: Black had established central tension, and White’s long diagonal pointed toward the queenside.',
        image: '/samples/girsh-gao/diagram1.png',
        caption: 'The Queen’s Indian / Catalan hybrid after move 9.',
      },
      {
        heading: 'Move 11: the e4 break Black should have stopped',
        body: 'A subtle turning point came on move 11. Black played 11...Nd7, a move that looks natural but carries strategic consequences. With the knight on d7, White could immediately play 12.e4, gaining central space and activating the g2-bishop. The more resilient defensive idea was 11...f5, which would have prevented e4 entirely and challenged White’s center. Once e4 appeared on the board, White’s pieces gained freedom, and the game began tilting toward a space-driven positional battle.',
      },
      {
        heading: 'A space-driven middlegame',
        body: 'White expanded on the queenside with b4 and a3, while Black sought counterplay with ...b5 and ...a5. The position after 15.b4 highlighted the structural tension: White had more space, but Black had active possibilities on the queenside. Neither side was winning; the game was simply entering a phase where long-term plans mattered more than immediate tactics.',
        image: '/samples/girsh-gao/diagram2.png',
        caption: 'After 15.b4: White has more space; Black eyes queenside counterplay.',
      },
      {
        heading: '27.Nd3 — a pawn for the c5 outpost',
        body: 'One of the most instructive decisions came with 27.Nd3. White voluntarily allowed Black to capture the d4-pawn, but in return secured control of the dark squares and prepared a strong outpost on c5. This was a positional pawn sacrifice: the d-pawn mattered less than the long-term grip on c5 and the ability to restrict Black’s minor pieces.\n\nInterestingly, the position also contained a tactical alternative: Nxf7, a thematic sacrifice to expose Black’s king. The line runs Nxf7 Kxf7 Qxh7 Rf8 Qh5+ g6, and if ...Kg8, then Be4+ is strong. After Qh7+ Ke8 Qxg6+ Kd7 h5, White would have obtained compensation in the form of Black’s weakened king and passed kingside pawns. White chose the quieter positional route with Nd3, but both ideas were playable and instructive.',
        image: '/samples/girsh-gao/diagram3.png',
        caption: 'After 27.Nd3: White offers the d4-pawn in exchange for the c5 outpost.',
      },
      {
        heading: '29.Nc5 — the knight that changed the game',
        body: 'The game’s momentum shifted decisively with 29.Nc5, a move that pressured the queen, the b7-bishop and several key squares at once. Black’s pieces became difficult to coordinate, and White’s activity kept growing.',
        image: '/samples/girsh-gao/diagram4.png',
        caption: 'After 29.Nc5: the knight hits the queen, the b7-bishop and key squares.',
      },
      {
        heading: 'Tactics in service of strategy',
        body: 'Soon after, White played 34.Nxe6, combining tactical calculation with positional logic. The knight could not be taken: 34...fxe6 would run into 35.Bxe6+, winning the queen. White gained a pawn and further exposed Black’s king. This was followed by 35.Nxg7, another tactical idea: if 35...Kxg7, then 36.Qd4+ regains the knight. Even though Black can later play ...Qxe4, the material balance remains equal while White’s light-squared bishop becomes significantly more active than Black’s. These sequences show how tactical motifs can reinforce positional advantages.',
      },
      {
        heading: 'Converting the advantage',
        body: 'There was one moment where greater precision was possible. Instead of 38.Bg2, White had the cleaner 38.Qd8+ Qe8 39.Qf6, which would have maintained maximum pressure and reduced counterplay. Even so, the position remained favorable, and White continued to improve his pieces. The h6-pawn eventually fell, and Black’s position deteriorated steadily.\n\nThe final phase was a matter of technique: White converted the advantage methodically, and Black resigned once the weaknesses on both the queenside and kingside became too difficult to defend.',
        image: '/samples/girsh-gao/diagram5.png',
        caption: 'The conversion phase: White’s queen and bishop dominate.',
      },
      {
        heading: 'Key takeaways',
        body: '• Stop the key pawn break. 11...f5 would have kept e4 off the board. Once White achieved it, Black was playing for equality without space.\n\n• Squares can be worth more than pawns. 27.Nd3 gave up the d4-pawn to secure c5 and the dark squares — a long-term trade that paid off.\n\n• Tactics serve strategy. 34.Nxe6 and 35.Nxg7 worked because of the follow-ups Bxe6+ and Qd4+, turning a positional edge into a lasting advantage.\n\n• Keep the pressure on. Even when winning, look for the most forcing continuation (38.Qd8+) to deny counterplay.',
      },
      {
        body: 'Overall, this was a great game that I enjoyed analyzing — kudos to both players!\n\n— NM Nivaan Shrivastava',
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

// ── Press / credibility ──────────────────────────────────────────────
export const PRESS = {
  label: 'Featured in',
  outlet: 'US Chess',
  blurb: 'Game analysis featured in the 2026 National Chess Day Wrap-Up and Game of the Week',
  url: 'https://new.uschess.org/news/2026-national-chess-day-wrap',
} as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Nivaan understands the art of annotating a chess game. While key variations are certainly there, his excellent and intuitive layout allows players of various skill levels to understand the narrative flow of the game, walking away having learned something rather than simply having been overwhelmed by engine analysis.',
    author: 'JJ Lang',
    role: 'Digital Editor, US Chess',
  },
];
