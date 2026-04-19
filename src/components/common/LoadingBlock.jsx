export default function LoadingBlock({ lines = 3, className = '' }) {
  return (
    <div className={`animate-pulse rounded-[22px] border border-slate-200 bg-white p-5 shadow-card ${className}`}>
      <div className="h-40 rounded-[18px] bg-slate-200" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 rounded-full bg-slate-200 ${index === lines - 1 ? 'w-1/2' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  );
}
