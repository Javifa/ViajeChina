import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Filter } from 'lucide-react';
import { itinerary } from '../../data/itinerary';
import { cities, cityIds } from '../../data/cities';
import type { CityId } from '../../types';
import { getCityColorClass, getCityBgClass } from '../../utils/helpers';
import DayCard from './DayCard';

type FilterOption = 'all' | CityId;

const TimelineSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filteredDays = activeFilter === 'all'
    ? itinerary
    : itinerary.filter((day) => day.city === activeFilter);

  const filterTabs: { id: FilterOption; label: string; emoji?: string }[] = [
    { id: 'all', label: 'Todos' },
    ...cityIds.map((id) => ({
      id: id as FilterOption,
      label: cities[id].name,
      emoji: cities[id].nameCn,
    })),
  ];

  return (
    <section id="timeline-section" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Itinerario completo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            15 días por China
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Cada día planificado al detalle. Haz clic en cualquier día para ver las actividades.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          <Filter className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mr-1" />
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            const isCity = tab.id !== 'all';
            const colorClass = isCity ? getCityColorClass(tab.id as CityId) : '';
            const bgClass = isCity ? getCityBgClass(tab.id as CityId) : '';

            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`
                  flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                  transition-all duration-200 border
                  ${isActive
                    ? isCity
                      ? `${bgClass}/15 ${colorClass} border-current/30`
                      : 'bg-primary/15 text-primary border-primary/30'
                    : 'bg-dark-elevated/50 text-gray-500 border-dark-border/30 hover:text-gray-400 hover:border-dark-border/60'
                  }
                `}
              >
                {tab.emoji && (
                  <span className="text-[10px] opacity-70">{tab.emoji}</span>
                )}
                <span>{tab.label}</span>
                {isCity && (
                  <span className={`text-[10px] opacity-60`}>
                    ({cities[tab.id as CityId].days.length}d)
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[1.6rem] top-0 bottom-0 w-px hidden sm:block">
            {/* Background line */}
            <div className="absolute inset-0 bg-dark-border/30" />

            {/* City-colored segments overlay */}
            {activeFilter === 'all' && (
              <div className="absolute inset-0 flex flex-col">
                {itinerary.map((day) => (
                  <div
                    key={day.day}
                    className={`flex-1 ${getCityBgClass(day.city)}/40`}
                    style={{
                      opacity: 0.5,
                    }}
                  />
                ))}
              </div>
            )}
            {activeFilter !== 'all' && (
              <div className={`absolute inset-0 ${getCityBgClass(activeFilter as CityId)}/40 opacity-50`} />
            )}
          </div>

          {/* Day cards */}
          <div className="space-y-3 relative">
            {filteredDays.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="relative sm:pl-10"
              >
                {/* Timeline dot */}
                <div className="hidden sm:block absolute left-[1.1rem] top-5 z-10">
                  <div className={`w-3 h-3 rounded-full ${getCityBgClass(day.city)} ring-2 ring-dark-bg shadow-lg`}>
                    <div className={`absolute inset-0 rounded-full ${getCityBgClass(day.city)} animate-ping opacity-20`} />
                  </div>
                </div>

                <DayCard dayPlan={day} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-gray-600">
            {filteredDays.length} días · {filteredDays.reduce((sum, d) => sum + d.activities.length, 0)} actividades planificadas
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;
