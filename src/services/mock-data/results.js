import { formatCurrency } from '../../utils/formatters';
import { pickPropertyImage } from '../../utils/propertyMedia';

function seededPrice(seed, multiplier = 1) {
  return Math.round((seed * 913) % 9000) * multiplier + 999;
}

export function getMockFlights(query) {
  const from = query.from || 'Delhi';
  const to = query.to || 'Bengaluru';

  return Array.from({ length: 8 }, (_, index) => ({
    id: `flt-${index + 1}`,
    title: `${from} to ${to}`,
    subtitle: `${['IndiAir', 'SkyVista', 'JetNova', 'BlueWings'][index % 4]} • ${['Non-stop', '1 stop'][index % 2]}`,
    price: seededPrice(index + 2, 2),
    meta: [`${6 + index}:15 AM`, `${8 + index}:45 AM`, `${1 + (index % 3)}h ${20 + index}m`, ['Economy', 'Premium Economy', 'Business'][index % 3]],
    tag: index % 2 === 0 ? 'Best Value' : 'Fastest',
  }));
}

export function getMockStays(query, mode = 'hotel') {
  const destination = query.destination || query.city || 'Goa';
  const amenitySets = [
    ['Free breakfast', 'Pool', 'Wi-Fi', 'Parking'],
    ['Beach access', 'Restaurant', 'Free cancellation', 'Couple friendly'],
    ['Spa', 'Airport shuttle', 'Gym', 'Early check-in'],
    ['Rooftop dining', 'City center', 'Family rooms', '24x7 desk'],
  ];

  return Array.from({ length: 9 }, (_, index) => ({
    id: `${mode}-${index + 1}`,
    title: `${['Azure', 'Palm', 'Luxe', 'Sunset', 'Harbor', 'Blue', 'Royal', 'Olive', 'Cove'][index]} ${mode === 'villa' ? 'Retreat' : 'Stay'}`,
    subtitle: `${destination} • ${['Free breakfast', 'Pool access', 'Couple friendly', 'Near city center'][index % 4]}`,
    price: seededPrice(index + 3, mode === 'villa' ? 5 : 3),
    rating: (4 + ((index % 9) / 10)).toFixed(1),
    meta: [`${index + 2} guests`, `${index % 2 === 0 ? 'Free cancellation' : 'Pay later'}`, `${index + 4} km from center`],
    tag: mode === 'villa' ? 'Private stay' : 'Top rated',
    image: pickPropertyImage(destination, mode === 'villa' ? 'villa' : 'hotel', index),
    locality: ['Calangute', 'Baga', 'Candolim', 'Panaji', 'Anjuna', 'Colva'][index % 6],
    address: `${index + 1}, ${destination} Beach Road`,
    reviewCount: 120 + index * 34,
    taxes: 499 + index * 48,
    strikePrice: seededPrice(index + 3, mode === 'villa' ? 6 : 4),
    amenities: amenitySets[index % amenitySets.length],
    type: mode === 'villa' ? 'Villa' : 'Hotel',
    distance: `${(1.2 + index * 0.7).toFixed(1)} km from city centre`,
  }));
}

export function getMockTrains(query) {
  const from = query.from || 'New Delhi';
  const to = query.to || 'Kanpur';

  return Array.from({ length: 7 }, (_, index) => ({
    id: `train-${index + 1}`,
    title: `${['Shatabdi', 'Rajdhani', 'Vande Bharat', 'Duronto'][index % 4]} Express`,
    subtitle: `${from} to ${to}`,
    price: seededPrice(index + 2),
    meta: [`${5 + index}:10`, `${8 + index}:50`, `${3 + (index % 3)}h ${10 + index}m`, ['SL', '3A', '2A', 'CC'][index % 4]],
    tag: index % 2 === 0 ? 'Confirmed seats likely' : 'Popular route',
  }));
}

export function getMockBuses(query) {
  const from = query.from || 'Jalandhar';
  const to = query.to || 'Delhi';

  return Array.from({ length: 8 }, (_, index) => ({
    id: `bus-${index + 1}`,
    title: `${['Northern Travels', 'InterCity Express', 'RoadNest', 'Sunrise Buses'][index % 4]}`,
    subtitle: `${from} to ${to}`,
    price: seededPrice(index + 5),
    meta: [`${7 + index}:00 PM`, `${1 + index}:15 AM`, `${5 + (index % 3)}h ${(index + 1) * 5}m`, ['AC Sleeper', 'AC Seater', 'Non-AC Sleeper', 'Volvo'][index % 4]],
    tag: index % 2 === 0 ? 'Top operator' : 'Low fare',
  }));
}

export function getMockForex(query) {
  const amount = Number(query.forexAmount || 1000);
  const base = query.baseCurrency || 'USD';
  const rate = base === 'EUR' ? 91.8 : base === 'GBP' ? 107.4 : 84.7;

  return [
    {
      id: 'fx-1',
      title: `${base} to INR`,
      subtitle: `Multi-currency ${query.buyType || 'card'} quote`,
      price: amount * rate,
      meta: [`${amount} ${base}`, `1 ${base} = ${rate} INR`, query.deliverAt || 'Delhi'],
      tag: 'Live-ready quote',
    },
  ];
}

export function mapOffersToCards(items = [], category = 'travel') {
  return items.slice(0, 8).map((item, index) => ({
    id: `${category}-${item.id ?? index}`,
    title: item.title || item.name || 'Travel deal',
    description: item.body || item.description || 'Discover special offers for your next trip.',
    image: `https://picsum.photos/seed/${category}-${index + 1}/640/420`,
    label: ['Flights', 'Hotels', 'Bank Offer', 'Holiday'][index % 4],
    cta: 'Book now',
  }));
}

export function mapCollectionToDestinations(items = [], type = 'destination') {
  return items.slice(0, 12).map((item, index) => ({
    id: `${type}-${index + 1}`,
    name: item.title || item.name || `Destination ${index + 1}`,
    caption: item.body || item.description || 'Curated for travel discovery.',
    image: `https://picsum.photos/seed/${type}-city-${index + 1}/320/220`,
  }));
}

export function toResultSummary(results = [], currency = 'INR') {
  if (!results.length) {
    return { total: 0, cheapest: 'N/A', average: 'N/A' };
  }

  const prices = results.map((item) => Number(item.price || 0));
  const cheapest = Math.min(...prices);
  const average = prices.reduce((sum, value) => sum + value, 0) / prices.length;

  return {
    total: results.length,
    cheapest: formatCurrency(cheapest, currency),
    average: formatCurrency(average, currency),
  };
}
