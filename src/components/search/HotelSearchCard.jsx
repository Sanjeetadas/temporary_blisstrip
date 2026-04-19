import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import Button from '../common/Button';
import SearchAutocompleteField from './SearchAutocompleteField';

export default function HotelSearchCard({ config }) {
  const [formValues, setFormValues] = useState({
    destination: 'Goa',
    checkIn: '',
    checkOut: '',
    rooms: 1,
    adults: 2,
    childrenCount: 0,
    hasPets: false,
    priceBand: '₹0-₹1500, ₹1500-₹2500...',
    bookingType: 'single', // 'single' (Upto 4 Rooms) or 'group'
  });
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const guestDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target)) {
        setIsGuestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(name, value) {
    setFormValues(prev => ({ ...prev, [name]: value }));
  }

  function handleGuestChange(field, delta) {
    setFormValues(prev => {
      let newValue = prev[field] + delta;
      if (field === 'rooms' && newValue < 1) newValue = 1;
      if (field === 'adults' && newValue < 1) newValue = 1;
      if (field === 'childrenCount' && newValue < 0) newValue = 0;
      
      let newBookingType = prev.bookingType;
      if (field === 'rooms' && newValue > 4) {
        newBookingType = 'group';
      } else if (field === 'rooms' && newValue <= 4 && prev.bookingType === 'group') {
        newBookingType = 'single';
      }

      return { ...prev, [field]: newValue, bookingType: newBookingType };
    });
  }

  function handleBookingTypeChange(type) {
    setFormValues(prev => {
      let newRooms = prev.rooms;
      if (type === 'single' && newRooms > 4) newRooms = 4;
      if (type === 'group' && newRooms <= 4) newRooms = 5;
      return { ...prev, bookingType: type, rooms: newRooms };
    });
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

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/${config.slug}/results?${buildQueryString(formValues)}`);
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const checkOutMinStr = formValues.checkIn 
    ? new Date(new Date(formValues.checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : todayStr;

  return (
    <form onSubmit={handleSubmit} className="px-2 pb-6 pt-2">
      {/* Radio Selector */}
      <div className="flex flex-wrap items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="bookingType" 
              value="single" 
              checked={formValues.bookingType === 'single'}
              onChange={() => handleBookingTypeChange('single')}
              className="w-4 h-4 text-blue-500 accent-blue-500 cursor-pointer" 
            />
            <span className={`text-sm font-bold ${formValues.bookingType === 'single' ? 'text-ink' : 'text-slate-500 group-hover:text-ink'}`}>Upto 4 Rooms</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="bookingType" 
              value="group" 
              checked={formValues.bookingType === 'group'}
              onChange={() => handleBookingTypeChange('group')}
              className="w-4 h-4 text-blue-500 accent-blue-500 cursor-pointer" 
            />
            <span className={`text-sm font-bold ${formValues.bookingType === 'group' ? 'text-ink' : 'text-slate-500 group-hover:text-ink'}`}>Group Deals</span>
            <span className="bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase leading-none mt-0.5">new</span>
          </label>
        </div>
        <div className="text-sm font-bold text-ink hidden md:block">
          Book Domestic and International Property Online. To list your property <span className="text-blue-500 cursor-pointer">Click Here</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch border border-slate-200 rounded-[10px] divide-y md:divide-y-0 md:divide-x divide-slate-200">
        <div className="flex-[1.5] relative">
          <SearchAutocompleteField
            label="City, Property Name Or Location"
            name="destination"
            value={formValues.destination}
            placeholder="Goa"
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg group">
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
        <div className="flex-1 relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg group">
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
        
        {/* Rooms & Guests Dropdown Area */}
        <div 
          className="flex-[1.2] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg group"
          onClick={() => setIsGuestOpen(true)}
          ref={guestDropdownRef}
        >
          <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
            Rooms & Guests <span className="text-blue-500">∨</span>
          </label>
          <div className="w-full text-base font-bold text-ink whitespace-normal leading-tight flex items-baseline gap-1">
            <span className="text-3xl font-black">{formValues.rooms}</span> 
            <span className="text-lg">Room</span> 
            <span className="text-3xl font-black ml-1">{formValues.adults}</span> 
            <span className="text-lg">Adults</span>
          </div>

          {/* Guest Selection Dropdown */}
          {isGuestOpen && (
            <div 
              className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-slate-200 z-50 p-5 cursor-default"
              onClick={e => e.stopPropagation()}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-800">Room</div>
                  <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                    <button type="button" onClick={() => handleGuestChange('rooms', -1)} className="px-3 py-1 hover:bg-slate-100 text-slate-600 font-bold">−</button>
                    <div className="w-8 text-center font-bold text-sm">{formValues.rooms}</div>
                    <button type="button" onClick={() => handleGuestChange('rooms', 1)} className="px-3 py-1 hover:bg-slate-100 text-slate-600 font-bold">+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-800">Adults</div>
                  <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                    <button type="button" onClick={() => handleGuestChange('adults', -1)} className="px-3 py-1 hover:bg-slate-100 text-slate-600 font-bold">−</button>
                    <div className="w-8 text-center font-bold text-sm">{formValues.adults}</div>
                    <button type="button" onClick={() => handleGuestChange('adults', 1)} className="px-3 py-1 hover:bg-slate-100 text-slate-600 font-bold">+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-800">Children</div>
                    <div className="text-xs text-slate-500">0 - 17 Years Old</div>
                  </div>
                  <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                    <button type="button" onClick={() => handleGuestChange('childrenCount', -1)} className="px-3 py-1 hover:bg-slate-100 text-slate-600 font-bold">−</button>
                    <div className="w-8 text-center font-bold text-sm">{formValues.childrenCount}</div>
                    <button type="button" onClick={() => handleGuestChange('childrenCount', 1)} className="px-3 py-1 hover:bg-slate-100 text-slate-600 font-bold">+</button>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Please provide right number of children along with their right age for best options and prices.
              </div>

              <div className="mt-4 border border-slate-200 rounded-lg p-3 bg-slate-50 flex items-start gap-3">
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 text-blue-500 accent-blue-500" 
                  checked={formValues.hasPets}
                  onChange={e => handleChange('hasPets', e.target.checked)}
                />
                <div>
                  <div className="text-sm font-bold text-slate-800 flex items-center justify-between">
                    Are you travelling with pets?
                    <span className="text-slate-400">🐾</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Selecting this option will show only pet-friendly properties. Please review the pet policies & applicable fees, if any.
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button type="button" onClick={() => setIsGuestOpen(false)} className="px-6 py-2 bg-blue-500 text-white font-bold rounded-full text-sm shadow-md hover:bg-blue-600">
                  APPLY
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg group">
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
            {['₹0 - ₹1500', '₹1500 - ₹3500', '₹3500 - ₹7000', '₹7000+'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex justify-center absolute -bottom-6 left-1/2 -translate-x-1/2">
        <Button type="submit" className="min-w-[220px] text-xl shadow-xl py-4 px-10 rounded-full font-extrabold bg-[#008cff] text-white">
          {formValues.bookingType === 'group' ? 'GET ME BEST PRICES' : 'SEARCH'}
        </Button>
      </div>
    </form>
  );
}
