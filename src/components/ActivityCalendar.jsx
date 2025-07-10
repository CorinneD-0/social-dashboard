import React from 'react';
import { motion } from 'framer-motion';

const ActivityCalendar = ({ data = [] }) => {
  const generateMockData = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const activity = Math.floor(Math.random() * 5); // 0-4 attività
      days.push({
        date: date.toISOString().split('T')[0],
        activity,
        count: activity
      });
    }
    
    return days;
  };

  const calendarData = data.length > 0 ? data : generateMockData();

  const getActivityColor = (count) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count === 1) return 'bg-green-200 dark:bg-green-900/30';
    if (count === 2) return 'bg-green-300 dark:bg-green-800/50';
    if (count === 3) return 'bg-green-400 dark:bg-green-700/60';
    return 'bg-green-500 dark:bg-green-600/70';
  };

  const getActivityText = (count) => {
    if (count === 0) return 'Nessuna attività';
    if (count === 1) return '1 attività';
    return `${count} attività`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Calendario Attività
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Meno</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
              />
            ))}
          </div>
          <span>Più</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-53 gap-1 min-w-max">
          {calendarData.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.001 }}
              className={`
                w-3 h-3 rounded-sm cursor-pointer transition-all duration-200
                ${getActivityColor(day.count)}
                hover:scale-125 hover:shadow-md
              `}
              title={`${new Date(day.date).toLocaleDateString('it-IT')}: ${getActivityText(day.count)}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Attività degli ultimi 365 giorni</p>
      </div>
    </motion.div>
  );
};

export default ActivityCalendar; 