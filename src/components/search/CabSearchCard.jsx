import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import Button from '../common/Button';
import SearchAutocompleteField from './SearchAutocompleteField';

export default function CabSearchCard({ config }) {
  const [tripType, setTripType] = useState('oneway');
  const [formValues, setFormValues] = useState({
    pickup: 'Jalandhar, Punjab, India',
    pickupDate: '',
    pickupTime: '10:00 AM',
    drop: 'New Delhi, Delhi, India',
  });
  const navigate = useNavigate();

  function handleChange(name, value) {
    setFormValues(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/${config.slug}/results?${buildQueryString({ tripType, ...formValues })}`);
  }

  return (
    <form onSubmit={handleSubmit} className="px-2 pb-6 pt-2">
      {/* Radio Selector */}
      <div className="flex flex-wrap items-center gap-6 mb-6 border-b border-slate-200 pb-4">
        {[
          { id: 'oneway', label: 'Outstation One-Way' },
          { id: 'roundtrip', label: 'Outstation Round-Trip' },
          { id: 'airport', label: 'Airport Transfers' },
          { id: 'hourly', label: 'Hourly Rentals' }
        ].map((type) => (
          <label key={type.id} className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="cabTripType" 
              value={type.id} 
              checked={tripType === type.id} 
              onChange={() => setTripType(type.id)}
              className="w-4 h-4 text-blue-500 accent-blue-500"
            />
            <span className="text-sm font-bold text-ink">{type.label}</span>
          </label>
        ))}
        <div className="ml-auto flex items-center gap-2 text-sm font-semibold text-slate-700">
           <span className="text-slate-500 font-bold">Online Cab Booking</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative">
          <SearchAutocompleteField
            label="From"
            name="pickup"
            value={formValues.pickup}
            placeholder="Pickup location"
            onChange={handleChange}
          />
        </div>
        
        {tripType !== 'hourly' ? (
          <div className="relative">
            <SearchAutocompleteField
              label="To"
              name="drop"
              value={formValues.drop}
              placeholder="Drop location"
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="relative flex flex-col">
            <label className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Package</label>
            <select 
              className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
              value={formValues.drop}
              onChange={e => handleChange('drop', e.target.value)}
            >
              <option value="1 hrs 10 kms">1 hrs 10 kms</option>
              <option value="2 hrs 20 kms">2 hrs 20 kms</option>
              <option value="4 hrs 40 kms">4 hrs 40 kms</option>
              <option value="8 hrs 80 kms">8 hrs 80 kms</option>
            </select>
          </div>
        )}

        <div className="relative flex flex-col">
          <label className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Pickup Date</label>
          <input 
            type="date" 
            className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
            value={formValues.pickupDate}
            onChange={e => handleChange('pickupDate', e.target.value)}
          />
        </div>

        <div className="relative flex flex-col">
          <label className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Pickup Time</label>
          <select 
            className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
            value={formValues.pickupTime}
            onChange={e => handleChange('pickupTime', e.target.value)}
          >
            {['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '03:30 PM', '06:00 PM', '08:00 PM'].map(t => (
              <option key={t} value={t}>{t}</option>
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
