import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import "../global.css";
import { RequestProvider } from "../src/context/RequestContext";

export default function RootLayout() {
  return (
    <RequestProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#007AFF",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="requests"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Toast />
    </RequestProvider>
  );
}
