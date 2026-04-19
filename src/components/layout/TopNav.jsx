import { CircleUserRound, Globe2, Heart, Ticket } from 'lucide-react';

export default function TopNav() {
  return (
    <div className="bg-[#0c1730]/80 text-white backdrop-blur">
      <div className="page-shell flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-11 w-14 rounded-xl border border-white/30 bg-white/10" aria-label="Logo placeholder" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">Travel platform</p>
            <h1 className="text-xl font-extrabold tracking-tight">BLISSTRIP</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="rounded-pill border border-white/20 bg-white/10 px-4 py-2">List Your Property</div>
          <div className="rounded-pill border border-white/20 bg-white/10 px-4 py-2">Corporate Travel</div>
          <div className="hidden items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-2 md:flex">
            <Heart size={16} />
            Wishlist
          </div>
          <div className="hidden items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-2 md:flex">
            <Ticket size={16} />
            My Trips
          </div>
          <div className="flex items-center gap-2 rounded-pill bg-brand-500 px-4 py-2 font-semibold">
            <CircleUserRound size={16} />
            Login or Create Account
          </div>
          <div className="flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-2">
            <Globe2 size={16} />
            INR | English
          </div>
        </div>
      </div>
    </div>
  );
}
