import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import Button from '../common/Button';
import SearchAutocompleteField from './SearchAutocompleteField';

export default function HotelSearchCard({ config }) {
  const [formValues, setFormValues] = useState({
    destination: 'Goa',
    checkIn: '',
    checkOut: '',
    roomsAndGuests: '1 Room, 2 Adults',
    priceBand: '₹0-₹1500, ₹1500-₹2500...',
  });
  const navigate = useNavigate();

  function handleChange(name, value) {
    setFormValues(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/${config.slug}/results?${buildQueryString(formValues)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="px-2 pb-6 pt-2">
      {/* Radio Selector */}
      <div className="flex flex-wrap items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="bookingType" value="single" defaultChecked className="w-4 h-4 text-blue-500 accent-blue-500" />
            <span className="text-sm font-bold text-ink">Upto 5 Rooms</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-ink">
            <input type="radio" name="bookingType" value="group" className="w-4 h-4 text-slate-300 accent-slate-300" />
            <span className="text-sm font-bold">Group Deals</span>
          </label>
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Book Domestic and International Property Online. To list your property <span className="text-blue-500 cursor-pointer">Click Here</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <div className="relative col-span-2">
          <SearchAutocompleteField
            label="City, Property Name Or Location"
            name="destination"
            value={formValues.destination}
            placeholder="Goa"
            onChange={handleChange}
          />
        </div>
        <div className="relative flex flex-col col-span-1">
          <label className="mb-2 text-xs font-bold text-slate-500">Check-In</label>
          <input 
            type="date" 
            className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
            value={formValues.checkIn}
            onChange={e => handleChange('checkIn', e.target.value)}
          />
        </div>
        <div className="relative flex flex-col col-span-1">
          <label className="mb-2 text-xs font-bold text-slate-500">Check-Out</label>
          <input 
            type="date" 
            className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
            value={formValues.checkOut}
            onChange={e => handleChange('checkOut', e.target.value)}
          />
        </div>
        <div className="relative flex flex-col col-span-1">
          <label className="mb-2 text-xs font-bold text-slate-500">Rooms & Guests</label>
          <select 
            className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
            value={formValues.roomsAndGuests}
            onChange={e => handleChange('roomsAndGuests', e.target.value)}
          >
            {['1 Room, 2 Adults', '1 Room, 1 Adult', '2 Rooms, 4 Adults'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="relative flex flex-col col-span-1">
          <label className="mb-2 text-xs font-bold text-slate-500">Price Per Night</label>
          <select 
            className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
            value={formValues.priceBand}
            onChange={e => handleChange('priceBand', e.target.value)}
          >
            {['₹0-₹1500, ₹1500-₹2500...', '₹0 - ₹1500', '₹1500 - ₹3500', '₹3500 - ₹7000', '₹7000+'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex justify-center absolute -bottom-6 left-1/2 -translate-x-1/2">
        <Button type="submit" className="min-w-[220px] text-xl shadow-xl py-4 px-10 rounded-full font-extrabold bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          SEARCH
        </Button>
      </div>
    </form>
  );
}
