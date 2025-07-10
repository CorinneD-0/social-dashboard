import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      toast.success('Post unliked! 💔');
    } else {
      setLikeCount(prev => prev + 1);
      toast.success('Post liked! ❤️');
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks! 📚' : 'Added to bookmarks! 🔖');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    toast.success('Link copied to clipboard! 📋');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="post-card-genz p-6"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="avatar-genz w-12 h-12">
            <img
              src={post.authorAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorName}`}
              alt={post.authorName}
              className="w-full h-full rounded-full object-cover"
            />
            <div className="status-online"></div>
          </div>
          <div>
            <Link 
              to={`/profile/${post.authorName}`}
              className="font-semibold text-gray-800 dark:text-white hover:text-gradient-primary transition-colors"
            >
              {post.authorName}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} • <span className="emoji-medium">📍</span> {post.location || 'Somewhere cool'}
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="text-xl">⋯</span>
        </motion.button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Post Image */}
      {post.image && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 rounded-xl overflow-hidden"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      )}

      {/* Post Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="badge-genz text-xs"
            >
              #{tag}
            </motion.span>
          ))}
        </div>
      )}

      {/* Post Stats */}
              <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200 dark:border-pink-800">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="emoji-medium">👁️</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {post.views || Math.floor(Math.random() * 1000)} views
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="emoji-medium">💬</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {post.comments} comments
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="emoji-medium">🔄</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {post.shares || Math.floor(Math.random() * 50)} shares
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <span className="emoji-medium">⭐</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {Math.floor(Math.random() * 5) + 1}/5 rating
          </span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              isLiked
                ? 'bg-gradient-to-r from-pink-400 to-red-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <motion.span
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="text-xl"
            >
              {isLiked ? '❤️' : '🤍'}
            </motion.span>
            <span className="font-medium">{likeCount}</span>
          </motion.button>

          {/* Comment Button */}
          <Link to={`/post/${post.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <span className="text-xl">💬</span>
              <span className="font-medium">{post.comments}</span>
            </motion.button>
          </Link>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <span className="text-xl">📤</span>
            <span className="font-medium">Share</span>
          </motion.button>
        </div>

        {/* Bookmark Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBookmark}
          className={`p-3 rounded-xl transition-all duration-300 ${
            isBookmarked
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <motion.span
            animate={isBookmarked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="text-xl"
          >
            {isBookmarked ? '🔖' : '📚'}
          </motion.span>
        </motion.button>
      </div>

      {/* Read More Link */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to={`/post/${post.id}`}
          className="inline-flex items-center space-x-2 text-gradient-primary font-semibold hover:underline transition-colors"
        >
          <span>Read full post</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-lg"
          >
            →
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

export default PostCard; 