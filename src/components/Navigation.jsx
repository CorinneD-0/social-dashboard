import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutUser } from '../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('See you soon! 👋');
  };

  const navigationItems = [
    { path: '/feed', label: 'Social Feed', icon: '📱', emoji: '📱' },
    { path: '/posts', label: 'Post Planner', icon: '📝', emoji: '📝' },
    { path: '/analytics', label: 'Analytics', icon: '📈', emoji: '��' },
    { path: '/gestione-post', label: 'Gestione Post', icon: '✏️', emoji: '✏️' },
    { path: '/admin', label: 'Admin Panel', icon: '👑', emoji: '👑', adminOnly: true },
    { path: `/profile/${user?.username}`, label: 'Profile', icon: '👤', emoji: '👤' },
    { path: '/users', label: 'Users', icon: '\ud83d\udc65', emoji: '\ud83d\udc65' },
    { path: '/reports', label: 'Reports', icon: '\ud83d\udcc8', emoji: '\ud83d\udcc8' },
    { path: '/notifications', label: 'Notifications', icon: '\ud83d\udd14', emoji: '\ud83d\udd14' },
  ].filter(item => !item.adminOnly || user?.role === 'admin');

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="nav-genz fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <Link to="/feed" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                🚀
              </div>
              <span className="text-2xl font-display font-bold text-gradient-primary">
                SocialDash
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                    isActive(item.path)
                      ? 'text-white bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ThemeToggle />
            </motion.div>

            {/* User Menu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              {/* User Avatar */}
              <div className="avatar-genz w-10 h-10">
                <img
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                  alt={user?.name}
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="status-online"></div>
              </div>

              {/* User Info */}
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  @{user?.username}
                </p>
              </div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="btn-genz-secondary px-4 py-2 text-white text-sm font-medium"
              >
                <span className="mr-1">👋</span>
                Logout
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white"
            >
              <span className="text-xl">
                {isMobileMenuOpen ? '✕' : '☰'}
              </span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-genz fixed top-0 left-0 right-0 bottom-0 z-40 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    🚀
                  </div>
                  <span className="text-xl font-display font-bold text-gradient-primary">
                    SocialDash
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white"
                >
                  <span className="text-lg">✕</span>
                </motion.button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 p-6">
                <div className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="text-2xl">{item.emoji}</span>
                        <span className="text-lg font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile User Info */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200 dark:border-pink-800"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="avatar-genz w-12 h-12">
                      <img
                        src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                        alt={user?.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                      <div className="status-online"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @{user?.username}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full btn-genz-secondary py-3 text-white font-medium"
                  >
                    <span className="mr-2">👋</span>
                    Logout
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className="h-20"></div>
    </>
  );
};

export default Navigation; 