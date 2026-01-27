import "./src/styles/global.css";
import { StatusBar } from "expo-status-bar";
import { Routes } from "@/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { StorageFactory } from "@/shared/storage/StorageFactory";
import { STORAGE_CONFIG } from "@/config/storage.config";
import { BottomSheetProvider } from "@/context/bottomsheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function App() {
  const [isReady, setIsready] = useState(false);
  StorageFactory.createStorage(STORAGE_CONFIG.type);

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    setTimeout(() => {
      setIsready(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

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
