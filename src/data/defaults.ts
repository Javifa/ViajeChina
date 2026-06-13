import type { BudgetConfig, Hotel, Restaurant, Transport, CityNotes } from '../types';

export const defaultBudget: BudgetConfig = {
  travelers: 7,
  tripDays: 15,
  categories: [
    { id: 'flights', name: 'Vuelos Int.', icon: 'Plane', amount: 700, color: '#38bdf8' },
    { id: 'hotels', name: 'Hoteles', icon: 'Hotel', amount: 250, color: '#f43f5e' },
    { id: 'trains', name: 'Trenes/Vuelos Int.', icon: 'Train', amount: 180, color: '#8b5cf6' },
    { id: 'food', name: 'Comida', icon: 'UtensilsCrossed', amount: 220, color: '#22c55e' },
    { id: 'entries', name: 'Entradas', icon: 'Ticket', amount: 150, color: '#f59e0b' },
    { id: 'extras', name: 'Compras Varias', icon: 'ShoppingBag', amount: 250, color: '#ec4899' },
    { id: 'transport', name: 'Transporte Local', icon: 'Car', amount: 50, color: '#06b6d4' },
  ],
};

export const defaultHotels: Hotel[] = [
  {
    id: 'h-1', cityId: 'shanghai', name: 'Campanile Shanghai Bund',
    zone: "People's Square", pricePerNight: 18, currency: '€',
    notes: 'Muy cerca de People\'s Square y del metro. Buena relación calidad/precio.',
    isFavorite: true, status: 'pending',
    advantages: ['Ubicación céntrica', 'Metro cercano', 'Desayuno incluido'],
  },
  {
    id: 'h-2', cityId: 'zhangjiajie', name: 'Zhangjiajie Pipaxi Hotel',
    zone: 'Wulingyuan', pricePerNight: 15, currency: '€',
    notes: 'Cerca de la entrada al parque nacional. Habitaciones limpias.',
    isFavorite: false, status: 'pending',
    advantages: ['Cerca del parque', 'Económico', 'WiFi gratis'],
  },
  {
    id: 'h-3', cityId: 'chongqing', name: 'Chongqing Guotai Hotel',
    zone: 'Jiefangbei', pricePerNight: 17, currency: '€',
    notes: 'En pleno centro, cerca de Hongya Cave y la estación de metro.',
    isFavorite: false, status: 'pending',
    advantages: ['Centro ciudad', 'Vistas al río', 'Moderno'],
  },
  {
    id: 'h-cd', cityId: 'chengdu', name: 'Chengdu Flipflop Hostel / Hotel',
    zone: 'Chunxi Road', pricePerNight: 16, currency: '€',
    notes: 'Muy bien ubicado en el centro, cerca de zonas comerciales y pandas.',
    isFavorite: true, status: 'pending',
    advantages: ['Centro ciudad', 'Ambiente joven', 'Cerca de transporte'],
  },
  {
    id: 'h-4', cityId: 'beijing', name: 'Beijing Penta Hotel',
    zone: 'Chongwenmen', pricePerNight: 20, currency: '€',
    notes: 'A 15 min andando de Tiananmén. Zona con muchos restaurantes.',
    isFavorite: true, status: 'pending',
    advantages: ['Cerca de Tiananmén', 'Barrio tranquilo', 'Buen desayuno'],
  },
];

export const defaultRestaurants: Restaurant[] = [
  {
    id: 'r-sh-1', cityId: 'shanghai', name: 'Din Tai Fung',
    cuisine: 'Xiaolongbao / Dim Sum', priceRange: '€', estimatedPrice: 8,
    rating: 5, notes: 'Los xiaolongbao más famosos (Estrella Michelin). Imprescindible.',
    isFavorite: true, imageUrl: '/images/shanghai.png',
  },
  {
    id: 'r-sh-2', cityId: 'shanghai', name: "Yang's Dumplings",
    cuisine: 'Shengjianbao', priceRange: '€', estimatedPrice: 3,
    rating: 4, notes: 'Comida rápida local, dumplings fritos en sartén. Muy barato y delicioso.',
    isFavorite: true, imageUrl: '/images/shanghai.png',
  },
  {
    id: 'r-cq-1', cityId: 'chongqing', name: 'Hot Pot auténtico de Chongqing',
    cuisine: 'Hot Pot Sichuan', priceRange: '€', estimatedPrice: 7,
    rating: 5, notes: 'Hay mil en cada esquina. Sentarse en la calle en mesas bajitas. ¡Pedir mitad no picante!',
    isFavorite: true, imageUrl: '/images/chongqing.png',
  },
  {
    id: 'r-cd-1', cityId: 'chengdu', name: 'Chen Mapo Tofu',
    cuisine: 'Cocina Sichuan', priceRange: '€', estimatedPrice: 6,
    rating: 5, notes: 'El restaurante donde se inventó el Mapo Tofu. Plato icónico de Chengdu.',
    isFavorite: true, imageUrl: '/images/chengdu.png',
  },
  {
    id: 'r-bj-1', cityId: 'beijing', name: 'Siji Minfu',
    cuisine: 'Pato Pekín', priceRange: '€€', estimatedPrice: 12,
    rating: 5, notes: 'Considerado por muchos locales mejor que Da Dong. Vistas a la Ciudad Prohibida.',
    isFavorite: true, imageUrl: '/images/beijing.png',
  },
];

export const defaultTransport: Transport[] = [
  {
    id: 't-1', fromCity: 'shanghai', toCity: 'zhangjiajie',
    fromCityName: 'Shanghái', toCityName: 'Zhangjiajie',
    type: 'flight', departureTime: '09:15', arrivalTime: '11:30',
    price: 85, currency: '€', status: 'pending', day: 4,
    notes: 'Vuelo directo recomendado para ahorrar tiempo.',
  },
  {
    id: 't-2', fromCity: 'zhangjiajie', toCity: 'chongqing',
    fromCityName: 'Zhangjiajie', toCityName: 'Chongqing',
    type: 'train', departureTime: '10:00', arrivalTime: '15:00',
    price: 35, currency: '€', status: 'pending', day: 7,
    notes: 'Tren bala desde Zhangjiajie West.',
  },
  {
    id: 't-3', fromCity: 'chongqing', toCity: 'chengdu',
    fromCityName: 'Chongqing', toCityName: 'Chengdu',
    type: 'train', departureTime: '09:00', arrivalTime: '10:30',
    price: 20, currency: '€', status: 'pending', day: 9,
    notes: 'Tren bala muy rápido, poco más de una hora.',
  },
  {
    id: 't-4', fromCity: 'chengdu', toCity: 'beijing',
    fromCityName: 'Chengdu', toCityName: 'Pekín',
    type: 'flight', departureTime: '08:00', arrivalTime: '11:00',
    price: 110, currency: '€', status: 'pending', day: 10,
    notes: 'Vuelo interno (el tren tarda casi 10h).',
  },
  {
    id: 't-5', fromCity: 'beijing', toCity: 'shanghai',
    fromCityName: 'Pekín', toCityName: 'Shanghái',
    type: 'train', departureTime: '14:30', arrivalTime: '19:00',
    price: 75, currency: '€', status: 'pending', day: 12,
    notes: 'VUELTA: Tren bala ~4.5 horas.',
  },
];

export const defaultNotes: CityNotes = {
  shanghai: '',
  zhangjiajie: '',
  chongqing: '',
  chengdu: '',
  beijing: '',
};
