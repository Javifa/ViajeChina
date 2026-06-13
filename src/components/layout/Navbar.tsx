import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MapPin,
  Calendar,
  Wallet,
  CheckSquare,
  Smartphone,
  Compass,
  Heart,
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
  const navigate = useNavigate();
  const location = useLocation();
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
    if (id === 'wishlist') {
      navigate('/wishlist');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
              <div className="w-px h-5 bg-dark-border/50 mx-1" />
              <button
                onClick={() => scrollToSection('wishlist')}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/wishlist'
                    ? 'text-primary bg-primary/10 border border-primary/20'
                    : 'text-gray-400 hover:text-white hover:bg-dark-elevated/50 border border-transparent'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </button>
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

            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
