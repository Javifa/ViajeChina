import { Heart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { id: 'itinerario', label: 'Ruta' },
  { id: 'mapa', label: 'Mapa' },
  { id: 'lugares', label: 'Lugares' },
  { id: 'presupuesto', label: 'Presupuesto' },
  { id: 'herramientas', label: 'Herramientas' },
];

const cities = [
  { name: 'Shanghái', color: 'text-city-shanghai' },
  { name: 'Zhangjiajie', color: 'text-city-zhangjiajie' },
  { name: 'Chongqing', color: 'text-city-chongqing' },
  { name: 'Chengdu', color: 'text-city-chengdu' },
  { name: 'Pekín', color: 'text-city-beijing' },
];


export default function Footer() {
  return (
    <footer className="relative bg-dark-bg border-t border-dark-border/30">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                China 2026
              </span>
              <span className="text-lg">🇨🇳</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              15 días recorriendo las ciudades más increíbles de China.
              Una aventura para 7 amigos que nunca olvidaremos.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {cities.map((city) => (
                <span
                  key={city.name}
                  className={`text-xs font-medium px-2 py-1 rounded-full bg-dark-elevated/80 ${city.color}`}
                >
                  {city.name}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Secciones
            </h3>
            <nav className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.id}
                  to={`/${link.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-sm text-gray-500 hover:text-primary transition-colors text-left py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Detalles del viaje
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>📅 1 - 15 Septiembre 2026</li>
              <li>👥 7 viajeros</li>
              <li>🏙️ 5 ciudades</li>
              <li>🚄 4 trenes de alta velocidad</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-dark-border/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 flex items-center gap-1 flex-wrap justify-center">
              China 2026 🇨🇳 - Hecho con
              <Heart className="w-3.5 h-3.5 text-primary fill-primary inline" />
              para la mejor aventura
            </p>
            <p className="text-xs text-gray-700">
              © {new Date().getFullYear()} China 2026. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
