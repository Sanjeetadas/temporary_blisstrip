import { ArrowRightLeft, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildQueryString } from '../../utils/formatters';
import Button from '../common/Button';
import SearchAutocompleteField from './SearchAutocompleteField';
import SearchField from './SearchField';

function isInvalid(config, values) {
  const requiredFields = config.searchFields.filter((field) => field.type !== 'select');
  return requiredFields.some((field) => !String(values[field.name] ?? '').trim());
}

export default function SearchCard({ config }) {
  const [formValues, setFormValues] = useState(config.defaultValues);
  const navigate = useNavigate();

  const chips = useMemo(() => ['Limited-time offers', 'Flexible filters', 'Responsive search flow'], []);

  function handleChange(name, value) {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSwap() {
    if (!('from' in formValues) || !('to' in formValues)) return;

    setFormValues((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/${config.slug}/results?${buildQueryString(formValues)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="px-2 pb-6 pt-2">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {config.searchFields.map((field, index) => (
          <div key={field.name} className="relative">
            {field.type === 'location' ? (
              <SearchAutocompleteField
                label={field.label}
                name={field.name}
                value={formValues[field.name]}
                placeholder={field.placeholder}
                onChange={handleChange}
              />
            ) : (
              <SearchField field={field} value={formValues[field.name]} onChange={handleChange} />
            )}
            {field.name === 'to' && config.searchFields[index - 1]?.name === 'from' ? (
              <button
                type="button"
                onClick={handleSwap}
                className="absolute -right-6 top-[28px] z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-500 shadow-sm lg:flex hover:bg-slate-50 transition"
                aria-label="Swap values"
              >
                <ArrowRightLeft size={16} />
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center absolute -bottom-6 left-1/2 -translate-x-1/2">
        <Button type="submit" disabled={isInvalid(config, formValues)} className="min-w-[220px] text-xl shadow-xl py-4 px-10 rounded-full font-extrabold bg-[#008cff] text-white">
          SEARCH
        </Button>
      </div>
    </form>
  );
}
