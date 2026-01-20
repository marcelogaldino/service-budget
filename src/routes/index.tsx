import { CreateBudget } from "@/screens/CreateBudget";
import { Home } from "@/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackParamsList = {
  Home: undefined;
  CreateBudget: undefined;
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
        <Stack.Screen name="CreateBudget" component={CreateBudget} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
