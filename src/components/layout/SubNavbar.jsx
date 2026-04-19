import FlightSearchCard from '../search/FlightSearchCard';
import CabSearchCard from '../search/CabSearchCard';
import HotelSearchCard from '../search/HotelSearchCard';
import VillasSearchCard from '../search/VillasSearchCard';
import TrainSearchCard from '../search/TrainSearchCard';
import BusSearchCard from '../search/BusSearchCard';
import SearchCard from '../search/SearchCard';
import { getModuleConfig } from '../../utils/moduleConfigs';
import CategoryTabs from './CategoryTabs';

export default function SubNavbar({ moduleSlug }) {
  const config = getModuleConfig(moduleSlug);
  
  return (
    <div className="shadow-sm relative z-20">
      {/* Category Tabs (Full width white bar on results page) */}
      <div className="bg-white border-b border-slate-200">
        <div className="page-shell">
          <CategoryTabs className="!shadow-none !rounded-none !pt-2 !pb-0" />
        </div>
      </div>

      {/* Search Bar Container (Dark blue gradient) */}
      <div className="bg-[#000000] pb-8 pt-4">
        <div className="page-shell">
          <div className="bg-white rounded-[20px] shadow-lg p-2 md:p-4">
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
  );
}
