import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="page-shell py-20">
      <div className="card-panel mx-auto max-w-2xl p-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-4 text-slate-500">
          The route you requested does not exist in BLISSTRIP. Head back to the live travel modules.
        </p>
        <Link to="/flights" className="mt-6 inline-flex rounded-pill bg-brand-pill px-6 py-3 font-bold uppercase tracking-wide text-white">
          Go to flights
        </Link>
      </div>
    </main>
  );
}
