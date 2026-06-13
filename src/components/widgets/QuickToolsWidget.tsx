import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Clock, X, ArrowRightLeft } from 'lucide-react';

export default function QuickToolsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [euro, setEuro] = useState<string>('100');
  const [rmb, setRmb] = useState<string>('780');
  
  // Tipo de cambio estático aproximado
  const EXCHANGE_RATE = 7.8;

  const handleEuroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEuro(val);
    if (!isNaN(Number(val))) {
      setRmb((Number(val) * EXCHANGE_RATE).toFixed(2));
    }
  };

  const handleRmbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRmb(val);
    if (!isNaN(Number(val))) {
      setEuro((Number(val) / EXCHANGE_RATE).toFixed(2));
    }
  };

  // Reloj local e internacional
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
    }).format(date);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 w-80 bg-dark-surface/95 backdrop-blur-xl border border-dark-border shadow-2xl rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-dark-border/50 bg-dark-bg/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Calculator size={18} className="text-primary" />
                Herramientas
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Relojes */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Clock size={14} />
                  <span>Hora Actual</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark-bg/50 rounded-xl p-3 border border-dark-border/50 text-center">
                    <p className="text-xs text-gray-500 mb-1">España</p>
                    <p className="text-xl font-mono text-white">{formatTime(time, 'Europe/Madrid')}</p>
                  </div>
                  <div className="bg-dark-bg/50 rounded-xl p-3 border border-dark-border/50 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5"></div>
                    <p className="text-xs text-primary mb-1">China (+6h)</p>
                    <p className="text-xl font-mono text-white">{formatTime(time, 'Asia/Shanghai')}</p>
                  </div>
                </div>
              </div>

              {/* Conversor de Divisas */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <ArrowRightLeft size={14} />
                  <span>Conversor rápido (1€ ≈ 7.8¥)</span>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="number"
                      value={euro}
                      onChange={handleEuroChange}
                      className="w-full bg-dark-bg/50 border border-dark-border rounded-xl py-3 pl-4 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50"
                      placeholder="Euros..."
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <span className="font-bold text-gray-400">€</span>
                      <span className="text-xs text-gray-500">EUR</span>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={rmb}
                      onChange={handleRmbChange}
                      className="w-full bg-dark-bg/50 border border-dark-border rounded-xl py-3 pl-4 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-secondary/50"
                      placeholder="Yuanes..."
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <span className="font-bold text-gray-400">¥</span>
                      <span className="text-xs text-gray-500">RMB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg shadow-black/50 flex items-center justify-center transition-colors ${
          isOpen ? 'bg-dark-surface border border-dark-border text-white' : 'bg-primary text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <Calculator size={24} />}
      </motion.button>
    </div>
  );
}
