import { ChevronLeft } from "@/assets/icons/ChevronLeft";
import { Status } from "@/components/Status";
import { StatusTypes } from "@/components/Status/strategies/status-stategy";
import { StackParamsList } from "@/routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderDetailsBudgetParams {
  id: string;
  status: StatusTypes;
}

export const Header: FC<HeaderDetailsBudgetParams> = ({ id, status }) => {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();
  return (
    <View className="bg-white flex-row items-center justify-between gap-4 p-4 w-full h-[66px] border-b border-gray-200">
      <View className="flex-row items-center justify-center gap-4">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <ChevronLeft />
        </TouchableOpacity>
        <Text className="font-bold text-sm leading-5">Orçamento #{id}</Text>
      </View>
      <Status statusType={status} />
    </View>
  );
};
