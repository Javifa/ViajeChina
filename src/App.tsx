import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MapPin, Calendar, Compass, ShoppingBag, CheckSquare, Hotel, UtensilsCrossed, Train, Wallet, Bookmark } from 'lucide-react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Section from './components/layout/Section';
import QuickToolsWidget from './components/widgets/QuickToolsWidget';

import HeroSection from './components/hero/HeroSection';
import TimelineSection from './components/timeline/TimelineSection';
import InteractiveMap from './components/map/InteractiveMap';
import PlacesSection from './components/places/PlacesSection';
import ChecklistSection from './components/checklist/ChecklistSection';
import AppsSection from './components/apps/AppsSection';
import GallerySection from './components/gallery/GallerySection';

import HotelsSection from './components/hotels/HotelsSection';
import RestaurantsSection from './components/restaurants/RestaurantsSection';
import TransportSection from './components/transport/TransportSection';
import NotesSection from './components/notes/NotesSection';

import BudgetDashboard from './components/budget/BudgetDashboard';
import ReservationsPage from './components/reservations/ReservationsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 space-y-10 md:space-y-24">
        <Section id="ruta" title="Ruta del Viaje" subtitle="12 días de aventura" icon={Calendar}>
          <TimelineSection />
        </Section>

        <Section id="mapa" title="Mapa Interactivo" subtitle="La ruta por el gigante asiático" icon={MapPin}>
          <div className="h-[500px] rounded-2xl overflow-hidden border border-dark-border/50 shadow-2xl relative z-0">
            <InteractiveMap />
          </div>
        </Section>

        <Section id="lugares" title="Imprescindibles" subtitle="Los sitios que no nos podemos perder" icon={Compass}>
          <PlacesSection />
        </Section>

        {/* Informative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <Section id="checklist" title="Checklist" subtitle="Que no se nos olvide nada" icon={CheckSquare}>
            <ChecklistSection />
          </Section>
          
          <Section id="apps" title="Apps Necesarias" subtitle="Imprescindibles para sobrevivir en China" icon={ShoppingBag}>
            <AppsSection />
          </Section>
        </div>

        <Section id="galeria" title="Inspiración" subtitle="Lo que nos espera" icon={Compass}>
          <GallerySection />
        </Section>
      </main>
    </>
  );
}

function PlannerPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-dark-bg">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 space-y-10 md:space-y-24">
        
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Planificador</h1>
          <p className="text-gray-400 mb-12">Organiza alojamientos, restaurantes y transportes</p>
        </div>

        <Section id="hoteles" title="Hoteles" subtitle="Gestión de alojamientos" icon={Hotel}>
          <HotelsSection />
        </Section>

        <Section id="restaurantes" title="Restaurantes" subtitle="¿Dónde comeremos?" icon={UtensilsCrossed}>
          <RestaurantsSection />
        </Section>

        <Section id="transporte" title="Transporte" subtitle="Trenes y vuelos internos" icon={Train}>
          <TransportSection />
        </Section>

        <Section id="notas" title="Notas" subtitle="Apuntes y recordatorios" icon={CheckSquare}>
          <NotesSection />
        </Section>

      </main>
    </div>
  );
}

function BudgetPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-dark-bg">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <Section id="presupuesto" title="Presupuesto" subtitle="Control de gastos del viaje" icon={Wallet}>
          <BudgetDashboard />
        </Section>
      </main>
    </div>
  );
}

function ReservationsView() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-dark-bg">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <Section id="reservas" title="Gestión de Reservas" subtitle="Panel central de pagos y reservas" icon={Bookmark}>
          <ReservationsPage />
        </Section>
      </main>
    </div>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-dark-bg text-gray-200">
      <ScrollToTop />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/reservations" element={<ReservationsView />} />
      </Routes>

      <Footer />
      <QuickToolsWidget />
    </div>
  );
}

export default App;
