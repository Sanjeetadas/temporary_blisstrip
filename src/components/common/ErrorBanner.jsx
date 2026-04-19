export default function ErrorBanner({ title = 'Something went wrong', description }) {
  return (
    <div className="rounded-[20px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      <p className="font-semibold">{title}</p>
      {description ? <p className="mt-1">{description}</p> : null}
    </div>
  );
}
