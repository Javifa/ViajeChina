import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { Hotel, Restaurant, Place, Transport, ChecklistItem, CityNotes, BudgetConfig, CityId } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultHotels, defaultRestaurants, defaultTransport, defaultNotes, defaultBudget } from '../data/defaults';
import { defaultPlaces } from '../data/places';
import { defaultChecklist } from '../data/checklist';

interface TripContextType {
  // Hotels
  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
  updateHotel: (id: string, updates: Partial<Hotel>) => void;
  deleteHotel: (id: string) => void;
  toggleHotelFavorite: (id: string) => void;

  // Restaurants
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
  updateRestaurant: (id: string, updates: Partial<Restaurant>) => void;
  deleteRestaurant: (id: string) => void;
  toggleRestaurantFavorite: (id: string) => void;
  toggleRestaurantVisited: (id: string) => void;

  // Places
  places: Place[];
  addPlace: (place: Place) => void;
  updatePlace: (id: string, updates: Partial<Place>) => void;
  deletePlace: (id: string) => void;
  togglePlaceFavorite: (id: string) => void;
  togglePlaceVisited: (id: string) => void;

  // Transport
  transport: Transport[];
  addTransport: (t: Transport) => void;
  updateTransport: (id: string, updates: Partial<Transport>) => void;
  deleteTransport: (id: string) => void;

  // Checklist
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  addChecklistItem: (item: ChecklistItem) => void;
  deleteChecklistItem: (id: string) => void;

  // Notes
  notes: CityNotes;
  updateNotes: (cityId: CityId, text: string) => void;

  // Budget
  budget: BudgetConfig;
  updateBudgetCategory: (id: string, amount: number) => void;
  updateTravelers: (count: number) => void;

  // Progress
  progress: {
    hotelsReserved: number;
    hotelsTotal: number;
    trainsReserved: number;
    trainsTotal: number;
    checklistDone: number;
    checklistTotal: number;
    overallPercent: number;
  };
}

const TripContext = createContext<TripContextType | null>(null);

