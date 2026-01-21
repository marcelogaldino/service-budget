import clsx from "clsx";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";

interface RadioButtonProps {
  isSelected: boolean;
  onPress: () => void;
}

export const RadioButton: FC<RadioButtonProps> = ({ isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(`w-6 h-6 rounded-[10px] items-center justify-center`, {
        "border border-gray-400": !isSelected,
        "border-[10px] border-purple-base": isSelected,
      })}
    >
      <View className={clsx(`w-2 h-2 rounded-md bg-white`)} />
    </TouchableOpacity>
  );
};
