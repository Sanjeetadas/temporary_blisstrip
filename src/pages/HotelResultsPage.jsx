import { ArrowUpDown, MapPinned, SlidersHorizontal, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import HotelResultCard from '../components/hotels/HotelResultCard';
import HotelSearchHero from '../components/hotels/HotelSearchHero';
import ErrorBanner from '../components/common/ErrorBanner';
import LoadingBlock from '../components/common/LoadingBlock';
import { useAsyncData } from '../hooks/useAsyncData';
import { searchHotels } from '../services/api/staysApi';
import { formatCurrency } from '../utils/formatters';

export default function HotelResultsPage() {
  const [params] = useSearchParams();
  const [sortBy, setSortBy] = useState('recommended');
  const query = useMemo(() => Object.fromEntries(params.entries()), [params]);

  const searchState = useAsyncData(() => searchHotels(query), [params.toString()], { initialData: [] });

  const filteredResults = useMemo(() => {
    const items = [...searchState.data];
    if (sortBy === 'priceLow') return items.sort((a, b) => a.price - b.price);
    if (sortBy === 'ratingHigh') return items.sort((a, b) => Number(b.rating) - Number(a.rating));
    return items.sort((a, b) => Number(b.rating) - Number(a.rating) || a.price - b.price);
  }, [searchState.data, sortBy]);

  const cheapest = filteredResults.length ? formatCurrency(Math.min(...filteredResults.map((item) => item.price))) : 'N/A';

  return (
    <main className="bg-[#edf2f7] pb-10">
      <section
        className="hero-overlay pb-10 pt-8"
        style={{
          '--hero-image':
            'url("https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80")',
        }}
      >
        <div className="page-shell">
          <HotelSearchHero />
        </div>
      </section>

      <div className="page-shell -mt-2">
        <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Hotel Listing</p>
              <h1 className="mt-2 text-3xl font-extrabold text-ink">{query.destination || 'Goa'} Hotels</h1>
              <p className="mt-2 text-sm text-slate-500">
                {filteredResults.length} properties found | Cheapest price {cheapest} | Dates {query.checkIn || 'selected'} to {query.checkOut || 'selected'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/hotels" className="rounded-pill border border-slate-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-600">
                Modify Search
              </Link>
              <div className="rounded-pill bg-brand-pill px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white">
                {import.meta.env.VITE_GEOAPIFY_API_KEY ? 'Geoapify live data' : 'Smart mock data'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 xl:flex-row">
          <aside className="w-full space-y-4 xl:w-[320px]">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-card">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-brand-500" />
                <h2 className="text-lg font-extrabold text-ink">Filters</h2>
              </div>
              <div className="mt-5 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Sort By</label>
                  <div className="relative">
                    <ArrowUpDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="w-full rounded-[16px] border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 font-semibold text-ink outline-none"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="priceLow">Price low to high</option>
                      <option value="ratingHigh">Rating high to low</option>
                    </select>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Popular filters</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Free cancellation', 'Breakfast included', 'Pool', 'Near beach', '4 star & above'].map((chip) => (
                      <span key={chip} className="rounded-pill bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[18px] bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-ink">
                    <Star size={16} className="fill-current text-emerald-500" />
                    Guest ratings
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Highly rated stays are surfaced first in the recommended sort mode.</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h3 className="text-lg font-extrabold text-ink">Map View</h3>
                <MapPinned size={18} className="text-brand-500" />
              </div>
              <div className="relative h-[280px] bg-slate-100">
                <img src="https://picsum.photos/seed/hotel-map-goa/700/500" alt="map preview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[#09254c]/20" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                  Interactive map placeholder
                </div>
              </div>
            </div>
          </aside>

          <section className="min-w-0 flex-1 space-y-4">
            {searchState.error ? (
              <ErrorBanner
                title="Hotel search failed"
                description="The hotel API could not be reached. The page is ready for Geoapify and will fall back to local hotel data when needed."
              />
            ) : null}

            {searchState.loading
              ? Array.from({ length: 5 }).map((_, index) => <LoadingBlock key={index} className="h-[300px]" />)
              : filteredResults.map((hotel) => <HotelResultCard key={hotel.id} hotel={hotel} />)}
          </section>
        </div>
      </div>
    </main>
  );
}
