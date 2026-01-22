export interface IStorageAdapter {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
  getAllKeys(): Promise<string[]>;
  clear(): Promise<void>;
  multiGet(keys: string[]): Promise<[string, any][]>;
  multiSet(keyValuePairs: [string, any][]): Promise<void>;
  multiRemove(keys: string[]): Promise<void>;
}

export type StorageType = "async-storage" | "sqlite";
