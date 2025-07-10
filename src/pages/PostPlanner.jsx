import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';

const PostPlanner = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/posts');
      if (!response.ok) throw new Error('Errore nel caricamento dei post');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'mine') return post.authorId === user?.id;
    return post.authorName.toLowerCase().includes(filter.toLowerCase());
  });

  if (loading) {
    return (
      <div className="dashboard-grid">
        <div className="col-span-full">
          <div className="card-genz p-6">
            <div className="flex items-center justify-center py-12">
              <div className="spinner-genz"></div>
              <span className="ml-3 text-lg">Caricamento post...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-grid">
        <div className="col-span-full">
          <div className="card-genz p-6 text-center">
            <div className="text-6xl mb-4">😵</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              Errore nel caricamento
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
            <button onClick={fetchPosts} className="btn-genz px-6 py-2">
              🔄 Riprova
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      <div className="col-span-full">
        <div className="card-genz p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gradient-primary mb-2">
                📝 Post Planner
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Esplora tutti i post della community
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-genz px-4 py-2"
              >
                <option value="all">🌍 Tutti i post</option>
                <option value="mine">👤 I miei post</option>
                <option value="laura">👩‍🎨 Laura Bianchi</option>
                <option value="mario">👨‍💻 Mario Rossi</option>
                <option value="admin">👑 Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full">
        {filteredPosts.length === 0 ? (
          <div className="card-genz p-6 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              Nessun post trovato
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Prova a cambiare il filtro o crea un nuovo post!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      <div className="col-span-full">
        <div className="card-genz p-6">
          <h3 className="text-xl font-bold mb-4">📊 Statistiche</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl">
              <div className="text-2xl font-bold text-gradient-primary">
                {posts.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Post totali
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl">
              <div className="text-2xl font-bold text-gradient-secondary">
                {posts.filter(p => p.authorId === user?.id).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                I miei post
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl">
              <div className="text-2xl font-bold text-gradient-accent">
                {Math.round(posts.reduce((sum, p) => sum + p.likes, 0) / posts.length)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Like medi
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600">
                {posts.length > 0 ? new Date(posts[0].createdAt).toLocaleDateString() : 'N/A'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Ultimo post
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPlanner; 