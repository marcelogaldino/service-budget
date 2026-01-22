import { ActivityIndicator, FlatList, View } from "react-native";
import { Header } from "./Header";
import { FilterInput } from "./FilterInput";
import { BudgetCard } from "./BudgetCard";
import { useStorage } from "@/hooks/useStorage";
import { colors } from "@/shared/colors";
import { BudgetDoc } from "@/shared/storage/types/budget";
import { useEffect, useState } from "react";
import { EmptyList } from "./EmptyList";

export const Home = () => {
  const { value, loading } = useStorage<BudgetDoc>("BudgetDoc");
  const [data, setData] = useState<BudgetDoc[]>([]);

  useEffect(() => {
    if (value) {
      setData([value]);
    }
  }, [value]);

  const calculateTotal = (budgetDoc: BudgetDoc): number => {
    const subtotal = budgetDoc.items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0,
    );

    const discount = budgetDoc.discountPct || 0;
    return subtotal * (1 - discount / 100);
  };

  if (loading)
    return (
      <ActivityIndicator
        className="flex-1 items-center justify-center"
        color={colors["purple-base"]}
        size={42}
      />
    );

  return (
    <View className="bg-white flex-1 p-5">
      <Header />
      <FilterInput />

      <FlatList
        className="pt-6"
        data={data}
        renderItem={({ item }) => (
          <BudgetCard
            status={item?.status}
            customer={item.client}
            title={item.title}
            totalPrice={calculateTotal(item).toString()}
          />
        )}
        ListEmptyComponent={EmptyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      />
    </View>
  );
};
