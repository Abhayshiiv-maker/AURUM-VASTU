import React from 'react';
import { Compass, Sparkles, Scale, HeartHandshake } from 'lucide-react';

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 lg:py-28 bg-[#0B132B] text-white relative overflow-hidden">
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column with Architectural Masterpiece */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/40 shadow-2xl group">
              <img
                src="/assets/aistudio/ChatGPT_Image_Oct_22__2026__12_04_45_AM_a381beaf.jpg"
                alt="Harmonious architectural courtyard with natural water elements, wood and stone"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/85 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B132B]/85 backdrop-blur-md border border-[#c5a059]/30">
                <p className="text-xs uppercase tracking-widest text-[#dfc48c] font-medium font-serif">Spatial Equilibrium</p>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Integrating the five primordial elements (Pancha Bhoota) into contemporary architectural spaces.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy Statement Column */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#dfc48c]">
                <Compass className="w-4 h-4 text-[#c5a059]" />
                <span>Our Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
                Harmony in Space, <span className="gold-gradient-text">Balance in Life</span>
              </h2>
            </div>

            {/* Exact Required Philosophy Content */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#142247]/60 border border-[#c5a059]/30 relative shadow-xl">
              <div className="text-4xl text-[#c5a059] font-serif leading-none opacity-60 mb-2">“</div>
              <blockquote className="text-lg sm:text-xl font-display font-medium text-white/95 leading-relaxed tracking-wide">
                We believe that every space has the potential to become more harmonious and functional. Through the traditional principles of Vastu Shastra and a thoughtful, practical approach, Aurum Vastu aims to help you make informed decisions about your surroundings.
              </blockquote>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-serif text-[#dfc48c] tracking-wider uppercase">Aurum Vastu Mandate</span>
                <span>Sahil Kapoor · Faridabad, India</span>
              </div>
            </div>

            {/* Core Values Triad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="text-xs uppercase tracking-wider text-[#dfc48c] font-serif font-semibold">01. Harmony</div>
                <p className="text-xs text-slate-300">
                  Aligning environmental energy flows with structural proportions and functional utility.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="text-xs uppercase tracking-wider text-[#dfc48c] font-serif font-semibold">02. Balance</div>
                <p className="text-xs text-slate-300">
                  Balancing the five fundamental elements: Earth, Water, Fire, Air, and Space.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="text-xs uppercase tracking-wider text-[#dfc48c] font-serif font-semibold">03. Prosperity</div>
                <p className="text-xs text-slate-300">
                  Creating spaces that support health, clarity, career focus, and sustained peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
