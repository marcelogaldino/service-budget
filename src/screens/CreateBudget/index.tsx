import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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

export const CreateBudget = () => {
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
                  <View className="flex-row justify-around">
                    <Status statusType={StatusTypes.RASCUNHO} />
                    <Status statusType={StatusTypes.APROVADO} />
                  </View>
                  <View className="flex-row justify-around">
                    <Status statusType={StatusTypes.ENVIADO} />
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
                  <TextInput
                    className="w-full h-[48px] bg-gray-100 border border-gray-300 rounded-full px-4 py-3 text-base font-normal"
                    placeholder="Título"
                  />

                  <TextInput
                    className="w-full h-[48px] bg-gray-100 border border-gray-300 rounded-full px-4 py-3 text-base font-normal"
                    placeholder="Cliente"
                  />

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
