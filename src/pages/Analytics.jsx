import { useState } from 'react';
import SocialProfileManager from '../components/SocialProfileManager';
import SocialAnalytics from '../components/SocialAnalytics';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="dashboard-grid">
      {/* Header */}
      <div className="col-span-full">
        <div className="card-genz p-6">
          <h1 className="text-3xl font-bold text-gradient-primary mb-2">
            📊 Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitora le performance dei tuoi social media e gestisci i collegamenti
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="col-span-full">
        <div className="card-genz p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              📈 Analytics Social
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'profiles'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              📱 Gestione Profili
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'analytics' && (
        <div className="col-span-full">
          <SocialAnalytics />
        </div>
      )}

      {activeTab === 'profiles' && (
        <div className="col-span-full">
          <SocialProfileManager />
        </div>
      )}
    </div>
  );
}
