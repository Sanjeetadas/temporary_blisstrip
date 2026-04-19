import { BadgeIndianRupee, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import FlightResultCard from '../flights/FlightResultCard';

export default function ResultsList({ items, moduleSlug }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        moduleSlug === 'flights' ? (
          <FlightResultCard key={item.id} flight={item} />
        ) : (
        <article key={item.id} className="card-panel overflow-hidden p-5">
          <div className="grid gap-5 md:grid-cols-[220px_1fr_auto]">
            <img
              src={`https://picsum.photos/seed/${moduleSlug}-${item.id}/480/320`}
              alt={item.title}
              className="h-48 w-full rounded-[22px] object-cover"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-pill bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                  {item.tag}
                </span>
                {item.rating ? (
                  <span className="inline-flex items-center gap-1 rounded-pill bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    <Star size={14} className="fill-current" />
                    {item.rating}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 text-2xl font-extrabold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{item.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.meta.map((metaItem) => (
                  <span key={metaItem} className="rounded-pill bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                    {metaItem}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-between md:items-end">
              <div className="rounded-[20px] bg-slate-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Starting at</p>
                <p className="mt-2 flex items-center gap-2 text-3xl font-extrabold text-ink">
                  <BadgeIndianRupee size={24} />
                  {formatCurrency(item.price)}
                </p>
              </div>
              <button className="mt-4 rounded-pill border border-brand-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-brand-500 transition hover:bg-brand-500 hover:text-white">
                View details
              </button>
            </div>
          </div>
        </article>
        )
      ))}
    </div>
  );
}
