import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Email from "./screens/Email";
import Inbox from "./screens/Inbox";
import Reply from "./screens/Reply";
import Forward from "./screens/Forward";

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
          options={{ title: "Inbox", headerStyle, headerTintColor }}
        />
        <Stack.Screen
          name="Email"
          component={Email}
          options={{ title: "", headerStyle, headerTintColor }}
        />
        <Stack.Screen
          name="Reply"
          component={Reply}
          options={{ title: "", headerStyle, headerTintColor }}
        />
        <Stack.Screen
          name="Forward"
          component={Forward}
          options={{ title: "", headerStyle, headerTintColor }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
