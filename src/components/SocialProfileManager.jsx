import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const SocialProfileManager = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user);
  const [socialProfiles, setSocialProfiles] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const platforms = [
    { name: 'instagram', icon: '📸', color: 'from-pink-500 to-purple-600', placeholder: '@username' },
    { name: 'twitter', icon: '🐦', color: 'from-blue-400 to-blue-600', placeholder: '@username' },
    { name: 'tiktok', icon: '🎵', color: 'from-black to-gray-800', placeholder: '@username' },
    { name: 'youtube', icon: '📺', color: 'from-red-500 to-red-700', placeholder: 'Channel name' },
    { name: 'linkedin', icon: '💼', color: 'from-blue-600 to-blue-800', placeholder: 'Profile URL' },
    { name: 'pinterest', icon: '📌', color: 'from-red-500 to-red-600', placeholder: '@username' },
    { name: 'github', icon: '💻', color: 'from-gray-700 to-gray-900', placeholder: 'username' },
    { name: 'twitch', icon: '🎮', color: 'from-purple-500 to-purple-700', placeholder: 'username' }
  ];

  useEffect(() => {
    if (currentUser?.socialProfiles) {
      setSocialProfiles(currentUser.socialProfiles);
    }
  }, [currentUser]);

  const handleProfileChange = (platform, value) => {
    setSocialProfiles(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simula una chiamata API per aggiornare i profili social
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Qui andrebbe la chiamata API reale
      // await api.updateUserSocialProfiles(currentUser.id, socialProfiles);
      // Aggiorna il Redux store
      // dispatch(updateUserSocialProfiles(socialProfiles));
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformUrl = (platform, username) => {
    const urls = {
      instagram: `https://instagram.com/${username}`,
      twitter: `https://twitter.com/${username}`,
      tiktok: `https://tiktok.com/@${username}`,
      youtube: `https://youtube.com/@${username}`,
      linkedin: username,
      pinterest: `https://pinterest.com/${username}`,
      github: `https://github.com/${username}`,
      twitch: `https://twitch.tv/${username}`
    };
    return urls[platform] || '#';
  };

  return (
    <div className="card-genz p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gradient-primary mb-2">
            📱 Collegamenti Social
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Collega i tuoi profili social per analizzarli nella dashboard
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-genz-secondary px-6 py-2"
        >
          {isEditing ? '❌ Annulla' : '✏️ Modifica'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map(platform => (
          <div key={platform.name} className="relative">
            <div className={`bg-gradient-to-r ${platform.color} rounded-xl p-4 transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{platform.icon}</span>
                <div className="flex-1">
                  <label className="block text-white font-semibold mb-1 capitalize">
                    {platform.name}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={socialProfiles[platform.name] || ''}
                      onChange={(e) => handleProfileChange(platform.name, e.target.value)}
                      placeholder={platform.placeholder}
                      className="w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">
                        {socialProfiles[platform.name] ? (
                          <a
                            href={getPlatformUrl(platform.name, socialProfiles[platform.name])}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {socialProfiles[platform.name]}
                          </a>
                        ) : (
                          <span className="text-white/50">Non collegato</span>
                        )}
                      </span>
                      {socialProfiles[platform.name] && (
                        <span className="text-green-300 text-sm">✅</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="btn-genz px-6 py-2 disabled:opacity-50"
          >
            {isLoading ? '💾 Salvando...' : '💾 Salva Collegamenti'}
          </button>
        </div>
      )}

      {!isEditing && Object.keys(socialProfiles).some(key => socialProfiles[key]) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <span>🎉</span>
            <span className="font-semibold">Profili collegati!</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            I tuoi profili social sono collegati e pronti per l'analisi nella dashboard.
          </p>
        </div>
      )}
    </div>
  );
};

export default SocialProfileManager; 