import { ArrowRightLeft, Plus, Trash2, X } from 'lucide-react';
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
    to: searchParams.get('to') || 'Mumbai',
    departDate: searchParams.get('departDate') || '',
    returnDate: searchParams.get('returnDate') || '',
    travellers: searchParams.get('travellers') || 1,
    cabinClass: searchParams.get('cabinClass') || 'economy',
  });
  
  const [multiCityFlights, setMultiCityFlights] = useState(() => {
    const defaultMulti = [
      { id: 1, from: searchParams.get('from') || 'Delhi', to: searchParams.get('to') || 'Bengaluru', date: searchParams.get('departDate') || '' },
      { id: 2, from: searchParams.get('to') || 'Bengaluru', to: '', date: '' }
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

  function handleDateChange(field, value) {
    setFormValues(prev => {
      const updates = { [field]: value };
      if (field === 'departDate') {
        const newDepart = new Date(value);
        if (prev.returnDate) {
          const currentReturn = new Date(prev.returnDate);
          if (currentReturn <= newDepart) {
            const nextDay = new Date(newDepart);
            nextDay.setDate(nextDay.getDate() + 1);
            updates.returnDate = nextDay.toISOString().split('T')[0];
          }
        }
      }
      return { ...prev, ...updates };
    });
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

  const todayStr = new Date().toISOString().split('T')[0];
  const returnMinStr = formValues.departDate 
    ? new Date(new Date(formValues.departDate).getTime() + 86400000).toISOString().split('T')[0]
    : todayStr;

  return (
    <form onSubmit={handleSubmit} className="px-2 pb-6 pt-2">
      {/* Trip Type Selector */}
      <div className="flex flex-wrap items-center justify-between mb-4 border-b border-slate-200 pb-3">
        <div className="flex gap-6">
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
        </div>
        <div className="hidden sm:block text-sm font-bold text-slate-500">
          Book International and Domestic Flights
        </div>
      </div>

      {tripType !== 'multicity' ? (
        <div className="flex flex-col md:flex-row items-stretch border border-slate-200 rounded-[10px] divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="flex-[1.2] relative">
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
              className="absolute -right-6 top-[32px] z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-500 shadow-sm lg:flex hover:bg-slate-50 transition"
              aria-label="Swap values"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>
          
          <div className="flex-[1.2] relative pl-4">
            <SearchAutocompleteField
              label="To"
              name="to"
              value={formValues.to}
              placeholder="Destination City"
              onChange={handleGenericChange}
            />
          </div>

          <div className="flex-[0.8] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group">
            <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
              Departure <span className="text-blue-500">∨</span>
            </label>
            <div className={`w-full truncate ${formValues.departDate ? 'text-3xl font-black text-ink' : 'text-xl font-bold text-slate-400'}`}>
               {formValues.departDate ? new Date(formValues.departDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, " '") : 'Select Date'}
            </div>
            <input 
              type="date" 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              value={formValues.departDate}
              min={todayStr}
              onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
              onChange={e => handleDateChange('departDate', e.target.value)}
            />
            {formValues.departDate && (
              <div className="text-xs text-slate-400 mt-1 truncate">
                {new Date(formValues.departDate).toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
            )}
          </div>

          <div className="flex-[0.8] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group">
            <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
              Return <span className="text-blue-500">∨</span>
            </label>
            {tripType === 'roundtrip' ? (
              <>
                <div className={`w-full truncate ${formValues.returnDate ? 'text-3xl font-black text-ink' : 'text-xl font-bold text-slate-400'}`}>
                   {formValues.returnDate ? new Date(formValues.returnDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, " '") : 'Select Date'}
                </div>
                <input 
                  type="date" 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  value={formValues.returnDate}
                  min={returnMinStr}
                  onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
                  onChange={e => handleDateChange('returnDate', e.target.value)}
                />
                {formValues.returnDate && (
                  <div className="text-xs text-slate-400 mt-1 truncate">
                    {new Date(formValues.returnDate).toLocaleDateString('en-US', { weekday: 'long' })}
                  </div>
                )}
                <button 
                   type="button"
                   onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTripType('oneway');
                      handleGenericChange('returnDate', '');
                   }}
                   className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-0.5 z-10 transition"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <div className="w-full text-sm font-bold text-slate-400 mt-1 leading-snug">
                  Tap to add a return date for bigger discounts
                </div>
                <input 
                  type="date" 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  value=""
                  min={returnMinStr}
                  onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
                  onChange={e => {
                    setTripType('roundtrip');
                    handleDateChange('returnDate', e.target.value);
                  }}
                />
              </>
            )}
          </div>

          <div className="flex-[1] relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group">
             <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
              Travellers & Class <span className="text-blue-500">∨</span>
            </label>
            <div className="text-3xl font-black text-ink">
               {formValues.travellers} <span className="text-xl font-bold">Traveller{formValues.travellers > 1 ? 's' : ''}</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 truncate capitalize">
               {formValues.cabinClass}{formValues.cabinClass === 'economy' ? '/Premium Economy' : ''}
            </div>
            <select
               className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
               value={`${formValues.travellers}-${formValues.cabinClass}`}
               onChange={e => {
                  const [t, c] = e.target.value.split('-');
                  handleGenericChange('travellers', t);
                  handleGenericChange('cabinClass', c);
               }}
            >
               <option value="1-economy">1 Traveller, Economy</option>
               <option value="2-economy">2 Travellers, Economy</option>
               <option value="1-business">1 Traveller, Business</option>
               <option value="2-business">2 Travellers, Business</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {multiCityFlights.map((flight, index) => (
            <div key={flight.id} className="grid gap-4 md:grid-cols-[1.2fr_1.2fr_1fr_1.2fr] items-end border border-slate-200 rounded-[10px] divide-x divide-slate-200">
              <div className="relative">
                <SearchAutocompleteField
                  label={`From`}
                  name="from"
                  value={flight.from}
                  placeholder="Origin City"
                  onChange={(name, val) => handleMultiCityChange(flight.id, 'from', val)}
                />
              </div>
              <div className="relative">
                <SearchAutocompleteField
                  label="To"
                  name="to"
                  value={flight.to}
                  placeholder="Destination City"
                  onChange={(name, val) => handleMultiCityChange(flight.id, 'to', val)}
                />
              </div>
              <div className="relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
                  Departure <span className="text-blue-500">∨</span>
                </label>
                <div className="w-full text-3xl font-black text-ink truncate">
                   {flight.date ? new Date(flight.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, " '") : 'Select Date'}
                </div>
                <input 
                  type="date" 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  value={flight.date}
                  min={index === 0 ? todayStr : (multiCityFlights[index-1].date || todayStr)}
                  onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
                  onChange={e => handleMultiCityChange(flight.id, 'date', e.target.value)}
                />
                {flight.date && (
                  <div className="text-xs text-slate-400 mt-1 truncate">
                    {new Date(flight.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </div>
                )}
              </div>
              
              {index === 0 ? (
                <div className="relative flex flex-col justify-center px-4 py-3 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                   <label className="mb-1 text-sm font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
                    Travellers & Class <span className="text-blue-500">∨</span>
                  </label>
                  <div className="text-3xl font-black text-ink">
                     {formValues.travellers} <span className="text-xl font-bold">Traveller{formValues.travellers > 1 ? 's' : ''}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 truncate capitalize">
                     {formValues.cabinClass}{formValues.cabinClass === 'economy' ? '/Premium Economy' : ''}
                  </div>
                  <select
                     className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                     value={`${formValues.travellers}-${formValues.cabinClass}`}
                     onChange={e => {
                        const [t, c] = e.target.value.split('-');
                        handleGenericChange('travellers', t);
                        handleGenericChange('cabinClass', c);
                     }}
                  >
                     <option value="1-economy">1 Traveller, Economy</option>
                     <option value="2-economy">2 Travellers, Economy</option>
                     <option value="1-business">1 Traveller, Business</option>
                     <option value="2-business">2 Travellers, Business</option>
                  </select>
                </div>
              ) : (
                <div className="h-full flex items-center px-4">
                  {index === multiCityFlights.length - 1 && multiCityFlights.length < 5 ? (
                    <button type="button" onClick={addMultiCityRow} className="flex items-center justify-center gap-2 text-sm font-bold text-blue-600 border border-blue-200 bg-blue-50 rounded px-4 py-2 w-full hover:bg-blue-100 transition">
                       <Plus size={16} /> ADD ANOTHER CITY
                    </button>
                  ) : (
                    <button type="button" onClick={() => removeMultiCityRow(flight.id)} className="flex items-center justify-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded px-4 py-2 w-full transition border border-transparent">
                      <Trash2 size={16} /> Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Special Fares UI representation (Static visual only to match screenshot) */}
      <div className="mt-4 flex items-center flex-wrap gap-2 text-xs">
        <div className="font-bold text-slate-700 mr-2 flex flex-col">
          <span>SPECIAL</span>
          <span>FARES</span>
        </div>
        <div className="flex items-center gap-2 border border-slate-200 rounded p-2 bg-blue-50 border-blue-300 cursor-pointer">
          <input type="radio" checked readOnly className="accent-blue-500 w-3 h-3 hidden" />
          <div className="flex flex-col">
            <span className="font-bold text-blue-600">Regular</span>
            <span className="text-[10px] text-slate-500">Regular fares</span>
          </div>
        </div>
        <div className="flex items-center gap-2 border border-slate-200 rounded p-2 hover:bg-slate-50 cursor-pointer">
          <div className="flex flex-col">
            <span className="font-bold text-slate-700">Student</span>
            <span className="text-[10px] text-slate-500">Extra discounts/baggage</span>
          </div>
        </div>
        <div className="flex items-center gap-2 border border-slate-200 rounded p-2 hover:bg-slate-50 cursor-pointer">
          <div className="flex flex-col">
            <span className="font-bold text-slate-700">Senior Citizen</span>
            <span className="text-[10px] text-slate-500">Up to ₹ 600 off</span>
          </div>
        </div>
        <div className="flex items-center gap-2 border border-slate-200 rounded p-2 hover:bg-slate-50 cursor-pointer">
          <div className="flex flex-col">
            <span className="font-bold text-slate-700">Armed Forces</span>
            <span className="text-[10px] text-slate-500">Up to ₹ 600 off</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center absolute -bottom-6 left-1/2 -translate-x-1/2">
        <Button type="submit" disabled={isInvalid} className="min-w-[220px] text-xl shadow-xl py-4 px-10 rounded-full font-extrabold bg-[#008cff] text-white">
          SEARCH
        </Button>
      </div>
    </form>
  );
}
