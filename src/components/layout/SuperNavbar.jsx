import { Link } from 'react-router-dom';
import { CircleUserRound, Globe2, Briefcase, Percent, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import CategoryTabs from './CategoryTabs';
import LoginModal from './LoginModal';

export default function SuperNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-colors duration-200 ${scrolled ? 'bg-white shadow-md text-slate-800' : 'bg-[#000000] text-white'}`}>
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 flex items-center justify-between py-2.5 relative">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {scrolled ? (
              <img src="https://promos.makemytrip.com/Growth/Images/1x/mmt_dt_top_icon.png" alt="MakeMyTrip" className="h-8 brightness-0" />
            ) : (
              <img src="https://promos.makemytrip.com/Growth/Images/1x/mmt_dt_top_icon.png" alt="MakeMyTrip" className="h-8" />
            )}
          </Link>

          {/* Middle: Category Tabs (Only when scrolled) */}
          {scrolled && (
            <div className="hidden lg:flex flex-1 justify-center items-center px-4 overflow-hidden">
              <div className="scale-[0.8] xl:scale-90 origin-center whitespace-nowrap">
                <CategoryTabs className="!shadow-none !bg-transparent !px-0" />
              </div>
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-4 xl:gap-5 text-xs font-semibold shrink-0">
            {!scrolled && (
              <>
                <div className="hidden lg:flex items-center gap-2 border border-dashed border-white/40 rounded px-2 py-1 cursor-pointer hover:bg-white/10 transition">
                  <Percent size={14} className="text-yellow-400" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-white/80">List Your Property</span>
                    <span className="text-white">Start earning</span>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-2 border border-dashed border-white/40 rounded px-2 py-1 cursor-pointer hover:bg-white/10 transition">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-1 rounded-sm text-[10px]">myBiz</div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-white/80">Introducing myBiz</span>
                    <span className="text-white">Business Travel Solution</span>
                  </div>
                </div>
              </>
            )}

            <div onClick={() => !isLoggedIn && setModalOpen(true)} className="hidden md:flex items-center gap-2 cursor-pointer transition group">
              <Heart size={16} className={scrolled ? 'text-pink-500 fill-pink-500' : 'text-pink-500 fill-pink-500'} />
              <div className="flex flex-col leading-tight">
                <span className={`font-bold group-hover:text-blue-500 ${scrolled ? 'text-slate-800' : 'text-white'}`}>Wishlist</span>
                <span className={scrolled ? 'text-slate-500 font-normal' : 'text-white/80'}>Save favourites</span>
              </div>
            </div>

            <div onClick={() => !isLoggedIn && setModalOpen(true)} className="hidden md:flex items-center gap-2 cursor-pointer transition group">
              <div className={`p-1 rounded-full ${scrolled ? 'bg-slate-100 text-slate-500' : 'bg-white/10 text-white'}`}>
                <Briefcase size={14} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`font-bold group-hover:text-blue-500 ${scrolled ? 'text-slate-800' : 'text-white'}`}>My Trips</span>
                <span className={scrolled ? 'text-slate-500 font-normal' : 'text-white/80'}>Manage bookings</span>
              </div>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-2 rounded px-4 py-2 font-bold transition cursor-pointer">
                <div className={`rounded-full p-1 border ${scrolled ? 'border-slate-300 text-slate-700' : 'border-white/50 text-white'}`}>
                  <CircleUserRound size={16} />
                </div>
                <div className={`flex flex-col leading-tight ${scrolled ? 'text-slate-800' : 'text-white'}`}>
                  <span>Hi, User</span>
                </div>
              </div>
            ) : (
              <button onClick={() => setModalOpen(true)} className={`flex items-center gap-2 rounded px-4 py-2 font-bold shadow hover:scale-[1.02] transition ${
                scrolled 
                ? 'bg-gradient-to-r from-[#008cff] to-[#008cff] text-white rounded-md' 
                : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
              }`}>
                {scrolled ? (
                  <>
                    <div className="bg-white/20 rounded-full p-0.5">
                      <CircleUserRound size={16} />
                    </div>
                    Login or Create Account
                  </>
                ) : (
                  <>
                    <div className="bg-white/20 rounded-full p-0.5">
                      <CircleUserRound size={16} />
                    </div>
                    Login or Create Account
                  </>
                )}
              </button>
            )}

            <div className={`hidden md:flex flex-col items-start px-2 py-1 rounded cursor-pointer transition ${
              scrolled ? 'text-slate-800' : 'text-white hover:bg-white/10'
            }`}>
              <div className="text-[10px] text-slate-500">{scrolled ? 'Country' : ''}</div>
              <div className="flex items-center gap-1">
                <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-4 h-3" />
                <span className="font-bold">{scrolled ? 'India' : 'INR | Eng'}</span>
                <Globe2 size={10} className="ml-0.5 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <LoginModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
