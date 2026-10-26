import React from 'react';
import { FileText, Compass, MessageSquareQuote, Sparkles } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Submit Details & Layout',
      desc: 'Provide your property type, city, floor plan or blueprint, and specific areas of concern or goals.',
      icon: FileText
    },
    {
      number: '02',
      title: 'Directional Zone Analysis',
      desc: 'Sahil Kapoor evaluates degree orientations, entrance thresholds, room zoning, and elemental alignments.',
      icon: Compass
    },
    {
      number: '03',
      title: 'Thoughtful Consultation',
      desc: 'Walkthrough of findings via on-site visit in Faridabad / Delhi NCR or detailed online consultation.',
      icon: MessageSquareQuote
    },
    {
      number: '04',
      title: 'Practical Recommendations',
      desc: 'Actionable, non-demolition recommendations tailored to your architectural structure and family lifestyle.',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-20 bg-[#0B132B] border-b border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#dfc48c]">
            Structured & Transparent
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            How Our Consultation Works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A clear, methodical approach grounded in classical Vastu Shastra principles and respectful of modern construction realities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#0F1C3D] rounded-2xl p-6 sm:p-7 border border-[#c5a059]/30 shadow-xl hover:border-[#c5a059]/60 transition-all duration-300 relative space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-serif font-bold text-[#dfc48c]">{step.number}</span>
                  <div className="w-10 h-10 rounded-xl bg-[#142247] border border-[#c5a059]/40 flex items-center justify-center text-[#dfc48c]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-display font-semibold text-white">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
