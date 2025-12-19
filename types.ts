
export type ViewState = 'dashboard' | 'inventory' | 'fleet' | 'cctv' | 'access';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stockLevel: number;
  unit: string;
  zone: string;
  status: 'In Stock' | 'Low Stock' | 'Critical';
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'restock' | 'dispatch' | 'security' | 'system';
}

export interface Vehicle {
  id: string;
  model: string;
  route: string;
  driver: string;
  eta: string;
  status: 'On Track' | 'Delayed' | 'Stopped' | 'Alert';
  progress: number;
  speed: number;
  fuel: number;
  lastCheckpoint: string;
  alertMessage?: string;
  coordinates: { lat: number, lng: number };
}

export interface Camera {
  id: string;
  name: string;
  zone: 'Warehouse' | 'Perimeter' | 'Loading Dock' | 'Production';
  status: 'online' | 'offline' | 'warning';
  lastMotion?: string;
  aiDetection?: string;
}

export interface AccessRecord {
  id: string;
  personName: string;
  department: string;
  doorName: string;
  timestamp: string;
  status: 'Authorized' | 'Denied' | 'Tailgating Alert';
  type: 'Entry' | 'Exit';
  avatar?: string;
}
