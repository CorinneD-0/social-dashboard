import React from 'react';

const socialIcons = {
  instagram: (
    <span className="text-2xl" style={{ color: '#E1306C' }}>📸</span>
  ),
  linkedin: (
    <span className="text-2xl" style={{ color: '#0077B5' }}>💼</span>
  ),
  facebook: (
    <span className="text-2xl" style={{ color: '#1877F3' }}>📘</span>
  ),
  tiktok: (
    <span className="text-2xl" style={{ color: '#000' }}>🎵</span>
  ),
};

const SocialTable = ({ rows }) => {
  const totalFollowers = rows.reduce((sum, r) => sum + r.followers, 0);
  const totalNewFollowers = rows.reduce((sum, r) => sum + r.newFollowers, 0);
  const totalShares = rows.reduce((sum, r) => sum + r.shares, 0);
  const totalImpressions = rows.reduce((sum, r) => sum + r.impressions, 0);

  return (
    <div className="overflow-x-auto rounded-3xl shadow-2xl card-genz border border-white/40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80">
      <table className="min-w-full text-base text-left">
        <thead className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90">
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="py-4 px-5 font-bold">Brand</th>
            <th className="py-4 px-5 font-bold">Total Followers</th>
            <th className="py-4 px-5 font-bold">New Followers</th>
            <th className="py-4 px-5 font-bold">Shares</th>
            <th className="py-4 px-5 font-bold">Impressions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.brand} className={`transition-colors ${i % 2 === 0 ? 'bg-pink-50/40 dark:bg-pink-900/10' : 'bg-white/0 dark:bg-slate-900/0'} hover:bg-pink-100/60 dark:hover:bg-pink-900/20`}>
              <td className="py-4 px-5 flex items-center space-x-3 font-semibold">
                <span className={`rounded-full p-2 text-3xl shadow ${row.color}`}>{socialIcons[row.icon]}</span>
                <span className="ml-2 text-base font-bold">{row.brand}</span>
              </td>
              <td className="py-4 px-5">{row.followers.toLocaleString()}</td>
              <td className="py-4 px-5">{row.newFollowers.toLocaleString()}</td>
              <td className="py-4 px-5">{row.shares.toLocaleString()}</td>
              <td className="py-4 px-5">{row.impressions.toLocaleString()}</td>
            </tr>
          ))}
          <tr className="bg-gradient-to-r from-pink-200 via-yellow-100 to-orange-100 dark:from-pink-900/40 dark:via-yellow-900/20 dark:to-orange-900/20 font-extrabold text-gray-900 dark:text-white rounded-b-3xl">
            <td className="py-4 px-5">Grand total</td>
            <td className="py-4 px-5">{totalFollowers.toLocaleString()}</td>
            <td className="py-4 px-5">{totalNewFollowers.toLocaleString()}</td>
            <td className="py-4 px-5">{totalShares.toLocaleString()}</td>
            <td className="py-4 px-5">{totalImpressions.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SocialTable; 