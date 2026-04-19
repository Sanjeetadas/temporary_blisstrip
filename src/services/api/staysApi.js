import { getMockStays } from '../mock-data/results';
import { pickPropertyImage } from '../../utils/propertyMedia';
import { searchLocations } from './locationApi';
import { safeRequest } from './client';

async function searchGeoapifyStays(query, categories, propertyType = 'hotel') {
  const key = import.meta.env.VITE_GEOAPIFY_API_KEY;
  if (!key) return [];

  const location = await searchLocations(query.destination || query.city || '');
  const firstLocation = location[0];
  if (!firstLocation) return [];

  const data = await safeRequest(
    {
      method: 'GET',
      url: 'https://api.geoapify.com/v2/places',
      params: {
        categories,
        filter: `circle:${firstLocation.lon},${firstLocation.lat},12000`,
        limit: 12,
        apiKey: key,
      },
    },
    () => ({ features: [] }),
  );

  return (data.features || []).map((item, index) => ({
    id: item.properties.place_id || `stay-${index}`,
    title: item.properties.name || `${query.destination} Stay`,
    subtitle: item.properties.formatted || item.properties.address_line2 || 'Curated stay',
    price: 3200 + index * 900,
    rating: (4 + ((index % 7) / 10)).toFixed(1),
    meta: [`${query.guests || 2} guests`, `${query.rooms || 1} room`, item.properties.city || query.destination || 'Destination'],
    tag: 'Live API',
    image: pickPropertyImage(query.destination || item.properties.city || '', propertyType, index),
    locality: item.properties.suburb || item.properties.district || item.properties.city || query.destination || 'Destination',
    address: item.properties.formatted || item.properties.address_line2 || 'Address unavailable',
    reviewCount: 180 + index * 23,
    taxes: 550 + index * 60,
    strikePrice: 4200 + index * 1100,
    amenities: [
      ['Free Wi-Fi', 'Breakfast included', 'Parking', 'Air conditioning'],
      ['Pool', 'Restaurant', 'Gym', 'Room service'],
      ['Free cancellation', 'Pay at hotel', 'Family rooms', 'Airport transfer'],
    ][index % 3],
    type: propertyType === 'villa' ? 'Villa' : 'Hotel',
    distance: `${(1.1 + index * 0.8).toFixed(1)} km from centre`,
  }));
}

export async function searchHotels(query) {
  const live = await searchGeoapifyStays(query, 'accommodation.hotel', 'hotel');
  return live.length ? live : getMockStays(query, 'hotel');
}

export async function searchHomestays(query) {
  const live = await searchGeoapifyStays(query, 'accommodation.apartment,accommodation.guest_house', 'villa');
  return live.length ? live : getMockStays(query, 'villa');
}
