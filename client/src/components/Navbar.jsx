import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm py-4 px-8 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
      <Link to="/" className="text-2xl font-bold text-[#169ca3] tracking-wider">
        NEXT INVEST
      </Link>
      
      <div className="hidden md:flex gap-8 items-center text-sm font-semibold text-gray-600 dark:text-gray-300">
        <a href="/#offerings" className="hover:text-[#169ca3] transition">Investment Opportunities</a>
        <a href="#" className="hover:text-[#169ca3] transition">How it works</a>
        <a href="#" className="hover:text-[#169ca3] transition">About us</a>
        
        {/* Dark Mode Button */}
        <ThemeToggle />

        <Link to="/login" className="bg-[#169ca3] text-white px-5 py-2 rounded shadow hover:bg-teal-700 transition">
          LOGIN
        </Link>
        <button className="border border-[#169ca3] text-[#169ca3] px-5 py-2 rounded hover:bg-teal-50 dark:hover:bg-gray-800 transition">
          REGISTER
        </button>
      </div>
    </nav>
  );
};

export default Navbar;