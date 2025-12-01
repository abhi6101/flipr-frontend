import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-5 px-8 flex justify-between items-center sticky top-0 z-50">
      {/* 1. Logo: Uppercase, Bold, Teal */}
      <div className="text-xl font-bold text-[#169ca3] tracking-widest cursor-pointer uppercase">
        Next Invest
      </div>
      
      {/* 2. Menu Items */}
      <div className="hidden md:flex gap-8 items-center text-sm font-bold text-gray-700">
        
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#169ca3]">
            <Link to="/">Investment Opportunities</Link>
            <img src="/CaretDown.svg" className="w-2 h-2 opacity-50" alt="" />
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:text-[#169ca3]">
            <a href="#">How it works</a>
            <img src="/CaretDown.svg" className="w-2 h-2 opacity-50" alt="" />
        </div>

        <a href="#" className="hover:text-[#169ca3]">About us</a>
        
        {/* LOGIN: Teal Background */}
        <Link to="/login" className="bg-[#169ca3] text-white px-6 py-3 rounded-sm shadow-sm hover:bg-teal-700 transition uppercase tracking-wide text-xs font-bold">
          Login
        </Link>

        {/* REGISTER: White with Pink Border */}
        <button className="bg-white border border-[#ff5a5f] text-[#ff5a5f] px-6 py-3 rounded-sm hover:bg-gray-50 transition uppercase tracking-wide text-xs font-bold">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;