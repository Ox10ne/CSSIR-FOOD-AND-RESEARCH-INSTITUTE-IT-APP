
import { InventoryItem, ActivityLog, Vehicle, Camera, AccessRecord } from './types.ts';

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'PRF-001-CLR', name: 'PET Preforms (Clear)', category: 'Plastics / Raw', stockLevel: 85, unit: 'units', zone: 'Zone B-04', status: 'In Stock' },
  { id: 'PKG-202-ROL', name: 'Packaging Wrap (Rolls)', category: 'Packaging', stockLevel: 20, unit: 'rolls', zone: 'Zone C-11', status: 'Low Stock' },
  { id: 'RAW-909-SGR', name: 'Sugar (Bulk Sack)', category: 'Ingredients', stockLevel: 60, unit: 'kg', zone: 'Silo 2', status: 'In Stock' },
  { id: 'CAP-303-BLU', name: 'Bottle Caps (Blue)', category: 'Plastics / Raw', stockLevel: 5, unit: 'units', zone: 'Zone A-01', status: 'Critical' },
  { id: 'FLV-101-ORG', name: 'Orange Flavor Conc.', category: 'Ingredients', stockLevel: 45, unit: 'liters', zone: 'Cold Store 1', status: 'In Stock' },
];

export const MOCK_ACTIVITY: ActivityLog[] = [
  { id: '1', title: 'Batch #A902 Restocked', description: 'Zone B-12', timestamp: '12 mins ago', type: 'restock' },
  { id: '2', title: 'Dispatch Order #442', description: 'Loading Dock', timestamp: '45 mins ago', type: 'dispatch' },
  { id: '3', title: 'Unrecognized ID Scan', description: 'Main Gate', timestamp: '2 hrs ago', type: 'security' },
  { id: '4', title: 'System Update Complete', description: 'Global', timestamp: '3 hrs ago', type: 'system' },
];

export const MOCK_ACCESS_LOGS: AccessRecord[] = [
  { id: 'ACC-001', personName: 'Kwame Mensah', department: 'Logistics', doorName: 'Main Warehouse Entrance', timestamp: '09:42:15', status: 'Authorized', type: 'Entry', avatar: 'https://i.pravatar.cc/150?u=kwame' },
  { id: 'ACC-002', personName: 'Abena Osei', department: 'Production', doorName: 'Silo 2 Admin Door', timestamp: '09:41:02', status: 'Authorized', type: 'Exit', avatar: 'https://i.pravatar.cc/150?u=abena' },
  { id: 'ACC-003', personName: 'Unknown Visitor', department: 'External', doorName: 'Restricted Storage A', timestamp: '09:38:55', status: 'Denied', type: 'Entry' },
  { id: 'ACC-004', personName: 'John Doe', department: 'Maintenance', doorName: 'Main Warehouse Entrance', timestamp: '09:35:10', status: 'Authorized', type: 'Entry', avatar: 'https://i.pravatar.cc/150?u=john' },
  { id: 'ACC-005', personName: 'Sarah Smith', department: 'Quality Control', doorName: 'Loading Dock C', timestamp: '09:30:22', status: 'Authorized', type: 'Entry', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 'ACC-006', personName: 'Michael Koffi', department: 'Logistics', doorName: 'Main Warehouse Entrance', timestamp: '09:28:44', status: 'Tailgating Alert', type: 'Entry', avatar: 'https://i.pravatar.cc/150?u=mike' },
];

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'GH-3920',
    model: 'Actros',
    route: 'Accra → Kumasi',
    driver: 'John D.',
    eta: '2h 15m',
    status: 'On Track',
    progress: 65,
    speed: 82,
    fuel: 76,
    lastCheckpoint: 'Passed Checkpoint Alpha',
    coordinates: { lat: 5.6037, lng: -0.1870 }
  },
  {
    id: 'GH-5592',
    model: 'Volvo',
    route: 'Tema → Ho',
    driver: 'Robert S.',
    eta: '1h 05m',
    status: 'On Track',
    progress: 45,
    speed: 68,
    fuel: 88,
    lastCheckpoint: 'Passing Bypass',
    coordinates: { lat: 5.6666, lng: -0.0166 }
  },
  {
    id: 'GH-1029',
    model: 'Man',
    route: 'Tamale → Wa',
    driver: 'Sarah K.',
    eta: '+45m',
    status: 'Delayed',
    progress: 30,
    speed: 55,
    fuel: 42,
    lastCheckpoint: 'Waiting at Toll',
    coordinates: { lat: 9.4008, lng: -0.8393 }
  },
  {
    id: 'GH-8821',
    model: 'Isuzu',
    route: 'Warehouse B',
    driver: 'Frank P.',
    eta: 'N/A',
    status: 'Stopped',
    progress: 0,
    speed: 0,
    fuel: 95,
    lastCheckpoint: 'Depot 1',
    coordinates: { lat: 5.946, lng: -0.216 }
  }
];

export const MOCK_CAMERAS: Camera[] = [
  { id: 'CAM-01', name: 'Main Gate Entrance', zone: 'Perimeter', status: 'online', aiDetection: 'Vehicle (72%)' },
  { id: 'CAM-02', name: 'South Loading Dock', zone: 'Loading Dock', status: 'online', aiDetection: 'Personnel' },
  { id: 'CAM-03', name: 'Warehouse Aisle 4', zone: 'Warehouse', status: 'warning', lastMotion: '2m ago', aiDetection: 'Unknown Object' },
  { id: 'CAM-04', name: 'PET Production Line', zone: 'Production', status: 'online' },
  { id: 'CAM-05', name: 'North Perimeter', zone: 'Perimeter', status: 'online', lastMotion: '5m ago' },
  { id: 'CAM-06', name: 'Finished Goods Bay', zone: 'Warehouse', status: 'online', aiDetection: 'Forklift' },
  { id: 'CAM-07', name: 'Staff Entrance', zone: 'Perimeter', status: 'online', aiDetection: 'Face Match' },
  { id: 'CAM-08', name: 'Raw Material Silos', zone: 'Production', status: 'offline' },
];
