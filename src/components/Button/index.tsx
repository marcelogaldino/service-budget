import clsx from "clsx";
import { FC } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonMode = "filled" | "outline";

interface ButtonProps extends TouchableOpacityProps {
  name: string;
  mode?: ButtonMode;
  icon?: React.JSX.Element;
}

export const Button: FC<ButtonProps> = ({
  name,
  mode = "filled",
  icon,
  ...props
}) => {
  const isFill = mode === "filled";

  return (
    <TouchableOpacity
      className={clsx(
        "flex-row items-center justify-center gap-2 py-3 px-5 rounded-3xl",
        {
          "bg-purple-base": isFill,
          "bg-gray-100 border-gray-300 border": !isFill,
        }
      )}
      {...props}
    >
      {icon}
      <Text
        className={clsx(
          "font-bold text-sm",
          isFill ? "text-white" : "text-purple-base"
        )}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
