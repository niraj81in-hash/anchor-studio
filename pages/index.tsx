import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FounderStrip from '@/components/FounderStrip';
import ChatBot from '@/components/ChatBot';
import { SITE, SERVICES, PRICING, HOW_IT_WORKS, PORTFOLIO_SAMPLES, POSITIONING, NICHES } from '@/lib/config';

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
        <title>Anchor Studio — Done-for-You Content for Growing Businesses</title>
        <meta name="description" content="Agency-quality blog posts, social content, and email sequences — delivered in days, not weeks, at a fraction of agency pricing." />
        <meta property="og:title" content="Anchor Studio — Done-for-You Content for Growing Businesses" />
        <meta property="og:description" content="Your content team — without the team. AI-accelerated content for growing businesses." />
        <meta property="og:url" content={SITE.domain} />
      </Head>

      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-ink flex flex-col justify-center px-[6%] pt-24 pb-20 relative overflow-hidden chess-pattern">
        {/* Radial glow */}
        <div className="absolute right-[-10%] top-[15%] w-[580px] h-[580px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(13,127,106,0.22) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-serif text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.06] text-white tracking-tight">
            I&apos;ll build your content engine —<br />
            <em className="text-teal-mid not-italic">so you can run your business.</em>
          </h1>

          <p className="text-[1.05rem] text-white/60 max-w-lg mt-5 leading-relaxed">
            I&apos;m Nivaan — I create blog posts, newsletters, social content, and email sequences for small businesses and chess clubs. Agency-quality work, solo-operator speed, founding-client pricing.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
               className="bg-teal text-white px-7 py-3.5 rounded-lg text-[0.92rem] font-medium hover:bg-teal-dark transition-colors">
              Book a free discovery call
            </a>
            <Link href="#portfolio"
               className="text-white/80 border border-white/20 px-7 py-3.5 rounded-lg text-[0.92rem] font-medium hover:border-white/50 hover:text-white transition-colors">
              See sample work
            </Link>
          </div>

          {/* Commitments */}
          <div className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/10">
            {[
              { n: '72hrs',    l: 'First batch delivered'    },
              { n: '15min',  l: 'Monthly time on your end' },
              { n: 'Cancel',    l: 'After month one if not working' },
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
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">What I deliver</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">Four done-for-you services.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule rounded-xl overflow-hidden mt-10 reveal" style={{ transitionDelay: '0.1s' }}>
            {SERVICES.map(s => (
              <div key={s.name} className="bg-white p-7 hover:bg-[#fafaf8] transition-colors">
                <div className="text-2xl mb-4">{s.icon}</div>
                <div className="font-medium text-[0.95rem] text-ink mb-2">{s.name}</div>
                <div className="text-[0.85rem] text-mid leading-relaxed mb-4">{s.description}</div>
                <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
                   className="text-teal text-[0.9rem] font-medium hover:text-teal-dark transition-colors">
                  Get founding-client pricing →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────── */}
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

      {/* ── POSITIONING ───────────────────────────────────────────── */}
      <section className="bg-warm py-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">Why work with me</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">Agency results. Not agency prices.</h2>
          </div>
          <div className="bg-white border border-rule rounded-xl p-8 mt-8 reveal" style={{ transitionDelay: '0.1s' }}>
            <p className="text-[1.05rem] text-ink leading-relaxed mb-8">{POSITIONING.paragraph}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {POSITIONING.features.map((feature, i) => (
                <div key={feature.title} className="text-center">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <div className="font-medium text-[0.95rem] text-ink mb-2">{feature.title}</div>
                  <div className="text-[0.85rem] text-mid leading-relaxed">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO / SAMPLE WORK ───────────────────────────────── */}
      <section className="bg-white py-20 px-[6%]" id="portfolio">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">See the work</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight text-center">Sample content I&apos;ve created.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {PORTFOLIO_SAMPLES.map((sample, i) => (
              <div key={sample.title} className="reveal bg-warm border border-rule rounded-xl p-6" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[0.75rem] font-medium text-teal bg-teal-light px-2 py-0.5 rounded uppercase tracking-wider">{sample.type}</span>
                </div>
                <div className="font-medium text-[0.95rem] text-ink mb-3">{sample.title}</div>
                <div className="text-[0.85rem] text-mid leading-relaxed mb-4">{sample.excerpt}</div>
                <button className="text-teal text-[0.9rem] font-medium hover:text-teal-dark transition-colors">
                  Read full sample →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO I WORK WITH ───────────────────────────────────────── */}
      <section className="bg-white py-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">Who I work with</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">Built for two kinds of clients.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {NICHES.map((niche, i) => (
              <div key={niche.label} className="reveal bg-warm border border-rule rounded-xl p-8" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="font-medium text-[1.1rem] text-ink mb-3">{niche.label}</div>
                <div className="text-[0.95rem] text-mid leading-relaxed">{niche.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────── */}
      <section className="bg-warm py-20 px-[6%]" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">Founding-client pricing</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">Limited spots available.</h2>
            <p className="text-mid mt-3">These are founding-client rates — locked in permanently for early clients. Email sequence buildout and custom projects quoted separately.</p>
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
                {plan.price && (
                  <div className={`text-[2rem] font-serif font-medium mb-5 ${plan.popular ? 'text-white' : 'text-ink'}`}>{plan.price}</div>
                )}
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
                  Lock in this rate →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="bg-teal py-20 px-[6%] text-center">
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-white tracking-tight">Let&apos;s start with a conversation.</h2>
        <p className="text-white/70 mt-4 max-w-md mx-auto">Free 30-minute call. No pitch, no pressure. If I can help, I&apos;ll tell you how. If I can&apos;t, I&apos;ll tell you that too.</p>
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
