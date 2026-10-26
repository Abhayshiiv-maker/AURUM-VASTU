import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, AlertCircle, MessageSquare, Mail, Send } from 'lucide-react';
import { BookingSubmission } from '../types.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';

interface BookingFormProps {
  preselectedService?: string;
  onBookingSubmitted?: (booking: BookingSubmission) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedService,
  onBookingSubmitted
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    propertyType: 'Home' as BookingSubmission['propertyType'],
    consultationType: preselectedService || SERVICES_DATA[0].title,
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 01:00 PM)',
    cityLocality: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingSubmission | null>(null);

  // Sync preselected service if passed from a service card click
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, consultationType: preselectedService }));
    }
  }, [preselectedService]);

  const todayString = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters)';
    }

    const cleanPhone = formData.mobile.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Please select your property type';
    }

    if (!formData.consultationType) {
      newErrors.consultationType = 'Please select a consultation type';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select your preferred consultation date';
    } else if (formData.preferredDate < todayString) {
      newErrors.preferredDate = 'Preferred date cannot be in the past';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time slot';
    }

    if (!formData.cityLocality.trim() || formData.cityLocality.trim().length < 2) {
      newErrors.cityLocality = 'Please state your city and locality (e.g. Faridabad, Sector 49)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const constructWhatsAppMessage = (data: typeof formData) => {
    const text = `*New Consultation Inquiry - Aurum Vastu*
---------------------------------------
*Client Name:* ${data.fullName}
*Phone:* ${data.mobile}
*Email:* ${data.email}
*Property Type:* ${data.propertyType}
*Service Requested:* ${data.consultationType}
*Location:* ${data.cityLocality}
*Preferred Date:* ${data.preferredDate || 'Flexible'}
*Preferred Time:* ${data.preferredTime}
${data.message ? `*Notes/Requirements:* ${data.message}` : ''}
---------------------------------------
Hello Sahil Kapoor, I would like to schedule a Vastu consultation for my space.`;
    return encodeURIComponent(text);
  };

  const constructEmailUrl = (data: typeof formData) => {
    const subject = encodeURIComponent(`Consultation Booking Request: ${data.fullName} (${data.propertyType})`);
    const body = encodeURIComponent(`Hello Sahil Kapoor,

I would like to request a Vastu consultation with Aurum Vastu. Here are my property and booking details:

Full Name: ${data.fullName}
Mobile: ${data.mobile}
Email: ${data.email}
Property Type: ${data.propertyType}
Consultation Service: ${data.consultationType}
Property City & Locality: ${data.cityLocality}
Preferred Consultation Date: ${data.preferredDate}
Preferred Time Window: ${data.preferredTime}

Specific Vastu Requirements / Notes:
${data.message || 'None specified'}

Please let me know your availability to confirm the appointment.

Thank you,
${data.fullName}`);
    return `mailto:Saahilkapoor999@gmail.com?subject=${subject}&body=${body}`;
  };

  const constructGoogleCalendarUrl = (booking: BookingSubmission) => {
    const dateClean = booking.preferredDate.replace(/-/g, '');
    const startIso = `${dateClean}T050000Z`;
    const endIso = `${dateClean}T063000Z`;

    const title = encodeURIComponent(`Aurum Vastu Consultation - ${booking.propertyType} (${booking.fullName})`);
    const details = encodeURIComponent(`Vastu Consultation with Sahil Kapoor (+91 9540197666, Saahilkapoor999@gmail.com).\nService: ${booking.consultationType}\nLocation: ${booking.cityLocality}\nClient Phone: ${booking.mobile}\nStatus: Booking request submitted, awaiting final schedule confirmation by consultant.`);
    const location = encodeURIComponent(`${booking.cityLocality}, India`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const newBooking: BookingSubmission = {
      id: `AV-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      fullName: formData.fullName.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim(),
      propertyType: formData.propertyType,
      consultationType: formData.consultationType,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      cityLocality: formData.cityLocality.trim(),
      message: formData.message.trim(),
      status: 'Pending'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('aurum_vastu_bookings') || '[]');
      const updated = [newBooking, ...existing];
      localStorage.setItem('aurum_vastu_bookings', JSON.stringify(updated));
      window.dispatchEvent(new Event('aurum_bookings_updated'));

      setSubmittedBooking(newBooking);
      if (onBookingSubmitted) {
        onBookingSubmitted(newBooking);
      }
    } catch (err) {
      console.error('Error saving booking:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    if (!validate()) return;
    const url = `https://wa.me/919540197666?text=${constructWhatsAppMessage(formData)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="book" className="py-20 lg:py-28 bg-[#081024] relative border-b border-[#c5a059]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#dfc48c]">
            Personalized Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Book a Consultation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fill in your property details below to request a consultation. Sahil Kapoor will review your requirements and coordinate confirmation.
          </p>
        </div>

        {/* Confirmation State if Form has been submitted */}
        {submittedBooking ? (
          <div className="bg-[#0F1C3D] rounded-2xl p-6 sm:p-10 border border-[#c5a059]/50 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Consultation Request Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Thank you, <strong className="text-white">{submittedBooking.fullName}</strong>. Your consultation inquiry has been recorded under reference ID <strong className="font-mono text-[#dfc48c]">#{submittedBooking.id}</strong>.
              </p>
            </div>

            {/* Note on Confirmation Protocol */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs sm:text-sm text-amber-200 space-y-1">
              <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Appointment Confirmation Policy</span>
              </div>
              <p className="text-amber-100 leading-relaxed">
                As per our professional consultation standard, appointment slots are finalized after Sahil Kapoor verifies schedule availability and your property layout requirements. We will contact you via phone or WhatsApp shortly.
              </p>
            </div>

            {/* Summary Grid */}
            <div className="bg-[#0B132B] rounded-xl p-5 border border-[#c5a059]/30 text-xs sm:text-sm grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-200">
              <div>
                <span className="text-slate-400 block text-xs">Service:</span>
                <span className="font-medium text-white">{submittedBooking.consultationType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Property Type:</span>
                <span className="font-medium text-white">{submittedBooking.propertyType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Preferred Date & Window:</span>
                <span className="font-medium text-white">{submittedBooking.preferredDate} ({submittedBooking.preferredTime})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Location:</span>
                <span className="font-medium text-white">{submittedBooking.cityLocality}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-xs">Contact Details:</span>
                <span className="font-medium text-white">{submittedBooking.mobile} · {submittedBooking.email}</span>
              </div>
            </div>

            {/* Integration Action Buttons */}
            <div className="space-y-4 pt-2">
              <p className="text-xs uppercase tracking-wider text-[#dfc48c] font-semibold text-center">
                Instant Communication & Calendar Tools
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Add to Google Calendar */}
                <a
                  href={constructGoogleCalendarUrl(submittedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-xs font-semibold text-white bg-[#142247] hover:bg-[#1a2c5c] border border-[#c5a059]/40 rounded-lg shadow-sm flex items-center justify-center gap-2 text-center transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#dfc48c]" />
                  <span>Add to Google Calendar</span>
                </a>

                {/* 2. Direct WhatsApp Ping */}
                <a
                  href={`https://wa.me/919540197666?text=${constructWhatsAppMessage(formData)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg shadow-sm flex items-center justify-center gap-2 text-center transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ping on WhatsApp</span>
                </a>

                {/* 3. Send Email to Sahil */}
                <a
                  href={constructEmailUrl(formData)}
                  className="p-3 text-xs font-semibold text-[#0B132B] bg-gradient-to-r from-[#DFB76C] to-[#C5A059] hover:brightness-105 rounded-lg shadow-sm flex items-center justify-center gap-2 text-center transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#0B132B]" />
                  <span>Send via Email</span>
                </a>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setSubmittedBooking(null)}
                className="text-xs text-[#dfc48c] hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Submit another consultation enquiry
              </button>
            </div>
          </div>
        ) : (
          /* Main Functional Booking Form in Luxury Navy */
          <div className="bg-[#0F1C3D] rounded-2xl border border-[#c5a059]/40 shadow-2xl p-6 sm:p-10 text-white">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Sharma"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-colors placeholder:text-slate-500 ${
                      errors.fullName ? 'border-rose-400 bg-rose-950/20' : 'border-[#c5a059]/30'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-rose-400">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label htmlFor="mobile" className="block text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                    Mobile Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-[#dfc48c] font-mono">+91</span>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="9540197666"
                      className={`w-full pl-12 pr-4 py-2.5 rounded-lg border text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-colors placeholder:text-slate-500 ${
                        errors.mobile ? 'border-rose-400 bg-rose-950/20' : 'border-[#c5a059]/30'
                      }`}
                    />
                  </div>
                  {errors.mobile && <p className="text-xs text-rose-400">{errors.mobile}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yourname@gmail.com"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-colors placeholder:text-slate-500 ${
                      errors.email ? 'border-rose-400 bg-rose-950/20' : 'border-[#c5a059]/30'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
                </div>

                {/* Property Type */}
                <div className="space-y-1.5">
                  <label htmlFor="propertyType" className="block text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                    Property Type <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        propertyType: e.target.value as BookingSubmission['propertyType']
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#c5a059]/30 text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-colors"
                  >
                    <option value="Home" className="bg-[#0B132B]">Home / Independent Villa</option>
                    <option value="Flat" className="bg-[#0B132B]">Flat / Apartment</option>
                    <option value="Office" className="bg-[#0B132B]">Office / Workplace</option>
                    <option value="Shop" className="bg-[#0B132B]">Shop / Retail Showroom</option>
                    <option value="Commercial Property" className="bg-[#0B132B]">Commercial Property</option>
                    <option value="Other" className="bg-[#0B132B]">Other / Plot / Warehouse</option>
                  </select>
                </div>

                {/* Consultation Type */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="consultationType" className="block text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                    Consultation Type <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="consultationType"
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#c5a059]/30 text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-colors"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title} className="bg-[#0B132B]">
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Consultation Date */}
                <div className="space-y-1.5">
                  <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                    Preferred Date <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    min={todayString}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-colors ${
                      errors.preferredDate ? 'border-rose-400 bg-rose-950/20' : 'border-[#c5a059]/30'
                    }`}
                  />
                  {errors.preferredDate && <p className="text-xs text-rose-400">{errors.preferredDate}</p>}
                </div>

                {/* Preferred Time Window */}
                <div className="space-y-1.5">
                  <label htmlFor="preferredTime" className="block text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                    Preferred Time Window <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#c5a059]/30 text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-colors"
                  >
                    <option value="Morning (10:00 AM - 01:00 PM)" className="bg-[#0B132B]">Morning (10:00 AM - 01:00 PM)</option>
                    <option value="Afternoon (02:00 PM - 05:00 PM)" className="bg-[#0B132B]">Afternoon (02:00 PM - 05:00 PM)</option>
                    <option value="Evening (05:00 PM - 08:00 PM)" className="bg-[#0B132B]">Evening (05:00 PM - 08:00 PM)</option>
                  </select>
                </div>

                {/* Property City & Locality */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="cityLocality" className="block text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                    Property City and Locality <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="cityLocality"
                    name="cityLocality"
                    value={formData.cityLocality}
                    onChange={(e) => setFormData({ ...formData, cityLocality: e.target.value })}
                    placeholder="e.g. Faridabad (Sector 49 / Sainik Colony), Delhi, Gurugram, or Online"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-colors placeholder:text-slate-500 ${
                      errors.cityLocality ? 'border-rose-400 bg-rose-950/20' : 'border-[#c5a059]/30'
                    }`}
                  />
                  {errors.cityLocality && <p className="text-xs text-rose-400">{errors.cityLocality}</p>}
                </div>

                {/* Optional Message or Requirements */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#dfc48c]">
                    Specific Vastu Requirements or Layout Notes <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your property stage (existing, new construction, renovation) and any specific areas of focus (main door, kitchen, health, finance, office cabin)..."
                    className="w-full px-4 py-2.5 rounded-lg border border-[#c5a059]/30 text-sm text-white bg-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-colors placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="p-4 rounded-xl bg-[#0B132B]/80 border border-[#c5a059]/25 text-xs text-slate-300 leading-relaxed">
                <strong className="text-[#dfc48c] font-medium">Privacy Commitment:</strong> All floor plans, property coordinates, and personal contact details submitted are strictly confidential and reviewed directly by Sahil Kapoor. No pricing is charged upfront; all consultations are finalized transparently.
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0B132B] bg-gradient-to-r from-[#DFB76C] via-[#E5C378] to-[#C5A059] hover:brightness-105 rounded-lg shadow-lg hover:shadow-gold-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#0B132B]" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
