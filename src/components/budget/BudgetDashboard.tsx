import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Wallet, Users, Calendar, TrendingUp, Edit3 } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

export default function BudgetDashboard() {
  const { budget, updateBudgetCategory } = useTripContext();
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const total = budget.categories.reduce((sum, c) => sum + c.amount, 0);
  const perPerson = Math.round(total / budget.travelers);
  const perDay = Math.round(total / budget.tripDays);

  const pieData = budget.categories.map(c => ({
    name: c.name,
    value: c.amount,
    color: c.color,
  }));

  const barData = budget.categories.map(c => ({
    name: c.name,
    amount: c.amount,
    fill: c.color,
  }));

  const handleEditSave = (catId: string) => {
    const val = parseFloat(editValue);
    if (!isNaN(val) && val >= 0) {
      updateBudgetCategory(catId, val);
    }
    setEditingCat(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-elevated border border-dark-border rounded-xl px-4 py-2 shadow-xl">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-primary font-mono font-bold">{formatCurrency(payload[0].value)}</p>
          <p className="text-gray-500 text-xs">{Math.round((payload[0].value / total) * 100)}% del total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total estimado', value: formatCurrency(total), icon: Wallet, color: 'text-primary', glow: 'shadow-primary/20' },
          { label: 'Por persona', value: formatCurrency(perPerson), icon: Users, color: 'text-secondary', glow: 'shadow-secondary/20' },
          { label: 'Por día', value: formatCurrency(perDay), icon: Calendar, color: 'text-accent-emerald', glow: 'shadow-green-500/20' },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5 shadow-lg ${card.glow}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <card.icon size={18} className={card.color} />
              <span className="text-sm text-gray-400">{card.label}</span>
            </div>
            <p className={`text-3xl font-bold font-mono ${card.color}`}>{card.value}</p>
            {card.label === 'Por persona' && (
              <p className="text-xs text-gray-500 mt-1">{budget.travelers} viajeros</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Distribución del presupuesto
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map(item => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4">Desglose por categoría</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} width={100} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Editable Categories */}
      <div className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Ajustar presupuesto</h3>
        <div className="space-y-3">
          {budget.categories.map(cat => (
            <div key={cat.id} className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="text-gray-300 flex-1">{cat.name}</span>
              {editingCat === cat.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number" min="0" autoFocus
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleEditSave(cat.id); if (e.key === 'Escape') setEditingCat(null); }}
                    className="w-24 bg-dark-bg border border-primary/50 rounded-lg px-3 py-1 text-white font-mono text-right focus:outline-none"
                  />
                  <span className="text-gray-500">€</span>
                  <button onClick={() => handleEditSave(cat.id)}
                    className="text-xs text-primary hover:text-primary-glow">OK</button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white">{formatCurrency(cat.amount)}</span>
                  <button
                    onClick={() => { setEditingCat(cat.id); setEditValue(String(cat.amount)); }}
                    className="p-1 rounded-lg hover:bg-dark-elevated text-gray-600 hover:text-white transition-colors"
                  >
                    <Edit3 size={12} />
                  </button>
                </div>
              )}
              <div className="w-32 hidden sm:block">
                <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (cat.amount / Math.max(...budget.categories.map(c => c.amount))) * 100)}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-dark-border/30">
          <span className="text-gray-400 font-semibold">TOTAL</span>
          <span className="text-2xl font-bold font-mono text-primary">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
