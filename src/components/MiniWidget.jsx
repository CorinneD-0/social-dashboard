import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Shuffle, TrendingUp, Users } from 'lucide-react';

const MiniWidget = ({ type = 'follower-goal', data = {} }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const followerGoal = {
    current: data.current || 1250,
    target: data.target || 2000,
    icon: Target,
    title: 'Obiettivo Follower',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  };

  const randomPost = {
    icon: Shuffle,
    title: 'Post Casuale',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  };

  const growthRate = {
    rate: data.rate || 12.5,
    icon: TrendingUp,
    title: 'Tasso di Crescita',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  };

  const activeUsers = {
    count: data.count || 847,
    icon: Users,
    title: 'Utenti Attivi',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  };

  const getWidgetData = () => {
    switch (type) {
      case 'follower-goal':
        return followerGoal;
      case 'random-post':
        return randomPost;
      case 'growth-rate':
        return growthRate;
      case 'active-users':
        return activeUsers;
      default:
        return followerGoal;
    }
  };

  const widget = getWidgetData();
  const percentage = type === 'follower-goal' ? Math.round((widget.current / widget.target) * 100) : null;

  const handleRandomPost = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-full ${widget.bgColor}`}>
            <widget.icon className={`w-5 h-5 ${widget.color}`} />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{widget.title}</p>
            {type === 'follower-goal' && (
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {widget.current.toLocaleString()} / {widget.target.toLocaleString()}
              </p>
            )}
            {type === 'growth-rate' && (
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                +{widget.rate}%
              </p>
            )}
            {type === 'active-users' && (
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {widget.count.toLocaleString()}
              </p>
            )}
          </div>
        </div>
        
        {type === 'follower-goal' && (
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {percentage}%
            </div>
            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        )}
        
        {type === 'random-post' && (
          <motion.button
            onClick={handleRandomPost}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={isAnimating ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
            className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors"
          >
            <Shuffle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default MiniWidget; 