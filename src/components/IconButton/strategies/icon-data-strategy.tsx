import { colors } from "@/shared/colors";
import { Filter } from "@/assets/icons/Filter";
import { Plus } from "@/assets/icons/Plus";
import { Search } from "@/assets/icons/Search";
import { Trash } from "@/assets/icons/Trash";
import { Copy } from "@/assets/icons/Copy";
import { EditPen } from "@/assets/icons/EditPen";

export enum IconTypes {
  FILTER = "filter",
  PLUS = "plus",
  SEARCH = "search",
  TRASH = "trash",
  COPY = "copy",
  EDITPEN = "edit-pen",
}

interface IconData {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
}

export const ICONS: Record<IconTypes, IconData> = {
  [IconTypes.FILTER]: {
    Icon: Filter,
    color: colors["purple-base"],
  },
  [IconTypes.PLUS]: {
    Icon: Plus,
    color: colors["purple-base"],
  },
  [IconTypes.SEARCH]: {
    Icon: Search,
    color: colors["purple-base"],
  },
  [IconTypes.TRASH]: {
    Icon: Trash,
    color: colors["danger-base"],
  },
  [IconTypes.COPY]: {
    Icon: Copy,
    color: colors["purple-base"],
  },
  [IconTypes.EDITPEN]: {
    Icon: EditPen,
    color: colors["purple-base"],
  },
};
