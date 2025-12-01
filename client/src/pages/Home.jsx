import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import OfferingCard from '../components/OfferingCard';

// 1. Setup Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Home = () => {
  // --- STATE MANAGEMENT ---
  const [offerings, setOfferings] = useState([]);
  const [email, setEmail] = useState('');

  // --- 1. FETCH DATA (Cards) ---
  useEffect(() => {
    axios.get('http://localhost:8080/api/offerings')
      .then(response => {
        setOfferings(response.data);
      })
      .catch(error => {
        console.error("Error fetching offerings:", error);
      });
  }, []);

  // --- 2. HANDLE NEWSLETTER SUBMIT ---
  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/newsletter', { email });
      alert('Subscribed successfully!');
      setEmail(''); // Clear input
    } catch (err) {
      console.error(err);
      alert('Error subscribing. Please try again.');
    }
  };

  // --- CHART CONFIGURATION ---
  const chartData = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        fill: true,
        label: 'Payouts',
        data: [2, 3.5, 3, 5, 4.5, 7],
        borderColor: '#169ca3', // Teal
        backgroundColor: 'rgba(22, 156, 163, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      y: { display: false }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* ---------------- HERO SECTION ---------------- */}
      <header className="relative h-[650px] w-full overflow-hidden flex items-center">
        
        {/* 1. Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="/3.svg" 
                alt="Background" 
                className="w-full h-full object-cover object-top" 
            />
            {/* Light Overlay for text readability */}
            <div className="absolute inset-0 bg-[#2d3b55]/40"></div>
        </div>

        {/* 2. Blue Circle Overlay */}
        <div className="absolute top-[-10%] left-[-10%] h-[120%] w-[65%] z-10 pointer-events-none">
             <img 
                src="/5.svg" 
                className="w-full h-full object-contain object-left opacity-90" 
                alt="Blue Circle" 
             />
        </div>

        {/* 3. Diagonal Lines Overlay */}
        <div className="absolute top-0 right-0 h-full w-1/2 z-10 pointer-events-none">
             <img 
                src="/6.svg" 
                className="w-full h-full object-cover object-right" 
                alt="Lines" 
             />
        </div>

        {/* 4. Text Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center h-full">
            <div className="max-w-xl mt-[-40px]">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                    Meaningful investments in <br/>
                    Main Street businesses
                </h1>
                <p className="text-lg text-white mb-8 max-w-md font-medium drop-shadow-md">
                    Browse vetted investment offerings in communities all over the US.
                </p>
                <button className="bg-[#169ca3] px-10 py-4 rounded text-white font-bold hover:bg-teal-700 transition shadow-lg uppercase tracking-wide text-xs">
                    Get Started
                </button>
            </div>
        </div>
      </header>

      {/* ---------------- OFFERINGS SECTION (Dynamic) ---------------- */}
      <section id="offerings" className="py-24 max-w-7xl mx-auto px-4 relative">
        {/* Decorative Blob */}
        <img src="/Shape.svg" alt="" className="absolute top-40 left-[-100px] w-80 opacity-40 -z-10" />

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Offerings open for investment</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore pre-vetted investment opportunities available in a growing number of industry categories.
          </p>
        </div>

        {/* Grid: Mapped from MySQL Database */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.length > 0 ? (
            offerings.map((offer) => (
              <OfferingCard key={offer.id} data={offer} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-400">
                <p>Loading investments from database...</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-16">
           <button className="border border-[#ff5a5f] text-[#ff5a5f] font-bold px-10 py-3 rounded hover:bg-[#ff5a5f] hover:text-white transition uppercase text-xs tracking-wider">
             View All Projects
           </button>
        </div>
      </section>

      {/* ---------------- CHART SECTION ---------------- */}
      <section className="bg-[#ecf6f7] py-24 relative overflow-hidden">
        {/* Background Curve */}
        <div className="absolute top-0 left-[-10%] h-full w-[60%] z-0">
            <img 
                src="/1.svg" 
                className="w-full h-full object-cover object-left opacity-30 transform rotate-180" 
                alt="Curve" 
            />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="md:w-1/3">
                <div className="w-12 h-12 bg-[#169ca3] rounded-full flex items-center justify-center mb-6 shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">$7M+ paid out to investors</h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                    Next Invest has already paid out over $7M in cash returns to investors. Earn potential cash payments through unique revenue-share and debt financing investments.
                </p>
            </div>
            
            <div className="md:w-2/3 w-full h-80 bg-transparent">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
        
        {/* Right Decoration */}
        <img src="/Subtract.svg" className="absolute top-10 right-0 w-24 opacity-50 rotate-180" alt="" />
      </section>

      {/* ---------------- CAPITAL RAISING SECTION ---------------- */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
                <h2 className="text-4xl font-bold mb-6 text-gray-800 leading-tight">
                    Looking to raise capital <br/> for your growing business?
                </h2>
                <p className="text-gray-500 mb-8 text-lg leading-relaxed">
                    Whether expanding or opening a brand-new concept, we make it easy to raise money from thousands of local investors.
                </p>
                <button className="bg-[#169ca3] text-white px-8 py-3 rounded font-bold hover:bg-teal-700 uppercase tracking-wide shadow-md text-xs">
                    Apply Online
                </button>
            </div>
            <div className="w-full md:w-1/2 flex justify-end relative">
                <img src="/cuate.svg" alt="Business Growth" className="w-full max-w-md z-10 relative" />
                <img src="/Shape.svg" className="absolute top-0 right-0 w-64 opacity-20 -z-0" alt="" />
            </div>
        </div>
      </section>
      
      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[#f2f4f5] py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                 <div className="text-2xl font-bold text-gray-800 tracking-wider uppercase">Next Invest</div>
                 <div className="flex gap-6 mt-4 md:mt-0">
                     <img src="/001-facebook.svg" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition" alt="Facebook"/>
                     <img src="/003-twitter.svg" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition" alt="Twitter"/>
                     <img src="/004-instagram.svg" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition" alt="Instagram"/>
                 </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600 border-b border-gray-300 pb-12">
                 <div>
                    <h4 className="font-bold mb-4 text-gray-900">Services</h4>
                    <ul className="space-y-2">
                        <li>Email Marketing</li>
                        <li>Campaigns</li>
                        <li>Branding</li>
                        <li>Offline</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-bold mb-4 text-gray-900">About</h4>
                    <ul className="space-y-2">
                        <li>Our Story</li>
                        <li>Benefits</li>
                        <li>Team</li>
                        <li>Careers</li>
                    </ul>
                 </div>
                 <div className="hidden md:block"></div> 
                 <div className="flex justify-end items-end">
                    <div 
                        className="bg-[#169ca3] p-3 rounded-full cursor-pointer hover:bg-teal-700 transition shadow-lg"
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    >
                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                    </div>
                 </div>
             </div>
             
             {/* Newsletter Form Connected to DB */}
             <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="w-full md:w-auto">
                    <h4 className="font-bold text-gray-900 mb-4">Subscribe to our newsletter</h4>
                    <div className="flex">
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 w-64 bg-[#f2f4f5] border-b border-gray-300 focus:outline-none focus:border-primary" 
                        />
                        <button 
                            onClick={handleSubscribe}
                            className="bg-[#ff5a5f] p-3 rounded text-white ml-2 hover:bg-red-500 shadow-md"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
                <p className="text-xs text-gray-500">Copyright © 2020. LogoIpsum. All rights reserved.</p>
             </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;