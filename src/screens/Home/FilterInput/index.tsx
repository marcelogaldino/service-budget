import { Search } from "@/assets/icons/Search";
import { IconButton } from "@/components/IconButton";
import { IconTypes } from "@/components/IconButton/strategies/icon-data-strategy";
import { colors } from "@/shared/colors";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";

export const FilterInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const inputRef = useRef<TextInput>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current?.isFocused());
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setTextSearch(textSearch);
    }, 500);

    return () => clearTimeout(handler);
  }, [textSearch]);

  return (
    <View className="flex-row items-center gap-3">
      <View
        className={clsx(
          "flex-1 flex-row items-center bg-gray-100 border rounded-3xl",
          {
            "border-purple-base": isFocused,
            "border-gray-300": !isFocused,
          }
        )}
      >
        <View className="ml-4">
          <Search
            color={isFocused ? colors["purple-base"] : colors.gray[600]}
          />
        </View>
        <TextInput
          ref={inputRef}
          onFocus={checkFocus}
          onEndEditing={checkFocus}
          onChangeText={setTextSearch}
          className="flex-1 h-12 py-3 px-4 text-gray-700 text-base font-normal"
          placeholder="Título ou cliente"
          placeholderTextColor={colors.gray[500]}
        />
      </View>
      <IconButton
        iconType={IconTypes.FILTER}
        isSearchTyping={textSearch.length >= 1}
      />
    </View>
  );
};
