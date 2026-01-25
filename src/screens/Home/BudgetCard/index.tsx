import { Status } from "@/components/Status";
import { StatusTypes } from "@/components/Status/strategies/status-stategy";
import { StackParamsList } from "@/routes";
import { BudgetDoc } from "@/shared/storage/types/budget";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface BudgetCardProps {
  budget: BudgetDoc;
  status: StatusTypes;
  title: string;
  customer: string;
  totalPrice: string;
}

export const BudgetCard: FC<BudgetCardProps> = ({
  budget,
  status,
  customer,
  title,
  totalPrice,
}) => {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailsBudget", { budget })}
      className="w-full bg-gray-100 border border-gray-200 rounded-[10px] mt-2 p-4"
    >
      <View className="flex-row items-center justify-between mb-3">
        <Text className="flex-1 mr-2 text-[16px] font-bold text-gray-700">
          {title}
        </Text>
        <Status statusType={status} />
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-sm font-normal text-gray-600">{customer}</Text>
        <View className="flex-row justify-center items-center">
          <Text className="text-[12px] font-normal text-gray-700 mr-1">R$</Text>
          <Text className="text-[16px] font-bold text-gray-700">
            {totalPrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
