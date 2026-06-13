import React from 'react';
import type { Activity } from '../../types';
import {
  Plane,
  Car,
  Hotel,
  Coffee,
  ShoppingBag,
  Landmark,
  UtensilsCrossed,
  TreePine,
  Store,
  Building2,
  Building,
  Ship,
  TreeDeciduous,
  Palette,
  Wine,
  GlassWater,
  Train,
  Zap,
  MapPin,
  LogOut,
  Ticket,
  ArrowUp,
  Mountain,
  Glasses,
  Bus,
  Flame,
  Footprints,
  Moon,
  Clock,
  CableCar,
  Route,
  Castle,
  Waves,
  Bike,
  Heart,
  Bell,
  TrendingDown,
  AlarmClock,
  Soup,
  Sunset,
  type LucideIcon,
} from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

// Icon map: maps icon name strings from itinerary data to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Plane,
  Car,
  Hotel,
  Coffee,
  ShoppingBag,
  Landmark,
  UtensilsCrossed,
  TreePine,
  Store,
  Building2,
  Building,
  Ship,
  TreeDeciduous,
  Palette,
  Wine,
  GlassWater,
  Train,
  Zap,
  MapPin,
  LogOut,
  Ticket,
  ArrowUp,
  Mountain,
  Glasses,
  Bus,
  Flame,
  Footprints,
  Moon,
  Clock,
  CableCar,
  Route,
  Castle,
  Waves,
  Bike,
  Heart,
  Bell,
  TrendingDown,
  AlarmClock,
  Soup,
  Sunset,
};

function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || MapPin;
}

// Type-based color configuration
const typeColors: Record<Activity['type'], { bg: string; text: string; border: string; iconBg: string }> = {
  food: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/20',
  },
  transport: {
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/20',
    iconBg: 'bg-sky-500/20',
  },
  sightseeing: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/20',
  },
  hotel: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/20',
  },
  shopping: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/20',
    iconBg: 'bg-pink-500/20',
  },
  entertainment: {
    bg: 'bg-fuchsia-500/10',
    text: 'text-fuchsia-400',
    border: 'border-fuchsia-500/20',
    iconBg: 'bg-fuchsia-500/20',
  },
  free: {
    bg: 'bg-gray-500/10',
    text: 'text-gray-400',
    border: 'border-gray-500/20',
    iconBg: 'bg-gray-500/20',
  },
};

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const Icon = getIconComponent(activity.icon);
  const colors = typeColors[activity.type];

  return (
    <div className="group flex items-start gap-3 py-2.5 px-3 rounded-xl transition-all duration-200 hover:bg-white/[0.03]">
      {/* Time */}
      <div className="flex-shrink-0 w-12 pt-0.5">
        <span className="text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
          {activity.time}
        </span>
      </div>

      {/* Icon */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${colors.iconBg} transition-transform duration-200 group-hover:scale-110`}
      >
        <Icon className={`w-4 h-4 ${colors.text}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">
            {activity.title}
          </h4>

          {/* Type badge */}
          <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${colors.bg} ${colors.text} ${colors.border} uppercase tracking-wider`}
          >
            {activity.type}
          </span>

          {/* Cost badge */}
          {activity.cost !== undefined && (
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/20">
              {formatCurrency(activity.cost, '€')}
            </span>
          )}
        </div>

        {activity.description && (
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            {activity.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
