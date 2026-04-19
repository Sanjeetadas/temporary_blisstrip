import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import Button from '../common/Button';
import SearchAutocompleteField from './SearchAutocompleteField';

export default function BusSearchCard({ config }) {
  const [formValues, setFormValues] = useState({
    from: 'Delhi, Delhi',
    to: 'Kanpur, Uttar Pradesh',
    departDate: '',
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
      <div className="flex flex-col justify-center mb-6 border-b border-slate-200 pb-4">
        <div className="text-sm font-bold text-ink">
          Bus Ticket Booking
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch border border-slate-200 rounded-[10px] divide-y md:divide-y-0 md:divide-x divide-slate-200">
        <div className="flex-1 relative">
          <SearchAutocompleteField
            label="From"
            name="from"
            value={formValues.from}
            placeholder="Delhi, Delhi"
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 relative">
          <SearchAutocompleteField
            label="To"
            name="to"
            value={formValues.to}
            placeholder="Kanpur, Uttar Pradesh"
            onChange={handleChange}
          />
        </div>
        <div className="flex-[0.8] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg group">
          <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
            Travel Date <span className="text-blue-500">∨</span>
          </label>
          <div className={`w-full truncate ${formValues.departDate ? 'text-3xl font-black text-ink' : 'text-xl font-bold text-slate-400'}`}>
             {formValues.departDate ? new Date(formValues.departDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, " '") : 'Select Date'}
          </div>
          <input 
            type="date" 
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            value={formValues.departDate}
            min={new Date().toISOString().split('T')[0]}
            onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
            onChange={e => handleChange('departDate', e.target.value)}
          />
          {formValues.departDate && (
            <div className="text-xs text-slate-400 mt-1 truncate">
              {new Date(formValues.departDate).toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          )}
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
