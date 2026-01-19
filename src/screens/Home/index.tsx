import { View } from "react-native";
import { Header } from "./Header";
import { FilterInput } from "./FilterInput";
import { Status } from "@/components/Status";
import { StatusTypes } from "@/components/Status/strategies/status-stategy";

export const Home = () => {
  return (
    <View className="bg-white flex-1">
      <Header />
      <FilterInput />
      <Status statusType={StatusTypes.ENVIADO} />
      <Status statusType={StatusTypes.RASCUNHO} />
      <Status statusType={StatusTypes.RECUSADO} />
      <Status statusType={StatusTypes.APROVADO} />
    </View>
  );
};
