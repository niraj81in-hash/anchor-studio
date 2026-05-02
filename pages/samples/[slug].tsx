import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { PORTFOLIO_SAMPLES, SITE } from '@/lib/config';
import type { PortfolioSample } from '@/types';

interface Props {
  sample: PortfolioSample;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: PORTFOLIO_SAMPLES.map(s => ({ params: { slug: s.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const sample = PORTFOLIO_SAMPLES.find(s => s.slug === params?.slug);
  if (!sample) return { notFound: true };
  return { props: { sample } };
};

export default function SamplePage({ sample }: Props) {
  return (
    <>
      <Head>
        <title>{sample.title} — Sample Work — Anchor Studio</title>
        <meta name="description" content={sample.excerpt} />
      </Head>
      <Nav />

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <section className="bg-ink pt-32 pb-16 px-[6%]">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#portfolio"
            className="text-teal-mid text-[0.85rem] hover:text-white transition-colors mb-6 inline-block"
          >
            ← Back to sample work
          </Link>
          <div className="mt-2">
            <span className="text-[0.72rem] font-medium uppercase tracking-widest text-teal-mid bg-white/10 px-2 py-1 rounded">
              {sample.type}
            </span>
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,3rem)] text-white tracking-tight mt-4 max-w-2xl">
            {sample.title}
          </h1>
          <p className="text-white/55 mt-4 text-[1rem] leading-relaxed max-w-xl">
            {sample.excerpt}
          </p>
        </div>
      </section>

      {/* ── SAMPLE CONTENT ─────────────────────────────────────────── */}
      <section className="bg-warm py-16 px-[6%]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-rule rounded-xl p-8 sm:p-12">
            <p className="text-[0.75rem] uppercase tracking-widest text-mid mb-8 pb-4 border-b border-rule">
              Sample content — representative of actual deliverable quality
            </p>
            {sample.sections.map((section, i) => (
              <div key={i} className={i > 0 ? 'mt-8' : ''}>
                {section.heading && (
                  <h2 className="font-serif text-[1.15rem] text-ink font-medium mb-3">
                    {section.heading}
                  </h2>
                )}
                <p className="text-[0.95rem] text-mid leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-teal py-20 px-[6%] text-center">
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-white tracking-tight">
          Want content like this for your organization?
        </h2>
        <p className="text-white/70 mt-4 max-w-md mx-auto">
          Book a free 30-minute strategy call. No pitch, no pressure — just a conversation about your content goals.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-teal px-8 py-3.5 rounded-lg text-[0.92rem] font-medium hover:bg-teal-light transition-colors"
          >
            Book your free discovery call →
          </a>
          <Link
            href="/#portfolio"
            className="border border-white/40 text-white px-8 py-3.5 rounded-lg text-[0.92rem] font-medium hover:border-white hover:bg-white/10 transition-colors"
          >
            See more samples
          </Link>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </>
  );
}
