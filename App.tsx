import "./src/styles/global.css";
import { StatusBar } from "expo-status-bar";
import { Routes } from "@/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { StorageFactory } from "@/shared/storage/StorageFactory";
import { STORAGE_CONFIG } from "@/config/storage.config";

export default function App() {
  StorageFactory.createStorage(STORAGE_CONFIG.type);

  return (
    <SafeAreaView className="bg-white flex-1">
      <Routes />
      <StatusBar style="dark" translucent backgroundColor="transparent" />
    </SafeAreaView>
  );
}
