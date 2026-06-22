import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRequests } from "../../src/hooks/useRequests";
import { RequestStatus } from "../../src/models/Request";

// Componente de tarjeta para cada solicitud
const RequestCard = ({ request, onPress }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDIENTE":
        return "#FF9800";
      case "EN_ATENCION":
        return "#1976D2";
      case "FINALIZADO":
        return "#4CAF50";
      default:
        return "#999";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "ALTA":
        return "#F44336";
      case "MEDIA":
        return "#FF9800";
      case "BAJA":
        return "#4CAF50";
      default:
        return "#999";
    }
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 shadow-sm"
      onPress={onPress}
    >
      {/* Header de la tarjeta */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-gray-800">
          {request.clienteNombre}
        </Text>
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: getStatusColor(request.estado) }}
        >
          <Text className="text-white text-xs font-semibold">
            {request.estado}
          </Text>
        </View>
      </View>

      {/* Body de la tarjeta */}
      <View className="mb-2">
        <Text className="text-base text-gray-600">
          🐾 {request.mascotaNombre}
        </Text>
        <Text className="text-sm text-gray-500">{request.tipoServicio}</Text>
      </View>

      {/* Footer de la tarjeta */}
      <View className="flex-row justify-between items-center">
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: getPriorityColor(request.prioridad) }}
        >
          <Text className="text-white text-xs font-semibold">
            {request.prioridad}
          </Text>
        </View>
        <Text className="text-xs text-gray-400">
          {new Date(request.fechaRegistro).toLocaleDateString("es-PE")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function RequestsListScreen() {
  const { state } = useRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<RequestStatus | "TODOS">(
    "TODOS",
  );

  // Filtrar solicitudes
  const getFilteredRequests = () => {
    let filtered = state.requests;

    if (filterStatus !== "TODOS") {
      filtered = filtered.filter((req) => req.estado === filterStatus);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (req) =>
          req.clienteNombre.toLowerCase().includes(term) ||
          req.mascotaNombre.toLowerCase().includes(term),
      );
    }

    return filtered;
  };

  const filteredRequests = getFilteredRequests();

  // Opciones de filtro
  const statusFilters = [
    { label: "Todos", value: "TODOS" },
    { label: "Pendiente", value: "PENDIENTE" },
    { label: "En Atención", value: "EN_ATENCION" },
    { label: "Finalizado", value: "FINALIZADO" },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Barra de búsqueda */}
      <View className="flex-row items-center bg-white mx-4 mt-4 px-3 rounded-xl border border-gray-200">
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          className="flex-1 py-3 px-2 text-base text-gray-800"
          placeholder="Buscar por cliente o mascota..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#999"
        />
        {searchTerm ? (
          <TouchableOpacity onPress={() => setSearchTerm("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filtros de estado */}
      <View className="flex-row flex-wrap px-4 mt-3">
        {statusFilters.map((item) => (
          <TouchableOpacity
            key={item.value}
            className={`px-4 py-2 rounded-full mr-2 mb-2 ${
              filterStatus === item.value ? "bg-blue-500" : "bg-gray-200"
            }`}
            onPress={() => setFilterStatus(item.value as any)}
          >
            <Text
              className={`text-sm ${
                filterStatus === item.value ? "text-white" : "text-gray-600"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contador de solicitudes */}
      <View className="px-4 py-2">
        <Text className="text-sm text-gray-400">
          {filteredRequests.length} solicitud
          {filteredRequests.length !== 1 ? "es" : ""}
        </Text>
      </View>

      {/* Lista de solicitudes */}
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestCard
            request={item}
            onPress={() => router.push(`/requests/${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        ListEmptyComponent={
          <View className="items-center py-10">
            <Ionicons name="clipboard-outline" size={60} color="#ccc" />
            <Text className="text-base text-gray-400 mt-3">
              {searchTerm ? "No hay coincidencias" : "No hay solicitudes"}
            </Text>
            {!searchTerm && (
              <TouchableOpacity
                className="mt-4 bg-blue-500 px-6 py-2 rounded-lg"
                onPress={() => router.push("/requests/create")}
              >
                <Text className="text-white font-semibold">
                  Crear primera solicitud
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* Botón flotante para crear */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push("/requests/create")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
