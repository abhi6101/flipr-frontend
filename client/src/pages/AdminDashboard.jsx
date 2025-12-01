import React, { useState, useEffect } from 'react';
import api from '../services/api'; // <--- USING SECURE API NOW
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [offerings, setOfferings] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    tag: 'House',
    image: '/10.svg',
    location: '',
    description: '',
    raised: 0,
    target: 0,
    securityType: 'Revenue Sharing Note',
    multiple: 1.0,
    maturity: 0,
    minInvestment: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // These requests now carry the Token automatically!
      const offRes = await api.get('/offerings');
      const subRes = await api.get('/newsletter'); 
      setOfferings(offRes.data);
      setSubscribers(subRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
      if (err.response && err.response.status === 403) {
        alert("Session expired. Please login again.");
        navigate('/login');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/offerings', formData); // Protected Route
      alert('Offering Added Successfully!');
      fetchData();
    } catch (err) {
      console.error("Error adding offering", err);
      alert('Failed to add offering');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this?")) {
        try {
            await api.delete(`/admin/offerings/${id}`); // Protected Route
            fetchData(); 
        } catch (err) {
            console.error("Error deleting", err);
        }
    }
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600">
                LOGOUT
            </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* ADD FORM */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-[#169ca3] border-b pb-2">Add New Offering</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                    <input name="title" onChange={handleChange} placeholder="e.g. Oxalis" className="w-full border p-2 rounded focus:outline-none focus:border-[#169ca3]" required />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                    <input name="location" onChange={handleChange} placeholder="e.g. Brooklyn, NY" className="w-full border p-2 rounded focus:outline-none focus:border-[#169ca3]" required />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image Selection</label>
                    <select name="image" onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:border-[#169ca3]">
                        <option value="/10.svg">Skylight (/10.svg)</option>
                        <option value="/8.svg">Green Building (/8.svg)</option>
                        <option value="/3.svg">Two Men (/3.svg)</option>
                        <option value="/11.svg">Laptop (/11.svg)</option>
                        <option value="/7.svg">Office (/7.svg)</option>
                        <option value="/9.svg">Wheat (/9.svg)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                    <textarea name="description" onChange={handleChange} placeholder="Short description..." className="w-full border p-2 rounded focus:outline-none focus:border-[#169ca3]" rows="3"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Raised ($)</label>
                        <input type="number" name="raised" onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:border-[#169ca3]" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Target ($)</label>
                        <input type="number" name="target" onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:border-[#169ca3]" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Min Inv. ($)</label>
                        <input type="number" name="minInvestment" onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:border-[#169ca3]" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Multiple (x)</label>
                        <input type="number" step="0.1" name="multiple" onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:border-[#169ca3]" />
                    </div>
                </div>

                <button type="submit" className="w-full bg-[#169ca3] text-white font-bold py-3 rounded hover:bg-teal-700 transition shadow-md">
                    + ADD OFFERING
                </button>
                </form>
            </div>
          </div>

          {/* DATA TABLES */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* OFFERINGS TABLE */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-700">Active Offerings</h2>
                    <span className="bg-[#169ca3] text-white text-xs px-2 py-1 rounded-full">{offerings.length}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-500 font-semibold">
                            <tr>
                                <th className="p-4">Img</th>
                                <th className="p-4">Title / Location</th>
                                <th className="p-4">Raised</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {offerings.map((offer) => (
                                <tr key={offer.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        <img src={offer.image} alt="" className="w-12 h-12 object-cover rounded shadow-sm" />
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800">{offer.title}</div>
                                        <div className="text-gray-500 text-xs">{offer.location}</div>
                                    </td>
                                    <td className="p-4 text-green-600 font-bold">
                                        ${offer.raised.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => handleDelete(offer.id)}
                                            className="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 px-3 py-1 rounded transition text-xs font-bold"
                                        >
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {offerings.length === 0 && <tr><td colSpan="4" className="p-4 text-center text-gray-400">No offerings found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* SUBSCRIBERS TABLE */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-700">Newsletter Subscribers</h2>
                    <span className="bg-[#ff5a5f] text-white text-xs px-2 py-1 rounded-full">{subscribers.length}</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-500 font-semibold">
                            <tr>
                                <th className="p-4 w-20">ID</th>
                                <th className="p-4">Email Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-gray-50">
                                    <td className="p-4 text-gray-400">#{sub.id}</td>
                                    <td className="p-4 font-medium text-gray-800">{sub.email}</td>
                                </tr>
                            ))}
                            {subscribers.length === 0 && <tr><td colSpan="2" className="p-4 text-center text-gray-400">No subscribers yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;