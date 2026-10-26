export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  category: 'Residential' | 'Commercial' | 'Analysis' | 'Remedies';
  highlights: string[];
}

export interface BookingSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  mobile: string;
  email: string;
  propertyType: 'Home' | 'Flat' | 'Office' | 'Shop' | 'Commercial Property' | 'Other';
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  cityLocality: string;
  message?: string;
  status: 'Pending' | 'Contacted' | 'Confirmed' | 'Completed';
}

export interface DirectionZone {
  direction: string;
  hindiName: string;
  element: string;
  rulingDeity: string;
  keySignificance: string;
  idealFor: string;
  toAvoid: string;
  remedyTip: string;
  colorCode: string;
}
