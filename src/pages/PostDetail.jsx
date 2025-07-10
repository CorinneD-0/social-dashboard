import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/posts/${id}`);
      if (!response.ok) throw new Error('Post non trovato');
      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setPost(prev => ({
      ...prev,
      likes: liked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    // Simula l'aggiunta di un commento
    const newComment = {
      id: Date.now(),
      text: comment,
      author: user?.username || 'Anonimo',
      date: new Date().toISOString()
    };
    
    setPost(prev => ({
      ...prev,
      comments: (prev.comments || 0) + 1
    }));
    
    setComment('');
  };

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

  if (error || !post) {
    return (
      <div className="dashboard-grid">
        <div className="col-span-full">
          <div className="card-genz p-6 text-center">
            <div className="text-6xl mb-4">😵</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              Post non trovato
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
            <button onClick={() => navigate('/posts')} className="btn-genz px-6 py-2">
              ⬅️ Torna al Post Planner
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      {/* Back Button */}
      <div className="col-span-full">
        <button
          onClick={() => navigate('/posts')}
          className="btn-genz-secondary px-4 py-2 mb-4"
        >
          ⬅️ Torna al Post Planner
        </button>
      </div>

      {/* Post Content */}
      <div className="col-span-full lg:col-span-2">
        <div className="card-genz p-6">
          {/* Post Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="avatar-genz w-12 h-12">
              <img
                src={`https://picsum.photos/200/200?random=${post.authorId}`}
                alt={post.authorName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{post.authorName}</h3>
              <p className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleDateString('it-IT', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="mb-6">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.content}
            </p>
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  liked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{liked ? '❤️' : '🤍'}</span>
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <span>💬</span>
                <span>{post.comments}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                📤
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                ⭐
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="col-span-full lg:col-span-1">
        <div className="card-genz p-6">
          <h3 className="text-xl font-bold mb-4">💬 Commenti</h3>
          
          {/* Add Comment Form */}
          <form onSubmit={handleComment} className="mb-6">
            <div className="flex space-x-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Aggiungi un commento..."
                className="input-genz flex-1"
                required
              />
              <button type="submit" className="btn-genz px-4 py-2">
                📝
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  L
                </div>
                <div>
                  <p className="font-semibold text-sm">Laura Bianchi</p>
                  <p className="text-xs text-gray-500">2 ore fa</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Bellissimo post! Mi piace molto il contenuto che condividi sempre! 🌟
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  M
                </div>
                <div>
                  <p className="font-semibold text-sm">Mario Rossi</p>
                  <p className="text-xs text-gray-500">1 giorno fa</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Grazie per la condivisione! Molto interessante 👏
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail; 