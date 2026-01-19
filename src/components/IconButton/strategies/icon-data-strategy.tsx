import { colors } from "@/shared/colors";
import { Filter } from "@/assets/icons/Filter";
import { Plus } from "@/assets/icons/Plus";
import { Search } from "@/assets/icons/Search";

export enum IconTypes {
  FILTER = "filter",
  PLUS = "plus",
  SEARCH = "search",
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
};
