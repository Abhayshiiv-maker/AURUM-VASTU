import React, { useState, useEffect } from 'react';
import { X, Calendar, Download, RefreshCw, CheckCircle, Clock, Search, Filter, Phone, Mail, ExternalLink, HelpCircle } from 'lucide-react';
import { BookingSubmission } from '../types.ts';

interface OwnerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerDashboardModal: React.FC<OwnerDashboardModalProps> = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showIntegrationsGuide, setShowIntegrationsGuide] = useState(false);

  const loadBookings = () => {
    try {
      const data = JSON.parse(localStorage.getItem('aurum_vastu_bookings') || '[]');
      setBookings(data);
    } catch (e) {
      console.error(e);
      setBookings([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
    const listener = () => loadBookings();
    window.addEventListener('aurum_bookings_updated', listener);
    return () => window.removeEventListener('aurum_bookings_updated', listener);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, newStatus: BookingSubmission['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    setBookings(updated);
    localStorage.setItem('aurum_vastu_bookings', JSON.stringify(updated));
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return;
    const headers = ['ID', 'Date Submitted', 'Full Name', 'Mobile', 'Email', 'Property Type', 'Service', 'Preferred Date', 'Preferred Time', 'Location', 'Status', 'Message'];
    const rows = bookings.map((b) => [
      b.id,
      b.createdAt,
      `"${b.fullName.replace(/"/g, '""')}"`,
      `"${b.mobile}"`,
      `"${b.email}"`,
      `"${b.propertyType}"`,
      `"${b.consultationType}"`,
      b.preferredDate,
      `"${b.preferredTime}"`,
      `"${b.cityLocality.replace(/"/g, '""')}"`,
      b.status,
      `"${(b.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aurum_vastu_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = bookings.filter((b) => {
    const matchesFilter = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.mobile.includes(searchTerm) ||
      b.cityLocality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.consultationType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0B132B] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c5a059] flex items-center justify-center text-[#0B132B] font-bold text-xs">
              AV
            </div>
            <div>
              <h3 className="text-base font-display font-semibold text-white">
                Sahil Kapoor · Consultation Management Portal
              </h3>
              <p className="text-2xs text-[#dfc48c]">
                Aurum Vastu · Faridabad Business Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIntegrationsGuide(!showIntegrationsGuide)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#dfc48c] border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Google Calendar / Sheets Setup</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Integration Instructions Drawer */}
        {showIntegrationsGuide && (
          <div className="bg-slate-50 border-b border-slate-200 p-5 text-xs text-slate-700 space-y-3 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between font-semibold text-[#0B132B] text-sm">
              <span>Google Calendar & Google Sheets Sync Architecture</span>
              <button
                onClick={() => setShowIntegrationsGuide(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                Close Guide
              </button>
            </div>
            <p className="leading-relaxed">
              In this live application, consultation bookings are stored in real time on this desk with 1-click Google Calendar generation and instant CSV export for Google Sheets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <p className="font-semibold text-slate-900">Google Calendar 1-Click Sync:</p>
                <p className="text-2xs text-slate-600">
                  Every submitted request generates a direct Google Calendar event creation URL pre-populated with client name, service, location, and time. No server tokens required.
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <p className="font-semibold text-slate-900">Google Sheets Direct Import:</p>
                <p className="text-2xs text-slate-600">
                  Click the "Export to CSV" button below, then in Google Sheets select File → Import → Upload to manage all past inquiries in your personal Google Drive spreadsheet.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar & Filters */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, phone, city..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none"
            >
              <option value="All">All Statuses ({bookings.length})</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={loadBookings}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-200 transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportCSV}
              disabled={bookings.length === 0}
              className="px-3 py-1.5 text-xs font-medium text-slate-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Bookings Table / List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-medium text-slate-600">No consultation bookings found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {searchTerm || filterStatus !== 'All'
                  ? 'No records match your search criteria.'
                  : 'When visitors submit the consultation booking form, their records will appear here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-colors space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                        #{item.id}
                      </span>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                        {item.fullName}
                      </h4>
                      <span className="text-xs text-slate-500">· {item.propertyType}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value as BookingSubmission['status'])
                        }
                        className={`text-2xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer ${
                          item.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : item.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : item.status === 'Completed'
                            ? 'bg-slate-100 text-slate-700 border-slate-300'
                            : 'bg-amber-50 text-amber-700 border-amber-300'
                        }`}
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-2xs uppercase">Requested Service</span>
                      <span className="font-medium text-slate-800">{item.consultationType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-2xs uppercase">Target Date & Window</span>
                      <span className="font-medium text-slate-800">{item.preferredDate} ({item.preferredTime})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-2xs uppercase">Location</span>
                      <span className="font-medium text-slate-800">{item.cityLocality}</span>
                    </div>
                  </div>

                  {item.message && (
                    <div className="p-2.5 rounded-lg bg-slate-50 text-xs text-slate-700 border border-slate-100">
                      <span className="font-semibold text-slate-800">Client Note: </span>
                      {item.message}
                    </div>
                  )}

                  {/* Quick Contact & Communication Bar */}
                  <div className="flex items-center justify-between pt-2 text-xs">
                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${item.mobile}`}
                        className="flex items-center gap-1 text-slate-700 hover:text-[#0B132B] font-medium"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>{item.mobile}</span>
                      </a>
                      <a
                        href={`https://wa.me/${item.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${item.fullName}, this is Sahil Kapoor from Aurum Vastu regarding your consultation inquiry #${item.id}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-emerald-600 hover:underline"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`mailto:${item.email}?subject=${encodeURIComponent(
                          `Aurum Vastu Consultation: ${item.fullName} (#${item.id})`
                        )}`}
                        className="flex items-center gap-1 text-slate-500 hover:underline"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{item.email}</span>
                      </a>
                    </div>

                    <span className="text-2xs text-slate-400">
                      Submitted {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 text-2xs text-slate-500 flex items-center justify-between">
          <span>Client data is stored securely in your browser cache.</span>
          <span className="font-medium text-slate-700">Aurum Vastu Business Engine</span>
        </div>
      </div>
    </div>
  );
};
