import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle2, Compass, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  const [inquiry, setInquiry] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.name.trim() || !inquiry.phone.trim()) return;

    const quickInquiries = JSON.parse(localStorage.getItem('aurum_quick_inquiries') || '[]');
    quickInquiries.unshift({
      id: Date.now(),
      name: inquiry.name,
      phone: inquiry.phone,
      message: inquiry.message,
      date: new Date().toISOString()
    });
    localStorage.setItem('aurum_quick_inquiries', JSON.stringify(quickInquiries));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiry({ name: '', phone: '', message: '' });
    }, 6000);
  };

  const mapSearchQuery = encodeURIComponent('2395, Sector 49, Sainik Colony, Faridabad, Haryana 121001, India');
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapSearchQuery}`;
  const whatsappUrl = `https://wa.me/919540197666?text=${encodeURIComponent('Hello Sahil Kapoor, I would like to enquire about an Aurum Vastu consultation.')}`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0B132B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Call to Action Banner */}
        <div className="mb-16 p-8 sm:p-12 rounded-2xl bg-[#0F1C3D] text-white border border-[#c5a059]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold tracking-widest uppercase text-[#dfc48c]">
              <Compass className="w-4 h-4 text-[#c5a059]" />
              <span>Connect with Aurum Vastu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
              Let’s bring harmony to your space.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect directly with Sahil Kapoor for on-site property visits in Faridabad & Delhi NCR, or remote digital floor plan analysis worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <a
              href="tel:+919540197666"
              className="px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-[#0B132B] bg-gradient-to-r from-[#DFB76C] to-[#C5A059] hover:brightness-105 transition-colors flex items-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 9540197666</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-colors flex items-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Contact Information & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#dfc48c]">
                Get in Touch
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Aurum Vastu
              </h3>
              <p className="text-xs sm:text-sm font-serif italic text-slate-300">
                Harmony, Balance & Prosperity
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Contact Person */}
              <div className="p-4 rounded-xl bg-[#0F1C3D] border border-[#c5a059]/30 shadow-md space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">Contact Person</p>
                <p className="text-base font-semibold text-white">Sahil Kapoor</p>
                <p className="text-xs text-slate-300">Vastu Shastra Consultant & Layout Specialist</p>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl bg-[#0F1C3D] border border-[#c5a059]/30 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">Direct Phone</p>
                  <a
                    href="tel:+919540197666"
                    className="text-base font-semibold text-white hover:text-[#dfc48c] transition-colors block mt-0.5"
                  >
                    +91 9540197666
                  </a>
                </div>
                <a
                  href="tel:+919540197666"
                  className="p-2.5 rounded-lg bg-[#142247] text-[#dfc48c] hover:bg-[#1a2c5c] transition-colors"
                  aria-label="Call Sahil Kapoor"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl bg-[#0F1C3D] border border-[#c5a059]/30 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">Official Email</p>
                  <a
                    href="mailto:Saahilkapoor999@gmail.com"
                    className="text-sm sm:text-base font-medium text-white hover:text-[#dfc48c] transition-colors block mt-0.5 break-all"
                  >
                    Saahilkapoor999@gmail.com
                  </a>
                </div>
                <a
                  href="mailto:Saahilkapoor999@gmail.com"
                  className="p-2.5 rounded-lg bg-[#142247] text-[#dfc48c] hover:bg-[#1a2c5c] transition-colors"
                  aria-label="Email Sahil Kapoor"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Address */}
              <div className="p-4 rounded-xl bg-[#0F1C3D] border border-[#c5a059]/30 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">Consultation Address</p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#dfc48c] hover:underline flex items-center gap-1"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  2395, Sector 49, Sainik Colony, Faridabad, Haryana 121001, India.
                </p>
                <p className="text-xs text-slate-400">
                  Serving Faridabad, Delhi, Gurugram, Noida, and Pan-India online consultations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Embed & Quick Contact Enquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Embedded Location Card */}
            <div className="bg-[#0F1C3D] rounded-2xl border border-[#c5a059]/30 overflow-hidden shadow-xl">
              <div className="p-4 bg-[#142247] border-b border-[#c5a059]/25 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200">
                  <MapPin className="w-4 h-4 text-[#dfc48c]" />
                  <span>Sainik Colony, Sector 49, Faridabad</span>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#dfc48c] hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map embed iframe */}
              <div className="w-full h-56 sm:h-64 bg-[#0B132B] relative">
                <iframe
                  title="Aurum Vastu Location - Sector 49, Sainik Colony, Faridabad"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=2395%2C%20Sector%2049%2C%20Sainik%20Colony%2C%20Faridabad%2C%20Haryana%20121001&t=&z=14&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </div>

            {/* Quick Enquiry Contact Form */}
            <div className="bg-[#0F1C3D] rounded-2xl border border-[#c5a059]/30 p-6 sm:p-7 shadow-xl space-y-4">
              <h4 className="text-base font-display font-semibold text-white">
                Have a Quick Question? Leave a Message
              </h4>
              <p className="text-xs text-slate-300">
                If you have a brief query regarding an upcoming property purchase, renovation, or floor plan review, leave your details below:
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs sm:text-sm text-emerald-300 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Your message has been recorded. Sahil Kapoor will respond shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleQuickInquiry} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="quick-name" className="sr-only">Your Name</label>
                      <input
                        id="quick-name"
                        type="text"
                        required
                        value={inquiry.name}
                        onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                        placeholder="Your Name *"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5a059]/30 text-xs sm:text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="quick-phone" className="sr-only">Phone Number</label>
                      <input
                        id="quick-phone"
                        type="tel"
                        required
                        value={inquiry.phone}
                        onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                        placeholder="Mobile Number *"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5a059]/30 text-xs sm:text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quick-message" className="sr-only">Message</label>
                    <textarea
                      id="quick-message"
                      rows={2}
                      value={inquiry.message}
                      onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                      placeholder="Brief note or question regarding your property..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5a059]/30 text-xs sm:text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] placeholder:text-slate-500"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-2xs text-slate-400">Direct response from Sahil Kapoor</span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-semibold text-[#0B132B] bg-gradient-to-r from-[#DFB76C] to-[#C5A059] hover:brightness-105 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                      <Send className="w-3.5 h-3.5 text-[#0B132B]" />
                      <span>Send Quick Note</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
