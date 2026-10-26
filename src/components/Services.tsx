import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ArrowRight, Check } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Residential' | 'Commercial' | 'Analysis'>('All');

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Residential') return service.category === 'Residential';
    if (activeFilter === 'Commercial') return service.category === 'Commercial';
    if (activeFilter === 'Analysis') return service.category === 'Analysis' || service.category === 'Remedies';
    return true;
  });

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0B132B] border-t border-b border-[#c5a059]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#dfc48c]">
            Comprehensive Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Our Consultation Services
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every property has unique energetic dynamics. Explore our core consultation areas designed to bring balance, clarity, and prosperity to your living and working spaces.
          </p>

          {/* Interactive Filter Tabs */}
          <div className="pt-4 flex items-center justify-center gap-2 flex-wrap">
            {(['All', 'Residential', 'Commercial', 'Analysis'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#DFB76C] to-[#C5A059] text-[#0B132B] font-semibold border-[#c5a059] shadow-sm'
                    : 'bg-[#142247] text-slate-300 hover:text-white border-[#c5a059]/30 hover:border-[#dfc48c]'
                }`}
              >
                {filter === 'Analysis' ? 'Analysis & Remedies' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <article
              key={service.id}
              className="bg-[#0F1C3D] rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-xl hover:border-[#c5a059]/70 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Fallback */}
              <div className="relative overflow-hidden bg-[#060b17] h-52 w-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1C3D] via-black/30 to-transparent pointer-events-none" />
                
                {/* Clean unboxed category kicker */}
                <div className="absolute bottom-3 left-4 text-xs font-medium text-[#dfc48c] drop-shadow-md">
                  <span>0{index + 1}</span>
                  <span aria-hidden="true" className="mx-1.5 text-white/60">·</span>
                  <span>{service.category}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-xl font-display font-semibold text-white group-hover:text-[#dfc48c] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {service.shortDesc}
                  </p>

                  {/* Key Highlights list */}
                  <ul className="pt-2 space-y-1.5 text-xs text-slate-300">
                    {service.highlights.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#dfc48c] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Consultation Action */}
                <div className="pt-4 border-t border-[#c5a059]/20 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Personalized Assessment</span>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#dfc48c] hover:text-white transition-colors cursor-pointer group/btn"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-[#dfc48c]" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
