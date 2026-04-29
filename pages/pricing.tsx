import Head from 'next/head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { SITE, PRICING, COMPARE_ROWS } from '@/lib/config';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Request Pricing — Anchor Studio</title>
        <meta name="description" content="Every business is different. Let's find the right plan for yours. Book a free strategy call to discuss custom pricing." />
      </Head>
      <Nav />

      <section className="bg-warm min-h-screen pt-32 pb-20 px-[6%]">
        <div className="max-w-5xl mx-auto">
<p className="text-[0.72rem] font-medium uppercase tracking-widest text-teal mb-3">Request Pricing</p>
        <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-ink tracking-tight">Every business is different. Let&apos;s find the right plan for yours.</h1>
        <p className="text-mid mt-4 text-[1rem]">Book a free 30-minute strategy call. We&apos;ll discuss your goals and create a custom plan — no pressure, no pitch.</p>

          {/* Calendly Embed */}
          <div className="mt-12 bg-white border border-rule rounded-xl p-8 text-center">
            <h2 className="font-serif text-[2rem] text-ink mb-4">Book Your Free Strategy Call</h2>
            <p className="text-mid mb-6 max-w-md mx-auto">Let&apos;s discuss your content needs and goals. We&apos;ll walk through options and find the perfect fit for your business.</p>
            <div className="bg-warm border border-rule rounded-lg p-6 mb-6">
              <div className="text-[0.85rem] text-mid mb-4">What we&apos;ll cover:</div>
              <ul className="text-left max-w-sm mx-auto space-y-2">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-teal rounded-full flex items-center justify-center text-white text-[0.7rem] font-bold">✓</span>
                  Your business goals and content needs
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-teal rounded-full flex items-center justify-center text-white text-[0.7rem] font-bold">✓</span>
                  Custom pricing options
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-teal rounded-full flex items-center justify-center text-white text-[0.7rem] font-bold">✓</span>
                  Timeline and next steps
                </li>
              </ul>
            </div>
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer"
               className="inline-block bg-teal text-white px-8 py-4 rounded-lg text-[1rem] font-medium hover:bg-teal-dark transition-colors">
              Schedule Your Free Call →
            </a>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="font-serif text-[1.8rem] text-ink tracking-tight mb-6">Common questions</h2>
            <div className="flex flex-col gap-4">
              {[
                { q: 'How does the discovery call work?', a: 'It&apos;s a free 30-minute conversation where we learn about your business, goals, and content needs. We&apos;ll discuss options and create a custom plan.' },
                { q: 'How fast is the first delivery?', a: 'First content batch within 24-48 hours of your onboarding questionnaire.' },
                { q: 'Do you work with chess clubs?', a: 'Yes — our Chess Club tier is purpose-built for clubs. Learn more on our dedicated chess club page at /chess-clubs.' },
                { q: 'Who writes the content?', a: 'Nivaan (Chess National Master) leads all content strategy and quality control. AI tools handle the draft; we ensure everything sounds authentically human.' },
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
