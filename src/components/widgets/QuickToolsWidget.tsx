import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Backpack, Clock, X, ArrowRightLeft, BookOpen, CloudRain, ThermometerSun } from 'lucide-react';

type Tab = 'tools' | 'phrases' | 'weather';

const phrases = [
  { es: 'Hola', py: 'Nǐ hǎo', cn: '你好' },
  { es: 'Gracias', py: 'Xièxiè', cn: '谢谢' },
  { es: 'La cuenta, por favor', py: 'Mǎi dān', cn: '买单' },
  { es: '¡Demasiado caro!', py: 'Tài guì le!', cn: '太贵了!' },
  { es: 'No picante', py: 'Bù là', cn: '不辣' },
  { es: '¿Dónde está el baño?', py: 'Xǐshǒujiān zài nǎlǐ?', cn: '洗手间在哪里？' },
];

const weatherData = [
  { city: 'Shanghái', temp: '22 - 28°C', rain: 'Moderada', icon: CloudRain },
  { city: 'Zhangjiajie', temp: '18 - 25°C', rain: 'Alta (Niebla)', icon: CloudRain },
  { city: 'Chongqing', temp: '21 - 27°C', rain: 'Moderada', icon: ThermometerSun },
  { city: 'Pekín', temp: '15 - 26°C', rain: 'Baja', icon: ThermometerSun },
];

export default function QuickToolsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('tools');
  
  const [euro, setEuro] = useState<string>('100');
  const [rmb, setRmb] = useState<string>('780');
  const EXCHANGE_RATE = 7.8;

  const handleEuroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEuro(val);
    if (!isNaN(Number(val))) setRmb((Number(val) * EXCHANGE_RATE).toFixed(2));
  };

  const handleRmbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRmb(val);
    if (!isNaN(Number(val))) setEuro((Number(val) / EXCHANGE_RATE).toFixed(2));
  };

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone }).format(date);
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
            className="absolute bottom-16 right-0 w-[340px] sm:w-[380px] bg-dark-surface/95 backdrop-blur-xl border border-dark-border shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header & Tabs */}
            <div className="bg-dark-bg/80 border-b border-dark-border/50 shrink-0">
              <div className="flex items-center justify-between p-4 pb-2">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Backpack size={18} className="text-primary" />
                  Supervivencia
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="flex gap-1 px-2 pb-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'tools', icon: ArrowRightLeft, label: 'Divisas' },
                  { id: 'phrases', icon: BookOpen, label: 'Diccionario' },
                  { id: 'weather', icon: CloudRain, label: 'Clima' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as Tab)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeTab === t.id ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-dark-elevated'
                    }`}
                  >
                    <t.icon size={14} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4 overflow-y-auto custom-scrollbar">
              {activeTab === 'tools' && (
                <div className="space-y-6">
                  {/* Relojes */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                      <Clock size={14} /><span>Hora Actual</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-dark-bg/50 rounded-xl p-3 border border-dark-border/50 text-center">
                        <p className="text-xs text-gray-500 mb-1">España</p>
                        <p className="text-xl font-mono text-white">{formatTime(time, 'Europe/Madrid')}</p>
                      </div>
                      <div className="bg-dark-bg/50 rounded-xl p-3 border border-primary/20 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5"></div>
                        <p className="text-xs text-primary mb-1">China (+6h)</p>
                        <p className="text-xl font-mono text-white">{formatTime(time, 'Asia/Shanghai')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Divisas */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                      <ArrowRightLeft size={14} /><span>Conversor (1€ ≈ 7.8¥)</span>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <input type="number" value={euro} onChange={handleEuroChange}
                          className="w-full bg-dark-bg/50 border border-dark-border rounded-xl py-3 pl-4 pr-12 text-white focus:outline-none focus:border-primary/50" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">€</span>
                      </div>
                      <div className="relative">
                        <input type="number" value={rmb} onChange={handleRmbChange}
                          className="w-full bg-dark-bg/50 border border-dark-border rounded-xl py-3 pl-4 pr-12 text-white focus:outline-none focus:border-secondary/50" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">¥</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'phrases' && (
                <div className="space-y-3">
                  <p className="text-xs text-gray-400 mb-4">Frases básicas para enseñar o pronunciar.</p>
                  {phrases.map((p, i) => (
                    <div key={i} className="bg-dark-bg/50 border border-dark-border/50 rounded-xl p-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-white mb-0.5">{p.es}</p>
                        <p className="text-xs text-secondary">{p.py}</p>
                      </div>
                      <span className="text-xl font-medium text-gray-300 bg-dark-elevated px-2 py-1 rounded-lg">{p.cn}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'weather' && (
                <div className="space-y-3">
                  <p className="text-xs text-gray-400 mb-4">Histórico promedio para Septiembre.</p>
                  {weatherData.map((w, i) => (
                    <div key={i} className="bg-dark-bg/50 border border-dark-border/50 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-dark-elevated rounded-lg text-primary">
                          <w.icon size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{w.city}</p>
                          <p className="text-xs text-gray-500">Lluvia: {w.rain}</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono text-secondary font-bold">{w.temp}</span>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="text-xs text-blue-400">💡 Tip: Lleva chubasquero ligero para Zhangjiajie y ropa de entretiempo para el resto.</p>
                  </div>
                </div>
              )}
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
        {isOpen ? <X size={24} /> : <Backpack size={24} />}
      </motion.button>
    </div>
  );
}
