import { colors } from "@/shared/colors";
import { FC } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface AppTextInput extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const AppTextInput: FC<AppTextInput> = ({
  value,
  onChangeText,
  ...props
}) => {
  return (
    <View className="p-4 gap-2">
      <TextInput
        {...props}
        className="h-[48px] bg-gray-100 border border-gray-300 rounded-full px-4 py-3 text-base font-normal"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.gray[500]}
      />
    </View>
  );
};
