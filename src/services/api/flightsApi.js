import { getMockFlights } from '../mock-data/results';
import { safeRequest } from './client';

export async function searchFlights(query) {
  const apiKey = import.meta.env.VITE_AVIATIONSTACK_API_KEY;

  if (!apiKey) {
    return getMockFlights(query);
  }

  const data = await safeRequest(
    {
      method: 'GET',
      url: 'https://api.aviationstack.com/v1/flights',
      params: {
        access_key: apiKey,
        dep_iata: (query.fromCode || '').toUpperCase(),
        arr_iata: (query.toCode || '').toUpperCase(),
        flight_date: query.departDate,
        limit: 12,
      },
    },
    () => ({ data: [] }),
  );

  const records = data.data || [];
  if (!records.length) {
    return getMockFlights(query);
  }

  return records.slice(0, 10).map((item, index) => ({
    id: item.flight?.iata || `live-flight-${index}`,
    title: `${item.departure?.airport || query.from} to ${item.arrival?.airport || query.to}`,
    subtitle: `${item.airline?.name || 'Airline'} • ${item.flight_status || 'scheduled'}`,
    price: 4500 + index * 1200,
    meta: [
      item.departure?.scheduled?.slice(11, 16) || '06:00',
      item.arrival?.scheduled?.slice(11, 16) || '08:30',
      item.flight?.iata || 'N/A',
      query.cabinClass || 'economy',
    ],
    tag: 'Live API',
  }));
}
