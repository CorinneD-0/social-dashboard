import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <img
        src={user.avatar}
        alt={user.username}
        className="w-16 h-16 rounded-full border-2 border-blue-500"
      />
      <div className="flex-1">
        <Link to={`/profile/${user.username}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
          {user.username}
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{user.bio}</p>
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{user.followers} followers</span>
          {user.role === 'admin' && (
            <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded">admin</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard; 