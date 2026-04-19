import { getMockBuses, getMockTrains } from '../mock-data/results';
import { safeRequest } from './client';

export async function searchTrains(query) {
  const rapidKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const host = import.meta.env.VITE_RAPIDAPI_HOST_TRAINS;

  if (!rapidKey || !host) return getMockTrains(query);

  const data = await safeRequest(
    {
      method: 'GET',
      url: `https://${host}/searchTrain`,
      params: {
        source: query.from,
        destination: query.to,
        date: query.departDate,
      },
      headers: {
        'X-RapidAPI-Key': rapidKey,
        'X-RapidAPI-Host': host,
      },
    },
    () => ({ data: [] }),
  );

  if (!data?.data?.length) return getMockTrains(query);

  return data.data.slice(0, 10).map((item, index) => ({
    id: item.train_number || `train-${index}`,
    title: item.train_name || 'Train',
    subtitle: `${query.from} to ${query.to}`,
    price: 1200 + index * 220,
    meta: [item.departure_time, item.arrival_time, item.travel_time, query.classType || '3A'],
    tag: 'Live API',
  }));
}

export async function searchBuses(query) {
  const rapidKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const host = import.meta.env.VITE_RAPIDAPI_HOST_BUSES;

  if (!rapidKey || !host) return getMockBuses(query);

  const data = await safeRequest(
    {
      method: 'GET',
      url: `https://${host}/search`,
      params: {
        from: query.from,
        to: query.to,
        date: query.departDate,
      },
      headers: {
        'X-RapidAPI-Key': rapidKey,
        'X-RapidAPI-Host': host,
      },
    },
    () => ({ data: [] }),
  );

  if (!data?.data?.length) return getMockBuses(query);

  return data.data.slice(0, 10).map((item, index) => ({
    id: item.id || `bus-${index}`,
    title: item.operator_name || 'Bus operator',
    subtitle: `${query.from} to ${query.to}`,
    price: item.price || 1200 + index * 180,
    meta: [item.departure_time, item.arrival_time, item.duration, item.bus_type || 'AC'],
    tag: 'Live API',
  }));
}
