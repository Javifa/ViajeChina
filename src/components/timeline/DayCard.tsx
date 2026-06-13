import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, MapPin } from 'lucide-react';
import type { DayPlan } from '../../types';
import { getCityColorClass, getCityBgClass, formatDate } from '../../utils/helpers';
import { cities } from '../../data/cities';
import ActivityItem from './ActivityItem';

interface DayCardProps {
  dayPlan: DayPlan;
}

const DayCard: React.FC<DayCardProps> = ({ dayPlan }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cityData = cities[dayPlan.city];
  const colorClass = getCityColorClass(dayPlan.city);
  const bgClass = getCityBgClass(dayPlan.city);

  const totalCost = dayPlan.activities.reduce((sum, a) => sum + (a.cost || 0), 0);

  return (
    <motion.div
      layout
      className="relative group"
    >
      {/* Card */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative overflow-hidden cursor-pointer
          bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl
          transition-all duration-300 active:scale-95
          hover:border-dark-border hover:bg-dark-surface/90
          ${isExpanded ? 'ring-1 ring-white/5' : ''}
        `}
      >
        {/* City color left stripe */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${bgClass} rounded-l-2xl`} />

        {/* Transit day top banner */}
        {dayPlan.isTransitDay && dayPlan.transitFrom && dayPlan.transitTo && (
          <div className="mx-4 mt-3 mb-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
            <MapPin className="w-3 h-3 text-sky-400 flex-shrink-0" />
            <span className={`text-xs font-medium ${getCityColorClass(dayPlan.transitFrom)}`}>
              {cities[dayPlan.transitFrom].name}
            </span>
            <ArrowRight className="w-3 h-3 text-gray-500" />
            <span className={`text-xs font-medium ${getCityColorClass(dayPlan.transitTo)}`}>
              {cities[dayPlan.transitTo].name}
            </span>
          </div>
        )}

        {/* Main content */}
        <div className="p-4 pl-5">
          <div className="flex items-center justify-between gap-3">
            {/* Left side */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Day number badge */}
              <div
                className={`
                  flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                  ${bgClass}/15 border border-current/20 ${colorClass}
                `}
              >
                <span className="text-sm font-bold">{dayPlan.day}</span>
              </div>

              {/* Text content */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {dayPlan.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500 font-mono">
                    {formatDate(dayPlan.date)}
                  </span>
                  <span className="text-gray-700">·</span>
                  <span className={`text-xs font-medium ${colorClass}`}>
                    {cityData.name}
                  </span>
                  {dayPlan.subtitle && (
                    <>
                      <span className="text-gray-700 hidden sm:inline">·</span>
                      <span className="text-xs text-gray-500 hidden sm:inline truncate">
                        {dayPlan.subtitle}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Activity count */}
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="text-xs text-gray-500">
                  {dayPlan.activities.length} actividades
                </span>
                {totalCost > 0 && (
                  <>
                    <span className="text-gray-700">·</span>
                    <span className="text-xs font-mono text-amber-400/80">
                      ~{totalCost}€
                    </span>
                  </>
                )}
              </div>

              {/* Expand chevron */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Expanded activities */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-dark-border/30 mx-4" />
              <div className="px-2 py-2 space-y-0.5">
                {dayPlan.activities.map((activity, index) => (
                  <motion.div
                    key={`${dayPlan.day}-${activity.time}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25 }}
                  >
                    <ActivityItem activity={activity} />
                  </motion.div>
                ))}
              </div>

              {/* Bottom summary */}
              {totalCost > 0 && (
                <div className="border-t border-dark-border/30 mx-4 px-3 py-2.5 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Coste estimado del día</span>
                  <span className="text-sm font-mono font-semibold text-amber-400">
                    ~{totalCost}€ <span className="text-gray-600 font-normal">/persona</span>
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DayCard;
