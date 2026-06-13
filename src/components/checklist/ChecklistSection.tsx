import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Plus,
  Trash2,
  BookOpen,
  Cpu,
  Smartphone,
  Heart,
  Backpack,
  Settings,
  ClipboardCheck,
  ChevronDown,
} from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import { generateId } from '../../utils/helpers';
import type { ChecklistItem } from '../../types';
import ProgressBar from '../ui/ProgressBar';

type ChecklistCategory = ChecklistItem['category'];

interface CategoryConfig {
  id: ChecklistCategory;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const categoryConfigs: CategoryConfig[] = [
  { id: 'documents', label: 'Documentos', icon: <BookOpen size={18} />, color: 'text-blue-400' },
  { id: 'tech', label: 'Tecnología', icon: <Cpu size={18} />, color: 'text-purple-400' },
  { id: 'apps', label: 'Apps', icon: <Smartphone size={18} />, color: 'text-green-400' },
  { id: 'health', label: 'Salud', icon: <Heart size={18} />, color: 'text-red-400' },
  { id: 'packing', label: 'Equipaje', icon: <Backpack size={18} />, color: 'text-amber-400' },
  { id: 'custom', label: 'Personalizado', icon: <Settings size={18} />, color: 'text-gray-400' },
];


export default function ChecklistSection() {
  const {
    checklist,
    toggleChecklistItem,
    addChecklistItem,
    deleteChecklistItem,
  } = useTripContext();

  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistCategory>('custom');
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Group items by category
  const grouped = useMemo(() => {
    const groups = new Map<ChecklistCategory, ChecklistItem[]>();
    for (const config of categoryConfigs) {
      groups.set(config.id, []);
    }
    for (const item of checklist) {
      const list = groups.get(item.category);
      if (list) list.push(item);
    }
    // Remove empty non-custom categories
    const result: { config: CategoryConfig; items: ChecklistItem[] }[] = [];
    for (const config of categoryConfigs) {
      const items = groups.get(config.id) || [];
      if (items.length > 0 || config.id === 'custom') {
        result.push({ config, items });
      }
    }
    return result;
  }, [checklist]);

  // Progress
  const completed = checklist.filter((c) => c.completed).length;
  const total = checklist.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleAddItem = () => {
    const text = newItemText.trim();
    if (!text) return;

    const item: ChecklistItem = {
      id: generateId(),
      text,
      completed: false,
      category: newItemCategory,
    };
    addChecklistItem(item);
    setNewItemText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
          <ClipboardCheck size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Checklist de Viaje</h2>
          <p className="text-sm text-gray-400">
            {completed} de {total} completados
          </p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5">
        <ProgressBar value={percent} label="Progreso general" color="bg-primary" />
      </div>

      {/* Category groups */}
      <div className="space-y-4">
        {grouped.map(({ config, items }) => {
          const isCollapsed = collapsedCategories.has(config.id);
          const categoryDone = items.filter((i) => i.completed).length;

          return (
            <div
              key={config.id}
              className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl overflow-hidden"
            >
              {/* Category header */}
              <button
                onClick={() => toggleCategory(config.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-dark-elevated/50 transition-colors"
              >
                <span className={config.color}>{config.icon}</span>
                <span className="text-base font-semibold text-white flex-1 text-left">
                  {config.label}
                </span>
                <span className="text-xs text-gray-500 font-mono mr-2">
                  {categoryDone}/{items.length}
                </span>
                <motion.div
                  animate={{ rotate: isCollapsed ? -90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-gray-500" />
                </motion.div>
              </button>

              {/* Items */}
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 space-y-1">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-dark-elevated/30 transition-colors group"
                        >
                          {/* Custom checkbox */}
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => toggleChecklistItem(item.id)}
                            className={`
                              relative flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-200
                              ${
                                item.completed
                                  ? 'bg-primary border-primary'
                                  : 'border-dark-border hover:border-gray-500'
                              }
                            `}
                          >
                            <AnimatePresence>
                              {item.completed && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 20,
                                  }}
                                  className="absolute inset-0 flex items-center justify-center"
                                >
                                  <Check
                                    size={12}
                                    className="text-white"
                                    strokeWidth={3}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>

                          {/* Item text */}
                          <span
                            className={`flex-1 text-sm transition-all duration-200 ${
                              item.completed
                                ? 'line-through text-gray-600'
                                : 'text-gray-300'
                            }`}
                          >
                            {item.text}
                          </span>

                          {/* Delete button for custom items */}
                          {item.category === 'custom' && (
                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              onClick={() => deleteChecklistItem(item.id)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-all"
                              aria-label="Eliminar"
                            >
                              <Trash2 size={14} />
                            </motion.button>
                          )}
                        </motion.div>
                      ))}

                      {items.length === 0 && (
                        <p className="text-sm text-gray-600 py-3 text-center">
                          No hay elementos en esta categoría
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Add new item form */}
      <div className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Plus size={16} className="text-primary" />
          Añadir elemento
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un nuevo elemento..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border/50 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <select
            value={newItemCategory}
            onChange={(e) =>
              setNewItemCategory(e.target.value as ChecklistCategory)
            }
            className="px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border/50 text-gray-300 text-sm focus:outline-none focus:border-primary/50 cursor-pointer"
          >
            {categoryConfigs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddItem}
            disabled={!newItemText.trim()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Añadir
          </motion.button>
        </div>
      </div>
    </section>
  );
}
