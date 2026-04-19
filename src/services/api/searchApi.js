import { getMockBuses, getMockFlights, getMockForex, getMockStays } from '../mock-data/results';
import { searchFlights } from './flightsApi';
import { searchForexQuote } from './forexApi';
import { searchHotels, searchHomestays } from './staysApi';
import { searchBuses, searchTrains } from './transportApi';

export async function searchModule(moduleSlug, query) {
  switch (moduleSlug) {
    case 'flights':
      return searchFlights(query);
    case 'hotels':
      return searchHotels(query);
    case 'homestays':
      return searchHomestays(query);
    case 'trains':
      return searchTrains(query);
    case 'buses':
      return searchBuses(query);
    case 'forex':
      return searchForexQuote(query);
    case 'cabs':
      return getMockBuses({ ...query, from: query.pickup, to: query.drop });
    case 'attractions':
      return getMockStays({ destination: query.destination }, 'villa');
    case 'visa':
      return getMockStays({ destination: query.destination }, 'hotel');
    case 'cruise':
      return getMockStays({ destination: query.destination }, 'villa');
    case 'insurance':
      return getMockForex({ baseCurrency: 'USD', forexAmount: 1, deliverAt: query.destination, buyType: 'plan' });
    default:
      return getMockFlights(query);
  }
}
