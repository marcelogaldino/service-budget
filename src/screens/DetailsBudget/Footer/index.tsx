import { DirectionUpRight } from "@/assets/icons/DirectionUpRight";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { IconTypes } from "@/components/IconButton/strategies/icon-data-strategy";
import { colors } from "@/shared/colors";
import { FC } from "react";
import { View } from "react-native";

interface FooterProps {
  onDelete: () => void;
  onCopy: () => void;
  onEdit?: () => void;
  onShare?: () => void;
}

export const Footer: FC<FooterProps> = ({
  onCopy,
  onDelete,
  onEdit,
  onShare,
}) => {
  return (
    <View className="flex-row justify-center items-baseline gap-4 px-5 pt-5 pb-10 w-full bg-white border-t border-gray-200">
      <IconButton onPress={onDelete} iconType={IconTypes.TRASH} />
      <IconButton onPress={onCopy} iconType={IconTypes.COPY} />
      <IconButton onPress={onEdit} iconType={IconTypes.EDITPEN} />
      <View>
        <Button
          onPress={onShare}
          icon={<DirectionUpRight color={colors.white} />}
          name="Compartilhar"
        />
      </View>
    </View>
  );
};
