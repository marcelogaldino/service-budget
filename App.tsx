import "./src/styles/global.css";
import { StatusBar } from "expo-status-bar";
import { Routes } from "@/routes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="bg-white flex-1">
      <Routes />
      <StatusBar style="dark" translucent backgroundColor="transparent" />
    </SafeAreaView>
  );
}
