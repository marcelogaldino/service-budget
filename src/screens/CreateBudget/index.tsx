import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Button } from "@/components/Button";
import { Check } from "@/assets/icons/Check";
import { Shop } from "@/assets/icons/Shop";
import { Tag } from "@/assets/icons/Tag";
import { Status } from "@/components/Status";
import { StatusTypes } from "@/components/Status/strategies/status-stategy";
import { NoteWithText } from "@/assets/icons/NoteWithText";
import { Plus } from "@/assets/icons/Plus";
import { CreditCard } from "@/assets/icons/CreditCard";
import { RadioButton } from "@/components/RadioButton";
import { EditPen } from "@/assets/icons/EditPen";
import { colors } from "@/shared/colors";
import { useStorage } from "@/hooks/useStorage";
import { BudgetDoc, Item } from "@/shared/storage/types/budget";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { NewService } from "./NewService";
import { AppTextInput } from "@/components/AppTextInput";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackParamsList } from "@/routes";

type DetailsBudgetRouteProp = RouteProp<StackParamsList, "DetailsBudget">;

export const CreateBudget = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheetContext();
  const { setValue, value } = useStorage<BudgetDoc[]>("BudgetDoc");
  const [title, setTitle] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [discount, setDiscount] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<StatusTypes>(
    StatusTypes.RASCUNHO,
  );

  const route = useRoute<DetailsBudgetRouteProp>();
  const { budget } = route.params;

  const navigation = useNavigation<NavigationProp<StackParamsList>>();

  const handleAddItem = (itemData: {
    id?: string;
    name: string;
    description: string;
    price: number;
    qty: number;
  }) => {
    if (itemData.id) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemData.id
            ? {
                ...item,
                name: itemData.name,
                description: itemData.description,
                price: itemData.price,
                qty: itemData.qty,
              }
            : item,
        ),
      );
    } else {
      const newItem: Item = {
        id: Math.random().toString(36).substring(2, 10),
        name: itemData.name,
        description: itemData.description,
        price: itemData.price,
        qty: itemData.qty,
      };
      setItems((prev) => [...prev, newItem]);
    }
  };

  const handleOpenNewService = () => {
    openBottomSheet(
      <NewService onpress={closeBottomSheet} onSave={handleAddItem} />,
      0,
    );
  };

  const handleEditNewService = (initialData: Item) => {
    const handleUpdate = (itemData: {
      name: string;
      description: string;
      price: number;
      qty: number;
    }) => {
      handleAddItem({ ...itemData, id: initialData.id });
    };

    const handleDelete = () => {
      setItems((prev) => prev.filter((item) => item.id !== initialData.id));
      closeBottomSheet();
    };

    openBottomSheet(
      <NewService
        onpress={closeBottomSheet}
        onSave={handleUpdate}
        onDelete={handleDelete}
        initialData={initialData}
      />,
      0,
    );
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  const calculateDiscount = () => {
    const discountPct = parseFloat(discount) || 0;
    return (calculateSubtotal() * discountPct) / 100;
  };

  const handleSaveBudget = () => {
    if (!title.trim() || !customer.trim() || items.length === 0) {
      return;
    }

    const existingBudgets = Array.isArray(value) ? value : [];

    if (budget) {
      const data = existingBudgets.filter(
        (budgetItem) => budgetItem.id !== budget.id,
      );
      const editedBudget = existingBudgets.map((budgetItem) =>
        budgetItem.id === budget.id
          ? {
              ...budgetItem,
              title: title,
              client: customer,
              status: selectedStatus,
              items: items,
              discountPct: Number(discount),
              createdAt: new Date(),
            }
          : budgetItem,
      );

      setValue([...editedBudget]);
      navigation.navigate("DetailsBudget", {
        budget: {
          id: budget.id,
          title: title,
          client: customer,
          status: selectedStatus,
          items: items,
          discountPct: Number(discount),
          createdAt: new Date(),
        },
      });
      return;
    }

    const budgetData: BudgetDoc = {
      id: Math.random().toString(36).substring(2, 10),
      client: customer,
      title,
      status: selectedStatus,
      items,
      discountPct: parseFloat(discount) || undefined,
      createdAt: new Date(),
    };

    setValue([...existingBudgets, budgetData]);
    navigation.navigate("DetailsBudget", { budget: budgetData });
  };

  useEffect(() => {
    if (budget) {
      setCustomer(budget.client);
      setTitle(budget.title);
      setDiscount(budget.discountPct ? budget.discountPct.toString() : "");
      setItems(budget.items);
      setSelectedStatus(budget.status);
    }
  }, [budget]);

  return (
    <View className="flex-1 bg-white">
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View className="border border-gray-300 rounded-lg mb-5">
                <View className="h-[40px] border-b border-gray-300 p-3">
                  <View className="flex-row items-center justify-start gap-2">
                    <Shop size={14} color="#6A46EB" />
                    <Text className="font-normal text-xs text-gray-500">
                      Informações gerais
                    </Text>
                  </View>
                </View>

                <AppTextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Título"
                />

                <AppTextInput
                  value={customer}
                  onChangeText={setCustomer}
                  placeholder="Cliente"
                />
              </View>

              <View className="border border-gray-300 rounded-lg mb-5">
                <View className="h-[40px] border-b border-gray-300 p-3">
                  <View className="flex-row items-center justify-start gap-2">
                    <Tag size={14} color="#6A46EB" />
                    <Text className="font-normal text-xs text-gray-500">
                      Status
                    </Text>
                  </View>
                </View>

                <View className="p-4 gap-2">
                  <View className="flex-row justify-start gap-6 items-center">
                    <RadioButton
                      isSelected={selectedStatus === StatusTypes.RASCUNHO}
                      onPress={() => setSelectedStatus(StatusTypes.RASCUNHO)}
                    />
                    <Status statusType={StatusTypes.RASCUNHO} />
                    <RadioButton
                      isSelected={selectedStatus === StatusTypes.APROVADO}
                      onPress={() => setSelectedStatus(StatusTypes.APROVADO)}
                    />

                    <Status statusType={StatusTypes.APROVADO} />
                  </View>
                  <View className="flex-row justify-start gap-6 items-center">
                    <RadioButton
                      isSelected={selectedStatus === StatusTypes.ENVIADO}
                      onPress={() => setSelectedStatus(StatusTypes.ENVIADO)}
                    />

                    <Status statusType={StatusTypes.ENVIADO} />
                    <RadioButton
                      isSelected={selectedStatus === StatusTypes.RECUSADO}
                      onPress={() => setSelectedStatus(StatusTypes.RECUSADO)}
                    />

                    <Status statusType={StatusTypes.RECUSADO} />
                  </View>
                </View>
              </View>

              <View className="border border-gray-300 rounded-lg mb-5">
                <View className="h-[40px] border-b border-gray-300 p-3">
                  <View className="flex-row items-center justify-start gap-2">
                    <NoteWithText size={14} color="#6A46EB" />
                    <Text className="font-normal text-xs text-gray-500">
                      Serviços inclusos
                    </Text>
                  </View>
                </View>

                <View className="p-4 gap-2">
                  {items.map((item) => (
                    <View
                      key={item.id}
                      className="flex-row justify-center mb-5"
                    >
                      <View className="flex-1">
                        <Text className="font-bold text-sm leading-5 text-gray-700 mb-[2px]">
                          {item.name}
                        </Text>
                        <Text className="font-normal text-xs leading-4 text-gray-500">
                          {item.description.length > 35
                            ? item.description.substring(0, 35) + "..."
                            : item.description}
                        </Text>
                      </View>

                      <View className=" items-end justify-center">
                        <Text className="font-normal text-xs leading-4 text-gray-700 mb-[2px]">
                          R${" "}
                          <Text className="font-bold text-base leading-5 text-gray-700">
                            {((item.price * item.qty) / 100).toLocaleString(
                              "pt-BR",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </Text>
                        </Text>
                        <Text className="font-normal text-xs leading-4 text-gray-600 ">
                          Qt: {item.qty}
                        </Text>
                      </View>

                      <TouchableOpacity
                        className="ml-4 justify-center"
                        onPress={() => handleEditNewService(item)}
                      >
                        <EditPen size={20} color={colors["purple-base"]} />
                      </TouchableOpacity>
                    </View>
                  ))}

                  <Button
                    onPress={handleOpenNewService}
                    name="Adiocionar serviço"
                    mode="outline"
                    icon={<Plus color="#6A46EB" />}
                  />
                </View>
              </View>

              <View className="border border-gray-300 rounded-lg mb-5">
                <View className="h-[40px] border-b border-gray-300 p-3">
                  <View className="flex-row items-center justify-start gap-2">
                    <CreditCard size={14} color="#6A46EB" />
                    <Text className="font-normal text-xs text-gray-500">
                      Investimento
                    </Text>
                  </View>
                </View>

                <View className="p-4 gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="font-normal text-sm text-gray-700">
                      Subtotal
                    </Text>
                    <View className="flex-row gap-3 justify-center items-center">
                      <Text className="font-normal text-xs text-gray-600">
                        {items.length} {items.length === 1 ? "item" : "itens"}
                      </Text>
                      <View className="flex-row justify-center items-center">
                        <Text className="font-normal text-xs leading-4 text-gray-700">
                          R${" "}
                          <Text className="font-normal text-sm leading-5 text-gray-700">
                            {(calculateSubtotal() / 100).toLocaleString(
                              "pt-BR",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row gap-2 justify-center items-center">
                      <Text className="font-normal text-sm text-gray-700">
                        Desconto
                      </Text>
                      <View className="w-[75px] h-[42px] px-3 items-center justify-center bg-gray-100 border border-gray-300 rounded-full flex-row">
                        <TextInput
                          className="flex-1 items-center justify-center text-sm font-normal text-gray-700"
                          placeholder="0"
                          keyboardType="numeric"
                          value={discount}
                          onChangeText={setDiscount}
                        />
                        <Text className="font-bold text-base text-gray-600">
                          %
                        </Text>
                      </View>
                    </View>
                    {discount && parseFloat(discount) > 0 && (
                      <Text className="font-normal text-xs leading-4 text-danger-base">
                        - R${" "}
                        <Text className="font-normal text-sm leading-5 text-danger-base">
                          {(calculateDiscount() / 100).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Text>
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        <View className="flex-row justify-center items-center gap-4 px-5 pt-5 pb-10 w-full bg-white border-t border-gray-200">
          <Button name="Cancelar" mode="outline" />
          <Button
            onPress={handleSaveBudget}
            name="Salvar"
            icon={<Check color="#FFFFFF" />}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
