import { useState, useEffect, useCallback } from "react";
import { StorageFactory } from "@/shared/storage/StorageFactory";

export function useStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | null>(
    initialValue ?? null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const storage = StorageFactory.getInstance();

  // Carrega o valor inicial
  useEffect(() => {
    loadValue();
  }, [key]);

  const loadValue = async () => {
    try {
      setLoading(true);
      const value = await storage.getItem<T>(key);
      setStoredValue(value ?? initialValue ?? null);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const setValue = useCallback(
    async (value: T) => {
      try {
        setLoading(true);
        await storage.setItem(key, value);
        setStoredValue(value);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [key],
  );

  const removeValue = useCallback(async () => {
    try {
      setLoading(true);
      await storage.removeItem(key);
      setStoredValue(null);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    loading,
    error,
    reload: loadValue,
  };
}
