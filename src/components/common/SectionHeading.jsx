export default function SectionHeading({ title, caption, action }) {
  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">{title}</h2>
        {caption ? <p className="mt-2 max-w-2xl text-sm text-slate-500">{caption}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
