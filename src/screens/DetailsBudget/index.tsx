import { StackParamsList } from "@/routes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { Header } from "./Header";
import { Shop } from "@/assets/icons/Shop";
import { colors } from "@/shared/colors";
import { NoteWithText } from "@/assets/icons/NoteWithText";
import { CreditCard } from "@/assets/icons/CreditCard";
import clsx from "clsx";

type DetailsBudgetRouteProp = RouteProp<StackParamsList, "DetailsBudget">;

export const DetailsBudget = () => {
  const route = useRoute<DetailsBudgetRouteProp>();
  const { budget } = route.params;

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
        <View className="bg-gray-100 w-full border h-[196px] border-gray-200 rounded-lg mb-5">
          <View className="flex-row items-center justify-start gap-3  py-4 pl-4 pr-5 border-b border-gray-200">
            <View className="w-9 h-9 bg-purple-light rounded-lg justify-center items-center p-2">
              <Shop color={colors["purple-base"]} />
            </View>
            <Text className="text-lg font-bold">{budget.title}</Text>
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
                    <View className="flex-row justify-center items-center mb-[2px]">
                      <Text className="font-normal text-xs leading-4 text-gray-700">
                        R${"  "}
                      </Text>
                      <Text className="font-bold text-base leading-5 text-gray-700">
                        {((item.price * item.qty) / 100).toLocaleString(
                          "pt-BR",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          },
                        )}
                      </Text>
                    </View>
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
    </>
  );
};
