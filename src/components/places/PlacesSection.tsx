import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import type { CityId } from '../../types';
import PlaceCard from './PlaceCard';

type FilterTab = 'all' | CityId;

interface TabConfig {
  id: FilterTab;
  label: string;
  labelCn: string;
  colorClass: string;
  activeClass: string;
}

const tabs: TabConfig[] = [
  {
    id: 'all',
    label: 'Todos',
    labelCn: '全部',
    colorClass: 'text-gray-400 hover:text-white',
    activeClass: 'bg-primary text-white',
  },
  {
    id: 'shanghai',
    label: 'Shanghái',
    labelCn: '上海',
    colorClass: 'text-gray-400 hover:text-city-shanghai',
    activeClass: 'bg-city-shanghai/20 text-city-shanghai border-city-shanghai/40',
  },
  {
    id: 'zhangjiajie',
    label: 'Zhangjiajie',
    labelCn: '张家界',
    colorClass: 'text-gray-400 hover:text-city-zhangjiajie',
    activeClass: 'bg-city-zhangjiajie/20 text-city-zhangjiajie border-city-zhangjiajie/40',
  },
  {
    id: 'chongqing',
    label: 'Chongqing',
    labelCn: '重庆',
    colorClass: 'text-gray-400 hover:text-city-chongqing',
    activeClass: 'bg-city-chongqing/20 text-city-chongqing border-city-chongqing/40',
  },
  {
    id: 'beijing',
    label: 'Pekín',
    labelCn: '北京',
    colorClass: 'text-gray-400 hover:text-city-beijing',
    activeClass: 'bg-city-beijing/20 text-city-beijing border-city-beijing/40',
  },
];

export default function PlacesSection() {
  const { places, togglePlaceFavorite } = useTripContext();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filteredPlaces = useMemo(() => {
    if (activeTab === 'all') return places;
    return places.filter((p) => p.cityId === activeTab);
  }, [places, activeTab]);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-secondary/10 border border-secondary/20">
          <Compass size={24} className="text-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            Lugares de Interés
          </h2>
          <p className="text-sm text-gray-400">
            {places.length} lugares · {places.filter((p) => p.isFavorite).length}{' '}
            favoritos
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                ${
                  isActive
                    ? tab.activeClass
                    : `${tab.colorClass} border-dark-border/50 bg-dark-surface/40 hover:bg-dark-surface/80`
                }
              `}
            >
              <span>{tab.label}</span>
              {tab.id !== 'all' && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  {tab.labelCn}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <MapPin size={14} />
        <span>
          Mostrando {filteredPlaces.length}{' '}
          {filteredPlaces.length === 1 ? 'lugar' : 'lugares'}
        </span>
      </div>

      {/* Places Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
                layout: { duration: 0.3 },
              }}
            >
              <PlaceCard
                place={place}
                onToggleFavorite={togglePlaceFavorite}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredPlaces.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <MapPin size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-500 text-lg">
            No hay lugares para esta ciudad
          </p>
        </motion.div>
      )}
    </section>
  );
}
