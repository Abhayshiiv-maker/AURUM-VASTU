import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenOwnerPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenOwnerPortal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Directions', href: '#directions' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B132B]/95 backdrop-blur-md shadow-lg border-b border-[#c5a059]/30 py-3'
          : 'bg-[#0B132B]/85 backdrop-blur-sm border-b border-[#c5a059]/20 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Circular Logo */}
          <a
            href="#"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] rounded-md"
            aria-label="Aurum Vastu Homepage"
          >
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-21_at_4.43.01_PM_01ea1653.jpeg"
              alt="Aurum Vastu Emblem"
              className="w-9 h-9 rounded-full object-cover border border-[#c5a059] shadow-xs"
              referrerPolicy="no-referrer"
            />
            <span className="font-display font-semibold tracking-wider text-white text-lg sm:text-xl">
              AURUM VASTU
            </span>
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#dfc48c] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#c5a059] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Quick Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide text-[#0B132B] bg-gradient-to-r from-[#DFB76C] via-[#E5C378] to-[#C5A059] hover:brightness-105 active:scale-95 rounded-lg shadow-md hover:shadow-gold-500/20 transition-all duration-200 border border-[#c5a059]/40 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
            >
              Book a Consultation
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer in Luxury Navy */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0B132B] border-b border-[#c5a059]/30 px-4 pt-3 pb-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-[#dfc48c] py-2 px-3 rounded-md hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-[#0B132B] bg-gradient-to-r from-[#DFB76C] to-[#C5A059] rounded-lg shadow-md cursor-pointer"
              >
                Book a Consultation
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                <a
                  href="tel:+919540197666"
                  className="flex items-center gap-1.5 py-1 text-slate-300 hover:text-[#dfc48c]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>+91 9540197666</span>
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenOwnerPortal();
                  }}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-2"
                >
                  Owner Portal
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
