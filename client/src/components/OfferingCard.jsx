import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OfferingCard = ({ data }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const percentRaised = data.target > 0 ? Math.min((data.raised / data.target) * 100, 100) : 0;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group relative w-full h-[540px] rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 cursor-pointer hover:shadow-2xl transition-all duration-300"
      onClick={() => navigate(`/offerings/${data.id}`)}
    >

      {/* 1. TOP SECTION (Image with Shimmer Effect) */}
      <div className="absolute top-0 left-0 w-full h-1/2 z-0 overflow-hidden">
        <motion.img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.8 }}
        />

        <div className="absolute top-6 left-6 flex gap-2">
          <motion.span
            className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-3 py-1 uppercase tracking-widest text-gray-700 rounded-sm"
            whileHover={{ scale: 1.1 }}
          >
            {data.tag}
          </motion.span>
        </div>
      </div>

      {/* 2. BOTTOM PANEL (Dark Mode Supported) */}
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-white dark:bg-gray-900 z-10 p-6 flex flex-col justify-between"
        animate={{
          height: isHovered ? '85%' : '55%'
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >

        {/* --- MAIN INFO --- */}
        <div>
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{data.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{data.location}</p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed line-clamp-2 group-hover:line-clamp-3 transition-all">
            {data.description}
          </p>

          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-2 overflow-hidden">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-[#169ca3] to-[#14858b] relative overflow-hidden"
              initial={{ width: 0 }}
              whileInView={{ width: `${percentRaised}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              {/* Shimmer effect on progress bar */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span className="text-[#169ca3] font-bold text-lg">{formatCurrency(data.raised)}</span>
            <span className="text-gray-400 text-xs">raised of {formatCurrency(data.target)}</span>
          </div>
        </div>

        {/* --- HIDDEN DETAILS with Stagger Animation --- */}
        <motion.div
          className="flex flex-col justify-end gap-2 mt-4 flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >

          {[
            { label: 'Security Type', value: data.securityType },
            { label: 'Investment Multiple', value: `${data.multiple}x` },
            { label: 'Maturity', value: `${data.maturity} Months` },
            { label: 'Min. Investment', value: formatCurrency(data.minInvestment) }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
              <span className="font-bold text-gray-900 dark:text-white">{item.value}</span>
            </motion.div>
          ))}

          <motion.button
            className="w-full bg-gradient-to-r from-[#ff5a5f] to-[#e04e53] text-white font-bold py-3 mt-4 rounded-lg uppercase text-sm tracking-widest shadow-md relative overflow-hidden group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative z-10">VIEW DETAILS</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#169ca3] to-[#14858b]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default OfferingCard;