import React from 'react';
import { motion } from 'framer-motion';

const OfferingCard = ({ data }) => {
  // Calculate percentage raised
  const progress = Math.min((data.raised / data.target) * 100, 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }} 
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gray-200">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
           <span className="bg-white text-xs font-bold px-3 py-1 uppercase tracking-wide rounded-sm shadow-sm">
             {data.tag}
           </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{data.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{data.location}</p>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {data.description}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full mb-2">
          <div 
            className="bg-primary h-1.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm font-bold text-teal-700 mb-6">
           <span>${data.raised.toLocaleString()} raised</span>
           <span className="text-gray-400 font-normal">of ${data.target.toLocaleString()}</span>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-y-3 text-xs border-t pt-4 bg-gray-50 -mx-6 px-6 pb-2">
           <div>
             <p className="text-gray-400 uppercase">Security Type</p>
             <p className="font-bold text-gray-700">{data.securityType}</p>
           </div>
           <div>
             <p className="text-gray-400 uppercase">Inv. Multiple</p>
             <p className="font-bold text-gray-700">{data.multiple}x</p>
           </div>
           <div>
             <p className="text-gray-400 uppercase">Maturity</p>
             <p className="font-bold text-gray-700">{data.maturity} Months</p>
           </div>
           <div>
             <p className="text-gray-400 uppercase">Min. Inv.</p>
             <p className="font-bold text-gray-700">${data.minInvestment}</p>
           </div>
        </div>
      </div>
      
      {/* Button */}
      <button className="w-full bg-secondary text-white font-bold py-3 hover:bg-red-500 transition-colors uppercase text-sm tracking-wider">
        View Project
      </button>
    </motion.div>
  );
};

export default OfferingCard;