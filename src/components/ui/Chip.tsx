import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ChipProps {
  label: string;
  variant?: "default" | "primary" | "success" | "danger" | "warning" | "info";
  size?: "small" | "medium";
  onPress?: () => void;
  selected?: boolean;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = "default",
  size = "medium",
  onPress,
  selected = false,
  className = "",
}) => {
  const getVariantStyles = () => {
    if (selected) {
      return "bg-blue-500 border-blue-600";
    }
    switch (variant) {
      case "primary":
        return "bg-blue-100 border-blue-200";
      case "success":
        return "bg-green-100 border-green-200";
      case "danger":
        return "bg-red-100 border-red-200";
      case "warning":
        return "bg-yellow-100 border-yellow-200";
      case "info":
        return "bg-cyan-100 border-cyan-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const getTextStyles = () => {
    if (selected) {
      return "text-white";
    }
    switch (variant) {
      case "primary":
        return "text-blue-700";
      case "success":
        return "text-green-700";
      case "danger":
        return "text-red-700";
      case "warning":
        return "text-yellow-700";
      case "info":
        return "text-cyan-700";
      default:
        return "text-gray-700";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "px-2 py-1 text-xs";
      default:
        return "px-3 py-1.5 text-sm";
    }
  };

  const ChipContent = (
    <View
      className={`border rounded-full ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      <Text className={`font-medium ${getTextStyles()}`}>{label}</Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {ChipContent}
      </TouchableOpacity>
    );
  }

  return ChipContent;
};
