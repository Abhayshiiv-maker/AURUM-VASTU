import React from 'react';
import { X, Globe, CheckCircle, ExternalLink, HelpCircle, ArrowRight, Shield } from 'lucide-react';

interface PublishingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishingGuideModal: React.FC<PublishingGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B132B] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c5a059] flex items-center justify-center text-[#0B132B] font-bold text-xs">
              AV
            </div>
            <div>
              <h3 className="text-base font-display font-semibold text-white">
                Zero-Budget Publishing & Hosting Guide
              </h3>
              <p className="text-2xs text-[#dfc48c]">
                Aurum Vastu · Complete Free Deployment Options
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-gold-50 border border-gold-200 text-xs sm:text-sm text-slate-800 space-y-1">
            <p className="font-semibold text-[#0B132B]">Zero-Budget Commitment:</p>
            <p className="text-slate-700">
              You do <strong>not</strong> need to buy a custom domain or pay any monthly hosting fees. Below are the three best 100% free ways to share or publish this website to your clients.
            </p>
          </div>

          {/* Option 1: AI Studio Shared URL */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-700">
                Option 1 (Instant & Recommended)
              </span>
              <span className="text-2xs font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                Zero Configuration Needed
              </span>
            </div>
            <h4 className="text-base font-display font-semibold text-[#0B132B]">
              Share Directly via Google AI Studio Public Preview URL
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This complete, interactive website is already deployed and hosted live on Google Cloud Run. You can use the generated <strong>Shared App URL</strong> directly.
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li><strong>Cost:</strong> ₹0 / $0 completely free.</li>
              <li><strong>SSL / HTTPS:</strong> Automatic Google-signed SSL certificate.</li>
              <li><strong>Domain:</strong> Hosted on Google's high-speed global edge network.</li>
              <li><strong>How to use:</strong> Simply copy your shared link from the AI Studio header (Share button) and send it to clients via WhatsApp, Instagram, or email.</li>
            </ul>
          </div>

          {/* Option 2: Free Static Web Hosting (Vercel / GitHub Pages) */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-700">
                Option 2 (Permanent Clean URL)
              </span>
              <span className="text-2xs font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                Free Subdomain (e.g. aurumvastu.vercel.app)
              </span>
            </div>
            <h4 className="text-base font-display font-semibold text-[#0B132B]">
              Deploy to Vercel, Netlify, or GitHub Pages for Free
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If you want a permanent public URL like <code>aurumvastu.vercel.app</code> without paying a single rupee:
            </p>
            <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
              <li>Download this project repository or push it to a free GitHub account.</li>
              <li>Go to <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Vercel.com</a> and sign in with GitHub.</li>
              <li>Click "Add New Project", choose this repository, and click "Deploy".</li>
              <li>Vercel builds the React application and provides a free, lightning-fast <code>.vercel.app</code> website URL with unlimited free bandwidth for personal and small business sites.</li>
            </ol>
          </div>

          {/* Option 3: Google Sites Recreation Blueprint */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-purple-700">
                Option 3 (Google Sites Alternative)
              </span>
              <span className="text-2xs font-mono bg-purple-50 text-purple-800 px-2 py-0.5 rounded border border-purple-200">
                Recreation Blueprint
              </span>
            </div>
            <h4 className="text-base font-display font-semibold text-[#0B132B]">
              How to Recreate in Google Sites (sites.google.com)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Google Sites does not allow importing complex custom React code, but you can recreate this identical structure in 15 minutes using Google Sites native blocks:
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li><strong>Header Banner:</strong> Insert a Large Banner in Google Sites and upload <code>aurum_vastu_original_top_banner_ac6e7c79.png</code>.</li>
              <li><strong>Logo:</strong> Click "Add logo" and select <code>WhatsApp_Image_...01ea1653.jpeg</code>.</li>
              <li><strong>About Section:</strong> Add a 2-column block; put the consultation desk photo on the left, and copy-paste the 4 exact About paragraphs on the right.</li>
              <li><strong>Services:</strong> Use Google Sites' 3-item image carousel or 3-column card template, pasting the 7 service titles, images, and descriptions.</li>
              <li><strong>Booking Form:</strong> Create a free <strong>Google Form</strong> with the 8 fields (Full Name, Phone, Email, Property Type, Service, Date, Time, Locality), then click "Insert → Forms" in Google Sites. Responses automatically save to Google Sheets!</li>
              <li><strong>Contact Info:</strong> Insert text with Sahil Kapoor's phone, email, and add a Google Maps widget set to Sector 49, Sainik Colony, Faridabad.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-2xs text-slate-500">Prepared for Sahil Kapoor · Aurum Vastu</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0B132B] hover:bg-[#142247] rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
