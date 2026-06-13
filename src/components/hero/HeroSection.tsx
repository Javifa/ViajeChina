import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Train, Wallet, Plane, ChevronDown } from 'lucide-react';
import { getHoursUntilTrip } from '../../utils/helpers';

const stats = [
  { icon: MapPin, label: 'Ciudades', value: '5', color: 'from-city-shanghai to-city-zhangjiajie' },
  { icon: Calendar, label: 'Días', value: '15', color: 'from-primary to-primary-glow' },
  { icon: Train, label: 'Trenes/Vuelos', value: '5', color: 'from-city-chongqing to-accent-gold' },
  { icon: Wallet, label: 'Coste estimado', value: '~1.800€', color: 'from-secondary to-secondary-glow' },
];

const cityRoute = [
  { name: 'Shanghái', nameCn: '上海', color: '#38bdf8', days: '1-3' },
  { name: 'Zhangjiajie', nameCn: '张家界', color: '#22c55e', days: '4-6' },
  { name: 'Chongqing', nameCn: '重庆', color: '#f97316', days: '7-9' },
  { name: 'Chengdu', nameCn: '成都', color: '#d946ef', days: '10' },
  { name: 'Pekín', nameCn: '北京', color: '#ef4444', days: '11-13' },
];

export default function HeroSection() {
  const [countdown, setCountdown] = useState(getHoursUntilTrip());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getHoursUntilTrip());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-bg">
      {/* === Background Layers === */}

      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg" />

      {/* Radial glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-city-shanghai/3 rounded-full blur-[160px]" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Fine grid lines */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* === Floating Decorative Elements === */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[10%] w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        animate={{ y: [10, -20, 10], rotate: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[25%] right-[8%] w-12 h-12 rounded-full bg-secondary/5 border border-secondary/10 backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        animate={{ y: [-10, 20, -10], x: [-5, 5, -5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[30%] left-[5%] w-20 h-20 rounded-3xl bg-city-zhangjiajie/5 border border-city-zhangjiajie/10 backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        animate={{ y: [8, -12, 8], rotate: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[25%] right-[12%] w-14 h-14 rounded-xl bg-city-chongqing/5 border border-city-chongqing/10 backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        animate={{ y: [-8, 16, -8], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[60%] right-[25%] w-10 h-10 rounded-lg bg-city-beijing/5 border border-city-beijing/10 backdrop-blur-sm hidden xl:block"
      />

      {/* Small floating plane icon */}
      <motion.div
        animate={{ x: [-100, 200], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[12%] left-[30%] text-white/5 hidden lg:block"
      >
        <Plane className="w-8 h-8" />
      </motion.div>

      {/* === Main Content === */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 text-xs font-medium text-gray-400">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            1 Septiembre 2026 · 7 amigos · 15 días
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #e11d48 0%, #fbbf24 40%, #e11d48 60%, #fbbf24 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 6s ease-in-out infinite',
            }}
          >
            China 2026
          </span>
          <span className="ml-3 inline-block">🇨🇳</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          15 días recorriendo{' '}
          <span className="text-city-shanghai font-medium">Shanghái</span>,{' '}
          <span className="text-city-zhangjiajie font-medium">Zhangjiajie</span>,{' '}
          <span className="text-city-chongqing font-medium">Chongqing</span>,{' '}
          <span className="text-city-chengdu font-medium">Chengdu</span> y{' '}
          <span className="text-city-beijing font-medium">Pekín</span>
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-12"
        >
          {[
            { value: countdown.days, label: 'Días' },
            { value: countdown.hours, label: 'Horas' },
            { value: countdown.minutes, label: 'Min' },
            { value: countdown.seconds, label: 'Seg' },
          ].map((unit, index) => (
            <div key={unit.label} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                {/* Subtle glow under the box */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary/20 blur-sm" />
              </motion.div>
              <span className="text-[10px] sm:text-xs text-gray-500 mt-2 font-medium uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-14"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative p-4 sm:p-5 rounded-2xl bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 hover:border-dark-border transition-all duration-300 cursor-default"
            >
              {/* Top gradient line */}
              <div
                className={`absolute top-0 left-4 right-4 h-px bg-gradient-to-r ${stat.color} opacity-40 group-hover:opacity-80 transition-opacity`}
              />
              <stat.icon className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors mb-2" />
              <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mini City Route Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="relative max-w-lg mx-auto mb-8"
        >
          <div className="flex items-center justify-between relative">
            {/* Connecting line behind dots */}
            <div className="absolute top-4 left-[10%] right-[10%] h-px bg-dark-border/50" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.2, ease: 'easeInOut' }}
              className="absolute top-4 left-[10%] right-[10%] h-px bg-gradient-to-r from-city-shanghai via-city-zhangjiajie via-city-chongqing via-city-chengdu to-city-beijing origin-left"
              style={{
                background:
                  'linear-gradient(90deg, #38bdf8 0%, #22c55e 25%, #f97316 50%, #d946ef 75%, #ef4444 100%)',
              }}
            />

            {cityRoute.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.0 + index * 0.2,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                className="relative flex flex-col items-center z-10"
              >
                {/* City dot */}
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center bg-dark-bg"
                  style={{ borderColor: city.color }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: city.color }}
                  />
                </div>
                {/* City name */}
                <span className="text-[10px] sm:text-xs font-medium text-gray-400 mt-2 whitespace-nowrap">
                  {city.name}
                </span>
                <span
                  className="text-[10px] font-mono opacity-60"
                  style={{ color: city.color }}
                >
                  D{city.days}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Flight return indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            <Plane className="w-3 h-3 text-gray-600" />
            <span className="text-[10px] text-gray-600">D15 · Vuelta a casa</span>
          </motion.div>
        </motion.div>
      </div>

      {/* === Scroll Indicator === */}
      <motion.button
        onClick={() => {
          const ruta = document.getElementById('ruta');
          if (ruta) ruta.scrollIntoView({ behavior: 'smooth' });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors cursor-pointer group"
      >
        <span className="text-xs font-medium uppercase tracking-wider group-hover:text-primary transition-colors">
          Explorar
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Gradient title animation keyframes */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
