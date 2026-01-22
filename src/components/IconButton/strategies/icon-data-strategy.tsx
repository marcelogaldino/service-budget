import { colors } from "@/shared/colors";
import { Filter } from "@/assets/icons/Filter";
import { Plus } from "@/assets/icons/Plus";
import { Search } from "@/assets/icons/Search";
import { Trash } from "@/assets/icons/Trash";

export enum IconTypes {
  FILTER = "filter",
  PLUS = "plus",
  SEARCH = "search",
  TRASH = "trash",
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
};
