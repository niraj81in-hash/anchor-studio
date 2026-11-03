import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { track } from '@vercel/analytics';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SITE } from '@/lib/config';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  // Track "Book a call" conversions: any click on a link to the Calendly
  // booking URL, from any page — so we don't have to instrument each CTA.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest('a');
      const href = anchor?.getAttribute('href') ?? '';
      if (href && (href.startsWith(SITE.calendly) || /calendly\.com/i.test(href))) {
        track('book_call', { path: window.location.pathname });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
      <Analytics />
    </ErrorBoundary>
  );
}
