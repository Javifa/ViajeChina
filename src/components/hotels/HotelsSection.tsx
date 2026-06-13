import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotel, MapPin, ExternalLink, Edit3, Trash2, Plus, Heart, X } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import type { CityId, Hotel as HotelType } from '../../types';
import { cities } from '../../data/cities';
import { generateId, formatCurrency, getStatusLabel, getStatusColor } from '../../utils/helpers';
import StatusBadge from '../ui/StatusBadge';

const cityTabs: { id: CityId | 'all'; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'shanghai', label: 'Shanghái' },
  { id: 'zhangjiajie', label: 'Zhangjiajie' },
  { id: 'chongqing', label: 'Chongqing' },
  { id: 'beijing', label: 'Pekín' },
];

export default function HotelsSection() {
  const { hotels, addHotel, updateHotel, deleteHotel, toggleHotelFavorite } = useTripContext();
  const [activeCity, setActiveCity] = useState<CityId | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredHotels = activeCity === 'all' ? hotels : hotels.filter(h => h.cityId === activeCity);

  const handleSave = (hotel: HotelType) => {
    if (editingId) {
      updateHotel(editingId, hotel);
      setEditingId(null);
    } else {
      addHotel({ ...hotel, id: generateId() });
    }
    setShowForm(false);
  };

  const handleEdit = (hotel: HotelType) => {
    setEditingId(hotel.id);
    setShowForm(true);
  };

  return (
    <div>
      {/* City Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {cityTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCity(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeCity === tab.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-dark-surface/80 text-gray-400 hover:text-white hover:bg-dark-elevated'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Add Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { setEditingId(null); setShowForm(true); }}
        className="w-full mb-6 py-3 rounded-xl border-2 border-dashed border-dark-border hover:border-primary/50 
                   text-gray-500 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Añadir hotel
      </motion.button>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredHotels.map((hotel, i) => (
            <motion.div
              key={hotel.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5 
                         hover:border-dark-border transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Hotel size={16} className="text-primary" />
                    <h3 className="font-semibold text-white">{hotel.name}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin size={12} />
                    <span>{cities[hotel.cityId]?.name} · {hotel.zone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleHotelFavorite(hotel.id)}
                    className="p-1.5 rounded-lg hover:bg-dark-elevated transition-colors"
                  >
                    <Heart
                      size={16}
                      className={hotel.isFavorite ? 'text-primary fill-primary' : 'text-gray-600'}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold font-mono text-white">
                  {formatCurrency(hotel.pricePerNight)}
                </span>
                <span className="text-sm text-gray-500">/noche</span>
                <StatusBadge status={hotel.status} />
              </div>

              {hotel.notes && (
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{hotel.notes}</p>
              )}

              {hotel.advantages && hotel.advantages.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {hotel.advantages.map((adv, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-dark-elevated text-gray-400 border border-dark-border/50">
                      {adv}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 pt-3 border-t border-dark-border/30">
                {hotel.bookingUrl && (
                  <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    <ExternalLink size={12} /> Booking
                  </a>
                )}
                {hotel.tripUrl && (
                  <a href={hotel.tripUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    <ExternalLink size={12} /> Trip.com
                  </a>
                )}
                <div className="flex-1" />
                <button onClick={() => handleEdit(hotel)}
                  className="p-1.5 rounded-lg hover:bg-dark-elevated text-gray-500 hover:text-white transition-colors">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => deleteHotel(hotel.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Status quick change */}
              <div className="flex gap-1 mt-3">
                {(['pending', 'reserved', 'paid'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => updateHotel(hotel.id, { status: s })}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      hotel.status === s
                        ? getStatusColor(s) + ' font-medium'
                        : 'border-dark-border/30 text-gray-600 hover:text-gray-400'
                    }`}
                  >
                    {getStatusLabel(s)}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <HotelForm
            hotel={editingId ? hotels.find(h => h.id === editingId) : undefined}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditingId(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function HotelForm({ hotel, onSave, onClose }: {
  hotel?: HotelType;
  onSave: (h: HotelType) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<HotelType>>({
    name: hotel?.name || '',
    cityId: hotel?.cityId || 'shanghai',
    zone: hotel?.zone || '',
    pricePerNight: hotel?.pricePerNight || 0,
    currency: hotel?.currency || '€',
    bookingUrl: hotel?.bookingUrl || '',
    tripUrl: hotel?.tripUrl || '',
    agodaUrl: hotel?.agodaUrl || '',
    notes: hotel?.notes || '',
    isFavorite: hotel?.isFavorite || false,
    status: hotel?.status || 'pending',
    advantages: hotel?.advantages || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: hotel?.id || generateId(),
      ...form,
    } as HotelType);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-dark-elevated border border-dark-border rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">{hotel ? 'Editar Hotel' : 'Añadir Hotel'}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-dark-surface text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nombre</label>
            <input
              type="text" required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white 
                         focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Nombre del hotel"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Ciudad</label>
              <select
                value={form.cityId}
                onChange={e => setForm(f => ({ ...f, cityId: e.target.value as CityId }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white 
                           focus:outline-none focus:border-primary/50 transition-colors"
              >
                <option value="shanghai">Shanghái</option>
                <option value="zhangjiajie">Zhangjiajie</option>
                <option value="chongqing">Chongqing</option>
                <option value="beijing">Pekín</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Zona</label>
              <input
                type="text"
                value={form.zone}
                onChange={e => setForm(f => ({ ...f, zone: e.target.value }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white 
                           focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Barrio / zona"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Precio por noche (€)</label>
            <input
              type="number" min="0" step="0.01"
              value={form.pricePerNight}
              onChange={e => setForm(f => ({ ...f, pricePerNight: Number(e.target.value) }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white font-mono
                         focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Enlace Booking</label>
            <input
              type="url"
              value={form.bookingUrl}
              onChange={e => setForm(f => ({ ...f, bookingUrl: e.target.value }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white 
                         focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Enlace Trip.com</label>
            <input
              type="url"
              value={form.tripUrl}
              onChange={e => setForm(f => ({ ...f, tripUrl: e.target.value }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white 
                         focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Notas</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={3}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white 
                         focus:outline-none focus:border-primary/50 transition-colors resize-none"
              placeholder="Notas adicionales..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-dark-border text-gray-400 hover:text-white transition-colors">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-glow transition-colors shadow-lg shadow-primary/20">
              {hotel ? 'Guardar' : 'Añadir'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
