import { ActivityIndicator, FlatList, View } from "react-native";
import { Header } from "./Header";
import { FilterInput } from "./FilterInput";
import { BudgetCard } from "./BudgetCard";
import { useStorage } from "@/hooks/useStorage";
import { colors } from "@/shared/colors";
import { BudgetDoc } from "@/shared/storage/types/budget";
import { useEffect, useState, useMemo, useCallback } from "react";
import { EmptyList } from "./EmptyList";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { StatusTypes } from "@/components/Status/strategies/status-stategy";
import { useFocusEffect } from "@react-navigation/native";
import { ModalFilter } from "./ModalFilter";

type SortType = "recent" | "oldest" | "highest" | "lowest";

export const Home = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheetContext();
  const { value, loading } = useStorage<BudgetDoc[]>("BudgetDoc");
  const [data, setData] = useState<BudgetDoc[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<StatusTypes[]>([]);
  const [sortBy, setSortBy] = useState<SortType>("recent");

  useFocusEffect(
    useCallback(() => {
      if (value) {
        setData(value);
      }
    }, [value]),
  );

  const calculateTotal = (budgetDoc: BudgetDoc): number => {
    const subtotal = budgetDoc.items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0,
    );

    const discount = budgetDoc.discountPct || 0;
    return subtotal * (1 - discount / 100);
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];

    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.client.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((item) =>
        selectedStatuses.includes(item.status),
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "highest":
          return calculateTotal(b) - calculateTotal(a);
        case "lowest":
          return calculateTotal(a) - calculateTotal(b);
        default:
          return 0;
      }
    });

    return sorted;
  }, [data, searchText, selectedStatuses, sortBy]);

  const draftCount = useMemo(() => {
    return data.filter((item) => item.status === StatusTypes.RASCUNHO).length;
  }, [data]);

  const handleApplyFilters = (statuses: StatusTypes[], sort: SortType) => {
    setSelectedStatuses(statuses);
    setSortBy(sort);
    closeBottomSheet();
  };

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setSortBy("recent");
    closeBottomSheet();
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
      <Header draftCount={draftCount} />
      <FilterInput
        onpress={() =>
          openBottomSheet(
            <ModalFilter
              selectedStatuses={selectedStatuses}
              selectedSort={sortBy}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />,
            1,
          )
        }
        onSearchChange={setSearchText}
        hasActiveFilters={selectedStatuses.length > 0 || sortBy !== "recent"}
      />

      <FlatList
        className="pt-6"
        data={filteredAndSortedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BudgetCard
            budget={item}
            status={item?.status}
            customer={item.client}
            title={item.title}
            totalPrice={(calculateTotal(item) / 100).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          />
        )}
        ListEmptyComponent={EmptyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      />
    </View>
  );
};
