import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SectionHeading from '../common/SectionHeading';

export default function FAQSection({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="card-panel p-5 md:p-7">
      <SectionHeading title="Frequently Asked Questions" caption="Helpful answers for integration, UX behaviour, and search flow expectations." />
      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = index === openIndex;

          return (
            <div key={item.q} className="rounded-[20px] border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-ink">{item.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen ? <div className="px-5 pb-5 text-sm leading-7 text-slate-500">{item.a}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
