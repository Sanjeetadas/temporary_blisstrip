import { Plane } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function FlightResultCard({ flight }) {
  // Assume flight object might be generic from the mock data, or a specific structure
  // If it's from the generic API, we map it to flight-specific fields.
  
  const airline = flight.airline || 'IndiGo';
  const logo = flight.airlineLogo || 'https://picsum.photos/seed/indigo/50/50';
  const depTime = flight.departureTime || '06:00';
  const arrTime = flight.arrivalTime || '08:30';
  const duration = flight.duration || '2h 30m';
  const stops = flight.stops || 'Non-stop';
  const price = flight.price || 4500;
  
  return (
    <article className="card-panel overflow-hidden p-5 border border-slate-200 shadow-sm transition hover:shadow-card bg-white rounded-[24px]">
      <div className="grid gap-5 md:grid-cols-[200px_1fr_auto] items-center">
        {/* Airline Info */}
        <div className="flex items-center gap-4">
          <img src={logo} alt={airline} className="h-10 w-10 rounded-md object-cover bg-slate-50" />
          <div>
            <h3 className="font-extrabold text-ink">{airline}</h3>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{flight.flightNumber || '6E-412'}</p>
          </div>
        </div>
        
        {/* Flight Timing Info */}
        <div className="flex items-center justify-between text-center max-w-lg mx-auto w-full px-4">
          <div>
            <p className="text-2xl font-extrabold text-ink">{depTime}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{flight.origin || 'DEL'}</p>
          </div>
          
          <div className="flex flex-col items-center px-4 flex-1">
            <p className="text-xs font-bold text-slate-500 mb-1">{duration}</p>
            <div className="flex items-center w-full gap-2 text-slate-300">
              <div className="h-[2px] bg-slate-200 flex-1"></div>
              <Plane size={14} className="text-brand-500 fill-brand-500" />
              <div className="h-[2px] bg-slate-200 flex-1"></div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">{stops}</p>
          </div>
          
          <div>
            <p className="text-2xl font-extrabold text-ink">{arrTime}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{flight.destination || 'BLR'}</p>
          </div>
        </div>
        
        {/* Pricing and Action */}
        <div className="flex flex-col items-start justify-between md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-5">
          <p className="text-2xl font-extrabold text-ink">{formatCurrency(price)}</p>
          <p className="text-xs text-slate-500 font-semibold mb-4 text-right">per adult</p>
          <button className="rounded-pill bg-brand-pill px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:scale-[1.02] shadow-md w-full md:w-auto">
            Select
          </button>
        </div>
      </div>
    </article>
  );
}
