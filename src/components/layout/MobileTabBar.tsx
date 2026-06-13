import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass, MapPin, Calendar, Wallet, Menu, Heart } from 'lucide-react';

const tabs = [
  { id: 'itinerario', label: 'Ruta', icon: Compass },
  { id: 'mapa', label: 'Mapa', icon: MapPin },
  { id: 'lugares', label: 'Lugares', icon: Calendar },
  { id: 'presupuesto', label: 'Dinero', icon: Wallet },
];

export default function MobileTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname === '/' ? '' : location.pathname.substring(1);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleNavigation = (id: string) => {
    navigate(`/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                onClick={() => handleNavigation(tab.id)}
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
                onClick={() => handleNavigation('wishlist')}
                className="w-full flex items-center justify-between p-4 bg-dark-elevated/50 rounded-2xl active:scale-95 transition-transform border border-primary/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Heart size={20} />
                  </div>
                  <span className="font-medium text-lg text-white">Wishlist (Nuevo)</span>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('herramientas')}
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
                onClick={() => handleNavigation('galeria')}
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
