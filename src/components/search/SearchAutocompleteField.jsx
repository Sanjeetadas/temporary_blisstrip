import { MapPin, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { searchLocations } from '../../services/api/locationApi';

export default function SearchAutocompleteField({ label, name, value, placeholder, onChange }) {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedValue = useDebouncedValue(inputValue);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    let active = true;

    if (!debouncedValue || debouncedValue.trim().length < 2) {
      setSuggestions([]);
      return undefined;
    }

    searchLocations(debouncedValue)
      .then((results) => {
        if (active) setSuggestions(results);
      })
      .catch(() => {
        if (active) setSuggestions([]);
      });

    return () => {
      active = false;
    };
  }, [debouncedValue]);

  return (
    <div className="relative min-w-0">
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{label}</label>
      <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2 text-slate-500">
          <Search size={16} />
          <input
            name={name}
            value={inputValue}
            placeholder={placeholder}
            onChange={(event) => {
              const nextValue = event.target.value;
              setInputValue(nextValue);
              onChange(name, nextValue);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
            className="w-full bg-transparent text-base font-semibold text-ink outline-none"
          />
        </div>
      </div>
      {isOpen && suggestions.length > 0 ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-[18px] border border-slate-200 bg-white p-2 shadow-card">
          {suggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onMouseDown={() => {
                setInputValue(item.name);
                onChange(name, item.name);
                setIsOpen(false);
              }}
              className="flex w-full items-start gap-3 rounded-[14px] px-3 py-3 text-left hover:bg-slate-50"
            >
              <MapPin className="mt-0.5 shrink-0 text-brand-500" size={16} />
              <span className="text-sm text-slate-600">{item.name}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
