import React from 'react';
import { motion } from 'framer-motion';

const TabBar = ({ options, value, onChange }) => {
  return (
    <div className="flex space-x-3 bg-white/70 dark:bg-slate-800/70 rounded-full p-2 w-full max-w-2xl mx-auto shadow-lg mb-4 border border-white/40 backdrop-blur-xl">
      {options.map((tab, i) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`relative flex-1 px-6 py-2 rounded-full font-bold flex items-center justify-center transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-pink-400/40
            ${value === tab.value
              ? 'text-white bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg scale-105'
              : 'text-gray-700 dark:text-gray-200 hover:bg-pink-100/60 dark:hover:bg-pink-900/20'}
          `}
        >
          <span className="mr-2 text-lg">{tab.emoji}</span>
          {tab.label}
          {value === tab.value && (
            <motion.div
              layoutId="tab-underline"
              className="absolute left-2 right-2 bottom-1 h-1 rounded-full bg-gradient-to-r from-pink-400 to-purple-500"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabBar; 