export default function StatStrip({ items }) {
  return (
    <div className="grid gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-[18px] bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
          <p className="mt-2 text-2xl font-extrabold text-ink">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
