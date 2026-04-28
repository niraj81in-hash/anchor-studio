import Head from 'next/head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { SITE } from '@/lib/config';

const INTEGRATIONS = [
  { badge: 'db.js',    num: '01', title: 'Game & player data → auto-content',      desc: 'Query the chess-club-hub database for recent results, player ratings, and standings. Feed live data into Claude to generate weekly newsletters and player spotlights automatically.', code: "const games = await db.getRecentGames(7);\nconst newsletter = await generateNewsletter(games);" },
  { badge: 'pgn.js',   num: '02', title: 'PGN game files → annotated posts',        desc: 'Parse PGN exports from chess-club-hub. Send key positions to Claude to produce coach-quality game annotations, tactical puzzles, and "game of the week" posts.', code: "const game = pgn.parse(rawPgn);\nconst analysis = await annotateGame(game);" },
  { badge: 'engine.js',num: '03', title: 'Engine evaluations → coaching lessons',   desc: 'Use engine.js evaluations to surface blunders and brilliant moves. Claude turns evaluation scores into plain-English coaching tips and social-ready puzzle posts.', code: "const eval = engine.evaluate(fen);\nconst lesson = await generateLesson(fen, eval.score, eval.bestMove);" },
  { badge: 'Webhooks', num: '04', title: 'Tournament events → live social posts',   desc: 'Hook into chess-club-hub tournament events. When a round ends, Claude drafts a real-time social post — results are published within minutes of the game finishing.', code: "app.post('/webhook/round', async (req) => {\n  const post = await generateSocialPost(req.body);\n  await publishToSocial(post);\n});" },
  { badge: 'Chatbot',  num: '05', title: 'Club AI assistant — embedded in-app',    desc: 'Embed the Anchor Studio Claude chatbot inside chess-club-hub. Players ask "What openings should I study?" or "Explain the Sicilian" and get National Master-level answers.', code: 'POST /api/chat\n{ "messages": [...], "context": "chess-club" }' },
  { badge: 'API',      num: '06', title: 'Anchor Studio as a content API',          desc: 'Expose a REST endpoint from Anchor Studio that chess-club-hub calls to generate any content on demand — newsletters, recaps, annotations — with one API call.', code: "POST /api/generate\n{\n  \"type\": \"newsletter\",\n  \"club\": \"Metuchen Chess Club\",\n  \"data\": { games, standings }\n}" },
];

const FLOW = ['Game played', 'PGN + result saved', 'Webhook fires', 'Claude generates', 'Published'];

export default function Integration() {
  return (
    <>
      <Head>
        <title>chess-club-hub Integration — Anchor Studio</title>
        <meta name="description" content="Anchor Studio integrates directly with chess-club-hub. Every game, tournament, and player milestone becomes content automatically." />
      </Head>
      <Nav />

      <section className="bg-ink pt-32 pb-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal-mid mb-3">chess-club-hub integration</p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-white tracking-tight max-w-2xl">Content that lives inside your chess platform.</h1>
          <p className="text-white/55 mt-5 max-w-xl leading-relaxed text-[1rem]">Anchor Studio connects directly with chess-club-hub — Nivaan&apos;s own chess platform. Every game, tournament, and player milestone becomes professional content automatically.</p>

          {/* Integration cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {INTEGRATIONS.map(int => (
              <div key={int.num} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-teal-mid/40 hover:bg-teal/8 transition-all">
                <span className="inline-block text-[0.68rem] font-semibold uppercase tracking-widest bg-teal-mid/15 text-teal-mid px-2 py-0.5 rounded mb-4">{int.badge}</span>
                <div className="font-serif text-[2rem] text-teal-mid/30 leading-none mb-3">{int.num}</div>
                <div className="font-medium text-white text-[0.95rem] mb-3">{int.title}</div>
                <div className="text-white/55 text-[0.85rem] leading-relaxed mb-4">{int.desc}</div>
                <pre className="bg-black/35 border border-white/8 rounded-lg px-4 py-3 text-teal-mid text-[0.75rem] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{int.code}</pre>
              </div>
            ))}
          </div>

          {/* Data flow */}
          <div className="mt-16">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-white/35 mb-4">End-to-end data flow</p>
            <div className="flex flex-wrap gap-0">
              {FLOW.map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="bg-white/4 border border-white/8 px-5 py-4 text-center min-w-[120px]">
                    <div className="text-[0.65rem] font-bold text-teal-mid uppercase tracking-widest mb-1">Step {i + 1}</div>
                    <div className="text-white text-[0.82rem] font-medium">{step}</div>
                  </div>
                  {i < FLOW.length - 1 && <div className="text-teal-mid px-2 text-lg">→</div>}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 p-8 bg-teal/10 border border-teal-mid/30 rounded-xl">
            <h2 className="font-serif text-white text-[1.6rem] mb-3">Want chess club content that runs automatically?</h2>
            <p className="text-white/60 mb-6 max-w-lg">Our Chess Club tier includes chess-club-hub integration. Newsletters, tournament recaps, and player spotlights — all generated from your club&apos;s actual game data.</p>
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
               className="inline-block bg-teal text-white px-6 py-3 rounded-lg text-[0.9rem] font-medium hover:bg-teal-dark transition-colors">
              Book a free discovery call
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </>
  );
}
