import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Cargando...",
  size = "large",
  className = "",
}) => {
  return (
    <View className={`flex-1 items-center justify-center ${className}`}>
      <ActivityIndicator size={size} color="#3B82F6" />
      {message && (
        <Text className="text-base text-gray-500 mt-3">{message}</Text>
      )}
    </View>
  );
};
