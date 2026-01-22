import { StorageType } from "@/shared/storage/types/storage";

// CONFIGURAÇÃO CENTRAL - Troque aqui para mudar o storage em todo a app
export const STORAGE_CONFIG: { type: StorageType } = {
  type: "async-storage", // Mudar para 'sqlite' quando for migrar
};
