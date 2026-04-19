import { safeRequest } from './client';
import { mapCollectionToDestinations, mapOffersToCards } from '../mock-data/results';

export async function getOffers(category) {
  const data = await safeRequest(
    {
      method: 'GET',
      url: 'https://dummyjson.com/posts',
      params: {
        limit: 12,
        skip: category.length,
      },
    },
    () => ({ posts: [] }),
  );

  return mapOffersToCards(data.posts || [], category);
}

export async function getDestinationCollections(type) {
  const data = await safeRequest(
    {
      method: 'GET',
      url: 'https://dummyjson.com/products',
      params: {
        limit: 12,
        skip: type.length,
      },
    },
    () => ({ products: [] }),
  );

  return mapCollectionToDestinations(
    (data.products || []).map((item) => ({
      title: item.title,
      body: item.description,
    })),
    type,
  );
}
