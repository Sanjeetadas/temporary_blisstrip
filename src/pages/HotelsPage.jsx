import { Download, MapPin, ShieldCheck, Star } from 'lucide-react';
import { useAsyncData } from '../hooks/useAsyncData';
import { getDestinationCollections, getOffers } from '../services/api/offersApi';
import CategoryTabs from '../components/layout/CategoryTabs';
import HotelSearchCard from '../components/search/HotelSearchCard';
import { getModuleConfig } from '../utils/moduleConfigs';

function OfferSkeleton() {
  return <div className="h-36 animate-pulse rounded-[20px] bg-slate-100" />;
}

export default function HotelsPage() {
  const config = getModuleConfig('hotels');
  const offersState = useAsyncData(() => getOffers('hotels'), ['hotels'], { initialData: [] });
  const destinationsState = useAsyncData(() => getDestinationCollections('hotel'), ['hotel'], { initialData: [] });

  return (
    <main>
      <section className="hero-overlay pb-14 pt-8 md:pb-24" style={{ '--hero-image': config.heroImage, minHeight: '480px' }}>
        <div className="page-shell flex flex-col items-center">
          <div className="w-full max-w-6xl mt-12 relative z-10 flex flex-col items-center">
            {/* Floating Category Tabs */}
            <div className="absolute -top-[34px] w-full max-w-5xl z-20">
              <CategoryTabs />
            </div>
            
            {/* The Unified Search Container */}
            <div className="bg-white rounded-[20px] shadow-lg flex flex-col w-full pt-10">
              <div className="p-4 md:p-8 relative">
                <HotelSearchCard config={config} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-shell -mt-6 space-y-6 md:space-y-8">
        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-card md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-ink md:text-4xl">Offers</h2>
              <div className="hidden gap-3 text-sm font-semibold text-slate-400 md:flex">
                <span className="text-brand-500">Hotels</span>
                <span>All Offers</span>
                <span>Bank Offers</span>
              </div>
            </div>
            <a href="#" className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-500">View all</a>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {offersState.loading
              ? Array.from({ length: 6 }).map((_, index) => <OfferSkeleton key={index} />)
              : offersState.data.slice(0, 6).map((offer) => (
                  <article key={offer.id} className="grid grid-cols-[120px_1fr] overflow-hidden rounded-[20px] border border-slate-200">
                    <img src={offer.image} alt={offer.title} className="h-full min-h-[140px] w-full object-cover" />
                    <div className="p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{offer.label}</p>
                      <h3 className="mt-2 text-xl font-extrabold leading-tight text-ink">{offer.title}</h3>
                      <p className="mt-3 text-sm text-slate-500">{offer.description}</p>
                      <button className="mt-4 text-sm font-extrabold uppercase tracking-[0.14em] text-brand-500">Book now</button>
                    </div>
                  </article>
                ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-card">
          <div className="grid gap-0 md:grid-cols-[220px_1fr_220px]">
            <img src="https://picsum.photos/seed/hotel-partner-left/600/260" alt="partner" className="h-full min-h-[180px] w-full object-cover" />
            <div className="flex flex-col justify-center px-6 py-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-500">Partner Offer</p>
              <h3 className="mt-3 text-3xl font-extrabold text-ink">Enjoy the perfect stay at every destination</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">A featured campaign strip styled to match the hotel landing reference with a wide partner banner feel.</p>
            </div>
            <div className="flex items-center justify-center p-6">
              <button className="rounded-[14px] bg-[#1556c7] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white">Explore stays</button>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-gradient-to-r from-slate-50 to-sky-50 p-5 shadow-card md:p-6">
          <div className="grid gap-5 md:grid-cols-[1.1fr_1.4fr]">
            <div className="rounded-[22px] bg-[#dfefff] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-500">Featured Collection</p>
              <h3 className="mt-3 text-3xl font-extrabold text-ink">Flagship hotel stores on BLISSTRIP</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">A premium destination grid inspired by the MakeMyTrip hotel page sections.</p>
            </div>
            <div className="overflow-hidden rounded-[22px]">
              <img src="https://picsum.photos/seed/flagship-hotel-blisstrip/1200/520" alt="flagship hotel" className="h-full min-h-[220px] w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-card md:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_auto_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-[18px] bg-orange-50 p-3 text-orange-500">
                  <Download size={22} />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-ink">Download App Now !</h3>
                  <p className="mt-2 text-sm text-slate-500">Use code WELCOMEBLISS and get hotel booking offers on your first stay.</p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3 md:flex-row">
                <div className="flex-1 rounded-[16px] border border-slate-200 px-4 py-3 text-slate-400">+91  Enter Mobile number</div>
                <button className="rounded-[16px] border border-brand-500 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-brand-500">Get App Link</button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-[14px] bg-black px-5 py-3 text-sm font-bold text-white">Get it on Google Play</div>
              <div className="rounded-[14px] bg-black px-5 py-3 text-sm font-bold text-white">Download on the App Store</div>
            </div>
            <div className="flex h-[112px] w-[112px] items-center justify-center rounded-[18px] border border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              QR Code
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-card md:p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {(destinationsState.data || []).slice(0, 12).map((city, index) => (
              <article key={city.id} className="flex items-start gap-4 rounded-[18px] p-2">
                <img src={city.image} alt={city.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <h3 className="text-xl font-bold text-ink">{city.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{city.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-card md:p-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Why book a hotel online with BLISSTRIP?', 'A familiar OTA-style layout, dynamic offers, destination discovery, and a real search flow make the booking experience feel close to production.'],
              ['How to find the cheapest hotel deals?', 'Use the search flow, adjust room and guest preferences, then refine by pricing and property details on the results page.'],
              ['How to find the best hotels near me?', 'Destination-aware search suggestions help users land on relevant local areas before results are fetched.'],
              ['Where can I find current hotel deals?', 'The landing page loads dynamic hotel offers instead of hardcoding campaigns, so the content remains flexible.'],
            ].map(([title, body]) => (
              <article key={title} className="border-t border-slate-100 pt-4">
                <h3 className="text-xl font-extrabold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ['Property assurance', '100%', ShieldCheck],
            ['Guest score confidence', '4.6+', Star],
            ['Top city coverage', '24x7', MapPin],
            ['Price comparisons', 'Easy Pay', ShieldCheck],
          ].map(([label, value, Icon]) => (
            <div key={label} className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-card">
              <Icon size={20} className="text-brand-500" />
              <p className="mt-4 text-3xl font-extrabold text-ink">{value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-500">{label}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
