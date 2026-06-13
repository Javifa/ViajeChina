import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, MapPin, Calendar, Wallet, Menu } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';

const tabs = [
  { id: 'ruta', label: 'Ruta', icon: Compass },
  { id: 'mapa', label: 'Mapa', icon: MapPin },
  { id: 'lugares', label: 'Lugares', icon: Calendar },
  { id: 'presupuesto', label: 'Dinero', icon: Wallet },
];

export default function MobileTabBar() {
  const [activeTab, setActiveTab] = useState('ruta');
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [...tabs.map(t => t.id), 'checklist', 'apps'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check what section is near the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            if (tabs.find(t => t.id === sectionId)) {
              setActiveTab(sectionId);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(id);
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-bg/85 backdrop-blur-xl border-t border-dark-border/50 pb-safe shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`relative flex flex-col items-center justify-center w-16 h-12 transition-all duration-200 active:scale-95 ${
                  isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-400'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110 transition-transform' : ''}`} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
          
          {/* More button */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`relative flex flex-col items-center justify-center w-16 h-12 transition-all duration-200 active:scale-95 ${
              showMoreMenu ? 'text-primary' : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Más</span>
          </button>
        </div>
      </nav>

      {/* "More" Bottom Sheet Menu */}
      {showMoreMenu && (
        <>
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMoreMenu(false)}
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed bottom-[72px] left-0 right-0 z-40 bg-dark-surface/95 backdrop-blur-xl border-t border-dark-border/50 rounded-t-3xl overflow-hidden pb-4"
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
            </div>
            
            <div className="px-6 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('checklist')}
                className="w-full flex items-center justify-between p-4 bg-dark-elevated/50 rounded-2xl active:scale-95 transition-transform border border-dark-border/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    ✓
                  </div>
                  <span className="font-medium text-lg">Checklist de Viaje</span>
                </div>
              </button>
              
              <button 
                onClick={() => scrollToSection('apps')}
                className="w-full flex items-center justify-between p-4 bg-dark-elevated/50 rounded-2xl active:scale-95 transition-transform border border-dark-border/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    📱
                  </div>
                  <span className="font-medium text-lg">Apps Necesarias</span>
                </div>
              </button>
              
              <button 
                onClick={() => scrollToSection('galeria')}
                className="w-full flex items-center justify-between p-4 bg-dark-elevated/50 rounded-2xl active:scale-95 transition-transform border border-dark-border/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                    📸
                  </div>
                  <span className="font-medium text-lg">Inspiración</span>
                </div>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
