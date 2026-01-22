import { AsyncStorageAdapter } from "../adapters/AsyncStorageAdapter";
import { IStorageAdapter, StorageType } from "../types/storage";

export class StorageFactory {
  private static instance: IStorageAdapter;

  static createStorage(type: StorageType = "async-storage"): IStorageAdapter {
    if (this.instance) {
      return this.instance;
    }

    switch (type) {
      case "async-storage":
        this.instance = new AsyncStorageAdapter();
        break;
      case "sqlite":
        // this.instance = new SQLiteAdapter();
        break;
      default:
        this.instance = new AsyncStorageAdapter();
    }

    return this.instance;
  }

  static getInstance(): IStorageAdapter {
    if (!this.instance) {
      this.instance = new AsyncStorageAdapter();
    }
    return this.instance;
  }
}
