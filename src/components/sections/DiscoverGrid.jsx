import LoadingBlock from '../common/LoadingBlock';
import SectionHeading from '../common/SectionHeading';

export default function DiscoverGrid({ title, items, loading }) {
  return (
    <section className="card-panel p-5 md:p-7">
      <SectionHeading title={title} caption="Dynamic destination cards fetched from shared placeholder content APIs." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => <LoadingBlock key={index} lines={2} />)
          : items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50">
                <img src={item.image} alt={item.name} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-ink">{item.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.caption}</p>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
}
