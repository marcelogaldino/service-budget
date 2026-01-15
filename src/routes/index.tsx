import { Budget } from "@/screens/Budget";
import { Home } from "@/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackParamsList = {
  Home: undefined;
  Budget: undefined;
};

export const Routes = () => {
  const Stack = createNativeStackNavigator<StackParamsList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Budget" component={Budget} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
