import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

// --- CHART.JS IMPORTS ---
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart Components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  // --- STATE ---
  const [offerings, setOfferings] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  
  const initialFormState = {
    title: '', tag: 'House', image: '/10.svg', location: '', description: '',
    target: 0, raised: 0, securityType: 'Revenue Sharing Note',
    multiple: 1.0, maturity: 0, minInvestment: 0
  };

  const [formData, setFormData] = useState(initialFormState);

  // --- FETCH DATA ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const offRes = await api.get('/offerings');
      const subRes = await api.get('/newsletter'); 
      setOfferings(offRes.data);
      setSubscribers(subRes.data);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert("Session expired. Please login again.");
        navigate('/login');
      }
    }
  };

  // --- CHART CONFIG ---
  const chartData = {
    labels: offerings.map(o => o.title),
    datasets: [
      { label: 'Get Price (Raised)', data: offerings.map(o => o.raised), backgroundColor: '#169ca3' },
      { label: 'Total Price (Target)', data: offerings.map(o => o.target), backgroundColor: '#e5e7eb' },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#6b7280' } }, // Gray text for legend
      title: { display: true, text: 'Investment Funding Progress', color: '#6b7280' },
    },
    scales: {
        x: { ticks: { color: '#6b7280' }, grid: { color: '#e5e7eb' } },
        y: { ticks: { color: '#6b7280' }, grid: { color: '#e5e7eb' } }
    }
  };

  // --- HANDLERS ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) { 
        await api.put(`/admin/offerings/${editId}`, formData); 
        alert('Offering Updated Successfully!');
      } else { 
        await api.post('/admin/offerings', formData); 
        alert('Offering Added Successfully!');
      }
      fetchData(); 
      handleCancelEdit(); 
    } catch (err) { alert('Failed to save offering'); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this offering?")) {
        await api.delete(`/admin/offerings/${id}`);
        fetchData(); 
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if(window.confirm("Remove this subscriber?")) {
        await api.delete(`/newsletter/${id}`);
        fetchData(); 
    }
  };

  const handleEdit = (offering) => {
    setIsEditing(true); 
    setEditId(offering.id); 
    setFormData(offering); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => { setIsEditing(false); setEditId(null); setFormData(initialFormState); };
  const handleLogout = () => { localStorage.removeItem('token'); navigate('/login'); };

  // --- REUSABLE STYLES (To keep code short) ---
  const inputClass = "w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded focus:outline-none focus:border-[#169ca3] transition-colors";
  const labelClass = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-300">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 shadow-sm transition-colors">
                LOGOUT
            </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* ---------------- FORM SECTION ---------------- */}
          <div className="lg:col-span-1">
            <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-24 border-t-4 transition-colors ${isEditing ? 'border-orange-500' : 'border-[#169ca3]'}`}>
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                    <h2 className={`text-xl font-bold ${isEditing ? 'text-orange-500' : 'text-[#169ca3]'}`}>
                        {isEditing ? 'Edit Offering' : 'Add New Offering'}
                    </h2>
                    {isEditing && (
                        <button onClick={handleCancelEdit} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm underline">
                            Cancel
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Basic Info */}
                    <div><label className={labelClass}>Title</label><input name="title" value={formData.title} onChange={handleChange} className={inputClass} required /></div>
                    <div><label className={labelClass}>Location</label><input name="location" value={formData.location} onChange={handleChange} className={inputClass} required /></div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Tag</label>
                            <select name="tag" value={formData.tag} onChange={handleChange} className={inputClass}>
                                <option value="House">House</option>
                                <option value="Family Business">Family Business</option>
                                <option value="Real Estate">Real Estate</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Card Images</label>
                            <select name="image" value={formData.image} onChange={handleChange} className={inputClass}>
                                <option value="/10.svg">Skylight</option>
                                <option value="/8.svg">Green Building</option>
                                <option value="/3.svg">Two Men</option>
                                <option value="/11.svg">Laptop</option>
                                <option value="/7.svg">Office</option>
                                <option value="/9.svg">Wheat</option>
                            </select>
                        </div>
                    </div>

                    <div><label className={labelClass}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} className={inputClass} rows="3"></textarea></div>

                    {/* Financials */}
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className={labelClass}>Total Price ($)</label><input type="number" name="target" value={formData.target} onChange={handleChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Get Price ($)</label><input type="number" name="raised" value={formData.raised} onChange={handleChange} className={inputClass} /></div>
                    </div>

                    <div><label className={labelClass}>Security Type</label><input type="text" name="securityType" value={formData.securityType} onChange={handleChange} placeholder="e.g. Revenue Sharing Note" className={inputClass} /></div>

                    <div className="grid grid-cols-3 gap-2">
                        <div><label className={labelClass}>Inv. Multiple</label><input type="number" step="0.1" name="multiple" value={formData.multiple} onChange={handleChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Maturity (Mos)</label><input type="number" name="maturity" value={formData.maturity} onChange={handleChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Min. Inv ($)</label><input type="number" name="minInvestment" value={formData.minInvestment} onChange={handleChange} className={inputClass} /></div>
                    </div>

                    <button type="submit" className={`w-full text-white font-bold py-3 rounded transition shadow-md ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#169ca3] hover:bg-teal-700'}`}>
                        {isEditing ? 'UPDATE OFFERING' : '+ ADD OFFERING'}
                    </button>
                </form>
            </div>
          </div>

          {/* ---------------- TABLES SECTION ---------------- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
                <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">Analytics Overview</h2>
                <div className="h-64">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* Offerings Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-700 dark:text-white">Active Offerings</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-900 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
                            <tr>
                                <th className="p-4">Img</th>
                                <th className="p-4">Title / Security</th>
                                <th className="p-4">Get Price</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                            {offerings.map((offer) => (
                                <tr key={offer.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition ${isEditing && editId === offer.id ? 'bg-orange-50 dark:bg-orange-900/20' : ''}`}>
                                    <td className="p-4">
                                        <img src={offer.image} alt="" className="w-12 h-12 object-cover rounded shadow-sm" />
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800 dark:text-white">{offer.title}</div>
                                        <div className="text-gray-500 dark:text-gray-400 text-xs">{offer.securityType}</div>
                                    </td>
                                    <td className="p-4 text-green-600 dark:text-green-400 font-bold">
                                        ${offer.raised.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-center space-x-2">
                                        <button 
                                            onClick={() => handleEdit(offer)}
                                            className="text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded transition text-xs font-bold"
                                        >
                                            EDIT
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(offer.id)}
                                            className="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 dark:border-red-800 px-3 py-1 rounded transition text-xs font-bold"
                                        >
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Newsletter Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-700 dark:text-white">Newsletter Subscribers</h2>
                </div>
                <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-900 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
                            <tr>
                                <th className="p-4 w-20">ID</th>
                                <th className="p-4">Email Address</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                            {subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="p-4 text-gray-400 dark:text-gray-500">#{sub.id}</td>
                                    <td className="p-4 font-medium text-gray-800 dark:text-white">{sub.email}</td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => handleDeleteSubscriber(sub.id)}
                                            className="text-red-400 hover:text-red-600 text-xs font-bold uppercase"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
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