import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-50 items-center justify-center px-5">
      {/* Icono */}
      <View className="w-32 h-32 rounded-full bg-blue-50 items-center justify-center mb-5">
        <Ionicons name="paw" size={80} color="#007AFF" />
      </View>

      {/* Títulos */}
      <Text className="text-4xl font-bold text-blue-500 mb-2">VetCare</Text>
      <Text className="text-xl text-gray-600 mb-5">Clínica Veterinaria</Text>
      <Text className="text-base text-gray-400 text-center mb-10 px-8">
        Gestiona las solicitudes de atención de tus pacientes
      </Text>

      {/* Botón Ingresar */}
      <TouchableOpacity
        className="bg-blue-500 flex-row items-center justify-center py-4 px-10 rounded-xl"
        onPress={() => router.push("/requests")}
      >
        <Text className="text-white text-lg font-semibold mr-2">Ingresar</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
