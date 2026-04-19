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

      <div className="flex flex-col md:flex-row items-stretch border border-slate-200 rounded-[10px] divide-y md:divide-y-0 md:divide-x divide-slate-200">
        <div className="flex-[1.2] relative">
          <SearchAutocompleteField
            label="From"
            name="pickup"
            value={formValues.pickup}
            placeholder="Pickup location"
            onChange={handleChange}
          />
        </div>
        
        {tripType !== 'hourly' ? (
          <div className="flex-[1.2] relative">
            <SearchAutocompleteField
              label="To"
              name="drop"
              value={formValues.drop}
              placeholder="Drop location"
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="flex-[1.2] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg group">
            <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
              Package <span className="text-blue-500">∨</span>
            </label>
            <div className="w-full text-3xl font-black text-ink truncate">
              {formValues.drop || 'Select Package'}
            </div>
            <select 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
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

        <div className="flex-[0.8] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg group">
          <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
            Departure <span className="text-blue-500">∨</span>
          </label>
          <div className={`w-full truncate ${formValues.pickupDate ? 'text-3xl font-black text-ink' : 'text-xl font-bold text-slate-400'}`}>
             {formValues.pickupDate ? new Date(formValues.pickupDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, " '") : 'Select Date'}
          </div>
          <input 
            type="date" 
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            value={formValues.pickupDate}
            min={new Date().toISOString().split('T')[0]}
            onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
            onChange={e => handleChange('pickupDate', e.target.value)}
          />
          {formValues.pickupDate && (
            <div className="text-xs text-slate-400 mt-1 truncate">
              {new Date(formValues.pickupDate).toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          )}
        </div>

        <div className="flex-[0.8] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg group">
          <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
            Return <span className="text-blue-500">∨</span>
          </label>
          <div className="w-full text-sm font-bold text-slate-400 mt-1">
            Tap to add a return date for bigger discounts
          </div>
        </div>

        <div className="flex-[0.8] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg group">
          <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
            Pickup-Time <span className="text-blue-500">∨</span>
          </label>
          <div className="w-full text-3xl font-black text-ink truncate">
            {formValues.pickupTime}
          </div>
          <select 
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
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
        <Button type="submit" className="min-w-[220px] text-xl shadow-xl py-4 px-10 rounded-full font-extrabold bg-[#008cff] text-white">
          SEARCH
        </Button>
      </div>
    </form>
  );
}
