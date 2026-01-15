import { Search } from "@/assets/icons/Search";
import { colors } from "@/shared/colors";
import clsx from "clsx";
import { useRef, useState } from "react";
import { TextInput, View } from "react-native";

export const FilterInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current?.isFocused());
    }
  };

  return (
    <View
      className={clsx(
        "flex-row justify-center items-center bg-gray-100 border rounded-3xl",
        {
          "border-purple-base": isFocused,
          "border-gray-300": !isFocused,
        }
      )}
    >
      <View className="ml-4">
        <Search color={isFocused ? colors["purple-base"] : colors.gray[600]} />
      </View>
      <TextInput
        ref={inputRef}
        onFocus={checkFocus}
        onEndEditing={checkFocus}
        className="flex-1 h-12 py-3 px-2 text-gray-700 text-base font-normal"
        placeholder="Título ou cliente"
        placeholderTextColor={colors.gray[500]}
      />
    </View>
  );
};
