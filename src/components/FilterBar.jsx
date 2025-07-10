import React from 'react';

const FilterBar = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <select className="input-genz px-6 py-3 min-w-[200px] rounded-full shadow border border-white/40 bg-white/80 dark:bg-slate-900/80 font-semibold text-base focus:ring-2 focus:ring-pink-400/40">
        <option>Blended Data source name</option>
      </select>
      <select className="input-genz px-6 py-3 min-w-[200px] rounded-full shadow border border-white/40 bg-white/80 dark:bg-slate-900/80 font-semibold text-base focus:ring-2 focus:ring-pink-400/40">
        <option>Blended Account Name</option>
      </select>
      <input type="date" className="input-genz px-6 py-3 min-w-[200px] rounded-full shadow border border-white/40 bg-white/80 dark:bg-slate-900/80 font-semibold text-base focus:ring-2 focus:ring-pink-400/40" />
    </div>
  );
};

export default FilterBar; 