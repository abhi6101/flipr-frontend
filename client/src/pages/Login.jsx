import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // We use raw axios here for the first login request
import Navbar from '../components/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Send Credentials to Backend
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: username,
        password: password
      });

      // 2. If successful, backend returns a String (The Token)
      const token = response.data;

      // 3. Save Token to Local Storage
      localStorage.setItem('token', token);

      // 4. Go to Admin Dashboard
      navigate('/admin');

    } catch (err) {
      console.error("Login Failed", err);
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#169ca3]" 
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#169ca3]" 
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#169ca3] text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition shadow-md">
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;