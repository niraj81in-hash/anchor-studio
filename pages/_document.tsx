import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0E1A12" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {/* Open Graph defaults (pages can override) */}
        <meta property="og:site_name" content="Anchor Studio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.getanchorstudio.com/og-image.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://www.getanchorstudio.com/og-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
