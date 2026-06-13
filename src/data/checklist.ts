import type { ChecklistItem } from '../types';

export const defaultChecklist: ChecklistItem[] = [
  { id: 'cl-1', text: 'Pasaporte en vigor (6+ meses)', completed: false, category: 'documents', icon: 'BookOpen' },
  { id: 'cl-2', text: 'Visado China (si necesario)', completed: false, category: 'documents', icon: 'FileText' },
  { id: 'cl-3', text: 'Seguro de viaje', completed: false, category: 'documents', icon: 'Shield' },
  { id: 'cl-4', text: 'Copias de documentos', completed: false, category: 'documents', icon: 'Copy' },
  { id: 'cl-5', text: 'Fotos de pasaporte extra', completed: false, category: 'documents', icon: 'Camera' },
  { id: 'cl-6', text: 'VPN instalada y configurada', completed: false, category: 'tech', icon: 'Lock' },
  { id: 'cl-7', text: 'eSIM / tarjeta SIM china', completed: false, category: 'tech', icon: 'Smartphone' },
  { id: 'cl-8', text: 'Adaptador de enchufes (Tipo A/I)', completed: false, category: 'tech', icon: 'Plug' },
  { id: 'cl-9', text: 'Power bank cargada', completed: false, category: 'tech', icon: 'Battery' },
  { id: 'cl-10', text: 'Alipay configurado', completed: false, category: 'apps', icon: 'Wallet' },
  { id: 'cl-11', text: 'WeChat instalado', completed: false, category: 'apps', icon: 'MessageCircle' },
  { id: 'cl-12', text: 'DiDi instalado', completed: false, category: 'apps', icon: 'Car' },
  { id: 'cl-13', text: 'Amap (高德地图) instalado', completed: false, category: 'apps', icon: 'Map' },
  { id: 'cl-14', text: 'Google Translate (offline chino)', completed: false, category: 'apps', icon: 'Languages' },
  { id: 'cl-15', text: 'Vacunas necesarias', completed: false, category: 'health', icon: 'Syringe' },
  { id: 'cl-16', text: 'Botiquín básico', completed: false, category: 'health', icon: 'Pill' },
  { id: 'cl-17', text: 'Maleta facturar', completed: false, category: 'packing', icon: 'Luggage' },
  { id: 'cl-18', text: 'Mochila de mano', completed: false, category: 'packing', icon: 'Backpack' },
  { id: 'cl-19', text: 'Ropa cómoda para caminar', completed: false, category: 'packing', icon: 'Shirt' },
  { id: 'cl-20', text: 'Zapatillas de trekking', completed: false, category: 'packing', icon: 'Footprints' },
];
