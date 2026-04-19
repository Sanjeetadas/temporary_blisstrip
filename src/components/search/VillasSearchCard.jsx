import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import Button from '../common/Button';
import SearchAutocompleteField from './SearchAutocompleteField';

export default function VillasSearchCard({ config }) {
  const [formValues, setFormValues] = useState({
    destination: 'Goa, India',
    checkIn: '',
    checkOut: '',
    guests: 'Add Adults & Children',
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
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 border-b border-slate-200 pb-4">
        <div className="text-sm font-bold text-ink">
          Book your ideal Homestay - Villas, Apartments & more.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <div className="relative col-span-2">
          <SearchAutocompleteField
            label="City, Property Name Or Location"
            name="destination"
            value={formValues.destination}
            placeholder="Goa, India"
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
          <label className="mb-2 text-xs font-bold text-slate-500">Guests</label>
          <select 
            className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
            value={formValues.guests}
            onChange={e => handleChange('guests', e.target.value)}
          >
            {['Add Adults & Children', '2 Adults', '4 Adults'].map(c => (
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
