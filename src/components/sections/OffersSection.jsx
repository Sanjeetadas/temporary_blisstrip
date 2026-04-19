import LoadingBlock from '../common/LoadingBlock';

export default function OffersSection({ title = 'Offers', items, loading }) {
  const tabs = ['All Offers', 'Bank Offers', 'Flights', 'Hotels', 'Cabs', 'Buses', 'Holidays'];

  return (
    <section className="bg-white rounded-[16px] shadow-sm border border-slate-200 mt-12 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-3xl font-extrabold text-ink mr-8">{title}</h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-none font-semibold text-slate-500 mt-4 md:mt-0 flex-1">
          {tabs.map((tab, idx) => (
            <button key={tab} className={`whitespace-nowrap pb-4 -mb-[17px] border-b-2 transition ${idx === 0 ? 'text-blue-500 border-blue-500' : 'border-transparent hover:text-blue-500'}`}>
              {tab}
            </button>
          ))}
        </div>
        <button className="hidden md:flex items-center gap-2 text-blue-500 font-bold uppercase text-sm whitespace-nowrap">
          View All <span className="text-xl leading-none">&rarr;</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => <LoadingBlock key={index} lines={3} />)
          : items.slice(0, 4).map((offer) => (
              <article key={offer.id} className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
                <img src={offer.image} alt={offer.title} className="w-[120px] h-[120px] object-cover rounded-lg shrink-0" />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{offer.label}</span>
                      <span className="text-[10px] text-slate-400">T&C APPLY</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight text-ink line-clamp-2">{offer.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-1 border-b border-slate-100 pb-2">{offer.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <button className="text-sm font-bold text-blue-500 uppercase">Book Now</button>
                  </div>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
}
