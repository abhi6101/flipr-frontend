import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa'; 

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full shadow-md transition-colors duration-300 flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-orange-500'
      }`}
    >
      {theme === 'dark' ? <FaMoon size={18} /> : <FaSun size={18} />}
    </motion.button>
  );
};

export default ThemeToggle;