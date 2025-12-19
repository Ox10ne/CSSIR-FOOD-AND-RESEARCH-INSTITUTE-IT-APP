
import { InventoryItem, AccessRecord } from '../types.ts';
import { INITIAL_INVENTORY, MOCK_ACCESS_LOGS } from '../constants.ts';

const DB_KEYS = {
  INVENTORY: 'twellium_inventory',
  ACCESS_LOGS: 'twellium_access_logs',
};

class DBService {
  private static instance: DBService;

  private constructor() {
    this.seedDefaults();
  }

  public static getInstance(): DBService {
    if (!DBService.instance) {
      DBService.instance = new DBService();
    }
    return DBService.instance;
  }

  private seedDefaults() {
    if (!localStorage.getItem(DB_KEYS.INVENTORY)) {
      localStorage.setItem(DB_KEYS.INVENTORY, JSON.stringify(INITIAL_INVENTORY));
    }
    if (!localStorage.getItem(DB_KEYS.ACCESS_LOGS)) {
      localStorage.setItem(DB_KEYS.ACCESS_LOGS, JSON.stringify(MOCK_ACCESS_LOGS));
    }
  }

  // Inventory Methods
  public getInventory(): InventoryItem[] {
    const data = localStorage.getItem(DB_KEYS.INVENTORY);
    return data ? JSON.parse(data) : [];
  }

  public addInventoryItem(item: InventoryItem) {
    const items = this.getInventory();
    items.unshift(item);
    localStorage.setItem(DB_KEYS.INVENTORY, JSON.stringify(items));
    window.dispatchEvent(new Event('db_update'));
  }

  // Access Logs Methods
  public getAccessLogs(): AccessRecord[] {
    const data = localStorage.getItem(DB_KEYS.ACCESS_LOGS);
    return data ? JSON.parse(data) : [];
  }

  public addAccessRecord(record: AccessRecord) {
    const logs = this.getAccessLogs();
    logs.unshift(record);
    localStorage.setItem(DB_KEYS.ACCESS_LOGS, JSON.stringify(logs));
    window.dispatchEvent(new Event('db_update'));
  }

  public clearLogs() {
    localStorage.setItem(DB_KEYS.ACCESS_LOGS, JSON.stringify([]));
    window.dispatchEvent(new Event('db_update'));
  }
}

export const db = DBService.getInstance();
