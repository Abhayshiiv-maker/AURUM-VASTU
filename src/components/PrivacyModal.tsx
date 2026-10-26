import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 bg-[#0B132B] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#dfc48c]" />
            <h3 className="text-base font-display font-semibold text-white">
              Privacy & Consultation Standards
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900">1. Client Confidentiality</h4>
            <p>
              At Aurum Vastu, all personal contact details, property blueprints, architectural layouts, and family or business discussions shared with Sahil Kapoor are held under strict confidentiality. We do not publish client floor plans or disclose proprietary property details to any third party.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900">2. Ethical Consultation Practices</h4>
            <p>
              Our consultations are advisory and grounded in classical Vastu Shastra principles combined with practical modern architecture. Aurum Vastu does not promote superstition, fear-based selling, or guaranteed astrological outcomes. All recommendations prioritize non-demolition remedies, elemental balancing, and thoughtful spatial functionality.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900">3. Transparent Booking & Communication</h4>
            <p>
              Submitting a consultation request records your intention to explore a consultation. Appointment slots are confirmed directly by Sahil Kapoor after analyzing schedule availability and property requirements. We do not process unsolicited automatic credit charges.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900">4. Contact & Inquiries</h4>
            <p>
              For any questions regarding your data or consultation records, you may reach Sahil Kapoor directly at{' '}
              <a href="mailto:Saahilkapoor999@gmail.com" className="text-[#0B132B] font-medium underline">
                Saahilkapoor999@gmail.com
              </a>{' '}
              or by phone at{' '}
              <a href="tel:+919540197666" className="text-[#0B132B] font-medium underline">
                +91 9540197666
              </a>.
            </p>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0B132B] hover:bg-[#142247] rounded-lg transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
