import { ArrowRightLeft, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import Button from '../common/Button';
import SearchAutocompleteField from './SearchAutocompleteField';

export default function FlightSearchCard({ config }) {
  const [searchParams] = useSearchParams();
  const [tripType, setTripType] = useState(searchParams.get('tripType') || 'oneway');
  const [formValues, setFormValues] = useState({
    from: searchParams.get('from') || 'Delhi',
    to: searchParams.get('to') || 'Bengaluru',
    departDate: searchParams.get('departDate') || '',
    returnDate: searchParams.get('returnDate') || '',
    travellers: searchParams.get('travellers') || 1,
    cabinClass: searchParams.get('cabinClass') || 'economy',
  });
  
  const [multiCityFlights, setMultiCityFlights] = useState(() => {
    const defaultMulti = [
      { id: 1, from: searchParams.get('from') || 'Delhi', to: searchParams.get('to') || 'Bengaluru', date: searchParams.get('departDate') || '' },
      { id: 2, from: searchParams.get('to') || 'Bengaluru', to: 'Mumbai', date: '' }
    ];
    try {
      const parsed = JSON.parse(searchParams.get('multiCity'));
      return Array.isArray(parsed) ? parsed : defaultMulti;
    } catch {
      return defaultMulti;
    }
  });

  const navigate = useNavigate();

  function handleGenericChange(name, value) {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSwap() {
    setFormValues((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  }

  function handleMultiCityChange(id, field, value) {
    setMultiCityFlights(prev => 
      prev.map(flight => flight.id === id ? { ...flight, [field]: value } : flight)
    );
  }

  function addMultiCityRow() {
    if (multiCityFlights.length >= 5) return;
    const lastFlight = multiCityFlights[multiCityFlights.length - 1];
    setMultiCityFlights(prev => [
      ...prev, 
      { id: Date.now(), from: lastFlight.to, to: '', date: '' }
    ]);
  }

  function removeMultiCityRow(id) {
    if (multiCityFlights.length <= 2) return;
    setMultiCityFlights(prev => prev.filter(flight => flight.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const query = { tripType, ...formValues };
    if (tripType === 'multicity') {
      query.multiCity = JSON.stringify(multiCityFlights);
    }
    navigate(`/${config.slug}/results?${buildQueryString(query)}`);
  }

  const isInvalid = tripType === 'multicity' 
    ? multiCityFlights.some(f => !f.from || !f.to || !f.date)
    : !formValues.from || !formValues.to || !formValues.departDate || (tripType === 'roundtrip' && !formValues.returnDate);

  return (
    <form onSubmit={handleSubmit} className="px-2 pb-6 pt-2">
      {/* Trip Type Selector */}
      <div className="flex flex-wrap items-center gap-4 mb-6 border-b border-slate-200 pb-4">
        {['oneway', 'roundtrip', 'multicity'].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="tripType" 
              value={type} 
              checked={tripType === type} 
              onChange={() => setTripType(type)}
              className="w-4 h-4 text-blue-500 accent-blue-500"
            />
            <span className="text-sm font-bold text-ink capitalize">{type === 'oneway' ? 'One Way' : type === 'roundtrip' ? 'Round Trip' : 'Multi City'}</span>
          </label>
        ))}
        
        <div className="ml-auto flex items-center gap-4 text-sm font-semibold text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            Travellers: 
            <select 
              value={formValues.travellers} 
              onChange={e => handleGenericChange('travellers', e.target.value)}
              className="bg-transparent font-bold text-blue-600 outline-none"
            >
              {[1,2,3,4,5,6,7,8,9].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-4">
            Class: 
            <select 
              value={formValues.cabinClass} 
              onChange={e => handleGenericChange('cabinClass', e.target.value)}
              className="bg-transparent font-bold text-blue-600 outline-none capitalize"
            >
              {['economy', 'premium economy', 'business', 'first'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>
      </div>

      {tripType !== 'multicity' ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:items-center">
          <div className="relative">
            <SearchAutocompleteField
              label="From"
              name="from"
              value={formValues.from}
              placeholder="Origin City"
              onChange={handleGenericChange}
            />
            <button
              type="button"
              onClick={handleSwap}
              className="absolute -right-6 top-[28px] z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-500 shadow-sm lg:flex hover:bg-slate-50 transition"
              aria-label="Swap values"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>
          
          <div className="relative">
            <SearchAutocompleteField
              label="To"
              name="to"
              value={formValues.to}
              placeholder="Destination City"
              onChange={handleGenericChange}
            />
          </div>

          <div className="relative flex flex-col">
            <label className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Departure</label>
            <input 
              type="date" 
              className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              value={formValues.departDate}
              onChange={e => handleGenericChange('departDate', e.target.value)}
            />
          </div>

          {tripType === 'roundtrip' && (
            <div className="relative flex flex-col">
              <label className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Return</label>
              <input 
                type="date" 
                className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                value={formValues.returnDate}
                onChange={e => handleGenericChange('returnDate', e.target.value)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {multiCityFlights.map((flight, index) => (
            <div key={flight.id} className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] items-end border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <SearchAutocompleteField
                label={`Flight ${index + 1} From`}
                name="from"
                value={flight.from}
                placeholder="Origin City"
                onChange={(name, val) => handleMultiCityChange(flight.id, 'from', val)}
              />
              <SearchAutocompleteField
                label="To"
                name="to"
                value={flight.to}
                placeholder="Destination City"
                onChange={(name, val) => handleMultiCityChange(flight.id, 'to', val)}
              />
              <div className="relative flex flex-col">
                <label className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Date</label>
                <input 
                  type="date" 
                  className="h-14 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 font-semibold text-ink outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  value={flight.date}
                  onChange={e => handleMultiCityChange(flight.id, 'date', e.target.value)}
                />
              </div>
              <div className="h-14 flex items-center">
                {multiCityFlights.length > 2 && (
                  <button type="button" onClick={() => removeMultiCityRow(flight.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full transition">
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
          {multiCityFlights.length < 5 && (
            <button type="button" onClick={addMultiCityRow} className="flex items-center gap-2 text-sm font-bold text-blue-600 py-2 hover:underline">
               <Plus size={16} /> Add another flight
            </button>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-center absolute -bottom-6 left-1/2 -translate-x-1/2">
        <Button type="submit" disabled={isInvalid} className="min-w-[220px] text-xl shadow-xl py-4 px-10 rounded-full font-extrabold bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          SEARCH
        </Button>
      </div>
    </form>
  );
}
