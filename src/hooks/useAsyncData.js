import { useCallback, useEffect, useState } from 'react';

export function useAsyncData(fetcher, deps = [], options = {}) {
  const { immediate = true, initialData = [] } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetcher();
      setData(response);
      return response;
    } catch (fetchError) {
      setError(fetchError);
      throw fetchError;
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    if (immediate) {
      run().catch(() => null);
    }
  }, [immediate, run]);

  return { data, loading, error, run, setData };
}
