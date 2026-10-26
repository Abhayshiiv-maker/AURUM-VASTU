import React, { useState } from 'react';
import { VASTU_ZONES_DATA } from '../data/vastuZonesData.ts';
import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { DirectionZone } from '../types.ts';

export const VastuZonesExplorer: React.FC = () => {
  const [selectedDirection, setSelectedDirection] = useState<string>('North-East');

  const currentZone: DirectionZone =
    VASTU_ZONES_DATA.find((z) => z.direction === selectedDirection) || VASTU_ZONES_DATA[1];

  return (
    <section id="directions" className="py-20 lg:py-28 bg-[#081024] relative border-b border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#dfc48c]">
            Directional Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            The 8 Cardinal & Ordinal Vastu Zones
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            In Vastu Shastra, every compass direction governs specific energies, life aspects, and natural elements. Click each direction below to explore how Aurum Vastu evaluates your floor plan.
          </p>
        </div>

        {/* 8 Directions Navigation Strip */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
          {VASTU_ZONES_DATA.map((zone) => {
            const isSelected = zone.direction === selectedDirection;
            return (
              <button
                key={zone.direction}
                onClick={() => setSelectedDirection(zone.direction)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#DFB76C] via-[#E5C378] to-[#C5A059] text-[#0B132B] font-bold border-[#dfc48c] shadow-lg scale-105'
                    : 'bg-[#142247] text-slate-200 hover:text-white border-[#c5a059]/30 hover:border-[#dfc48c]'
                }`}
              >
                <span className={isSelected ? 'text-[#0B132B] font-serif font-bold' : 'text-[#dfc48c] font-serif font-bold'}>
                  {zone.direction}
                </span>
                <span className="text-xs opacity-80">({zone.hindiName})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Zone Deep Dive Display */}
        <div className="bg-[#0F1C3D] rounded-2xl border border-[#c5a059]/40 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Blueprint Visual Column */}
          <div className="lg:col-span-5 bg-[#0B132B] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#c5a059]/30">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#dfc48c] font-semibold">Zone Focus</span>
                <span className="text-xs text-slate-400 font-mono">Brahmasthan Aligned</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {currentZone.direction} <span className="text-[#dfc48c] font-serif font-normal">({currentZone.hindiName})</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Ruling Energy: <strong className="text-white">{currentZone.rulingDeity}</strong> · Element: <strong className="text-[#dfc48c]">{currentZone.element}</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                <p className="text-xs uppercase tracking-wider text-[#dfc48c] font-medium">Core Significance</p>
                <p className="text-sm text-slate-200 leading-relaxed font-serif">
                  {currentZone.keySignificance}
                </p>
              </div>
            </div>

            {/* Thumbnail reference to uploaded modern blueprint */}
            <div className="pt-6 relative z-10">
              <div className="rounded-xl overflow-hidden border border-[#c5a059]/40 relative group">
                <img
                  src="/assets/aistudio/Vastu_Blueprint_for_a_Modern_Home_780862b9.png"
                  alt="Vastu Blueprint directional mapping reference"
                  className="w-full h-40 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0B132B]/60 flex items-center justify-center p-3 text-center">
                  <span className="text-xs text-[#dfc48c] font-medium font-serif">
                    Integrated Directional Blueprint Mapping
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Breakdown Details Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0F1C3D]">
            <div className="space-y-6">
              {/* Ideal Usages */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ideal Placement & Functions</span>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-sm text-emerald-100 leading-relaxed">
                  {currentZone.idealFor}
                </div>
              </div>

              {/* Elements to Avoid */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>What to Avoid in this Zone</span>
                </div>
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-sm text-amber-100 leading-relaxed">
                  {currentZone.toAvoid}
                </div>
              </div>

              {/* Practical Non-demolition Remedy */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                  <Lightbulb className="w-4 h-4 text-[#c5a059]" />
                  <span>Practical Aurum Vastu Recommendation</span>
                </div>
                <div className="p-4 rounded-xl bg-[#142247]/90 border border-[#c5a059]/40 text-sm text-slate-200 leading-relaxed">
                  {currentZone.remedyTip}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c5a059]/20 text-xs text-slate-400 flex items-center justify-between">
              <span>Scientific compass assessment during personal consultation</span>
              <a
                href="#book"
                className="text-xs font-semibold text-[#dfc48c] hover:text-white underline underline-offset-4"
              >
                Analyze Your Floor Plan →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
