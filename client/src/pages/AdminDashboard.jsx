import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const chartData = {
    labels: ['Oxalis', 'Fliper Tech', 'Green Villas'],
    datasets: [
      {
        label: 'Funds Raised ($)',
        data: [574920, 120000, 800000],
        backgroundColor: '#169ca3',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-dark text-white p-6 hidden md:block h-[calc(100vh-80px)]">
            <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
            <ul className="space-y-4">
            <li className="text-primary font-bold cursor-pointer">Dashboard</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Manage Offerings</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Newsletter Subs</li>
            </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm mb-8 h-80">
                <h3 className="text-lg font-bold mb-4">Live Investment Stats</h3>
                <Bar data={chartData} options={{ maintainAspectRatio: false }} />
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold">Active Offerings</h3>
                    <button className="bg-primary text-white px-4 py-2 rounded text-sm">+ Add New</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                    <tr>
                        <th className="p-4">Title</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Raised</th>
                        <th className="p-4">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y">
                    <tr>
                        <td className="p-4">Oxalis</td>
                        <td className="p-4">Brooklyn, NY</td>
                        <td className="p-4">$574,920</td>
                        <td className="p-4 text-red-500 cursor-pointer">Delete</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;