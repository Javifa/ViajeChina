import { motion } from 'motion/react';
import { BedDouble, Train, Ticket, CreditCard, Clock, CheckCircle2 } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import { formatCurrency, getStatusColor, getStatusLabel } from '../../utils/helpers';
import { cities } from '../../data/cities';
import ImportantAlerts from './ImportantAlerts';

export default function ReservationsPage() {
  const { hotels, transport, places } = useTripContext();

  const hotelReservations = hotels.map(h => ({
    id: `hotel-${h.id}`,
    type: 'hotel' as const,
    name: h.name,
    cityId: h.cityId,
    status: h.status,
    price: h.pricePerNight, // simplified
    url: h.bookingUrl || h.tripUrl,
    notes: h.notes,
    date: `Día de llegada (por definir)`,
  }));

  const trainReservations = transport.map(t => ({
    id: `transport-${t.id}`,
    type: 'transport' as const,
    name: `${t.fromCityName} → ${t.toCityName}`,
    cityId: t.fromCity,
    status: t.status,
    price: t.price,
    url: t.bookingUrl,
    notes: t.notes,
    date: `Día ${t.day} - ${t.departureTime}`,
  }));

  const entriesReservations = places
    .filter(p => p.entryPrice && p.entryPrice > 0)
    .map(p => ({
      id: `entry-${p.id}`,
      type: 'entry' as const,
      name: `Entrada: ${p.name}`,
      cityId: p.cityId,
      status: 'pending' as const, // Simplified
      price: p.entryPrice || 0,
      url: p.googleMapsUrl,
      notes: p.notes,
      date: 'Por definir',
    }));

  const allReservations = [...hotelReservations, ...trainReservations, ...entriesReservations];

  const pending = allReservations.filter(r => r.status === 'pending');
  const reserved = allReservations.filter(r => (r.status as string) === 'reserved' || (r.status as string) === 'purchased');
  const paid = allReservations.filter(r => r.status === 'paid');

  const totalSpent = paid.reduce((sum, r) => sum + r.price, 0);
  const totalPending = pending.reduce((sum, r) => sum + r.price, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Panel de Reservas</h2>
        <p className="text-gray-400">
          Gestiona el estado de todos los hoteles, transportes y entradas.
        </p>
      </div>

      {/* Alertas Importantes */}
      <ImportantAlerts />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Pendientes', value: pending.length, icon: Clock, color: 'text-status-warning' },
          { label: 'Reservadas', value: reserved.length, icon: CreditCard, color: 'text-status-info' },
          { label: 'Pagadas', value: paid.length, icon: CheckCircle2, color: 'text-status-success' },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <card.icon size={18} className={card.color} />
              <span className="text-gray-400 font-medium">{card.label}</span>
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-dark-surface border border-dark-border rounded-xl p-4">
          <p className="text-sm text-gray-400">Total Pagado</p>
          <p className="text-2xl font-mono text-status-success">{formatCurrency(totalSpent)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-dark-surface border border-dark-border rounded-xl p-4">
          <p className="text-sm text-gray-400">Total Pendiente (Aprox)</p>
          <p className="text-2xl font-mono text-status-warning">{formatCurrency(totalPending)}</p>
        </motion.div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-4">Todas las Reservas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allReservations.map((res, i) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              className="bg-dark-surface/80 border border-dark-border/50 rounded-2xl p-5 hover:border-dark-border transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {res.type === 'hotel' && <BedDouble size={18} className="text-primary" />}
                  {res.type === 'transport' && <Train size={18} className="text-secondary" />}
                  {res.type === 'entry' && <Ticket size={18} className="text-accent-emerald" />}
                  <h4 className="font-semibold text-white leading-tight">{res.name}</h4>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <div className="flex justify-between">
                  <span>Ciudad:</span>
                  <span className="text-gray-300">{cities[res.cityId]?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fecha:</span>
                  <span className="text-gray-300">{res.date}</span>
                </div>
                <div className="flex justify-between font-mono text-white">
                  <span>Precio:</span>
                  <span>{formatCurrency(res.price)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-dark-border/30">
                <span className={`text-xs px-2.5 py-1 rounded-lg border ${getStatusColor(res.status)}`}>
                  {getStatusLabel(res.status)}
                </span>
                {res.url && (
                  <a href={res.url} target="_blank" rel="noopener noreferrer"
                     className="text-xs text-blue-400 hover:text-blue-300">
                    Abrir enlace →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
