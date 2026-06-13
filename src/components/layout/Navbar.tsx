import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  MapPin,
  Calendar,
  Wallet,
  CheckSquare,
  Smartphone,
  Compass,
} from 'lucide-react';
import { useTripContext } from '../../context/TripContext';

interface NavLink {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { id: 'ruta', label: 'Ruta', icon: <Compass className="w-4 h-4" /> },
  { id: 'mapa', label: 'Mapa', icon: <MapPin className="w-4 h-4" /> },
  { id: 'lugares', label: 'Lugares', icon: <Calendar className="w-4 h-4" /> },
  { id: 'presupuesto', label: 'Presupuesto', icon: <Wallet className="w-4 h-4" /> },
  { id: 'checklist', label: 'Checklist', icon: <CheckSquare className="w-4 h-4" /> },
  { id: 'apps', label: 'Apps', icon: <Smartphone className="w-4 h-4" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { progress } = useTripContext();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    const sections = navLinks.map((link) => link.id);
    let currentSection = '';

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 120) {
          currentSection = sectionId;
        }
      }
    }
    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border/50 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                China 2026
              </span>
              <span className="text-lg group-hover:animate-float">🇨🇳</span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-primary'
                      : 'text-gray-400 hover:text-white hover:bg-dark-elevated/50'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Progress + Mobile Menu Button */}
            <div className="flex items-center gap-3">
              {/* Progress indicator */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-24 h-1.5 bg-dark-elevated rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.overallPercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs font-mono text-gray-400">
                  {progress.overallPercent}%
                </span>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-elevated/50 transition-colors"
                aria-label="Toggle navigation menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-dark-surface/95 backdrop-blur-xl border-l border-dark-border/50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Panel Header */}
                <div className="flex items-center justify-between p-4 border-b border-dark-border/50">
                  <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    China 2026 🇨🇳
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-elevated/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress */}
                <div className="px-4 py-3 border-b border-dark-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Progreso del viaje
                    </span>
                    <span className="text-sm font-mono text-primary">
                      {progress.overallPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-dark-elevated rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.overallPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>
                      🏨 {progress.hotelsReserved}/{progress.hotelsTotal}
                    </span>
                    <span>
                      🚄 {progress.trainsReserved}/{progress.trainsTotal}
                    </span>
                    <span>
                      ✅ {progress.checklistDone}/{progress.checklistTotal}
                    </span>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-2">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      onClick={() => scrollToSection(link.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                        activeSection === link.id
                          ? 'text-primary bg-primary/10 border-r-2 border-primary'
                          : 'text-gray-400 hover:text-white hover:bg-dark-elevated/30'
                      }`}
                    >
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Panel Footer */}
                <div className="p-4 border-t border-dark-border/30">
                  <p className="text-xs text-gray-600 text-center">
                    1 Sep 2026 · 15 días · 7 amigos
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
