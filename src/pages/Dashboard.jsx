import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import StatCard from '../components/StatCard';
import DonutChart from '../components/DonutChart';
import TabBar from '../components/TabBar';
import FilterBar from '../components/FilterBar';
import SocialTable from '../components/SocialTable';
import { motion } from 'framer-motion';

const statData = [
  {
    label: 'Total followers',
    value: 42600,
    percent: -2.7,
    color: 'from-pink-400 to-purple-500',
    chart: [80, 20],
    emoji: '👥',
  },
  {
    label: 'New followers',
    value: 5000,
    percent: -45.4,
    color: 'from-pink-400 to-cyan-400',
    chart: [20, 80],
    emoji: '✨',
  },
  {
    label: 'Reactions',
    value: 52000,
    percent: -8.0,
    color: 'from-purple-500 to-pink-400',
    chart: [60, 40],
    emoji: '💬',
  },
  {
    label: 'Impressions',
    value: 846000,
    percent: -37.0,
    color: 'from-cyan-400 to-pink-400',
    chart: [30, 70],
    emoji: '👀',
  },
];

const socialRows = [
  {
    brand: 'Instagram',
    icon: 'instagram',
    color: 'bg-gradient-to-r from-pink-500 to-yellow-400',
    followers: 33900,
    newFollowers: 767,
    shares: 270,
    impressions: 108000,
  },
  {
    brand: 'LinkedIn',
    icon: 'linkedin',
    color: 'bg-blue-600',
    followers: 7600,
    newFollowers: 1100,
    shares: 3,
    impressions: 11400,
  },
  {
    brand: 'Facebook',
    icon: 'facebook',
    color: 'bg-blue-500',
    followers: 1100,
    newFollowers: 4,
    shares: 0,
    impressions: 735,
  },
  {
    brand: 'TikTok',
    icon: 'tiktok',
    color: 'bg-black',
    followers: 0,
    newFollowers: 0,
    shares: 0,
    impressions: 0,
  },
];

const tabOptions = [
  { label: 'Followers', value: 'followers', emoji: '👥' },
  { label: 'Engagement', value: 'engagement', emoji: '💬' },
  { label: 'Visibility', value: 'visibility', emoji: '👀' },
];

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('followers');

  return (
    <div className="min-h-screen font-genz bg-gradient-to-br from-pink-200 via-yellow-100 to-orange-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-x-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 opacity-30 rounded-full blur-3xl z-0 animate-float" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-200 opacity-30 rounded-full blur-3xl z-0 animate-float" />
      <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-orange-200 opacity-20 rounded-full blur-3xl z-0 animate-float" style={{transform:'translate(-50%,-50%)'}} />

      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
          <div className="flex items-center space-x-5">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-4xl shadow-lg animate-float border-4 border-white/60">
                🚀
              </div>
            </motion.div>
            <div>
              <h1 className="text-4xl font-display font-extrabold text-gradient-primary mb-1 tracking-tight">Social Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Welcome back, {user?.name || 'User'}!</p>
            </div>
          </div>
          <FilterBar />
        </div>

        {/* Tabs */}
        <TabBar options={tabOptions} value={activeTab} onChange={setActiveTab} />

        {/* Stat Cards */}
        <div className="dashboard-grid mt-8">
          {statData.map((stat, i) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Social Table */}
        <div className="mt-12">
          <SocialTable rows={socialRows} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 