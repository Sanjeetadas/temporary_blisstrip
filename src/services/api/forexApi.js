import { getMockForex } from '../mock-data/results';
import { safeRequest } from './client';

export async function searchForexQuote(query) {
  const base = query.baseCurrency || 'USD';
  const amount = Number(query.forexAmount || 1);

  const data = await safeRequest(
    {
      method: 'GET',
      url: 'https://api.frankfurter.app/latest',
      params: {
        from: base,
        to: 'INR',
        amount,
      },
    },
    () => null,
  );

  if (!data?.rates?.INR) {
    return getMockForex(query);
  }

  return [
    {
      id: 'forex-live',
      title: `${base} to INR conversion`,
      subtitle: `${query.buyType || 'card'} purchase • Delivery in ${query.deliverAt || 'Delhi'}`,
      price: data.rates.INR,
      meta: [`${amount} ${base}`, `1 ${base} = ${(data.rates.INR / amount).toFixed(2)} INR`, data.date],
      tag: 'Live API',
    },
  ];
}
