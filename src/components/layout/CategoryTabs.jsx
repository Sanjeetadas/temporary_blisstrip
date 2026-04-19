import { NavLink } from 'react-router-dom';
import { getModuleConfig, moduleOrder } from '../../utils/moduleConfigs';

export default function CategoryTabs({ className = "" }) {
  return (
    <div className={`bg-white rounded-[40px] shadow-sm px-6 ${className}`}>
      <div className="flex justify-between items-center w-full">
        {moduleOrder.map((slug) => {
          const module = getModuleConfig(slug);
          const Icon = module.icon;

          return (
            <NavLink
              key={slug}
              to={`/${slug}`}
              className={({ isActive }) =>
                `group flex flex-col items-center gap-1 text-center transition px-1 py-3 border-b-4 ${
                  isActive ? 'text-blue-500 border-blue-500' : 'text-slate-500 hover:text-blue-500 border-transparent'
                }`
              }
            >
              <div className="p-1 transition">
                <Icon size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-semibold leading-tight whitespace-nowrap">{module.title}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
