import Head from 'next/head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { SITE, PRICING, COMPARE_ROWS } from '@/lib/config';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing — Anchor Studio</title>
        <meta name="description" content="Simple, fixed-price content packages from $500/month. No custom quotes, no surprises. Cancel anytime." />
      </Head>
      <Nav />

      <section className="bg-warm min-h-screen pt-32 pb-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-3">Pricing</p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-ink tracking-tight">Simple packages. No surprises.</h1>
          <p className="text-mid mt-4 text-[1rem]">Fixed prices, no custom quotes, cancel anytime with 30 days notice.</p>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
            {PRICING.map(plan => (
              <div key={plan.name} className={`rounded-xl border p-8 flex flex-col relative transition-all ${plan.popular ? 'bg-ink border-ink' : 'bg-white border-rule'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-white text-[0.68rem] font-semibold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Most Popular</span>
                )}
                {plan.chessHub && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-white text-[0.68rem] font-semibold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">♟ Chess Hub</span>
                )}
                <div className={`text-[0.72rem] font-semibold uppercase tracking-widest mb-2 ${plan.popular ? 'text-white/45' : 'text-mid'}`}>{plan.name}</div>
                <div className={`font-serif text-[2.4rem] leading-none ${plan.popular ? 'text-white' : 'text-ink'}`}>{plan.price}</div>
                <div className={`text-[0.85rem] mb-6 ${plan.popular ? 'text-white/40' : 'text-mid'}`}>{plan.period}</div>
                <hr className={`border-t mb-6 ${plan.popular ? 'border-white/12' : 'border-rule'}`} />
                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className={`flex gap-2.5 items-start text-[0.85rem] ${plan.popular ? 'text-white/65' : 'text-mid'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[0.6rem] font-bold mt-0.5 flex-shrink-0 ${plan.popular ? 'bg-teal/30 text-teal-mid' : 'bg-teal-light text-teal'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
                   className={`block text-center py-3 rounded-lg text-[0.88rem] font-medium transition-colors ${plan.popular ? 'bg-teal text-white hover:bg-teal-dark' : 'border border-rule text-ink hover:bg-ink hover:text-white hover:border-ink'}`}>
                  Get started
                </a>
              </div>
            ))}
          </div>

          {/* One-time projects */}
          <div className="mt-16">
            <h2 className="font-serif text-[1.8rem] text-ink tracking-tight mb-6">One-time projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'Email Sequence Buildout', price: '$1,200', desc: '3–5 email sequence written once, working forever' },
                { name: 'AI Chatbot Setup',         price: '$2,500 + $300/mo', desc: 'Claude-powered chatbot for your website' },
                { name: 'AI Workflow Audit',        price: '$3,000', desc: 'Map and automate 3 business processes' },
              ].map(p => (
                <div key={p.name} className="bg-white border border-rule rounded-xl p-6 hover:border-teal-mid transition-colors">
                  <div className="font-medium text-ink mb-2">{p.name}</div>
                  <div className="font-serif text-teal text-[1.4rem] mb-2">{p.price}</div>
                  <div className="text-mid text-[0.85rem]">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-16">
            <h2 className="font-serif text-[1.8rem] text-ink tracking-tight mb-6">How we compare</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-rule text-[0.87rem]">
                <thead>
                  <tr>
                    <th className="bg-ink text-white/50 text-left px-5 py-3 text-[0.75rem] uppercase tracking-wider"></th>
                    <th className="bg-ink text-white/50 px-5 py-3 text-[0.75rem] uppercase tracking-wider">Agency</th>
                    <th className="bg-ink text-white/50 px-5 py-3 text-[0.75rem] uppercase tracking-wider">Freelancer</th>
                    <th className="bg-teal text-white px-5 py-3 text-[0.75rem] uppercase tracking-wider">Anchor Studio</th>
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

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="font-serif text-[1.8rem] text-ink tracking-tight mb-6">Common questions</h2>
            <div className="flex flex-col gap-4">
              {[
                { q: 'Can I cancel anytime?',            a: 'Yes — 30 days notice on any plan. No long-term contracts, no cancellation fees.' },
                { q: 'How fast is the first delivery?',  a: 'First content batch within 24-48 hours of your onboarding questionnaire.' },
                { q: 'Do you work with chess clubs?',    a: 'Yes — our Chess Club tier at $500/month is purpose-built for clubs using chess-club-hub, with newsletter and tournament content included.' },
                { q: 'Who writes the content?',          a: 'Nivaan (Chess National Master) leads all content strategy and quality control. AI tools handle the draft; we ensure everything sounds authentically human.' },
              ].map(({ q, a }) => (
                <div key={q} className="bg-white border border-rule rounded-xl p-6">
                  <div className="font-medium text-ink mb-2">{q}</div>
                  <div className="text-mid text-[0.87rem] leading-relaxed">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </>
  );
}
