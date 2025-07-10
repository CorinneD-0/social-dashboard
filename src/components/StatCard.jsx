import React from 'react';
import DonutChart from './DonutChart';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, percent, color, chart, emoji }) => {
  const isNegative = percent < 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(255,107,157,0.12)' }}
      className="relative bg-white/80 dark:bg-slate-900/80 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center backdrop-blur-xl border border-white/40 transition-transform duration-200"
    >
      <div className="absolute top-5 right-5 text-3xl animate-float select-none pointer-events-none">{emoji}</div>
      <DonutChart value={chart[0]} color={color} size={90} stroke={12} />
      <div className="mt-6">
        <div className="text-4xl font-extrabold font-display text-gray-900 dark:text-white tracking-tight">
          {value.toLocaleString()}
        </div>
        <div className="text-base text-gray-500 dark:text-gray-300 mt-1 font-semibold">{label}</div>
      </div>
      <div className={`mt-6 inline-block px-4 py-1 rounded-full text-xs font-bold shadow ${isNegative ? 'bg-gradient-to-r from-pink-400 to-red-400 text-white' : 'bg-gradient-to-r from-green-400 to-lime-400 text-white'}`}>
        {isNegative ? '\u25bc' : '\u25b2'} {Math.abs(percent)}%
      </div>
    </motion.div>
  );
};

export default StatCard; 