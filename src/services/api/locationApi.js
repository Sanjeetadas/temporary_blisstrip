import { safeRequest } from './client';

export async function searchLocations(searchText) {
  if (!searchText || searchText.trim().length < 2) return [];

  const geoapifyKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  if (geoapifyKey) {
    const data = await safeRequest({
      method: 'GET',
      url: 'https://api.geoapify.com/v1/geocode/autocomplete',
      params: {
        text: searchText,
        apiKey: geoapifyKey,
        limit: 6,
      },
    });

    return (data.features || []).map((feature) => ({
      id: feature.properties.place_id,
      name: feature.properties.formatted,
      lat: feature.properties.lat,
      lon: feature.properties.lon,
      country: feature.properties.country,
    }));
  }

  const data = await safeRequest({
    method: 'GET',
    url: 'https://nominatim.openstreetmap.org/search',
    params: {
      q: searchText,
      format: 'jsonv2',
      limit: 6,
    },
    headers: {
      Accept: 'application/json',
    },
  });

  return (data || []).map((item) => ({
    id: item.place_id,
    name: item.display_name,
    lat: item.lat,
    lon: item.lon,
    country: item.address?.country || '',
  }));
}
