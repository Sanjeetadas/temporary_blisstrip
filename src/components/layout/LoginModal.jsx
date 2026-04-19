import { useState } from 'react';
import { X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [mobileNumber, setMobileNumber] = useState('');

  if (!isOpen) return null;

  const handleContinue = () => {
    // Temporarily store in local storage as requested
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userMobile', mobileNumber);
    onClose();
    window.location.reload(); // Quick refresh to update auth state if needed
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative flex w-[850px] max-w-[95%] h-[500px] overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-slate-100"
        >
          <X size={18} className="text-slate-700" />
        </button>

        {/* Left Side (Image & Text) */}
        <div 
          className="relative w-2/5 p-8 text-white flex flex-col justify-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506905925246-bb1141cc4302?auto=format&fit=crop&q=80&w=800")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10">
            <h2 className="mb-8 text-3xl font-extrabold leading-tight">
              Sign up/Login now to
            </h2>
            <ul className="space-y-6 font-semibold">
              <li className="flex items-center gap-4">
                <span className="text-2xl">✈️</span>
                <span>Lock Flight Prices & Pay Later</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-2xl">🏨</span>
                <span>Book Hotels @ ₹0</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-2xl">🚆</span>
                <span>Get 3X refund, if your waitlisted train doesn't get confirmed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex w-3/5 flex-col p-10 bg-white">
          {/* Tabs */}
          <div className="mb-8 flex rounded-full border border-slate-200 p-1 shadow-sm">
            <button className="flex-1 rounded-full bg-blue-600 py-2 text-sm font-bold text-white shadow">
              PERSONAL ACCOUNT
            </button>
            <button className="flex-1 rounded-full py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
              MYBIZ ACCOUNT
            </button>
          </div>

          <label className="mb-2 text-sm font-bold text-slate-700">
            Mobile Number
          </label>
          <div className="mb-6 flex overflow-hidden rounded border border-slate-300 focus-within:border-blue-500">
            <div className="flex items-center bg-white px-3 border-r border-slate-300">
              <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5" />
              <span className="ml-2 text-sm font-semibold">+91</span>
              <span className="ml-1 text-blue-500 text-xs">∨</span>
            </div>
            <input 
              type="tel"
              className="w-full px-4 py-3 text-sm outline-none font-semibold"
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <button 
            onClick={handleContinue}
            className={`mb-8 w-full rounded py-3 font-bold text-white transition ${
              mobileNumber.length >= 10 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-200 cursor-not-allowed'
            }`}
          >
            CONTINUE
          </button>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative bg-white px-4 text-xs font-semibold text-slate-500">
              Or Login/Signup With
            </span>
          </div>

          <div className="flex justify-center gap-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 hover:shadow-md transition">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" alt="Google" />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 hover:shadow-md transition">
              <svg className="w-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </button>
          </div>

          <div className="mt-auto pt-8 text-center text-xs text-slate-500">
            By proceeding, you agree to MakeMyTrip's <span className="text-blue-500 cursor-pointer">Privacy Policy</span>, <span className="text-blue-500 cursor-pointer">User Agreement</span> and <span className="text-blue-500 cursor-pointer">T&Cs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
