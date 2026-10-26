import React from 'react';
import { Compass, CheckCircle2, User, MapPin } from 'lucide-react';

interface AboutProps {
  onBookClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onBookClick }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#081024] relative overflow-hidden border-t border-[#c5a059]/20">
      {/* Background Gold Ambient Glow */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column with Authentic Consultation Desk Image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/40 shadow-2xl bg-[#0B132B] p-2">
              <img
                src="/assets/aistudio/ChatGPT_Image_Oct_22__2026__12_32_14_AM_f1982c3b.jpg"
                alt="Traditional Vastu Shastra consultation analysis tools, compass and blueprint"
                className="w-full h-[380px] sm:h-[440px] object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent pointer-events-none rounded-xl" />
              
              {/* Floating emblem stamp */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#0B132B]/95 backdrop-blur-md rounded-xl border border-[#c5a059]/40 text-white flex items-center gap-4">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-21_at_4.43.01_PM_01ea1653.jpeg"
                  alt="Aurum Vastu Emblem"
                  className="w-12 h-12 rounded-full border border-[#c5a059] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif font-semibold text-sm text-[#dfc48c]">Aurum Vastu</h4>
                  <p className="text-xs text-slate-300">Harmony in Space, Balance in Life</p>
                </div>
              </div>
            </div>

            {/* Consultant Profile Snippet */}
            <div className="bg-[#0F1C3D] rounded-xl p-5 border border-[#c5a059]/30 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#142247] border border-[#c5a059]/40 flex items-center justify-center text-[#dfc48c]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Principal Consultant</p>
                  <p className="text-sm font-semibold text-white">Sahil Kapoor</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-[#dfc48c]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Faridabad, Haryana</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy Column with Verbatim Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#dfc48c]">
                About Aurum Vastu
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Traditional Vastu Principles, Thoughtful Analysis & Practical Guidance
              </h2>
            </div>

            {/* Exact Required Paragraphs */}
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                Aurum Vastu provides professional Vastu Shastra consultation for residential and commercial properties. Our services include home and flat Vastu, office and shop Vastu, floor plan analysis, entrance direction assessment, room placement evaluation, directional zone analysis and practical Vastu recommendations.
              </p>

              <p>
                We aim to help clients understand their property’s layout and identify opportunities to create a more balanced, harmonious and functional environment. Consultations can be tailored to new properties, existing homes, renovation projects and commercial spaces.
              </p>

              <p>
                Our approach focuses on traditional Vastu principles, thoughtful analysis and practical guidance based on the property’s layout and the client’s requirements.
              </p>
            </div>

            {/* Quote Callout with Philosophy Line */}
            <div className="p-5 rounded-xl bg-[#0F1C3D] border border-[#c5a059]/40 shadow-md space-y-2">
              <p className="text-xs uppercase tracking-wider text-[#dfc48c] font-medium font-serif">Core Philosophy</p>
              <p className="text-lg sm:text-xl font-display font-semibold text-white italic">
                “At Aurum Vastu, our philosophy is simple: Harmony in Space, Balance in Life.”
              </p>
            </div>

            {/* Key Service Touchpoints List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Homes, Flats & Independent Villas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Offices, Shops & Commercial Layouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Pre-Construction & Renovation Review</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Scientific Degree & Compass Verification</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="px-6 py-3 text-sm font-semibold text-[#0B132B] bg-gradient-to-r from-[#DFB76C] via-[#E5C378] to-[#C5A059] hover:brightness-105 active:scale-95 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
              >
                Schedule a Consultation with Sahil Kapoor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
