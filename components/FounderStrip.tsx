import { FOUNDER } from '@/lib/config';

export default function FounderStrip() {
  return (
    <div className="bg-[#FBF3E0] border-t border-b border-[rgba(201,168,76,0.25)] py-12 px-[6%]">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">

        {/* NM Badge */}
        <div className="bg-slate rounded-2xl px-8 py-6 text-center min-w-[140px]">
          <div className="font-serif text-[2.8rem] text-[#C9A84C] leading-none">NM</div>
          <div className="text-[0.7rem] font-semibold text-white/50 tracking-widest uppercase mt-1">National Master</div>
          <div className="text-[1rem] font-medium text-white mt-2">{FOUNDER.name}</div>
        </div>

        {/* Bio */}
        <div>
          <p className="font-serif text-[1.1rem] text-ink leading-relaxed italic">
            <strong className="not-italic text-teal-dark">{FOUNDER.name}</strong> {FOUNDER.bio}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {FOUNDER.chips.map(chip => (
              <span
                key={chip}
                className="text-[0.73rem] font-medium px-3 py-1 rounded-full bg-white border border-[rgba(201,168,76,0.3)] text-ink"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
