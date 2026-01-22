import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStorageAdapter } from "../../types/storage";

export class AsyncStorageAdapter implements IStorageAdapter {
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error ao obter item ${key}:`, error);
      return null;
    }
  }
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Erro ao gravar item ${key}:`, error);
      throw error;
    }
  }
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover item ${key}:`, error);
      throw error;
    }
  }
  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return [...keys];
    } catch (error) {
      console.error("Erro ao obter todas as keys:", error);
      return [];
    }
  }
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Erro ao limpar storage:", error);
      throw error;
    }
  }
  async multiGet(keys: string[]): Promise<[string, any][]> {
    try {
      const results = await AsyncStorage.multiGet(keys);
      return results.map(([key, value]) => [
        key,
        value ? JSON.parse(value) : null,
      ]);
    } catch (error) {
      console.error("Erro com o multiGet:", error);
      return [];
    }
  }
  async multiSet(keyValuePairs: [string, any][]): Promise<void> {
    try {
      const pairs: [string, string][] = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(pairs);
    } catch (error) {
      console.error("Erro com o multiSet:", error);
      throw error;
    }
  }
  async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Erro com o multiRemove:", error);
      throw error;
    }
  }
}
