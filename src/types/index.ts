// ==================== CITY ====================
export type CityId = 'shanghai' | 'zhangjiajie' | 'chongqing' | 'beijing';

export interface City {
  id: CityId;
  name: string;
  nameCn: string;
  color: string;
  coordinates: [number, number];
  days: number[];
  description: string;
  highlights: string[];
}

// ==================== ITINERARY ====================
export interface Activity {
  time: string;
  title: string;
  description?: string;
  icon: string; // lucide icon name
  type: 'food' | 'sightseeing' | 'transport' | 'hotel' | 'shopping' | 'entertainment' | 'free';
  cost?: number;
}

export interface DayPlan {
  day: number;
  date: string;
  city: CityId;
  title: string;
  subtitle?: string;
  isTransitDay?: boolean;
  transitFrom?: CityId;
  transitTo?: CityId;
  activities: Activity[];
}

// ==================== HOTEL ====================
export interface Hotel {
  id: string;
  cityId: CityId;
  name: string;
  zone: string;
  pricePerNight: number;
  currency: string;
  bookingUrl?: string;
  tripUrl?: string;
  agodaUrl?: string;
  notes: string;
  isFavorite: boolean;
  status: ReservationStatus;
  checkIn?: string;
  checkOut?: string;
  advantages?: string[];
}

// ==================== RESTAURANT ====================
export interface Restaurant {
  id: string;
  cityId: CityId;
  name: string;
  cuisine: string;
  priceRange: string;
  estimatedPrice: number;
  rating: number; // 1-5
  googleMapsUrl?: string;
  tripAdvisorUrl?: string;
  dianpingUrl?: string;
  notes: string;
  isFavorite: boolean;
  isVisited?: boolean;
  imageUrl?: string;
}

// ==================== PLACE ====================
export interface Place {
  id: string;
  cityId: CityId;
  name: string;
  description: string;
  duration: string;
  interestLevel: number; // 1-5
  imageUrl?: string;
  entryPrice?: number;
  openingHours?: string;
  googleMapsUrl?: string;
  notes?: string;
  isFavorite: boolean;
  isVisited?: boolean;
  isCustom?: boolean;
}

// ==================== TRANSPORT ====================
export interface Transport {
  id: string;
  fromCity: CityId;
  toCity: CityId;
  fromCityName: string;
  toCityName: string;
  type: 'train' | 'flight' | 'bus' | 'metro' | 'taxi';
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency: string;
  bookingUrl?: string;
  notes?: string;
  status: ReservationStatus;
  day: number;
}

// ==================== RESERVATION ====================
export type ReservationStatus = 'pending' | 'reserved' | 'paid';
export type EntryStatus = 'pending' | 'purchased';

export interface Reservation {
  id: string;
  type: 'hotel' | 'transport' | 'entry';
  name: string;
  cityId: CityId;
  status: ReservationStatus | EntryStatus;
  price: number;
  currency: string;
  url?: string;
  notes?: string;
  date?: string;
}

// ==================== BUDGET ====================
export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  amount: number;
  color: string;
}

export interface BudgetConfig {
  travelers: number;
  tripDays: number;
  categories: BudgetCategory[];
}

// ==================== CHECKLIST ====================
export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'documents' | 'tech' | 'apps' | 'health' | 'packing' | 'custom';
  icon?: string;
}

// ==================== APP ====================
export interface TravelApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  downloadUrl?: string;
  color: string;
}

// ==================== NOTES ====================
export type CityNotes = Record<CityId, string>;

// ==================== TRIP DATA (PERSISTENT) ====================
export interface TripData {
  hotels: Hotel[];
  restaurants: Restaurant[];
  places: Place[];
  transport: Transport[];
  reservations: Reservation[];
  checklist: ChecklistItem[];
  notes: CityNotes;
  budget: BudgetConfig;
}

// ==================== GALLERY ====================
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  city: CityId;
  category: 'cityscape' | 'nature' | 'culture' | 'food' | 'architecture';
  width: number;
  height: number;
}
