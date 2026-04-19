import { Funnel, RefreshCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ErrorBanner from '../components/common/ErrorBanner';
import LoadingBlock from '../components/common/LoadingBlock';
import StatStrip from '../components/common/StatStrip';
import ResultsList from '../components/sections/ResultsList';
import SubNavbar from '../components/layout/SubNavbar';
import { useAsyncData } from '../hooks/useAsyncData';
import { searchModule } from '../services/api/searchApi';
import { toResultSummary } from '../services/mock-data/results';
import { getModuleConfig } from '../utils/moduleConfigs';

export default function SearchResultsPage() {
  const { moduleSlug = 'flights' } = useParams();
  const [params] = useSearchParams();
  const [sortBy, setSortBy] = useState('price');
  const config = getModuleConfig(moduleSlug);

  const query = useMemo(() => Object.fromEntries(params.entries()), [params]);

  const searchState = useAsyncData(() => searchModule(moduleSlug, query), [moduleSlug, params.toString()], {
    initialData: [],
  });

  const sortedResults = useMemo(() => {
    const items = [...searchState.data];
    if (sortBy === 'title') {
      return items.sort((a, b) => a.title.localeCompare(b.title));
    }
    return items.sort((a, b) => Number(a.price) - Number(b.price));
  }, [searchState.data, sortBy]);

  const summary = toResultSummary(sortedResults);
  const searchSummary = Object.values(query).filter(Boolean).join(' | ');

  return (
    <main className="bg-[#edf2f7] min-h-screen">
      <div className="w-full">
        <SubNavbar moduleSlug={moduleSlug} />
      </div>

      <div className="page-shell py-6">

      <div className="mt-6">
        <StatStrip
          items={[
            { label: 'Results', value: summary.total },
            { label: 'Cheapest', value: summary.cheapest },
            { label: 'Average', value: summary.average },
            { label: 'Data source', value: import.meta.env.VITE_AVIATIONSTACK_API_KEY || import.meta.env.VITE_GEOAPIFY_API_KEY ? 'Live + fallback' : 'Mock fallback' },
          ]}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        <aside className="card-panel h-fit w-full p-5 lg:w-[280px]">
          <div className="flex items-center gap-2">
            <Funnel size={18} className="text-brand-500" />
            <h2 className="text-lg font-extrabold text-ink">Filters</h2>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Sort by</label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-ink outline-none"
            >
              <option value="price">Price: Low to High</option>
              <option value="title">Name / Route</option>
            </select>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-500">
            The current results page is intentionally frontend-only, so filters can be expanded client-side or forwarded to the relevant API adapter later.
          </p>
        </aside>

        <section className="min-w-0 flex-1 space-y-4">
          {searchState.error ? (
            <ErrorBanner
              title="Search failed"
              description="The adapter hit an issue, so you may want to verify your API key or network access and try again."
            />
          ) : null}
          {searchState.loading
            ? Array.from({ length: 4 }).map((_, index) => <LoadingBlock key={index} className="h-[260px]" />)
            : <ResultsList items={sortedResults} moduleSlug={moduleSlug} />}
        </section>
      </div>
      </div>
    </main>
  );
}
