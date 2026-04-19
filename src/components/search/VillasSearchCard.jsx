import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import Button from '../common/Button';
import SearchAutocompleteField from './SearchAutocompleteField';

export default function VillasSearchCard({ config }) {
  const [formValues, setFormValues] = useState({
    destination: 'Goa, India',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    pets: false,
    priceBand: '₹0-₹1500, ₹1500-₹2500...',
  });
  
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  // Handle click outside to close popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowGuestsPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(name, value) {
    setFormValues(prev => ({ ...prev, [name]: value }));
  }

  function handleDateChange(field, value) {
    setFormValues(prev => {
      const updates = { [field]: value };
      if (field === 'checkIn') {
        const newCheckIn = new Date(value);
        if (prev.checkOut) {
          const currentCheckOut = new Date(prev.checkOut);
          if (currentCheckOut <= newCheckIn) {
            const nextDay = new Date(newCheckIn);
            nextDay.setDate(nextDay.getDate() + 1);
            updates.checkOut = nextDay.toISOString().split('T')[0];
          }
        } else {
          const nextDay = new Date(newCheckIn);
          nextDay.setDate(nextDay.getDate() + 1);
          updates.checkOut = nextDay.toISOString().split('T')[0];
        }
      }
      return { ...prev, ...updates };
    });
  }

  function handleGuestChange(type, increment) {
    setFormValues(prev => {
      const current = prev[type];
      const next = current + increment;
      if (type === 'adults' && (next < 1 || next > 20)) return prev;
      if (type === 'children' && (next < 0 || next > 10)) return prev;
      return { ...prev, [type]: next };
    });
  }

  function handleSubmit(event) {
    if (event) event.preventDefault();
    const query = { ...formValues };
    navigate(`/${config.slug}/results?${buildQueryString(query)}`);
  }

  function handleGridClick(place) {
    navigate(`/${config.slug}/results?destination=${encodeURIComponent(place)}`);
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const checkOutMinStr = formValues.checkIn 
    ? new Date(new Date(formValues.checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : todayStr;

  const displayGuests = formValues.adults + formValues.children === 0 
    ? 'Add Adults & Children' 
    : `${formValues.adults} Adults${formValues.children > 0 ? `, ${formValues.children} Children` : ''}`;

  const homestayPlaces = [
    { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=100&h=100&fit=crop' },
    { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=100&h=100&fit=crop' },
    { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=100&h=100&fit=crop' },
    { name: 'Mukteshwar', image: 'https://images.unsplash.com/photo-1626714485741-6e118029d2b2?w=100&h=100&fit=crop' },
    { name: 'Gokarna', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=100&h=100&fit=crop' },
    { name: 'Coonoor', image: 'https://images.unsplash.com/photo-1588806297379-055ea06bd4c3?w=100&h=100&fit=crop' },
    { name: 'Kasol', image: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=100&h=100&fit=crop' },
    { name: 'Malvan', image: 'https://images.unsplash.com/photo-1605335198285-797ee482d8c8?w=100&h=100&fit=crop' },
    { name: 'Jibhi', image: 'https://images.unsplash.com/photo-1596706798031-7b03baf8b54e?w=100&h=100&fit=crop' },
  ];

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="px-2 pb-6 pt-2">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="text-[15px] font-bold text-slate-800">
            Book your ideal Homestay - Villas, Apartments & more.
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch border border-slate-200 rounded-[10px] divide-y md:divide-y-0 md:divide-x divide-slate-200 relative pb-12 md:pb-0">
          <div className="flex-[1.8] relative flex flex-col justify-start">
            <SearchAutocompleteField
              label="City, Property Name Or Location"
              name="destination"
              value={formValues.destination}
              placeholder="Goa, India"
              onChange={handleChange}
            />
            {/* Recent Searches visual (Matches Screenshot 2) */}
            <div className="absolute top-[80px] left-4 flex items-center gap-2">
               <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Recent Searches:</span>
               <div className="flex gap-2 overflow-hidden">
                 <div className="flex flex-col bg-slate-50 border border-slate-100 rounded px-2 py-1 cursor-pointer hover:bg-slate-100">
                   <span className="text-[10px] font-bold text-slate-700">Goa, India</span>
                   <span className="text-[9px] text-slate-500">24 Apr '26 to 27 May '26</span>
                 </div>
                 <div className="flex flex-col bg-slate-50 border border-slate-100 rounded px-2 py-1 cursor-pointer hover:bg-slate-100">
                   <span className="text-[10px] font-bold text-slate-700">Goa</span>
                   <span className="text-[9px] text-slate-500">24 Apr '26 to 27 May '26</span>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="flex-[1] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group">
            <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
              Check-In <span className="text-blue-500">∨</span>
            </label>
            <div className={`w-full truncate ${formValues.checkIn ? 'text-3xl font-black text-ink' : 'text-xl font-bold text-slate-400'}`}>
               {formValues.checkIn ? new Date(formValues.checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, " '") : 'Select Date'}
            </div>
            <input 
              type="date" 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              value={formValues.checkIn}
              min={todayStr}
              onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
              onChange={e => handleDateChange('checkIn', e.target.value)}
            />
            {formValues.checkIn && (
              <div className="text-xs text-slate-400 mt-1 truncate">
                {new Date(formValues.checkIn).toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
            )}
          </div>
          
          <div className="flex-[1] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group">
            <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
              Check-Out <span className="text-blue-500">∨</span>
            </label>
            <div className={`w-full truncate ${formValues.checkOut ? 'text-3xl font-black text-ink' : 'text-xl font-bold text-slate-400'}`}>
               {formValues.checkOut ? new Date(formValues.checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, " '") : 'Select Date'}
            </div>
            <input 
              type="date" 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              value={formValues.checkOut}
              min={checkOutMinStr}
              onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
              onChange={e => handleDateChange('checkOut', e.target.value)}
            />
            {formValues.checkOut && (
              <div className="text-xs text-slate-400 mt-1 truncate">
                {new Date(formValues.checkOut).toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
            )}
          </div>

          {/* Guests Section with Custom Popup */}
          <div 
            className="flex-[1] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group"
            onClick={() => setShowGuestsPopup(true)}
          >
            <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
              Guests <span className="text-blue-500">∨</span>
            </label>
            <div className={`w-full truncate ${displayGuests !== 'Add Adults & Children' ? 'text-xl font-black text-ink' : 'text-base font-bold text-slate-500 whitespace-normal leading-tight'}`}>
              {displayGuests}
            </div>

            {/* Custom Guests Popup */}
            {showGuestsPopup && (
              <div 
                ref={popupRef}
                className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[400px] bg-white rounded-lg shadow-2xl z-50 p-6 border border-slate-100 cursor-default"
                onClick={e => e.stopPropagation()}
              >
                <div className="space-y-6">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">Adults</span>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => handleGuestChange('adults', -1)}
                        className={`w-8 h-8 rounded border flex items-center justify-center font-bold text-lg ${formValues.adults <= 1 ? 'border-slate-200 text-slate-300' : 'border-blue-500 text-blue-500 bg-blue-50'}`}
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold">{formValues.adults}</span>
                      <button 
                        type="button"
                        onClick={() => handleGuestChange('adults', 1)}
                        className="w-8 h-8 rounded border border-blue-500 text-blue-500 bg-blue-50 flex items-center justify-center font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">Children</span>
                      <span className="text-[10px] text-slate-400">0 - 17 Years Old</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => handleGuestChange('children', -1)}
                        className={`w-8 h-8 rounded border flex items-center justify-center font-bold text-lg ${formValues.children <= 0 ? 'border-slate-200 text-slate-300' : 'border-blue-500 text-blue-500 bg-blue-50'}`}
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold">{formValues.children}</span>
                      <button 
                        type="button"
                        onClick={() => handleGuestChange('children', 1)}
                        className="w-8 h-8 rounded border border-blue-500 text-blue-500 bg-blue-50 flex items-center justify-center font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-tight">
                    Please provide right number of children along with their right age for best options and prices.
                  </p>

                  {/* Pets */}
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={formValues.pets}
                      onChange={e => handleChange('pets', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-blue-500"
                    />
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-slate-800">Are you travelling with pets?</span>
                      <span className="text-[10px] text-slate-500 mt-1">
                        Selecting this option will show only pet-friendly properties. Please review the pet policies & applicable fees, if any.
                      </span>
                    </div>
                    <span className="text-slate-400 text-2xl rotate-45">🐾</span>
                  </label>

                  <div className="flex justify-end mt-4">
                    <Button 
                      type="button" 
                      onClick={() => setShowGuestsPopup(false)}
                      className="bg-[#008cff] text-white font-bold px-8 py-2 rounded-full shadow-md text-sm uppercase"
                    >
                      APPLY
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-[1] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group rounded-r-[10px]">
            <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
              Price Per Night <span className="text-blue-500">∨</span>
            </label>
            <div className="w-full text-sm font-bold text-slate-800 whitespace-normal leading-tight pr-4">
              {formValues.priceBand}
            </div>
            <select 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              value={formValues.priceBand}
              onChange={e => handleChange('priceBand', e.target.value)}
            >
              {['₹0-₹1500, ₹1500-₹2500...', '₹0 - ₹1500', '₹1500 - ₹3500', '₹3500 - ₹7000', '₹7000+'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-center absolute -bottom-6 left-1/2 -translate-x-1/2 z-10">
          <Button type="submit" className="min-w-[220px] text-xl shadow-xl py-4 px-10 rounded-full font-extrabold bg-[#008cff] text-white">
            SEARCH
          </Button>
        </div>
      </form>

      {/* Homestay Places Grid directly below search box */}
      <div className="w-full mt-14 bg-white rounded-xl shadow-md border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homestayPlaces.map((place) => (
            <div 
              key={place.name} 
              className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition"
              onClick={() => handleGridClick(place.name)}
            >
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 text-lg leading-tight">{place.name}</span>
                <span className="text-xs text-slate-500 mt-1">Homestays - Villas & Apts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
