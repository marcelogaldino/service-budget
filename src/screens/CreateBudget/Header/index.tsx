import { ChevronLeft } from "@/assets/icons/ChevronLeft";
import { StackParamsList } from "@/routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export const Header = () => {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();
  return (
    <View className="bg-white flex-row items-center justify-start gap-4 p-5 w-full h-16 border-b border-gray-200">
      <TouchableOpacity onPress={navigation.goBack}>
        <ChevronLeft />
      </TouchableOpacity>
      <Text className="font-bold text-sm leading-5">Orçamento</Text>
    </View>
  );
};
