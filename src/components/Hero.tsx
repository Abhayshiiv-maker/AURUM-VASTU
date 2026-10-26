import React from 'react';
import { Compass, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#0B132B]">
      {/* Background Graphic & Delicate Gold Shimmer */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#c5a059] blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#1C2D4A] blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Asset Showcase - Clean with NO address or text overlays */}
        <div className="mb-10 sm:mb-14 rounded-2xl overflow-hidden border border-[#c5a059]/40 shadow-2xl relative group">
          <img
            src="/assets/aistudio/aurum_vastu_original_top_banner_ac6e7c79.png"
            alt="Aurum Vastu - Harmony, Balance, Prosperity"
            className="w-full h-auto object-cover max-h-[360px] sm:max-h-[440px] transition-transform duration-700 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Hero Narrative - Clean Brand Focus without any Address or Contact info */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Tagline kicker */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#dfc48c] px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#c5a059]/30">
            <Compass className="w-4 h-4 text-[#c5a059]" />
            <span>Harmony · Balance · Prosperity</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.15] text-balance">
            Create Harmony in <span className="gold-gradient-text">Your Space</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Professional Vastu Shastra consultation for homes, offices and commercial properties, with thoughtful analysis and practical recommendations.
          </p>

          {/* Primary & Secondary Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onBookClick}
              className="px-7 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-[#0B132B] bg-gradient-to-r from-[#DFB76C] via-[#E5C378] to-[#C5A059] hover:brightness-105 active:scale-95 rounded-lg shadow-lg hover:shadow-gold-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreServices}
              className="px-7 py-3.5 text-sm sm:text-base font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-[#c5a059]/40 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
            >
              Explore Our Services
            </button>
          </div>
        </div>

        {/* 3-Column Highlights Strip - Clean and Prestigious without contact clutter */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[#c5a059]/20">
          <div className="flex items-start gap-4 p-5 rounded-xl bg-[#142247]/60 border border-[#c5a059]/30">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center shrink-0 text-[#dfc48c]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-medium text-base font-serif">Directional Precision</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Accurate magnetic degree compass evaluation of entrance orientations and elemental energy zones.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl bg-[#142247]/60 border border-[#c5a059]/30">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center shrink-0 text-[#dfc48c]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-medium text-base font-serif">Practical Remedies</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Realistic recommendations prioritizing elemental balancing and space usage without structural demolition.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl bg-[#142247]/60 border border-[#c5a059]/30">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center shrink-0 text-[#dfc48c]">
              <span className="font-serif font-bold text-base text-[#dfc48c]">AV</span>
            </div>
            <div>
              <h3 className="text-white font-medium text-base font-serif">Residential & Commercial</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Tailored solutions for apartments, independent homes, new constructions, corporate offices, and shops.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
