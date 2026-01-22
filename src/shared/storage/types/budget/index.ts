import { StatusTypes } from "@/components/Status/strategies/status-stategy";

interface Item {
  id: string;
  description: string;
  qty: number;
  price: number;
}

export interface BudgetDoc {
  id: string;
  client: string;
  title: string;
  items: Item[];
  discountPct?: number;
  status: StatusTypes;
  createdAt: Date;
  updatedAt?: Date;
}
