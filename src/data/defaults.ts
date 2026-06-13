import type { BudgetConfig, Hotel, Restaurant, Transport, CityNotes } from '../types';

export const defaultBudget: BudgetConfig = {
  travelers: 7,
  tripDays: 15,
  categories: [
    { id: 'flights', name: 'Vuelos', icon: 'Plane', amount: 600, color: '#38bdf8' },
    { id: 'trains', name: 'Trenes', icon: 'Train', amount: 340, color: '#8b5cf6' },
    { id: 'hotels', name: 'Hoteles', icon: 'Hotel', amount: 520, color: '#f43f5e' },
    { id: 'food', name: 'Comida', icon: 'UtensilsCrossed', amount: 300, color: '#22c55e' },
    { id: 'entries', name: 'Entradas', icon: 'Ticket', amount: 150, color: '#f59e0b' },
    { id: 'transport', name: 'Transporte local', icon: 'Car', amount: 80, color: '#06b6d4' },
    { id: 'extras', name: 'Extras', icon: 'ShoppingBag', amount: 200, color: '#ec4899' },
  ],
};

export const defaultHotels: Hotel[] = [
  {
    id: 'h-1', cityId: 'shanghai', name: 'Campanile Shanghai Bund',
    zone: "People's Square", pricePerNight: 52, currency: '€',
    notes: 'Muy cerca de People\'s Square y del metro. Buena relación calidad/precio.',
    isFavorite: true, status: 'pending',
    advantages: ['Ubicación céntrica', 'Metro cercano', 'Desayuno incluido'],
  },
  {
    id: 'h-2', cityId: 'zhangjiajie', name: 'Zhangjiajie Pipaxi Hotel',
    zone: 'Wulingyuan', pricePerNight: 35, currency: '€',
    notes: 'Cerca de la entrada al parque nacional. Habitaciones limpias.',
    isFavorite: false, status: 'pending',
    advantages: ['Cerca del parque', 'Económico', 'WiFi gratis'],
  },
  {
    id: 'h-3', cityId: 'chongqing', name: 'Chongqing Guotai Hotel',
    zone: 'Jiefangbei', pricePerNight: 45, currency: '€',
    notes: 'En pleno centro, cerca de Hongya Cave y la estación de metro.',
    isFavorite: false, status: 'pending',
    advantages: ['Centro ciudad', 'Vistas al río', 'Moderno'],
  },
  {
    id: 'h-4', cityId: 'beijing', name: 'Beijing Penta Hotel',
    zone: 'Chongwenmen', pricePerNight: 55, currency: '€',
    notes: 'A 15 min andando de Tiananmén. Zona con muchos restaurantes.',
    isFavorite: true, status: 'pending',
    advantages: ['Cerca de Tiananmén', 'Barrio tranquilo', 'Buen desayuno'],
  },
];

export const defaultRestaurants: Restaurant[] = [
  // Shanghai
  {
    id: 'r-sh-1', cityId: 'shanghai', name: 'Din Tai Fung',
    cuisine: 'Xiaolongbao / Dim Sum', priceRange: '€€', estimatedPrice: 20,
    rating: 5, notes: 'Los xiaolongbao más famosos (Estrella Michelin). Imprescindible.',
    isFavorite: true, imageUrl: '/images/shanghai.png',
  },
  {
    id: 'r-sh-2', cityId: 'shanghai', name: "Yang's Dumplings",
    cuisine: 'Shengjianbao (Dumplings fritos)', priceRange: '€', estimatedPrice: 5,
    rating: 4, notes: 'Comida rápida local, dumplings fritos en sartén. Muy barato y delicioso.',
    isFavorite: true, imageUrl: '/images/shanghai.png',
  },
  {
    id: 'r-sh-3', cityId: 'shanghai', name: 'Lost Heaven',
    cuisine: 'Cocina Yunnan', priceRange: '€€€', estimatedPrice: 35,
    rating: 5, notes: 'Ambiente exótico oscuro, excelente para cenas elegantes. (French Concession o Bund).',
    isFavorite: true, imageUrl: '/images/shanghai.png',
  },

  // Chongqing
  {
    id: 'r-cq-1', cityId: 'chongqing', name: 'Hot Pot auténtico de Chongqing',
    cuisine: 'Hot Pot Sichuan', priceRange: '€€', estimatedPrice: 15,
    rating: 5, notes: 'Hay mil en cada esquina. Sentarse en la calle en mesas bajitas. ¡Pedir mitad no picante!',
    isFavorite: true, imageUrl: '/images/chongqing.png',
  },
  {
    id: 'r-cq-2', cityId: 'chongqing', name: 'Qiu Er Hotpot',
    cuisine: 'Hot Pot', priceRange: '€€', estimatedPrice: 15,
    rating: 4, notes: 'Lugar famoso y auténtico, muy concurrido por locales.',
    isFavorite: true, imageUrl: '/images/chongqing.png',
  },

  // Beijing
  {
    id: 'r-bj-1', cityId: 'beijing', name: 'Siji Minfu',
    cuisine: 'Pato Pekín', priceRange: '€€€', estimatedPrice: 30,
    rating: 5, notes: 'Considerado por muchos locales mejor que Da Dong. Vistas a la Ciudad Prohibida si vas al local correcto.',
    isFavorite: true, imageUrl: '/images/beijing.png',
  },
  {
    id: 'r-bj-2', cityId: 'beijing', name: 'Da Dong Roast Duck',
    cuisine: 'Pato Pekín', priceRange: '€€€', estimatedPrice: 40,
    rating: 5, notes: 'Pato súper crujiente y menos graso. Presentación moderna y elegante.',
    isFavorite: true, imageUrl: '/images/beijing.png',
  },
];

export const defaultTransport: Transport[] = [
  {
    id: 't-1', fromCity: 'shanghai', toCity: 'zhangjiajie',
    fromCityName: 'Shanghái', toCityName: 'Zhangjiajie',
    type: 'flight', departureTime: '09:15', arrivalTime: '11:30',
    price: 95, currency: '€', status: 'pending', day: 4,
    notes: 'Vuelo directo recomendado para ahorrar tiempo.',
  },
  {
    id: 't-2', fromCity: 'zhangjiajie', toCity: 'chongqing',
    fromCityName: 'Zhangjiajie', toCityName: 'Chongqing',
    type: 'train', departureTime: '18:00', arrivalTime: '23:00',
    price: 40, currency: '€', status: 'pending', day: 6,
    notes: 'Tren bala o bus.',
  },
  {
    id: 't-3', fromCity: 'chongqing', toCity: 'beijing',
    fromCityName: 'Chongqing', toCityName: 'Pekín',
    type: 'train', departureTime: '09:30', arrivalTime: '17:30',
    price: 120, currency: '€', status: 'pending', day: 10,
    notes: 'Tren bala ~8 horas.',
  },
  {
    id: 't-4', fromCity: 'beijing', toCity: 'shanghai',
    fromCityName: 'Pekín', toCityName: 'Shanghái',
    type: 'train', departureTime: '14:30', arrivalTime: '19:00',
    price: 85, currency: '€', status: 'pending', day: 14,
    notes: 'VUELTA: Tren bala ~4.5 horas. Último tren del viaje.',
  },
];

export const defaultNotes: CityNotes = {
  shanghai: '',
  zhangjiajie: '',
  chongqing: '',
  beijing: '',
};
