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
import { useState } from "react";
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

export const CreateBudget = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

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

                <View className="p-4 gap-2">
                  <TextInput
                    className="w-full h-[48px] bg-gray-100 border border-gray-300 rounded-full px-4 py-3 text-base font-normal"
                    placeholder="Título"
                  />

                  <TextInput
                    className="w-full h-[48px] bg-gray-100 border border-gray-300 rounded-full px-4 py-3 text-base font-normal"
                    placeholder="Cliente"
                  />
                </View>
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
                  <View className="flex-row justify-center mb-5">
                    <View className="flex-1">
                      <Text className="font-bold text-sm leading-5 text-gray-700 mb-[2px]">
                        Design de interfaces
                      </Text>
                      <Text className="font-normal text-xs leading-4 text-gray-500">
                        Criação de wireframes e protóti...
                      </Text>
                    </View>

                    <View className=" items-end justify-center">
                      <View className="flex-row justify-center items-center mb-[2px]">
                        <Text className="font-normal text-xs leading-4 text-gray-700">
                          R${"  "}
                        </Text>
                        <Text className="font-bold text-base leading-5 text-gray-700">
                          3.847,50
                        </Text>
                      </View>
                      <Text className="font-normal text-xs leading-4 text-gray-600 ">
                        Qt: 1
                      </Text>
                    </View>

                    <TouchableOpacity className="ml-4 justify-center">
                      <EditPen size={20} color={colors["purple-base"]} />
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row justify-center mb-5">
                    <View className="flex-1">
                      <Text className="font-bold text-sm leading-5 text-gray-700 mb-[2px]">
                        Design de interfaces
                      </Text>
                      <Text className="font-normal text-xs leading-4 text-gray-500">
                        Criação de wireframes e protóti...
                      </Text>
                    </View>

                    <View className=" items-end justify-center">
                      <View className="flex-row justify-center items-center mb-[2px]">
                        <Text className="font-normal text-xs leading-4 text-gray-700">
                          R${"  "}
                        </Text>
                        <Text className="font-bold text-base leading-5 text-gray-700">
                          3.847,50
                        </Text>
                      </View>
                      <Text className="font-normal text-xs leading-4 text-gray-600 ">
                        Qt: 1
                      </Text>
                    </View>

                    <TouchableOpacity className="ml-4 justify-center">
                      <EditPen size={20} color={colors["purple-base"]} />
                    </TouchableOpacity>
                  </View>

                  <Button
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
                        8 itens
                      </Text>
                      <View className="flex-row justify-center items-center">
                        <Text className="font-normal text-xs leading-4 text-gray-700">
                          R${"  "}
                        </Text>
                        <Text className="font-normal text-sm leading-5 text-gray-700">
                          3.847,50
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
                        />
                        <Text className="font-bold text-base text-gray-600">
                          %
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row justify-center items-center">
                      <Text className="font-normal text-xs leading-4 text-danger-base">
                        - R${" "}
                      </Text>
                      <Text className="font-normal text-sm leading-5 text-danger-base">
                        3.847,50
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        <View className="flex-row justify-center items-center gap-4 px-5 pt-5 pb-10 w-full bg-white border-t border-gray-200">
          <Button name="Cancelar" mode="outline" />
          <Button name="Salvar" icon={<Check color="#FFFFFF" />} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
