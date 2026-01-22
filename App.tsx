import "./src/styles/global.css";
import { StatusBar } from "expo-status-bar";
import { Routes } from "@/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { StorageFactory } from "@/shared/storage/StorageFactory";
import { STORAGE_CONFIG } from "@/config/storage.config";
import { BottomSheetProvider } from "@/context/bottomsheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  StorageFactory.createStorage(STORAGE_CONFIG.type);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white flex-1">
        <BottomSheetProvider>
          <Routes />
        </BottomSheetProvider>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
