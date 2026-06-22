import React from "react";
import { Text, View } from "react-native";

interface BadgeProps {
  label: string;
  variant?: "primary" | "success" | "danger" | "warning" | "info" | "default";
  size?: "small" | "medium";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  size = "medium",
  className = "",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      case "danger":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-cyan-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "px-2 py-0.5 text-xs";
      default:
        return "px-3 py-1 text-sm";
    }
  };

  return (
    <View
      className={`rounded-full ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      <Text className="text-white font-semibold text-center">{label}</Text>
    </View>
  );
};
