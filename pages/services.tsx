import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { SITE, SERVICES, HOW_IT_WORKS } from '@/lib/config';

export default function Services() {
  return (
    <>
      <Head>
        <title>Services — Anchor Studio</title>
        <meta name="description" content="AI-powered content services from Anchor Studio — blogs, social captions, email sequences, chatbots, and chess club content. 24-48hr turnaround." />
      </Head>
      <Nav />

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <section className="bg-ink pt-32 pb-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal-mid mb-3">What we deliver</p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-white tracking-tight max-w-2xl">
            Six done-for-you services. All AI-powered.
          </h1>
          <p className="text-white/55 mt-5 max-w-xl leading-relaxed text-[1rem]">
            Every service is built on the same framework — pattern recognition, long-game thinking,
            systematic precision. The same disciplines that drive elite chess.
          </p>
        </div>
      </section>

      {/* ── SERVICE CARDS ───────────────────────────────────────── */}
      <section className="bg-warm py-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule rounded-xl overflow-hidden">
            {SERVICES.map(s => (
              <div key={s.name} className="bg-white p-8 hover:bg-[#fafaf8] transition-colors flex flex-col">
                <div className="text-2xl mb-4">{s.icon}</div>
                <div className="font-medium text-[0.95rem] text-ink mb-2">{s.name}</div>
                <div className="text-[0.85rem] text-mid leading-relaxed mb-5 flex-1">{s.description}</div>
                <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
                   className="text-teal text-[0.9rem] font-medium hover:text-teal-dark transition-colors">
                  Get a custom quote →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section className="bg-white py-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">The process</p>
          <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">From brief to published in 1–3 days.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {HOW_IT_WORKS.map(step => (
              <div key={step.num}>
                <div className="font-serif text-[3rem] text-teal-light leading-none mb-3">{step.num}</div>
                <div className="font-medium text-[0.95rem] mb-2">{step.title}</div>
                <div className="text-[0.85rem] text-mid leading-relaxed">{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHESS CLUB CALLOUT ──────────────────────────────────── */}
      <section className="bg-ink py-20 px-[6%]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-10 items-start">
          <div className="flex-1">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal-mid mb-3">chess-club-hub integration</p>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-white tracking-tight max-w-xl">
              Chess clubs get a native content pipeline.
            </h2>
            <p className="text-white/55 mt-4 leading-relaxed max-w-lg">
              Our Chess Club Content tier connects directly with chess-club-hub. Every game result,
              tournament, and player milestone becomes a newsletter, recap, or social post — automatically.
            </p>
            <Link href="/integration" className="inline-block mt-6 text-teal-mid text-[0.9rem] font-medium hover:text-white transition-colors">
              See all 6 integration points →
            </Link>
          </div>
          <div className="sm:w-64 bg-white/5 border border-white/10 rounded-xl p-6 flex-shrink-0">
            <div className="text-white/40 text-[0.85rem] mb-4">Chess Club Content</div>
            <ul className="flex flex-col gap-2">
              {['Monthly club newsletter', '4 tournament recap posts', 'chess-club-hub integration', 'Player spotlight content', 'Cancel anytime'].map(f => (
                <li key={f} className="flex gap-2 items-start text-[0.83rem] text-white/60">
                  <span className="w-4 h-4 rounded-full bg-teal/30 text-teal-mid flex items-center justify-center text-[0.6rem] font-bold mt-0.5 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
               className="block text-center mt-6 bg-teal text-white px-4 py-2 rounded-lg text-[0.85rem] font-medium hover:bg-teal-dark transition-colors">
              Book a Call
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="bg-teal py-20 px-[6%] text-center">
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-white tracking-tight">Not sure which service fits?</h2>
        <p className="text-white/70 mt-4 max-w-md mx-auto">Free 30-minute call. We&apos;ll map your goals to the right package — no pitch, no pressure.</p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
             className="bg-white text-teal px-8 py-3.5 rounded-lg text-[0.92rem] font-medium hover:bg-teal-light transition-colors">
            Book your free discovery call →
          </a>
          <Link href="/pricing"
             className="border border-white/40 text-white px-8 py-3.5 rounded-lg text-[0.92rem] font-medium hover:border-white hover:bg-white/10 transition-colors">
            See pricing
          </Link>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </>
  );
}
