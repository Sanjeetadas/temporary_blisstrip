import { MapPin, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import SearchAutocompleteField from '../search/SearchAutocompleteField';

function formatCompactDate(value, fallback) {
  if (!value) return fallback;
  const date = new Date(value);
  const day = new Intl.DateTimeFormat('en-IN', { day: '2-digit' }).format(date);
  const month = new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(date);
  const weekday = new Intl.DateTimeFormat('en-IN', { weekday: 'long' }).format(date);
  return { day, month, weekday };
}

export default function HotelSearchHero({
  mode = 'hotels',
  defaults,
  title = 'Upto 4 Rooms',
  promo = 'Book domestic and international property online',
}) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    destination: 'Goa',
    checkIn: '',
    checkOut: '',
    rooms: 1,
    guests: 2,
    priceBand: 'value',
    ...defaults,
  });

  const checkIn = formatCompactDate(formValues.checkIn, { day: '15', month: "Apr'26", weekday: 'Wednesday' });
  const checkOut = formatCompactDate(formValues.checkOut, { day: '16', month: "Apr'26", weekday: 'Thursday' });

  function setValue(name, value) {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function updateCounter(field, delta) {
    setFormValues((prev) => {
      const nextValue = Math.max(field === 'rooms' ? 1 : 1, Number(prev[field]) + delta);
      return { ...prev, [field]: nextValue };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/${mode}/results?${buildQueryString(formValues)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel mt-6 overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-700">
          <label className="flex items-center gap-2">
            <input type="radio" checked readOnly className="accent-brand-500" />
            {title}
          </label>
          <label className="flex items-center gap-2 text-slate-400">
            <input type="radio" readOnly className="accent-brand-500" />
            Group Deals
          </label>
          <div className="ml-auto hidden rounded-pill bg-gradient-to-r from-lime-100 to-cyan-100 px-4 py-2 text-xs font-bold text-slate-700 md:block">
            {promo}
          </div>
        </div>
      </div>

      <div className="grid gap-0 border-b border-slate-100 md:grid-cols-[2.2fr_1fr_1fr_1.6fr_1.2fr]">
        <div className="border-b border-slate-100 p-4 md:border-b-0 md:border-r md:p-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">City, Property Name or Location</p>
          <SearchAutocompleteField
            label=""
            name="destination"
            value={formValues.destination}
            placeholder="Goa"
            onChange={setValue}
          />
        </div>

        <button type="button" className="border-b border-slate-100 p-4 text-left md:border-b-0 md:border-r md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Check-In</p>
          <div className="mt-3 flex items-end gap-2 text-ink">
            <span className="text-4xl font-extrabold">{checkIn.day}</span>
            <span className="pb-1 text-xl font-semibold">{checkIn.month}</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{checkIn.weekday}</p>
          <input
            type="date"
            value={formValues.checkIn}
            onChange={(event) => setValue('checkIn', event.target.value)}
            className="mt-3 w-full rounded-[14px] border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 outline-none"
          />
        </button>

        <button type="button" className="border-b border-slate-100 p-4 text-left md:border-b-0 md:border-r md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Check-Out</p>
          <div className="mt-3 flex items-end gap-2 text-ink">
            <span className="text-4xl font-extrabold">{checkOut.day}</span>
            <span className="pb-1 text-xl font-semibold">{checkOut.month}</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{checkOut.weekday}</p>
          <input
            type="date"
            value={formValues.checkOut}
            onChange={(event) => setValue('checkOut', event.target.value)}
            className="mt-3 w-full rounded-[14px] border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 outline-none"
          />
        </button>

        <div className="border-b border-slate-100 p-4 md:border-b-0 md:border-r md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Rooms & Guests</p>
          <div className="mt-3 flex items-end gap-2 text-ink">
            <span className="text-4xl font-extrabold">{formValues.rooms}</span>
            <span className="pb-1 text-xl font-semibold">Rooms</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{formValues.guests} Adults</p>
          <div className="mt-3 flex items-center gap-3">
            <button type="button" onClick={() => updateCounter('rooms', -1)} className="rounded-full border border-slate-200 p-2">
              <Minus size={14} />
            </button>
            <button type="button" onClick={() => updateCounter('rooms', 1)} className="rounded-full border border-slate-200 p-2">
              <Plus size={14} />
            </button>
            <button type="button" onClick={() => updateCounter('guests', -1)} className="rounded-full border border-slate-200 p-2">
              <Minus size={14} />
            </button>
            <button type="button" onClick={() => updateCounter('guests', 1)} className="rounded-full border border-slate-200 p-2">
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Price Per Night</p>
          <div className="mt-4 rounded-[18px] bg-slate-50 p-3">
            <select
              value={formValues.priceBand}
              onChange={(event) => setValue('priceBand', event.target.value)}
              className="w-full bg-transparent text-base font-semibold text-ink outline-none"
            >
              <option value="budget">₹0 - ₹1500</option>
              <option value="value">₹1500 - ₹3500</option>
              <option value="premium">₹3500 - ₹7000</option>
              <option value="luxury">₹7000+</option>
            </select>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
            <MapPin size={15} className="text-brand-500" />
            Trending: Goa, Dubai, Mumbai
          </div>
        </div>
      </div>

      <div className="flex justify-center px-4 pb-5 pt-4 md:px-6">
        <button
          type="submit"
          disabled={!formValues.destination || !formValues.checkIn || !formValues.checkOut}
          className="rounded-pill bg-brand-pill px-16 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-white shadow-lg disabled:opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
}
