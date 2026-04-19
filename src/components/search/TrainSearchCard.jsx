import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import Button from '../common/Button';
import SearchAutocompleteField from './SearchAutocompleteField';

export default function TrainSearchCard({ config }) {
  const [formValues, setFormValues] = useState({
    from: 'New Delhi',
    to: 'Kanpur',
    departDate: '',
    classType: 'ALL',
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
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="trainType" value="book" defaultChecked className="w-4 h-4 text-blue-500 accent-blue-500" />
            <span className="text-sm font-bold text-ink">Book Train Tickets</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-500">
            <input type="radio" name="trainType" value="pnr" className="w-4 h-4 text-slate-300 accent-slate-300" />
            <span className="text-sm font-bold">Check PNR Status</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-500">
            <input type="radio" name="trainType" value="status" className="w-4 h-4 text-slate-300 accent-slate-300" />
            <span className="text-sm font-bold">Live Train Status</span>
          </label>
        </div>
        <div className="text-sm font-semibold text-slate-500">
          <span className="font-bold">Train Ticket Booking</span>
          <div className="text-xs text-slate-400">IRCTC Authorized e-ticketing</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative">
          <SearchAutocompleteField
            label="From"
            name="from"
            value={formValues.from}
            placeholder="Origin Station"
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <SearchAutocompleteField
            label="To"
            name="to"
            value={formValues.to}
            placeholder="Destination Station"
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
        <div className="relative flex flex-col">
          <label className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Class</label>
          <select 
            className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none"
            value={formValues.classType}
            onChange={e => handleChange('classType', e.target.value)}
          >
            {['ALL', 'SL', '3A', '2A', '1A', 'CC'].map(c => (
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