export function useTripContext() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTripContext must be used within TripProvider');
  return ctx;
}

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [hotels, setHotels] = useLocalStorage<Hotel[]>('china2026-hotels-v3', defaultHotels);
  const [restaurants, setRestaurants] = useLocalStorage<Restaurant[]>('china2026-restaurants-v3', defaultRestaurants);
  const [places, setPlaces] = useLocalStorage<Place[]>('china2026-places-v3', defaultPlaces);
  const [transport, setTransport] = useLocalStorage<Transport[]>('china2026-transport-v3', defaultTransport);
  const [checklist, setChecklist] = useLocalStorage<ChecklistItem[]>('china2026-checklist-v3', defaultChecklist);
  const [notes, setNotes] = useLocalStorage<CityNotes>('china2026-notes-v3', defaultNotes);
  const [budget, setBudget] = useLocalStorage<BudgetConfig>('china2026-budget-v3', defaultBudget);

  // Hotels
  const addHotel = useCallback((hotel: Hotel) => setHotels(prev => [...prev, hotel]), [setHotels]);
  const updateHotel = useCallback((id: string, updates: Partial<Hotel>) =>
    setHotels(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h)), [setHotels]);
  const deleteHotel = useCallback((id: string) => setHotels(prev => prev.filter(h => h.id !== id)), [setHotels]);
  const toggleHotelFavorite = useCallback((id: string) =>
    setHotels(prev => prev.map(h => h.id === id ? { ...h, isFavorite: !h.isFavorite } : h)), [setHotels]);

  // Restaurants
  const addRestaurant = useCallback((r: Restaurant) => setRestaurants(prev => [...prev, r]), [setRestaurants]);
  const updateRestaurant = useCallback((id: string, updates: Partial<Restaurant>) =>
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r)), [setRestaurants]);
  const deleteRestaurant = useCallback((id: string) => setRestaurants(prev => prev.filter(r => r.id !== id)), [setRestaurants]);
  const toggleRestaurantFavorite = useCallback((id: string) =>
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)), [setRestaurants]);
  const toggleRestaurantVisited = useCallback((id: string) =>
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, isVisited: !r.isVisited } : r)), [setRestaurants]);

  // Places
  const addPlace = useCallback((p: Place) => setPlaces(prev => [...prev, p]), [setPlaces]);
  const updatePlace = useCallback((id: string, updates: Partial<Place>) =>
    setPlaces(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p)), [setPlaces]);
  const deletePlace = useCallback((id: string) => setPlaces(prev => prev.filter(p => p.id !== id)), [setPlaces]);
  const togglePlaceFavorite = useCallback((id: string) =>
    setPlaces(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)), [setPlaces]);
  const togglePlaceVisited = useCallback((id: string) =>
    setPlaces(prev => prev.map(p => p.id === id ? { ...p, isVisited: !p.isVisited } : p)), [setPlaces]);

  // Transport
  const addTransport = useCallback((t: Transport) => setTransport(prev => [...prev, t]), [setTransport]);
  const updateTransport = useCallback((id: string, updates: Partial<Transport>) =>
    setTransport(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t)), [setTransport]);
  const deleteTransport = useCallback((id: string) => setTransport(prev => prev.filter(t => t.id !== id)), [setTransport]);

  // Checklist
  const toggleChecklistItem = useCallback((id: string) =>
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, completed: !c.completed } : c)), [setChecklist]);
  const addChecklistItem = useCallback((item: ChecklistItem) => setChecklist(prev => [...prev, item]), [setChecklist]);
  const deleteChecklistItem = useCallback((id: string) => setChecklist(prev => prev.filter(c => c.id !== id)), [setChecklist]);

  // Notes
  const updateNotes = useCallback((cityId: CityId, text: string) =>
    setNotes(prev => ({ ...prev, [cityId]: text })), [setNotes]);

  // Budget
  const updateBudgetCategory = useCallback((id: string, amount: number) =>
    setBudget(prev => ({
      ...prev,
      categories: prev.categories.map(c => c.id === id ? { ...c, amount } : c),
    })), [setBudget]);
  const updateTravelers = useCallback((count: number) =>
    setBudget(prev => ({ ...prev, travelers: count })), [setBudget]);

  // Progress
  const progress = useMemo(() => {
    const hotelsReserved = hotels.filter(h => h.status === 'reserved' || h.status === 'paid').length;
    const hotelsTotal = hotels.length;
    const trainsReserved = transport.filter(t => t.status === 'reserved' || t.status === 'paid').length;
    const trainsTotal = transport.length;
    const checklistDone = checklist.filter(c => c.completed).length;
    const checklistTotal = checklist.length;

    const metrics = [
      hotelsTotal > 0 ? hotelsReserved / hotelsTotal : 0,
      trainsTotal > 0 ? trainsReserved / trainsTotal : 0,
      checklistTotal > 0 ? checklistDone / checklistTotal : 0,
    ];
    const overallPercent = Math.round((metrics.reduce((a, b) => a + b, 0) / metrics.length) * 100);

    return { hotelsReserved, hotelsTotal, trainsReserved, trainsTotal, checklistDone, checklistTotal, overallPercent };
  }, [hotels, transport, checklist]);

  const value: TripContextType = {
    hotels, addHotel, updateHotel, deleteHotel, toggleHotelFavorite,
    restaurants, addRestaurant, updateRestaurant, deleteRestaurant, toggleRestaurantFavorite, toggleRestaurantVisited,
    places, addPlace, updatePlace, deletePlace, togglePlaceFavorite, togglePlaceVisited,
    transport, addTransport, updateTransport, deleteTransport,
    checklist, toggleChecklistItem, addChecklistItem, deleteChecklistItem,
    notes, updateNotes,
    budget, updateBudgetCategory, updateTravelers,
    progress,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}
