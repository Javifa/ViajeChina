import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed, MapPin, ExternalLink, Edit3, Trash2, Plus, Heart, X, CheckCircle2 } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import type { CityId, Restaurant } from '../../types';
import { cities } from '../../data/cities';
import { generateId, formatCurrency } from '../../utils/helpers';
import StarRating from '../ui/StarRating';

const cityTabs: { id: CityId | 'all'; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'shanghai', label: 'Shanghái' },
  { id: 'zhangjiajie', label: 'Zhangjiajie' },
  { id: 'chongqing', label: 'Chongqing' },
  { id: 'beijing', label: 'Pekín' },
];

export default function RestaurantsSection() {
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, toggleRestaurantFavorite, toggleRestaurantVisited } = useTripContext();
  const [activeCity, setActiveCity] = useState<CityId | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = activeCity === 'all' ? restaurants : restaurants.filter(r => r.cityId === activeCity);

  const handleSave = (r: Restaurant) => {
    if (editingId) {
      updateRestaurant(editingId, r);
      setEditingId(null);
    } else {
      addRestaurant({ ...r, id: generateId() });
    }
    setShowForm(false);
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

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { setEditingId(null); setShowForm(true); }}
        className="w-full mb-6 py-3 rounded-xl border-2 border-dashed border-dark-border hover:border-primary/50 
                   text-gray-500 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Añadir restaurante
      </motion.button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((rest, i) => (
            <motion.div
              key={rest.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5 
                         hover:border-dark-border transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <UtensilsCrossed size={16} className="text-accent-emerald" />
                    <h3 className="font-semibold text-white">{rest.name}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin size={12} />
                    <span>{cities[rest.cityId]?.name}</span>
                    <span className="mx-1">·</span>
                    <span className="text-accent-gold">{rest.cuisine}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleRestaurantVisited(rest.id)}
                    className="p-1.5 rounded-lg hover:bg-dark-elevated transition-colors"
                    title="Marcar como visitado"
                  >
                    <CheckCircle2 size={16} className={rest.isVisited ? 'text-emerald-400' : 'text-gray-600'} />
                  </button>
                  <button
                    onClick={() => toggleRestaurantFavorite(rest.id)}
                    className="p-1.5 rounded-lg hover:bg-dark-elevated transition-colors"
                    title="Añadir a favoritos"
                  >
                    <Heart size={16} className={rest.isFavorite ? 'text-primary fill-primary' : 'text-gray-600'} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 my-3">
                <StarRating value={rest.rating} size={14} />
                <span className="text-lg font-bold font-mono text-white">{formatCurrency(rest.estimatedPrice)}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-dark-elevated text-gray-400 border border-dark-border/50">
                  {rest.priceRange}
                </span>
              </div>

              {rest.notes && (
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{rest.notes}</p>
              )}

              <div className="flex items-center gap-2 pt-3 border-t border-dark-border/30">
                {rest.googleMapsUrl && (
                  <a href={rest.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    <ExternalLink size={12} /> Maps
                  </a>
                )}
                {rest.tripAdvisorUrl && (
                  <a href={rest.tripAdvisorUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    <ExternalLink size={12} /> TripAdvisor
                  </a>
                )}
                <div className="flex-1" />
                <button onClick={() => { setEditingId(rest.id); setShowForm(true); }}
                  className="p-1.5 rounded-lg hover:bg-dark-elevated text-gray-500 hover:text-white transition-colors">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => deleteRestaurant(rest.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <RestaurantForm
            restaurant={editingId ? restaurants.find(r => r.id === editingId) : undefined}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditingId(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RestaurantForm({ restaurant, onSave, onClose }: {
  restaurant?: Restaurant;
  onSave: (r: Restaurant) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Restaurant>>({
    name: restaurant?.name || '',
    cityId: restaurant?.cityId || 'shanghai',
    cuisine: restaurant?.cuisine || '',
    priceRange: restaurant?.priceRange || '€€',
    estimatedPrice: restaurant?.estimatedPrice || 0,
    rating: restaurant?.rating || 3,
    googleMapsUrl: restaurant?.googleMapsUrl || '',
    tripAdvisorUrl: restaurant?.tripAdvisorUrl || '',
    dianpingUrl: restaurant?.dianpingUrl || '',
    notes: restaurant?.notes || '',
    isFavorite: restaurant?.isFavorite || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: restaurant?.id || generateId(), ...form } as Restaurant);
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
          <h3 className="text-lg font-bold text-white">{restaurant ? 'Editar' : 'Añadir'} Restaurante</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-dark-surface text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nombre</label>
            <input type="text" required value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50"
              placeholder="Nombre del restaurante" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Ciudad</label>
              <select value={form.cityId}
                onChange={e => setForm(f => ({ ...f, cityId: e.target.value as CityId }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50">
                <option value="shanghai">Shanghái</option>
                <option value="zhangjiajie">Zhangjiajie</option>
                <option value="chongqing">Chongqing</option>
                <option value="beijing">Pekín</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tipo de comida</label>
              <input type="text" value={form.cuisine}
                onChange={e => setForm(f => ({ ...f, cuisine: e.target.value }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50"
                placeholder="Dumplings, Hot Pot..." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Precio estimado (€)</label>
              <input type="number" min="0" value={form.estimatedPrice}
                onChange={e => setForm(f => ({ ...f, estimatedPrice: Number(e.target.value) }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rango</label>
              <select value={form.priceRange}
                onChange={e => setForm(f => ({ ...f, priceRange: e.target.value }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50">
                <option value="€">€ Barato</option>
                <option value="€€">€€ Medio</option>
                <option value="€€€">€€€ Caro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Valoración</label>
            <StarRating value={form.rating || 3} onChange={v => setForm(f => ({ ...f, rating: v }))} size={20} />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Enlace Google Maps</label>
            <input type="url" value={form.googleMapsUrl}
              onChange={e => setForm(f => ({ ...f, googleMapsUrl: e.target.value }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50"
              placeholder="https://..." />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Notas</label>
            <textarea value={form.notes} rows={3}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 resize-none"
              placeholder="Notas adicionales..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-dark-border text-gray-400 hover:text-white transition-colors">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-glow transition-colors shadow-lg shadow-primary/20">
              {restaurant ? 'Guardar' : 'Añadir'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
