import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'motion/react';
import { Map as MapIcon } from 'lucide-react';
import { cities, cityList } from '../../data/cities';
import type { City } from '../../types';

// Create a custom colored divIcon for each city
function createCityIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: 'custom-city-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: ${color};
        border: 3px solid rgba(255,255,255,0.9);
        border-radius: 50%;
        box-shadow: 0 0 12px ${color}80, 0 2px 8px rgba(0,0,0,0.5);
        position: relative;
      ">
        <div style="
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid ${color}40;
          animation: pulse 2s infinite;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -14],
  });
}

// Route polyline coordinates (city order: Shanghai → Zhangjiajie → Chongqing → Beijing)
const routeSegments: { from: City; to: City }[] = [
  { from: cities.shanghai, to: cities.zhangjiajie },
  { from: cities.zhangjiajie, to: cities.chongqing },
  { from: cities.chongqing, to: cities.beijing },
  { from: cities.beijing, to: cities.shanghai },
];

const InteractiveMap: React.FC = () => {
  return (
    <section id="map-section" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <MapIcon className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-medium text-secondary">Mapa interactivo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Nuestra ruta por China
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            4 ciudades, 15 días, 1 aventura épica. Haz clic en cada marcador para ver los detalles.
          </p>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden border border-dark-border/50 bg-dark-surface/80 backdrop-blur-xl"
        >
          {/* City legend */}
          <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5">
            {cityList.map((city) => (
              <div
                key={city.id}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-dark-bg/90 backdrop-blur-sm border border-dark-border/50"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: city.color }}
                />
                <span className="text-[10px] font-medium text-gray-300">{city.name}</span>
                <span className="text-[10px] text-gray-600">{city.nameCn}</span>
              </div>
            ))}
          </div>

          <MapContainer
            center={[32, 112]}
            zoom={5}
            scrollWheelZoom={true}
            className="w-full h-[400px] sm:h-[500px] lg:h-[550px]"
            style={{ background: '#0a0a0f' }}
            zoomControl={false}
          >
            {/* Dark map tiles */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Route polylines */}
            {routeSegments.map((segment, index) => (
              <Polyline
                key={`route-${index}`}
                positions={[
                  [segment.from.coordinates[0], segment.from.coordinates[1]],
                  [segment.to.coordinates[0], segment.to.coordinates[1]],
                ]}
                pathOptions={{
                  color: segment.from.color,
                  weight: 2.5,
                  opacity: 0.5,
                  dashArray: '8, 8',
                }}
              />
            ))}

            {/* City markers */}
            {cityList.map((city) => (
              <Marker
                key={city.id}
                position={[city.coordinates[0], city.coordinates[1]]}
                icon={createCityIcon(city.color)}
              >
                <Popup>
                  <div className="min-w-[220px] p-1 -m-1">
                    {/* Popup header */}
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: city.color }}
                      />
                      <h3 className="font-bold text-sm text-gray-900">
                        {city.name}
                      </h3>
                      <span className="text-xs text-gray-500">{city.nameCn}</span>
                    </div>

                    {/* Days info */}
                    <div className="text-xs text-gray-600 mb-2">
                      📅 Días {city.days[0]} - {city.days[city.days.length - 1]} · {city.days.length} {city.days.length === 1 ? 'día' : 'días'}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-700 mb-2 leading-relaxed">
                      {city.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1">
                      {city.highlights.slice(0, 4).map((h) => (
                        <span
                          key={h}
                          className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-600"
                        >
                          {h}
                        </span>
                      ))}
                      {city.highlights.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500">
                          +{city.highlights.length - 4} más
                        </span>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        {/* Route summary below map */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-4 flex items-center justify-center gap-2 flex-wrap"
        >
          {cityList.map((city, index) => (
            <React.Fragment key={city.id}>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-elevated/60 border border-dark-border/30">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: city.color }}
                />
                <span className="text-xs text-gray-400">{city.name}</span>
                <span className="text-[10px] text-gray-600 font-mono">
                  D{city.days[0]}-{city.days[city.days.length - 1]}
                </span>
              </div>
              {index < cityList.length - 1 && (
                <span className="text-gray-600 text-xs">→</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMap;
