import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/offerings/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project details", error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#169ca3] font-bold dark:bg-gray-900">Loading Project...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Project not found</div>;

  // Calculate percentage safely
  const percentRaised = project.target > 0 ? Math.min((project.raised / project.target) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 font-sans transition-colors duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="mb-8 text-gray-500 dark:text-gray-400 hover:text-[#169ca3] dark:hover:text-[#169ca3] font-bold flex items-center gap-2 transition-colors uppercase text-xs tracking-wider"
        >
          ← Back to All Offerings
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] transition-colors duration-300">
          
          {/* LEFT: IMAGE SECTION */}
          <div className="md:w-1/2 relative bg-gray-200 dark:bg-gray-700">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
            <div className="absolute top-8 left-8">
               <span className="bg-white/90 backdrop-blur text-xs font-bold px-4 py-2 uppercase tracking-wide rounded shadow-sm text-gray-800">
                 {project.tag}
               </span>
            </div>
          </div>

          {/* RIGHT: DETAILS SECTION */}
          <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            
            <div className="mb-2 text-[#169ca3] text-sm font-bold uppercase tracking-widest">{project.location}</div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">{project.title}</h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 leading-relaxed font-light">
              {project.description}
            </p>

            {/* Funding Bar */}
            <div className="mb-10 p-8 bg-[#f2fcfc] dark:bg-gray-700/50 rounded-lg border border-[#e0f2f2] dark:border-gray-600">
              <div className="flex justify-between text-base font-bold mb-3">
                 <span className="text-[#169ca3] text-2xl">${project.raised.toLocaleString()} <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">raised</span></span>
                 <span className="text-gray-400 dark:text-gray-400 self-end">Target: ${project.target.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded-full mb-3">
                <div 
                  className="bg-[#169ca3] h-2 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-teal-200/50" 
                  style={{ width: `${percentRaised}%` }}
                ></div>
              </div>
              <div className="text-right text-xs font-bold text-[#169ca3]">{Math.round(percentRaised)}% FUNDED</div>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12 border-t border-b py-8 border-gray-100 dark:border-gray-700">
               <div>
                 <p className="text-gray-400 dark:text-gray-500 text-xs uppercase font-bold mb-1">Security Type</p>
                 <p className="text-lg font-bold text-gray-800 dark:text-white">{project.securityType}</p>
               </div>
               <div>
                 <p className="text-gray-400 dark:text-gray-500 text-xs uppercase font-bold mb-1">Investment Multiple</p>
                 <p className="text-lg font-bold text-gray-800 dark:text-white">{project.multiple}x</p>
               </div>
               <div>
                 <p className="text-gray-400 dark:text-gray-500 text-xs uppercase font-bold mb-1">Maturity</p>
                 <p className="text-lg font-bold text-gray-800 dark:text-white">{project.maturity} Months</p>
               </div>
               <div>
                 <p className="text-gray-400 dark:text-gray-500 text-xs uppercase font-bold mb-1">Min. Investment</p>
                 <p className="text-lg font-bold text-gray-800 dark:text-white">${project.minInvestment}</p>
               </div>
            </div>

            <button 
                className="w-full bg-[#ff5a5f] text-white font-bold py-5 rounded hover:bg-[#e0484d] transition-colors uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                onClick={() => alert("This opens the payment gateway.")}
            >
              Invest Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;