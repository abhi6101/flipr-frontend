import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
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
import SkeletonCard from '../components/SkeletonCard';

// Register Chart.js components
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
  const [offerings, setOfferings] = useState([]);
  const [email, setEmail] = useState('');

  // Fetch Data
  useEffect(() => {
    axios.get('https://flipr-backend-n9mi.onrender.com/api/offerings')
      .then(response => setOfferings(response.data))
      .catch(error => console.error("Error fetching offerings:", error));
  }, []);

  // Handle Newsletter
  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    try {
      await axios.post('https://flipr-backend-n9mi.onrender.com/api/newsletter', { email });
      alert('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      console.error(err);
      alert('Error subscribing.');
    }
  };

  // Chart Configuration (Matches Reference: Smooth curve, no grid lines)
  const chartData = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        fill: true,
        label: 'Payouts',
        data: [2, 3.5, 3, 5, 4.5, 7],
        borderColor: '#169ca3', // Teal color
        backgroundColor: 'rgba(22, 156, 163, 0.1)', // Light teal fill
        tension: 0.4, // Smooth curves
        pointRadius: 0, // No dots on the line
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 }, color: '#9ca3af' }
      },
      y: { display: false, min: 0 } // Hide Y axis
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans transition-colors duration-300">
      <Navbar />

      {/* ---------------- HERO SECTION (Exact Match) ---------------- */}
      <header className="relative h-[650px] w-full overflow-hidden flex items-center">

        {/* 1. Base Background Image (3.svg) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/3.svg"
            alt="Background"
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle dark tint to make text pop, but keep image visible */}
          <div className="absolute inset-0 bg-[#1f2937]/20"></div>
        </div>

        {/* 2. Blue Circle Overlay (5.svg) - LEFT SIDE */}
        <div className="absolute top-[-15%] left-[-10%] h-[130%] w-[70%] z-10 pointer-events-none">
          {/* mix-blend-multiply allows the image behind to show through the blue color */}
          <img
            src="/5.svg"
            className="w-full h-full object-contain object-left opacity-90 mix-blend-multiply dark:mix-blend-normal"
            alt="Blue Circle"
          />
        </div>

        {/* 3. Diagonal Lines Overlay (6.svg) - RIGHT SIDE */}
        <div className="absolute top-0 right-0 h-full w-[60%] z-10 pointer-events-none">
          <img
            src="/6.svg"
            className="w-full h-full object-cover object-right opacity-80"
            alt="Lines"
          />
        </div>

        {/* 4. Text Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl mt-[-40px]"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
              Meaningful investments in <br />
              Main Street businesses
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-md font-medium drop-shadow">
              Browse vetted investment offerings in communities all over the US.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(22, 156, 163, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#169ca3] px-10 py-4 rounded-sm text-white font-bold hover:bg-teal-700 transition shadow-lg uppercase tracking-wide text-xs"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* ---------------- OFFERINGS SECTION ---------------- */}
      <section id="offerings" className="py-24 max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Offerings open for investment</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Explore pre-vetted investment opportunities available in a growing number of industry categories.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        {offerings.length > 0 ? (
          offerings.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <OfferingCard data={offer} />
            </motion.div>
          ))
        ) : (
          // SKELETON LOADING STATE
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkeletonCard />
            </motion.div>
          ))
        )}
    </div>
        
        {/* Pink/Red Outline Button */ }
  <div className="text-center mt-16">
    <button className="border border-[#ff5a5f] text-[#ff5a5f] font-bold px-10 py-4 rounded-sm hover:bg-[#ff5a5f] hover:text-white transition uppercase text-xs tracking-widest">
      View All Projects
    </button>
  </div>
      </section >

  {/* ---------------- CHART SECTION (Exact Match) ---------------- */ }
  < section className = "bg-[#ecf6f7] dark:bg-gray-800 py-24 relative overflow-hidden transition-colors duration-300" >

    {/* 1. Curved Background Shape (1.svg) - LEFT SIDE BEHIND TEXT */ }
    < div className = "absolute top-0 left-[-15%] h-full w-[70%] z-0" >
      {/* Rotated/Flipped to match the curve in screenshot 1 */ }
      < img
