import Link from 'next/link';
import { SITE } from '@/lib/config';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-md h-[62px] flex items-center justify-between px-[6%] border-b border-white/5">
      <Link href="/" className="font-serif text-[1.1rem] text-white no-underline tracking-tight">
        Anchor<span className="text-teal-mid">Studio</span>
      </Link>
      <div className="flex gap-7 items-center">
        <Link href="/services"     className="text-[0.85rem] font-medium text-white/60 hover:text-white transition-colors hidden sm:block">Services</Link>
        <Link href="/chess-clubs" className="text-[0.85rem] font-medium text-white/60 hover:text-white transition-colors hidden sm:block">For Chess Clubs</Link>
        <Link href="/pricing"      className="text-[0.85rem] font-medium text-white/60 hover:text-white transition-colors hidden sm:block">Pricing</Link>
        <Link href="/about"        className="text-[0.85rem] font-medium text-white/60 hover:text-white transition-colors hidden sm:block">About</Link>
        <a
          href={SITE.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal text-white text-[0.85rem] font-medium px-4 py-2 rounded-md hover:bg-teal-dark transition-colors"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
