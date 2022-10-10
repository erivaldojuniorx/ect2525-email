import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Email from "./screens/Email";
import Inbox from "./screens/Inbox";

const Stack = createStackNavigator();

const headerStyle = { backgroundColor: "#f1f5f9" };
const headerTintColor = "#000000";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inbox"
          component={Inbox}
          options={{ title: "Caixa de Entrada", headerStyle, headerTintColor }}
        />
        <Stack.Screen
          name="Email"
          component={Email}
          options={{ title: "", headerStyle, headerTintColor }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
