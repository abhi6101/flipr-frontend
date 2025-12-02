import React from 'react';
import { useNavigate } from 'react-router-dom';

const OfferingCard = ({ data }) => {
  const navigate = useNavigate();
  const percentRaised = data.target > 0 ? Math.min((data.raised / data.target) * 100, 100) : 0;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div 
      className="group relative w-full h-[540px] rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 cursor-pointer hover:shadow-2xl transition-all duration-300"
      onClick={() => navigate(`/offerings/${data.id}`)}
    >
      
      {/* 1. TOP SECTION (Image) */}
      <div className="absolute top-0 left-0 w-full h-1/2 z-0">
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-6 left-6 flex gap-2">
           <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-3 py-1 uppercase tracking-widest text-gray-700 rounded-sm">
             {data.tag}
           </span>
        </div>
      </div>

      {/* 2. BOTTOM PANEL (Dark Mode Supported) */}
      <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-gray-900 h-[55%] group-hover:h-[85%] transition-all duration-500 ease-in-out z-10 p-6 flex flex-col justify-between">
        
        {/* --- MAIN INFO --- */}
        <div>
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{data.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{data.location}</p>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed line-clamp-2 group-hover:line-clamp-3 transition-all">
            {data.description}
          </p>

          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mb-2">
            <div 
              className="bg-[#169ca3] h-1.5 rounded-full" 
              style={{ width: `${percentRaised}%` }}
            ></div>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
             <span className="text-[#169ca3] font-bold text-lg">{formatCurrency(data.raised)}</span>
             <span className="text-gray-400 text-xs">raised of {formatCurrency(data.target)}</span>
          </div>
        </div>

        {/* --- HIDDEN DETAILS --- */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 flex flex-col justify-end gap-2 mt-4 flex-1">
           
           <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-1">
             <span className="text-gray-500 dark:text-gray-400">Security Type</span>
             <span className="font-bold text-gray-900 dark:text-white">{data.securityType}</span>
           </div>

           <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-1">
             <span className="text-gray-500 dark:text-gray-400">Investment Multiple</span>
             <span className="font-bold text-gray-900 dark:text-white">{data.multiple}x</span>
           </div>

           <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-1">
             <span className="text-gray-500 dark:text-gray-400">Maturity</span>
             <span className="font-bold text-gray-900 dark:text-white">{data.maturity} Months</span>
           </div>

           <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-1">
             <span className="text-gray-500 dark:text-gray-400">Min. Investment</span>
             <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(data.minInvestment)}</span>
           </div>

           <button className="w-full bg-[#ff5a5f] text-white font-bold py-3 mt-4 rounded hover:bg-[#e04e53] transition-colors uppercase text-sm tracking-widest shadow-md">
             VIEW
           </button>
        </div>

      </div>
    </div>
  );
};

export default OfferingCard;