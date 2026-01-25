import { CreateBudget } from "@/screens/CreateBudget";
import { DetailsBudget } from "@/screens/DetailsBudget";
import { Home } from "@/screens/Home";
import { BudgetDoc } from "@/shared/storage/types/budget";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackParamsList = {
  Home: undefined;
  CreateBudget: undefined;
  DetailsBudget: { budget: BudgetDoc };
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
        <Stack.Screen name="DetailsBudget" component={DetailsBudget} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