src = "/1.svg"
className = "w-full h-full object-cover object-left opacity-100 dark:opacity-20"
alt = "Curve"
  />
        </div >

  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16 relative z-10">
    {/* Text Side */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="md:w-1/3"
    >
      <div className="w-12 h-12 bg-[#169ca3] rounded-full flex items-center justify-center mb-6 shadow-md">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
      </div>
      <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">$7M+ paid out to investors</h2>
      <p className="text-gray-500 dark:text-gray-300 text-lg leading-relaxed">
        Next Invest has already paid out over $7M in cash returns to investors. Earn potential cash payments through unique revenue-share and debt financing investments.
      </p>
    </motion.div>

    {/* Chart Side */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="md:w-2/3 w-full h-80 bg-transparent relative"
    >
      {/* Chart.js Canvas */}
      <Line data={chartData} options={chartOptions} />
    </motion.div>
  </div>

{/* 2. Top Right Decoration (Subtract.svg) */ }
<img src="/Subtract.svg" className="absolute top-10 right-0 w-24 opacity-50 rotate-180" alt="" />
      </section >

  {/* ---------------- CAPITAL RAISING SECTION ---------------- */ }
  < section className = "bg-white dark:bg-gray-900 py-24 relative overflow-hidden transition-colors duration-300" >
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white leading-tight">
          Looking to raise capital <br /> for your growing business?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          Whether expanding or opening a brand-new concept, we make it easy to raise money from thousands of local investors.
        </p>
        <button className="bg-[#169ca3] text-white px-8 py-3 rounded-sm font-bold hover:bg-teal-700 uppercase tracking-wide shadow-md text-xs">
          Apply Online
        </button>
      </div>

      {/* Image Side with Blob Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 flex justify-end relative"
      >
        {/* Main Illustration */}
        <img src="/cuate.svg" alt="Business Growth" className="w-full max-w-md z-10 relative" />

        {/* Background Blob (Shape.svg) */}
        <img src="/Shape.svg" className="absolute top-0 right-0 w-80 opacity-20 -z-0" alt="" />
      </motion.div>
    </div>
      </section >

  {/* ---------------- FOOTER ---------------- */ }
  < footer className = "bg-[#f2f4f5] dark:bg-gray-950 py-16 mt-12 transition-colors duration-300" >
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div className="text-2xl font-bold text-gray-800 dark:text-white tracking-wider uppercase">Next Invest</div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <img src="/001-facebook.svg" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition" alt="Facebook" />
          <img src="/003-twitter.svg" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition" alt="Twitter" />
          <img src="/004-instagram.svg" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition" alt="Instagram" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-300 dark:border-gray-800 pb-12">
        <div>
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Services</h4>
          <ul className="space-y-2">
            <li>Email Marketing</li>
            <li>Campaigns</li>
            <li>Branding</li>
            <li>Offline</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white">About</h4>
          <ul className="space-y-2">
            <li>Our Story</li>
            <li>Benefits</li>
            <li>Team</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="hidden md:block"></div>
        {/* Scroll To Top Button */}
        <div className="flex justify-end items-end">
          <div
            className="bg-[#169ca3] p-3 rounded-full cursor-pointer hover:bg-teal-700 transition shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
          </div>
        </div>
      </div>

      {/* Newsletter Form */}
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="w-full md:w-auto">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Subscribe to our newsletter</h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-64 bg-[#f2f4f5] dark:bg-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-primary"
            />
            <button
              onClick={handleSubscribe}
              className="bg-[#ff5a5f] p-3 rounded-sm text-white ml-2 hover:bg-red-500 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500">Copyright © 2020. LogoIpsum. All rights reserved.</p>
      </div>
    </div>
      </footer >
    </div >
  );
};

export default Home;