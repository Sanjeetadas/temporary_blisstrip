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
    <div className="relative min-w-0 h-full w-full">
      <div className="flex flex-col justify-center px-4 py-3 h-full cursor-text hover:bg-blue-50/50 transition-colors rounded-lg">
        <label className="mb-1 block text-sm font-semibold text-slate-500 cursor-pointer flex items-center gap-1">
          {label} <span className="text-blue-500">∨</span>
        </label>
        <div className="flex items-center text-slate-500">
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
            className="w-full bg-transparent text-3xl font-black text-ink outline-none truncate"
          />
        </div>
        <div className="text-xs text-slate-400 mt-1 truncate">
          {value === 'New Delhi' ? 'NDLS, New Delhi Railway Station' :
           value === 'Kanpur' ? 'CNB, Kanpur Central' :
           value === 'Goa, India' ? 'India' :
           value === 'Delhi, Delhi' ? 'India' :
           value === 'Kanpur, Uttar Pradesh' ? 'India' :
           value === 'Mumbai' ? 'Maharashtra' :
           value === 'Pune' ? 'Maharashtra' :
           placeholder}
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
