import { AlertTriangle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function ImportantAlerts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* High Priority Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <AlertTriangle size={64} className="text-red-500" />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
            <AlertTriangle size={20} />
          </div>
          <h3 className="font-bold text-red-400">Comprar antes sí o sí</h3>
        </div>
        <ul className="space-y-2 text-sm text-red-200/80 pl-2">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="font-medium text-white">Shanghai Tower</span> (Cupos limitados)
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="font-medium text-white">Tianmen Mountain</span> (Suele agotarse días antes)
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="font-medium text-white">Ciudad Prohibida</span> (Extremadamente difícil conseguir)
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="font-medium text-white">Trenes bala</span> (Comprar en Trip.com con máxima antelación)
          </li>
        </ul>
      </motion.div>

      {/* Medium Priority Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Clock size={64} className="text-orange-500" />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
            <Clock size={20} />
          </div>
          <h3 className="font-bold text-orange-400">Comprar unos días antes</h3>
        </div>
        <ul className="space-y-2 text-sm text-orange-200/80 pl-2">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="font-medium text-white">Gran Muralla</span> (Mutianyu - Si contratáis tour o transporte)
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="font-medium text-white">Zhangjiajie Glass Bridge</span> (Si finalmente decidís ir)
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
