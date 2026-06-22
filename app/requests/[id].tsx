import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRequests } from "../../src/hooks/useRequests";
import { RequestStatus } from "../../src/models/Request";

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams();
  const { state, updateRequest, deleteRequest } = useRequests();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequest, setEditedRequest] = useState<any>(null);

  // Buscar la solicitud
  const request = state.requests.find((req) => req.id === id);

  // Cargar datos para edición
  useEffect(() => {
    if (request) {
      setEditedRequest({ ...request });
    }
  }, [request]);

  // Si no se encuentra la solicitud
  if (!request || !editedRequest) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-lg text-gray-600">Solicitud no encontrada</Text>
        <TouchableOpacity
          className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => router.push("/requests")}
        >
          <Text className="text-white font-semibold">Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Opciones de estado
  const statusOptions: { label: string; value: RequestStatus }[] = [
    { label: "Pendiente", value: "PENDIENTE" },
    { label: "En Atención", value: "EN_ATENCION" },
    { label: "Finalizado", value: "FINALIZADO" },
  ];

  // Cambiar estado
  const handleStatusChange = (newStatus: RequestStatus) => {
    Alert.alert(
      "Cambiar Estado",
      `¿Estás seguro de cambiar el estado a "${statusOptions.find((s) => s.value === newStatus)?.label}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cambiar",
          onPress: () => {
            const updated = { ...request, estado: newStatus };
            updateRequest(updated);
            Toast.show({
              type: "success",
              text1: "Estado actualizado",
              position: "bottom",
            });
          },
        },
      ],
    );
  };

  // Eliminar solicitud
  const handleDelete = () => {
    Alert.alert(
      "Eliminar Solicitud",
      "¿Estás seguro de eliminar esta solicitud? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            deleteRequest(request.id);
            Toast.show({
              type: "success",
              text1: "Solicitud eliminada",
              position: "bottom",
            });
            router.push("/requests");
          },
        },
      ],
    );
  };

  // Guardar cambios editados
  const handleSaveEdit = () => {
    if (editedRequest) {
      updateRequest(editedRequest);
      setIsEditing(false);
      Toast.show({
        type: "success",
        text1: "Solicitud actualizada",
        position: "bottom",
      });
    }
  };

  // Obtener colores
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
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white m-4 p-4 rounded-xl shadow-sm">
        {!isEditing ? (
          // === MODO VISTA ===
          <>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold text-gray-800">
                {request.clienteNombre}
              </Text>
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: getStatusColor(request.estado) }}
              >
                <Text className="text-white text-sm font-semibold">
                  {request.estado}
                </Text>
              </View>
            </View>

            {/* Información */}
            <View className="space-y-3">
              <View className="flex-row items-center">
                <Ionicons name="call" size={20} color="#666" />
                <Text className="text-base text-gray-700 ml-3">
                  {request.telefono}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="paw" size={20} color="#666" />
                <Text className="text-base text-gray-700 ml-3">
                  {request.mascotaNombre}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="medkit" size={20} color="#666" />
                <Text className="text-base text-gray-700 ml-3">
                  {request.tipoServicio}
                </Text>
              </View>
              <View className="flex-row items-center">
                <View
                  className="w-3 h-3 rounded-full mr-3"
                  style={{
                    backgroundColor: getPriorityColor(request.prioridad),
                  }}
                />
                <Text className="text-base text-gray-700">
                  Prioridad: {request.prioridad}
                </Text>
              </View>
              <View className="flex-row items-start">
                <Ionicons name="document-text" size={20} color="#666" />
                <Text className="text-base text-gray-700 ml-3 flex-1">
                  {request.descripcion}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="calendar" size={20} color="#666" />
                <Text className="text-base text-gray-700 ml-3">
                  {new Date(request.fechaRegistro).toLocaleDateString("es-PE")}
                </Text>
              </View>
            </View>

            {/* Acciones */}
            <View className="mt-6 space-y-3">
              <Text className="text-sm font-semibold text-gray-600 mb-2">
                Cambiar Estado
              </Text>
              <View className="flex-row gap-2">
                {statusOptions.map((status) => (
                  <TouchableOpacity
                    key={status.value}
                    className={`flex-1 py-2 rounded-lg ${
                      request.estado === status.value
                        ? "bg-blue-500"
                        : "bg-gray-200"
                    }`}
                    onPress={() => handleStatusChange(status.value)}
                  >
                    <Text
                      className={`text-center text-sm font-semibold ${
                        request.estado === status.value
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {status.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View className="flex-row gap-3 mt-4">
                <TouchableOpacity
                  className="flex-1 py-3 rounded-lg bg-blue-500"
                  onPress={() => setIsEditing(true)}
                >
                  <Text className="text-center text-white font-semibold">
                    Editar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 py-3 rounded-lg bg-red-500"
                  onPress={handleDelete}
                >
                  <Text className="text-center text-white font-semibold">
                    Eliminar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          // === MODO EDICIÓN ===
          <>
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Editar Solicitud
            </Text>

            <View className="space-y-3">
              <View>
                <Text className="text-sm font-semibold text-gray-600 mb-1">
                  Cliente
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                  value={editedRequest.clienteNombre}
                  onChangeText={(text) =>
                    setEditedRequest({ ...editedRequest, clienteNombre: text })
                  }
                />
              </View>
              <View>
                <Text className="text-sm font-semibold text-gray-600 mb-1">
                  Teléfono
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                  value={editedRequest.telefono}
                  onChangeText={(text) =>
                    setEditedRequest({ ...editedRequest, telefono: text })
                  }
                  keyboardType="phone-pad"
                />
              </View>
              <View>
                <Text className="text-sm font-semibold text-gray-600 mb-1">
                  Mascota
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                  value={editedRequest.mascotaNombre}
                  onChangeText={(text) =>
                    setEditedRequest({ ...editedRequest, mascotaNombre: text })
                  }
                />
              </View>
              <View>
                <Text className="text-sm font-semibold text-gray-600 mb-1">
                  Descripción
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 text-base min-h-[80px]"
                  value={editedRequest.descripcion}
                  onChangeText={(text) =>
                    setEditedRequest({ ...editedRequest, descripcion: text })
                  }
                  multiline
                />
              </View>

              <View className="flex-row gap-3 mt-4">
                <TouchableOpacity
                  className="flex-1 py-3 rounded-lg bg-gray-300"
                  onPress={() => setIsEditing(false)}
                >
                  <Text className="text-center text-gray-700 font-semibold">
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 py-3 rounded-lg bg-blue-500"
                  onPress={handleSaveEdit}
                >
                  <Text className="text-center text-white font-semibold">
                    Guardar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
