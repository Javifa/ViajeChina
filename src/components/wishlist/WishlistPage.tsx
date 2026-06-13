import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Plus, MapPin, ExternalLink, Trash2, Link as LinkIcon, Compass, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { CityId } from '../../types';
import { cities } from '../../data/cities';

interface WishlistItem {
  id: string;
  created_at: string;
  title: string;
  link: string;
  category: string;
  city_id: CityId;
}

const CATEGORIES = [
  { id: 'comida', label: 'Comida/Restaurante', icon: '🍜' },
  { id: 'cafe', label: 'Cafetería/Postre', icon: '☕' },
  { id: 'mirador', label: 'Mirador/Foto', icon: '📸' },
  { id: 'fiesta', label: 'Fiesta/Pub', icon: '🍻' },
  { id: 'compras', label: 'Compras/Mercado', icon: '🛍️' },
  { id: 'visita', label: 'Visita/Cultura', icon: '🏯' },
];

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCity, setActiveCity] = useState<CityId | 'all'>('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchItems();
    
    // Subscribe to realtime changes
    const subscription = supabase
      .channel('wishlist_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wishlist' }, () => {
        fetchItems();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase.from('wishlist').delete().eq('id', id);
      if (error) throw error;
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const filteredItems = activeCity === 'all' 
    ? items 
    : items.filter(item => item.city_id === activeCity);

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-dark-bg pb-24 md:pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Heart className="text-primary fill-primary/20" size={32} />
              Wishlist Compartida
            </h1>
            <p className="text-gray-400">
              Sitios de TikTok, Instagram y recomendaciones para visitar.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-glow transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={20} />
            <span>Añadir Sitio</span>
          </motion.button>
        </div>

        {/* City Filter */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
          <FilterTab 
            active={activeCity === 'all'} 
            onClick={() => setActiveCity('all')}
            label="Todos"
          />
          {Object.entries(cities).map(([id, city]) => (
            <FilterTab 
              key={id}
              active={activeCity === id} 
              onClick={() => setActiveCity(id as CityId)}
              label={city.name}
              colorClass={`text-city-${id}`}
              bgClass={`bg-city-${id}/20`}
            />
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-dark-surface/30 rounded-3xl border border-dark-border/50">
            <Compass size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Aún no hay sitios</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Añade el primer restaurante o lugar interesante que hayas visto en redes sociales.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <WishlistCard 
                  key={item.id} 
                  item={item} 
                  onDelete={() => deleteItem(item.id)} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}

      </main>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showForm && (
          <WishlistForm 
            onClose={() => setShowForm(false)} 
            onSuccess={() => {
              setShowForm(false);
              fetchItems();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterTab({ active, onClick, label, colorClass, bgClass }: { active: boolean, onClick: () => void, label: string, colorClass?: string, bgClass?: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${
        active 
          ? bgClass ? `${bgClass} ${colorClass} border border-current/30` : 'bg-white text-black border border-white'
          : 'bg-dark-surface/50 text-gray-400 border border-dark-border hover:bg-dark-surface'
      }`}
    >
      {label}
    </button>
  );
}

function WishlistCard({ item, onDelete }: { item: WishlistItem, onDelete: () => void }) {
  const city = cities[item.city_id];
  const category = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5 flex flex-col gap-4 group hover:border-dark-border transition-colors active:scale-95 sm:active:scale-100"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin size={12} className={`text-city-${item.city_id}`} />
            <span className={`text-xs font-semibold text-city-${item.city_id}`}>
              {city.name}
            </span>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <span>{category.icon}</span> {category.label.split('/')[0]}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight">
            {item.title}
          </h3>
        </div>
        <button 
          onClick={onDelete}
          className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-auto pt-4 flex gap-3">
        {item.link ? (
          <a 
            href={item.link.startsWith('http') ? item.link : `https://${item.link}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-dark-elevated text-sm font-medium text-white hover:bg-dark-elevated/80 transition-colors border border-white/5"
          >
            <LinkIcon size={14} />
            <span>Abrir Link</span>
            <ExternalLink size={12} className="text-gray-500" />
          </a>
        ) : (
          <div className="flex-1 py-2.5 text-center text-sm text-gray-600 bg-dark-bg/50 rounded-xl border border-dark-border/50">
            Sin link
          </div>
        )}
      </div>
    </motion.div>
  );
}

function WishlistForm({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    link: '',
    city_id: 'shanghai' as CityId,
    category: 'comida'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('wishlist').insert([{
        title: form.title,
        link: form.link,
        city_id: form.city_id,
        category: form.category
      }]);
      if (error) throw error;
      onSuccess();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error al guardar. Revisa la consola.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full sm:w-[500px] bg-dark-surface border-t sm:border border-dark-border/50 sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between p-5 border-b border-dark-border/50">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Heart className="text-primary" size={20} /> Añadir a Wishlist
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full bg-dark-elevated">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">¿Qué sitio es?</label>
            <input 
              required
              type="text" 
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              placeholder="Ej. Restaurante Hot Pot de TikTok"
              className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Link (TikTok, Instagram, Maps)</label>
            <input 
              type="text" 
              value={form.link}
              onChange={e => setForm({...form, link: e.target.value})}
              placeholder="https://tiktok.com/..."
              className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Ciudad</label>
              <select 
                value={form.city_id}
                onChange={e => setForm({...form, city_id: e.target.value as CityId})}
                className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 appearance-none"
              >
                {Object.entries(cities).map(([id, city]) => (
                  <option key={id} value={id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Categoría</label>
              <select 
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
                className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 appearance-none"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full mt-4 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-glow transition-all disabled:opacity-50 active:scale-95"
          >
            {loading ? 'Guardando...' : 'Guardar Sitio'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
