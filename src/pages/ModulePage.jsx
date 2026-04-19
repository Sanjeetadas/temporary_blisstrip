import { useMemo } from 'react';
import StatStrip from '../components/common/StatStrip';
import DiscoverGrid from '../components/sections/DiscoverGrid';
import FAQSection from '../components/sections/FAQSection';
import OffersSection from '../components/sections/OffersSection';
import PromoStrip from '../components/sections/PromoStrip';
import CategoryTabs from '../components/layout/CategoryTabs';
import FlightSearchCard from '../components/search/FlightSearchCard';
import CabSearchCard from '../components/search/CabSearchCard';
import HotelSearchCard from '../components/search/HotelSearchCard';
import VillasSearchCard from '../components/search/VillasSearchCard';
import TrainSearchCard from '../components/search/TrainSearchCard';
import BusSearchCard from '../components/search/BusSearchCard';
import SearchCard from '../components/search/SearchCard';
import CruisePromo from '../components/sections/CruisePromo';
import { useAsyncData } from '../hooks/useAsyncData';
import SEOSection from '../components/sections/SEOSection';
import { getDestinationCollections, getOffers } from '../services/api/offersApi';
import { getModuleConfig } from '../utils/moduleConfigs';
import { useParams } from 'react-router-dom';

export default function ModulePage({ moduleSlug: propSlug }) {
  const params = useParams();
  const moduleSlug = propSlug || params.moduleSlug || 'flights';
  const config = getModuleConfig(moduleSlug);

  const offersState = useAsyncData(() => getOffers(moduleSlug), [moduleSlug], { initialData: [] });
  const destinationsState = useAsyncData(() => getDestinationCollections(config.discoverType), [config.discoverType], {
    initialData: [],
  });

  const stats = useMemo(
    () => [
      { label: 'Modules', value: '11 live routes' },
      { label: 'Search UX', value: 'Dynamic form state' },
      { label: 'Offers', value: 'API-driven cards' },
      { label: 'Fallbacks', value: 'Mock-ready services' },
    ],
    [],
  );

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
                {moduleSlug === 'flights' ? <FlightSearchCard config={config} /> : 
                 moduleSlug === 'cabs' ? <CabSearchCard config={config} /> : 
                 moduleSlug === 'hotels' ? <HotelSearchCard config={config} /> : 
                 moduleSlug === 'homestays' ? <VillasSearchCard config={config} /> : 
                 moduleSlug === 'trains' ? <TrainSearchCard config={config} /> : 
                 moduleSlug === 'buses' ? <BusSearchCard config={config} /> : 
                 <SearchCard config={config} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-shell mt-12 space-y-6 md:space-y-8">
        {moduleSlug === 'cruise' && <CruisePromo />}

        {(moduleSlug === 'hotels' || moduleSlug === 'homestays') && (
          <div className="bg-white rounded-[16px] shadow-sm border border-slate-200 overflow-hidden flex items-center justify-between mt-8 p-4">
            <div className="flex items-center gap-6">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80" alt="Ad" className="w-[120px] h-[70px] object-cover rounded-lg" />
              <div className="flex flex-col">
                <span className="text-blue-500 font-extrabold text-2xl uppercase tracking-wider">SAROVAR HOTELS</span>
              </div>
            </div>
            <div className="text-xl font-extrabold text-ink">Enjoy the Perfect Stay at Every<br/>Destination with Sarovar Hotels!</div>
            <button className="bg-[#0b58b4] text-white font-bold px-6 py-3 rounded-md text-sm uppercase mr-4">EXPLORE STAYS</button>
          </div>
        )}
        
        {moduleSlug !== 'cruise' && (
          <OffersSection
            items={offersState.data}
            loading={offersState.loading}
          />
        )}
        <DiscoverGrid title={config.discoverTitle} items={destinationsState.data} loading={destinationsState.loading} />
      </div>

      {/* SEO and FAQ Full Width Block */}
      <div className="bg-[#eef2f6] mt-12 py-12">
        <div className="page-shell space-y-8">
          <SEOSection items={config.seoSections} />
          <FAQSection items={config.faqItems} />
        </div>
      </div>
    </main>
  );
}
