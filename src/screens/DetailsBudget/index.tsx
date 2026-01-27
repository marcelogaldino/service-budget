import { StackParamsList } from "@/routes";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ScrollView, Text, View, Share } from "react-native";
import { Header } from "./Header";
import { Shop } from "@/assets/icons/Shop";
import { colors } from "@/shared/colors";
import { NoteWithText } from "@/assets/icons/NoteWithText";
import { CreditCard } from "@/assets/icons/CreditCard";
import clsx from "clsx";
import { Footer } from "./Footer";
import { useStorage } from "@/hooks/useStorage";
import { BudgetDoc } from "@/shared/storage/types/budget";

type DetailsBudgetRouteProp = RouteProp<StackParamsList, "DetailsBudget">;

export const DetailsBudget = () => {
  const route = useRoute<DetailsBudgetRouteProp>();
  const { budget } = route.params;

  const navigation = useNavigation<NavigationProp<StackParamsList>>();

  const { value, setValue } = useStorage<BudgetDoc[]>("BudgetDoc");

  const handleDelete = () => {
    const data = value && value.filter((item) => item.id !== budget.id);

    if (data !== null) {
      setValue([...data]);
    }

    navigation.navigate("Home");
  };

  const handleCopy = () => {
    if (value) {
      const duplicatedItem: BudgetDoc = {
        id: Math.random().toString(36).substring(2, 10),
        client: budget.client,
        createdAt: new Date(),
        status: budget.status,
        title: budget.title,
        discountPct: budget.discountPct,
        items: budget.items,
      };
      setValue([...value, duplicatedItem]);

      navigation.navigate("Home");
    }
  };

  const handleEdit = () => {
    navigation.navigate("CreateBudget", { budget });
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Orçamento ${budget.id}\nCliente: ${budget.client}\nServiços inclusos: ${budget.items.map((item) => item.name)},\nInvestimento total: ${(
          calculateTotal() / 100
        ).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        title: "Solicitação de orçamento",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Compartilhado com:", result.activityType);
        } else {
          console.log("Compartilhado com sucesso");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Compartilhamento cancelado");
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  const calculateSubtotal = (): number => {
    return budget.items.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  const calculateDiscountAmount = (): number => {
    const subtotal = calculateSubtotal();
    const discount = budget.discountPct || 0;
    return subtotal * (discount / 100);
  };

  const calculateTotal = (): number => {
    return calculateSubtotal() - calculateDiscountAmount();
  };

  return (
    <>
      <Header id={budget.id} status={budget.status} />
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ padding: 20 }}
      >
        <View className="bg-gray-100 border h-[196px] border-gray-200 rounded-lg mb-5">
          <View className="flex-row items-center justify-start gap-3  py-4 pl-4 pr-5 border-b border-gray-200">
            <View className="w-9 h-9 bg-purple-light rounded-lg justify-center items-center p-2">
              <Shop color={colors["purple-base"]} />
            </View>
            <Text className="text-lg font-bold flex-1 flex-shrink">
              {budget.title}
            </Text>
          </View>

          <View className=" py-4 pl-4 pr-5">
            <View className="mb-5 items-start justify-center">
              <Text className="font-normal text-xs text-gray-600 mb-1">
                Cliente
              </Text>
              <Text className="font-normal text-sm text-gray-700">
                {budget.client}
              </Text>
            </View>
            <View className="flex-row gap-16 items-center justify-start">
              <View>
                <Text className="font-normal text-xs text-gray-600 mb-1">
                  Criado em
                </Text>
                <Text className="font-normal text-sm text-gray-700">
                  {new Date(budget.createdAt).toLocaleDateString("pt-BR")}
                </Text>
              </View>
              <View>
                <Text className="font-normal text-xs text-gray-600 mb-1">
                  Atualizado em
                </Text>
                <Text className="font-normal text-sm text-gray-700">
                  {budget.updatedAt
                    ? new Date(budget.updatedAt).toLocaleDateString("pt-BR")
                    : "N/A"}
                </Text>
              </View>
            </View>
          </View>

          <View className="border border-gray-300 rounded-lg mt-10">
            <View className="h-[40px] border-b border-gray-300 p-3">
              <View className="flex-row items-center justify-start gap-2">
                <NoteWithText size={14} color="#6A46EB" />
                <Text className="font-normal text-xs text-gray-500">
                  Serviços inclusos
                </Text>
              </View>
            </View>

            <View className="p-4 gap-2">
              {budget.items.map((item) => (
                <View key={item.id} className="flex-row justify-center mb-5">
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
                </View>
              ))}
            </View>
          </View>

          <View className="w-full h-[116px] mt-4 bg-gray-100 border border-gray-200 rounded-[10px] p-4 gap-4">
            <View className="flex-row gap-4 items-start">
              <View className="bg-purple-light rounded-lg w-9 h-9 justify-center items-center">
                <CreditCard color={colors["purple-base"]} />
              </View>

              <View className="flex-1 gap-2">
                <View className="gap-[2px]">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-normal text-sm text-gray-600">
                      Subtotal
                    </Text>
                    <Text
                      className={clsx("font-bold text-xs text-gray-600", {
                        "line-through":
                          budget.discountPct && budget.discountPct > 0,
                      })}
                    >
                      R${" "}
                      {(calculateSubtotal() / 100).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>

                  {budget.discountPct && budget.discountPct > 0 && (
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row gap-2 items-center">
                        <Text className="font-normal text-sm text-gray-600">
                          Desconto
                        </Text>
                        <View className="bg-[#BFF7BE] px-[6px] py-[2px] rounded-md">
                          <Text className="font-bold text-xs text-[#30752F]">
                            {budget.discountPct}% off
                          </Text>
                        </View>
                      </View>
                      <Text className="font-bold text-xs text-[#30752F]">
                        - R${" "}
                        {(calculateDiscountAmount() / 100).toLocaleString(
                          "pt-BR",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          },
                        )}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="h-[1px] bg-gray-200" />

                <View className="flex-row items-center justify-between">
                  <Text className="font-bold text-sm text-gray-700">
                    Investimento total
                  </Text>
                  <View className="flex-row gap-1 items-baseline">
                    <Text className="font-normal text-xs text-gray-700">
                      R$
                    </Text>
                    <Text className="font-bold text-lg text-gray-700">
                      {(calculateTotal() / 100).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer
        onCopy={handleCopy}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onShare={handleShare}
      />
    </>
  );
};
