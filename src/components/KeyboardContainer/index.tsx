import type { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

type DismissKeyboardViewProps = {
  children: ReactNode;
};

export const KeyboardContainer = ({ children }: DismissKeyboardViewProps) => (
  <SafeAreaView className="flex-1 bg-white">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={20}
      >
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  </SafeAreaView>
);
