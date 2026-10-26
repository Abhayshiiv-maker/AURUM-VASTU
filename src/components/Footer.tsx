import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Compass, ShieldCheck, HelpCircle, Lock } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData.ts';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenPublishingGuide: () => void;
  onOpenOwnerPortal: () => void;
  onSelectService: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenPublishingGuide,
  onOpenOwnerPortal,
  onSelectService
}) => {
  return (
    <footer className="bg-[#0B132B] text-white border-t border-[#c5a059]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-21_at_4.43.01_PM_01ea1653.jpeg"
                alt="Aurum Vastu Logo"
                className="w-11 h-11 rounded-full object-cover border border-[#c5a059]/60"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-white">
                  AURUM VASTU
                </span>
                <p className="text-2xs font-serif text-[#dfc48c] tracking-widest uppercase">
                  Harmony · Balance · Prosperity
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Professional Vastu Shastra consultation for residential and commercial properties. Practical guidance, directional zone analysis, and thoughtful non-demolition recommendations.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>Principal Consultant: <strong className="text-white">Sahil Kapoor</strong></p>
              <p>Location: <span className="text-[#dfc48c]">Sector 49, Sainik Colony, Faridabad</span></p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#dfc48c] font-serif">
              Navigation
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Aurum Vastu</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#directions" className="hover:text-white transition-colors">8 Directional Zones</a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">Our Philosophy</a>
              </li>
              <li>
                <a href="#book" className="hover:text-white transition-colors">Book Consultation</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#dfc48c] font-serif">
              Our Services
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      onSelectService(service.title);
                      const el = document.getElementById('book');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#dfc48c] transition-colors text-left cursor-pointer truncate max-w-full block"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#dfc48c] font-serif">
              Consultation Office
            </p>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  2395, Sector 49, Sainik Colony, Faridabad, Haryana 121001, India.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href="tel:+919540197666" className="hover:text-white transition-colors">
                  +91 9540197666
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href="mailto:Saahilkapoor999@gmail.com" className="hover:text-white transition-colors break-all">
                  Saahilkapoor999@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/919540197666?text=Hello%20Sahil%20Kapoor,%20I%20would%20like%20to%20enquire%20about%20an%20Aurum%20Vastu%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  WhatsApp: +91 9540197666
                </a>
              </div>
            </div>

            {/* Quick helper buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenPublishingGuide}
                className="text-2xs text-[#dfc48c] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-left"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Zero-Budget Publishing Guide</span>
              </button>
              <button
                onClick={onOpenOwnerPortal}
                className="text-2xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer text-left"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Owner Consultation Desk</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Aurum Vastu. All rights reserved. Vastu Consultation by Sahil Kapoor.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy & Standards
            </button>
            <button
              onClick={onOpenPublishingGuide}
              className="hover:text-[#dfc48c] transition-colors cursor-pointer"
            >
              Free Hosting Info
            </button>
            <a
              href="#book"
              className="text-[#dfc48c] hover:underline"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
