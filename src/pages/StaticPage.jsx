export default function StaticPage({ title, content }) {
  return (
    <main className="page-shell py-16 min-h-[50vh]">
      <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto rounded-[24px]">
        <h1 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight mb-6">{title}</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          {content || <p>This page is currently under construction. Check back soon for more details.</p>}
        </div>
      </div>
    </main>
  );
}
