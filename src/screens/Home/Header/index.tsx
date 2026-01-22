import { Plus } from "@/assets/icons/Plus";
import { Button } from "@/components/Button";
import { StackParamsList } from "@/routes";
import { colors } from "@/shared/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Text, View } from "react-native";

interface HeaderProps {
  draftCount: number;
}

export const Header: FC<HeaderProps> = ({ draftCount }) => {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();

  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 pb-5 mb-5">
      <View className="flex-col">
        <Text className="text-purple-base text-lg font-bold p-[2] leading-[140%]">
          Orçamentos
        </Text>
        <Text className="text-gray-500 text-sm font-normal leading-[140%]">
          Você tem {draftCount} {draftCount === 1 ? "item" : "itens"} em
          rascunho
        </Text>
      </View>
      <Button
        onPress={() => navigation.navigate("CreateBudget")}
        name="Novo"
        mode="filled"
        icon={<Plus color={colors.white} size={24} />}
      />
    </View>
  );
};
