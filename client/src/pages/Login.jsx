import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate Login (We will connect API later)
    if(username === 'admin' && password === 'admin') {
        localStorage.setItem('token', 'fake-jwt-token');
        navigate('/admin');
    } else {
        alert('Invalid credentials (Try admin/admin)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-md font-bold hover:bg-teal-700">
                Sign In
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;