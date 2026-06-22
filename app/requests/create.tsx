import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRequests } from "../../src/hooks/useRequests";
import { Request, RequestPriority } from "../../src/models/Request";

export default function CreateRequestScreen() {
  const { addRequest } = useRequests();
  const [loading, setLoading] = useState(false);

  // Estado del formulario
  const [form, setForm] = useState({
    clienteNombre: "",
    telefono: "",
    mascotaNombre: "",
    tipoServicio: "CONSULTA" as const,
    prioridad: "MEDIA" as RequestPriority,
    descripcion: "",
  });

  // Estado de errores
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Opciones de servicio
  const serviceTypes = [
    { label: "Consulta", value: "CONSULTA", icon: "medkit" },
    { label: "Vacunación", value: "VACUNACION", icon: "fitness" },
    { label: "Emergencia", value: "EMERGENCIA", icon: "alert-circle" },
    { label: "Grooming", value: "GROOMING", icon: "cut" },
  ];

  // Opciones de prioridad
  const priorities = [
    { label: "Baja", value: "BAJA", color: "#4CAF50" },
    { label: "Media", value: "MEDIA", color: "#FF9800" },
    { label: "Alta", value: "ALTA", color: "#F44336" },
  ];

  // Validar campo
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "clienteNombre":
        newErrors.clienteNombre = value.trim()
          ? ""
          : "El nombre del cliente es requerido";
        break;
      case "telefono":
        newErrors.telefono = /^[0-9]{9}$/.test(value.trim())
          ? ""
          : "Ingresa un teléfono válido (9 dígitos)";
        break;
      case "mascotaNombre":
        newErrors.mascotaNombre = value.trim()
          ? ""
          : "El nombre de la mascota es requerido";
        break;
      case "descripcion":
        newErrors.descripcion = value.trim()
          ? ""
          : "La descripción es requerida";
        break;
    }

    setErrors(newErrors);
  };

  // Manejar cambio
  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    validateField(field, value);
  };

  // Validar formulario completo
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (!form.clienteNombre.trim()) {
      newErrors.clienteNombre = "El nombre del cliente es requerido";
      isValid = false;
    }

    if (!/^[0-9]{9}$/.test(form.telefono.trim())) {
      newErrors.telefono = "Ingresa un teléfono válido (9 dígitos)";
      isValid = false;
    }

    if (!form.mascotaNombre.trim()) {
      newErrors.mascotaNombre = "El nombre de la mascota es requerido";
      isValid = false;
    }

    if (!form.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Guardar solicitud
  const handleSubmit = () => {
    if (!validateForm()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Por favor, completa todos los campos requeridos",
        position: "bottom",
      });
      return;
    }

    setLoading(true);

    try {
      const newRequest: Request = {
        id: Date.now().toString(),
        ...form,
        estado: "PENDIENTE",
        fechaRegistro: new Date(),
      };

      addRequest(newRequest);

      Toast.show({
        type: "success",
        text1: "¡Éxito!",
        text2: "Solicitud creada correctamente",
        position: "bottom",
      });

      setTimeout(() => {
        router.push("/requests");
      }, 500);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo crear la solicitud",
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white m-4 p-4 rounded-xl">
        {/* Nombre del Cliente */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Nombre del Cliente *
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 bg-white">
            <Ionicons name="person" size={20} color="#999" />
            <TextInput
              className="flex-1 py-3 px-2 text-base text-gray-800"
              placeholder="Ej. Juan Pérez"
              value={form.clienteNombre}
              onChangeText={(text) => handleChange("clienteNombre", text)}
              placeholderTextColor="#999"
            />
          </View>
          {errors.clienteNombre && (
            <Text className="text-red-500 text-xs mt-1 ml-1">
              {errors.clienteNombre}
            </Text>
          )}
        </View>

        {/* Teléfono */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Teléfono *
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 bg-white">
            <Ionicons name="call" size={20} color="#999" />
            <TextInput
              className="flex-1 py-3 px-2 text-base text-gray-800"
              placeholder="Ej. 987654321"
              value={form.telefono}
              onChangeText={(text) => handleChange("telefono", text)}
              keyboardType="phone-pad"
              maxLength={9}
              placeholderTextColor="#999"
            />
          </View>
          {errors.telefono && (
            <Text className="text-red-500 text-xs mt-1 ml-1">
              {errors.telefono}
            </Text>
          )}
        </View>

        {/* Nombre de la Mascota */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Nombre de la Mascota *
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 bg-white">
            <Ionicons name="paw" size={20} color="#999" />
            <TextInput
              className="flex-1 py-3 px-2 text-base text-gray-800"
              placeholder="Ej. Luna"
              value={form.mascotaNombre}
              onChangeText={(text) => handleChange("mascotaNombre", text)}
              placeholderTextColor="#999"
            />
          </View>
          {errors.mascotaNombre && (
            <Text className="text-red-500 text-xs mt-1 ml-1">
              {errors.mascotaNombre}
            </Text>
          )}
        </View>

        {/* Tipo de Servicio */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Tipo de Servicio
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {serviceTypes.map((service) => (
              <TouchableOpacity
                key={service.value}
                className={`flex-row items-center px-4 py-2 rounded-lg border ${
                  form.tipoServicio === service.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white"
                }`}
                onPress={() =>
                  setForm({ ...form, tipoServicio: service.value as any })
                }
              >
                <Ionicons
                  name={service.icon as any}
                  size={20}
                  color={
                    form.tipoServicio === service.value ? "#007AFF" : "#666"
                  }
                />
                <Text
                  className={`ml-2 ${
                    form.tipoServicio === service.value
                      ? "text-blue-500 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {service.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Prioridad */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Prioridad
          </Text>
          <View className="flex-row gap-2">
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority.value}
                className={`flex-1 items-center py-3 rounded-lg border-2 ${
                  form.prioridad === priority.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white"
                }`}
                onPress={() => setForm({ ...form, prioridad: priority.value })}
              >
                <View
                  className="w-3 h-3 rounded-full mb-1"
                  style={{ backgroundColor: priority.color }}
                />
                <Text
                  className={`text-sm ${
                    form.prioridad === priority.value
                      ? "text-blue-500 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {priority.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Descripción */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Descripción *
          </Text>
          <View className="flex-row items-start border border-gray-300 rounded-lg px-3 bg-white">
            <Ionicons
              name="document-text"
              size={20}
              color="#999"
              style={{ marginTop: 12 }}
            />
            <TextInput
              className="flex-1 py-3 px-2 text-base text-gray-800 min-h-[100px]"
              placeholder="Descripción detallada del servicio..."
              value={form.descripcion}
              onChangeText={(text) => handleChange("descripcion", text)}
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
              textAlignVertical="top"
            />
          </View>
          {errors.descripcion && (
            <Text className="text-red-500 text-xs mt-1 ml-1">
              {errors.descripcion}
            </Text>
          )}
        </View>

        {/* Botones */}
        <View className="flex-row gap-3 mt-2">
          <TouchableOpacity
            className="flex-1 py-3 rounded-lg border border-gray-300 bg-white"
            onPress={() => router.back()}
          >
            <Text className="text-center text-gray-600 font-semibold">
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500"}`}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text className="text-center text-white font-semibold">
              {loading ? "Guardando..." : "Guardar Solicitud"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
