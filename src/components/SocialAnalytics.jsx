import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DonutChart from './DonutChart';

const SocialAnalytics = () => {
  const currentUser = useSelector(state => state.auth.user);
  const [analytics, setAnalytics] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula il caricamento dei dati
    const loadAnalytics = async () => {
      setIsLoading(true);
      try {
        // Simula una chiamata API
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Dati di esempio - in un'app reale verrebbero dall'API
        const mockAnalytics = [
          {
            id: 1,
            platform: 'instagram',
            username: 'laura_design',
            followers: 15420,
            following: 892,
            posts: 234,
            engagement: 4.2,
            lastUpdated: '2024-01-15T10:30:00Z',
            recentPosts: [
              {
                id: 'ig_1',
                caption: 'Vibes estive vibes 🌞 #summer #vibes',
                likes: 1240,
                comments: 89,
                date: '2024-01-15T08:00:00Z'
              },
              {
                id: 'ig_2', 
                caption: 'Nuovo album in arrivo! 🎵 #music #newalbum',
                likes: 2156,
                comments: 156,
                date: '2024-01-14T12:00:00Z'
              }
            ]
          },
          {
            id: 2,
            platform: 'tiktok',
            username: 'laura_vibes',
            followers: 8920,
            following: 156,
            posts: 89,
            engagement: 8.7,
            lastUpdated: '2024-01-15T09:15:00Z',
            recentPosts: [
              {
                id: 'tt_1',
                caption: 'Caffè e creatività ☕ #coffee #creativity',
                likes: 4560,
                comments: 234,
                views: 125000,
                date: '2024-01-15T07:30:00Z'
              }
            ]
          },
          {
            id: 3,
            platform: 'youtube',
            username: 'laura_creative',
            followers: 3420,
            videos: 45,
            totalViews: 125000,
            engagement: 6.1,
            lastUpdated: '2024-01-15T11:00:00Z',
            recentVideos: [
              {
                id: 'yt_1',
                title: 'Workout completato! 💪 #fitness #motivation',
                views: 8900,
                likes: 456,
                comments: 67,
                date: '2024-01-14T16:00:00Z'
              }
            ]
          }
        ];
        
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Errore nel caricamento analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: '📸',
      twitter: '🐦',
      tiktok: '🎵',
      youtube: '📺',
      linkedin: '💼',
      pinterest: '📌',
      github: '💻',
      twitch: '🎮'
    };
    return icons[platform] || '📱';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      instagram: 'from-pink-500 to-purple-600',
      twitter: 'from-blue-400 to-blue-600',
      tiktok: 'from-black to-gray-800',
      youtube: 'from-red-500 to-red-700',
      linkedin: 'from-blue-600 to-blue-800',
      pinterest: 'from-red-500 to-red-600',
      github: 'from-gray-700 to-gray-900',
      twitch: 'from-purple-500 to-purple-700'
    };
    return colors[platform] || 'from-gray-500 to-gray-700';
  };

  const filteredAnalytics = selectedPlatform === 'all' 
    ? analytics 
    : analytics.filter(item => item.platform === selectedPlatform);

  const totalFollowers = analytics.reduce((sum, item) => sum + item.followers, 0);
  const totalEngagement = analytics.reduce((sum, item) => sum + item.engagement, 0) / analytics.length;

  if (isLoading) {
    return (
      <div className="card-genz p-6">
        <div className="flex items-center justify-center py-12">
          <div className="spinner-genz"></div>
          <span className="ml-3 text-lg">Caricamento analytics social...</span>
        </div>
      </div>
    );
  }

  if (analytics.length === 0) {
    return (
      <div className="card-genz p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            Nessun profilo social collegato
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Collega i tuoi profili social per vedere le analisi qui
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con statistiche totali */}
      <div className="card-genz p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gradient-primary mb-2">
              📊 Analytics Social
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Analisi dei tuoi profili social collegati
            </p>
          </div>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="input-genz px-4 py-2"
          >
            <option value="all">Tutti i social</option>
            {analytics.map(item => (
              <option key={item.platform} value={item.platform}>
                {getPlatformIcon(item.platform)} {item.platform}
              </option>
            ))}
          </select>
        </div>

        {/* Statistiche totali */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stats-card">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">👥</span>
              <div>
                <p className="text-white/80 text-sm">Followers Totali</p>
                <p className="text-2xl font-bold text-white">
                  {totalFollowers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">📈</span>
              <div>
                <p className="text-white/80 text-sm">Engagement Medio</p>
                <p className="text-2xl font-bold text-white">
                  {totalEngagement.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">📱</span>
              <div>
                <p className="text-white/80 text-sm">Piattaforme</p>
                <p className="text-2xl font-bold text-white">
                  {analytics.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grafico distribuzione followers */}
      <div className="card-genz p-6">
        <h4 className="text-xl font-bold mb-4">📊 Distribuzione Followers</h4>
        <div className="h-64">
          {analytics.length > 0 ? (
            <DonutChart
              data={analytics.map(item => ({
                label: `${getPlatformIcon(item.platform)} ${item.platform}`,
                value: item.followers,
                color: item.platform === 'instagram' ? '#E4405F' :
                       item.platform === 'tiktok' ? '#000000' :
                       item.platform === 'youtube' ? '#FF0000' : '#6366F1'
              }))}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <span>Nessun dato disponibile per il grafico</span>
            </div>
          )}
        </div>
      </div>

      {/* Dettagli per piattaforma */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnalytics.map(item => (
          <div key={item.id} className="card-genz p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getPlatformColor(item.platform)} rounded-xl flex items-center justify-center text-2xl`}>
                {getPlatformIcon(item.platform)}
              </div>
              <div>
                <h4 className="text-lg font-bold capitalize">{item.platform}</h4>
                <p className="text-gray-600 dark:text-gray-300">@{item.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-gradient-primary">
                  {item.followers.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Followers</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-gradient-secondary">
                  {item.engagement}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Engagement</p>
              </div>
            </div>

            {/* Post recenti */}
            <div>
              <h5 className="font-semibold mb-3">📝 Post Recenti</h5>
              <div className="space-y-3">
                {(item.recentPosts || item.recentVideos || []).slice(0, 2).map(post => (
                  <div key={post.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium mb-1">
                      {post.caption || post.title}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>❤️ {post.likes?.toLocaleString() || 0}</span>
                      <span>💬 {post.comments?.toLocaleString() || 0}</span>
                      {post.views && <span>👁️ {post.views.toLocaleString()}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialAnalytics; 