import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass, Plus, X } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import type { CityId, Place } from '../../types';
import { generateId } from '../../utils/helpers';
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
  const { places, togglePlaceFavorite, togglePlaceVisited, addPlace, updatePlace, deletePlace } = useTripContext();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredPlaces = useMemo(() => {
    if (activeTab === 'all') return places;
    return places.filter((p) => p.cityId === activeTab);
  }, [places, activeTab]);

  const handleSave = (p: Place) => {
    if (editingId) {
      updatePlace(editingId, p);
    } else {
      addPlace({ ...p, id: generateId(), isCustom: true });
    }
    setShowForm(false);
    setEditingId(null);
  };

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

      {/* Filter Tabs & Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
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

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors"
        >
          <Plus size={16} />
          <span className="text-sm font-medium">Añadir lugar</span>
        </motion.button>
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
                onToggleVisited={togglePlaceVisited}
                onEdit={(p) => { setEditingId(p.id); setShowForm(true); }}
                onDelete={deletePlace}
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

      {/* Place Form Modal */}
      <AnimatePresence>
        {showForm && (
          <PlaceForm
            place={editingId ? places.find(p => p.id === editingId) : undefined}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditingId(null); }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function PlaceForm({ place, onSave, onClose }: {
  place?: Place;
  onSave: (p: Place) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Place>>({
    name: place?.name || '',
    cityId: place?.cityId || 'shanghai',
    description: place?.description || '',
    duration: place?.duration || '1-2 horas',
    interestLevel: place?.interestLevel || 3,
    entryPrice: place?.entryPrice || 0,
    googleMapsUrl: place?.googleMapsUrl || '',
    isFavorite: place?.isFavorite || false,
    isVisited: place?.isVisited || false,
    isCustom: place?.isCustom || true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: place?.id || generateId(), ...form } as Place);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-dark-elevated border border-dark-border rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">{place ? 'Editar' : 'Añadir'} Lugar de Interés</h3>
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
              placeholder="Nombre del lugar" />
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
              <label className="block text-sm text-gray-400 mb-1">Tiempo de visita</label>
              <input type="text" value={form.duration}
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50"
                placeholder="Ej. 2 horas" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Precio entrada (€)</label>
              <input type="number" min="0" value={form.entryPrice}
                onChange={e => setForm(f => ({ ...f, entryPrice: Number(e.target.value) }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Interés (1-5)</label>
              <input type="number" min="1" max="5" value={form.interestLevel}
                onChange={e => setForm(f => ({ ...f, interestLevel: Number(e.target.value) }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Enlace Google Maps</label>
            <input type="url" value={form.googleMapsUrl}
              onChange={e => setForm(f => ({ ...f, googleMapsUrl: e.target.value }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50"
              placeholder="https://..." />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Descripción</label>
            <textarea value={form.description} rows={3} required
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 resize-none"
              placeholder="Descripción breve..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-dark-border text-gray-400 hover:text-white transition-colors">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-glow transition-colors shadow-lg shadow-primary/20">
              {place ? 'Guardar' : 'Añadir'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
