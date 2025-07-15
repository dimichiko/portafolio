import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.img
          src="/logo-dv.png"
          alt="DV Logo"
          className="w-16 h-16 rounded-lg"
          animate={{ 
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-blue-400 font-semibold text-lg"
        >
          Dimitris Vamvoukas
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-zinc-400 text-sm"
        >
          Full-Stack Developer
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen; 