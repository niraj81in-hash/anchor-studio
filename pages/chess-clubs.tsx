import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { SITE, PRICING } from '@/lib/config';

const INTEGRATIONS = [
  {
    badge: 'db.js',
    title: 'Tournament recaps',
    desc: 'Auto-generated summaries after every tournament. Turn results and standings into polished club newsletters and recap posts.',
  },
  {
    badge: 'Player',
    title: 'Player spotlights',
    desc: 'Monthly features pulled from rating milestones and achievements so your members feel recognized and engaged.',
  },
  {
    badge: 'Game',
    title: 'Game highlights',
    desc: 'Annotated notable games from club play to teach strategy, celebrate performance, and build club storytelling.',
  },
  {
    badge: 'News',
    title: 'Newsletter content',
    desc: 'Ready-to-send club newsletter drafts that keep parents, members, and sponsors up to date without extra work.',
  },
  {
    badge: 'Social',
    title: 'Social media posts',
    desc: 'Shareable captions and post ideas built from club activity, tournaments, and member milestones.',
  },
  {
    badge: 'Coach',
    title: 'Coaching content',
    desc: 'Lesson recaps and training resources designed for club members, coaches, and tournament prep.',
  },
];

const chessPlan = PRICING.find(plan => plan.name === 'Chess Club');

export default function ChessClubsPage() {
  return (
    <>
      <Head>
        <title>Chess Club Content & Newsletter Service — Anchor Studio</title>
        <meta
          name="description"
          content="Done-for-you newsletters, tournament recaps, and player spotlights for chess clubs. Native chess-club-hub integration. Founded by a Chess National Master."
        />
        <meta property="og:title" content="Chess Club Content & Newsletter Service — Anchor Studio" />
        <meta
          property="og:description"
          content="Done-for-you newsletters, tournament recaps, and player spotlights for chess clubs. Native chess-club-hub integration. Founded by a Chess National Master."
        />
        <meta property="og:url" content={`${SITE.domain}/chess-clubs`} />
      </Head>

      <Nav />

      <section className="bg-ink pt-32 pb-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.3)] rounded-full px-4 py-1.5 text-[0.73rem] font-medium text-[#C9A84C] tracking-widest uppercase mb-7">
            <span>♛</span> Founded by a Chess National Master
          </div>
          <h1 className="font-serif text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.06] text-white tracking-tight max-w-3xl">
            Your chess club deserves content as strategic as your games.
          </h1>
          <p className="text-[1.05rem] text-white/60 max-w-2xl mt-5 leading-relaxed">
            Anchor Studio connects directly with chess-club-hub — every game, tournament, and player milestone becomes content automatically. Built by a National Master who understands the chess community.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal text-white px-7 py-3.5 rounded-lg text-[0.92rem] font-medium hover:bg-teal-dark transition-colors"
            >
              Book a free discovery call
            </a>
            <a
              href="#integration"
              className="text-white/80 border border-white/20 px-7 py-3.5 rounded-lg text-[0.92rem] font-medium hover:border-white/50 hover:text-white transition-colors"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-[6%]" id="integration">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">Integration</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">Content that lives inside your chess platform.</h2>
            <p className="text-mid mt-4 max-w-2xl leading-relaxed">
              6 native integration points with chess-club-hub, built to turn your club activity into content without extra work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {INTEGRATIONS.map(point => (
              <div key={point.title} className="border border-rule rounded-2xl p-6 bg-warm">
                <div className="text-[0.68rem] font-semibold uppercase tracking-widest text-teal mb-3">{point.badge}</div>
                <div className="font-medium text-ink text-[1.05rem] mb-3">{point.title}</div>
                <p className="text-mid text-[0.93rem] leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal-light mb-2">Why Anchor Studio for chess clubs</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-white tracking-tight">Why chess clubs choose Anchor Studio</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="font-medium text-white text-[1rem] mb-3">Built by a National Master</div>
              <p className="text-white/60 text-[0.95rem] leading-relaxed">
                Nivaan holds the National Master title — a distinction held by fewer than 2% of rated players. He understands chess culture, terminology, and what club members actually want to read.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="font-medium text-white text-[1rem] mb-3">Native chess-club-hub integration</div>
              <p className="text-white/60 text-[0.95rem] leading-relaxed">
                No copy-pasting, no manual exports. Your club&apos;s games, tournaments, and milestones flow directly into polished content.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="font-medium text-white text-[1rem] mb-3">Done for you</div>
              <p className="text-white/60 text-[0.95rem] leading-relaxed">
                You run the club. We handle the content. Review and approve in under 15 minutes per month.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="font-medium text-white text-[1rem] mb-3">Cancel anytime</div>
              <p className="text-white/60 text-[0.95rem] leading-relaxed">
                30-day cancellation guarantee. No contracts, no lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">What club organizers say</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">What club organizers say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {[
              { quote: '[Testimonial coming soon]', author: 'Club Organizer, [City]' },
              { quote: '[Testimonial coming soon]', author: 'Academy Director, [City]' },
            ].map((item, index) => (
              <div key={index} className="bg-warm border border-rule rounded-xl p-8">
                <div className="text-ink italic text-[1.05rem] mb-5">&ldquo;{item.quote}&rdquo;</div>
                <div className="text-mid text-[0.9rem]">— {item.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm py-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-2">Pricing</p>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] text-ink tracking-tight">Chess Club Content — Simple pricing.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
            {chessPlan ? (
              <div className="rounded-xl border p-7 bg-white border-rule">
                <div className="text-[0.72rem] font-semibold uppercase tracking-widest mb-2 text-mid">{chessPlan.name}</div>
                <hr className="border-t mb-5 border-rule" />
                <ul className="flex flex-col gap-2 mb-6">
                  {chessPlan.features.map(feature => (
                    <li key={feature} className="flex gap-2 items-start text-[0.85rem] text-mid">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[0.6rem] font-bold mt-0.5 flex-shrink-0 bg-teal-light text-teal">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 rounded-lg bg-teal text-white text-[0.88rem] font-medium hover:bg-teal-dark transition-colors"
                >
                  Let&apos;s Talk
                </a>
              </div>
            ) : null}
            <div className="flex items-end text-[0.92rem] text-mid leading-relaxed">
              <p>
                Need more than club content?{' '}
                <Link href="/pricing" className="text-teal font-semibold hover:text-teal-dark">
                  See our full service packages.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal py-20 px-[6%] text-center">
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-white tracking-tight">Ready to put your club&apos;s content on autopilot?</h2>
        <p className="text-white/70 mt-4 max-w-md mx-auto">Free 30-minute call. We&apos;ll walk through your club&apos;s needs and show you exactly how the chess-club-hub integration works.</p>
        <a
          href={SITE.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-white text-teal px-8 py-3.5 rounded-lg text-[0.92rem] font-medium hover:bg-teal-light transition-colors"
        >
          Book your free discovery call →
        </a>
      </section>

      <Footer />
      <ChatBot />
    </>
  );
}
