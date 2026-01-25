import { Multiply } from "@/assets/icons/Multiply";
import { Button } from "@/components/Button";
import { RadioButton } from "@/components/RadioButton";
import { Status } from "@/components/Status";
import { StatusTypes } from "@/components/Status/strategies/status-stategy";
import { colors } from "@/shared/colors";
import Checkbox from "expo-checkbox";
import { FC, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type SortType = "recent" | "oldest" | "highest" | "lowest";

interface ModalFilterProps {
  selectedStatuses: StatusTypes[];
  selectedSort: SortType;
  onApply: (statuses: StatusTypes[], sort: SortType) => void;
  onClear: () => void;
}

export const ModalFilter: FC<ModalFilterProps> = ({
  selectedStatuses,
  selectedSort,
  onApply,
  onClear,
}) => {
  const [statuses, setStatuses] = useState<StatusTypes[]>(selectedStatuses);
  const [sort, setSort] = useState<SortType>(selectedSort);

  const toggleStatus = (status: StatusTypes) => {
    setStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const allStatuses = [
    StatusTypes.APROVADO,
    StatusTypes.ENVIADO,
    StatusTypes.RASCUNHO,
    StatusTypes.RECUSADO,
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-start justify-between p-5 border-b border-gray-200">
        <Text className="font-bold text-sm leading-5 text-gray-700">
          Filtrar e ordenar
        </Text>
        <TouchableOpacity onPress={onClear}>
          <Multiply />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-5">
          <Text className="text-xs font-normal text-gray-500 mb-3">Status</Text>

          {allStatuses.map((statusType) => (
            <View key={statusType} className="mt-3">
              <TouchableOpacity
                className="flex-row items-center gap-3 py-1"
                onPress={() => toggleStatus(statusType)}
              >
                <Checkbox
                  value={statuses.includes(statusType)}
                  onValueChange={() => toggleStatus(statusType)}
                  className="rounded-md"
                  color={
                    statuses.includes(statusType)
                      ? colors["purple-base"]
                      : undefined
                  }
                />
                <Status statusType={statusType} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View className="p-5 border-t border-gray-200">
          <Text className="text-xs font-normal text-gray-500 mb-3">
            Ordenação
          </Text>

          <View className="mt-3">
            <TouchableOpacity
              className="flex-row items-center gap-3 py-1"
              onPress={() => setSort("recent")}
            >
              <RadioButton
                isSelected={sort === "recent"}
                onPress={() => setSort("recent")}
              />
              <Text className="text-sm text-gray-700">Mais recente</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-3">
            <TouchableOpacity
              className="flex-row items-center gap-3 py-1"
              onPress={() => setSort("oldest")}
            >
              <RadioButton
                isSelected={sort === "oldest"}
                onPress={() => setSort("oldest")}
              />
              <Text className="text-sm text-gray-700">Mais antigo</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-3">
            <TouchableOpacity
              className="flex-row items-center gap-3 py-1"
              onPress={() => setSort("highest")}
            >
              <RadioButton
                isSelected={sort === "highest"}
                onPress={() => setSort("highest")}
              />
              <Text className="text-sm text-gray-700">Maior valor</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-3">
            <TouchableOpacity
              className="flex-row items-center gap-3 py-1"
              onPress={() => setSort("lowest")}
            >
              <RadioButton
                isSelected={sort === "lowest"}
                onPress={() => setSort("lowest")}
              />
              <Text className="text-sm text-gray-700">Menor valor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View className="p-5 border-t border-gray-200">
        <Button
          onPress={() => onApply(statuses, sort)}
          name="Aplicar filtros"
        />
      </View>
    </View>
  );
};
