import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Verifica che l'utente sia admin
    if (!user || user.role !== 'admin') {
      navigate('/feed');
      return;
    }
    
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersResponse, postsResponse] = await Promise.all([
        fetch('http://localhost:3001/users'),
        fetch('http://localhost:3001/posts')
      ]);
      
      const usersData = await usersResponse.json();
      const postsData = await postsResponse.json();
      
      setUsers(usersData);
      setPosts(postsData);
    } catch (error) {
      console.error('Errore nel caricamento dati:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo utente?')) return;
    
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE'
      });
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Errore nell\'eliminazione utente:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo post?')) return;
    
    try {
      await fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'DELETE'
      });
      setPosts(posts.filter(p => p.id !== postId));
    } catch (error) {
      console.error('Errore nell\'eliminazione post:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-grid">
        <div className="col-span-full">
          <div className="card-genz p-6">
            <div className="flex items-center justify-center py-12">
              <div className="spinner-genz"></div>
              <span className="ml-3 text-lg">Caricamento pannello admin...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      {/* Header */}
      <div className="col-span-full">
        <div className="card-genz p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                👑 Pannello Amministrazione
              </h1>
              <p className="text-purple-600 dark:text-pink-400">
                Gestisci utenti, contenuti e configurazioni del sistema
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Admin:</span>
              <span className="font-semibold">{user?.username}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="col-span-full">
        <div className="card-genz p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              📊 Panoramica
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              👥 Gestione Utenti
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'content'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              📝 Gestione Contenuti
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="col-span-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stats-card">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">👥</span>
                <div>
                  <p className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-sm font-semibold">Utenti Totali</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {users.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="stats-card">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">📝</span>
                <div>
                  <p className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-sm font-semibold">Post Planner</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {posts.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="stats-card">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">❤️</span>
                <div>
                  <p className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-sm font-semibold">Like Totali</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {posts.reduce((sum, post) => sum + post.likes, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="col-span-full">
          <div className="card-genz p-6">
            <h3 className="text-xl font-bold mb-4">👥 Gestione Utenti</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-3">Utente</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Ruolo</th>
                    <th className="text-left p-3">Post</th>
                    <th className="text-left p-3">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 dark:text-gray-400">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">{user.posts}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          disabled={user.role === 'admin'}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="col-span-full">
          <div className="card-genz p-6">
            <h3 className="text-xl font-bold mb-4">📝 Gestione Contenuti</h3>
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex-1">
                    <h4 className="font-semibold">{post.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      di {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">❤️ {post.likes}</span>
                    <span className="text-sm text-gray-500">💬 {post.comments}</span>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 