import type { City, CityId } from '../types';

export const cities: Record<CityId, City> = {
  shanghai: {
    id: 'shanghai',
    name: 'Shanghái',
    nameCn: '上海',
    color: '#38bdf8',
    coordinates: [31.2304, 121.4737],
    days: [1, 2, 3, 14, 15],
    description: 'La metrópolis futurista de China. Rascacielos deslumbrantes, la histórica concesión francesa y una gastronomía increíble. El Bund de noche es un espectáculo que no olvidaréis.',
    highlights: ['The Bund', 'Shanghai Tower', 'Yuyuan Garden', 'French Concession', 'Nanjing Road', "People's Square"],
  },
  zhangjiajie: {
    id: 'zhangjiajie',
    name: 'Zhangjiajie',
    nameCn: '张家界',
    color: '#22c55e',
    coordinates: [29.1170, 110.4793],
    days: [4, 5, 6],
    description: 'Las montañas que inspiraron Avatar. Pilares de piedra que se elevan entre la niebla, puentes de cristal sobre el vacío y el Tianmen Mountain con su famosa puerta al cielo.',
    highlights: ['Avatar Mountains', 'Tianzi Mountain', 'Glass Bridge', 'Tianmen Mountain', 'Bailong Elevator'],
  },
  chongqing: {
    id: 'chongqing',
    name: 'Chongqing',
    nameCn: '重庆',
    color: '#f97316',
    coordinates: [29.4316, 106.9123],
    days: [7, 8, 9],
    description: 'La ciudad cyberpunk sobre montañas. Monorraíles que atraviesan edificios, cuevas iluminadas de noche, la mejor comida picante de China y vistas que parecen de película.',
    highlights: ['Hongya Cave', 'Liziba Station', 'Ciqikou Ancient Town', 'Shibati', 'Jiefangbei'],
  },
  chengdu: {
    id: 'chengdu',
    name: 'Chengdu',
    nameCn: '成都',
    color: '#d946ef',
    coordinates: [30.5728, 104.0668],
    days: [10],
    description: 'El hogar de los pandas gigantes. Cultura de té relajada, ópera de Sichuan y una gastronomía mundialmente famosa.',
    highlights: ['Panda Base', 'Jinli Street', 'Kuanzhai Alley', 'Wuhou Shrine'],
  },
  beijing: {
    id: 'beijing',
    name: 'Pekín',
    nameCn: '北京',
    color: '#ef4444',
    coordinates: [39.9042, 116.4074],
    days: [11, 12, 13],
    description: 'La capital imperial. La Ciudad Prohibida, la Gran Muralla, hutongs centenarios y la Plaza de Tiananmén. Historia milenaria en cada esquina.',
    highlights: ['Ciudad Prohibida', 'Gran Muralla', 'Templo del Cielo', 'Plaza Tiananmén', 'Hutongs', 'Jingshan Park'],
  },
};

export const cityList: City[] = Object.values(cities);
export const cityIds: CityId[] = ['shanghai', 'zhangjiajie', 'chongqing', 'chengdu', 'beijing'];

export function getCityColor(cityId: CityId): string {
  return cities[cityId]?.color || '#8b5cf6';
}

export function getCityName(cityId: CityId): string {
  return cities[cityId]?.name || cityId;
}
