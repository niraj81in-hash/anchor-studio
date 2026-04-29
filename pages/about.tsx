import Head from 'next/head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { SITE, FOUNDER } from '@/lib/config';

export default function About() {
  return (
    <>
      <Head>
        <title>About Nivaan — Anchor Studio Founder</title>
        <meta name="description" content="Anchor Studio is founded by Nivaan, a Chess National Master, 8th grader, nationally recognized in competitive mathematics, published poet, and software builder." />
      </Head>
      <Nav />

      <section className="min-h-screen bg-ink pt-32 pb-20 px-[6%] relative overflow-hidden chess-pattern">
        <div className="absolute right-[-5%] top-[10%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(13,127,106,0.18) 0%, transparent 70%)' }} />
        <div className="max-w-3xl mx-auto relative z-10">

          <div className="inline-flex items-center gap-2 bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.3)] rounded-full px-4 py-1.5 text-[0.73rem] font-medium text-[#C9A84C] tracking-widest uppercase mb-7">
            ♛ {FOUNDER.title}
          </div>

          <h1 className="font-serif text-[clamp(2.4rem,5vw,4rem)] text-white leading-tight tracking-tight">
            {FOUNDER.name}
          </h1>
          <p className="text-teal-mid text-[1rem] mt-2">{FOUNDER.grade}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { n: 'NM',    l: 'National Master'   },
              { n: 'National Master', l: 'Chess title'       },
              { n: 'Elite',    l: 'Math honors'   },
              { n: '2',     l: 'Active ventures'   },
            ].map(({ n, l }) => (
              <div key={l} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                <div className="font-serif text-[1.8rem] text-teal-mid leading-none">{n}</div>
                <div className="text-[0.7rem] text-white/45 mt-1 uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>

          <p className="text-white/70 text-[1rem] leading-relaxed mt-10">{FOUNDER.bio}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {FOUNDER.chips.map(chip => (
              <span key={chip} className="text-[0.73rem] font-medium px-3 py-1 rounded-full bg-white/8 border border-white/15 text-white/70">{chip}</span>
            ))}
          </div>

          <div className="mt-12 pt-10 border-t border-white/10">
            <h2 className="font-serif text-white text-[1.6rem] mb-6">The connection between chess and content</h2>
            <p className="text-white/65 leading-relaxed mb-4">
              Chess at a National Master level requires exactly the same disciplines that make a great content strategist: pattern recognition (what has worked before?), long-game thinking (what builds authority over six months?), and systematic precision (what does this specific audience need to hear?).
            </p>
            <p className="text-white/65 leading-relaxed">
              Most content agencies produce generic output. Anchor Studio produces content built on the same analytical framework that drives elite chess — because the founder lives that framework every day.
            </p>
          </div>

          <div className="mt-10">
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
               className="inline-block bg-teal text-white px-7 py-3.5 rounded-lg text-[0.92rem] font-medium hover:bg-teal-dark transition-colors">
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
