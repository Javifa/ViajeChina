import type { CityId } from '../types';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function formatCurrency(amount: number, currency: string = '€'): string {
  return `${amount.toLocaleString('es-ES')}${currency}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function getDaysUntilTrip(): number {
  const tripDate = new Date('2026-09-01T00:00:00');
  const now = new Date();
  const diff = tripDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getHoursUntilTrip(): { days: number; hours: number; minutes: number; seconds: number } {
  const tripDate = new Date('2026-09-01T00:00:00');
  const now = new Date();
  const diff = Math.max(0, tripDate.getTime() - now.getTime());
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function getCityColorClass(cityId: CityId): string {
  const map: Record<CityId, string> = {
    shanghai: 'text-city-shanghai',
    zhangjiajie: 'text-city-zhangjiajie',
    chongqing: 'text-city-chongqing',
    chengdu: 'text-city-chengdu',
    beijing: 'text-city-beijing',
  };
  return map[cityId] || 'text-primary';
}

export function getCityBgClass(cityId: CityId): string {
  const map: Record<CityId, string> = {
    shanghai: 'bg-city-shanghai',
    zhangjiajie: 'bg-city-zhangjiajie',
    chongqing: 'bg-city-chongqing',
    chengdu: 'bg-city-chengdu',
    beijing: 'bg-city-beijing',
  };
  return map[cityId] || 'bg-primary';
}

export function getCityBorderClass(cityId: CityId): string {
  const map: Record<CityId, string> = {
    shanghai: 'border-city-shanghai',
    zhangjiajie: 'border-city-zhangjiajie',
    chongqing: 'border-city-chongqing',
    chengdu: 'border-city-chengdu',
    beijing: 'border-city-beijing',
  };
  return map[cityId] || 'border-primary';
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: 'Pendiente',
    reserved: 'Reservado',
    paid: 'Pagado',
    purchased: 'Comprada',
  };
  return map[status] || status;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending: 'text-status-warning bg-status-warning/10 border-status-warning/30',
    reserved: 'text-status-info bg-status-info/10 border-status-info/30',
    paid: 'text-status-success bg-status-success/10 border-status-success/30',
    purchased: 'text-status-success bg-status-success/10 border-status-success/30',
  };
  return map[status] || '';
}
