import { MapPin, Star, Wifi, UtensilsCrossed, Car, WavesLadder } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const amenityIconMap = {
  'Free Wi-Fi': Wifi,
  'Wi-Fi': Wifi,
  Breakfast: UtensilsCrossed,
  'Free breakfast': UtensilsCrossed,
  Restaurant: UtensilsCrossed,
  Parking: Car,
  Pool: WavesLadder,
};

export default function HotelResultCard({ hotel }) {
  const ctaLabel = hotel.type === 'Villa' ? 'View Stay' : 'View Room';

  return (
    <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-card">
      <div className="grid gap-0 lg:grid-cols-[320px_1fr_220px]">
        <div className="relative">
          <img src={hotel.image} alt={hotel.title} className="h-full min-h-[260px] w-full object-cover" />
          <div className="absolute left-4 top-4 rounded-pill bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
            {hotel.tag}
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{hotel.type}</p>
              <h3 className="mt-2 text-2xl font-extrabold text-ink">{hotel.title}</h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={15} className="text-brand-500" />
                {hotel.locality}, {hotel.address}
              </div>
            </div>
            <div className="rounded-[18px] bg-emerald-50 px-3 py-2 text-right">
              <div className="flex items-center gap-1 text-sm font-bold text-emerald-700">
                <Star size={14} className="fill-current" />
                {hotel.rating}
              </div>
              <p className="mt-1 text-xs font-semibold text-emerald-700">{hotel.reviewCount} ratings</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-500">{hotel.subtitle}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(hotel.amenities || []).slice(0, 4).map((amenity) => {
              const Icon = amenityIconMap[amenity] || Wifi;
              return (
                <span key={amenity} className="inline-flex items-center gap-2 rounded-pill bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                  <Icon size={14} />
                  {amenity}
                </span>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold text-slate-500">
            {hotel.distance ? <span className="rounded-pill bg-blue-50 px-3 py-2 text-brand-600">{hotel.distance}</span> : null}
            {hotel.meta?.map((meta) => (
              <span key={meta} className="rounded-pill bg-slate-100 px-3 py-2">
                {meta}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50 p-5 lg:border-l lg:border-t-0">
          <p className="text-right text-sm font-semibold text-slate-400 line-through">
            {hotel.strikePrice ? formatCurrency(hotel.strikePrice) : ''}
          </p>
          <p className="text-right text-3xl font-extrabold text-ink">{formatCurrency(hotel.price)}</p>
          <p className="mt-1 text-right text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">+ {formatCurrency(hotel.taxes || 0)} taxes & fees</p>
          <p className="mt-4 text-right text-sm font-semibold text-emerald-700">Free cancellation available</p>
          <button className="mt-6 w-full rounded-pill bg-brand-pill px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-lg">
            {ctaLabel}
          </button>
          <button className="mt-3 w-full rounded-pill border border-brand-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-500">
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
