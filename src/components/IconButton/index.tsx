import { colors } from "@/shared/colors";
import { FC, PropsWithChildren } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ICONS, IconTypes } from "./strategies/icon-data-strategy";
import clsx from "clsx";

interface IconButtonProps extends TouchableOpacityProps {
  iconType: IconTypes;
  isSearchTyping?: boolean;
}

export const IconButton: FC<PropsWithChildren<IconButtonProps>> = ({
  iconType,
  isSearchTyping = false,
  ...rest
}) => {
  const iconData = ICONS[iconType];
  const IconComponent = iconData.Icon;

  return (
    <TouchableOpacity
      className={clsx(
        "rounded-full h-12 w-12 items-center justify-center border border-gray-300",
        {
          "bg-purple-base": isSearchTyping,
          "bg-gray-100": !isSearchTyping,
        }
      )}
      {...rest}
    >
      <IconComponent
        size={24}
        color={isSearchTyping ? colors.white : iconData.color}
      />
    </TouchableOpacity>
  );
};
