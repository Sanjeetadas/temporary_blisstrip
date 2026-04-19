import Button from '../common/Button';

export default function PromoStrip({ title, copy }) {
  return (
    <div className="card-panel overflow-hidden">
      <div className="grid items-center gap-6 bg-gradient-to-r from-slate-100 via-white to-sky-50 p-5 md:grid-cols-[1.2fr_1fr_auto] md:p-7">
        <img
          src="https://picsum.photos/seed/blisstrip-promo/520/220"
          alt={title}
          className="h-44 w-full rounded-[22px] object-cover"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-500">Featured Partner</p>
          <h3 className="mt-2 text-2xl font-extrabold text-ink">{title}</h3>
          <p className="mt-3 text-sm text-slate-500">{copy}</p>
        </div>
        <div className="md:justify-self-end">
          <Button type="button">Explore stays</Button>
        </div>
      </div>
    </div>
  );
}
