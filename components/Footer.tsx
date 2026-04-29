import Link from 'next/link';
import { SITE } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/5 px-[6%] py-8 flex flex-wrap items-center justify-between gap-4">
      <Link href="/" className="font-serif text-white no-underline text-[1rem]">
        Anchor<span className="text-teal-mid">Studio</span>
      </Link>
      <div className="flex flex-wrap gap-5">
        {[
          { label: 'Services',    href: '/#services'    },
          { label: 'Pricing',     href: '/#pricing'     },
          { label: 'About',       href: '/about'       },
          { label: 'Contact',     href: `mailto:${SITE.email}` },
        ].map(({ label, href }) => (
          <Link key={href} href={href} className="text-[0.78rem] text-white/40 hover:text-white transition-colors no-underline">
            {label}
          </Link>
        ))}
        <a href={`mailto:${SITE.email}`} className="text-[0.78rem] text-white/40 hover:text-white transition-colors">
          {SITE.email}
        </a>
      </div>
      <p className="text-[0.72rem] text-white/30 w-full sm:w-auto">
        © 2026 Anchor Studio · Founded by Nivaan in Metuchen, NJ
      </p>
    </footer>
  );
}
