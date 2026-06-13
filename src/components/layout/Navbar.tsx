import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MapPin,
  Calendar,
  Wallet,
  CheckSquare,
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
  { id: 'itinerario', label: 'Ruta', icon: <Calendar className="w-4 h-4" /> },
  { id: 'mapa', label: 'Mapa', icon: <MapPin className="w-4 h-4" /> },
  { id: 'lugares', label: 'Lugares', icon: <Compass className="w-4 h-4" /> },
  { id: 'presupuesto', label: 'Presupuesto', icon: <Wallet className="w-4 h-4" /> },
  { id: 'herramientas', label: 'Herramientas', icon: <CheckSquare className="w-4 h-4" /> },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeSection = location.pathname.substring(1);
  const [scrolled, setScrolled] = useState(false);
  const { progress } = useTripContext();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavigation = (id: string) => {
    navigate(`/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              onClick={() => { navigate('/'); window.scrollTo(0,0); }}
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
                  onClick={() => handleNavigation(link.id)}
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
                onClick={() => handleNavigation('wishlist')}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === 'wishlist'
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
