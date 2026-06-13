import type { Place } from '../types';

export const defaultPlaces: Place[] = [
  // ===================== SHANGHAI =====================
  // ⭐ Imprescindibles
  {
    id: 'p-sh-1', cityId: 'shanghai', name: 'The Bund', 
    description: 'El icónico paseo marítimo con vistas al skyline de Pudong y arquitectura europea.',
    duration: '2-3 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    openingHours: '24h', imageUrl: '/images/shanghai.png', googleMapsUrl: 'https://maps.google.com/?q=The+Bund+Shanghai',
  },
  {
    id: 'p-sh-2', cityId: 'shanghai', name: 'Shanghai Tower',
    description: 'El segundo edificio más alto del mundo. Vistas impresionantes desde la planta 118.',
    duration: '1-2 horas', interestLevel: 5, entryPrice: 25, isFavorite: true,
    openingHours: '08:30 - 21:30', imageUrl: '/images/shanghai.png',
  },
  {
    id: 'p-sh-3', cityId: 'shanghai', name: 'Yu Garden',
    description: 'Jardín tradicional chino del siglo XVI, rodeado de bazares tradicionales.',
    duration: '1-2 horas', interestLevel: 5, entryPrice: 5, isFavorite: true,
    openingHours: '08:30 - 17:00', imageUrl: '/images/shanghai.png',
  },
  {
    id: 'p-sh-4', cityId: 'shanghai', name: 'Nanjing Road',
    description: 'La calle comercial más transitada del mundo, repleta de luces de neón.',
    duration: '2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    openingHours: '24h', imageUrl: '/images/shanghai.png',
  },
  {
    id: 'p-sh-5', cityId: 'shanghai', name: 'French Concession',
    description: 'Barrio histórico con avenidas arboladas, cafeterías y boutiques.',
    duration: '3 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/shanghai.png',
  },
  {
    id: 'p-sh-6', cityId: 'shanghai', name: 'Tianzifang',
    description: 'Laberinto de callejuelas (shikumen) lleno de arte, tiendas de artesanía y bares.',
    duration: '2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/shanghai.png',
  },
  {
    id: 'p-sh-7', cityId: 'shanghai', name: 'Xintiandi',
    description: 'Zona de ocio y restauración de lujo en casas tradicionales restauradas.',
    duration: '2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/shanghai.png',
  },
  // 🟢 Opcionales
  {
    id: 'p-sh-8', cityId: 'shanghai', name: 'Jade Buddha Temple',
    description: 'Templo budista activo famoso por sus dos estatuas de Buda de jade importadas de Birmania.',
    duration: '1 hora', interestLevel: 4, entryPrice: 3, isFavorite: false,
    imageUrl: '/images/shanghai.png',
  },
  {
    id: 'p-sh-9', cityId: 'shanghai', name: 'Crucero río Huangpu',
    description: 'Paseo en barco nocturno para ver iluminado tanto The Bund como Pudong.',
    duration: '1 hora', interestLevel: 4, entryPrice: 15, isFavorite: false,
    imageUrl: '/images/shanghai.png',
  },
  {
    id: 'p-sh-10', cityId: 'shanghai', name: 'Rooftop vistas al Bund',
    description: 'Tomar algo en una de las famosas terrazas (ej. Bar Rouge o Vue Bar) con vistas directas.',
    duration: '2 horas', interestLevel: 4, entryPrice: 20, isFavorite: false,
    imageUrl: '/images/shanghai.png',
  },

  // ===================== ZHANGJIAJIE =====================
  // ⭐ Imprescindibles
  {
    id: 'p-zj-1', cityId: 'zhangjiajie', name: 'Zhangjiajie National Forest Park',
    description: 'El parque nacional principal, famoso por sus pilares de cuarcita y densa niebla.',
    duration: '1-2 días', interestLevel: 5, entryPrice: 30, isFavorite: true,
    imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'p-zj-2', cityId: 'zhangjiajie', name: 'Yuanjiajie Scenic Area',
    description: 'La zona central del parque, donde se encuentran las vistas más icónicas.',
    duration: '3-4 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'p-zj-3', cityId: 'zhangjiajie', name: 'Avatar Hallelujah Mountain',
    description: 'El pilar gigante (antes Columna del Universo Sur) que inspiró la película Avatar.',
    duration: '1 hora', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'p-zj-4', cityId: 'zhangjiajie', name: 'Tianzi Mountain',
    description: 'Vistas panorámicas espectaculares desde lo alto ("El hijo del cielo").',
    duration: '2-3 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'p-zj-5', cityId: 'zhangjiajie', name: 'Bailong Elevator',
    description: 'El ascensor exterior más alto del mundo, sube 326 metros por un acantilado.',
    duration: '30 min', interestLevel: 5, entryPrice: 10, isFavorite: true,
    imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'p-zj-6', cityId: 'zhangjiajie', name: 'Tianmen Mountain',
    description: 'Montaña icónica a la que se accede mediante el teleférico más largo del mundo.',
    duration: 'Medio día', interestLevel: 5, entryPrice: 35, isFavorite: true,
    imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'p-zj-7', cityId: 'zhangjiajie', name: "Heaven's Gate",
    description: 'El impresionante arco natural en Tianmen Mountain con 999 escalones.',
    duration: '1-2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'p-zj-8', cityId: 'zhangjiajie', name: 'Glass Skywalk',
    description: 'Pasarela de cristal pegada al acantilado en Tianmen Mountain.',
    duration: '1 hora', interestLevel: 5, entryPrice: 1, isFavorite: true,
    imageUrl: '/images/zhangjiajie.png',
  },
  // 🟢 Opcional
  {
    id: 'p-zj-9', cityId: 'zhangjiajie', name: 'Zhangjiajie Glass Bridge',
    description: 'Puente de cristal de 430m suspendido sobre el Gran Cañón. (Lejos del parque principal).',
    duration: '2-3 horas', interestLevel: 3, entryPrice: 20, isFavorite: false,
    imageUrl: '/images/zhangjiajie.png',
  },

  // ===================== CHONGQING =====================
  // ⭐ Imprescindibles
  {
    id: 'p-cq-1', cityId: 'chongqing', name: 'Hongya Cave',
    description: 'Complejo iluminado incrustado en el acantilado. Vibras increíbles estilo "El viaje de Chihiro".',
    duration: '2-3 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/chongqing.png',
  },
  {
    id: 'p-cq-2', cityId: 'chongqing', name: 'Jiefangbei CBD',
    description: 'El corazón comercial y financiero. Rodeado de rascacielos gigantescos.',
    duration: '2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/chongqing.png',
  },
  {
    id: 'p-cq-3', cityId: 'chongqing', name: 'Chaotianmen',
    description: 'Donde confluyen los ríos Yangtze y Jialing, formando dos colores de agua distintos.',
    duration: '1-2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/chongqing.png',
  },
  {
    id: 'p-cq-4', cityId: 'chongqing', name: 'Liziba Station',
    description: 'La famosa estación donde el tren atraviesa literalmente un edificio residencial.',
    duration: '1 hora', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/chongqing.png',
  },
  {
    id: 'p-cq-5', cityId: 'chongqing', name: 'Eling Park',
    description: 'El punto más alto de la península de Yuzhong. Ofrece excelentes vistas 360 de Chongqing.',
    duration: '2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/chongqing.png',
  },
  {
    id: 'p-cq-6', cityId: 'chongqing', name: 'Ciqikou Ancient Town',
    description: 'Calles históricas llenas de comida callejera local, especias y arquitectura Ming/Qing.',
    duration: '3 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/chongqing.png',
  },
  {
    id: 'p-cq-7', cityId: 'chongqing', name: 'Shibati Traditional Area',
    description: 'Zona de las "18 escaleras" recientemente reformada. Contraste entre lo antiguo y lo cyberpunk.',
    duration: '2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/chongqing.png',
  },
  // 🟢 Opcionales
  {
    id: 'p-cq-8', cityId: 'chongqing', name: 'Raffles City Chongqing',
    description: 'Mega-complejo arquitectónico con un puente horizontal de cristal en la cima (Crystal).',
    duration: '2 horas', interestLevel: 4, entryPrice: 0, isFavorite: false,
    imageUrl: '/images/chongqing.png',
  },
  {
    id: 'p-cq-9', cityId: 'chongqing', name: 'Teleférico del Río Yangtsé',
    description: 'Teleférico antiguo que cruza el enorme río. Vistas industriales espectaculares.',
    duration: '1 hora', interestLevel: 4, entryPrice: 3, isFavorite: false,
    imageUrl: '/images/chongqing.png',
  },
  {
    id: 'p-cq-10', cityId: 'chongqing', name: 'Crucero Nocturno',
    description: 'Barco por el río para ver la ciudad de Chongqing iluminada de noche.',
    duration: '1.5 horas', interestLevel: 4, entryPrice: 20, isFavorite: false,
    imageUrl: '/images/chongqing.png',
  },

  // ===================== PEKÍN =====================
  // ⭐ Imprescindibles
  {
    id: 'p-bj-1', cityId: 'beijing', name: 'Tiananmen Square',
    description: 'La plaza pública más grande del mundo. Escenario de la historia moderna de China.',
    duration: '1-2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/beijing.png',
  },
  {
    id: 'p-bj-2', cityId: 'beijing', name: 'Forbidden City',
    description: 'El colosal palacio imperial de las dinastías Ming y Qing. 500 años de misterio.',
    duration: '4-5 horas', interestLevel: 5, entryPrice: 8, isFavorite: true,
    imageUrl: '/images/beijing.png',
  },
  {
    id: 'p-bj-3', cityId: 'beijing', name: 'Jingshan Park',
    description: 'Colina artificial justo detrás de la Ciudad Prohibida con la mejor vista panorámica.',
    duration: '1 hora', interestLevel: 5, entryPrice: 1, isFavorite: true,
    imageUrl: '/images/beijing.png',
  },
  {
    id: 'p-bj-4', cityId: 'beijing', name: 'Mutianyu Great Wall',
    description: 'Sección restaurada de la Gran Muralla con tobogán de bajada. Menos masificada.',
    duration: 'Medio día', interestLevel: 5, entryPrice: 10, isFavorite: true,
    imageUrl: '/images/beijing.png',
  },
  {
    id: 'p-bj-5', cityId: 'beijing', name: 'Temple of Heaven',
    description: 'Templo imperial perfectamente simétrico, rodeado de un inmenso parque donde locales hacen Tai Chi.',
    duration: '2-3 horas', interestLevel: 5, entryPrice: 5, isFavorite: true,
    imageUrl: '/images/beijing.png',
  },
  {
    id: 'p-bj-6', cityId: 'beijing', name: 'Hutongs tradicionales',
    description: 'Callejones históricos llenos de encanto, bicicletas, restaurantes locales y vida.',
    duration: '3 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/beijing.png',
  },
  {
    id: 'p-bj-7', cityId: 'beijing', name: 'Qianmen Street',
    description: 'Gran calle peatonal con arquitectura restaurada estilo Qing, tiendas y tranvía.',
    duration: '2 horas', interestLevel: 5, entryPrice: 0, isFavorite: true,
    imageUrl: '/images/beijing.png',
  },
  {
    id: 'p-bj-8', cityId: 'beijing', name: 'Drum Tower',
    description: 'Torre del Tambor, marcaba el tiempo en la ciudad antigua con tambores gigantes.',
    duration: '1 hora', interestLevel: 5, entryPrice: 3, isFavorite: true,
    imageUrl: '/images/beijing.png',
  },
  {
    id: 'p-bj-9', cityId: 'beijing', name: 'Bell Tower',
    description: 'Torre de la Campana, frente a la Drum Tower, hogar de la campana de bronce más grande.',
    duration: '1 hora', interestLevel: 5, entryPrice: 3, isFavorite: true,
    imageUrl: '/images/beijing.png',
  },
];
