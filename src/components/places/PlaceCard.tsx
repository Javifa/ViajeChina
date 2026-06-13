import { motion } from 'motion/react';
import { Heart, Clock, ExternalLink, MapPin, Ticket } from 'lucide-react';
import type { Place } from '../../types';
import type { CityId } from '../../types';
import StarRating from '../ui/StarRating';

interface PlaceCardProps {
  place: Place;
  onToggleFavorite: (id: string) => void;
}

const cityGradients: Record<CityId, string> = {
  shanghai: 'from-sky-500/80 via-cyan-400/60 to-blue-600/80',
  zhangjiajie: 'from-green-500/80 via-emerald-400/60 to-teal-600/80',
  chongqing: 'from-orange-500/80 via-amber-400/60 to-yellow-600/80',
  beijing: 'from-red-500/80 via-rose-400/60 to-pink-600/80',
};

const cityPatternColors: Record<CityId, string> = {
  shanghai: 'rgba(56,189,248,0.15)',
  zhangjiajie: 'rgba(34,197,94,0.15)',
  chongqing: 'rgba(249,115,22,0.15)',
  beijing: 'rgba(239,68,68,0.15)',
};

const cityLabels: Record<CityId, string> = {
  shanghai: 'Shanghái',
  zhangjiajie: 'Zhangjiajie',
  chongqing: 'Chongqing',
  beijing: 'Pekín',
};

const cityBadgeColors: Record<CityId, string> = {
  shanghai: 'bg-city-shanghai/20 text-city-shanghai border-city-shanghai/30',
  zhangjiajie: 'bg-city-zhangjiajie/20 text-city-zhangjiajie border-city-zhangjiajie/30',
  chongqing: 'bg-city-chongqing/20 text-city-chongqing border-city-chongqing/30',
  beijing: 'bg-city-beijing/20 text-city-beijing border-city-beijing/30',
};

export default function PlaceCard({ place, onToggleFavorite }: PlaceCardProps) {
  const gradient = cityGradients[place.cityId];
  const patternColor = cityPatternColors[place.cityId];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Gradient Image Placeholder */}
      <div className={`relative h-44 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* Real Image or Gradient fallback */}
        {place.imageUrl ? (
          <img 
            src={place.imageUrl} 
            alt={place.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <>
            {/* Decorative pattern overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, ${patternColor} 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, ${patternColor} 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)
                `,
              }}
            />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
              }}
            />
            {/* Floating shapes */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
            <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full bg-white/5 blur-2xl" />
          </>
        )}


        {/* Place name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin size={12} className="text-white/70" />
            <span className="text-xs font-medium text-white/70">
              {cityLabels[place.cityId]}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight">
            {place.name}
          </h3>
        </div>

        {/* Favorite toggle */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => onToggleFavorite(place.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-colors"
          aria-label={place.isFavorite ? 'Quitar favorito' : 'Añadir favorito'}
        >
          <Heart
            size={18}
            className={
              place.isFavorite
                ? 'text-red-400 fill-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.5)]'
                : 'text-white/60'
            }
          />
        </motion.button>

        {/* City badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cityBadgeColors[place.cityId]}`}
          >
            {cityLabels[place.cityId]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {place.description}
        </p>

        {/* Interest level */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Interés</span>
          <StarRating value={place.interestLevel} size={14} />
        </div>

        {/* Duration & Price row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-dark-border/30">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock size={14} />
            <span className="text-xs font-medium">{place.duration}</span>
          </div>

          {place.entryPrice !== undefined && place.entryPrice > 0 ? (
            <div className="flex items-center gap-1.5 text-gray-400">
              <Ticket size={14} />
              <span className="text-xs font-medium">~{place.entryPrice}€</span>
            </div>
          ) : place.entryPrice === 0 ? (
            <span className="text-xs text-emerald-400/80 font-medium">
              Gratis
            </span>
          ) : null}
        </div>

        {/* External link */}
        {place.googleMapsUrl && (
          <a
            href={place.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors group/link"
          >
            <ExternalLink
              size={12}
              className="group-hover/link:text-primary transition-colors"
            />
            <span>Ver en Google Maps</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
