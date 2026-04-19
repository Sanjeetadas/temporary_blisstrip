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

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
        <div className="relative">
          <SearchAutocompleteField
            label="From"
            name="from"
            value={formValues.from}
            placeholder="Delhi, Delhi"
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <SearchAutocompleteField
            label="To"
            name="to"
            value={formValues.to}
            placeholder="Kanpur, Uttar Pradesh"
            onChange={handleChange}
          />
        </div>
        <div className="relative flex flex-col">
          <label className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Travel Date</label>
          <input 
            type="date" 
            className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
            value={formValues.departDate}
            onChange={e => handleChange('departDate', e.target.value)}
          />
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
