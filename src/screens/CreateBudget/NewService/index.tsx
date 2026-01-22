import { Multiply } from "@/assets/icons/Multiply";
import { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Check } from "@/assets/icons/Check";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { IconTypes } from "@/components/IconButton/strategies/icon-data-strategy";

interface NewServiceProps {
  onpress: () => void;
  onSave: (item: {
    name: string;
    description: string;
    price: number;
    qty: number;
  }) => void;
  initialData?: {
    id: string;
    name: string;
    description: string;
    price: number;
    qty: number;
  };
  onDelete?: () => void;
}

export const NewService: FC<NewServiceProps> = ({
  onpress,
  onSave,
  initialData,
  onDelete,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [value, setValue] = useState(
    initialData?.price
      ? (initialData.price / 100).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "",
  );
  const [qty, setQty] = useState(initialData?.qty || 1);

  const isEditMode = !!initialData;

  const handleIncrement = () => setQty(qty + 1);
  const handleDecrement = () => setQty(Math.max(1, qty - 1));

  const handleValueChange = (text: string) => {
    const numbersOnly = text.replace(/\D/g, "");

    if (numbersOnly === "") {
      setValue("");
      return;
    }

    const numericValue = parseInt(numbersOnly) / 100;

    const formatted = numericValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setValue(formatted);
  };

  const handleSave = () => {
    if (!name.trim() || !value.trim()) {
      return;
    }

    const priceInCents = Math.round(
      parseFloat(value.replace(/\./g, "").replace(",", ".")) * 100,
    );

    onSave({
      name,
      description,
      price: priceInCents,
      qty,
    });

    onpress();
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-start justify-between p-5 border-b border-gray-200">
        <Text className="font-bold text-sm leading-5 text-gray-700">
          Serviço
        </Text>
        <TouchableOpacity onPress={onpress}>
          <Multiply />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 8, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <TextInput
            className="h-[48px] bg-gray-100 border border-gray-300 rounded-full px-4 py-3 mb-3 text-base font-normal"
            value={name}
            onChangeText={setName}
            placeholder="Nome"
          />
        </View>

        <TextInput
          className="min-h-[120px] bg-gray-100 border border-gray-300 rounded-3xl px-4 py-3 mb-2 text-base font-normal"
          value={description}
          onChangeText={setDescription}
          placeholder="Descrição"
          multiline
          textAlignVertical="top"
        />

        <View className="flex-row gap-3 mt-2">
          <View className="flex-1">
            <TextInput
              className="h-[48px] bg-gray-100 border border-gray-300 rounded-full px-4 py-3 text-base font-normal"
              value={value}
              onChangeText={handleValueChange}
              placeholder="R$ 0,00"
              keyboardType="numeric"
            />
          </View>

          <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-full px-2 gap-2">
            <TouchableOpacity
              onPress={handleDecrement}
              className="w-8 h-8 items-center justify-center"
            >
              <Text className="text-purple-base text-xl font-normal">−</Text>
            </TouchableOpacity>

            <Text className="text-gray-700 text-base font-normal min-w-[20px] text-center">
              {qty}
            </Text>

            <TouchableOpacity
              onPress={handleIncrement}
              className="w-8 h-8 items-center justify-center"
            >
              <Text className="text-purple-base text-xl font-normal">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View className="flex-row justify-center items-center gap-4 px-5 py-4 border-t border-gray-200 bg-white">
        {isEditMode && onDelete && (
          <IconButton iconType={IconTypes.TRASH} onPress={onDelete} />
        )}

        <Button
          name="Salvar"
          icon={<Check color="#FFFFFF" />}
          onPress={handleSave}
        />
      </View>
    </View>
  );
};
