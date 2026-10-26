import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Services } from './components/Services.tsx';
import { VastuZonesExplorer } from './components/VastuZonesExplorer.tsx';
import { Philosophy } from './components/Philosophy.tsx';
import { Process } from './components/Process.tsx';
import { BookingForm } from './components/BookingForm.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { OwnerDashboardModal } from './components/OwnerDashboardModal.tsx';
import { PublishingGuideModal } from './components/PublishingGuideModal.tsx';
import { PrivacyModal } from './components/PrivacyModal.tsx';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [isOwnerPortalOpen, setIsOwnerPortalOpen] = useState<boolean>(false);
  const [isPublishingGuideOpen, setIsPublishingGuideOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  const scrollToBooking = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedService(serviceTitle);
    }
    const el = document.getElementById('book');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col selection:bg-[#c5a059]/30 selection:text-white">
      {/* 1. Header Navigation adhering strictly to Top Bar Contract */}
      <Navbar
        onOpenBooking={() => scrollToBooking()}
        onOpenOwnerPortal={() => setIsOwnerPortalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Banner Asset Showcase */}
        <Hero
          onBookClick={() => scrollToBooking()}
          onExploreServices={scrollToServices}
        />

        {/* 3. About Aurum Vastu with Exact Required Text */}
        <About onBookClick={() => scrollToBooking()} />

        {/* 4. Consultation Offerings with 7 Cards and Authentic Imagery */}
        <Services onSelectService={(serviceName) => scrollToBooking(serviceName)} />

        {/* 5. Interactive 8 Directional Zones Explorer */}
        <VastuZonesExplorer />

        {/* 6. Consultation Methodology & Process */}
        <Process />

        {/* 7. Our Philosophy with Exact Copy */}
        <Philosophy />

        {/* 8. Functional Booking Engine with Validation & Direct WhatsApp/Calendar */}
        <BookingForm
          preselectedService={selectedService}
          onBookingSubmitted={() => {
            // Optional callback
          }}
        />

        {/* 9. Contact Us with Complete Information for Sahil Kapoor & Map */}
        <Contact />
      </main>

      {/* 10. Footer with Brand, Services, Contact, Legal & Guide Triggers */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenPublishingGuide={() => setIsPublishingGuideOpen(true)}
        onOpenOwnerPortal={() => setIsOwnerPortalOpen(true)}
        onSelectService={(serviceName) => scrollToBooking(serviceName)}
      />

      {/* Floating Action Badge for Immediate WhatsApp Communication */}
      <aside aria-label="Direct Consultation Support" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        <a
          href="https://wa.me/919540197666?text=Hello%20Sahil%20Kapoor,%20I%20would%20like%20to%20enquire%20about%20an%20Aurum%20Vastu%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          aria-label="Direct WhatsApp Enquiry with Sahil Kapoor"
          title="Direct WhatsApp with Sahil Kapoor"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
        </a>
      </aside>

      {/* Interactive Modals */}
      <OwnerDashboardModal
        isOpen={isOwnerPortalOpen}
        onClose={() => setIsOwnerPortalOpen(false)}
      />

      <PublishingGuideModal
        isOpen={isPublishingGuideOpen}
        onClose={() => setIsPublishingGuideOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}
