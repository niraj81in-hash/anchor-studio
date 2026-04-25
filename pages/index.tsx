import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FounderStrip from '@/components/FounderStrip';
import ChatBot from '@/components/ChatBot';
import { SITE, SERVICES, PRICING, HOW_IT_WORKS, COMPARE_ROWS, NICHES } from '@/lib/config';

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Anchor Studio — AI Content by a Chess National Master</title>
        <meta name="description" content="Anchor Studio is founded by Nivaan, a Chess National Master. AI-powered content for chess clubs, tutoring centres, and growing businesses." />
        <meta property="og:title" content="Anchor Studio — AI Content by a Chess National Master" />
        <meta property="og:description" content="Content strategy is just chess for your brand. Founded by Nivaan, USCF 2200+, NJ #2." />
        <meta property="og:url" content={SITE.domain} />
      </Head>

      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-ink flex flex-col justify-center px-[6%] pt-24 pb-20 relative overflow-hidden chess-pattern">
        {/* Radial glow */}
        <div className="absolute right-[-10%] top-[15%] w-[580px] h-[580px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(13,127,106,0.22) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.3)] rounded-full px-4 py-1.5 text-[0.73rem] font-medium text-[#C9A84C] tracking-widest uppercase mb-7">
            <span>♛</span> Founded by a Chess National Master
          </div>

          <h1 className="font-serif text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.06] text-white tracking-tight">
            Content strategy<br />
            is just chess<br />
            <em className="text-teal-mid not-italic">for your brand.</em>
          </h1>

          <p className="text-[1.05rem] text-white/60 max-w-lg mt-5 leading-relaxed">
            Anchor Studio is founded by Nivaan — Chess National Master, ranked #2 in New Jersey. AI-powered content for businesses that want to grow without hiring a full agency.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
               className="bg-teal text-white px-7 py-3.5 rounded-lg text-[0.92rem] font-medium hover:bg-teal-dark transition-colors">
              Book a free discovery call
            </a>
            <Link href="/services"
               className="text-white/80 border border-white/20 px-7 py-3.5 rounded-lg text-[0.92rem] font-medium hover:border-white/50 hover:text-white transition-colors">
              See our services
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/10">
            {[
              { n: '2200+',  l: 'USCF rating'         },
              { n: '#2',     l: 'Ranked, New Jersey'   },
              { n: '24hr',   l: 'Content turnaround'   },
              { n: '3×',     l: 'Lower than agencies'  },
            ].map(({ n, l }) => (
              <div key={l}>
                <div className="font-serif text-[2rem] text-white leading-none">{n}</div>
                <div className="text-[0.7rem] text-white/45 mt-1 uppercase tracking-widest">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER STRIP ─────────────────────────────────────────── */}
      <FounderStrip />

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section className="bg-warm py-20 px-[6%]" id="services">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">What we deliver</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">Six done-for-you services.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule rounded-xl overflow-hidden mt-10 reveal" style={{ transitionDelay: '0.1s' }}>
            {SERVICES.map(s => (
              <div key={s.name} className="bg-white p-7 hover:bg-[#fafaf8] transition-colors">
                <div className="text-2xl mb-4">{s.icon}</div>
                <div className="font-medium text-[0.95rem] text-ink mb-2">{s.name}</div>
                <div className="text-[0.85rem] text-mid leading-relaxed mb-4">{s.description}</div>
                <div className="font-serif text-[1.15rem] text-teal">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHESS HUB PREVIEW ─────────────────────────────────────── */}
      <section className="bg-ink py-20 px-[6%]">
        <div className="max-w-5xl mx-auto reveal">
          <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal-mid mb-2">chess-club-hub integration</p>
          <h2 className="font-serif text-[clamp(1.9rem,3vw,2.6rem)] text-white tracking-tight max-w-xl">Content that lives inside your chess platform.</h2>
          <p className="text-white/55 mt-4 max-w-lg leading-relaxed">Anchor Studio connects directly with chess-club-hub — every game, tournament, and player milestone becomes content automatically.</p>
          <Link href="/integration" className="inline-block mt-6 text-teal-mid text-[0.9rem] font-medium hover:text-white transition-colors">
            See all 6 integration points →
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="bg-white py-20 px-[6%]" id="how">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">The process</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">From brief to published in 1–3 days.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.num} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="font-serif text-[3rem] text-teal-light leading-none mb-3">{step.num}</div>
                <div className="font-medium text-[0.95rem] mb-2">{step.title}</div>
                <div className="text-[0.85rem] text-mid leading-relaxed">{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────────── */}
      <section className="bg-warm py-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">Why Anchor Studio</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">Agency results. Not agency prices.</h2>
          </div>
          <div className="overflow-x-auto mt-8 reveal" style={{ transitionDelay: '0.1s' }}>
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-rule text-[0.87rem]">
              <thead>
                <tr>
                  <th className="bg-ink text-white/50 text-left px-5 py-3 text-[0.75rem] font-semibold tracking-wider uppercase"></th>
                  <th className="bg-ink text-white/50 px-5 py-3 text-[0.75rem] font-semibold tracking-wider uppercase">Traditional Agency</th>
                  <th className="bg-ink text-white/50 px-5 py-3 text-[0.75rem] font-semibold tracking-wider uppercase">Freelancer</th>
                  <th className="bg-teal text-white px-5 py-3 text-[0.75rem] font-semibold tracking-wider uppercase">Anchor Studio</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(row => (
                  <tr key={row.label} className="border-b border-rule last:border-0">
                    <td className="px-5 py-3 font-medium text-ink">{row.label}</td>
                    <td className="px-5 py-3 text-mid text-center">{row.agency}</td>
                    <td className="px-5 py-3 text-mid text-center">{row.freelancer}</td>
                    <td className="px-5 py-3 text-teal font-semibold text-center bg-teal-light/30">{row.anchor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── NICHES ────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">Who we serve</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight max-w-xl">Built for businesses that run on trust — and boards.</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-8 reveal" style={{ transitionDelay: '0.1s' }}>
            {NICHES.map(n => (
              <div key={n.label} className={`p-4 rounded-xl border transition-colors ${n.best ? 'bg-[#FBF3E0] border-[rgba(201,168,76,0.4)]' : 'bg-warm border-rule hover:border-teal-mid'}`}>
                <div className="font-medium text-[0.88rem] text-ink">{n.label}</div>
                <div className="text-[0.72rem] text-mid mt-1">{n.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────── */}
      <section className="bg-warm py-20 px-[6%]" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">Pricing</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">Simple packages. No surprises.</h2>
            <p className="text-mid mt-3">All plans include a 30-day cancellation guarantee.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 reveal" style={{ transitionDelay: '0.1s' }}>
            {PRICING.map(plan => (
              <div key={plan.name} className={`rounded-xl border p-7 flex flex-col relative transition-all hover:-translate-y-0.5 ${plan.popular ? 'bg-ink border-ink' : 'bg-white border-rule hover:border-teal-mid'}`}>
                {plan.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-teal text-white text-[0.68rem] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <div className={`text-[0.72rem] font-semibold uppercase tracking-widest mb-2 ${plan.popular ? 'text-white/45' : 'text-mid'}`}>{plan.name}</div>
                <div className={`font-serif text-[2.2rem] leading-none ${plan.popular ? 'text-white' : 'text-ink'}`}>{plan.price}</div>
                <div className={`text-[0.85rem] mb-5 ${plan.popular ? 'text-white/40' : 'text-mid'}`}>{plan.period}</div>
                <hr className={`border-t mb-5 ${plan.popular ? 'border-white/12' : 'border-rule'}`} />
                <ul className="flex flex-col gap-2 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className={`flex gap-2 items-start text-[0.85rem] ${plan.popular ? 'text-white/65' : 'text-mid'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[0.6rem] font-bold mt-0.5 flex-shrink-0 ${plan.popular ? 'bg-teal/30 text-teal-mid' : 'bg-teal-light text-teal'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
                   className={`block text-center py-2.5 rounded-lg text-[0.88rem] font-medium transition-colors ${plan.popular ? 'bg-teal text-white hover:bg-teal-dark' : 'border border-rule text-ink hover:bg-ink hover:text-white hover:border-ink'}`}>
                  Get started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-teal py-20 px-[6%] text-center">
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-white tracking-tight">Ready to think three moves ahead?</h2>
        <p className="text-white/70 mt-4 max-w-md mx-auto">Free 30-minute call. No pitch — just a clear plan for your content.</p>
        <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
           className="inline-block mt-8 bg-white text-teal px-8 py-3.5 rounded-lg text-[0.92rem] font-medium hover:bg-teal-light transition-colors">
          Book your free discovery call →
        </a>
      </section>

      <Footer />
      <ChatBot />
    </>
  );
}
