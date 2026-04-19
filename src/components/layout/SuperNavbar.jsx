import { Link } from 'react-router-dom';
import { CircleUserRound, Globe2, Briefcase, Percent, Heart } from 'lucide-react';

export default function SuperNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 flex items-center justify-between py-2.5">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="https://promos.makemytrip.com/Growth/Images/1x/mmt_dt_top_icon.png" alt="MakeMyTrip" className="h-8" />
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-6 text-xs font-semibold">
          <div className="hidden lg:flex items-center gap-2 border border-dashed border-white/40 rounded px-2 py-1 cursor-pointer hover:bg-white/10 transition">
            <Percent size={14} className="text-yellow-400" />
            <div className="flex flex-col leading-tight">
              <span className="text-white/80">List Your Property</span>
              <span className="text-white">Start earning</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 border border-dashed border-white/40 rounded px-2 py-1 cursor-pointer hover:bg-white/10 transition">
            <Briefcase size={14} className="text-blue-400" />
            <div className="flex flex-col leading-tight">
              <span className="text-white/80">Introducing myBiz</span>
              <span className="text-white">Business Travel Solution</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-brand-500 transition">
            <Briefcase size={14} className="text-white/80" />
            <div className="flex flex-col leading-tight">
              <span className="text-white/80">My Trips</span>
              <span className="text-white">Manage your bookings</span>
            </div>
          </div>
          
          <button className="flex items-center gap-2 rounded bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 font-bold text-white shadow hover:scale-[1.02] transition">
            <div className="bg-white/20 rounded-full p-0.5">
              <CircleUserRound size={16} />
            </div>
            Login or Create Account
          </button>

          <div className="hidden md:flex items-center gap-1 bg-white/10 px-2 py-1 rounded cursor-pointer hover:bg-white/20 transition">
            <span className="text-[10px] font-bold text-yellow-400 border border-yellow-400 rounded-sm px-0.5 mr-1">IN</span>
            <span>INR | Eng</span>
            <Globe2 size={12} className="ml-1" />
          </div>
        </div>
      </div>
    </header>
  );
}
