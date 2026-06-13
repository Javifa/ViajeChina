import { motion } from 'motion/react';
import { StickyNote } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import { cities } from '../../data/cities';
import type { CityId } from '../../types';
import { getCityColorClass } from '../../utils/helpers';

export default function NotesSection() {
  const { notes, updateNotes } = useTripContext();
  const cityIds: CityId[] = ['shanghai', 'zhangjiajie', 'chongqing', 'beijing'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cityIds.map((cityId, i) => (
        <motion.div
          key={cityId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <StickyNote size={16} className={getCityColorClass(cityId)} />
            <h3 className={`font-semibold ${getCityColorClass(cityId)}`}>
              {cities[cityId].name}
            </h3>
            <span className="text-gray-600 text-sm">{cities[cityId].nameCn}</span>
          </div>
          <textarea
            value={notes[cityId] || ''}
            onChange={e => updateNotes(cityId, e.target.value)}
            rows={6}
            placeholder={`Notas para ${cities[cityId].name}...`}
            className="w-full bg-dark-bg/50 border border-dark-border/30 rounded-xl px-4 py-3 text-gray-300 text-sm
                       focus:outline-none focus:border-dark-border transition-colors resize-none
                       placeholder:text-gray-600"
          />
          <p className="text-xs text-gray-600 mt-2">Auto-guardado ✓</p>
        </motion.div>
      ))}
    </div>
  );
}
