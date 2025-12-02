import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data);
      navigate('/admin');
    } catch (err) {
      console.error("Login Failed", err);
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-300">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        
        {/* --- ANIMATED LOGIN CARD --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-[#169ca3]"
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">Welcome Back</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Please enter your admin credentials</p>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-3 rounded mb-4 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:outline-none focus:border-[#169ca3] transition-colors" 
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 focus:outline-none focus:border-[#169ca3] transition-colors" 
                required
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full bg-[#169ca3] text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition shadow-lg"
            >
              SIGN IN
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;