import { Stack } from "expo-router";

export default function RequestsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007AFF",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Solicitudes",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Nueva Solicitud",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalle de Solicitud",
        }}
      />
    </Stack>
  );
}
