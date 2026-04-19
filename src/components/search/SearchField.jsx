import { CalendarDays, ChevronDown, Users } from 'lucide-react';

const iconMap = {
  date: CalendarDays,
  select: ChevronDown,
  number: Users,
};

export default function SearchField({ field, value, onChange }) {
  const Icon = iconMap[field.type] || ChevronDown;

  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{field.label}</label>
      <div className="flex items-center gap-2 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3">
        <Icon size={16} className="shrink-0 text-slate-500" />
        {field.type === 'select' ? (
          <select
            value={value}
            onChange={(event) => onChange(field.name, event.target.value)}
            className="w-full bg-transparent text-base font-semibold text-ink outline-none"
          >
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            min={field.min}
            max={field.max}
            value={value}
            placeholder={field.placeholder}
            onChange={(event) => onChange(field.name, event.target.value)}
            className="w-full bg-transparent text-base font-semibold text-ink outline-none"
          />
        )}
      </div>
    </div>
  );
}
