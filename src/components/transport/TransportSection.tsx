import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Train, Plane, Bus, Car, ArrowRight, Plus, Edit3, Trash2, X, Clock, Zap } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import type { Transport, CityId } from '../../types';
import { generateId, formatCurrency, getStatusLabel, getStatusColor } from '../../utils/helpers';
import StatusBadge from '../ui/StatusBadge';

const transportIcons: Record<string, React.ElementType> = {
  train: Train, flight: Plane, bus: Bus, taxi: Car, metro: Train,
};

export default function TransportSection() {
  const { transport, addTransport, updateTransport, deleteTransport } = useTripContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const sorted = [...transport].sort((a, b) => a.day - b.day);

  const handleSave = (t: Transport) => {
    if (editingId) {
      updateTransport(editingId, t);
      setEditingId(null);
    } else {
      addTransport({ ...t, id: generateId() });
    }
    setShowForm(false);
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { setEditingId(null); setShowForm(true); }}
        className="w-full mb-6 py-3 rounded-xl border-2 border-dashed border-dark-border hover:border-primary/50 
                   text-gray-500 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Añadir trayecto
      </motion.button>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {sorted.map((t, i) => {
            const Icon = transportIcons[t.type] || Train;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5 
                           hover:border-dark-border transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {/* Transport Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 
                                  flex items-center justify-center">
                    <Icon size={22} className="text-secondary" />
                  </div>

                  {/* Route */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span>{t.fromCityName}</span>
                      <ArrowRight size={16} className="text-primary flex-shrink-0" />
                      <span>{t.toCityName}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{t.departureTime} - {t.arrivalTime}</span>
                      </div>
                      <span>·</span>
                      <span>Día {t.day}</span>
                      {t.type === 'train' && (
                        <>
                          <span>·</span>
                          <div className="flex items-center gap-1 text-accent-sky">
                            <Zap size={12} />
                            <span>Tren bala</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Price & Status */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-bold font-mono text-white">
                      {formatCurrency(t.price)}
                    </div>
                    <div className="mt-1">
                      <StatusBadge status={t.status} />
                    </div>
                  </div>
                </div>

                {t.notes && (
                  <p className="text-sm text-gray-500 mt-3 pl-16">{t.notes}</p>
                )}

                <div className="flex items-center gap-2 mt-3 pl-16">
                  {(['pending', 'reserved', 'paid'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => updateTransport(t.id, { status: s })}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        t.status === s
                          ? getStatusColor(s) + ' font-medium'
                          : 'border-dark-border/30 text-gray-600 hover:text-gray-400'
                      }`}
                    >
                      {getStatusLabel(s)}
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button onClick={() => { setEditingId(t.id); setShowForm(true); }}
                    className="p-1.5 rounded-lg hover:bg-dark-elevated text-gray-500 hover:text-white transition-colors">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => deleteTransport(t.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <TransportForm
            transport={editingId ? transport.find(t => t.id === editingId) : undefined}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditingId(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TransportForm({ transport: t, onSave, onClose }: {
  transport?: Transport;
  onSave: (t: Transport) => void;
  onClose: () => void;
}) {
  const cityNames: Record<CityId, string> = {
    shanghai: 'Shanghái', zhangjiajie: 'Zhangjiajie', chongqing: 'Chongqing', beijing: 'Pekín',
  };
  const [form, setForm] = useState<Partial<Transport>>({
    fromCity: t?.fromCity || 'shanghai',
    toCity: t?.toCity || 'zhangjiajie',
    fromCityName: t?.fromCityName || 'Shanghái',
    toCityName: t?.toCityName || 'Zhangjiajie',
    type: t?.type || 'train',
    departureTime: t?.departureTime || '09:00',
    arrivalTime: t?.arrivalTime || '15:00',
    price: t?.price || 0,
    currency: t?.currency || '€',
    status: t?.status || 'pending',
    notes: t?.notes || '',
    day: t?.day || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: t?.id || generateId(),
      ...form,
      fromCityName: cityNames[form.fromCity as CityId] || form.fromCity,
      toCityName: cityNames[form.toCity as CityId] || form.toCity,
    } as Transport);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-dark-elevated border border-dark-border rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">{t ? 'Editar' : 'Añadir'} Trayecto</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-dark-surface text-gray-500"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Ciudad origen</label>
              <select value={form.fromCity}
                onChange={e => setForm(f => ({ ...f, fromCity: e.target.value as CityId }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50">
                {Object.entries(cityNames).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Ciudad destino</label>
              <select value={form.toCity}
                onChange={e => setForm(f => ({ ...f, toCity: e.target.value as CityId }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50">
                {Object.entries(cityNames).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tipo</label>
              <select value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value as Transport['type'] }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50">
                <option value="train">Tren</option>
                <option value="flight">Vuelo</option>
                <option value="bus">Bus</option>
                <option value="taxi">Taxi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Salida</label>
              <input type="time" value={form.departureTime}
                onChange={e => setForm(f => ({ ...f, departureTime: e.target.value }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Llegada</label>
              <input type="time" value={form.arrivalTime}
                onChange={e => setForm(f => ({ ...f, arrivalTime: e.target.value }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Precio (€)</label>
              <input type="number" min="0" value={form.price}
                onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Día</label>
              <input type="number" min="1" max="15" value={form.day}
                onChange={e => setForm(f => ({ ...f, day: Number(e.target.value) }))}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Notas</label>
            <textarea value={form.notes} rows={2}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-dark-border text-gray-400 hover:text-white transition-colors">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-glow transition-colors shadow-lg shadow-primary/20">
              {t ? 'Guardar' : 'Añadir'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
