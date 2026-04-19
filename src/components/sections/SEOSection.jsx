export default function SEOSection({ items }) {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-card">
          <h3 className="text-2xl font-extrabold text-ink">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-500">{item.body}</p>
        </article>
      ))}
    </section>
  );
}
