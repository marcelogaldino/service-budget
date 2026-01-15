import { View } from "react-native";
import { Header } from "./Header";
import { FilterInput } from "./FilterInput";

export const Home = () => {
  return (
    <View className="bg-white flex-1">
      <Header />
      <FilterInput />
    </View>
  );
};
