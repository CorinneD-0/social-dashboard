import React from 'react';
import { motion } from 'framer-motion';

const Notifications = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-2">Notifications</h1>
      <p className="text-gray-600 mb-6">Notifiche recenti (pagina statica di esempio)</p>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="bg-blue-100 border border-blue-300 text-blue-800 px-6 py-4 rounded-xl shadow-lg"
      >
        <span role="img" aria-label="notifica" className="mr-2">🔔</span>
        Hai una nuova notifica!
      </motion.div>
    </div>
  );
};

export default Notifications; 