import React from 'react';
import { motion } from 'framer-motion';

const DonutChart = ({ data, value, color = 'from-pink-400 to-purple-500', size = 200, stroke = 20 }) => {
  if (data && Array.isArray(data)) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    
    let currentAngle = 0;
    
    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;
            
            const startX = size / 2 + radius * Math.cos((startAngle * Math.PI) / 180);
            const startY = size / 2 + radius * Math.sin((startAngle * Math.PI) / 180);
            const endX = size / 2 + radius * Math.cos((currentAngle * Math.PI) / 180);
            const endY = size / 2 + radius * Math.sin((currentAngle * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${startX} ${startY}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              'L ' + size / 2 + ' ' + size / 2,
              'Z'
            ].join(' ');
            
            return (
              <motion.path
                key={index}
                d={pathData}
                fill={item.color || '#6366F1'}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              />
            );
          })}
        </svg>
        
        {/* Legenda */}
        <div className="absolute -bottom-20 left-0 right-0">
          <div className="flex flex-wrap justify-center gap-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color || '#6366F1' }}
                ></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#genz-gradient)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1 }}
        />
        <defs>
          <linearGradient id="genz-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff6b9d" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold font-display text-gradient-primary select-none">
        {value}%
      </div>
    </div>
  );
};

export default DonutChart; 